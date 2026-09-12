"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyncButton } from "@/components/SyncButton";

const NAV_ITEMS = [
  { href: "/", label: "Início", icone: "🏠" },
  { href: "/tarefas", label: "Tarefas", icone: "📋" },
  { href: "/monitoramento/nova", label: "Monitor.", icone: "🐛" },
  { href: "/recomendacoes/plantio/nova", label: "Plantio", icone: "🌱" },
  { href: "/recomendacoes/pulverizacao/nova", label: "Pulv.", icone: "💧" },
  { href: "/recomendacoes/adubacao/nova", label: "Adubação", icone: "🌿" },
  { href: "/recomendacoes/corretivo/nova", label: "Corretivo", icone: "⚗️" },
] as const;

export function CampoShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

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
        {NAV_ITEMS.map((item) => {
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
