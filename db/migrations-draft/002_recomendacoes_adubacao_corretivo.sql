-- RASCUNHO DE SCHEMA — App Campo — Recomendações Agronômicas > Adubação e Corretivo
--
-- Mesmo aviso do 001_recomendacoes_pulverizacao.sql: não é fonte de verdade,
-- fica aqui só pra revisão até ser copiado pro repo do Arato principal.
-- Aplicar depois de 001.
--
-- Mesmo padrão estrutural da Pulverização (cabeçalho + talhões + produtos +
-- gera tarefa), só troca os parâmetros técnicos. Pra manter o vocabulário
-- igual ao que o Arato principal já usa nos lançamentos de execução reais
-- (`adubacoes_base`/`adubacoes_base_itens` e `correcoes_solo`/
-- `correcoes_solo_itens`), os nomes e os enums abaixo foram copiados direto
-- de lá (supabase_migrations.sql do repo Arato principal, linhas ~867 e
-- ~896) em vez de inventar um vocabulário novo:
--   - adubacoes_base.modalidade check: convencional|sulco|broadcast|foliar|fertirrigacao
--   - correcoes_solo.finalidade check: calcario|gesso|micronutrientes|organico|outros
--   - adubacoes_base_itens usa dose_kg_ha / correcoes_solo_itens usa dose_ton_ha
--     (calcário/gesso são aplicados em toneladas por hectare, não kg) — mantido
--     aqui pelo mesmo motivo.
-- insumos.categoria: 'fertilizante' (+ 'micronutriente' quando finalidade for
-- micronutrientes) para adubação; 'corretivo' para corretivo — confirmados na
-- constraint insumos_categoria_check do schema real.

-- =========================================================================
-- recomendacoes_adubacao — cabeçalho do plano de adubação de base
-- =========================================================================
-- Mesma distinção plano vs. lançamento do 001: o lançamento de execução
-- continua sendo `adubacoes_base`, preenchido em "Operações Campo".
create table recomendacoes_adubacao (
  id uuid primary key default gen_random_uuid(),

  fazenda_id uuid not null references fazendas(id),
  ciclo_id uuid not null references ciclos(id),

  criado_por_perfil_id uuid not null references perfis(id),

  data_recomendacao date not null default current_date,
  data_aplicacao_indicada date not null,
  data_aplicacao_realizada date,

  hectares_sugeridos numeric(10,2) not null,
  hectares_realizados numeric(10,2),

  -- mesmo vocabulário de adubacoes_base.modalidade
  modalidade text not null default 'convencional'
    check (modalidade in ('convencional', 'sulco', 'broadcast', 'foliar', 'fertirrigacao')),

  -- profundidade de aplicação/incorporação — relevante sobretudo pra fósforo,
  -- que é imóvel no solo e depende de colocação próxima à raiz
  profundidade_aplicacao_cm numeric(4,1),

  observacoes text,

  criado_em timestamptz not null default now()
);

create index idx_recomendacoes_adubacao_fazenda on recomendacoes_adubacao(fazenda_id);
create index idx_recomendacoes_adubacao_ciclo on recomendacoes_adubacao(ciclo_id);

-- =========================================================================
-- recomendacoes_adubacao_talhoes — talhões selecionados (multi-select)
-- =========================================================================
create table recomendacoes_adubacao_talhoes (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_adubacao(id) on delete cascade,
  talhao_id uuid not null references talhoes(id),
  area_ha numeric(10,2) not null,

  unique (recomendacao_id, talhao_id)
);

create index idx_recomendacoes_adubacao_talhoes_recomendacao
  on recomendacoes_adubacao_talhoes(recomendacao_id);

-- =========================================================================
-- recomendacoes_adubacao_produtos — fertilizantes da recomendação
-- =========================================================================
create table recomendacoes_adubacao_produtos (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_adubacao(id) on delete cascade,

  -- restrito a insumos.categoria in ('fertilizante', 'micronutriente') —
  -- validado na aplicação
  insumo_id uuid not null references insumos(id),

  -- mesmo nome/unidade de adubacoes_base_itens.dose_kg_ha
  dose_kg_ha numeric(10,4) not null,

  unique (recomendacao_id, insumo_id)
);

create index idx_recomendacoes_adubacao_produtos_recomendacao
  on recomendacoes_adubacao_produtos(recomendacao_id);

-- =========================================================================
-- recomendacoes_corretivo — cabeçalho do plano de correção de solo
-- =========================================================================
-- Mesma distinção plano vs. lançamento: o lançamento de execução continua
-- sendo `correcoes_solo`, preenchido em "Operações Campo".
create table recomendacoes_corretivo (
  id uuid primary key default gen_random_uuid(),

  fazenda_id uuid not null references fazendas(id),
  ciclo_id uuid not null references ciclos(id),

  criado_por_perfil_id uuid not null references perfis(id),

  data_recomendacao date not null default current_date,
  data_aplicacao_indicada date not null,
  data_aplicacao_realizada date,

  hectares_sugeridos numeric(10,2) not null,
  hectares_realizados numeric(10,2),

  -- mesmo vocabulário de correcoes_solo.finalidade
  finalidade text not null default 'calcario'
    check (finalidade in ('calcario', 'gesso', 'micronutrientes', 'organico', 'outros')),

  -- profundidade de incorporação — superficial (calagem de manutenção) vs.
  -- incorporado (correção mais profunda) muda o tempo de reação do corretivo
  profundidade_incorporacao_cm numeric(4,1),

  observacoes text,

  criado_em timestamptz not null default now()
);

create index idx_recomendacoes_corretivo_fazenda on recomendacoes_corretivo(fazenda_id);
create index idx_recomendacoes_corretivo_ciclo on recomendacoes_corretivo(ciclo_id);

-- =========================================================================
-- recomendacoes_corretivo_talhoes — talhões selecionados (multi-select)
-- =========================================================================
create table recomendacoes_corretivo_talhoes (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_corretivo(id) on delete cascade,
  talhao_id uuid not null references talhoes(id),
  area_ha numeric(10,2) not null,

  unique (recomendacao_id, talhao_id)
);

create index idx_recomendacoes_corretivo_talhoes_recomendacao
  on recomendacoes_corretivo_talhoes(recomendacao_id);

-- =========================================================================
-- recomendacoes_corretivo_produtos — corretivos da recomendação
-- =========================================================================
create table recomendacoes_corretivo_produtos (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_corretivo(id) on delete cascade,

  -- restrito a insumos.categoria = 'corretivo' — validado na aplicação
  insumo_id uuid not null references insumos(id),

  -- mesmo nome/unidade de correcoes_solo_itens.dose_ton_ha — calcário/gesso
  -- são aplicados em toneladas por hectare
  dose_ton_ha numeric(10,4) not null,

  -- Poder Relativo de Neutralização Total (%) do calcário usado — mesma dose
  -- em ton/ha de calcários com PRNT diferente neutraliza acidez de forma
  -- diferente; relevante só pra finalidade = 'calcario', por isso nulável
  prnt_pct numeric(5,2),

  unique (recomendacao_id, insumo_id)
);

create index idx_recomendacoes_corretivo_produtos_recomendacao
  on recomendacoes_corretivo_produtos(recomendacao_id);
