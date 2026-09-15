"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { TalhoesSelector } from "../../_shared/TalhoesSelector";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../_shared/styles";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { criarRecomendacao, CONFIG_PLANTIO, type PayloadCriacaoRecomendacao } from "@/lib/recomendacoes/executores";
import { SucessoCriacao } from "../../_shared/SucessoCriacao";
import { LocalESafraFields } from "../../_shared/LocalESafraFields";
import { OperadorField } from "../../_shared/OperadorField";
import { MaquinaField } from "../../_shared/MaquinaField";

type ProdutoItem = {
  chave: string;
  insumoId: string;
  dosePorHa: string;
  unidadeDose: "kg" | "g" | "L" | "mL";
  lote: string;
};

function novoProduto(): ProdutoItem {
  return { chave: crypto.randomUUID(), insumoId: "", dosePorHa: "", unidadeDose: "kg", lote: "" };
}

export default function NovaRecomendacaoPlantioPage() {
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
    insumos: sementesInoculantes,
    perfis,
    maquinas,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda(["semente", "inoculante"]);

  const [talhaoIdsSelecionados, setTalhaoIdsSelecionados] = useState<Set<string>>(new Set());
  const [operadorPerfilId, setOperadorPerfilId] = useState("");
  const [maquinaId, setMaquinaId] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([novoProduto()]);

  const [populacaoPlantasHa, setPopulacaoPlantasHa] = useState("280000");
  const [espacamentoCm, setEspacamentoCm] = useState("45");
  const [profundidadeCm, setProfundidadeCm] = useState("4");
  const [velocidadeKmh, setVelocidadeKmh] = useState("6");

  const [dataAplicacaoIndicada, setDataAplicacaoIndicada] = useState("");
  const [dataColheitaPrevista, setDataColheitaPrevista] = useState("");
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
      setErro("Informe a data de plantio indicada.");
      return;
    }
    const produtosValidos = produtos.filter((p) => p.insumoId && p.dosePorHa);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos a semente.");
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
        data_colheita_prevista: dataColheitaPrevista || null,
        hectares_sugeridos: hectaresSugeridos,
        populacao_plantas_ha: populacaoPlantasHa ? Number(populacaoPlantasHa) : null,
        espacamento_entrelinhas_cm: espacamentoCm ? Number(espacamentoCm) : null,
        profundidade_semeadura_cm: profundidadeCm ? Number(profundidadeCm) : null,
        velocidade_plantio_kmh: velocidadeKmh ? Number(velocidadeKmh) : null,
        observacoes: observacoes || null,
        maquina_id: maquinaId || null,
      },
      talhoes: talhoesSelecionados.map((t) => ({ talhaoId: t.id, areaHa: t.area_ha })),
      produtos: produtosValidos.map((p) => ({
        insumo_id: p.insumoId,
        dose_por_ha: Number(p.dosePorHa),
        unidade_dose: p.unidadeDose,
        lote: p.lote || null,
      })),
    };

    const resultado = await enfileirarEExecutar(
      { id: recomendacaoId, tipo: "recomendacao_plantio", fazenda_id: fazendaId, payload },
      () => criarRecomendacao(supabase, CONFIG_PLANTIO, payload)
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
      .map((p) => `• ${sementesInoculantes.find((i) => i.id === p.insumoId)?.nome ?? "Produto"} — ${p.dosePorHa} ${p.unidadeDose}/ha`);
    const mensagem = [
      `🌱 *Recomendação de Plantio* — ${fazendaNome}`,
      `Talhões: ${nomesTalhoes.join(", ")} (${hectaresSugeridos.toFixed(1)} ha)`,
      `Operador: ${operadorNome}`,
      `Plantio indicado: ${new Date(dataAplicacaoIndicada + "T12:00").toLocaleDateString("pt-BR")}`,
      "",
      ...linhasProdutos,
    ].join("\n");
    return <SucessoCriacao pendenteSync={pendenteSync} onVoltar={() => router.push("/")} mensagemWhatsApp={mensagem} />;
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Nova recomendação — Plantio
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
          <p style={sectionTitleStyle}>Semente e inoculante</p>
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
                <option value="">Selecione a semente ou inoculante...</option>
                {sementesInoculantes.map((i) => (
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
                  onChange={(e) => atualizarProduto(produto.chave, "unidadeDose", e.target.value)}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="mL">mL</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Lote (opcional)"
                style={inputStyle}
                value={produto.lote}
                onChange={(e) => atualizarProduto(produto.chave, "lote", e.target.value)}
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
              <span style={labelStyle}>População (plantas/ha)</span>
              <input
                type="number"
                inputMode="numeric"
                style={inputStyle}
                value={populacaoPlantasHa}
                onChange={(e) => setPopulacaoPlantasHa(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Espaçamento (cm)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={espacamentoCm}
                onChange={(e) => setEspacamentoCm(e.target.value)}
              />
            </label>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Profundidade (cm)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={profundidadeCm}
                onChange={(e) => setProfundidadeCm(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <span style={labelStyle}>Velocidade (km/h)</span>
              <input
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={velocidadeKmh}
                onChange={(e) => setVelocidadeKmh(e.target.value)}
              />
            </label>
          </div>
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
            Velocidade mais baixa preserva a precisão de singulação em plantadeiras de alta
            população.
          </p>

          <MaquinaField maquinas={maquinas} maquinaId={maquinaId} setMaquinaId={setMaquinaId} />
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Datas</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data da recomendação (automático)</span>
            <input type="date" style={{ ...inputStyle, background: "#EAF7EF", color: "var(--verde)" }} value={dataRecomendacaoHoje} disabled />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de plantio indicada</span>
            <input type="date" style={inputStyle} value={dataAplicacaoIndicada} onChange={(e) => setDataAplicacaoIndicada(e.target.value)} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data de colheita prevista (opcional)</span>
            <input type="date" style={inputStyle} value={dataColheitaPrevista} onChange={(e) => setDataColheitaPrevista(e.target.value)} />
          </label>

          <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
            A data de plantio realizada é preenchida pelo operador no fechamento da tarefa.
          </p>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Observações</p>
          <textarea
            style={{ ...inputStyle, height: 80, paddingTop: 10, resize: "vertical" }}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Umidade do solo, restrições, etc."
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
