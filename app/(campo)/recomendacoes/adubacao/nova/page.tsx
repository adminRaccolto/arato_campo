"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { TalhoesSelector } from "../../_shared/TalhoesSelector";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../_shared/styles";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { criarRecomendacao, CONFIG_ADUBACAO, type PayloadCriacaoRecomendacao } from "@/lib/recomendacoes/executores";
import { SucessoCriacao } from "../../_shared/SucessoCriacao";
import { LocalESafraFields } from "../../_shared/LocalESafraFields";
import { OperadorField } from "../../_shared/OperadorField";

type ProdutoItem = {
  chave: string;
  insumoId: string;
  doseKgHa: string;
};

const MODALIDADES = [
  { value: "convencional", label: "Convencional" },
  { value: "sulco", label: "No sulco" },
  { value: "broadcast", label: "A lanço (broadcast)" },
  { value: "foliar", label: "Foliar" },
  { value: "fertirrigacao", label: "Fertirrigação" },
] as const;

function novoProduto(): ProdutoItem {
  return { chave: crypto.randomUUID(), insumoId: "", doseKgHa: "" };
}

export default function NovaRecomendacaoAdubacaoPage() {
  const router = useRouter();
  const {
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
    insumos: fertilizantes,
    perfis,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda(["fertilizante", "micronutriente"]);

  const [talhaoIdsSelecionados, setTalhaoIdsSelecionados] = useState<Set<string>>(new Set());
  const [operadorPerfilId, setOperadorPerfilId] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([novoProduto()]);

  const [modalidade, setModalidade] = useState<(typeof MODALIDADES)[number]["value"]>("convencional");
  const [profundidadeAplicacaoCm, setProfundidadeAplicacaoCm] = useState("");

  const [dataAplicacaoIndicada, setDataAplicacaoIndicada] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  const dataRecomendacaoHoje = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const hectaresSugeridos = useMemo(() => {
    return talhoes
      .filter((t) => talhaoIdsSelecionados.has(t.id))
      .reduce((soma, t) => soma + t.area_ha, 0);
  }, [talhoes, talhaoIdsSelecionados]);

  function alternarTalhao(id: string) {
    setTalhaoIdsSelecionados((atual) => {
      const novo = new Set(atual);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  function atualizarProduto(chave: string, campo: keyof ProdutoItem, valor: string) {
    setProdutos((atual) => atual.map((p) => (p.chave === chave ? { ...p, [campo]: valor } : p)));
  }

  function removerProduto(chave: string) {
    setProdutos((atual) => (atual.length > 1 ? atual.filter((p) => p.chave !== chave) : atual));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!perfilId || !fazendaId || !cicloId) {
      setErro("Selecione fazenda e ciclo antes de salvar.");
      return;
    }
    if (talhaoIdsSelecionados.size === 0) {
      setErro("Selecione ao menos um talhão.");
      return;
    }
    if (!operadorPerfilId) {
      setErro("Selecione o operador responsável.");
      return;
    }
    if (!dataAplicacaoIndicada) {
      setErro("Informe a data de aplicação indicada.");
      return;
    }
    const produtosValidos = produtos.filter((p) => p.insumoId && p.doseKgHa);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos um fertilizante.");
      return;
    }

    setSalvando(true);

    const recomendacaoId = crypto.randomUUID();
    const tarefaId = crypto.randomUUID();
    const talhoesSelecionados = talhoes.filter((t) => talhaoIdsSelecionados.has(t.id));

    const payload: PayloadCriacaoRecomendacao = {
      recomendacaoId,
      tarefaId,
      fazendaId,
      operadorPerfilId,
      header: {
        id: recomendacaoId,
        fazenda_id: fazendaId,
        ciclo_id: cicloId,
        criado_por_perfil_id: perfilId,
        data_recomendacao: dataRecomendacaoHoje,
        data_aplicacao_indicada: dataAplicacaoIndicada,
        hectares_sugeridos: hectaresSugeridos,
        modalidade,
        profundidade_aplicacao_cm: profundidadeAplicacaoCm ? Number(profundidadeAplicacaoCm) : null,
        observacoes: observacoes || null,
      },
      talhoes: talhoesSelecionados.map((t) => ({ talhaoId: t.id, areaHa: t.area_ha })),
      produtos: produtosValidos.map((p) => ({
        insumo_id: p.insumoId,
        dose_kg_ha: Number(p.doseKgHa),
      })),
    };

    const resultado = await enfileirarEExecutar(
      { id: recomendacaoId, tipo: "recomendacao_adubacao", fazenda_id: fazendaId, payload },
      () => criarRecomendacao(supabase, CONFIG_ADUBACAO, payload)
    );

    setSalvando(false);
    setPendenteSync(!resultado.sincronizado);
    setSucesso(true);
  }

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (erroCarregamento) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p style={{ fontSize: 13, color: "var(--vermelho)", textAlign: "center" }}>{erroCarregamento}</p>
      </main>
    );
  }

  if (sucesso) {
    return <SucessoCriacao pendenteSync={pendenteSync} onVoltar={() => router.push("/")} />;
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Nova recomendação — Adubação
        </p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Recomendações Agronômicas</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <LocalESafraFields
          fazendas={fazendas}
          fazendaId={fazendaId}
          setFazendaId={setFazendaId}
          anosSafra={anosSafra}
          anoSafraId={anoSafraId}
          setAnoSafraId={setAnoSafraId}
          ciclos={ciclos}
          cicloId={cicloId}
          setCicloId={setCicloId}
        />

        <TalhoesSelector
          talhoes={talhoes}
          selecionados={talhaoIdsSelecionados}
          onAlternar={alternarTalhao}
          hectaresSugeridos={hectaresSugeridos}
        />

        <OperadorField perfis={perfis} operadorPerfilId={operadorPerfilId} setOperadorPerfilId={setOperadorPerfilId} />

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Fertilizantes</p>
          {produtos.map((produto, index) => (
            <div
              key={produto.chave}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: 12,
                borderRadius: 8,
                border: "0.5px solid var(--azul-petroleo)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--azul-escuro)" }}>
                  Produto {index + 1}
                </span>
                {produtos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removerProduto(produto.chave)}
                    style={{ border: "none", background: "transparent", color: "var(--vermelho)", fontSize: 12, fontWeight: 600 }}
                  >
                    Remover
                  </button>
                )}
              </div>

              <select
                style={inputStyle}
                value={produto.insumoId}
                onChange={(e) => atualizarProduto(produto.chave, "insumoId", e.target.value)}
              >
                <option value="">Selecione o fertilizante...</option>
                {fertilizantes.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
              </select>

              <input
                type="number"
                inputMode="decimal"
                step="0.0001"
                placeholder="Dose (kg/ha)"
                style={inputStyle}
                value={produto.doseKgHa}
                onChange={(e) => atualizarProduto(produto.chave, "doseKgHa", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => setProdutos((atual) => [...atual, novoProduto()])}
            style={{
              height: 44,
              borderRadius: 8,
              border: "0.5px dashed var(--azul-petroleo)",
              background: "transparent",
              color: "var(--azul-petroleo)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            + Adicionar fertilizante
          </button>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Parâmetros técnicos</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Modalidade de aplicação</span>
            <select style={inputStyle} value={modalidade} onChange={(e) => setModalidade(e.target.value as typeof modalidade)}>
              {MODALIDADES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Profundidade de aplicação (cm) — opcional</span>
            <input
              type="number"
              inputMode="decimal"
              style={inputStyle}
              value={profundidadeAplicacaoCm}
              onChange={(e) => setProfundidadeAplicacaoCm(e.target.value)}
              placeholder="Ex: 5 (fósforo é imóvel no solo — colocação perto da raiz importa)"
            />
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Datas</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data da recomendação (automático)</span>
            <input type="date" style={{ ...inputStyle, background: "#EAF7EF", color: "var(--verde)" }} value={dataRecomendacaoHoje} disabled />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de aplicação indicada</span>
            <input type="date" style={inputStyle} value={dataAplicacaoIndicada} onChange={(e) => setDataAplicacaoIndicada(e.target.value)} />
          </label>

          <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
            A data de aplicação realizada é preenchida pelo operador no fechamento da tarefa.
          </p>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Observações</p>
          <textarea
            style={{ ...inputStyle, height: 80, paddingTop: 10, resize: "vertical" }}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Restrições, janela de chuva, etc."
          />
        </section>

        {(erro || erroCarregamento) && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>
            {erro ?? erroCarregamento}
          </p>
        )}

        <button
          type="submit"
          disabled={salvando}
          style={{
            height: 52,
            borderRadius: 8,
            border: "none",
            background: salvando ? "#d9b768" : "var(--mostarda)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          {salvando ? "Salvando..." : "Criar recomendação"}
        </button>
      </form>
    </main>
  );
}
