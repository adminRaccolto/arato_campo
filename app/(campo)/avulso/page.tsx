"use client";

import Link from "next/link";
import { sectionStyle, sectionTitleStyle } from "../recomendacoes/_shared/styles";

const TIPOS = [
  { href: "/avulso/plantio/nova", label: "Plantio" },
  { href: "/avulso/pulverizacao/nova", label: "Pulverização" },
  { href: "/avulso/adubacao/nova", label: "Adubação" },
  { href: "/avulso/corretivo/nova", label: "Corretivo" },
  { href: "/avulso/colheita/nova", label: "Colheita" },
] as const;

// Lançamento Avulso (17/out/2026) — registra uma operação que JÁ ACONTECEU,
// sem recomendação prévia. Existe porque exigir recomendação pra tudo é
// inviável numa fazenda com a operação em andamento (implantação do App
// Campo no meio da safra) — ver CLAUDE.md, seção 7. Continua passando pela
// aprovação do Gerente Campo antes de virar estoque/custo, igual a tudo.
export default function AvulsoPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Lançamento Avulso</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          Pra registrar uma operação que já aconteceu, sem recomendação prévia
        </p>
      </header>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>O que você quer lançar?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {TIPOS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                style={{
                  display: "flex", alignItems: "center", padding: "12px 14px", borderRadius: 8,
                  border: "0.5px solid var(--azul-petroleo)", background: "#fff",
                  fontSize: 14, fontWeight: 600, color: "var(--azul-escuro)",
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
