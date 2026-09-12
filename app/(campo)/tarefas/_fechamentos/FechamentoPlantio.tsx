"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../recomendacoes/_shared/styles";
import { SucessoConclusao } from "./SucessoConclusao";

type RecomendacaoPlantio = {
  id: string;
  ciclo_id: string;
  data_aplicacao_indicada: string;
  hectares_sugeridos: number;
  populacao_plantas_ha: number | null;
  espacamento_entrelinhas_cm: number | null;
  profundidade_semeadura_cm: number | null;
};

type TalhaoVinculado = { talhao_id: string; area_ha: number; nome: string };
type ProdutoVinculado = { insumo_id: string; dose_por_ha: number; unidade_dose: string; lote: string | null; nome: string };

export function FechamentoPlantio({
  tarefaId,
  fazendaId,
  recomendacaoId,
}: {
  tarefaId: string;
  fazendaId: string;
  recomendacaoId: string;
}) {
  const router = useRouter();
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [recomendacao, setRecomendacao] = useState<RecomendacaoPlantio | null>(null);
  const [talhoes, setTalhoes] = useState<TalhaoVinculado[]>([]);
  const [produtos, setProdutos] = useState<ProdutoVinculado[]>([]);

  const [dataRealizada, setDataRealizada] = useState("");
  const [hectaresRealizados, setHectaresRealizados] = useState("");
  const [observacoesReais, setObservacoesReais] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregar() {
      const sb = supabase as unknown as { from: (table: string) => ReturnType<typeof supabase.from> };

      const [{ data: recData, error: recError }, { data: talhoesData }, { data: produtosData }] = await Promise.all([
        sb
          .from("recomendacoes_plantio")
          .select("id, ciclo_id, data_aplicacao_indicada, hectares_sugeridos, populacao_plantas_ha, espacamento_entrelinhas_cm, profundidade_semeadura_cm")
          .eq("id", recomendacaoId)
          .limit(1),
        sb.from("recomendacoes_plantio_talhoes").select("talhao_id, area_ha, talhoes(nome)").eq("recomendacao_id", recomendacaoId),
        sb.from("recomendacoes_plantio_produtos").select("insumo_id, dose_por_ha, unidade_dose, lote, insumos(nome)").eq("recomendacao_id", recomendacaoId),
      ]);

      if (recError || !recData || recData.length === 0) {
        setErroCarregamento(`Não foi possível carregar a recomendação: ${recError?.message ?? "não encontrada"}.`);
        setCarregando(false);
        return;
      }

      const rec = recData[0] as unknown as RecomendacaoPlantio;
      setRecomendacao(rec);
      setHectaresRealizados(String(rec.hectares_sugeridos));
      setDataRealizada(new Date().toISOString().slice(0, 10));

      type TalhaoJoin = { talhao_id: string; area_ha: number; talhoes: { nome: string } | { nome: string }[] | null };
      setTalhoes(
        ((talhoesData ?? []) as unknown as TalhaoJoin[]).map((x) => ({
          talhao_id: x.talhao_id,
          area_ha: x.area_ha,
          nome: Array.isArray(x.talhoes) ? (x.talhoes[0]?.nome ?? "Talhão") : (x.talhoes?.nome ?? "Talhão"),
        }))
      );

      type ProdutoJoin = {
        insumo_id: string;
        dose_por_ha: number;
        unidade_dose: string;
        lote: string | null;
        insumos: { nome: string } | { nome: string }[] | null;
      };
      setProdutos(
        ((produtosData ?? []) as unknown as ProdutoJoin[]).map((x) => ({
          insumo_id: x.insumo_id,
          dose_por_ha: x.dose_por_ha,
          unidade_dose: x.unidade_dose,
          lote: x.lote,
          nome: Array.isArray(x.insumos) ? (x.insumos[0]?.nome ?? "Produto") : (x.insumos?.nome ?? "Produto"),
        }))
      );

      setCarregando(false);
    }

    carregar();
  }, [recomendacaoId, supabase]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    if (!recomendacao || !auth.perfilId) return;
    if (!dataRealizada || !hectaresRealizados) {
      setErro("Informe a data e os hectares realizados.");
      return;
    }
    if (produtos.length === 0) {
      setErro("Recomendação sem semente cadastrada.");
      return;
    }

    setSalvando(true);
    const sb = supabase as unknown as { from: (table: string) => ReturnType<typeof supabase.from> };
    const talhaoUnico = talhoes.length === 1 ? talhoes[0].talhao_id : null;

    // `plantios` só aceita 1 insumo por linha (sem tabela de itens, ao
    // contrário de pulverização/adubação/corretivo) — por isso 1 linha por
    // produto da recomendação (normalmente semente + inoculante).
    // `dose_kg_ha` da tabela real só faz sentido pra dose em kg; quando a
    // unidade é outra (ex.: mL/ha do inoculante), a dose vai só na
    // observação, porque não existe coluna própria pra isso na tabela real.
    const linhas = produtos.map((p) => ({
      id: crypto.randomUUID(),
      fazenda_id: fazendaId,
      ciclo_id: recomendacao.ciclo_id,
      talhao_id: talhaoUnico,
      data_plantio: dataRealizada,
      area_ha: Number(hectaresRealizados),
      variedade: p.nome,
      lote_semente: p.lote || null,
      dose_kg_ha: p.unidade_dose === "kg" ? p.dose_por_ha : null,
      observacao:
        p.unidade_dose === "kg"
          ? observacoesReais || null
          : `Dose: ${p.dose_por_ha} ${p.unidade_dose}/ha${observacoesReais ? ` — ${observacoesReais}` : ""}`,
      status_campo: "pendente",
      origem_lancamento: "app_campo",
      lancado_por_perfil_id: auth.perfilId,
    }));

    const { error: insertError } = await supabase.from("plantios").insert(linhas as never);

    if (insertError) {
      setErro(`Não foi possível salvar: ${insertError.message}. Provavelmente o schema ainda não foi aplicado (006).`);
      setSalvando(false);
      return;
    }

    await sb.from("recomendacoes_plantio").update({ hectares_realizados: Number(hectaresRealizados), data_aplicacao_realizada: dataRealizada }).eq("id", recomendacao.id);
    await sb.from("tarefas").update({ status: "concluida", concluida_em: new Date().toISOString() }).eq("id", tarefaId);

    setSalvando(false);
    setSucesso(true);
  }

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }
  if (erroCarregamento || !recomendacao) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>{erroCarregamento}</p>
      </main>
    );
  }
  if (sucesso) return <SucessoConclusao onVoltar={() => router.push("/tarefas")} />;

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Fechar tarefa — Plantio</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          Indicado para {new Date(recomendacao.data_aplicacao_indicada + "T12:00").toLocaleDateString("pt-BR")}
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Plano recomendado</p>
          {talhoes.map((t) => (
            <p key={t.talhao_id} style={{ fontSize: 12, color: "var(--azul-escuro)" }}>
              {t.nome} — {t.area_ha} ha
            </p>
          ))}
          {produtos.map((p) => (
            <p key={p.insumo_id} style={{ fontSize: 12, color: "var(--azul-escuro)" }}>
              {p.nome} — {p.dose_por_ha} {p.unidade_dose}/ha{p.lote ? ` · lote ${p.lote}` : ""}
            </p>
          ))}
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: 6 }}>
            {recomendacao.populacao_plantas_ha ? `População ${recomendacao.populacao_plantas_ha} plantas/ha · ` : ""}
            {recomendacao.espacamento_entrelinhas_cm ? `Espaçamento ${recomendacao.espacamento_entrelinhas_cm} cm · ` : ""}
            {recomendacao.profundidade_semeadura_cm ? `Profundidade ${recomendacao.profundidade_semeadura_cm} cm` : ""}
          </p>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>O que foi feito de verdade</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de plantio realizada</span>
            <input type="date" style={inputStyle} value={dataRealizada} onChange={(e) => setDataRealizada(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Hectares realizados</span>
            <input type="number" inputMode="decimal" style={inputStyle} value={hectaresRealizados} onChange={(e) => setHectaresRealizados(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Observações</span>
            <textarea
              style={{ ...inputStyle, height: 64, paddingTop: 10, resize: "vertical" }}
              value={observacoesReais}
              onChange={(e) => setObservacoesReais(e.target.value)}
              placeholder="Umidade do solo, condições reais..."
            />
          </label>
        </section>

        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>{erro}</p>
        )}

        <button
          type="submit"
          disabled={salvando}
          style={{ height: 52, borderRadius: 8, border: "none", background: salvando ? "#d9b768" : "var(--mostarda)", color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 24 }}
        >
          {salvando ? "Salvando..." : "Concluir tarefa"}
        </button>
      </form>
    </main>
  );
}
