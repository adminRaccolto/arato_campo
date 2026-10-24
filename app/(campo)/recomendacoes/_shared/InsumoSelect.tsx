"use client";

import { useMemo, useState } from "react";
import { inputStyle } from "./styles";

// Dropdown de insumo com um campo de busca acima — catálogos de insumo por
// fazenda podem ter centenas de itens, rolar a lista toda pra achar um
// produto não escala. A busca filtra por nome (contém, sem diferenciar
// maiúsculas); o item já selecionado continua aparecendo mesmo se não bater
// com o texto digitado, pra não perder a seleção ao editar a busca depois.
export function InsumoSelect({
  insumos,
  value,
  onChange,
  placeholder,
}: {
  insumos: { id: string; nome: string }[];
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
}) {
  const [busca, setBusca] = useState("");

  const opcoes = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return insumos;
    const filtrados = insumos.filter((i) => i.nome.toLowerCase().includes(termo));
    if (value && !filtrados.some((i) => i.id === value)) {
      const selecionado = insumos.find((i) => i.id === value);
      if (selecionado) return [selecionado, ...filtrados];
    }
    return filtrados;
  }, [insumos, busca, value]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ ...inputStyle, height: 36, fontSize: 13 }}
      />
      <select style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {opcoes.map((i) => (
          <option key={i.id} value={i.id}>
            {i.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
