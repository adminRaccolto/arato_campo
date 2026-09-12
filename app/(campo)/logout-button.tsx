"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        border: "0.5px solid var(--azul-petroleo)",
        background: "#fff",
        color: "var(--azul-petroleo)",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
