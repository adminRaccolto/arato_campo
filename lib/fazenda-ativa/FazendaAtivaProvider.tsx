"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { lerCache, salvarCache } from "@/lib/offline-store";

export type Fazenda = { id: string; nome: string };

type FazendaAtivaValue = {
  fazendas: Fazenda[];
  fazendaId: string;
  setFazendaId: (id: string) => void;
  carregando: boolean;
};

const FazendaAtivaContext = createContext<FazendaAtivaValue | undefined>(undefined);

const CHAVE_LOCAL = "campo_fazenda_ativa";

// Seletor de fazenda visível na barra lateral (decisão 15/set/2026, ver
// CLAUDE.md 7) — conveniência pra contas com mais de uma fazenda, não um
// farm-switcher que trava a navegação: cada tela ainda tem seu próprio
// seletor explícito (CLAUDE.md 2.3), só que agora pré-populado com esse
// valor em vez de sempre cair no primeiro item da lista.
export function FazendaAtivaProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const auth = useAuth();

  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [fazendaId, setFazendaIdState] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (auth.carregando || !auth.contaId) return;

    async function carregar(contaId: string, fazendaIdPadrao: string | null, permitidas: string[] | null) {
      let query = supabase.from("fazendas").select("id, nome").order("nome");
      query = permitidas ? query.in("id", permitidas) : query.eq("conta_id", contaId);

      const { data, error } = await query;
      const lista = error ? (lerCache<Fazenda[]>(`${CHAVE_LOCAL}_lista`) ?? []) : (data ?? []);
      if (!error) salvarCache(`${CHAVE_LOCAL}_lista`, lista);

      setFazendas(lista);

      const salva = typeof window !== "undefined" ? localStorage.getItem(CHAVE_LOCAL) : null;
      const valida = salva && lista.some((f) => f.id === salva);
      setFazendaIdState(valida ? salva! : (fazendaIdPadrao ?? lista[0]?.id ?? ""));
      setCarregando(false);
    }

    carregar(auth.contaId, auth.fazendaIdPadrao, auth.fazendasPermitidas);
  }, [auth.carregando, auth.contaId, auth.fazendaIdPadrao, auth.fazendasPermitidas, supabase]);

  function setFazendaId(id: string) {
    setFazendaIdState(id);
    try {
      localStorage.setItem(CHAVE_LOCAL, id);
    } catch {
      // localStorage indisponível — segue só em memória
    }
  }

  return (
    <FazendaAtivaContext.Provider value={{ fazendas, fazendaId, setFazendaId, carregando }}>
      {children}
    </FazendaAtivaContext.Provider>
  );
}

export function useFazendaAtiva(): FazendaAtivaValue {
  const ctx = useContext(FazendaAtivaContext);
  if (!ctx) throw new Error("useFazendaAtiva precisa ser usado dentro de <FazendaAtivaProvider>");
  return ctx;
}
