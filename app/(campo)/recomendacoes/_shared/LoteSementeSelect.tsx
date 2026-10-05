"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { buscarLotesComSaldo, type LoteComSaldo } from "@/lib/estoque/lotes-semente";
import { inputStyle } from "./styles";

// Lote da semente escolhido na recomendação — lista só os lotes com saldo na
// fazenda. O saldo só cai na aprovação do lançamento (movimentação com o lote),
// não aqui.
export function LoteSementeSelect({
  fazendaId,
  insumoId,
  value,
  onChange,
}: {
  fazendaId: string;
  insumoId: string;
  value: string;
  onChange: (lote: string) => void;
}) {
  const [lotes, setLotes] = useState<LoteComSaldo[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!insumoId || !fazendaId) return;
    buscarLotesComSaldo(supabase, insumoId, fazendaId)
      .then((l) => { setLotes(l); setErro(null); })
      .catch((e: Error) => { setLotes([]); setErro(e.message); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insumoId, fazendaId]);

  if (!insumoId) {
    return <select style={inputStyle} disabled><option>Escolha a semente primeiro</option></select>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <select style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{lotes.length === 0 ? "Sem lote com saldo nesta fazenda" : "Lote (opcional)"}</option>
        {lotes.map((l) => (
          <option key={l.lote} value={l.lote}>
            {l.lote} — saldo {l.saldo.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          </option>
        ))}
      </select>
      {erro && <span style={{ fontSize: 11, color: "var(--vermelho)" }}>Não foi possível carregar os lotes: {erro}</span>}
    </div>
  );
}
