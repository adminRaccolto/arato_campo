-- RASCUNHO DE SCHEMA — App Campo — corrige constraint perfis_papel_check
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 007.
--
-- Descoberto na hora de criar os primeiros perfis de teste do App Campo
-- (14/set/2026): existe uma constraint `perfis_papel_check` que já restringia
-- `papel` a ('admin','operador','financeiro','lavoura','visualizador') — não
-- existia (ou não tinha sido detectada) quando 007_papel_campo.sql foi
-- escrita, que assumiu `papel` como coluna livre. As duas constraints juntas
-- bloqueavam 'gerente_campo' e 'apontador' pra qualquer perfil, inclusive
-- produto='campo', apesar de 007 already permitir esses valores nesse caso.
-- Fix: adiciona os 2 valores que faltam na constraint antiga — 'operador' já
-- estava lá (usado também pelo Arato principal, com outro sentido). A
-- constraint de 007 (`perfis_papel_campo_check`) continua existindo por cima
-- — mais restritiva ainda pra produto='campo', o que é intencional.

alter table perfis drop constraint if exists perfis_papel_check;
alter table perfis add constraint perfis_papel_check
  check (papel = any (array['admin', 'operador', 'financeiro', 'lavoura', 'visualizador', 'gerente_campo', 'apontador']));
