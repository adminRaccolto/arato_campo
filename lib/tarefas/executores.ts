import type { createClient } from "@/lib/supabase/client";

type SupabaseCliente = ReturnType<typeof createClient>;
type ResultadoExecucao = { ok: boolean; erro?: string };

// Uma linha por talhão do plano (nunca talhao_id null — ver correção do bug
// de multi-talhão). `execucaoId` e os `id` dos itens são gerados UMA VEZ,
// no componente, no momento em que a operação entra na fila — nunca
// regerados aqui, porque essas tabelas de execução não têm uma chave
// natural pra dar onConflict (ao contrário das tabelas de recomendação);
// o upsert por `id` só é idempotente em retry se o `id` for sempre o mesmo.
export type LinhaExecucao = {
  execucaoId: string;
  talhaoId: string;
  areaHa: number;
  itens: {
    id: string;
    insumoId: string;
    nome: string;
    dose: number;
    // dose que a recomendação original pedia pra esse produto — diferente
    // de `dose` (a que o operador confirmou/ajustou no fechamento) quando o
    // aplicado diverge do recomendado (CLAUDE.md 7, pedido 15/set/2026).
    // null quando não há recomendação de origem pra comparar.
    doseRecomendada: number | null;
    unidade?: string;
    lote?: string | null;
  }[];
};

type PayloadBase = {
  fazendaId: string;
  cicloId: string;
  tarefaId: string;
  recomendacaoId: string;
  perfilId: string;
  linhas: LinhaExecucao[];
  dataRealizada: string;
  hectaresRealizados: number;
  observacoes: string | null;
  // máquina confirmada (ou trocada) pelo operador no fechamento — pode
  // divergir da máquina sugerida na recomendação, mesmo padrão da dose.
  maquinaId: string | null;
};

export type PayloadFechamentoPulverizacao = PayloadBase & {
  vazaoLHa: number;
  tipoAplicacao: string;
  estagioFenologico: string | null;
};

export async function executarFechamentoPulverizacao(
  supabase: SupabaseCliente,
  payload: PayloadFechamentoPulverizacao
): Promise<ResultadoExecucao> {
  const resultadosExecucao = await Promise.all(
    payload.linhas.map((l) =>
      supabase.from("pulverizacoes").upsert({
        id: l.execucaoId,
        fazenda_id: payload.fazendaId,
        ciclo_id: payload.cicloId,
        talhao_id: l.talhaoId,
        data_inicio: payload.dataRealizada,
        area_ha: l.areaHa,
        tipo: payload.tipoAplicacao,
        vazao_l_ha: payload.vazaoLHa,
        estadio_fenologico: payload.estagioFenologico,
        observacao: payload.observacoes,
        maquina_id: payload.maquinaId,
        status_campo: "pendente",
        origem_lancamento: "app_campo",
        lancado_por_perfil_id: payload.perfilId,
      } as never)
    )
  );
  const erroExecucao = resultadosExecucao.find((r) => r.error)?.error;
  if (erroExecucao) return { ok: false, erro: erroExecucao.message };

  const resultadosItens = await Promise.all(
    payload.linhas.flatMap((l) =>
      l.itens.map((item) =>
        supabase.from("pulverizacao_itens").upsert({
          id: item.id,
          pulverizacao_id: l.execucaoId,
          fazenda_id: payload.fazendaId,
          insumo_id: item.insumoId,
          nome_produto: item.nome,
          dose_ha: item.dose,
          dose_recomendada_ha: item.doseRecomendada,
          unidade: item.unidade,
          // total_consumido = mesmo campo que o desktop grava na criação
          // (dose × área) — sem isso, excluirPulverizacao (lib/db.ts do
          // Arato principal) não estorna o estoque de linha nenhuma do App
          // Campo na exclusão, porque o `if (!it.total_consumido) continue`
          // dela pula silenciosamente quando o campo está vazio.
          total_consumido: item.dose * l.areaHa,
        })
      )
    )
  );
  const erroItens = resultadosItens.find((r) => r.error)?.error;
  if (erroItens) return { ok: false, erro: erroItens.message };

  return finalizarTarefa(supabase, "recomendacoes_pulverizacao", payload);
}

export type PayloadFechamentoAdubacao = PayloadBase & { modalidade: string };

export async function executarFechamentoAdubacao(
  supabase: SupabaseCliente,
  payload: PayloadFechamentoAdubacao
): Promise<ResultadoExecucao> {
  const resultadosExecucao = await Promise.all(
    payload.linhas.map((l) =>
      supabase.from("adubacoes_base").upsert({
        id: l.execucaoId,
        fazenda_id: payload.fazendaId,
        ciclo_id: payload.cicloId,
        talhao_id: l.talhaoId,
        data_aplicacao: payload.dataRealizada,
        area_ha: l.areaHa,
        modalidade: payload.modalidade,
        observacao: payload.observacoes,
        maquina_id: payload.maquinaId,
        status_campo: "pendente",
        origem_lancamento: "app_campo",
        lancado_por_perfil_id: payload.perfilId,
      } as never)
    )
  );
  const erroExecucao = resultadosExecucao.find((r) => r.error)?.error;
  if (erroExecucao) return { ok: false, erro: erroExecucao.message };

  const resultadosItens = await Promise.all(
    payload.linhas.flatMap((l) =>
      l.itens.map((item) =>
        supabase.from("adubacoes_base_itens").upsert({
          id: item.id,
          adubacao_id: l.execucaoId,
          fazenda_id: payload.fazendaId,
          insumo_id: item.insumoId,
          produto_nome: item.nome,
          dose_kg_ha: item.dose,
          dose_kg_ha_recomendada: item.doseRecomendada,
          // mesmo motivo do total_consumido em pulverizacao_itens — sem
          // isso, excluirAdubacao (lib/db.ts) não estorna o estoque.
          quantidade_kg: item.dose * l.areaHa,
        })
      )
    )
  );
  const erroItens = resultadosItens.find((r) => r.error)?.error;
  if (erroItens) return { ok: false, erro: erroItens.message };

  return finalizarTarefa(supabase, "recomendacoes_adubacao", payload);
}

