-- RASCUNHO DE SCHEMA — App Campo — Tarefas
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001, 002 e 004 (referencia as 4 recomendações).

-- =========================================================================
-- tarefas — fila de execução por operador (gerada por uma recomendação)
-- =========================================================================
-- Uma tarefa vem de exatamente um tipo de recomendação — por isso 4 FKs
-- nuláveis (uma por tipo) em vez de 1 coluna genérica de "origem" (que
-- exigiria abrir mão de FK de verdade). O check garante que só uma delas
-- está preenchida. Cresce por mais uma FK nulável + mais um termo no check
-- toda vez que um novo tipo de recomendação passar a gerar tarefa.
create table tarefas (
  id uuid primary key default gen_random_uuid(),

  fazenda_id uuid not null references fazendas(id),

  recomendacao_pulverizacao_id uuid references recomendacoes_pulverizacao(id),
  recomendacao_adubacao_id uuid references recomendacoes_adubacao(id),
  recomendacao_corretivo_id uuid references recomendacoes_corretivo(id),
  recomendacao_plantio_id uuid references recomendacoes_plantio(id),

  -- operador responsável ATUAL — muda em caso de transferência (ver
  -- tarefas_transferencias abaixo para o histórico de quem autorizou)
  perfil_atribuido_id uuid not null references perfis(id),

  status text not null default 'pendente'
    check (status in ('pendente', 'em_andamento', 'concluida', 'cancelada')),

  criado_em timestamptz not null default now(),
  concluida_em timestamptz,

  constraint tarefas_uma_origem_check check (
    (case when recomendacao_pulverizacao_id is not null then 1 else 0 end) +
    (case when recomendacao_adubacao_id is not null then 1 else 0 end) +
    (case when recomendacao_corretivo_id is not null then 1 else 0 end) +
    (case when recomendacao_plantio_id is not null then 1 else 0 end) = 1
  )
);

create index idx_tarefas_perfil_atribuido on tarefas(perfil_atribuido_id);
create index idx_tarefas_fazenda on tarefas(fazenda_id);

-- =========================================================================
-- tarefas_transferencias — auditoria de reatribuição de tarefa
-- =========================================================================
-- Toda transferência exige o PIN do Gerente Campo (autorizado_por_perfil_id)
-- — não é self-service do operador. Guardamos o histórico completo porque é
-- uma ação sensível (quem autorizou, de quem para quem, quando).
create table tarefas_transferencias (
  id uuid primary key default gen_random_uuid(),
  tarefa_id uuid not null references tarefas(id) on delete cascade,

  perfil_origem_id uuid not null references perfis(id),
  perfil_destino_id uuid not null references perfis(id),
  autorizado_por_perfil_id uuid not null references perfis(id),

  transferido_em timestamptz not null default now()
);

create index idx_tarefas_transferencias_tarefa on tarefas_transferencias(tarefa_id);
