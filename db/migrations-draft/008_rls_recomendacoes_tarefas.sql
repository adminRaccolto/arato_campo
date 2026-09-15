-- RASCUNHO DE SCHEMA — App Campo — RLS nas tabelas novas (001/002/003/004)
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001, 002, 004, 003 (nessa ordem) e 006 (esta
-- migration depende de perfis.produto/fazendas_permitidas, criados lá).
--
-- Por que este arquivo existe separado dos outros: ao revisar como escrever
-- essas políticas, conferimos o supabase_migrations.sql real do Arato
-- principal (2026-09-14) e descobrimos que NENHUMA tabela do banco hoje tem
-- isolamento de tenant de verdade no Postgres — fazendas/talhoes/insumos/
-- perfis/monitoramento_pragas não têm RLS habilitada; plantios/pulverizacoes/
-- colheitas/ciclos têm RLS habilitada mas com policy "allow_all" (`using
-- (true)`), que na prática não filtra nada. Isolamento hoje é feito 100% no
-- código da aplicação (query já filtrada por conta_id), não no banco — o
-- oposto do que a seção 4.4 deste projeto assumia como já existente em
-- algum lugar pra copiar.
--
-- Decisão do dono (14/set/2026): as tabelas NOVAS do App Campo ganham RLS de
-- verdade, escopada por fazenda — não replicar o padrão "allow_all" do resto
-- do banco. Não mexe em nenhuma tabela existente (zero risco de regressão no
-- Arato principal hoje). O buraco no resto do banco fica registrado como
-- pendência separada (CLAUDE.md seção 5) — projeto à parte, não algo pra
-- resolver de passagem aqui.

-- =========================================================================
-- fn_pode_acessar_fazenda_campo — regra de acesso única, reaproveitada em
-- todas as tabelas novas abaixo
-- =========================================================================
-- Espelha a mesma regra já implementada no client (lib/auth/AuthProvider.tsx
-- deste repo): fazendas_permitidas NULL = fallback pro escopo da conta
-- inteira (comportamento herdado de conta recém-provisionada, antes de um
-- admin restringir); fazendas_permitidas não-nulo = só as fazendas naquela
-- lista (vazio = nenhuma, bloqueio explícito). Perfis produto='arato' (o
-- gestor no Arato principal) têm acesso por conta inteira, igual ao resto do
-- sistema. Equipe Raccolto (perfis.role) e o superadmin
-- (lib/raccotlo-auth.ts do repo Arato principal) têm bypass total, mesmo
-- padrão usado em todo o resto do admin.
create or replace function fn_pode_acessar_fazenda_campo(p_fazenda_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from perfis p
    join fazendas f on f.id = p_fazenda_id
    where p.user_id = auth.uid()
    and (
      p.role in ('raccotlo', 'raccotlo_gestor')
      or (auth.jwt() ->> 'email') = 'gino@raccolto.com.br'
      or (p.produto = 'arato' and p.conta_id = f.conta_id)
      or (p.produto = 'campo' and p.fazendas_permitidas is null and p.conta_id = f.conta_id)
      or (p.produto = 'campo' and p.fazendas_permitidas is not null and p_fazenda_id = any(p.fazendas_permitidas))
    )
  );
$$;

comment on function fn_pode_acessar_fazenda_campo is
  'Regra de acesso por fazenda para as tabelas novas do App Campo (recomendacoes_*, tarefas). Usada em RLS — não confundir com checagem client-side equivalente em lib/auth/AuthProvider.tsx.';

-- =========================================================================
-- Tabelas com fazenda_id direto: os 4 cabeçalhos de recomendação + tarefas
-- =========================================================================
do $$
declare tabela text;
begin
  foreach tabela in array array[
    'recomendacoes_pulverizacao', 'recomendacoes_adubacao',
    'recomendacoes_corretivo', 'recomendacoes_plantio', 'tarefas'
  ]
  loop
    execute format('alter table %I enable row level security;', tabela);
    execute format(
      'create policy %I on %I for all using (fn_pode_acessar_fazenda_campo(fazenda_id)) with check (fn_pode_acessar_fazenda_campo(fazenda_id));',
      'campo_fazenda_' || tabela, tabela
    );
  end loop;
end $$;

-- =========================================================================
-- Tabelas filhas (talhões/produtos): não têm fazenda_id direto, só
-- recomendacao_id — sobe até o cabeçalho pra achar a fazenda. Nome da tabela
-- pai é sempre o nome da tabela filha sem o sufixo _talhoes/_produtos.
-- =========================================================================
do $$
declare tabela text;
declare pai text;
begin
  foreach tabela in array array[
    'recomendacoes_pulverizacao_talhoes', 'recomendacoes_pulverizacao_produtos',
    'recomendacoes_adubacao_talhoes', 'recomendacoes_adubacao_produtos',
    'recomendacoes_corretivo_talhoes', 'recomendacoes_corretivo_produtos',
    'recomendacoes_plantio_talhoes', 'recomendacoes_plantio_produtos'
  ]
  loop
    pai := regexp_replace(tabela, '_(talhoes|produtos)$', '');
    execute format('alter table %I enable row level security;', tabela);
    execute format(
      'create policy %I on %I for all using (fn_pode_acessar_fazenda_campo((select fazenda_id from %I where id = %I.recomendacao_id))) with check (fn_pode_acessar_fazenda_campo((select fazenda_id from %I where id = %I.recomendacao_id)));',
      'campo_fazenda_' || tabela, tabela, pai, tabela, pai, tabela
    );
  end loop;
end $$;

-- =========================================================================
-- tarefas_transferencias — não tem fazenda_id nem recomendacao_id, só
-- tarefa_id (sobe até `tarefas`, que já tem fazenda_id direto)
-- =========================================================================
alter table tarefas_transferencias enable row level security;
create policy "campo_fazenda_tarefas_transferencias" on tarefas_transferencias
for all using (
  fn_pode_acessar_fazenda_campo((select fazenda_id from tarefas where id = tarefas_transferencias.tarefa_id))
) with check (
  fn_pode_acessar_fazenda_campo((select fazenda_id from tarefas where id = tarefas_transferencias.tarefa_id))
);
