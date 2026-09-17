"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyncButton } from "@/components/SyncButton";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useFazendaAtiva } from "@/lib/fazenda-ativa/FazendaAtivaProvider";

const NAV_ITEMS = [
  { href: "/", label: "Início", icone: "🏠" },
  { href: "/tarefas", label: "Tarefas", icone: "📋" },
  { href: "/monitoramento/nova", label: "Monitoramento", icone: "🐛" },
  { href: "/recomendacoes/plantio/nova", label: "Plantio", icone: "🌱" },
  { href: "/recomendacoes/pulverizacao/nova", label: "Pulverização", icone: "💧" },
  { href: "/recomendacoes/adubacao/nova", label: "Adubação", icone: "🌿" },
  { href: "/recomendacoes/corretivo/nova", label: "Corretivo", icone: "⚗️" },
  { href: "/abastecimento/nova", label: "Abastecimento", icone: "⛽" },
] as const;

// "Aprovações" aparece pra todo mundo (17/set/2026: Operador também precisa
// ver — e editar — os próprios lançamentos pendentes, só que sem aprovar
// nada), rótulo muda conforme o papel. "Recomendações" (lista + edição
// enquanto a tarefa não fecha) só aparece pra quem cria recomendação.
const NAV_ITEM_RECOMENDACOES = { href: "/recomendacoes", label: "Recomendações", icone: "📑" } as const;

const PAPEL_LABEL: Record<string, string> = {
  gerente_campo: "Gerente Campo",
  operador: "Operador",
  apontador: "Apontador",
};

export function CampoShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const auth = useAuth();
  const fazendaAtiva = useFazendaAtiva();
  const [menuAberto, setMenuAberto] = useState(false);

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

  const itensNav = [
    ...NAV_ITEMS,
    ...(auth.ehGerenteCampo ? [NAV_ITEM_RECOMENDACOES] : []),
    { href: "/aprovacoes", label: auth.ehGerenteCampo ? "Aprovações" : "Meus Lançamentos", icone: "✅" },
  ];

  function fechar() {
    setMenuAberto(false);
  }

  return (
    <>
      <div className="campo-topbar">
        <button className="campo-hamburguer" onClick={() => setMenuAberto(true)} aria-label="Abrir menu">
          ☰
        </button>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Campo</span>
      </div>

      {menuAberto && <div className="campo-overlay" onClick={fechar} />}

      <aside className="campo-sidebar" data-aberto={menuAberto}>
        <div style={{ padding: "20px 18px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={auth.logoUrl ?? "/icons/icon-192.png"}
            alt={auth.logoUrl ? "Logo do cliente" : "Arato"}
            style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain", background: "#fff" }}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Campo</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>by Arato</p>
          </div>
        </div>

        {fazendaAtiva.fazendas.length > 1 && (
          <div style={{ padding: "0 18px 14px" }}>
            <select
              value={fazendaAtiva.fazendaId}
              onChange={(e) => fazendaAtiva.setFazendaId(e.target.value)}
              style={{
                width: "100%",
                height: 36,
                padding: "0 10px",
                borderRadius: 8,
                border: "0.5px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {fazendaAtiva.fazendas.map((f) => (
                <option key={f.id} value={f.id} style={{ color: "#000" }}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, padding: "4px 10px" }}>
          {itensNav.map((item) => {
            const ativo = item.href === "/" ? path === "/" : path.startsWith(item.href.split("/nova")[0]);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={fechar}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: ativo ? 600 : 400,
                  color: ativo ? "#fff" : "rgba(255,255,255,0.68)",
                  background: ativo ? "rgba(255,255,255,0.08)" : "transparent",
                  borderLeft: ativo ? "3px solid var(--mostarda)" : "3px solid transparent",
                }}
              >
                <span style={{ fontSize: 15, width: 18, textAlign: "center", opacity: 0.9 }}>{item.icone}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "14px 18px",
            borderTop: "0.5px solid rgba(255,255,255,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {auth.nome ?? "Operador"}
            </p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{PAPEL_LABEL[auth.papel ?? ""] ?? auth.papel}</p>
          </div>
          <button
            onClick={auth.signOut}
            style={{
              height: 34,
              borderRadius: 8,
              border: "0.5px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "rgba(255,255,255,0.85)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="campo-content">{children}</div>

      <SyncButton />
    </>
  );
}
