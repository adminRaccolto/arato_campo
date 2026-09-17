import type { createClient } from "@/lib/supabase/client";

type SupabaseCliente = ReturnType<typeof createClient>;
type ResultadoExecucao = { ok: boolean; erro?: string };

export type ConfigRecomendacao = {
  tabela: string;
  tabelaTalhoes: string;
  tabelaProdutos: string;
  // nome da coluna em `tarefas` que aponta pra essa recomendação — ver
  // db/migrations-draft/003_tarefas.sql (uma FK nulável por tipo)
  colunaTarefaRecomendacao: string;
};

export const CONFIG_PULVERIZACAO: ConfigRecomendacao = {
  tabela: "recomendacoes_pulverizacao",
  tabelaTalhoes: "recomendacoes_pulverizacao_talhoes",
  tabelaProdutos: "recomendacoes_pulverizacao_produtos",
  colunaTarefaRecomendacao: "recomendacao_pulverizacao_id",
};
export const CONFIG_ADUBACAO: ConfigRecomendacao = {
  tabela: "recomendacoes_adubacao",
  tabelaTalhoes: "recomendacoes_adubacao_talhoes",
  tabelaProdutos: "recomendacoes_adubacao_produtos",
  colunaTarefaRecomendacao: "recomendacao_adubacao_id",
};
export const CONFIG_CORRETIVO: ConfigRecomendacao = {
  tabela: "recomendacoes_corretivo",
  tabelaTalhoes: "recomendacoes_corretivo_talhoes",
  tabelaProdutos: "recomendacoes_corretivo_produtos",
  colunaTarefaRecomendacao: "recomendacao_corretivo_id",
};
export const CONFIG_PLANTIO: ConfigRecomendacao = {
  tabela: "recomendacoes_plantio",
  tabelaTalhoes: "recomendacoes_plantio_talhoes",
  tabelaProdutos: "recomendacoes_plantio_produtos",
  colunaTarefaRecomendacao: "recomendacao_plantio_id",
};

export type PayloadCriacaoRecomendacao = {
  recomendacaoId: string;
  tarefaId: string;
  fazendaId: string;
  operadorPerfilId: string;
  // Já inclui `id: recomendacaoId` — os campos variam por tipo (bico/pressão
  // pra pulverização, modalidade pra adubação, etc.), por isso um bag solto
  // em vez de um tipo específico por tela.
  header: Record<string, unknown>;
  talhoes: { talhaoId: string; areaHa: number }[];
  // Cada item já no formato final da tabela, SEM `id`/`recomendacao_id`
  // (adicionados aqui) — ex.: { insumo_id, dose_por_ha, unidade_dose }.
  produtos: Record<string, unknown>[];
};

/**
 * Cria uma recomendação completa (cabeçalho + talhões + produtos) e a tarefa
 * do operador. Usa upsert com `ignoreDuplicates` em vez de insert puro —
 * uma reexecução da mesma operação (retry da fila offline após falha
 * parcial) não duplica nem quebra em violação de chave, porque os `id`
 * vêm todos do payload gerado uma vez só na criação (CLAUDE.md 4.6).
 */
