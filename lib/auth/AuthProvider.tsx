"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthContextValue = {
  carregando: boolean;
  erro: string | null;
  userId: string | null;
  perfilId: string | null;
  contaId: string | null;
  nome: string | null;
  // fazenda salva no perfil — só um ponto de partida pro seletor de cada
  // tela, não um "estado ativo" global (CLAUDE.md 2.3: cada tela tem seu
  // próprio seletor explícito, sem farm-switcher fixo no App Campo)
  fazendaIdPadrao: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [state, setState] = useState<AuthContextValue>({
    carregando: true,
    erro: null,
    userId: null,
    perfilId: null,
    contaId: null,
    nome: null,
    fazendaIdPadrao: null,
  });

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelado) setState((s) => ({ ...s, carregando: false }));
        return;
      }

      const { data: perfil, error } = await supabase
        .from("perfis")
        .select("id, conta_id, fazenda_id, nome")
        .eq("user_id", user.id)
        .limit(1);

      if (cancelado) return;

      if (error || !perfil || perfil.length === 0) {
        setState((s) => ({
          ...s,
          carregando: false,
          erro: "Não foi possível carregar o perfil do usuário logado.",
        }));
        return;
      }

      const meuPerfil = perfil[0];
      setState({
        carregando: false,
        erro: meuPerfil.conta_id ? null : "Perfil sem conta vinculada.",
        userId: user.id,
        perfilId: meuPerfil.id,
        contaId: meuPerfil.conta_id,
        nome: meuPerfil.nome,
        fazendaIdPadrao: meuPerfil.fazenda_id,
      });
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [supabase]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa ser usado dentro de <AuthProvider>");
  return ctx;
}
