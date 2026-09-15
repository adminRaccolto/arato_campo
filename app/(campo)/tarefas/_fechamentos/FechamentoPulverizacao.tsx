"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../recomendacoes/_shared/styles";
import { SucessoConclusao } from "./SucessoConclusao";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { executarFechamentoPulverizacao, type PayloadFechamentoPulverizacao } from "@/lib/tarefas/executores";

type RecomendacaoPulverizacao = {
  id: string;
  ciclo_id: string;
  data_aplicacao_indicada: string;
  hectares_sugeridos: number;
  volume_calda_l_ha: number;
  tipo_bico: string;
  pressao_bar: number;
  classificacao_gota: string;
};

type TalhaoVinculado = { talhao_id: string; area_ha: number; nome: string };
type ProdutoVinculado = { insumo_id: string; dose_por_ha: number; unidade_dose: string; nome: string };

const TIPOS_APLICACAO = [
  { value: "herbicida", label: "Herbicida" },
  { value: "fungicida", label: "Fungicida" },
  { value: "inseticida", label: "Inseticida" },
  { value: "fertilizante_foliar", label: "Foliar" },
  { value: "dessecacao", label: "Dessecação" },
  { value: "regulador", label: "Regulador" },
  { value: "outros", label: "Outros" },
] as const;

export function FechamentoPulverizacao({
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

  const [recomendacao, setRecomendacao] = useState<RecomendacaoPulverizacao | null>(null);
  const [talhoes, setTalhoes] = useState<TalhaoVinculado[]>([]);
  const [produtos, setProdutos] = useState<ProdutoVinculado[]>([]);

  const [dataRealizada, setDataRealizada] = useState("");
  const [hectaresRealizados, setHectaresRealizados] = useState("");
  const [tipoAplicacao, setTipoAplicacao] = useState<(typeof TIPOS_APLICACAO)[number]["value"]>("herbicida");
  const [estagioFenologico, setEstagioFenologico] = useState("");
  const [observacoesReais, setObservacoesReais] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  useEffect(() => {
    async function carregar() {
      const [{ data: recData, error: recError }, { data: talhoesData }, { data: produtosData }] = await Promise.all([
        supabase
          .from("recomendacoes_pulverizacao")
          .select("id, ciclo_id, data_aplicacao_indicada, hectares_sugeridos, volume_calda_l_ha, tipo_bico, pressao_bar, classificacao_gota")
          .eq("id", recomendacaoId)
          .limit(1),
        supabase.from("recomendacoes_pulverizacao_talhoes").select("talhao_id, area_ha, talhoes(nome)").eq("recomendacao_id", recomendacaoId),
        supabase
          .from("recomendacoes_pulverizacao_produtos")
          .select("insumo_id, dose_por_ha, unidade_dose, insumos(nome)")
          .eq("recomendacao_id", recomendacaoId),
      ]);

      if (recError || !recData || recData.length === 0) {
        setErroCarregamento(`Não foi possível carregar a recomendação: ${recError?.message ?? "não encontrada"}.`);
        setCarregando(false);
        return;
      }

      const rec = recData[0] as unknown as RecomendacaoPulverizacao;
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

      type ProdutoJoin = { insumo_id: string; dose_por_ha: number; unidade_dose: string; insumos: { nome: string } | { nome: string }[] | null };
      setProdutos(
        ((produtosData ?? []) as unknown as ProdutoJoin[]).map((x) => ({
          insumo_id: x.insumo_id,
          dose_por_ha: x.dose_por_ha,
          unidade_dose: x.unidade_dose,
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

    setSalvando(true);

    // Uma linha de execução por talhão do plano (nunca talhao_id null) — a
    // área de cada talhão é escalada pela razão entre o total realizado e o
    // total sugerido, preservando a distribuição do plano. IDs gerados aqui,
    // uma vez só, e guardados no payload da fila — nunca regerados num
    // retry (ver lib/tarefas/executores.ts). Assume que todos os talhões
    // planejados foram tratados; fechamento parcial por talhão ainda não é
    // suportado.
    const fatorEscala = talhoes.length > 0 ? Number(hectaresRealizados) / recomendacao.hectares_sugeridos : 1;
    const linhas = talhoes.map((t) => ({
      execucaoId: crypto.randomUUID(),
      talhaoId: t.talhao_id,
      areaHa: Math.round(t.area_ha * fatorEscala * 100) / 100,
      itens: produtos.map((p) => ({
        id: crypto.randomUUID(),
        insumoId: p.insumo_id,
        nome: p.nome,
        dose: p.dose_por_ha,
        unidade: p.unidade_dose,
      })),
    }));

    const payload: PayloadFechamentoPulverizacao = {
      fazendaId,
      cicloId: recomendacao.ciclo_id,
      tarefaId,
      recomendacaoId: recomendacao.id,
      perfilId: auth.perfilId,
      linhas,
      dataRealizada,
      hectaresRealizados: Number(hectaresRealizados),
      observacoes: observacoesReais || null,
      vazaoLHa: recomendacao.volume_calda_l_ha,
      tipoAplicacao,
      estagioFenologico: estagioFenologico || null,
    };

    const resultado = await enfileirarEExecutar(
      { id: crypto.randomUUID(), tipo: "fechamento_pulverizacao", fazenda_id: fazendaId, payload },
      () => executarFechamentoPulverizacao(supabase, payload)
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
  if (erroCarregamento || !recomendacao) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>{erroCarregamento}</p>
      </main>
    );
  }
  if (sucesso) return <SucessoConclusao pendenteSync={pendenteSync} onVoltar={() => router.push("/tarefas")} />;

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Fechar tarefa — Pulverização</p>
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
              {p.nome} — {p.dose_por_ha} {p.unidade_dose}/ha
            </p>
          ))}
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: 6 }}>
            Volume {recomendacao.volume_calda_l_ha} L/ha · Bico {recomendacao.tipo_bico} · Pressão {recomendacao.pressao_bar} bar · Gota{" "}
            {recomendacao.classificacao_gota}
          </p>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>O que foi feito de verdade</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de aplicação realizada</span>
            <input type="date" style={inputStyle} value={dataRealizada} onChange={(e) => setDataRealizada(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Hectares realizados</span>
            <input type="number" inputMode="decimal" style={inputStyle} value={hectaresRealizados} onChange={(e) => setHectaresRealizados(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Tipo de aplicação</span>
            <select style={inputStyle} value={tipoAplicacao} onChange={(e) => setTipoAplicacao(e.target.value as typeof tipoAplicacao)}>
              {TIPOS_APLICACAO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Estágio fenológico (opcional)</span>
            <input type="text" style={inputStyle} value={estagioFenologico} onChange={(e) => setEstagioFenologico(e.target.value)} placeholder="Ex: V6, R2..." />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Observações</span>
            <textarea
              style={{ ...inputStyle, height: 64, paddingTop: 10, resize: "vertical" }}
              value={observacoesReais}
              onChange={(e) => setObservacoesReais(e.target.value)}
              placeholder="Condições reais no momento da aplicação..."
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
