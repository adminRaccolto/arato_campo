import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

export type Fazenda = { id: string; nome: string };
export type AnoSafra = { id: string; descricao: string; data_inicio: string; data_fim: string };
export type Ciclo = { id: string; descricao: string; cultura: string; data_inicio: string; data_fim: string };
export type Talhao = { id: string; nome: string; area_ha: number; kml_url: string | null };
export type Insumo = { id: string; nome: string; unidade: string; subgrupo: string | null };
export type Perfil = { id: string; nome: string | null };
export type Maquina = { id: string; nome: string; tipo: string | null };

// Dentro de categoria='fertilizante' tem produto de adubação foliar
// (micronutriente líquido/foliar) misturado com adubação de base — não dá
// pra separar por categoria nova sem mexer no cadastro do Arato principal,
// então separa pelo `subgrupo` que o cadastro já grava (achado 9/out/2026,
// pedido do dono: "Micronutrientes e Foliar são Fertilizantes, mas na
// operação adubação foliar — os outros são adubação de base"). Usado pra
// filtrar o dropdown de produto conforme a modalidade escolhida na tela de
// Adubação — não reescreve o subgrupo no banco, só classifica em runtime.
const SUBGRUPOS_FOLIAR = ["foliar", "micronutriente"];
export function ehFertilizanteFoliar(subgrupo: string | null): boolean {
  if (!subgrupo) return false;
  const s = subgrupo.toLowerCase();
  return SUBGRUPOS_FOLIAR.some((termo) => s.includes(termo));
}

export function escolherAtivoPorData<T extends { data_inicio: string; data_fim: string }>(
  itens: T[]
): T | undefined {
  const hoje = new Date().toISOString().slice(0, 10);
  return (
    itens.find((item) => item.data_inicio <= hoje && hoje <= item.data_fim) ??
    itens[0]
  );
}

/**
 * Carrega o catálogo compartilhado por todas as telas de recomendação
 * agronômica: perfil logado → fazendas da conta → (ano safra → ciclo) +
 * talhões + operadores da fazenda selecionada, e opcionalmente os insumos
 * de uma ou mais categorias (ex.: 'defensivo', 'fertilizante').
 */
