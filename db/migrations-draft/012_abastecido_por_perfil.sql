-- RASCUNHO DE SCHEMA — App Campo — quem abasteceu (pode ser diferente de
-- quem registrou o lançamento), pedido do dono 15/set/2026
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 001-011.
--
-- `abastecimentos.lancado_por_perfil_id` (migration 011) já registra quem
-- fez o LANÇAMENTO no app — mas nem sempre é a mesma pessoa que fisicamente
-- abasteceu a máquina (pode ser um encarregado lançando pelo operador, por
-- exemplo). Coluna nova, default o próprio usuário logado na tela, mas
-- trocável. `abastecimentos.operador` (texto livre, já existe) não é
-- reaproveitado — não é usado em nenhum lugar hoje (nem desktop, nem
-- app/campo antigo) e o padrão do App Campo é sempre referenciar `perfis`
-- por FK (lancado_por_perfil_id, aprovado_por_perfil_id, maquina_id), não
-- texto livre, pra manter identidade rastreável de verdade.

alter table abastecimentos add column if not exists abastecido_por_perfil_id uuid references perfis(id);

comment on column abastecimentos.abastecido_por_perfil_id is
  'Quem fisicamente abasteceu a máquina — pode divergir de lancado_por_perfil_id (quem registrou o lançamento no app). Default é o próprio usuário logado, mas o campo é editável na tela (App Campo).';
