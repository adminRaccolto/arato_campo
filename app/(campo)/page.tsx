"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useFazendaAtiva } from "@/lib/fazenda-ativa/FazendaAtivaProvider";
import { FazendaMapaKml, type TalhaoMapa } from "./_shared/FazendaMapaKml";

export default function HomePage() {
  const auth = useAuth();
  const { fazendaId, fazendas, carregando: carregandoFazenda } = useFazendaAtiva();
  const supabase = useMemo(() => createClient(), []);

  const [talhoes, setTalhoes] = useState<TalhaoMapa[]>([]);
  const [tarefasPendentes, setTarefasPendentes] = useState<number | null>(null);
  const [aprovacoesPendentes, setAprovacoesPendentes] = useState<number | null>(null);

  useEffect(() => {
    if (!fazendaId) return;
    supabase
      .from("talhoes")
      .select("id, nome, kml_url")
      .eq("fazenda_id", fazendaId)
      .order("nome")
      .then(({ data }) => setTalhoes(data ?? []));
  }, [fazendaId, supabase]);

  useEffect(() => {
    if (!auth.perfilId) return;
    supabase
      .from("tarefas")
      .select("id", { count: "exact", head: true })
      .eq("perfil_atribuido_id", auth.perfilId)
      .in("status", ["pendente", "em_andamento"])
      .then(({ count }) => setTarefasPendentes(count ?? 0));
  }, [auth.perfilId, supabase]);

  useEffect(() => {
    if (!auth.ehGerenteCampo || !fazendaId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as unknown as { from: (t: string) => any };
    Promise.all(
      ["plantios", "pulverizacoes", "adubacoes_base", "correcoes_solo"].map((tabela) =>
        sb.from(tabela).select("id", { count: "exact", head: true }).eq("fazenda_id", fazendaId).eq("status_campo", "pendente")
      )
    ).then((resultados) => {
      const total = resultados.reduce((soma, r) => soma + (r.count ?? 0), 0);
      setAprovacoesPendentes(total);
    });
  }, [auth.ehGerenteCampo, fazendaId, supabase]);

  const fazendaAtual = fazendas.find((f) => f.id === fazendaId);

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px 20px 16px" }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: "var(--azul-escuro)" }}>
          {fazendaAtual?.nome ?? "Início"}
        </p>
        <p style={{ fontSize: 12, color: "var(--azul-petroleo)", marginTop: 2 }}>
          Olá, {auth.nome?.split(" ")[0] ?? "operador"}
        </p>
      </header>

      <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/tarefas"
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: 12,
              border: "0.5px solid var(--azul-petroleo)",
              background: "#fff",
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--azul-escuro)" }}>
              {tarefasPendentes ?? "—"}
            </p>
            <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: 2 }}>Tarefas pendentes</p>
          </Link>

          {auth.ehGerenteCampo && (
            <Link
              href="/aprovacoes"
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: 12,
                border: "0.5px solid var(--azul-petroleo)",
                background: "#fff",
              }}
            >
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--azul-escuro)" }}>
                {aprovacoesPendentes ?? "—"}
              </p>
              <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: 2 }}>Aguardando aprovação</p>
            </Link>
          )}
        </div>

        <div
          style={{
            border: "0.5px solid var(--azul-petroleo)",
            borderRadius: 12,
            padding: 14,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--azul-escuro)" }}>Talhões</p>
          {carregandoFazenda ? (
            <p style={{ fontSize: 12, color: "var(--azul-petroleo)" }}>Carregando...</p>
          ) : (
            <FazendaMapaKml talhoes={talhoes} />
          )}
        </div>
      </div>
    </main>
  );
}
