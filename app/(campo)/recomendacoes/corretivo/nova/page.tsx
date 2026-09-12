"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { TalhoesSelector } from "../../_shared/TalhoesSelector";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../_shared/styles";

type ProdutoItem = {
  chave: string;
  insumoId: string;
  doseTonHa: string;
  prntPct: string;
};

const FINALIDADES = [
  { value: "calcario", label: "Calcário" },
  { value: "gesso", label: "Gesso" },
  { value: "micronutrientes", label: "Micronutrientes" },
  { value: "organico", label: "Orgânico" },
  { value: "outros", label: "Outros" },
] as const;

function novoProduto(): ProdutoItem {
  return { chave: crypto.randomUUID(), insumoId: "", doseTonHa: "", prntPct: "" };
}

export default function NovaRecomendacaoCorretivoPage() {
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
    insumos: corretivos,
    perfis,
    carregando,
    erro: erroCarregamento,
  } = useCatalogoFazenda(["corretivo"]);

  const [talhaoIdsSelecionados, setTalhaoIdsSelecionados] = useState<Set<string>>(new Set());
  const [operadorPerfilId, setOperadorPerfilId] = useState("");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([novoProduto()]);

  const [finalidade, setFinalidade] = useState<(typeof FINALIDADES)[number]["value"]>("calcario");
  const [profundidadeIncorporacaoCm, setProfundidadeIncorporacaoCm] = useState("");

  const [dataAplicacaoIndicada, setDataAplicacaoIndicada] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const dataRecomendacaoHoje = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const mostrarPrnt = finalidade === "calcario";

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
    const produtosValidos = produtos.filter((p) => p.insumoId && p.doseTonHa);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos um corretivo.");
      return;
    }

    setSalvando(true);

    const recomendacaoId = crypto.randomUUID();
    const tarefaId = crypto.randomUUID();

    // Tabelas ainda não existem no banco (ver
    // db/migrations-draft/002_recomendacoes_adubacao_corretivo.sql) — insert
    // vai falhar até a migration ser aplicada.
    const sb = supabase as unknown as {
      from: (table: string) => ReturnType<typeof supabase.from>;
    };

    const { error: recomendacaoError } = await sb.from("recomendacoes_corretivo").insert({
      id: recomendacaoId,
      fazenda_id: fazendaId,
      ciclo_id: cicloId,
      criado_por_perfil_id: perfilId,
      data_recomendacao: dataRecomendacaoHoje,
      data_aplicacao_indicada: dataAplicacaoIndicada,
      hectares_sugeridos: hectaresSugeridos,
      finalidade,
      profundidade_incorporacao_cm: profundidadeIncorporacaoCm
        ? Number(profundidadeIncorporacaoCm)
        : null,
      observacoes: observacoes || null,
    });

    if (recomendacaoError) {
      setErro(
        `Não foi possível salvar: ${recomendacaoError.message}. Provavelmente o schema ainda não foi aplicado no banco (db/migrations-draft/002_recomendacoes_adubacao_corretivo.sql).`
      );
      setSalvando(false);
      return;
    }

    const talhoesSelecionados = talhoes.filter((t) => talhaoIdsSelecionados.has(t.id));
    await sb.from("recomendacoes_corretivo_talhoes").insert(
      talhoesSelecionados.map((t) => ({
        id: crypto.randomUUID(),
        recomendacao_id: recomendacaoId,
        talhao_id: t.id,
        area_ha: t.area_ha,
      }))
    );

    await sb.from("recomendacoes_corretivo_produtos").insert(
      produtosValidos.map((p) => ({
        id: crypto.randomUUID(),
        recomendacao_id: recomendacaoId,
        insumo_id: p.insumoId,
        dose_ton_ha: Number(p.doseTonHa),
        prnt_pct: mostrarPrnt && p.prntPct ? Number(p.prntPct) : null,
      }))
    );

    await sb.from("tarefas").insert({
      id: tarefaId,
      fazenda_id: fazendaId,
      recomendacao_corretivo_id: recomendacaoId,
      perfil_atribuido_id: operadorPerfilId,
      status: "pendente",
    });

    setSalvando(false);
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
    return (
      <main
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 24,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: "var(--verde)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 28,
          }}
        >
          ✓
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Recomendação criada e tarefa atribuída ao operador.
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            height: 48,
            padding: "0 24px",
            borderRadius: 8,
            border: "none",
            background: "var(--azul-petroleo)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Voltar ao início
        </button>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>
          Nova recomendação — Corretivo
        </p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Recomendações Agronômicas</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Local e safra</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Fazenda</span>
            <select style={inputStyle} value={fazendaId} onChange={(e) => setFazendaId(e.target.value)}>
              {fazendas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ano safra</span>
            <select style={inputStyle} value={anoSafraId} onChange={(e) => setAnoSafraId(e.target.value)}>
              {anosSafra.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.descricao}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ciclo</span>
            <select style={inputStyle} value={cicloId} onChange={(e) => setCicloId(e.target.value)}>
              {ciclos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.descricao} ({c.cultura})
                </option>
              ))}
            </select>
          </label>
        </section>

        <TalhoesSelector
          talhoes={talhoes}
          selecionados={talhaoIdsSelecionados}
          onAlternar={alternarTalhao}
          hectaresSugeridos={hectaresSugeridos}
        />

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Operador responsável</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Quem vai executar</span>
            <select style={inputStyle} value={operadorPerfilId} onChange={(e) => setOperadorPerfilId(e.target.value)}>
              <option value="">Selecione...</option>
              {perfis.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome ?? p.id}
                </option>
              ))}
            </select>
          </label>
          <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
            A recomendação vira uma tarefa exclusiva desse operador. Transferência exige PIN do
            Gerente Campo.
          </p>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Parâmetros técnicos</p>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Finalidade</span>
            <select style={inputStyle} value={finalidade} onChange={(e) => setFinalidade(e.target.value as typeof finalidade)}>
              {FINALIDADES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Profundidade de incorporação (cm) — opcional</span>
            <input
              type="number"
              inputMode="decimal"
              style={inputStyle}
              value={profundidadeIncorporacaoCm}
              onChange={(e) => setProfundidadeIncorporacaoCm(e.target.value)}
              placeholder="Superficial (0) ou incorporado (ex: 20)"
            />
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Corretivos</p>
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
                <option value="">Selecione o corretivo...</option>
                {corretivos.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
              </select>

              <input
                type="number"
                inputMode="decimal"
                step="0.0001"
                placeholder="Dose (ton/ha)"
                style={inputStyle}
                value={produto.doseTonHa}
                onChange={(e) => atualizarProduto(produto.chave, "doseTonHa", e.target.value)}
              />

              {mostrarPrnt && (
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  placeholder="PRNT do calcário (%) — opcional"
                  style={inputStyle}
                  value={produto.prntPct}
                  onChange={(e) => atualizarProduto(produto.chave, "prntPct", e.target.value)}
                />
              )}
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
            + Adicionar corretivo
          </button>
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
            placeholder="Referência de análise de solo, restrições, etc."
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
