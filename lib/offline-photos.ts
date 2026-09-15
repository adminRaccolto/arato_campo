// Armazenamento local de fotos ainda não enviadas — a única parte da fila
// offline que precisa de IndexedDB (blob binário não cabe bem em
// localStorage: cota pequena, ~33% maior em base64). Tudo o resto da fila
// (lib/offline-store.ts) continua em localStorage, como já decidido em
// CLAUDE.md 4.6 — isto é aditivo, não substitui aquilo.

const DB_NAME = "campo_fotos";
const STORE = "fotos";

function abrirDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function salvarFotoLocal(blob: Blob): Promise<string> {
  const id = crypto.randomUUID();
  const db = await abrirDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  return id;
}

export async function lerFotoLocal(id: string): Promise<Blob | null> {
  const db = await abrirDb();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return blob;
}

export async function removerFotoLocal(id: string): Promise<void> {
  const db = await abrirDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

// Convenção pra referenciar uma foto ainda não enviada dentro de um array
// de strings (o mesmo `fotos: string[]` que já existia) — sem precisar
// mudar o formato do payload da fila pra um tipo novo.
const PREFIXO_LOCAL = "local:";

export function ehFotoLocal(ref: string): boolean {
  return ref.startsWith(PREFIXO_LOCAL);
}

export function criarRefFotoLocal(id: string): string {
  return `${PREFIXO_LOCAL}${id}`;
}

export function idDaRefFotoLocal(ref: string): string {
  return ref.slice(PREFIXO_LOCAL.length);
}
