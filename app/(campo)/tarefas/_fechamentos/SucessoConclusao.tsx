import { CompartilharWhatsApp } from "@/components/CompartilharWhatsApp";

export function SucessoConclusao({
  pendenteSync,
  onVoltar,
  mensagemWhatsApp,
}: {
  pendenteSync?: boolean;
  onVoltar: () => void;
  mensagemWhatsApp?: string;
}) {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "var(--verde)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 28,
        }}
      >
        ✓
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
        Tarefa concluída — lançamento enviado para aprovação.
      </p>
      {pendenteSync && (
        <p style={{ fontSize: 12, color: "var(--mostarda)", fontWeight: 600 }}>
          Salvo no aparelho — vai sincronizar assim que a conexão voltar.
        </p>
      )}
      {mensagemWhatsApp && <CompartilharWhatsApp mensagem={mensagemWhatsApp} />}

      <button
        onClick={onVoltar}
        style={{
          height: 48,
          padding: "0 24px",
          borderRadius: 8,
          border: "none",
          background: "var(--azul-petroleo)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Voltar às tarefas
      </button>
    </main>
  );
}
