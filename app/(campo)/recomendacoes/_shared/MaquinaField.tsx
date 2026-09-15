import type { Maquina } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle } from "./styles";

// Opcional na recomendação (o Gerente Campo pode não saber ainda qual
// máquina vai sobrar disponível) — o operador confirma ou troca no
// fechamento da tarefa (ver FechamentoX). Fica dentro da seção de
// parâmetros técnicos de cada tela, não em seção própria.
export function MaquinaField({
  maquinas,
  maquinaId,
  setMaquinaId,
  obrigatorio = false,
}: {
  maquinas: Maquina[];
  maquinaId: string;
  setMaquinaId: (id: string) => void;
  obrigatorio?: boolean;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={labelStyle}>Máquina / equipamento{obrigatorio ? "" : " (opcional)"}</span>
      <select style={inputStyle} value={maquinaId} onChange={(e) => setMaquinaId(e.target.value)} required={obrigatorio}>
        <option value="">{maquinas.length === 0 ? "Nenhuma cadastrada nesta fazenda" : "Selecione..."}</option>
        {maquinas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nome}
            {m.tipo ? ` (${m.tipo})` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
