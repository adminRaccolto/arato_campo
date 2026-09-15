"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { TalhoesSelector } from "../../_shared/TalhoesSelector";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../_shared/styles";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { criarRecomendacao, CONFIG_PULVERIZACAO, type PayloadCriacaoRecomendacao } from "@/lib/recomendacoes/executores";
import { SucessoCriacao } from "../../_shared/SucessoCriacao";
import { LocalESafraFields } from "../../_shared/LocalESafraFields";
import { OperadorField } from "../../_shared/OperadorField";
import { MaquinaField } from "../../_shared/MaquinaField";

type ProdutoItem = {
  chave: string;
  insumoId: string;
  dosePorHa: string;
  unidadeDose: "L" | "mL" | "kg" | "g";
  ordemMistura: string;
};

const TIPOS_BICO = [
  { value: "leque_plano", label: "Leque plano" },
  { value: "insuflacao_ar", label: "Indução de ar / antideriva" },
  { value: "jato_conico", label: "Jato cônico" },
  { value: "leque_duplo", label: "Leque duplo" },
] as const;

const CLASSIFICACOES_GOTA = [
  { value: "fina", label: "Fina" },
  { value: "media", label: "Média" },
  { value: "grossa", label: "Grossa" },
  { value: "muito_grossa", label: "Muito grossa" },
] as const;

function novoProduto(): ProdutoItem {
  return {
    chave: crypto.randomUUID(),
    insumoId: "",
    dosePorHa: "",
    unidadeDose: "L",
    ordemMistura: "",
  };
}

export default function NovaRecomendacaoPulverizacaoPage() {
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
        </main>
      }
    >
      <NovaRecomendacaoPulverizacaoForm />
    </Suspense>
  );
}

function NovaRecomendacaoPulverizacaoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fazendaPrefill = searchParams.get("fazenda");
  const talhaoPrefill = searchParams.get("talhao");
  const talhaoPrefillAplicado = useRef(false);

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
    insumos: insumosDefensivos,
    perfis,
    maquinas,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda(["defensivo"]);

  const [talhaoIdsSelecionados, setTalhaoIdsSelecionados] = useState<Set<string>>(new Set());
  const [operadorPerfilId, setOperadorPerfilId] = useState("");
  const [maquinaId, setMaquinaId] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([novoProduto()]);

  const [volumeCaldaLHa, setVolumeCaldaLHa] = useState("150");
  const [tipoBico, setTipoBico] = useState<(typeof TIPOS_BICO)[number]["value"]>("leque_plano");
  const [pressaoBar, setPressaoBar] = useState("3");
  const [classificacaoGota, setClassificacaoGota] = useState<
    (typeof CLASSIFICACOES_GOTA)[number]["value"]
  >("media");

  const [temperaturaMin, setTemperaturaMin] = useState("15");
  const [temperaturaMax, setTemperaturaMax] = useState("30");
  const [umidadeMin, setUmidadeMin] = useState("55");
  const [ventoMin, setVentoMin] = useState("3");
  const [ventoMax, setVentoMax] = useState("10");

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

  // Vindo de um monitoramento (ver app/monitoramento/nova): troca a fazenda
  // pra a do talhão monitorado, assim que a lista de fazendas carrega.
  useEffect(() => {
    if (!fazendaPrefill || fazendas.length === 0) return;
    if (fazendas.some((f) => f.id === fazendaPrefill) && fazendaId !== fazendaPrefill) {
      setFazendaId(fazendaPrefill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fazendaPrefill, fazendas]);

  // Pré-seleciona o talhão monitorado assim que os talhões da fazenda carregam
  // (só uma vez, pra não reimpor a seleção se o operador desmarcar depois).
  useEffect(() => {
    if (!talhaoPrefill || talhaoPrefillAplicado.current || talhoes.length === 0) return;
    if (talhoes.some((t) => t.id === talhaoPrefill)) {
      setTalhaoIdsSelecionados((atual) => new Set(atual).add(talhaoPrefill));
      talhaoPrefillAplicado.current = true;
    }
  }, [talhaoPrefill, talhoes]);

  function alternarTalhao(id: string) {
    setTalhaoIdsSelecionados((atual) => {
      const novo = new Set(atual);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  function atualizarProduto(chave: string, campo: keyof ProdutoItem, valor: string) {
    setProdutos((atual) =>
      atual.map((p) => (p.chave === chave ? { ...p, [campo]: valor } : p))
    );
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
    const produtosValidos = produtos.filter((p) => p.insumoId && p.dosePorHa);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos um produto na calda.");
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
        volume_calda_l_ha: Number(volumeCaldaLHa),
        tipo_bico: tipoBico,
        pressao_bar: Number(pressaoBar),
        classificacao_gota: classificacaoGota,
        temperatura_min_c: temperaturaMin ? Number(temperaturaMin) : null,
        temperatura_max_c: temperaturaMax ? Number(temperaturaMax) : null,
        umidade_relativa_min_pct: umidadeMin ? Number(umidadeMin) : null,
        vento_min_kmh: ventoMin ? Number(ventoMin) : null,
        vento_max_kmh: ventoMax ? Number(ventoMax) : null,
        observacoes: observacoes || null,
        maquina_id: maquinaId || null,
      },
      talhoes: talhoesSelecionados.map((t) => ({ talhaoId: t.id, areaHa: t.area_ha })),
      produtos: produtosValidos.map((p) => ({
        insumo_id: p.insumoId,
        dose_por_ha: Number(p.dosePorHa),
        unidade_dose: p.unidadeDose,
        ordem_mistura: p.ordemMistura ? Number(p.ordemMistura) : null,
      })),
    };

    const resultado = await enfileirarEExecutar(
      { id: recomendacaoId, tipo: "recomendacao_pulverizacao", fazenda_id: fazendaId, payload },
      () => criarRecomendacao(supabase, CONFIG_PULVERIZACAO, payload)
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
    const fazendaNome = fazendas.find((f) => f.id === fazendaId)?.nome ?? "";
    const operadorNome = perfis.find((p) => p.id === operadorPerfilId)?.nome ?? "";
    const nomesTalhoes = talhoes.filter((t) => talhaoIdsSelecionados.has(t.id)).map((t) => t.nome);
    const linhasProdutos = produtos
      .filter((p) => p.insumoId && p.dosePorHa)
      .map((p) => `• ${insumosDefensivos.find((i) => i.id === p.insumoId)?.nome ?? "Produto"} — ${p.dosePorHa} ${p.unidadeDose}/ha`);
    const mensagem = [
      `🌾 *Recomendação de Pulverização* — ${fazendaNome}`,
      `Talhões: ${nomesTalhoes.join(", ")} (${hectaresSugeridos.toFixed(1)} ha)`,
      `Operador: ${operadorNome}`,
      `Aplicação indicada: ${new Date(dataAplicacaoIndicada + "T12:00").toLocaleDateString("pt-BR")}`,
      "",
      ...linhasProdutos,
    ].join("\n");
    return <SucessoCriacao pendenteSync={pendenteSync} onVoltar={() => router.push("/")} mensagemWhatsApp={mensagem} />;
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "16px 20px",
          borderBottom: "0.5px solid var(--azul-petroleo)",
          background: "#fff",
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Nova recomendação — Pulverização
        </p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          Recomendações Agronômicas
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}
      >
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
          <p style={sectionTitleStyle}>Produtos da calda</p>
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
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--vermelho)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
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
                <option value="">Selecione o defensivo...</option>
                {insumosDefensivos.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
              </select>

              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.0001"
                  placeholder="Dose por ha"
                  style={inputStyle}
                  value={produto.dosePorHa}
                  onChange={(e) => atualizarProduto(produto.chave, "dosePorHa", e.target.value)}
                />
                <select
                  style={{ ...inputStyle, maxWidth: 90 }}
                  value={produto.unidadeDose}
                  onChange={(e) =>
                    atualizarProduto(produto.chave, "unidadeDose", e.target.value)
                  }
                >
                  <option value="L">L</option>
                  <option value="mL">mL</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                </select>
              </div>

              <input
                type="number"
                inputMode="numeric"
                placeholder="Ordem de mistura (opcional)"
                style={inputStyle}
                value={produto.ordemMistura}
                onChange={(e) => atualizarProduto(produto.chave, "ordemMistura", e.target.value)}
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
            + Adicionar produto
          </button>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Parâmetros técnicos</p>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Volume de calda (L/ha)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={volumeCaldaLHa}
                onChange={(e) => setVolumeCaldaLHa(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Pressão (bar)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={pressaoBar}
                onChange={(e) => setPressaoBar(e.target.value)}
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Tipo de bico</span>
            <select
              style={inputStyle}
              value={tipoBico}
              onChange={(e) => setTipoBico(e.target.value as typeof tipoBico)}
            >
              {TIPOS_BICO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Classificação de gota</span>
            <select
              style={inputStyle}
              value={classificacaoGota}
              onChange={(e) => setClassificacaoGota(e.target.value as typeof classificacaoGota)}
            >
              {CLASSIFICACOES_GOTA.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <MaquinaField maquinas={maquinas} maquinaId={maquinaId} setMaquinaId={setMaquinaId} />
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Janela climática recomendada</p>
          <p style={{ fontSize: 11, color: "var(--verde)", fontWeight: 600 }}>
            Sugestão automática — ajuste conforme o produto usado
          </p>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Temp. mín (°C)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={temperaturaMin}
                onChange={(e) => setTemperaturaMin(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Temp. máx (°C)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={temperaturaMax}
                onChange={(e) => setTemperaturaMax(e.target.value)}
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Umidade relativa mínima (%)</span>
            <input
              type="number"
              inputMode="decimal"
              style={inputStyle}
              value={umidadeMin}
              onChange={(e) => setUmidadeMin(e.target.value)}
            />
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Vento mín (km/h)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={ventoMin}
                onChange={(e) => setVentoMin(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Vento máx (km/h)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={ventoMax}
                onChange={(e) => setVentoMax(e.target.value)}
              />
            </label>
          </div>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Datas</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data da recomendação (automático)</span>
            <input
              type="date"
              style={{ ...inputStyle, background: "#EAF7EF", color: "var(--verde)" }}
              value={dataRecomendacaoHoje}
              disabled
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de aplicação indicada</span>
            <input
              type="date"
              style={inputStyle}
              value={dataAplicacaoIndicada}
              onChange={(e) => setDataAplicacaoIndicada(e.target.value)}
            />
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
            placeholder="Compatibilidade de mistura, restrições, etc."
          />
        </section>

        {(erro || erroCarregamento) && (
          <p
            style={{
              fontSize: 13,
              color: "var(--vermelho)",
              fontWeight: 600,
              padding: 12,
              borderRadius: 8,
              background: "#FCEAEA",
            }}
          >
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
