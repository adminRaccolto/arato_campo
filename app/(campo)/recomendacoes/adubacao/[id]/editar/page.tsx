"use client";

import { EditarRecomendacao, type CampoDoseConfig } from "../../../_shared/EditarRecomendacao";
import { CONFIG_ADUBACAO } from "@/lib/recomendacoes/executores";

const CAMPO_DOSE: CampoDoseConfig = {
  modo: "fixa",
  campoDose: "dose_kg_ha",
  unidadeLabel: "kg/ha",
};
const INSUMOS_CATEGORIA = ["fertilizante", "micronutriente"];

export default function EditarRecomendacaoAdubacaoPage() {
  return (
    <EditarRecomendacao
      tipo="Adubação"
      config={CONFIG_ADUBACAO}
      campoDose={CAMPO_DOSE}
      insumosCategoria={INSUMOS_CATEGORIA}
    />
  );
}
