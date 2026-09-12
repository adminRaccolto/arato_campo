// Fila offline do App Campo — portado de lib/offline-store.ts do Arato
// principal (ver CLAUDE.md 2.9/4.6): localStorage puro, sem IndexedDB/Dexie,
// já provado suficiente para o volume esperado (fila de um dia de campo).
//
// Tipos de operação diferentes do módulo antigo: aqui não existe lançamento
// avulso (decisão de 12/set/2026, ver CLAUDE.md 2.9) — toda operação nasce
// de uma recomendação (que vira Tarefa) ou é um Monitoramento. `payload`
// carrega o registro principal; `itens` carrega as linhas de tabelas filhas
// (produtos/talhões) quando a operação grava em mais de uma tabela.

export type TipoOperacaoPendente =
  | "recomendacao_pulverizacao"
  | "recomendacao_adubacao"
  | "recomendacao_corretivo"
  | "recomendacao_plantio"
  | "monitoramento"
  | "fechamento_tarefa";

export interface OperacaoPendente {
  id: string; // UUID local (crypto.randomUUID) — mesmo id usado no insert, pra idempotência
  tipo: TipoOperacaoPendente;
  fazenda_id: string;
  criado_em: string; // ISO
  payload: Record<string, unknown>;
  itens?: Record<string, unknown>[];
}

const FILA_KEY = "campo_fila";

export function lerFila(): OperacaoPendente[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FILA_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function adicionarNaFila(op: Omit<OperacaoPendente, "id" | "criado_em"> & { id?: string }): string {
  const id = op.id ?? crypto.randomUUID();
  const nova: OperacaoPendente = { ...op, id, criado_em: new Date().toISOString() };
  const fila = lerFila();
  fila.push(nova);
  localStorage.setItem(FILA_KEY, JSON.stringify(fila));
  return id;
}

export function removerDaFila(ids: string[]): void {
  const fila = lerFila().filter((op) => !ids.includes(op.id));
  localStorage.setItem(FILA_KEY, JSON.stringify(fila));
}

export function contarPendentes(): number {
  return lerFila().length;
}

// ── Cache de catálogo (talhões, ciclos, insumos…) para preencher formulário offline ──

const MAX_IDADE_MS = 12 * 60 * 60 * 1000; // 12 horas

export function salvarCache(chave: string, dados: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`campo_cache_${chave}`, JSON.stringify({ ts: Date.now(), dados }));
  } catch {
    // localStorage cheio — ignora silenciosamente
  }
}

export function lerCache<T>(chave: string, maxIdadeMs = MAX_IDADE_MS): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`campo_cache_${chave}`);
    if (!raw) return null;
    const { ts, dados } = JSON.parse(raw) as { ts: number; dados: T };
    if (Date.now() - ts > maxIdadeMs) return null;
    return dados;
  } catch {
    return null;
  }
}
