"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

type TipoRecomendacao = "pulverizacao" | "adubacao" | "corretivo" | "plantio";

type TarefaRow = {
  id: string;
  fazenda_id: string;
  status: string;
  criado_em: string;
  recomendacao_pulverizacao_id: string | null;
  recomendacao_adubacao_id: string | null;
  recomendacao_corretivo_id: string | null;
  recomendacao_plantio_id: string | null;
};

type Resumo = { data_aplicacao_indicada: string; hectares_sugeridos: number };

type RecomendacaoExibicao = {
  tarefaId: string;
  recomendacaoId: string;
  tipo: TipoRecomendacao;
  fazendaNome: string;
  statusTarefa: string;
  resumo: Resumo | null;
};

const TIPO_LABEL: Record<TipoRecomendacao, string> = {
  pulverizacao: "Pulverização",
  adubacao: "Adubação",
  corretivo: "Corretivo",
  plantio: "Plantio",
};

const STATUS_TAREFA_LABEL: Record<string, string> = {
  pendente: "Aguardando operador",
  em_andamento: "Em andamento",
};

function tipoDaTarefa(t: TarefaRow): TipoRecomendacao | null {
  if (t.recomendacao_pulverizacao_id) return "pulverizacao";
  if (t.recomendacao_adubacao_id) return "adubacao";
  if (t.recomendacao_corretivo_id) return "corretivo";
  if (t.recomendacao_plantio_id) return "plantio";
  return null;
}

// Lista de recomendações ainda em aberto (tarefa pendente ou em andamento) —
// só pra Gerente Campo, que é quem cria e pode corrigir uma recomendação
// (CLAUDE.md 7, decisão 17/set/2026). Depois que o operador fecha a tarefa
// (status concluída), a recomendação sai daqui — a partir daí, corrigir
// vira editar a aplicação já lançada (tela Aprovações/Meus Lançamentos).
export default function RecomendacoesPage() {
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [itens, setItens] = useState<RecomendacaoExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (auth.carregando) return;

    async function carregar() {
      if (!auth.ehGerenteCampo) {
        setCarregando(false);
        return;
      }

      let queryFazendas = supabase.from("fazendas").select("id, nome");
      queryFazendas = auth.fazendasPermitidas
        ? queryFazendas.in("id", auth.fazendasPermitidas)
        : queryFazendas.eq("conta_id", auth.contaId ?? "");
      const { data: fazendasData, error: erroFazendas } = await queryFazendas;
      if (erroFazendas) {
        setErro(`Não foi possível carregar as fazendas: ${erroFazendas.message}`);
        setCarregando(false);
        return;
      }

      const fazendaIds = (fazendasData ?? []).map((f) => f.id);
      const nomeFazendaPorId = new Map((fazendasData ?? []).map((f) => [f.id, f.nome]));
      if (fazendaIds.length === 0) {
        setItens([]);
        setCarregando(false);
        return;
      }

      const { data, error } = await supabase
        .from("tarefas")
        .select(
          "id, fazenda_id, status, criado_em, recomendacao_pulverizacao_id, recomendacao_adubacao_id, recomendacao_corretivo_id, recomendacao_plantio_id"
        )
        .in("fazenda_id", fazendaIds)
        .in("status", ["pendente", "em_andamento"])
        .order("criado_em", { ascending: true })
        .limit(500);

      if (error) {
        setErro(`Não foi possível carregar recomendações: ${error.message}.`);
        setCarregando(false);
        return;
      }

      const linhas = (data ?? []) as unknown as TarefaRow[];

      const idsPorTipo: Record<TipoRecomendacao, string[]> = {
        pulverizacao: [], adubacao: [], corretivo: [], plantio: [],
      };
      linhas.forEach((t) => {
        const tipo = tipoDaTarefa(t);
        if (!tipo) return;
        const recId =
          tipo === "pulverizacao" ? t.recomendacao_pulverizacao_id
          : tipo === "adubacao" ? t.recomendacao_adubacao_id
          : tipo === "corretivo" ? t.recomendacao_corretivo_id
          : t.recomendacao_plantio_id;
        if (recId) idsPorTipo[tipo].push(recId);
      });

      const tabelaPorTipo: Record<TipoRecomendacao, string> = {
        pulverizacao: "recomendacoes_pulverizacao",
        adubacao: "recomendacoes_adubacao",
        corretivo: "recomendacoes_corretivo",
        plantio: "recomendacoes_plantio",
      };

      // Tabela de origem varia por tipo — só conhecida em runtime.
      const sb = supabase as unknown as { from: (table: string) => ReturnType<typeof supabase.from> };
      const resumosPorId = new Map<string, Resumo>();
      await Promise.all(
        (Object.keys(idsPorTipo) as TipoRecomendacao[]).map(async (tipo) => {
          const ids = idsPorTipo[tipo];
          if (ids.length === 0) return;
          const { data: recs } = await sb
            .from(tabelaPorTipo[tipo])
            .select("id, data_aplicacao_indicada, hectares_sugeridos")
            .in("id", ids);
          ((recs ?? []) as unknown as (Resumo & { id: string })[]).forEach((r) => {
            resumosPorId.set(r.id, { data_aplicacao_indicada: r.data_aplicacao_indicada, hectares_sugeridos: r.hectares_sugeridos });
          });
        })
      );

      const exibicao: RecomendacaoExibicao[] = linhas
        .map((t) => {
          const tipo = tipoDaTarefa(t);
          if (!tipo) return null;
          const recId =
            tipo === "pulverizacao" ? t.recomendacao_pulverizacao_id
            : tipo === "adubacao" ? t.recomendacao_adubacao_id
            : tipo === "corretivo" ? t.recomendacao_corretivo_id
            : t.recomendacao_plantio_id;
          if (!recId) return null;
          return {
            tarefaId: t.id,
            recomendacaoId: recId,
            tipo,
            fazendaNome: nomeFazendaPorId.get(t.fazenda_id) ?? "Fazenda",
            statusTarefa: t.status,
            resumo: resumosPorId.get(recId) ?? null,
          };
        })
        .filter((t): t is RecomendacaoExibicao => t !== null);

      setItens(exibicao);
      setCarregando(false);
    }

    carregar();
  }, [auth.carregando, auth.ehGerenteCampo, auth.fazendasPermitidas, auth.contaId, supabase]);

  if (auth.carregando || carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (!auth.ehGerenteCampo) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center" }}>
          Só o Gerente Campo edita recomendações.
        </p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Recomendações</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          {itens.length} em aberto
        </p>
      </header>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>
            {erro}
          </p>
        )}

        {!erro && itens.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center", marginTop: 32 }}>
            Nenhuma recomendação em aberto — todas já foram executadas ou canceladas.
          </p>
        )}

        {itens.map((item) => (
          <Link
            key={item.tarefaId}
            href={`/recomendacoes/${item.tipo}/${item.recomendacaoId}/editar`}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 12,
              border: "0.5px solid var(--azul-petroleo)", background: "#fff",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--azul-escuro)" }}>{TIPO_LABEL[item.tipo]}</p>
              <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
                {item.fazendaNome}
                {item.resumo ? ` · ${item.resumo.hectares_sugeridos} ha · ${new Date(item.resumo.data_aplicacao_indicada + "T12:00").toLocaleDateString("pt-BR")}` : ""}
              </p>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--azul-petroleo)", background: "#EAF0F6", padding: "4px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>
              {STATUS_TAREFA_LABEL[item.statusTarefa] ?? item.statusTarefa}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
