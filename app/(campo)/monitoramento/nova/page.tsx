"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../recomendacoes/_shared/styles";
import { TalhaoMapaKml } from "../_shared/TalhaoMapaKml";
import { CATALOGO, NIVEIS, referenciaNe, type TipoOcorrencia } from "@/lib/monitoramento/catalogo";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { executarMonitoramento, type PayloadMonitoramento } from "@/lib/monitoramento/executor";
import {
  criarRefFotoLocal,
  ehFotoLocal,
  idDaRefFotoLocal,
  lerFotoLocal,
  removerFotoLocal,
  salvarFotoLocal,
} from "@/lib/offline-photos";

const TIPOS: { value: TipoOcorrencia; label: string }[] = [
  { value: "praga", label: "Praga" },
  { value: "doenca", label: "Doença" },
  { value: "planta_daninha", label: "Invasora" },
];

export default function NovoMonitoramentoPage() {
  const router = useRouter();
  const {
    supabase,
    userId,
    fazendas,
    fazendaId,
    setFazendaId,
    ciclos,
    cicloId,
    setCicloId,
    talhoes,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda([]);

  const [talhaoId, setTalhaoId] = useState("");
  const [tipo, setTipo] = useState<TipoOcorrencia>("praga");
  const [nome, setNome] = useState("");
  const [nomeCustom, setNomeCustom] = useState("");
  const [nivel, setNivel] = useState(1);
  const [percentualPlantas, setPercentualPlantas] = useState("");
  const [estagio, setEstagio] = useState("");
  const [acaoRecomendada, setAcaoRecomendada] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [gpsLat, setGpsLat] = useState<number | null>(null);
  const [gpsLng, setGpsLng] = useState<number | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [gpsBuscando, setGpsBuscando] = useState(false);
  const [gpsMsg, setGpsMsg] = useState("");

  const [fotos, setFotos] = useState<string[]>([]);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [previewsLocais, setPreviewsLocais] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // Fotos salvas offline (referência "local:<id>") não têm URL pública ainda
  // — resolve o blob do IndexedDB pra uma object URL só pra exibir a prévia
  // na tela. Libera as object URLs antigas ao trocar a lista de fotos.
  useEffect(() => {
    const refsLocais = fotos.filter(ehFotoLocal);
    if (refsLocais.length === 0) return;

    let cancelado = false;
    const criadas: string[] = [];

    (async () => {
      const novos: Record<string, string> = {};
      for (const ref of refsLocais) {
        const blob = await lerFotoLocal(idDaRefFotoLocal(ref));
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        novos[ref] = url;
        criadas.push(url);
      }
      if (!cancelado) setPreviewsLocais((atual) => ({ ...atual, ...novos }));
    })();

    return () => {
      cancelado = true;
      criadas.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fotos]);

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  const dataHoje = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const talhaoSelecionado = talhoes.find((t) => t.id === talhaoId) ?? null;
  const nomeEhOutro = nome.startsWith("Outra") || nome.startsWith("Outro");
  const nomeFinal = nomeEhOutro ? nomeCustom.trim() : nome;

  function capturarGps() {
    if (!navigator.geolocation) {
      setGpsMsg("GPS não disponível neste dispositivo.");
      return;
    }
    setGpsBuscando(true);
    setGpsMsg("Obtendo localização...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLat(pos.coords.latitude);
        setGpsLng(pos.coords.longitude);
        setGpsAccuracy(pos.coords.accuracy);
        setGpsMsg(`± ${Math.round(pos.coords.accuracy)} m de precisão`);
        setGpsBuscando(false);
      },
      (err) => {
        setGpsMsg(`Erro: ${err.message}`);
        setGpsBuscando(false);
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }

  async function enviarFoto(file: File) {
    if (fotos.length >= 3 || !fazendaId) return;
    setEnviandoFoto(true);
    setErro(null);

    // Sem conexão: nem tenta o upload, já salva local — a resolução pra URL
    // real acontece depois, no sync (ver lib/monitoramento/executor.ts).
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const id = await salvarFotoLocal(file);
      setFotos((atual) => [...atual, criarRefFotoLocal(id)]);
      setEnviandoFoto(false);
      return;
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `monitoramento/${fazendaId}/${Date.now()}.${ext}`;
    try {
      const { data: up, error: upErr } = await supabase.storage
        .from("arquivos")
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const {
        data: { publicUrl },
      } = supabase.storage.from("arquivos").getPublicUrl(up.path);
      setFotos((atual) => [...atual, publicUrl]);
    } catch {
      // Upload falhou apesar de "online" (rede instável) — não bloqueia o
      // operador, guarda local e sincroniza depois junto com o resto.
      const id = await salvarFotoLocal(file);
      setFotos((atual) => [...atual, criarRefFotoLocal(id)]);
    }
    setEnviandoFoto(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!fazendaId || !talhaoId) {
      setErro("Selecione fazenda e talhão.");
      return;
    }
    if (!nomeFinal) {
      setErro("Selecione ou descreva a ocorrência.");
      return;
    }

    setSalvando(true);

    const id = crypto.randomUUID();
    const payload: PayloadMonitoramento = {
      id,
      fazendaId,
      talhaoId,
      cicloId: cicloId || null,
      data: dataHoje,
      tipo,
      nome: nomeFinal,
      nivel,
      percentualPlantas: percentualPlantas ? Number(percentualPlantas) : null,
      estagio: estagio || null,
      acaoRecomendada: acaoRecomendada || null,
      observacoes: observacoes || null,
      gpsLat,
      gpsLng,
      gpsAccuracy,
      fotos,
      usuarioId: userId,
    };

    const resultado = await enfileirarEExecutar(
      { id, tipo: "monitoramento", fazenda_id: fazendaId, payload },
      () => executarMonitoramento(supabase, payload)
    );

    setSalvando(false);
    setPendenteSync(!resultado.sincronizado);
    setSucesso(true);
  }

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (erroCarregamento) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>{erroCarregamento}</p>
      </main>
    );
  }

  if (sucesso) {
    const mostrarCta = nivel >= 3 && tipo !== "planta_daninha";
    return (
      <main
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 24,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: "var(--verde)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 28,
          }}
        >
          ✓
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Monitoramento registrado.
        </p>
        {pendenteSync && (
          <p style={{ fontSize: 12, color: "var(--mostarda)", fontWeight: 600 }}>
            Salvo no aparelho — vai sincronizar assim que a conexão voltar.
          </p>
        )}

        {mostrarCta && (
          <div
            style={{
              width: "100%",
              maxWidth: 340,
              padding: 16,
              borderRadius: 12,
              background: "#FCEAEA",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--vermelho)" }}>
              Nível {nivel === 4 ? "crítico" : "alto"} registrado — considere agir agora.
            </p>
            <button
              onClick={() =>
                router.push(
                  `/recomendacoes/pulverizacao/nova?fazenda=${fazendaId}&talhao=${talhaoId}`
                )
              }
              style={{
                height: 46,
                borderRadius: 8,
                border: "none",
                background: "var(--mostarda)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Criar recomendação de pulverização
            </button>
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          style={{
            height: 48,
            padding: "0 24px",
            borderRadius: 8,
            border: "none",
            background: "var(--azul-petroleo)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Voltar ao início
        </button>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Novo Monitoramento</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Pragas · Doenças · Plantas daninhas</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Local</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Fazenda</span>
            <select style={inputStyle} value={fazendaId} onChange={(e) => { setFazendaId(e.target.value); setTalhaoId(""); }}>
              {fazendas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Talhão</span>
            <select style={inputStyle} value={talhaoId} onChange={(e) => setTalhaoId(e.target.value)}>
              <option value="">Selecione...</option>
              {talhoes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome} ({t.area_ha} ha)
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ciclo (opcional)</span>
            <select style={inputStyle} value={cicloId} onChange={(e) => setCicloId(e.target.value)}>
              <option value="">Nenhum</option>
              {ciclos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.descricao} ({c.cultura})
                </option>
              ))}
            </select>
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Ocorrência</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Tipo</span>
            <select
              style={inputStyle}
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value as TipoOcorrencia);
                setNome("");
                setNomeCustom("");
              }}
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ocorrência</span>
            <select style={inputStyle} value={nome} onChange={(e) => setNome(e.target.value)}>
              <option value="">Selecione...</option>
              {CATALOGO[tipo].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          {nomeEhOutro && (
            <input
              type="text"
              style={inputStyle}
              placeholder="Descreva a ocorrência..."
              value={nomeCustom}
              onChange={(e) => setNomeCustom(e.target.value)}
            />
          )}

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Nível de infestação</span>
            <select style={inputStyle} value={nivel} onChange={(e) => setNivel(Number(e.target.value))}>
              {NIVEIS.map((n) => (
                <option key={n.n} value={n.n}>
                  {n.label} — {n.legenda}
                </option>
              ))}
            </select>
          </label>

          {nomeFinal && !nomeEhOutro && (
            <div style={{ padding: 12, borderRadius: 8, background: "#EAF7EF" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--verde)", marginBottom: 4 }}>
                Referência de NE (automático)
              </p>
              <p style={{ fontSize: 12, color: "var(--azul-escuro)", lineHeight: 1.4 }}>{referenciaNe(nomeFinal)}</p>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>% plantas afetadas</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                style={inputStyle}
                value={percentualPlantas}
                onChange={(e) => setPercentualPlantas(e.target.value)}
                placeholder="Ex: 15"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Estágio</span>
              <input
                type="text"
                style={inputStyle}
                value={estagio}
                onChange={(e) => setEstagio(e.target.value)}
                placeholder="Ex: R3, V5..."
              />
            </label>
          </div>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Localização</p>

          {gpsLat == null ? (
            <button
              type="button"
              onClick={capturarGps}
              disabled={gpsBuscando}
              style={{
                height: 46,
                borderRadius: 8,
                border: "0.5px dashed var(--azul-petroleo)",
                background: "transparent",
                color: "var(--azul-petroleo)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {gpsBuscando ? "Obtendo localização..." : "Capturar GPS"}
            </button>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px" }}>
                <span style={{ fontSize: 11, color: "var(--azul-petroleo)", fontFamily: "monospace" }}>
                  {gpsLat.toFixed(6)}, {gpsLng?.toFixed(6)}
                </span>
                <button
                  type="button"
                  onClick={capturarGps}
                  style={{ border: "none", background: "transparent", color: "var(--mostarda)", fontSize: 11, fontWeight: 600 }}
                >
                  Recapturar
                </button>
              </div>
              <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: -6 }}>{gpsMsg}</p>
              <TalhaoMapaKml
                kmlUrl={talhaoSelecionado?.kml_url ?? null}
                talhaoNome={talhaoSelecionado?.nome ?? "Talhão"}
                lat={gpsLat}
                lng={gpsLng}
                accuracyM={gpsAccuracy}
              />
            </>
          )}
          {!talhaoId && (
            <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
              Selecione o talhão acima pra ver o contorno no mapa.
            </p>
          )}
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Fotos</p>
          {fotos.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {fotos.map((ref, i) => (
                <div key={ref} style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ehFotoLocal(ref) ? previewsLocais[ref] : ref}
                    alt={`Foto ${i + 1}`}
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8, background: "#EAF0F6" }}
                  />
                  {ehFotoLocal(ref) && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        fontSize: 9,
                        fontWeight: 600,
                        color: "#fff",
                        background: "rgba(11,45,80,0.75)",
                        padding: "2px 5px",
                        borderRadius: 4,
                      }}
                    >
                      offline
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (ehFotoLocal(ref)) removerFotoLocal(idDaRefFotoLocal(ref));
                      setFotos((atual) => atual.filter((_, j) => j !== i));
                    }}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      border: "none",
                      background: "var(--vermelho)",
                      color: "#fff",
                      fontSize: 13,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {fotos.length < 3 && (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={enviandoFoto}
                style={{
                  height: 46,
                  borderRadius: 8,
                  border: "0.5px dashed var(--azul-petroleo)",
                  background: "transparent",
                  color: "var(--azul-petroleo)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {enviandoFoto ? "Enviando..." : "Tirar / selecionar foto"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) enviarFoto(f);
                  e.target.value = "";
                }}
              />
            </>
          )}
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Ação e observações</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ação recomendada (opcional)</span>
            <textarea
              style={{ ...inputStyle, height: 64, paddingTop: 10, resize: "vertical" }}
              value={acaoRecomendada}
              onChange={(e) => setAcaoRecomendada(e.target.value)}
              placeholder="Ex: aplicar inseticida na próxima janela..."
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Observações</span>
            <textarea
              style={{ ...inputStyle, height: 64, paddingTop: 10, resize: "vertical" }}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Condições climáticas, posição no talhão, etc."
            />
          </label>
        </section>

        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={salvando}
          style={{
            height: 52,
            borderRadius: 8,
            border: "none",
            background: salvando ? "#d9b768" : "var(--mostarda)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          {salvando ? "Salvando..." : "Salvar monitoramento"}
        </button>
      </form>
    </main>
  );
}
