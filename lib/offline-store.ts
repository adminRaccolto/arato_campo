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
  | "fechamento_pulverizacao"
  | "fechamento_adubacao"
  | "fechamento_corretivo"
  | "fechamento_plantio";

export interface OperacaoPendente {
  id: string; // UUID local (crypto.randomUUID) — mesmo id usado no insert, pra idempotência
  tipo: TipoOperacaoPendente;
  fazenda_id: string;
  criado_em: string; // ISO
  // Formato específico de cada tipo — ver lib/recomendacoes/executores.ts e
  // lib/tarefas/executores.ts, que sabem interpretar e re-executar cada um.
  payload: Record<string, unknown>;
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

/**
 * Atualiza o payload de uma operação já enfileirada, sem mudar sua posição
 * nem seu `id`. Usado por executores que fazem progresso parcial antes de
 * falhar (ex.: Monitoramento sobe as fotos primeiro, e só depois insere o
 * registro) — sem isso, um retry re-enviaria fotos que já subiram, porque
 * releria a referência local (`local:<id>`) da tentativa anterior em vez da
 * URL real já obtida.
 */
export function atualizarPayloadNaFila(id: string, payload: Record<string, unknown>): void {
  const fila = lerFila();
  const index = fila.findIndex((op) => op.id === id);
  if (index === -1) return;
  fila[index] = { ...fila[index], payload };
  localStorage.setItem(FILA_KEY, JSON.stringify(fila));
}

export function contarPendentes(): number {
  return lerFila().length;
}

/**
 * Grava a operação na fila local ANTES de qualquer coisa (CLAUDE.md 4.6:
 * "nunca escrita direta condicionada a estar online"), e só então tenta
 * executá-la de verdade, se houver conexão. Se der certo, tira da fila. Se
 * falhar (ou estiver offline), fica na fila pro SyncButton tentar de novo
 * depois — a tela chamadora trata isso como sucesso "pendente de
 * sincronizar", nunca como erro bloqueante, porque o dado já está salvo
 * localmente e não deve ser perdido.
 */
export async function enfileirarEExecutar(
  operacao: Omit<OperacaoPendente, "criado_em">,
  executar: () => Promise<{ ok: boolean; erro?: string }>
): Promise<{ sincronizado: boolean; erro?: string }> {
  adicionarNaFila(operacao);

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { sincronizado: false };
  }

  try {
    const resultado = await executar();
    if (resultado.ok) {
      removerDaFila([operacao.id]);
      return { sincronizado: true };
    }
    return { sincronizado: false, erro: resultado.erro };
  } catch (e) {
    // rede caiu no meio da tentativa — fica na fila normalmente
    return { sincronizado: false, erro: e instanceof Error ? e.message : "Falha de conexão" };
  }
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
