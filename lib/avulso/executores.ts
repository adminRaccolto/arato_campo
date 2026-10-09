import type { createClient } from "@/lib/supabase/client";
import { notificarPendente } from "@/lib/notificacoes/notificar-pendente";

type SupabaseCliente = ReturnType<typeof createClient>;
type ResultadoExecucao = { ok: boolean; erro?: string };

// Lançamento Avulso (17/out/2026) — registra uma operação que JÁ ACONTECEU,
// sem passar por recomendação/tarefa. Resolve o problema de implantar o App
// Campo numa fazenda com operação em andamento: exigir recomendação pra tudo
// que já ocorreu era inviável. Mesma trava de sempre (CLAUDE.md 4.3):
// status_campo='pendente', só vira estoque/custo quando o Gerente Campo
// aprova — não existe atalho pra isso aqui.

type ProdutoAvulso = { insumoId: string; nome: string; dose: number; unidade?: string; lote?: string | null };

type PayloadBase = {
  id: string;
  fazendaId: string;
  cicloId: string;
  talhaoId: string;
  areaHa: number;
  perfilId: string;
  maquinaId: string | null;
  data: string;
  observacoes: string | null;
};

export type PayloadAvulsoPlantio = PayloadBase & {
  insumoId: string;
  variedade: string;
  doseKgHa: number;
  lote: string | null;
};

export async function executarAvulsoPlantio(supabase: SupabaseCliente, p: PayloadAvulsoPlantio): Promise<ResultadoExecucao> {
  const { error } = await supabase.from("plantios").upsert({
    id: p.id,
    fazenda_id: p.fazendaId,
    ciclo_id: p.cicloId,
    talhao_id: p.talhaoId,
    area_ha: p.areaHa,
    data_plantio: p.data,
    variedade: p.variedade,
    insumo_id: p.insumoId,
    dose_kg_ha: p.doseKgHa,
    // mesmo campo que o fechamento de tarefa grava — sem isso o estorno de
    // estoque na exclusão (lib/db.ts do Arato principal) não funciona.
    quantidade_kg: p.doseKgHa * p.areaHa,
    lote_semente: p.lote,
    maquina_id: p.maquinaId,
    observacao: p.observacoes,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: p.perfilId,
  } as never);
  if (error) return { ok: false, erro: error.message };
  await notificarPendente(supabase, "plantios", p.id);
  return { ok: true };
}

export type PayloadAvulsoPulverizacao = PayloadBase & {
  tipoAplicacao: string;
  vazaoLHa: number | null;
  estagioFenologico: string | null;
  produtos: ProdutoAvulso[];
};

export async function executarAvulsoPulverizacao(supabase: SupabaseCliente, p: PayloadAvulsoPulverizacao): Promise<ResultadoExecucao> {
  const { error: erroHeader } = await supabase.from("pulverizacoes").upsert({
    id: p.id,
    fazenda_id: p.fazendaId,
    ciclo_id: p.cicloId,
    talhao_id: p.talhaoId,
    area_ha: p.areaHa,
    data_inicio: p.data,
    tipo: p.tipoAplicacao,
    vazao_l_ha: p.vazaoLHa,
    estadio_fenologico: p.estagioFenologico,
    maquina_id: p.maquinaId,
    observacao: p.observacoes,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: p.perfilId,
  } as never);
  if (erroHeader) return { ok: false, erro: erroHeader.message };

  const { error: erroItens } = await supabase.from("pulverizacao_itens").upsert(
    p.produtos.map((item) => ({
      id: crypto.randomUUID(),
      pulverizacao_id: p.id,
      fazenda_id: p.fazendaId,
      insumo_id: item.insumoId,
      nome_produto: item.nome,
      dose_ha: item.dose,
      unidade: item.unidade,
      total_consumido: item.dose * p.areaHa,
    })) as never
  );
  if (erroItens) return { ok: false, erro: erroItens.message };

  await notificarPendente(supabase, "pulverizacoes", p.id);
  return { ok: true };
}

export type PayloadAvulsoAdubacao = PayloadBase & {
  modalidade: string;
  produtos: ProdutoAvulso[];
};

