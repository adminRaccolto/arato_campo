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
import { executarAbastecimento, type PayloadAbastecimento } from "@/lib/abastecimento/executor";
import {
  executarAvulsoPlantio,
  executarAvulsoPulverizacao,
  executarAvulsoAdubacao,
  executarAvulsoCorretivo,
  executarAvulsoColheita,
  type PayloadAvulsoPlantio,
  type PayloadAvulsoPulverizacao,
  type PayloadAvulsoAdubacao,
  type PayloadAvulsoCorretivo,
  type PayloadAvulsoColheita,
} from "@/lib/avulso/executores";

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
    case "abastecimento":
      return executarAbastecimento(supabase, op.payload as unknown as PayloadAbastecimento);
    case "avulso_plantio":
      return executarAvulsoPlantio(supabase, op.payload as unknown as PayloadAvulsoPlantio);
    case "avulso_pulverizacao":
      return executarAvulsoPulverizacao(supabase, op.payload as unknown as PayloadAvulsoPulverizacao);
    case "avulso_adubacao":
      return executarAvulsoAdubacao(supabase, op.payload as unknown as PayloadAvulsoAdubacao);
    case "avulso_corretivo":
      return executarAvulsoCorretivo(supabase, op.payload as unknown as PayloadAvulsoCorretivo);
    case "avulso_colheita":
      return executarAvulsoColheita(supabase, op.payload as unknown as PayloadAvulsoColheita);
  }
}
