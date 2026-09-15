import type { createClient } from "@/lib/supabase/client";

type SupabaseCliente = ReturnType<typeof createClient>;

export type PayloadAbastecimento = {
  id: string;
  fazendaId: string;
  maquinaId: string;
  bombaId: string | null;
  insumoId: string | null;
  cicloId: string | null;
  quantidadeL: number;
  horimetro: number | null;
  km: number | null;
  data: string;
  observacao: string | null;
  perfilId: string | null;
};

// Só grava o lançamento com status_campo='pendente' (CLAUDE.md 4.3) — a
// baixa de estoque (da bomba, se houver, ou do insumo combustível direto)
// só acontece na aprovação, igual às demais operações. Ver
// aprovar-lancamento (repo agrofield) pra lógica de consumo.
export async function executarAbastecimento(
  supabase: SupabaseCliente,
  payload: PayloadAbastecimento
): Promise<{ ok: boolean; erro?: string }> {
  const { error } = await supabase.from("abastecimentos").upsert({
    id: payload.id,
    fazenda_id: payload.fazendaId,
    maquina_id: payload.maquinaId,
    bomba_id: payload.bombaId,
    insumo_id: payload.insumoId,
    ciclo_id: payload.cicloId,
    quantidade_l: payload.quantidadeL,
    horimetro: payload.horimetro,
    km: payload.km,
    data: payload.data,
    observacao: payload.observacao,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: payload.perfilId,
  });

  if (error) return { ok: false, erro: error.message };
  return { ok: true };
}