export async function executarAvulsoAdubacao(supabase: SupabaseCliente, p: PayloadAvulsoAdubacao): Promise<ResultadoExecucao> {
  const { error: erroHeader } = await supabase.from("adubacoes_base").upsert({
    id: p.id,
    fazenda_id: p.fazendaId,
    ciclo_id: p.cicloId,
    talhao_id: p.talhaoId,
    area_ha: p.areaHa,
    data_aplicacao: p.data,
    modalidade: p.modalidade,
    maquina_id: p.maquinaId,
    observacao: p.observacoes,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: p.perfilId,
  } as never);
  if (erroHeader) return { ok: false, erro: erroHeader.message };

  const { error: erroItens } = await supabase.from("adubacoes_base_itens").upsert(
    p.produtos.map((item) => ({
      id: crypto.randomUUID(),
      adubacao_id: p.id,
      fazenda_id: p.fazendaId,
      insumo_id: item.insumoId,
      produto_nome: item.nome,
      dose_kg_ha: item.dose,
      quantidade_kg: item.dose * p.areaHa,
    })) as never
  );
  if (erroItens) return { ok: false, erro: erroItens.message };

  await notificarPendente(supabase, "adubacoes_base", p.id);
  return { ok: true };
}

export type PayloadAvulsoCorretivo = PayloadBase & {
  finalidade: string;
  produtos: (ProdutoAvulso & { prntPct?: number | null })[];
};

export async function executarAvulsoCorretivo(supabase: SupabaseCliente, p: PayloadAvulsoCorretivo): Promise<ResultadoExecucao> {
  const { error: erroHeader } = await supabase.from("correcoes_solo").upsert({
    id: p.id,
    fazenda_id: p.fazendaId,
    ciclo_id: p.cicloId,
    talhao_id: p.talhaoId,
    area_ha: p.areaHa,
    data_aplicacao: p.data,
    finalidade: p.finalidade,
    maquina_id: p.maquinaId,
    observacao: p.observacoes,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: p.perfilId,
  } as never);
  if (erroHeader) return { ok: false, erro: erroHeader.message };

  const { error: erroItens } = await supabase.from("correcoes_solo_itens").upsert(
    p.produtos.map((item) => ({
      id: crypto.randomUUID(),
      correcao_id: p.id,
      fazenda_id: p.fazendaId,
      insumo_id: item.insumoId,
      produto_nome: item.nome,
      dose_ton_ha: item.dose,
      prnt_pct: item.prntPct ?? null,
      quantidade_ton: item.dose * p.areaHa,
    })) as never
  );
  if (erroItens) return { ok: false, erro: erroItens.message };

  await notificarPendente(supabase, "correcoes_solo", p.id);
  return { ok: true };
}

// Colheita avulsa grava direto na tabela agregada `colheitas` (a mesma que
// alimenta DRE/BI/Estoque de Grãos, já com status_campo — ver CLAUDE.md do
// Arato principal 2.4) — não no romaneio de pesagem de caminhão
// (`romaneios_entrada`), que é documento fiscal/comercial de pesagem, fora
// do escopo do operador de campo (CLAUDE.md 3.2).
export type PayloadAvulsoColheita = {
  id: string;
  fazendaId: string;
  cicloId: string;
  talhaoId: string;
  areaHa: number;
  perfilId: string;
  data: string;
  produto: string;
  variedade: string | null;
  totalSacas: number;
  observacoes: string | null;
};

export async function executarAvulsoColheita(supabase: SupabaseCliente, p: PayloadAvulsoColheita): Promise<ResultadoExecucao> {
  const totalKg = p.totalSacas * 60;
  const { error } = await supabase.from("colheitas").upsert({
    id: p.id,
    fazenda_id: p.fazendaId,
    ciclo_id: p.cicloId,
    talhao_id: p.talhaoId,
    area_ha: p.areaHa,
    data_colheita: p.data,
    produto: p.produto,
    variedade: p.variedade,
    total_sacas: p.totalSacas,
    total_kg_classificado: totalKg,
    produtividade_sc_ha: p.areaHa > 0 ? p.totalSacas / p.areaHa : null,
    observacao: p.observacoes,
    status_campo: "pendente",
    origem_lancamento: "app_campo",
    lancado_por_perfil_id: p.perfilId,
  } as never);
  if (error) return { ok: false, erro: error.message };
  await notificarPendente(supabase, "colheitas", p.id);
  return { ok: true };
}
