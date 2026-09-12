-- RASCUNHO DE SCHEMA — App Campo — item 2 da seção 9 do CLAUDE.md
-- (perfis do App Campo + fluxo de aprovação nas tabelas operacionais)
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão, até ser copiado pro supabase_migrations.sql do repo do Arato
-- principal e de fato executado no banco. Nada abaixo foi rodado.
--
-- Confirmado por introspecção real do banco (2026-09-12): nenhuma das
-- colunas abaixo existe ainda em nenhuma tabela. Não confundir com
-- `origem_op_id` (Seção 242 do Arato principal, já existe em
-- plantios/pulverizacoes/colheitas/abastecimentos/adubacoes_base — serve
-- pra idempotência de sync, é uma coisa diferente de `origem_lancamento`)
-- nem com `origem_lancamento` de `lancamentos` (tabela financeira, sem
-- relação com este fluxo).

-- =========================================================================
-- perfis — campos do App Campo (decisão 4.2)
-- =========================================================================
alter table perfis
  add column if not exists produto text not null default 'arato'
    check (produto in ('arato', 'campo'));

alter table perfis
  add column if not exists fazendas_permitidas uuid[];

comment on column perfis.produto is
  'Qual app este perfil usa — arato (gestor, desktop) ou campo (operador, mobile). Default arato preserva todo perfil existente sem fricção.';
comment on column perfis.fazendas_permitidas is
  'Lista explícita de fazendas que um perfil produto=campo pode acessar. NULL/vazio = nenhuma (não herda "todas" por padrão — decisão 4.2, por segurança).';

-- =========================================================================
-- fluxo de aprovação (decisão 4.3) — mesmo pacote de 5 colunas em cada
-- tabela operacional que o App Campo escreve
-- =========================================================================
do $$
declare
  tabela text;
begin
  foreach tabela in array array[
    'plantios', 'pulverizacoes', 'colheitas',
    'adubacoes_base', 'correcoes_solo', 'romaneios_entrada'
  ]
  loop
    execute format(
      'alter table %I add column if not exists status_campo text not null default %L
         check (status_campo in (%L, %L, %L));',
      tabela, 'aprovado', 'pendente', 'aprovado', 'rejeitado'
    );
    execute format(
      'alter table %I add column if not exists origem_lancamento text not null default %L
         check (origem_lancamento in (%L, %L));',
      tabela, 'arato', 'arato', 'app_campo'
    );
    execute format('alter table %I add column if not exists lancado_por_perfil_id uuid references perfis(id);', tabela);
    execute format('alter table %I add column if not exists aprovado_por_perfil_id uuid references perfis(id);', tabela);
    execute format('alter table %I add column if not exists aprovado_em timestamptz;', tabela);
  end loop;
end $$;

-- default 'aprovado' preserva todo lançamento existente e todo lançamento
-- futuro criado pelo Arato principal sem fricção nenhuma (decisão 4.3) — só
-- o App Campo seta 'pendente' explicitamente no momento da criação (nunca
-- confiar no default pra isso, ver 4.6).

-- =========================================================================
-- índices — toda leitura que for filtrar por status_campo (DRE, Custos,
-- Kardex, relatório de aplicações — ver pendência mapeada na seção 5) vai
-- fazer isso em volume, então cada tabela ganha um índice parcial cobrindo
-- só o que NÃO é 'aprovado' (a maioria das linhas vai ser 'aprovado', não
-- vale a pena indexar isso)
-- =========================================================================
create index if not exists idx_plantios_status_campo_pendente
  on plantios (fazenda_id) where status_campo <> 'aprovado';
create index if not exists idx_pulverizacoes_status_campo_pendente
  on pulverizacoes (fazenda_id) where status_campo <> 'aprovado';
create index if not exists idx_colheitas_status_campo_pendente
  on colheitas (fazenda_id) where status_campo <> 'aprovado';
create index if not exists idx_adubacoes_base_status_campo_pendente
  on adubacoes_base (fazenda_id) where status_campo <> 'aprovado';
create index if not exists idx_correcoes_solo_status_campo_pendente
  on correcoes_solo (fazenda_id) where status_campo <> 'aprovado';
create index if not exists idx_romaneios_entrada_status_campo_pendente
  on romaneios_entrada (fazenda_id) where status_campo <> 'aprovado';
