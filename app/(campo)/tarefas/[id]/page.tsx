"use client";

import { use, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FechamentoPulverizacao } from "../_fechamentos/FechamentoPulverizacao";
import { FechamentoAdubacao } from "../_fechamentos/FechamentoAdubacao";
import { FechamentoCorretivo } from "../_fechamentos/FechamentoCorretivo";
import { FechamentoPlantio } from "../_fechamentos/FechamentoPlantio";

type TarefaRow = {
  id: string;
  fazenda_id: string;
  status: string;
  recomendacao_pulverizacao_id: string | null;
  recomendacao_adubacao_id: string | null;
  recomendacao_corretivo_id: string | null;
  recomendacao_plantio_id: string | null;
};

export default function TarefaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = useMemo(() => createClient(), []);

  const [tarefa, setTarefa] = useState<TarefaRow | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("tarefas")
        .select(
          "id, fazenda_id, status, recomendacao_pulverizacao_id, recomendacao_adubacao_id, recomendacao_corretivo_id, recomendacao_plantio_id"
        )
        .eq("id", id)
        .limit(1);

      if (error || !data || data.length === 0) {
        setErro(`Não foi possível carregar a tarefa: ${error?.message ?? "não encontrada"}.`);
        setCarregando(false);
        return;
      }

      setTarefa(data[0]);
      setCarregando(false);
    }

    carregar();
  }, [id, supabase]);

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (erro || !tarefa) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>{erro}</p>
      </main>
    );
  }

  if (tarefa.status !== "pendente" && tarefa.status !== "em_andamento") {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center" }}>Esta tarefa já foi {tarefa.status}.</p>
      </main>
    );
  }

  if (tarefa.recomendacao_pulverizacao_id) {
    return <FechamentoPulverizacao tarefaId={tarefa.id} fazendaId={tarefa.fazenda_id} recomendacaoId={tarefa.recomendacao_pulverizacao_id} />;
  }
  if (tarefa.recomendacao_adubacao_id) {
    return <FechamentoAdubacao tarefaId={tarefa.id} fazendaId={tarefa.fazenda_id} recomendacaoId={tarefa.recomendacao_adubacao_id} />;
  }
  if (tarefa.recomendacao_corretivo_id) {
    return <FechamentoCorretivo tarefaId={tarefa.id} fazendaId={tarefa.fazenda_id} recomendacaoId={tarefa.recomendacao_corretivo_id} />;
  }
  if (tarefa.recomendacao_plantio_id) {
    return <FechamentoPlantio tarefaId={tarefa.id} fazendaId={tarefa.fazenda_id} recomendacaoId={tarefa.recomendacao_plantio_id} />;
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>Tarefa sem recomendação de origem — dado inconsistente.</p>
    </main>
  );
}
