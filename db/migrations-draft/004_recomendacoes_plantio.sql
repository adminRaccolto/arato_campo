-- RASCUNHO DE SCHEMA — App Campo — Recomendações Agronômicas > Plantio
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001/002 (referencia fazendas/ciclos/talhoes/
-- insumos/perfis, iguais aos outros tipos).
--
-- Campos comparados com a tabela real de execução `plantios` (introspecção
-- 2026-09-11): ela usa `dose_kg_ha`, `variedade`, `lote_semente`,
-- `data_colheita_prev`, e um único `insumo_id` por linha (sem tabela de
-- itens). Diferença deliberada aqui: a recomendação suporta MAIS de um
-- produto (semente + inoculante, categorias diferentes com unidades de dose
-- diferentes — semente em kg/ha, inoculante tipicamente em mL/ha), então
-- reaproveitei o formato dose_por_ha + unidade_dose já usado em
-- recomendacoes_pulverizacao_produtos em vez do dose_kg_ha fixo de lá.
-- insumos.categoria usados: 'semente' e 'inoculante' (confirmados na
-- constraint insumos_categoria_check do schema real).

-- =========================================================================
-- recomendacoes_plantio — cabeçalho do plano de plantio
-- =========================================================================
-- Mesma distinção plano vs. lançamento dos outros 3 tipos: o lançamento de
-- execução continua sendo `plantios`, preenchido em "Operações Campo".
create table recomendacoes_plantio (
  id uuid primary key default gen_random_uuid(),

  fazenda_id uuid not null references fazendas(id),
  ciclo_id uuid not null references ciclos(id),

  criado_por_perfil_id uuid not null references perfis(id),

  data_recomendacao date not null default current_date,
  data_aplicacao_indicada date not null,
  data_aplicacao_realizada date,

  -- mesmo campo que já existe em plantios.data_colheita_prev — estimativa,
  -- não obrigatória (depende do ciclo/cultura)
  data_colheita_prevista date,

  hectares_sugeridos numeric(10,2) not null,
  hectares_realizados numeric(10,2),

  -- Parâmetros técnicos (melhores práticas de plantio)
  populacao_plantas_ha integer,
  espacamento_entrelinhas_cm numeric(5,1),
  profundidade_semeadura_cm numeric(4,1),
  velocidade_plantio_kmh numeric(4,1),

  observacoes text,

  criado_em timestamptz not null default now()
);

create index idx_recomendacoes_plantio_fazenda on recomendacoes_plantio(fazenda_id);
create index idx_recomendacoes_plantio_ciclo on recomendacoes_plantio(ciclo_id);

-- =========================================================================
-- recomendacoes_plantio_talhoes — talhões selecionados (multi-select)
-- =========================================================================
create table recomendacoes_plantio_talhoes (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_plantio(id) on delete cascade,
  talhao_id uuid not null references talhoes(id),
  area_ha numeric(10,2) not null,

  unique (recomendacao_id, talhao_id)
);

create index idx_recomendacoes_plantio_talhoes_recomendacao
  on recomendacoes_plantio_talhoes(recomendacao_id);

-- =========================================================================
-- recomendacoes_plantio_produtos — semente(s) + inoculante da recomendação
-- =========================================================================
create table recomendacoes_plantio_produtos (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_plantio(id) on delete cascade,

  -- restrito a insumos.categoria in ('semente', 'inoculante') — validado na
  -- aplicação
  insumo_id uuid not null references insumos(id),

  dose_por_ha numeric(10,4) not null,
  -- semente é kg/ha; inoculante costuma ser mL/ha (ou mL/50kg de semente,
  -- convertido pra mL/ha na hora de preencher) — por isso unidade flexível,
  -- igual ao padrão de recomendacoes_pulverizacao_produtos
  unidade_dose text not null
    check (unidade_dose in ('kg', 'g', 'L', 'mL')),

  -- rastreabilidade do lote de semente — mesmo campo que plantios.lote_semente
  lote text,

  unique (recomendacao_id, insumo_id)
);

create index idx_recomendacoes_plantio_produtos_recomendacao
  on recomendacoes_plantio_produtos(recomendacao_id);
