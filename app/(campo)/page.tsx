import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = (data?.claims?.email as string | undefined) ?? "";

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "0.5px solid var(--azul-petroleo)",
          background: "#fff",
        }}
      >
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
            Campo
          </p>
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>{email}</p>
        </div>
        <LogoutButton />
      </header>

      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--azul-petroleo)" }}>
            TAREFAS
          </p>
          <Link
            href="/tarefas"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderRadius: 12,
              border: "0.5px solid var(--azul-petroleo)",
              background: "#fff",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
              Minhas tarefas
            </span>
            <span style={{ color: "var(--mostarda)", fontSize: 18 }}>›</span>
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--azul-petroleo)" }}>
            MONITORAMENTO
          </p>
          <Link
            href="/monitoramento/nova"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderRadius: 12,
              border: "0.5px solid var(--azul-petroleo)",
              background: "#fff",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
              Novo monitoramento de campo
            </span>
            <span style={{ color: "var(--mostarda)", fontSize: 18 }}>›</span>
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--azul-petroleo)" }}>
            RECOMENDAÇÕES AGRONÔMICAS
          </p>
          {[
            { href: "/recomendacoes/plantio/nova", label: "Nova recomendação de plantio" },
            { href: "/recomendacoes/pulverizacao/nova", label: "Nova recomendação de pulverização" },
            { href: "/recomendacoes/adubacao/nova", label: "Nova recomendação de adubação" },
            { href: "/recomendacoes/corretivo/nova", label: "Nova recomendação de corretivo" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: 12,
                border: "0.5px solid var(--azul-petroleo)",
                background: "#fff",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
                {item.label}
              </span>
              <span style={{ color: "var(--mostarda)", fontSize: 18 }}>›</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
