-- RASCUNHO DE SCHEMA — App Campo — máquina/equipamento + dose recomendada vs.
-- aplicada nas operações de lavoura (pedido do dono, 15/set/2026)
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001-009.
--
-- Dois pedidos que compartilham o mesmo padrão "recomendado vs. realizado"
-- (verde=automático o valor sugerido, mostarda=usuário quando o operador
-- muda na hora de fechar a tarefa — CLAUDE.md 2.6):
--
-- 1. Dose aplicada pode divergir da recomendada (o operador ajusta na hora
--    do fechamento). As tabelas de execução (pulverizacao_itens/
--    adubacoes_base_itens/correcoes_solo_itens/plantios) já guardam a dose
--    (dose_ha/dose_kg_ha/dose_ton_ha) — essa coluna vira a dose REALIZADA;
--    a coluna nova abaixo guarda a dose que a recomendação original pedia,
--    pra tela de Aprovações mostrar os dois lado a lado quando divergem.
-- 2. Máquina/equipamento usado na operação — cadastro já existe em
--    `maquinas` (por fazenda), só não tinha FK nenhuma ligando às operações
--    de lavoura. `maquina_id` nas 4 recomendações = sugestão do Gerente
--    Campo; `maquina_id` nas 4 tabelas de execução = confirmação (ou troca)
--    do operador no fechamento.

alter table recomendacoes_pulverizacao add column if not exists maquina_id uuid references maquinas(id);
alter table recomendacoes_adubacao add column if not exists maquina_id uuid references maquinas(id);
alter table recomendacoes_corretivo add column if not exists maquina_id uuid references maquinas(id);
alter table recomendacoes_plantio add column if not exists maquina_id uuid references maquinas(id);

alter table pulverizacoes add column if not exists maquina_id uuid references maquinas(id);
alter table adubacoes_base add column if not exists maquina_id uuid references maquinas(id);
alter table correcoes_solo add column if not exists maquina_id uuid references maquinas(id);
alter table plantios add column if not exists maquina_id uuid references maquinas(id);

alter table pulverizacao_itens add column if not exists dose_recomendada_ha numeric(10,4);
alter table adubacoes_base_itens add column if not exists dose_kg_ha_recomendada numeric(10,4);
alter table correcoes_solo_itens add column if not exists dose_ton_ha_recomendada numeric(10,4);
alter table plantios add column if not exists dose_kg_ha_recomendada numeric(10,4);

comment on column pulverizacao_itens.dose_recomendada_ha is
  'Dose original da recomendação (recomendacoes_pulverizacao_produtos.dose_por_ha) — dose_ha nesta tabela é a dose REALIZADA, ajustável pelo operador no fechamento. NULL em lançamentos que não vieram de uma recomendação do App Campo (ex.: lançamento direto do Arato principal).';
comment on column adubacoes_base_itens.dose_kg_ha_recomendada is
  'Mesmo padrão de pulverizacao_itens.dose_recomendada_ha — dose_kg_ha é a REALIZADA.';
comment on column correcoes_solo_itens.dose_ton_ha_recomendada is
  'Mesmo padrão de pulverizacao_itens.dose_recomendada_ha — dose_ton_ha é a REALIZADA.';
comment on column plantios.dose_kg_ha_recomendada is
  'Mesmo padrão de pulverizacao_itens.dose_recomendada_ha — dose_kg_ha é a REALIZADA.';
