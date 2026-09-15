import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

// createBrowserClient não tem singleton interno — cada chamada monta um
// GoTrueClient novo com seu próprio timer de auto-refresh de sessão, que
// nunca é desmontado. Como várias telas/hooks chamam createClient() de
// forma independente, guardamos uma instância por módulo (só existe no
// navegador, um client por aba) em vez de uma por chamador.
let instancia: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (!instancia) {
    instancia = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return instancia;
}
