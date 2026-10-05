import type { createClient } from "@/lib/supabase/client";

type SupabaseCliente = ReturnType<typeof createClient>;

export type LoteComSaldo = { lote: string; saldo: number };

// Saldo de cada lote de semente de um insumo numa fazenda = entradas − saídas
// registradas em movimentacoes_estoque com aquele lote_semente. Só lotes com
// saldo positivo voltam. Pagina de 1.000 em 1.000 (CLAUDE.md 2.7 — o cap
// implícito do Supabase trunca silenciosamente).
export async function buscarLotesComSaldo(
  supabase: SupabaseCliente,
  insumoId: string,
  fazendaId: string
): Promise<LoteComSaldo[]> {
  const saldos = new Map<string, number>();
  const TAMANHO = 1000;
  for (let pagina = 0; ; pagina++) {
    const { data, error } = await supabase
      .from("movimentacoes_estoque")
      .select("tipo, quantidade, lote_semente")
      .eq("insumo_id", insumoId)
      .eq("fazenda_id", fazendaId)
      .not("lote_semente", "is", null)
      .range(pagina * TAMANHO, pagina * TAMANHO + TAMANHO - 1);
    if (error) throw new Error(error.message);
    const linhas = data ?? [];
    for (const m of linhas) {
      const lote = m.lote_semente as string;
      const quantidade = Number(m.quantidade) || 0;
      const sinal = m.tipo === "entrada" ? 1 : m.tipo === "saida" ? -1 : 0;
      saldos.set(lote, (saldos.get(lote) ?? 0) + sinal * quantidade);
    }
    if (linhas.length < TAMANHO) break;
  }
  return Array.from(saldos.entries())
    .filter(([, saldo]) => saldo > 0)
    .map(([lote, saldo]) => ({ lote, saldo }))
    .sort((a, b) => a.lote.localeCompare(b.lote));
}
