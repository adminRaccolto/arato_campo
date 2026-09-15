import Link from "next/link";

const CORES_ICONE: Record<string, string> = {
  azul: "#EAF0F6",
  verde: "#E8F7EE",
  mostarda: "#FBF1DF",
};

function Cartao({ href, icone, cor, label, subtitulo }: { href: string; icone: string; cor: keyof typeof CORES_ICONE; label: string; subtitulo?: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 14,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(11,45,80,0.06), 0 1px 8px rgba(11,45,80,0.05)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          minWidth: 40,
          borderRadius: 11,
          background: CORES_ICONE[cor],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 19,
        }}
      >
        {icone}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--azul-escuro)" }}>{label}</p>
        {subtitulo && <p style={{ fontSize: 11, color: "var(--azul-petroleo)", marginTop: 2 }}>{subtitulo}</p>}
      </div>
      <span style={{ color: "var(--mostarda)", fontSize: 18 }}>›</span>
    </Link>
  );
}

function TituloSecao({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--azul-petroleo)", letterSpacing: 0.4 }}>
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px 20px 4px" }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: "var(--azul-escuro)" }}>Início</p>
        <p style={{ fontSize: 12, color: "var(--azul-petroleo)", marginTop: 2 }}>O que você precisa fazer agora</p>
      </header>

      <div style={{ flex: 1, padding: "16px 20px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TituloSecao>Aprovações</TituloSecao>
          <Cartao href="/aprovacoes" icone="✅" cor="verde" label="Lançamentos pendentes" subtitulo="Aprovar ou rejeitar o que os operadores lançaram" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TituloSecao>Tarefas</TituloSecao>
          <Cartao href="/tarefas" icone="📋" cor="azul" label="Minhas tarefas" subtitulo="O que está atribuído a você agora" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TituloSecao>Monitoramento</TituloSecao>
          <Cartao href="/monitoramento/nova" icone="🐛" cor="mostarda" label="Novo monitoramento de campo" subtitulo="Pragas, doenças e plantas daninhas" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TituloSecao>Recomendações agronômicas</TituloSecao>
          <Cartao href="/recomendacoes/plantio/nova" icone="🌱" cor="verde" label="Plantio" />
          <Cartao href="/recomendacoes/pulverizacao/nova" icone="💧" cor="azul" label="Pulverização" />
          <Cartao href="/recomendacoes/adubacao/nova" icone="🌿" cor="verde" label="Adubação" />
          <Cartao href="/recomendacoes/corretivo/nova" icone="⚗️" cor="mostarda" label="Corretivo" />
        </div>
      </div>
    </main>
  );
}
