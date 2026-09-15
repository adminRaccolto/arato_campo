-- RASCUNHO DE SCHEMA — App Campo — fluxo de aprovação em abastecimentos
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001-010.
--
-- `abastecimentos` ficou de fora do loop original da migration 006 (que
-- cobria plantios/pulverizacoes/colheitas/adubacoes_base/correcoes_solo/
-- romaneios_entrada) — na hora não tinha sido decidido ainda que o App
-- Campo ia ganhar tela de Abastecimento (item 4, pedido 15/set/2026).
-- Mesmo pacote de 6 colunas das outras tabelas (CLAUDE.md 4.3): abastecer
-- consome estoque (do insumo combustível, ou da bomba_combustivel se
-- amarrado a uma), então precisa do mesmo gate de aprovação antes de
-- baixar — senão um operador lança um abastecimento e o estoque desce sem
-- ninguém ter revisado.

alter table abastecimentos
  add column if not exists status_campo text not null default 'aprovado'
    check (status_campo in ('pendente', 'aprovado', 'rejeitado'));
alter table abastecimentos
  add column if not exists origem_lancamento text not null default 'arato'
    check (origem_lancamento in ('arato', 'app_campo'));
alter table abastecimentos add column if not exists lancado_por_perfil_id uuid references perfis(id);
alter table abastecimentos add column if not exists aprovado_por_perfil_id uuid references perfis(id);
alter table abastecimentos add column if not exists aprovado_em timestamptz;
alter table abastecimentos add column if not exists motivo_rejeicao text;

create index if not exists idx_abastecimentos_status_campo_pendente
  on abastecimentos (fazenda_id) where status_campo <> 'aprovado';
