"use client";

// Compartilhar manual (não é notificação automática — pedido do dono,
// 15/set/2026): usa o share nativo do celular quando existe (deixa o
// operador escolher o contato/grupo do WhatsApp na hora), ou cai num link
// wa.me como alternativa no computador. Não guarda nem manda número de
// telefone nenhum — zero infraestrutura de backend.
export function CompartilharWhatsApp({ mensagem }: { mensagem: string }) {
  async function compartilhar() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: mensagem });
        return;
      } catch {
        // usuário cancelou o share nativo — não faz nada
        return;
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, "_blank");
  }

  return (
    <button
      type="button"
      onClick={compartilhar}
      style={{
        height: 48,
        padding: "0 24px",
        borderRadius: 8,
        border: "0.5px solid var(--verde)",
        background: "#fff",
        color: "var(--verde)",
        fontSize: 14,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
      }}
    >
      <span>📲</span>
      Compartilhar no WhatsApp
    </button>
  );
}
