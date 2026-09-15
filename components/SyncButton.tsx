"use client";

import { useCallback, useEffect, useState } from "react";
import { lerFila, removerDaFila, contarPendentes } from "@/lib/offline-store";
import { despacharOperacao } from "@/lib/sync/despachar";

type Status = "idle" | "sincronizando" | "ok" | "erro";

export function SyncButton() {
  const [pendentes, setPendentes] = useState(0);
  const [online, setOnline] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const atualizar = useCallback(() => {
    setPendentes(contarPendentes());
    setOnline(navigator.onLine);
  }, []);

  const sincronizar = useCallback(async () => {
    const fila = lerFila();
    if (fila.length === 0 || !navigator.onLine) return;

    setStatus("sincronizando");
    setMsg("");

    // Sequencial, não Promise.all: operações de tipos diferentes podem
    // competir pela mesma linha (ex.: duas tarefas fechando a mesma
    // recomendação) — mais simples e seguro rodar uma de cada vez aqui,
    // já que isso roda em segundo plano, sem o operador esperando.
    const sincronizados: string[] = [];
    const falhas: string[] = [];
    for (const op of fila) {
      try {
        const resultado = await despacharOperacao(op);
        if (resultado.ok) sincronizados.push(op.id);
        else falhas.push(op.id);
      } catch {
        falhas.push(op.id);
      }
    }

    if (sincronizados.length > 0) removerDaFila(sincronizados);
    atualizar();

    if (falhas.length === 0) {
      setStatus("ok");
      setMsg(`${sincronizados.length} operaç${sincronizados.length === 1 ? "ão enviada" : "ões enviadas"}`);
    } else {
      setStatus("erro");
      setMsg(`${sincronizados.length} enviadas · ${falhas.length} com erro`);
    }

    setTimeout(() => {
      setStatus("idle");
      setMsg("");
    }, 4000);
  }, [atualizar]);

  useEffect(() => {
    atualizar();
    window.addEventListener("online", atualizar);
    window.addEventListener("offline", atualizar);
    const iv = setInterval(atualizar, 3000);
    return () => {
      window.removeEventListener("online", atualizar);
      window.removeEventListener("offline", atualizar);
      clearInterval(iv);
    };
  }, [atualizar]);

  // Tenta sincronizar sozinho assim que a conexão volta, e por um timer de
  // retry enquanto houver pendências (CLAUDE.md 4.6) — sem exigir toque do
  // operador.
  useEffect(() => {
    function aoFicarOnline() {
      sincronizar();
    }
    window.addEventListener("online", aoFicarOnline);
    const iv = setInterval(() => {
      if (navigator.onLine && contarPendentes() > 0) sincronizar();
    }, 45000);
    return () => {
      window.removeEventListener("online", aoFicarOnline);
      clearInterval(iv);
    };
  }, [sincronizar]);

  if (pendentes === 0 && status === "idle") return null;

  const cor =
    status === "sincronizando" ? "#555555" : status === "ok" ? "var(--verde)" : status === "erro" ? "var(--vermelho)" : online ? "var(--mostarda)" : "#888888";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      {msg && (
        <div
          style={{
            background: status === "ok" ? "#D1FAE5" : status === "erro" ? "#FEE2E2" : "#F5F5F5",
            color: status === "ok" ? "#065F46" : status === "erro" ? "#7F1D1D" : "#333",
            fontSize: 11,
            fontWeight: 600,
            padding: "5px 10px",
            borderRadius: 8,
            border: `0.5px solid ${status === "ok" ? "#6EE7B7" : status === "erro" ? "#FCA5A5" : "#DDD"}`,
            maxWidth: 220,
            textAlign: "right",
          }}
        >
          {msg}
        </div>
      )}

      <button
        onClick={sincronizar}
        disabled={!online || status === "sincronizando" || pendentes === 0}
        title={
          !online
            ? "Sem conexão — aguardando internet"
            : pendentes === 0
              ? "Nada pendente"
              : `Sincronizar ${pendentes} operaç${pendentes === 1 ? "ão" : "ões"} pendente${pendentes === 1 ? "" : "s"}`
        }
        style={{
          background: cor,
          color: "#fff",
          border: "none",
          borderRadius: 14,
          padding: "10px 16px",
          fontSize: 13,
          fontWeight: 700,
          cursor: !online || status === "sincronizando" || pendentes === 0 ? "default" : "pointer",
          opacity: (!online || pendentes === 0) && status === "idle" ? 0.6 : 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          minWidth: 130,
          justifyContent: "center",
        }}
      >
        {status === "sincronizando" ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
            Enviando…
          </>
        ) : status === "ok" ? (
          <>✓ Sincronizado</>
        ) : status === "erro" ? (
          <>⚠ Tentar novamente</>
        ) : (
          <>
            {!online && <span style={{ fontSize: 10 }}>📡</span>}
            <span>↑ Sincronizar</span>
            {pendentes > 0 && (
              <span
                style={{
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 10,
                  padding: "1px 7px",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {pendentes}
              </span>
            )}
          </>
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
