-- RASCUNHO DE DADO (não é schema) — recategoriza 18 insumos de calcário/
-- gesso pra categoria='corretivo'.
--
-- Mesmo aviso de sempre: não é fonte de verdade, só rascunho pra revisão.
-- O dono aplica manualmente (supabase db query --linked --file ...) — nunca
-- a sessão sozinha, aqui é dado de produção de verdade, não schema.
--
-- Contexto (9/out/2026): achado ao investigar por que o dropdown de insumo
-- da tela de Corretivo (App Campo) vinha sempre vazio — NENHUM insumo no
-- banco tinha categoria='corretivo', apesar do cadastro do Arato principal
-- oferecer essa opção ("Corretivos de Solo"). Calcário/gesso real estavam
-- todos cadastrados como categoria='fertilizante' (ou 'outros', 1 caso).
-- Lista revisada e confirmada pelo dono (13 tinham subgrupo "CORRETIVOS"/
-- "Corretivo de Solo", sem ambiguidade; 5 tinham subgrupo "Adubação de
-- Base"/"Fertilizante"/null — confirmado que também são corretivos de
-- verdade, migrar junto).
--
-- Por id explícito (não por nome/ilike) — auditável, sem risco de pegar
-- algo que não devia.

update insumos set categoria = 'corretivo' where id in (
  '990120a1-5b9c-432a-8ab8-af78dab0b0a8', -- Fazenda Couto — Calcário Dolomítico
  '1cbe0be7-717a-4442-89d0-dd56c4ef7685', -- Fazenda Couto — Calcário Freavel (Rejeito)
  '9e95d784-d24a-4aab-b029-4671c8456e46', -- Fazenda Couto — Calcário Magnesiano
  '2ca3aec3-f452-4e1c-a618-df93f95eff26', -- Fazenda Couto — Gesso Mineral
  '1c7b4d70-2e4d-4456-a307-9fa27bd9587c', -- Fazenda Estância Guasca — Calcário Dolomítico
  'f1698d5f-648d-4164-a663-482ae2967fb9', -- Fazenda Estância Guasca — Calcário Filler (estava 'outros')
  '7b74c175-36e1-48c0-9652-0a8630b596f3', -- Fazenda Frei Galvão — Calcário Dolomítico
  '72956046-105f-41a5-a501-b0b72f219ac9', -- Fazenda Frei Galvão — Calcário Freavel (Rejeito)
  '27c2ca59-f812-48f6-886f-e45d07a99b3b', -- Fazenda Frei Galvão — Calcário Magnesiano
  'b0cbff2d-2b3e-430d-8e36-4e60163943cb', -- Fazenda Frei Galvão — Gesso Mineral
  '24a12109-b1f4-4179-ada7-8c818f3df7d7', -- Fazenda Rio Bonito — Calcário Dolomítico
  '51b85651-7117-45e1-aa4e-af010c436989', -- Fazenda Santa Helena — Calcário Calcítico
  '25efa297-2176-40e4-aed9-81cc22b92597', -- Fazenda Santa Helena — Calcário Dolomítico
  '2319f62d-ec24-4347-81e9-a65c27d71549', -- Fazenda Santa Helena — Gesso
  '03fabc69-93db-4b1f-a11a-efded8a06a9e', -- Nossa Senhora de Fátima — Calcário
  '76df6937-8c14-434d-8991-58ea70de5a55', -- Nossa Senhora de Fátima — Calcário Calcítico
  '02246d6b-385c-4221-93db-720ad29b81c9', -- Nossa Senhora de Fátima — Calcário Dolomítico
  '86e8c082-f8f4-4194-8adb-c9d1925eb76d'  -- Nossa Senhora de Fátima — Gesso Agrícola Prime GR
);