export function useCatalogoFazenda(categoriasInsumo: string[]) {
  const supabase = useMemo(() => createClient(), []);
  const categoriasKey = categoriasInsumo.join(",");
  const auth = useAuth();

  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [fazendaId, setFazendaId] = useState("");

  const [anosSafra, setAnosSafra] = useState<AnoSafra[]>([]);
  const [anoSafraId, setAnoSafraId] = useState("");

  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [cicloId, setCicloId] = useState("");

  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);

  const [carregandoFazendas, setCarregandoFazendas] = useState(true);
  const [erroFazendas, setErroFazendas] = useState<string | null>(null);

  // Perfil/conta já vêm prontos do AuthProvider (carregado uma vez só, no
  // topo da árvore) — aqui só carrega as fazendas da conta e escolhe a
  // fazenda inicial (a salva no perfil, se houver).
  useEffect(() => {
    if (auth.carregando) return;
    if (auth.erro) {
      setErroFazendas(auth.erro);
      setCarregandoFazendas(false);
      return;
    }
    if (!auth.contaId) return;

    async function carregarFazendas(contaIdParam: string, fazendaIdPadrao: string | null, permitidas: string[] | null) {
      // fazendas_permitidas não-nulo escopa por ele (decisão 4.4) — nulo
      // (coluna ainda não migrada, ou nunca configurada) cai pro escopo por
      // conta_id de antes. [] explícito já bloqueou lá no CampoShell
      // (semAcesso), então nunca chega aqui vazio.
      let query = supabase.from("fazendas").select("id, nome").order("nome");
      query = permitidas ? query.in("id", permitidas) : query.eq("conta_id", contaIdParam);

      const { data: fazendasData, error: fazendasError } = await query;

      if (fazendasError) {
        setErroFazendas("Não foi possível carregar as fazendas da conta.");
        setCarregandoFazendas(false);
        return;
      }

      setFazendas(fazendasData ?? []);
      setFazendaId(fazendaIdPadrao ?? fazendasData?.[0]?.id ?? "");
      setCarregandoFazendas(false);
    }

    carregarFazendas(auth.contaId, auth.fazendaIdPadrao, auth.fazendasPermitidas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.carregando, auth.erro, auth.contaId, auth.fazendaIdPadrao, auth.fazendasPermitidas]);

  useEffect(() => {
    const contaIdAtual = auth.contaId;
    if (!fazendaId || !contaIdAtual) return;

    async function carregarCatalogoFazenda(contaIdParam: string) {
      let insumosQuery = supabase
        .from("insumos")
        .select("id, nome, unidade, subgrupo")
        .eq("fazenda_id", fazendaId)
        .order("nome");
      if (categoriasKey) {
        insumosQuery = insumosQuery.in("categoria", categoriasKey.split(","));
      }

      const [talhoesRes, anosSafraRes, insumosRes, perfisRes, maquinasRes] = await Promise.all([
        supabase.from("talhoes").select("id, nome, area_ha, kml_url").eq("fazenda_id", fazendaId).order("nome"),
        supabase
          .from("anos_safra")
          .select("id, descricao, data_inicio, data_fim")
          .eq("fazenda_id", fazendaId)
          .order("data_inicio", { ascending: false }),
        insumosQuery,
        supabase.from("perfis").select("id, nome").eq("conta_id", contaIdParam).eq("produto", "campo").order("nome"),
        supabase.from("maquinas").select("id, nome, tipo").eq("fazenda_id", fazendaId).eq("ativa", true).order("nome"),
      ]);

      setTalhoes(talhoesRes.data ?? []);
      setInsumos(insumosRes.data ?? []);
      setPerfis(perfisRes.data ?? []);
      setMaquinas(maquinasRes.data ?? []);

      const listaAnosSafra = anosSafraRes.data ?? [];
      setAnosSafra(listaAnosSafra);
      const anoSafraAtivo = escolherAtivoPorData(listaAnosSafra);
      setAnoSafraId(anoSafraAtivo?.id ?? "");
    }

    carregarCatalogoFazenda(contaIdAtual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fazendaId, auth.contaId, categoriasKey]);

  // Carrega TODOS os ciclos da fazenda, sem filtrar por ano_safra_id — achado
  // 9/out/2026: várias fazendas têm `anos_safra` duplicados/malformados no
  // banco (mais de um registro "Safra 2026/2027" com datas diferentes pra
  // mesma fazenda), e o auto-seletor de ano safra ativo (`escolherAtivoPorData`
  // em cima de `anosSafra`) às vezes não batia com NENHUM desses registros —
  // aí o filtro por `ano_safra_id` escondia ciclos de verdade, cadastrados,
  // de um usuário real. `ciclos` já tem `fazenda_id` próprio (não depende de
  // `anos_safra` pra isso), então filtrar só por fazenda é mais robusto e
  // não perde nada — a seleção do ciclo ativo usa a data do próprio ciclo.
  useEffect(() => {
    if (!fazendaId) {
      setCiclos([]);
      setCicloId("");
      return;
    }

    async function carregarCiclos() {
      const { data } = await supabase
        .from("ciclos")
        .select("id, descricao, cultura, data_inicio, data_fim")
        .eq("fazenda_id", fazendaId)
        .order("data_inicio", { ascending: false });

      const lista = data ?? [];
      setCiclos(lista);
      const cicloAtivo = escolherAtivoPorData(lista);
      setCicloId(cicloAtivo?.id ?? "");
    }

    carregarCiclos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fazendaId]);

  return {
    supabase,
    perfilId: auth.perfilId,
    userId: auth.userId,
    fazendas,
    fazendaId,
    setFazendaId,
    anosSafra,
    anoSafraId,
    setAnoSafraId,
    ciclos,
    cicloId,
    setCicloId,
    talhoes,
    insumos,
    perfis,
    maquinas,
    carregando: auth.carregando || carregandoFazendas,
    erro: auth.erro ?? erroFazendas,
    setErro: setErroFazendas,
  };
}
