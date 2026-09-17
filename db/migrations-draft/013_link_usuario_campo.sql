-- RASCUNHO DE SCHEMA — App Campo — vincula perfil de campo ao usuário Arato
--
-- Mesmo aviso dos anteriores: não é fonte de verdade, só rascunho pra
-- revisão. Aplicar depois de 012.
--
-- Contexto (17/set/2026): gestão de operadores do App Campo estava só em
-- /admin/campo (Raccolto). Decisão do dono: Admin Raccolto passa a cuidar só
-- de assinatura/liberação (conta_modulos), a gestão de operadores (criar,
-- editar, resetar PIN) passa a ser self-service, feita pelo próprio gestor
-- da fazenda dentro do Arato Web (Configurações > Usuários e Permissões).
--
-- Isso cria um perfil paralelo (produto='campo', e-mail sintético + PIN,
-- tabela `perfis`) a partir de um registro já existente na tela de usuários
-- do Arato Web (tabela `usuarios`, ligada ao `perfis` produto='arato' do
-- gestor via auth_user_id — mas SEM relação nenhuma com o perfil de campo
-- que essa mesma tela agora também cria). Sem esse vínculo, reabrir o
-- cadastro de um usuário no Arato Web não teria como saber se ele já tem (ou
-- não) acesso ao Campo — precisaria adivinhar por nome, frágil.
--
-- Vínculo é opcional (nullable): um operador de campo pode ter sido criado
-- sem nunca ter tido um `usuário` Arato Web normal (ex: tratorista que só
-- usa o App Campo, nunca loga no ERP) — nesse caso fica null, e ele só
-- aparece na lista "Operadores do App Campo", não anexado a nenhum usuário.

alter table perfis
  add column if not exists usuario_vinculado_id uuid references usuarios(id) on delete set null;

comment on column perfis.usuario_vinculado_id is
  'Só relevante para produto=''campo''. Aponta pro registro em `usuarios` (Arato Web) que originou este perfil de campo, quando criado a partir da tela Configurações > Usuários — permite a tela saber que esse usuário já tem acesso ao Campo ao reabrir o cadastro. Null quando o operador nunca teve/não tem usuário Arato Web (ex: só usa o App Campo).';

create index if not exists perfis_usuario_vinculado_idx on perfis (usuario_vinculado_id) where usuario_vinculado_id is not null;
