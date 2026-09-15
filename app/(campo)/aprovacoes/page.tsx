"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { sectionStyle } from "../recomendacoes/_shared/styles";

type TipoOperacao = "plantio" | "pulverizacao" | "adubacao" | "corretivo" | "abastecimento";

type ProdutoComparado = { nome: string | null; unidade: string | null; doseAplicada: number | null; doseRecomendada: number | null };

type ItemPendente = {
  id: string;
  tabela: string;
  tipo: TipoOperacao;
  fazendaId: string;
  talhaoNome: string | null;
  areaHa: number | null;
  data: string | null;
  detalhe: string;
  lancadoPorPerfilId: string | null;
  maquinaId: string | null;
  produtos: ProdutoComparado[];
};

const TIPO_INFO: Record<TipoOperacao, { label: string; icone: string }> = {
  plantio: { label: "Plantio", icone: "🌱" },
  pulverizacao: { label: "Pulverização", icone: "💧" },
  adubacao: { label: "Adubação", icone: "🌿" },
  corretivo: { label: "Corretivo", icone: "⚗️" },
  abastecimento: { label: "Abastecimento", icone: "⛽" },
};

export default function AprovacoesPage() {
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [itens, setItens] = useState<ItemPendente[]>([]);
  const [fazendaNomePorId, setFazendaNomePorId] = useState<Map<string, string>>(new Map());
  const [perfilNomePorId, setPerfilNomePorId] = useState<Map<string, string>>(new Map());
  const [maquinaNomePorId, setMaquinaNomePorId] = useState<Map<string, string>>(new Map());

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [processando, setProcessando] = useState<string | null>(null);
  const [rejeitandoId, setRejeitandoId] = useState<string | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");

  useEffect(() => {
    if (auth.carregando) return;
    if (!auth.ehGerenteCampo) {
      setCarregando(false);
      return;
    }

    async function carregar() {
      // Fazendas visíveis pra este Gerente Campo — mesmo escopo por
      // fazendas_permitidas (ou fallback por conta) do resto do app.
      let queryFazendas = supabase.from("fazendas").select("id, nome");
      queryFazendas = auth.fazendasPermitidas
        ? queryFazendas.in("id", auth.fazendasPermitidas)
        : queryFazendas.eq("conta_id", auth.contaId ?? "");
      const { data: fazendasData, error: erroFazendas } = await queryFazendas;

      if (erroFazendas) {
        setErro(`Não foi possível carregar as fazendas: ${erroFazendas.message}`);
        setCarregando(false);
        return;
      }

      const fazendaIds = (fazendasData ?? []).map((f) => f.id);
      setFazendaNomePorId(new Map((fazendasData ?? []).map((f) => [f.id, f.nome])));

      if (fazendaIds.length === 0) {
        setItens([]);
        setCarregando(false);
        return;
      }

      const [plantiosRes, pulverizacoesRes, adubacoesRes, correcoesRes, abastecimentosRes] = await Promise.all([
        supabase
          .from("plantios")
          .select("id, fazenda_id, area_ha, data_plantio, variedade, lancado_por_perfil_id, maquina_id, dose_kg_ha, dose_kg_ha_recomendada, talhoes(nome)")
          .in("fazenda_id", fazendaIds)
          .eq("status_campo", "pendente"),
        supabase
          .from("pulverizacoes")
          .select("id, fazenda_id, area_ha, data_inicio, tipo, lancado_por_perfil_id, maquina_id, talhoes(nome)")
          .in("fazenda_id", fazendaIds)
          .eq("status_campo", "pendente"),
        supabase
          .from("adubacoes_base")
          .select("id, fazenda_id, area_ha, data_aplicacao, modalidade, lancado_por_perfil_id, maquina_id, talhoes(nome)")
          .in("fazenda_id", fazendaIds)
          .eq("status_campo", "pendente"),
        supabase
          .from("correcoes_solo")
          .select("id, fazenda_id, area_ha, data_aplicacao, finalidade, lancado_por_perfil_id, maquina_id, talhoes(nome)")
          .in("fazenda_id", fazendaIds)
          .eq("status_campo", "pendente"),
        supabase
          .from("abastecimentos")
          .select("id, fazenda_id, data, quantidade_l, insumo_id, lancado_por_perfil_id, maquina_id")
          .in("fazenda_id", fazendaIds)
          .eq("status_campo", "pendente"),
      ]);

      const erroConsulta =
        plantiosRes.error ?? pulverizacoesRes.error ?? adubacoesRes.error ?? correcoesRes.error ?? abastecimentosRes.error;
      if (erroConsulta) {
        setErro(`Não foi possível carregar pendências: ${erroConsulta.message}.`);
        setCarregando(false);
        return;
      }

      type LinhaJoin = {
        id: string;
        fazenda_id: string;
        area_ha: number | null;
        lancado_por_perfil_id: string | null;
        maquina_id: string | null;
        talhoes: { nome: string } | { nome: string }[] | null;
      };
      function nomeTalhao(x: LinhaJoin): string | null {
        if (!x.talhoes) return null;
        return Array.isArray(x.talhoes) ? (x.talhoes[0]?.nome ?? null) : x.talhoes.nome;
      }

      // Produtos/doses de cada tipo vêm em lote (uma query por tipo, não uma
      // por item) — comparação recomendado × aplicado (CLAUDE.md 7, pedido
      // 15/set/2026). `plantios` já tem a dose na própria linha (sem tabela
      // de itens); os outros 3 têm tabela filha.
      const idsPulv = (pulverizacoesRes.data ?? []).map((x) => x.id);
      const idsAdub = (adubacoesRes.data ?? []).map((x) => x.id);
      const idsCorr = (correcoesRes.data ?? []).map((x) => x.id);

      const [itensPulvRes, itensAdubRes, itensCorrRes] = await Promise.all([
        idsPulv.length
          ? supabase.from("pulverizacao_itens").select("pulverizacao_id, nome_produto, unidade, dose_ha, dose_recomendada_ha").in("pulverizacao_id", idsPulv)
          : Promise.resolve({ data: [] as { pulverizacao_id: string; nome_produto: string; unidade: string; dose_ha: number; dose_recomendada_ha: number | null }[] }),
        idsAdub.length
          ? supabase.from("adubacoes_base_itens").select("adubacao_id, produto_nome, dose_kg_ha, dose_kg_ha_recomendada").in("adubacao_id", idsAdub)
          : Promise.resolve({ data: [] as { adubacao_id: string; produto_nome: string; dose_kg_ha: number; dose_kg_ha_recomendada: number | null }[] }),
        idsCorr.length
          ? supabase.from("correcoes_solo_itens").select("correcao_id, produto_nome, dose_ton_ha, dose_ton_ha_recomendada").in("correcao_id", idsCorr)
          : Promise.resolve({ data: [] as { correcao_id: string; produto_nome: string; dose_ton_ha: number; dose_ton_ha_recomendada: number | null }[] }),
      ]);

      function produtosDe<T>(lista: T[] | null, chave: keyof T, id: string): T[] {
        return (lista ?? []).filter((x) => x[chave] === id);
      }

      const idsCombustivel = Array.from(
        new Set((abastecimentosRes.data ?? []).map((a) => a.insumo_id).filter((id): id is string => Boolean(id)))
      );
      const { data: combustiveisData } = idsCombustivel.length
        ? await supabase.from("insumos").select("id, nome").in("id", idsCombustivel)
        : { data: [] as { id: string; nome: string }[] };
      const nomeCombustivelPorId = new Map((combustiveisData ?? []).map((c) => [c.id, c.nome]));

      const todos: ItemPendente[] = [
        ...((plantiosRes.data ?? []) as unknown as (LinhaJoin & {
          data_plantio: string;
          variedade: string;
          dose_kg_ha: number | null;
          dose_kg_ha_recomendada: number | null;
        })[]).map((x) => ({
          id: x.id,
          tabela: "plantios",
          tipo: "plantio" as const,
          fazendaId: x.fazenda_id,
          talhaoNome: nomeTalhao(x),
          areaHa: x.area_ha,
          data: x.data_plantio,
          detalhe: x.variedade,
          lancadoPorPerfilId: x.lancado_por_perfil_id,
          maquinaId: x.maquina_id,
          produtos:
            x.dose_kg_ha != null
              ? [{ nome: x.variedade, unidade: "kg/ha", doseAplicada: x.dose_kg_ha, doseRecomendada: x.dose_kg_ha_recomendada }]
              : [],
        })),
        ...((pulverizacoesRes.data ?? []) as unknown as (LinhaJoin & { data_inicio: string; tipo: string })[]).map((x) => ({
          id: x.id,
          tabela: "pulverizacoes",
          tipo: "pulverizacao" as const,
          fazendaId: x.fazenda_id,
          talhaoNome: nomeTalhao(x),
          areaHa: x.area_ha,
          data: x.data_inicio,
          detalhe: x.tipo,
          lancadoPorPerfilId: x.lancado_por_perfil_id,
          maquinaId: x.maquina_id,
          produtos: produtosDe(itensPulvRes.data, "pulverizacao_id", x.id).map((p) => ({
            nome: p.nome_produto,
            unidade: p.unidade,
            doseAplicada: p.dose_ha,
            doseRecomendada: p.dose_recomendada_ha,
          })),
        })),
        ...((adubacoesRes.data ?? []) as unknown as (LinhaJoin & { data_aplicacao: string; modalidade: string })[]).map((x) => ({
          id: x.id,
          tabela: "adubacoes_base",
          tipo: "adubacao" as const,
          fazendaId: x.fazenda_id,
          talhaoNome: nomeTalhao(x),
          areaHa: x.area_ha,
          data: x.data_aplicacao,
          detalhe: x.modalidade,
          lancadoPorPerfilId: x.lancado_por_perfil_id,
          maquinaId: x.maquina_id,
          produtos: produtosDe(itensAdubRes.data, "adubacao_id", x.id).map((p) => ({
            nome: p.produto_nome,
            unidade: "kg/ha",
            doseAplicada: p.dose_kg_ha,
            doseRecomendada: p.dose_kg_ha_recomendada,
          })),
        })),
        ...((correcoesRes.data ?? []) as unknown as (LinhaJoin & { data_aplicacao: string; finalidade: string })[]).map((x) => ({
          id: x.id,
          tabela: "correcoes_solo",
          tipo: "corretivo" as const,
          fazendaId: x.fazenda_id,
          talhaoNome: nomeTalhao(x),
          areaHa: x.area_ha,
          data: x.data_aplicacao,
          detalhe: x.finalidade,
          lancadoPorPerfilId: x.lancado_por_perfil_id,
          maquinaId: x.maquina_id,
          produtos: produtosDe(itensCorrRes.data, "correcao_id", x.id).map((p) => ({
            nome: p.produto_nome,
            unidade: "ton/ha",
            doseAplicada: p.dose_ton_ha,
            doseRecomendada: p.dose_ton_ha_recomendada,
          })),
        })),
        ...((abastecimentosRes.data ?? []) as unknown as {
          id: string;
          fazenda_id: string;
          data: string;
          quantidade_l: number;
          insumo_id: string | null;
          lancado_por_perfil_id: string | null;
          maquina_id: string | null;
        }[]).map((x) => ({
          id: x.id,
          tabela: "abastecimentos",
          tipo: "abastecimento" as const,
          fazendaId: x.fazenda_id,
          talhaoNome: null,
          areaHa: null,
          data: x.data,
          detalhe: x.insumo_id ? (nomeCombustivelPorId.get(x.insumo_id) ?? "Combustível") : "Combustível",
          lancadoPorPerfilId: x.lancado_por_perfil_id,
          maquinaId: x.maquina_id,
          produtos: [
            {
              nome: x.insumo_id ? (nomeCombustivelPorId.get(x.insumo_id) ?? "Combustível") : "Combustível",
              unidade: "L",
              doseAplicada: x.quantidade_l,
              doseRecomendada: null,
            },
          ],
        })),
      ].sort((a, b) => (a.data ?? "").localeCompare(b.data ?? ""));

      setItens(todos);

      const perfilIds = Array.from(new Set(todos.map((i) => i.lancadoPorPerfilId).filter((id): id is string => Boolean(id))));
      if (perfilIds.length > 0) {
        const { data: perfisData } = await supabase.from("perfis").select("id, nome").in("id", perfilIds);
        setPerfilNomePorId(new Map((perfisData ?? []).map((p) => [p.id, p.nome ?? p.id])));
      }

      const maquinaIds = Array.from(new Set(todos.map((i) => i.maquinaId).filter((id): id is string => Boolean(id))));
      if (maquinaIds.length > 0) {
        const { data: maquinasData } = await supabase.from("maquinas").select("id, nome").in("id", maquinaIds);
        setMaquinaNomePorId(new Map((maquinasData ?? []).map((m) => [m.id, m.nome])));
      }

      setCarregando(false);
    }

    carregar();
  }, [auth.carregando, auth.ehGerenteCampo, auth.fazendasPermitidas, auth.contaId, supabase]);

  // Aprovar/rejeitar não escreve mais direto nas tabelas — passa pela rota
  // cross-app no Arato principal (agrofield: app/api/campo/aprovar-lancamento),
  // porque aprovar dispara baixa de estoque (CLAUDE.md 2.8/4.3), que exige
  // SERVICE_ROLE_KEY — algo que o App Campo nunca tem (CLAUDE.md 3.2). A
  // rota reverifica autorização a partir do token, não confia em nada que o
  // client mande sobre quem está aprovando.
  async function chamarAprovacao(item: ItemPendente, decisao: "aprovado" | "rejeitado", motivo?: string) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setErro("Sessão expirada — saia e entre de novo.");
      return false;
    }

    const resposta = await fetch(`${process.env.NEXT_PUBLIC_ARATO_API_URL}/api/campo/aprovar-lancamento`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tabela: item.tabela, id: item.id, decisao, motivoRejeicao: motivo }),
    });

    const corpo = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      setErro(corpo.error ?? `Não foi possível ${decisao === "aprovado" ? "aprovar" : "rejeitar"} (${resposta.status}).`);
      return false;
    }
    return true;
  }

  async function aprovar(item: ItemPendente) {
    if (!auth.perfilId) return;
    setProcessando(item.id);
    const ok = await chamarAprovacao(item, "aprovado");
    if (ok) setItens((atual) => atual.filter((i) => i.id !== item.id));
    setProcessando(null);
  }

  async function confirmarRejeicao(item: ItemPendente) {
    if (!auth.perfilId) return;
    setProcessando(item.id);
    const ok = await chamarAprovacao(item, "rejeitado", motivoRejeicao || undefined);
    if (ok) setItens((atual) => atual.filter((i) => i.id !== item.id));
    setProcessando(null);
    setRejeitandoId(null);
    setMotivoRejeicao("");
  }

  if (auth.carregando || carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (!auth.ehGerenteCampo) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center" }}>
          Só o Gerente Campo aprova lançamentos.
        </p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Aprovações</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          {itens.length} pendente{itens.length === 1 ? "" : "s"}
        </p>
      </header>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>
            {erro}
          </p>
        )}

        {!erro && itens.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--azul-petroleo)", textAlign: "center", marginTop: 32 }}>
            Nenhum lançamento pendente de aprovação.
          </p>
        )}

        {itens.map((item) => {
          const info = TIPO_INFO[item.tipo];
          return (
            <div key={item.id} style={sectionStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{info.icone}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--azul-escuro)" }}>
                    {info.label} — {item.detalhe}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
                    {fazendaNomePorId.get(item.fazendaId) ?? "Fazenda"}
                    {item.talhaoNome ? ` · ${item.talhaoNome}` : ""}
                    {item.areaHa ? ` · ${item.areaHa} ha` : ""}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
                    {item.data ? new Date(item.data + "T12:00").toLocaleDateString("pt-BR") : ""}
                    {item.lancadoPorPerfilId ? ` · lançado por ${perfilNomePorId.get(item.lancadoPorPerfilId) ?? "—"}` : ""}
                    {item.maquinaId ? ` · ${maquinaNomePorId.get(item.maquinaId) ?? "máquina"}` : ""}
                  </p>
                </div>
              </div>

              {item.produtos.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 3, padding: "8px 10px", borderRadius: 8, background: "#F4F6FA" }}>
                  {item.produtos.map((p, i) => {
                    const divergiu = p.doseRecomendada != null && p.doseRecomendada !== p.doseAplicada;
                    return (
                      <p key={i} style={{ fontSize: 11, color: "var(--azul-escuro)" }}>
                        {p.nome}:{" "}
                        <strong style={{ color: divergiu ? "var(--mostarda)" : "var(--verde)" }}>
                          {p.doseAplicada} {p.unidade}
                        </strong>
                        {divergiu && (
                          <span style={{ color: "var(--azul-petroleo)" }}>
                            {" "}
                            (recomendado: {p.doseRecomendada} {p.unidade})
                          </span>
                        )}
                      </p>
                    );
                  })}
                </div>
              )}

              {rejeitandoId === item.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  <input
                    type="text"
                    placeholder="Motivo da rejeição"
                    value={motivoRejeicao}
                    onChange={(e) => setMotivoRejeicao(e.target.value)}
                    style={{
                      height: 40,
                      padding: "0 12px",
                      fontSize: 13,
                      border: "0.5px solid var(--vermelho)",
                      borderRadius: 8,
                    }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setRejeitandoId(null);
                        setMotivoRejeicao("");
                      }}
                      style={{ flex: 1, height: 40, borderRadius: 8, border: "0.5px solid var(--azul-petroleo)", background: "#fff", color: "var(--azul-petroleo)", fontSize: 13, fontWeight: 600 }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmarRejeicao(item)}
                      disabled={processando === item.id}
                      style={{ flex: 1, height: 40, borderRadius: 8, border: "none", background: "var(--vermelho)", color: "#fff", fontSize: 13, fontWeight: 600 }}
                    >
                      Confirmar rejeição
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => setRejeitandoId(item.id)}
                    disabled={processando === item.id}
                    style={{ flex: 1, height: 42, borderRadius: 8, border: "0.5px solid var(--vermelho)", background: "#fff", color: "var(--vermelho)", fontSize: 13, fontWeight: 600 }}
                  >
                    Rejeitar
                  </button>
                  <button
                    type="button"
                    onClick={() => aprovar(item)}
                    disabled={processando === item.id}
                    style={{ flex: 1, height: 42, borderRadius: 8, border: "none", background: "var(--verde)", color: "#fff", fontSize: 13, fontWeight: 600 }}
                  >
                    {processando === item.id ? "..." : "Aprovar"}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {itens.length > 0 && (
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)", textAlign: "center", marginTop: 8 }}>
            Aprovar já baixa o estoque dos insumos usados e libera o lançamento pros relatórios.
          </p>
        )}
      </div>
    </main>
  );
}
