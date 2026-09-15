import type { createClient } from "@/lib/supabase/client";

type SupabaseCliente = ReturnType<typeof createClient>;

type TabelaPendente = "plantios" | "pulverizacoes" | "adubacoes_base" | "correcoes_solo" | "abastecimentos";

// Avisa por WhatsApp (rota cross-app no Arato principal, que tem a
// EVOLUTION_API_KEY — o App Campo nunca tem essa chave, CLAUDE.md 3.2) todo
// Gerente Campo com acesso à fazenda que existe algo novo pra aprovar
// (CLAUDE.md, seção 4.3/5 — notificação automática, decisão 15/set/2026).
//
// Best-effort e não-bloqueante: chamado depois que o lançamento já foi
// gravado com sucesso (status_campo='pendente'); se a sessão expirou, a
// rede falhou, ou ninguém tem telefone cadastrado, o operador nem percebe —
// o lançamento em si já está salvo, só o aviso é que não sai. Nunca deve
// atrasar nem falhar o fluxo de fechamento/abastecimento por causa disso.
export async function notificarPendente(
  supabase: SupabaseCliente,
  tabela: TabelaPendente,
  id: string
): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) return;

    await fetch(`${process.env.NEXT_PUBLIC_ARATO_API_URL}/api/campo/notificar-pendente`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tabela, id }),
    });
  } catch {
    // best-effort — silencioso de propósito, ver comentário acima
  }
}
