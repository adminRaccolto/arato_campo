"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

type TipoTarefa = "pulverizacao" | "adubacao" | "corretivo" | "plantio";

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

type Resumo = {
  data_aplicacao_indicada: string;
  hectares_sugeridos: number;
};

type TarefaExibicao = {
  id: string;
  tipo: TipoTarefa;
  status: string;
  fazendaNome: string;
  resumo: Resumo | null;
};

const TIPO_INFO: Record<TipoTarefa, { label: string; icone: string }> = {
  pulverizacao: { label: "Pulverização", icone: "💧" },
  adubacao: { label: "Adubação", icone: "🌿" },
  corretivo: { label: "Corretivo", icone: "⚗️" },
  plantio: { label: "Plantio", icone: "🌱" },
};

const STATUS_INFO: Record<string, { label: string; cor: string; fundo: string }> = {
  pendente: { label: "Pendente", cor: "var(--mostarda)", fundo: "#FFF6E6" },
  em_andamento: { label: "Em andamento", cor: "var(--azul-petroleo)", fundo: "#EAF0F6" },
  concluida: { label: "Concluída", cor: "var(--verde)", fundo: "#EAF7EF" },
  cancelada: { label: "Cancelada", cor: "var(--vermelho)", fundo: "#FCEAEA" },
};

function tipoDaTarefa(t: TarefaRow): TipoTarefa | null {
  if (t.recomendacao_pulverizacao_id) return "pulverizacao";
  if (t.recomendacao_adubacao_id) return "adubacao";
  if (t.recomendacao_corretivo_id) return "corretivo";
  if (t.recomendacao_plantio_id) return "plantio";
  return null;
}

export default function TarefasPage() {
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [tarefas, setTarefas] = useState<TarefaExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (auth.carregando) return;
    if (auth.erro) {
      setErro(auth.erro);
      setCarregando(false);
      return;
    }
    if (!auth.perfilId) return;

    async function carregar(perfilId: string) {
      const sb = supabase as unknown as {
        from: (table: string) => ReturnType<typeof supabase.from>;
      };

      const { data, error } = await sb
        .from("tarefas")
        .select(
          "id, fazenda_id, status, criado_em, recomendacao_pulverizacao_id, recomendacao_adubacao_id, recomendacao_corretivo_id, recomendacao_plantio_id"
        )
        .eq("perfil_atribuido_id", perfilId)
        .in("status", ["pendente", "em_andamento"])
        .order("criado_em", { ascending: true });

      if (error) {
        setErro(
          `Não foi possível carregar as tarefas: ${error.message}. Provavelmente o schema ainda não foi aplicado (db/migrations-draft/003_tarefas.sql).`
        );
        setCarregando(false);
        return;
      }

      const linhas = (data ?? []) as unknown as TarefaRow[];

      const idsPorTipo: Record<TipoTarefa, string[]> = {
        pulverizacao: [],
        adubacao: [],
        corretivo: [],
        plantio: [],
      };
      const fazendaIds = new Set<string>();

      linhas.forEach((t) => {
        const tipo = tipoDaTarefa(t);
        fazendaIds.add(t.fazenda_id);
        if (!tipo) return;
        const recId =
          tipo === "pulverizacao"
            ? t.recomendacao_pulverizacao_id
            : tipo === "adubacao"
              ? t.recomendacao_adubacao_id
              : tipo === "corretivo"
                ? t.recomendacao_corretivo_id
                : t.recomendacao_plantio_id;
        if (recId) idsPorTipo[tipo].push(recId);
      });

      const tabelaPorTipo: Record<TipoTarefa, string> = {
        pulverizacao: "recomendacoes_pulverizacao",
        adubacao: "recomendacoes_adubacao",
        corretivo: "recomendacoes_corretivo",
        plantio: "recomendacoes_plantio",
      };

      const resumosPorId = new Map<string, Resumo>();

      await Promise.all(
        (Object.keys(idsPorTipo) as TipoTarefa[]).map(async (tipo) => {
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

      const { data: fazendasData } = await supabase
        .from("fazendas")
        .select("id, nome")
        .in("id", Array.from(fazendaIds));
      const nomeFazendaPorId = new Map((fazendasData ?? []).map((f) => [f.id, f.nome]));

      const exibicao: TarefaExibicao[] = linhas
        .map((t) => {
          const tipo = tipoDaTarefa(t);
          if (!tipo) return null;
          const recId =
            tipo === "pulverizacao"
              ? t.recomendacao_pulverizacao_id
              : tipo === "adubacao"
                ? t.recomendacao_adubacao_id
                : tipo === "corretivo"
                  ? t.recomendacao_corretivo_id
                  : t.recomendacao_plantio_id;
          return {
            id: t.id,
            tipo,
            status: t.status,
            fazendaNome: nomeFazendaPorId.get(t.fazenda_id) ?? "Fazenda",
            resumo: recId ? (resumosPorId.get(recId) ?? null) : null,
          };
        })
        .filter((t): t is TarefaExibicao => t !== null);

      setTarefas(exibicao);
      setCarregando(false);
    }

    carregar(auth.perfilId);
  }, [auth.carregando, auth.erro, auth.perfilId, supabase]);

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Minhas Tarefas</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          {tarefas.length} pendente{tarefas.length === 1 ? "" : "s"}
        </p>
      </header>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>
            {erro}
          </p>
        )}

        {!erro && tarefas.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center", marginTop: 32 }}>
            Nenhuma tarefa pendente no momento.
          </p>
        )}

        {tarefas.map((t) => {
          const info = TIPO_INFO[t.tipo];
          const statusInfo = STATUS_INFO[t.status] ?? STATUS_INFO.pendente;
          return (
            <Link
              key={t.id}
              href={`/tarefas/${t.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 12,
                border: "0.5px solid var(--azul-petroleo)",
                background: "#fff",
              }}
            >
              <span style={{ fontSize: 24 }}>{info.icone}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--azul-escuro)" }}>{info.label}</p>
                <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
                  {t.fazendaNome}
                  {t.resumo ? ` · ${t.resumo.hectares_sugeridos} ha · ${new Date(t.resumo.data_aplicacao_indicada + "T12:00").toLocaleDateString("pt-BR")}` : ""}
                </p>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: statusInfo.cor,
                  background: statusInfo.fundo,
                  padding: "4px 8px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {statusInfo.label}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
