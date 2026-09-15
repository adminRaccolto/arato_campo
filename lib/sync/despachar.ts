import { createClient } from "@/lib/supabase/client";
import type { OperacaoPendente } from "@/lib/offline-store";
import {
  criarRecomendacao,
  CONFIG_PULVERIZACAO,
  CONFIG_ADUBACAO,
  CONFIG_CORRETIVO,
  CONFIG_PLANTIO,
  type PayloadCriacaoRecomendacao,
} from "@/lib/recomendacoes/executores";
import {
  executarFechamentoPulverizacao,
  executarFechamentoAdubacao,
  executarFechamentoCorretivo,
  executarFechamentoPlantio,
  type PayloadFechamentoPulverizacao,
  type PayloadFechamentoAdubacao,
  type PayloadFechamentoCorretivo,
  type PayloadFechamentoPlantio,
} from "@/lib/tarefas/executores";
import { executarMonitoramento, type PayloadMonitoramento } from "@/lib/monitoramento/executor";

/**
 * Reexecuta uma operação da fila local, despachando pro executor certo
 * conforme `tipo`. Usado tanto pelo SyncButton (retry manual/automático)
 * quanto poderia ser usado por um retry em segundo plano no futuro.
 */
export async function despacharOperacao(op: OperacaoPendente): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();

  switch (op.tipo) {
    case "recomendacao_pulverizacao":
      return criarRecomendacao(supabase, CONFIG_PULVERIZACAO, op.payload as unknown as PayloadCriacaoRecomendacao);
    case "recomendacao_adubacao":
      return criarRecomendacao(supabase, CONFIG_ADUBACAO, op.payload as unknown as PayloadCriacaoRecomendacao);
    case "recomendacao_corretivo":
      return criarRecomendacao(supabase, CONFIG_CORRETIVO, op.payload as unknown as PayloadCriacaoRecomendacao);
    case "recomendacao_plantio":
      return criarRecomendacao(supabase, CONFIG_PLANTIO, op.payload as unknown as PayloadCriacaoRecomendacao);
    case "fechamento_pulverizacao":
      return executarFechamentoPulverizacao(supabase, op.payload as unknown as PayloadFechamentoPulverizacao);
    case "fechamento_adubacao":
      return executarFechamentoAdubacao(supabase, op.payload as unknown as PayloadFechamentoAdubacao);
    case "fechamento_corretivo":
      return executarFechamentoCorretivo(supabase, op.payload as unknown as PayloadFechamentoCorretivo);
    case "fechamento_plantio":
      return executarFechamentoPlantio(supabase, op.payload as unknown as PayloadFechamentoPlantio);
    case "monitoramento":
      return executarMonitoramento(supabase, op.payload as unknown as PayloadMonitoramento);
  }
}
