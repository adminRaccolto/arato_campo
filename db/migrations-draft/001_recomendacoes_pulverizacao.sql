-- RASCUNHO DE SCHEMA — App Campo — Recomendações Agronômicas > Pulverização
--
-- Este arquivo NÃO é a fonte de verdade do schema. Por convenção do projeto
-- (CLAUDE.md seção 3.1), `supabase_migrations.sql` vive só no repo do Arato
-- principal (/Users/ginomigotto/agrofield) e é a única fonte de schema real.
-- Este .sql fica aqui só como rascunho de modelagem, pra revisão, até ser
-- copiado (e possivelmente ajustado) para o migrations file do repo principal
-- e de fato executado no banco.
--
-- Nada abaixo foi rodado no banco.
--
-- Colunas de `insumos`/`talhoes` referenciadas abaixo foram confirmadas contra
-- o schema real do banco (introspecção via `supabase gen types typescript`,
-- 2026-09-11) — não são mais suposição:
--   - insumos.categoria = 'defensivo' (texto livre; constraint antiga listada
--     em supabase_migrations.sql linha ~619 do repo Arato principal)
--   - insumos.fazenda_id NOT NULL — o catálogo de insumos é por FAZENDA
--     (estoque físico), não por conta. Reforça o mesmo escopo desta tabela.
--   - talhoes.area_ha existe como assumido.
-- Extensão pgcrypto (gen_random_uuid()) assumida habilitada — outras tabelas
-- do Arato já usam uuid com esse default.

-- =========================================================================
-- recomendacoes_pulverizacao — cabeçalho do plano de pulverização
-- =========================================================================
-- Distinção importante: isto é um PLANO (o que deveria ser feito), não o
-- LANÇAMENTO de execução. O lançamento real (o que foi feito) continua sendo
-- a tabela `pulverizacoes` já existente no Arato, preenchida na tela
-- "Operações Campo" do App Campo quando o operador fecha a tarefa gerada
-- daqui. Por isso esta tabela NÃO tem status_campo/aprovação (seção 4.3) —
-- esse fluxo se aplica ao lançamento de execução, não ao plano.
create table recomendacoes_pulverizacao (
  id uuid primary key default gen_random_uuid(),

  -- dado físico de uma fazenda específica (talhões pertencem a uma fazenda) —
  -- por isso fazenda_id, não conta_id (regra da seção 2.3 do CLAUDE.md)
  fazenda_id uuid not null references fazendas(id),
  ciclo_id uuid not null references ciclos(id),

  criado_por_perfil_id uuid not null references perfis(id),

  -- Datas — as 3 pedidas:
  --   1. data_recomendacao: default "hoje". Setada pelo próprio app no
  --      momento da criação (não confiar só no default do banco), porque a
  --      recomendação pode ser criada offline e sincronizar depois — o
  --      default do banco refletiria a data do SYNC, não da criação real.
  --   2. data_aplicacao_indicada: quando a aplicação deveria acontecer.
  --   3. data_aplicacao_realizada: quando de fato aconteceu — nula até o
  --      fechamento da tarefa, e pode divergir da indicada (clima, logística).
  data_recomendacao date not null default current_date,
  data_aplicacao_indicada date not null,
  data_aplicacao_realizada date,

  -- Área: sugerida = soma dos talhões selecionados (snapshot no momento da
  -- criação, guardado também por talhão em recomendacoes_pulverizacao_talhoes).
  -- Realizada: preenchida pelo operador no fechamento da tarefa, pode divergir.
  hectares_sugeridos numeric(10,2) not null,
  hectares_realizados numeric(10,2),

  -- Parâmetros técnicos da recomendação (melhores práticas de pulverização)
  volume_calda_l_ha numeric(8,2) not null,
  tipo_bico text not null
    check (tipo_bico in ('leque_plano', 'insuflacao_ar', 'jato_conico', 'leque_duplo')),
  pressao_bar numeric(4,1) not null,
  classificacao_gota text not null
    check (classificacao_gota in ('fina', 'media', 'grossa', 'muito_grossa')),

  -- Janela climática recomendada (faixas aceitáveis para liberar a aplicação)
  temperatura_min_c numeric(4,1),
  temperatura_max_c numeric(4,1),
  umidade_relativa_min_pct numeric(4,1),
  vento_min_kmh numeric(4,1),
  vento_max_kmh numeric(4,1),

  observacoes text,

  criado_em timestamptz not null default now()
);

create index idx_recomendacoes_pulverizacao_fazenda on recomendacoes_pulverizacao(fazenda_id);
create index idx_recomendacoes_pulverizacao_ciclo on recomendacoes_pulverizacao(ciclo_id);

-- =========================================================================
-- recomendacoes_pulverizacao_talhoes — talhões selecionados (multi-select)
-- =========================================================================
create table recomendacoes_pulverizacao_talhoes (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_pulverizacao(id) on delete cascade,
  talhao_id uuid not null references talhoes(id),

  -- snapshot da área do talhão no momento da recomendação — não recalcular
  -- retroativamente se a área do talhão mudar depois no cadastro
  area_ha numeric(10,2) not null,

  unique (recomendacao_id, talhao_id)
);

create index idx_recomendacoes_pulverizacao_talhoes_recomendacao
  on recomendacoes_pulverizacao_talhoes(recomendacao_id);

-- =========================================================================
-- recomendacoes_pulverizacao_produtos — itens da calda (tank-mix)
-- =========================================================================
create table recomendacoes_pulverizacao_produtos (
  id uuid primary key default gen_random_uuid(),
  recomendacao_id uuid not null references recomendacoes_pulverizacao(id) on delete cascade,

  -- restrito a insumos.categoria = 'defensivo' — validado na aplicação
  insumo_id uuid not null references insumos(id),

  dose_por_ha numeric(10,4) not null,
  -- mesmo domínio de unidade usado em insumos.unidade (subset aplicável a
  -- defensivos) — "/ha" já é implícito no nome da coluna dose_por_ha
  unidade_dose text not null
    check (unidade_dose in ('L', 'mL', 'kg', 'g')),

  -- ordem de entrada na calda (regra geral: pó molhável → suspensão
  -- concentrada → emulsão → concentrado solúvel) — opcional, só pra guiar o
  -- operador na hora de montar a calda de verdade
  ordem_mistura smallint,

  unique (recomendacao_id, insumo_id)
);

create index idx_recomendacoes_pulverizacao_produtos_recomendacao
  on recomendacoes_pulverizacao_produtos(recomendacao_id);

-- `tarefas` / `tarefas_transferencias` foram movidas para
-- 003_tarefas.sql — elas referenciam as recomendações de adubação, corretivo
-- e plantio também (002_recomendacoes_adubacao_corretivo.sql e
-- 004_recomendacoes_plantio.sql), então precisam vir depois que as quatro
-- existirem. Aplicar 001 → 002 → 004 → 003 nessa ordem.
