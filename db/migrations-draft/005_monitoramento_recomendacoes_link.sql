-- RASCUNHO DE SCHEMA — App Campo — Monitoramento > vínculo com as novas recomendações
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra revisão.
--
-- Diferente dos anteriores, este é ADITIVO sobre uma tabela que **já existe em
-- produção**: `monitoramento_pragas` (confirmado por introspecção real do
-- banco, 2026-09-11) — o Arato principal já tem essa tela (app/campo/monitoramento)
-- funcionando, com upload de foto pro bucket `arquivos` e GPS via
-- navigator.geolocation. Não recriamos a tabela.
--
-- `monitoramento_pragas.recomendacao_id` já existe, mas tem FK travada em
-- `recomendacoes` — a tabela genérica do Arato principal, diferente das
-- 4 tabelas novas (`recomendacoes_pulverizacao/adubacao/corretivo/plantio`)
-- que criamos aqui. Não dá pra reaproveitar essa coluna pra apontar pras
-- novas sem violar a FK — por isso 4 colunas novas nuláveis, mesmo padrão
-- de `tarefas` (003_tarefas.sql): uma por tipo, no máximo uma preenchida.
-- `recomendacao_id` (a antiga) fica intocada, pro Arato principal continuar
-- funcionando exatamente como está.

alter table monitoramento_pragas
  add column if not exists recomendacao_pulverizacao_id uuid references recomendacoes_pulverizacao(id),
  add column if not exists recomendacao_adubacao_id uuid references recomendacoes_adubacao(id),
  add column if not exists recomendacao_corretivo_id uuid references recomendacoes_corretivo(id),
  add column if not exists recomendacao_plantio_id uuid references recomendacoes_plantio(id);

alter table monitoramento_pragas
  add constraint monitoramento_pragas_no_maximo_uma_recomendacao_nova_check check (
    (case when recomendacao_pulverizacao_id is not null then 1 else 0 end) +
    (case when recomendacao_adubacao_id is not null then 1 else 0 end) +
    (case when recomendacao_corretivo_id is not null then 1 else 0 end) +
    (case when recomendacao_plantio_id is not null then 1 else 0 end) <= 1
  );
