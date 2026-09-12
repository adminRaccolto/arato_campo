import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Fazenda = { id: string; nome: string };
export type AnoSafra = { id: string; descricao: string; data_inicio: string; data_fim: string };
export type Ciclo = { id: string; descricao: string; cultura: string; data_inicio: string; data_fim: string };
export type Talhao = { id: string; nome: string; area_ha: number; kml_url: string | null };
export type Insumo = { id: string; nome: string; unidade: string };
export type Perfil = { id: string; nome: string | null };

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

  const [perfilId, setPerfilId] = useState<string | null>(null);
  const [contaId, setContaId] = useState<string | null>(null);

  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [fazendaId, setFazendaId] = useState("");

  const [anosSafra, setAnosSafra] = useState<AnoSafra[]>([]);
  const [anoSafraId, setAnoSafraId] = useState("");

  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [cicloId, setCicloId] = useState("");

  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: perfil, error: perfilError } = await supabase
        .from("perfis")
        .select("id, conta_id, fazenda_id")
        .eq("user_id", user.id)
        .limit(1);

      if (perfilError || !perfil || perfil.length === 0) {
        setErro("Não foi possível carregar o perfil do usuário logado.");
        setCarregando(false);
        return;
      }

      const meuPerfil = perfil[0];
      if (!meuPerfil.conta_id) {
        setErro("Perfil sem conta vinculada.");
        setCarregando(false);
        return;
      }

      setPerfilId(meuPerfil.id);
      setContaId(meuPerfil.conta_id);

      const { data: fazendasData, error: fazendasError } = await supabase
        .from("fazendas")
        .select("id, nome")
        .eq("conta_id", meuPerfil.conta_id)
        .order("nome");

      if (fazendasError) {
        setErro("Não foi possível carregar as fazendas da conta.");
        setCarregando(false);
        return;
      }

      setFazendas(fazendasData ?? []);
      setFazendaId(meuPerfil.fazenda_id ?? fazendasData?.[0]?.id ?? "");
      setCarregando(false);
    }

    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const contaIdAtual = contaId;
    if (!fazendaId || !contaIdAtual) return;

    async function carregarCatalogoFazenda(contaIdParam: string) {
      let insumosQuery = supabase
        .from("insumos")
        .select("id, nome, unidade")
        .eq("fazenda_id", fazendaId)
        .order("nome");
      if (categoriasKey) {
        insumosQuery = insumosQuery.in("categoria", categoriasKey.split(","));
      }

      const [talhoesRes, anosSafraRes, insumosRes, perfisRes] = await Promise.all([
        supabase.from("talhoes").select("id, nome, area_ha, kml_url").eq("fazenda_id", fazendaId).order("nome"),
        supabase
          .from("anos_safra")
          .select("id, descricao, data_inicio, data_fim")
          .eq("fazenda_id", fazendaId)
          .order("data_inicio", { ascending: false }),
        insumosQuery,
        supabase.from("perfis").select("id, nome").eq("conta_id", contaIdParam).order("nome"),
      ]);

      setTalhoes(talhoesRes.data ?? []);
      setInsumos(insumosRes.data ?? []);
      setPerfis(perfisRes.data ?? []);

      const listaAnosSafra = anosSafraRes.data ?? [];
      setAnosSafra(listaAnosSafra);
      const anoSafraAtivo = escolherAtivoPorData(listaAnosSafra);
      setAnoSafraId(anoSafraAtivo?.id ?? "");
    }

    carregarCatalogoFazenda(contaIdAtual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fazendaId, contaId, categoriasKey]);

  useEffect(() => {
    if (!fazendaId || !anoSafraId) {
      setCiclos([]);
      setCicloId("");
      return;
    }

    async function carregarCiclos() {
      const { data } = await supabase
        .from("ciclos")
        .select("id, descricao, cultura, data_inicio, data_fim")
        .eq("fazenda_id", fazendaId)
        .eq("ano_safra_id", anoSafraId)
        .order("data_inicio", { ascending: false });

      const lista = data ?? [];
      setCiclos(lista);
      const cicloAtivo = escolherAtivoPorData(lista);
      setCicloId(cicloAtivo?.id ?? "");
    }

    carregarCiclos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fazendaId, anoSafraId]);

  return {
    supabase,
    perfilId,
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
    carregando,
    erro,
    setErro,
  };
}