export async function criarRecomendacao(
  supabase: SupabaseCliente,
  config: ConfigRecomendacao,
  payload: PayloadCriacaoRecomendacao
): Promise<ResultadoExecucao> {
  const sb = supabase as unknown as {
    from: (table: string) => ReturnType<typeof supabase.from>;
  };

  const { error: erroHeader } = await sb
    .from(config.tabela)
    .upsert(payload.header as never, { ignoreDuplicates: true });
  if (erroHeader) return { ok: false, erro: erroHeader.message };

  // `id` gerado aqui de novo a cada chamada (não vem do payload) — tudo bem
  // porque o upsert dessas duas tabelas usa onConflict em
  // (recomendacao_id, talhao_id/insumo_id), não em `id`. Um retry gera um
  // `id` novo pra cada linha mas ainda colide com a linha certa e é
  // ignorado (ignoreDuplicates), então continua idempotente.
  const linhasTalhoes = payload.talhoes.map((t) => ({
    id: crypto.randomUUID(),
    recomendacao_id: payload.recomendacaoId,
    talhao_id: t.talhaoId,
    area_ha: t.areaHa,
  }));
  const linhasProdutos = payload.produtos.map((p) => ({
    id: crypto.randomUUID(),
    recomendacao_id: payload.recomendacaoId,
    ...p,
  }));

  const [resTalhoes, resProdutos, resTarefa] = await Promise.all([
    sb.from(config.tabelaTalhoes).upsert(linhasTalhoes as never, { ignoreDuplicates: true, onConflict: "recomendacao_id,talhao_id" }),
    sb.from(config.tabelaProdutos).upsert(linhasProdutos as never, { ignoreDuplicates: true, onConflict: "recomendacao_id,insumo_id" }),
    sb.from("tarefas").upsert(
      {
        id: payload.tarefaId,
        fazenda_id: payload.fazendaId,
        [config.colunaTarefaRecomendacao]: payload.recomendacaoId,
        perfil_atribuido_id: payload.operadorPerfilId,
        status: "pendente",
      } as never,
      { ignoreDuplicates: true }
    ),
  ]);

  const erro = resTalhoes.error ?? resProdutos.error ?? resTarefa.error;
  if (erro) return { ok: false, erro: erro.message };
  return { ok: true };
}

export type PayloadEdicaoRecomendacao = {
  recomendacaoId: string;
  // Só os campos que a tela de edição deixa mudar (produtos, data indicada,
  // máquina, observações) — nunca fazenda/ciclo/talhões, que definem o
  // escopo já usado pra gerar a tarefa (CLAUDE.md 7, decisão 17/set/2026:
  // edição fica focada no que costuma precisar de correção, não replica
  // 100% da tela de criação).
  header: Record<string, unknown>;
  // Substitui a lista inteira de produtos (delete + insert) — mais simples
  // e seguro que diff item a item pra uma lista curta (1-3 produtos).
  produtos: Record<string, unknown>[];
};

/**
 * Edita uma recomendação já criada — só enquanto a tarefa dela ainda não
 * fechou (`tarefas.status` pendente/em_andamento; a tela de edição confere
 * isso antes de chamar). Não mexe em talhões nem gera tarefa nova.
 */
export async function atualizarRecomendacao(
  supabase: SupabaseCliente,
  config: ConfigRecomendacao,
  payload: PayloadEdicaoRecomendacao
): Promise<ResultadoExecucao> {
  // `any` deliberado — mesma razão de `finalizarTarefa` em
  // lib/tarefas/executores.ts: o nome da tabela só é conhecido em runtime
  // (`config.tabela`/`config.tabelaProdutos`), incompatível com a união
  // literal que supabase-js exige; `ReturnType<typeof supabase.from>`
  // resolve pra UMA tabela fixa do schema gerado e quebra em `.eq()`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as unknown as { from: (table: string) => any };

  const { error: erroHeader } = await sb
    .from(config.tabela)
    .update(payload.header as never)
    .eq("id", payload.recomendacaoId);
  if (erroHeader) return { ok: false, erro: erroHeader.message };

  const { error: erroDelete } = await sb
    .from(config.tabelaProdutos)
    .delete()
    .eq("recomendacao_id", payload.recomendacaoId);
  if (erroDelete) return { ok: false, erro: erroDelete.message };

  if (payload.produtos.length > 0) {
    const linhas = payload.produtos.map((p) => ({
      id: crypto.randomUUID(),
      recomendacao_id: payload.recomendacaoId,
      ...p,
    }));
    const { error: erroInsert } = await sb.from(config.tabelaProdutos).insert(linhas as never);
    if (erroInsert) return { ok: false, erro: erroInsert.message };
  }

  return { ok: true };
}
