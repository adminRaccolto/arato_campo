"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyncButton } from "@/components/SyncButton";
import { useAuth } from "@/lib/auth/AuthProvider";

const NAV_ITEMS = [
  { href: "/", label: "Início", icone: "🏠" },
  { href: "/tarefas", label: "Tarefas", icone: "📋" },
  { href: "/monitoramento/nova", label: "Monitor.", icone: "🐛" },
  { href: "/recomendacoes/plantio/nova", label: "Plantio", icone: "🌱" },
  { href: "/recomendacoes/pulverizacao/nova", label: "Pulv.", icone: "💧" },
  { href: "/recomendacoes/adubacao/nova", label: "Adubação", icone: "🌿" },
  { href: "/recomendacoes/corretivo/nova", label: "Corretivo", icone: "⚗️" },
] as const;

// Só aparece pra quem pode aprovar — mantém a barra enxuta pra
// Operador/Apontador, que nunca usam essa tela.
const NAV_ITEM_APROVACOES = { href: "/aprovacoes", label: "Aprovar", icone: "✅" } as const;

export function CampoShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const auth = useAuth();

  if (auth.carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (auth.erro || auth.semAcesso) {
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
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          {auth.semAcesso ? "Sem acesso" : "Não foi possível continuar"}
        </p>
        <p style={{ fontSize: 13, color: "var(--vermelho)" }}>{auth.motivoSemAcesso ?? auth.erro}</p>
        <button
          onClick={auth.signOut}
          style={{
            height: 46,
            padding: "0 24px",
            borderRadius: 8,
            border: "none",
            background: "var(--azul-petroleo)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Sair
        </button>
      </main>
    );
  }

  const itensNav = auth.ehGerenteCampo ? [...NAV_ITEMS, NAV_ITEM_APROVACOES] : NAV_ITEMS;

  return (
    <>
      <div style={{ paddingBottom: 68 }}>{children}</div>

      <SyncButton />

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          background: "#fff",
          borderTop: "0.5px solid var(--azul-petroleo)",
          paddingBottom: "env(safe-area-inset-bottom, 0)",
          zIndex: 50,
        }}
      >
        {itensNav.map((item) => {
          const ativo = item.href === "/" ? path === "/" : path.startsWith(item.href.split("/nova")[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "8px 2px 6px",
                textDecoration: "none",
                color: ativo ? "var(--azul-petroleo)" : "var(--azul-escuro)",
                borderTop: ativo ? "2.5px solid var(--mostarda)" : "2.5px solid transparent",
                background: ativo ? "#EAF0F6" : "transparent",
                minWidth: 0,
              }}
            >
              <span style={{ fontSize: 17 }}>{item.icone}</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: ativo ? 700 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
