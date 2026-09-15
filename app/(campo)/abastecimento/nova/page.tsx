"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../recomendacoes/_shared/styles";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { executarAbastecimento, type PayloadAbastecimento } from "@/lib/abastecimento/executor";
import { SucessoCriacao } from "../../recomendacoes/_shared/SucessoCriacao";

type Bomba = { id: string; nome: string; insumo_id: string | null; estoque_atual_l: number | null; capacidade_l: number | null };
type InsumoCombustivel = { id: string; nome: string };

export default function NovoAbastecimentoPage() {
  const router = useRouter();
  const {
    supabase,
    perfilId,
    fazendas,
    fazendaId,
    setFazendaId,
    ciclos,
    cicloId,
    setCicloId,
    maquinas,
    perfis,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda([]);

  const [bombas, setBombas] = useState<Bomba[]>([]);
  const [combustiveis, setCombustiveis] = useState<InsumoCombustivel[]>([]);

  const [maquinaId, setMaquinaId] = useState("");
  const [bombaId, setBombaId] = useState("");
  // Escolher uma bomba já resolve o combustível dela (uma bomba só abastece
  // um tipo) — este estado guarda só a escolha MANUAL, usada quando não tem
  // bomba selecionada; o valor efetivo é derivado logo abaixo, sem efeito
  // (evita duplicar estado — a bomba já é a fonte de verdade quando existe).
  const [insumoManualId, setInsumoManualId] = useState("");
  // Vazio = "não trocou" — o valor efetivo cai no próprio usuário logado
  // (ver `abastecidoPorPerfilId` abaixo). Evita precisar de um efeito só
  // pra copiar `perfilId` num estado assim que ele carrega.
  const [abastecidoPorEscolhido, setAbastecidoPorEscolhido] = useState("");
  const [quantidadeL, setQuantidadeL] = useState("");
  const [horimetro, setHorimetro] = useState("");
  const [km, setKm] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [observacao, setObservacao] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  useEffect(() => {
    if (!fazendaId) return;
    Promise.all([
      supabase
        .from("bombas_combustivel")
        .select("id, nome, insumo_id, estoque_atual_l, capacidade_l")
        .eq("fazenda_id", fazendaId)
        .eq("ativa", true)
        .order("nome"),
      supabase.from("insumos").select("id, nome").eq("fazenda_id", fazendaId).eq("categoria", "combustivel").order("nome"),
    ]).then(([bombasRes, combustiveisRes]) => {
      setBombas(bombasRes.data ?? []);
      setCombustiveis(combustiveisRes.data ?? []);
    });
  }, [fazendaId, supabase]);

  const bombaSelecionada = bombas.find((b) => b.id === bombaId) ?? null;
  const insumoId = bombaSelecionada?.insumo_id ?? insumoManualId;
  const abastecidoPorPerfilId = abastecidoPorEscolhido || perfilId || "";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!fazendaId || !maquinaId) {
      setErro("Selecione fazenda e máquina.");
      return;
    }
    if (!insumoId) {
      setErro("Selecione o combustível (ou uma bomba, que já define o combustível).");
      return;
    }
    if (!quantidadeL || Number(quantidadeL) <= 0) {
      setErro("Informe a quantidade abastecida em litros.");
      return;
    }
    if (bombaSelecionada?.estoque_atual_l != null && Number(quantidadeL) > bombaSelecionada.estoque_atual_l) {
      setErro(`Estoque insuficiente na bomba — disponível: ${bombaSelecionada.estoque_atual_l} L.`);
      return;
    }

    setSalvando(true);

    const id = crypto.randomUUID();
    const payload: PayloadAbastecimento = {
      id,
      fazendaId,
      maquinaId,
      bombaId: bombaId || null,
      insumoId: insumoId || null,
      cicloId: cicloId || null,
      quantidadeL: Number(quantidadeL),
      horimetro: horimetro ? Number(horimetro) : null,
      km: km ? Number(km) : null,
      data,
      observacao: observacao || null,
      perfilId,
      abastecidoPorPerfilId: abastecidoPorPerfilId || null,
    };

    const resultado = await enfileirarEExecutar(
      { id, tipo: "abastecimento", fazenda_id: fazendaId, payload },
      () => executarAbastecimento(supabase, payload)
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
    const fazendaNome = fazendas.find((f) => f.id === fazendaId)?.nome ?? "";
    const maquinaNome = maquinas.find((m) => m.id === maquinaId)?.nome ?? "";
    const combustivelNome = combustiveis.find((c) => c.id === insumoId)?.nome ?? "Combustível";
    const abastecedorNome = perfis.find((p) => p.id === abastecidoPorPerfilId)?.nome ?? "";
    const mensagem = [
      `⛽ *Abastecimento* — ${fazendaNome}`,
      `${maquinaNome}: ${quantidadeL} L de ${combustivelNome}`,
      `Data: ${new Date(data + "T12:00").toLocaleDateString("pt-BR")}${abastecedorNome ? ` · Abastecido por ${abastecedorNome}` : ""}`,
    ].join("\n");
    return <SucessoCriacao pendenteSync={pendenteSync} onVoltar={() => router.push("/")} mensagemWhatsApp={mensagem} />;
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Novo abastecimento</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Registro direto — sem recomendação prévia</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Local</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Fazenda</span>
            <select style={inputStyle} value={fazendaId} onChange={(e) => { setFazendaId(e.target.value); setBombaId(""); setInsumoManualId(""); }}>
              {fazendas.map((f) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ciclo (opcional — pra ratear o custo)</span>
            <select style={inputStyle} value={cicloId} onChange={(e) => setCicloId(e.target.value)}>
              <option value="">Nenhum</option>
              {ciclos.map((c) => (
                <option key={c.id} value={c.id}>{c.descricao} ({c.cultura})</option>
              ))}
            </select>
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Máquina e combustível</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Máquina / equipamento</span>
            <select style={inputStyle} value={maquinaId} onChange={(e) => setMaquinaId(e.target.value)}>
              <option value="">{maquinas.length === 0 ? "Nenhuma cadastrada nesta fazenda" : "Selecione..."}</option>
              {maquinas.map((m) => (
                <option key={m.id} value={m.id}>{m.nome}{m.tipo ? ` (${m.tipo})` : ""}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Bomba (opcional — tanque da fazenda)</span>
            <select style={inputStyle} value={bombaId} onChange={(e) => setBombaId(e.target.value)}>
              <option value="">Sem bomba — abasteceu fora (posto, caminhão-tanque...)</option>
              {bombas.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}{b.estoque_atual_l != null ? ` — ${b.estoque_atual_l} L disponíveis` : ""}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Combustível{bombaSelecionada ? " (definido pela bomba)" : ""}</span>
            <select style={inputStyle} value={insumoId} onChange={(e) => setInsumoManualId(e.target.value)} disabled={Boolean(bombaSelecionada)}>
              <option value="">Selecione...</option>
              {combustiveis.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Quantidade (litros)</span>
            <input type="number" inputMode="decimal" step="0.01" style={inputStyle} value={quantidadeL} onChange={(e) => setQuantidadeL(e.target.value)} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Quem abasteceu</span>
            <select style={inputStyle} value={abastecidoPorPerfilId} onChange={(e) => setAbastecidoPorEscolhido(e.target.value)}>
              {perfis.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome ?? p.id}
                  {p.id === perfilId ? " (você)" : ""}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Detalhes</p>
          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Horímetro (opcional)</span>
              <input type="number" inputMode="decimal" style={inputStyle} value={horimetro} onChange={(e) => setHorimetro(e.target.value)} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Km (opcional)</span>
              <input type="number" inputMode="decimal" style={inputStyle} value={km} onChange={(e) => setKm(e.target.value)} />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data</span>
            <input type="date" style={inputStyle} value={data} onChange={(e) => setData(e.target.value)} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Observações</span>
            <textarea
              style={{ ...inputStyle, height: 64, paddingTop: 10, resize: "vertical" }}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Opcional"
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
          {salvando ? "Salvando..." : "Registrar abastecimento"}
        </button>
      </form>
    </main>
  );
}
