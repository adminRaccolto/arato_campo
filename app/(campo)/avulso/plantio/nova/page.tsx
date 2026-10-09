"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../../recomendacoes/_shared/styles";
import { MaquinaField } from "../../../recomendacoes/_shared/MaquinaField";
import { LoteSementeSelect } from "../../../recomendacoes/_shared/LoteSementeSelect";
import { SucessoCriacao } from "../../../recomendacoes/_shared/SucessoCriacao";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { executarAvulsoPlantio, type PayloadAvulsoPlantio } from "@/lib/avulso/executores";

export default function AvulsoPlantioPage() {
  const router = useRouter();
  const {
    supabase, perfilId, fazendas, fazendaId, setFazendaId,
    ciclos, cicloId, setCicloId, talhoes, insumos: sementes, maquinas,
    carregando, erro: erroCarregamento,
  } = useCatalogoFazenda(["semente", "inoculante"]);

  const [talhaoId, setTalhaoId] = useState("");
  const [insumoId, setInsumoId] = useState("");
  const [variedade, setVariedade] = useState("");
  const [doseKgHa, setDoseKgHa] = useState("");
  const [lote, setLote] = useState("");
  const [maquinaId, setMaquinaId] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [observacoes, setObservacoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  const talhaoSelecionado = talhoes.find((t) => t.id === talhaoId) ?? null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!perfilId || !fazendaId || !cicloId || !talhaoSelecionado) {
      setErro("Selecione fazenda, ciclo e talhão.");
      return;
    }
    if (!insumoId || !doseKgHa) {
      setErro("Selecione a semente e informe a dose.");
      return;
    }

    setSalvando(true);
    const id = crypto.randomUUID();
    const payload: PayloadAvulsoPlantio = {
      id,
      fazendaId,
      cicloId,
      talhaoId,
      areaHa: talhaoSelecionado.area_ha,
      perfilId,
      maquinaId: maquinaId || null,
      data,
      observacoes: observacoes || null,
      insumoId,
      variedade: variedade || sementes.find((i) => i.id === insumoId)?.nome || "",
      doseKgHa: Number(doseKgHa),
      lote: lote || null,
    };

    const resultado = await enfileirarEExecutar(
      { id, tipo: "avulso_plantio", fazenda_id: fazendaId, payload },
      () => executarAvulsoPlantio(supabase, payload)
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
    return (
      <SucessoCriacao
        titulo="Plantio registrado — enviado para aprovação."
        pendenteSync={pendenteSync}
        onVoltar={() => router.push("/")}
      />
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Lançamento Avulso — Plantio</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Operação que já aconteceu</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Local</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Fazenda</span>
            <select style={inputStyle} value={fazendaId} onChange={(e) => { setFazendaId(e.target.value); setTalhaoId(""); }}>
              {fazendas.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ciclo</span>
            <select style={inputStyle} value={cicloId} onChange={(e) => setCicloId(e.target.value)}>
              <option value="">Selecione...</option>
              {ciclos.map((c) => <option key={c.id} value={c.id}>{c.descricao} ({c.cultura})</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Talhão</span>
            <select style={inputStyle} value={talhaoId} onChange={(e) => setTalhaoId(e.target.value)}>
              <option value="">Selecione...</option>
              {talhoes.map((t) => <option key={t.id} value={t.id}>{t.nome} ({t.area_ha} ha)</option>)}
            </select>
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Semente</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Semente / inoculante</span>
            <select style={inputStyle} value={insumoId} onChange={(e) => { setInsumoId(e.target.value); setLote(""); }}>
              <option value="">Selecione...</option>
              {sementes.map((i) => <option key={i.id} value={i.id}>{i.nome}</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Variedade (se diferente do produto acima)</span>
            <input type="text" style={inputStyle} value={variedade} onChange={(e) => setVariedade(e.target.value)} placeholder="Opcional" />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Dose aplicada (kg/ha)</span>
            <input type="number" inputMode="decimal" step="0.0001" style={inputStyle} value={doseKgHa} onChange={(e) => setDoseKgHa(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Lote</span>
            <LoteSementeSelect fazendaId={fazendaId} insumoId={insumoId} value={lote} onChange={setLote} />
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Data e máquina</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data do plantio</span>
            <input type="date" style={inputStyle} value={data} onChange={(e) => setData(e.target.value)} />
          </label>
          <MaquinaField maquinas={maquinas} maquinaId={maquinaId} setMaquinaId={setMaquinaId} />
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Observações</p>
          <textarea style={{ ...inputStyle, height: 80, paddingTop: 10, resize: "vertical" }} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </section>

        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>{erro}</p>
        )}

        <button
          type="submit" disabled={salvando}
          style={{ height: 52, borderRadius: 8, border: "none", background: salvando ? "#d9b768" : "var(--mostarda)", color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 24 }}
        >
          {salvando ? "Salvando..." : "Registrar plantio"}
        </button>
      </form>
    </main>
  );
}
