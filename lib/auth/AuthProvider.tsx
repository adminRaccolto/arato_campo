"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { lerCache, salvarCache } from "@/lib/offline-store";

type AuthContextValue = {
  carregando: boolean;
  erro: string | null;
  // Autenticado mas sem permissão de usar o App Campo (perfil não é
  // produto='campo', ou a conta não tem o módulo app_campo habilitado, ou
  // fazendas_permitidas está explicitamente vazio) — diferente de `erro`,
  // que é falha técnica. Ver decisões 4.2/4.5 do CLAUDE.md.
  semAcesso: boolean;
  motivoSemAcesso: string | null;
  userId: string | null;
  perfilId: string | null;
  contaId: string | null;
  nome: string | null;
  // fazenda salva no perfil — só um ponto de partida pro seletor de cada
  // tela, não um "estado ativo" global (CLAUDE.md 2.3: cada tela tem seu
  // próprio seletor explícito, sem farm-switcher fixo no App Campo)
  fazendaIdPadrao: string | null;
  // null = coluna ainda não migrada ou nunca configurada pelo gestor — nesse
  // caso o app cai de volta pro escopo por conta_id (comportamento anterior
  // à decisão 4.4), até existir uma tela de admin pra configurar a lista.
  // [] = configurado explicitamente como "nenhuma fazenda liberada".
  fazendasPermitidas: string[] | null;
  // 'gerente_campo' | 'operador' | 'apontador' — ver db/migrations-draft/007.
  // Só gerente_campo aprova/rejeita (decisão 4.3).
  papel: string | null;
  ehGerenteCampo: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ESTADO_INICIAL: AuthContextValue = {
  carregando: true,
  erro: null,
  semAcesso: false,
  motivoSemAcesso: null,
  userId: null,
  perfilId: null,
  contaId: null,
  nome: null,
  fazendaIdPadrao: null,
  fazendasPermitidas: null,
  papel: null,
  ehGerenteCampo: false,
  signOut: async () => {},
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [state, setState] = useState<AuthContextValue>(ESTADO_INICIAL);

  useEffect(() => {
    let cancelado = false;

    async function signOut() {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }

    async function carregar() {
      // getSession() (não getUser()) de propósito: lê a sessão do
      // armazenamento local sem depender de rede (CLAUDE.md 4.6 — o app
      // precisa abrir offline). A verificação de segurança de verdade
      // continua sendo o RLS do Postgres em cada query, não esta checagem —
      // isso aqui só decide o que a UI mostra.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (!user) {
        if (!cancelado) setState((s) => ({ ...s, carregando: false, signOut }));
        return;
      }

      const CACHE_KEY = `auth_${user.id}`;
      type AutorizacaoCache = {
        perfilId: string;
        contaId: string;
        nome: string | null;
        fazendaIdPadrao: string | null;
        fazendasPermitidas: string[] | null;
        moduloHabilitado: boolean;
        produto: string | null;
        papel: string | null;
      };

      let autorizacao: AutorizacaoCache | null = null;
      let erroRede = false;

      try {
        const { data: perfil, error } = await supabase
          .from("perfis")
          .select("id, conta_id, fazenda_id, nome, produto, fazendas_permitidas, papel")
          .eq("user_id", user.id)
          .limit(1);

        if (error || !perfil || perfil.length === 0) {
          if (cancelado) return;
          setState((s) => ({
            ...s,
            carregando: false,
            signOut,
            erro: error?.message ?? "Não foi possível carregar o perfil do usuário logado.",
          }));
          return;
        }

        const meuPerfil = perfil[0];

        if (!meuPerfil.conta_id) {
          if (cancelado) return;
          setState((s) => ({ ...s, carregando: false, signOut, erro: "Perfil sem conta vinculada." }));
          return;
        }

        const { data: moduloRows } = await supabase
          .from("conta_modulos")
          .select("habilitado")
          .eq("conta_id", meuPerfil.conta_id)
          .eq("modulo", "app_campo")
          .limit(1);

        autorizacao = {
          perfilId: meuPerfil.id,
          contaId: meuPerfil.conta_id,
          nome: meuPerfil.nome,
          fazendaIdPadrao: meuPerfil.fazenda_id,
          fazendasPermitidas: meuPerfil.fazendas_permitidas,
          moduloHabilitado: Boolean(moduloRows?.[0]?.habilitado),
          produto: meuPerfil.produto,
          papel: meuPerfil.papel,
        };
        salvarCache(CACHE_KEY, autorizacao);
      } catch {
        // Sem rede de verdade (não um erro do servidor) — tenta a última
        // autorização conhecida em cache (CLAUDE.md 4.6: o app precisa
        // funcionar offline pra quem já estava autorizado). Sem cache, cai
        // no estado de erro normal abaixo.
        erroRede = true;
        autorizacao = lerCache<AutorizacaoCache>(CACHE_KEY);
      }

      if (cancelado) return;

      if (!autorizacao) {
        setState((s) => ({
          ...s,
          carregando: false,
          signOut,
          erro: erroRede
            ? "Sem conexão e nenhum acesso salvo neste aparelho — conecte à internet pelo menos uma vez."
            : "Não foi possível carregar o perfil do usuário logado.",
        }));
        return;
      }

      if (autorizacao.produto !== "campo") {
        setState((s) => ({
          ...s,
          carregando: false,
          signOut,
          semAcesso: true,
          motivoSemAcesso: "Este login não tem acesso ao App Campo. Fale com o gestor da fazenda.",
        }));
        return;
      }

      if (!autorizacao.moduloHabilitado) {
        setState((s) => ({
          ...s,
          carregando: false,
          signOut,
          semAcesso: true,
          motivoSemAcesso: "O App Campo não está ativo para esta conta. Fale com o time Raccolto.",
        }));
        return;
      }

      if (autorizacao.fazendasPermitidas !== null && autorizacao.fazendasPermitidas.length === 0) {
        setState((s) => ({
          ...s,
          carregando: false,
          signOut,
          semAcesso: true,
          motivoSemAcesso: "Nenhuma fazenda liberada para este perfil. Fale com o gestor da fazenda.",
        }));
        return;
      }

      setState({
        carregando: false,
        erro: null,
        semAcesso: false,
        motivoSemAcesso: null,
        userId: user.id,
        perfilId: autorizacao.perfilId,
        contaId: autorizacao.contaId,
        nome: autorizacao.nome,
        fazendaIdPadrao: autorizacao.fazendaIdPadrao,
        fazendasPermitidas: autorizacao.fazendasPermitidas,
        papel: autorizacao.papel,
        ehGerenteCampo: autorizacao.papel === "gerente_campo",
        signOut,
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
