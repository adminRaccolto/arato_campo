"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pin,
    });

    setLoading(false);

    if (signInError) {
      setError("E-mail ou PIN inválido.");
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px 20px",
        gap: 24,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "var(--azul-petroleo)",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "var(--mostarda)", fontSize: 28, fontWeight: 600 }}>C</span>
        </div>
        <h1 style={{ fontSize: 17, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Campo
        </h1>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)", marginTop: 4 }}>
          Entre com seu e-mail e PIN
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--azul-escuro)" }}>
            E-mail
          </span>
          <input
            type="email"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operador@fazenda.campo"
            style={{
              height: 48,
              padding: "0 14px",
              fontSize: 15,
              border: "0.5px solid var(--azul-petroleo)",
              borderRadius: 8,
              background: "#fff",
              color: "var(--azul-escuro)",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--azul-escuro)" }}>
            PIN
          </span>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="current-password"
            required
            minLength={4}
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
            style={{
              height: 48,
              padding: "0 14px",
              fontSize: 15,
              letterSpacing: 4,
              border: "0.5px solid var(--azul-petroleo)",
              borderRadius: 8,
              background: "#fff",
              color: "var(--azul-escuro)",
            }}
          />
        </label>

        {error && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            height: 52,
            borderRadius: 8,
            border: "none",
            background: loading ? "#d9b768" : "var(--mostarda)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p style={{ fontSize: 11, color: "var(--azul-petroleo)", textAlign: "center" }}>
        Esqueceu o PIN? Fale com o gestor da fazenda.
      </p>
    </main>
  );
}
