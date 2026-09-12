export function SucessoConclusao({ onVoltar }: { onVoltar: () => void }) {
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
