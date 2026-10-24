"use client";

import { EditarRecomendacao, type CampoDoseConfig } from "../../../_shared/EditarRecomendacao";
import { CONFIG_PLANTIO } from "@/lib/recomendacoes/executores";

const CAMPO_DOSE: CampoDoseConfig = {
  modo: "selecionavel",
  campoDose: "dose_por_ha",
  campoUnidade: "unidade_dose",
  unidades: ["kg", "g", "L", "mL"],
  campoLote: "lote",
};
export default function EditarRecomendacaoPlantioPage() {
  return (
    <EditarRecomendacao
      tipo="Plantio"
      config={CONFIG_PLANTIO}
      campoDose={CAMPO_DOSE}
    />
  );
}
