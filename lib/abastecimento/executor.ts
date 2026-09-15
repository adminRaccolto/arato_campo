import type { createClient } from "@/lib/supabase/client";
import { notificarPendente } from "@/lib/notificacoes/notificar-pendente";

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
  // quem fisicamente abasteceu — pode ser diferente de quem está logado
  // registrando o lançamento (perfilId/lancado_por_perfil_id). Default é o
  // próprio usuário logado, mas a tela deixa trocar (pedido 15/set/2026).
  abastecidoPorPerfilId: string | null;
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
    abastecido_por_perfil_id: payload.abastecidoPorPerfilId,
  });

  if (error) return { ok: false, erro: error.message };

  await notificarPendente(supabase, "abastecimentos", payload.id);
  return { ok: true };
}
