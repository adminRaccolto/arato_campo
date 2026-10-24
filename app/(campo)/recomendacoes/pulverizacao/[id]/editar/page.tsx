"use client";

import { EditarRecomendacao, type CampoDoseConfig } from "../../../_shared/EditarRecomendacao";
import { CONFIG_PULVERIZACAO } from "@/lib/recomendacoes/executores";

const CAMPO_DOSE: CampoDoseConfig = {
  modo: "selecionavel",
  campoDose: "dose_por_ha",
  campoUnidade: "unidade_dose",
  unidades: ["L", "mL", "kg", "g"],
};
export default function EditarRecomendacaoPulverizacaoPage() {
  return (
    <EditarRecomendacao
      tipo="Pulverização"
      config={CONFIG_PULVERIZACAO}
      campoDose={CAMPO_DOSE}
    />
  );
}
