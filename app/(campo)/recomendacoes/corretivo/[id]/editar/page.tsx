"use client";

import { EditarRecomendacao, type CampoDoseConfig } from "../../../_shared/EditarRecomendacao";
import { CONFIG_CORRETIVO } from "@/lib/recomendacoes/executores";

const CAMPO_DOSE: CampoDoseConfig = {
  modo: "fixa",
  campoDose: "dose_ton_ha",
  unidadeLabel: "ton/ha",
  campoExtra: { campo: "prnt_pct", label: "PRNT (%)" },
};
export default function EditarRecomendacaoCorretivoPage() {
  return (
    <EditarRecomendacao
      tipo="Corretivo"
      config={CONFIG_CORRETIVO}
      campoDose={CAMPO_DOSE}
    />
  );
}
