import type { createClient } from "@/lib/supabase/client";
import { ehFotoLocal, idDaRefFotoLocal, lerFotoLocal, removerFotoLocal } from "@/lib/offline-photos";
import { atualizarPayloadNaFila } from "@/lib/offline-store";

type SupabaseCliente = ReturnType<typeof createClient>;

export type PayloadMonitoramento = {
  id: string;
  fazendaId: string;
  talhaoId: string;
  cicloId: string | null;
  data: string;
  tipo: string;
  nome: string;
  nivel: number;
  percentualPlantas: number | null;
  estagio: string | null;
  acaoRecomendada: string | null;
  observacoes: string | null;
  gpsLat: number | null;
  gpsLng: number | null;
  gpsAccuracy: number | null;
  fotos: string[];
  usuarioId: string | null;
};

// Resolve cada foto do payload: se já é uma URL (foto enviada na hora,
// online), usa direto; se é uma referência local (`local:<id>`, foto salva
// no IndexedDB porque a tela estava offline — ver lib/offline-photos.ts),
// envia pro Storage agora e só então apaga a cópia local. Roda tanto no
// envio imediato quanto num retry do SyncButton — se uma foto já foi
// enviada numa tentativa anterior e só a segunda falhou, a próxima
// tentativa já recebe a URL real no lugar da referência local (o payload
// da fila é atualizado em lib/offline-store.ts após cada tentativa).
async function resolverFotos(
  supabase: SupabaseCliente,
  fazendaId: string,
  fotos: string[]
): Promise<{ urls: string[]; erro?: string }> {
  const urls: string[] = [];

  for (const foto of fotos) {
    if (!ehFotoLocal(foto)) {
      urls.push(foto);
      continue;
    }

    const id = idDaRefFotoLocal(foto);
    const blob = await lerFotoLocal(id);
    if (!blob) continue; // já foi enviada e removida numa tentativa anterior

    const path = `monitoramento/${fazendaId}/${Date.now()}-${id}.jpg`;
    const { data: up, error } = await supabase.storage.from("arquivos").upload(path, blob, { upsert: true });
    if (error) return { urls, erro: `Falha ao enviar foto: ${error.message}` };

    const {
      data: { publicUrl },
    } = supabase.storage.from("arquivos").getPublicUrl(up.path);
    urls.push(publicUrl);
    await removerFotoLocal(id);
  }

  return { urls };
}

export async function executarMonitoramento(
  supabase: SupabaseCliente,
  payload: PayloadMonitoramento
): Promise<{ ok: boolean; erro?: string }> {
  const { urls: fotos, erro: erroFotos } = await resolverFotos(supabase, payload.fazendaId, payload.fotos);

  // Persiste o progresso na fila mesmo se `resolverFotos` parou no meio (ex.:
  // a 1ª de 2 fotos subiu, a 2ª falhou) — sem isso, um retry re-enviaria a
  // 1ª foto de novo, porque releria a fila com a referência local antiga.
  if (fotos.some((f) => !ehFotoLocal(f))) {
    atualizarPayloadNaFila(payload.id, { ...payload, fotos } as unknown as Record<string, unknown>);
  }

  if (erroFotos) return { ok: false, erro: erroFotos };

  const { error } = await supabase.from("monitoramento_pragas").upsert({
    id: payload.id,
    fazenda_id: payload.fazendaId,
    talhao_id: payload.talhaoId,
    ciclo_id: payload.cicloId,
    data: payload.data,
    data_monitoramento: payload.data,
    tipo: payload.tipo,
    nome: payload.nome,
    nivel: payload.nivel,
    percentual_plantas: payload.percentualPlantas,
    estagio: payload.estagio,
    estagio_cultura: payload.estagio,
    acao_recomendada: payload.acaoRecomendada,
    observacoes: payload.observacoes,
    gps_lat: payload.gpsLat,
    gps_lng: payload.gpsLng,
    gps_accuracy_m: payload.gpsAccuracy,
    foto_url: fotos[0] ?? null,
    foto_url_2: fotos[1] ?? null,
    foto_url_3: fotos[2] ?? null,
    usuario_id: payload.usuarioId,
  });

  if (error) return { ok: false, erro: error.message };
  return { ok: true };
}