export type PayloadFechamentoCorretivo = PayloadBase & { finalidade: string };

export async function executarFechamentoCorretivo(
  supabase: SupabaseCliente,
  payload: PayloadFechamentoCorretivo
): Promise<ResultadoExecucao> {
  const resultadosExecucao = await Promise.all(
    payload.linhas.map((l) =>
      supabase.from("correcoes_solo").upsert({
        id: l.execucaoId,
        fazenda_id: payload.fazendaId,
        ciclo_id: payload.cicloId,
        talhao_id: l.talhaoId,
        data_aplicacao: payload.dataRealizada,
        area_ha: l.areaHa,
        finalidade: payload.finalidade,
        observacao: payload.observacoes,
        maquina_id: payload.maquinaId,
        status_campo: "pendente",
        origem_lancamento: "app_campo",
        lancado_por_perfil_id: payload.perfilId,
      } as never)
    )
  );
  const erroExecucao = resultadosExecucao.find((r) => r.error)?.error;
  if (erroExecucao) return { ok: false, erro: erroExecucao.message };

  const resultadosItens = await Promise.all(
    payload.linhas.flatMap((l) =>
      l.itens.map((item) =>
        supabase.from("correcoes_solo_itens").upsert({
          id: item.id,
          correcao_id: l.execucaoId,
          fazenda_id: payload.fazendaId,
          insumo_id: item.insumoId,
          produto_nome: item.nome,
          dose_ton_ha: item.dose,
          dose_ton_ha_recomendada: item.doseRecomendada,
          // mesmo motivo do total_consumido em pulverizacao_itens — sem
          // isso, excluirCorrecao (lib/db.ts) não estorna o estoque.
          quantidade_ton: item.dose * l.areaHa,
        })
      )
    )
  );
  const erroItens = resultadosItens.find((r) => r.error)?.error;
  if (erroItens) return { ok: false, erro: erroItens.message };

  return finalizarTarefa(supabase, "recomendacoes_corretivo", payload);
}

export type PayloadFechamentoPlantio = PayloadBase;

// `plantios` não tem tabela de itens (1 insumo por linha) — cada "item" de
// `linhas[].itens` já virou sua própria linha de plantio, uma por
// combinação talhão × produto, com `execucaoId` igual ao `id` do item.
export async function executarFechamentoPlantio(
  supabase: SupabaseCliente,
  payload: PayloadFechamentoPlantio
): Promise<ResultadoExecucao> {
  const linhasPlantio = payload.linhas.flatMap((l) =>
    l.itens.map((item) => ({
      id: item.id,
      fazenda_id: payload.fazendaId,
      ciclo_id: payload.cicloId,
      talhao_id: l.talhaoId,
      data_plantio: payload.dataRealizada,
      area_ha: l.areaHa,
      variedade: item.nome,
      lote_semente: item.lote ?? null,
      dose_kg_ha: item.unidade === "kg" ? item.dose : null,
      dose_kg_ha_recomendada: item.unidade === "kg" ? item.doseRecomendada : null,
      // mesmo motivo do total_consumido em pulverizacao_itens — sem isso,
      // excluirPlantio (lib/db.ts) não estorna o estoque.
      quantidade_kg: item.unidade === "kg" ? item.dose * l.areaHa : null,
      maquina_id: payload.maquinaId,
      observacao:
        item.unidade === "kg"
          ? payload.observacoes
          : `Dose: ${item.dose} ${item.unidade}/ha${payload.observacoes ? ` — ${payload.observacoes}` : ""}`,
      status_campo: "pendente",
      origem_lancamento: "app_campo",
      lancado_por_perfil_id: payload.perfilId,
    }))
  );

  const { error: erroPlantio } = await supabase.from("plantios").upsert(linhasPlantio as never);
  if (erroPlantio) return { ok: false, erro: erroPlantio.message };

  return finalizarTarefa(supabase, "recomendacoes_plantio", payload);
}

async function finalizarTarefa(
  supabase: SupabaseCliente,
  tabelaRecomendacao: string,
  payload: PayloadBase
): Promise<ResultadoExecucao> {
  // `tabelaRecomendacao` só é conhecida em runtime (uma função só serve os 4
  // tipos) — supabase-js exige união literal do schema gerado pro nome da
  // tabela, incompatível com isso. `any` aqui é deliberado: não tem como o
  // TypeScript validar colunas de uma tabela que só o valor da variável
  // decide, então fingir um tipo específico (como `ReturnType<typeof
  // supabase.from>`, que resolve pra UMA tabela fixa do union) só mascarava
  // o problema e quebrava a cada tabela nova no schema.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as unknown as { from: (table: string) => any };

  const [resultadoRecomendacao, resultadoTarefa] = await Promise.all([
    sb
      .from(tabelaRecomendacao)
      .update({ hectares_realizados: payload.hectaresRealizados, data_aplicacao_realizada: payload.dataRealizada })
      .eq("id", payload.recomendacaoId),
    supabase
      .from("tarefas")
      .update({ status: "concluida", concluida_em: new Date().toISOString() })
      .eq("id", payload.tarefaId),
  ]);

  const erro = resultadoRecomendacao.error ?? resultadoTarefa.error;
  if (erro) return { ok: false, erro: erro.message };
  return { ok: true };
}
