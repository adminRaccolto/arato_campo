-- RASCUNHO DE SCHEMA — App Campo — papéis do App Campo (Gerente Campo /
-- Operador / Apontador), usados pela tela de Aprovações.
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 006.
--
-- Reaproveita `perfis.papel` (coluna já existente no Arato principal, hoje
-- livre — sem constraint, confirmado em supabase_migrations.sql) em vez de
-- criar coluna nova. O check abaixo só restringe o valor quando
-- `produto = 'campo'` — perfis do Arato principal (produto='arato')
-- continuam livres pra usar qualquer valor de papel que já usam hoje.
--
-- Só quem tem papel = 'gerente_campo' pode aprovar/rejeitar na tela
-- Aprovações (decisão 4.3 do CLAUDE.md: "qualquer perfil Gerente Campo com
-- acesso à fazenda pode aprovar" — não há aprovador designado por pessoa).

alter table perfis
  add constraint perfis_papel_campo_check
  check (produto <> 'campo' or papel in ('gerente_campo', 'operador', 'apontador'));

comment on column perfis.papel is
  'Cargo/função do perfil. Para produto=''arato'': livre, uso do Arato principal. Para produto=''campo'': restrito a gerente_campo | operador | apontador — só gerente_campo aprova/rejeita lançamentos (decisão 4.3).';
