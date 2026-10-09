"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogoFazenda, ehFertilizanteFoliar } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "../../../recomendacoes/_shared/styles";
import { MaquinaField } from "../../../recomendacoes/_shared/MaquinaField";
import { SucessoCriacao } from "../../../recomendacoes/_shared/SucessoCriacao";
import { enfileirarEExecutar } from "@/lib/offline-store";
import { executarAvulsoAdubacao, type PayloadAvulsoAdubacao } from "@/lib/avulso/executores";

type ProdutoItem = { chave: string; insumoId: string; dose: string };
function novoProduto(): ProdutoItem {
  return { chave: crypto.randomUUID(), insumoId: "", dose: "" };
}

const MODALIDADES = [
  { value: "convencional", label: "Convencional" },
  { value: "sulco", label: "No sulco" },
  { value: "broadcast", label: "A lanço (broadcast)" },
  { value: "foliar", label: "Foliar" },
  { value: "fertirrigacao", label: "Fertirrigação" },
] as const;

export default function AvulsoAdubacaoPage() {
  const router = useRouter();
  const {
    supabase, perfilId, fazendas, fazendaId, setFazendaId,
    ciclos, cicloId, setCicloId, talhoes, insumos: fertilizantes, maquinas,
    carregando, erro: erroCarregamento,
  } = useCatalogoFazenda(["fertilizante", "micronutriente"]);

  const [talhaoId, setTalhaoId] = useState("");
  const [modalidade, setModalidade] = useState<(typeof MODALIDADES)[number]["value"]>("convencional");
  const [produtos, setProdutos] = useState<ProdutoItem[]>([novoProduto()]);

  // Micronutriente/foliar só entra quando a modalidade é foliar — o resto
  // (adubação de base) nunca mostra produto foliar junto (pedido do dono,
  // 9/out/2026).
  const produtosDisponiveis = useMemo(
    () => fertilizantes.filter((i) => ehFertilizanteFoliar(i.subgrupo) === (modalidade === "foliar")),
    [fertilizantes, modalidade]
  );
  const [maquinaId, setMaquinaId] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [observacoes, setObservacoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [pendenteSync, setPendenteSync] = useState(false);

  const talhaoSelecionado = talhoes.find((t) => t.id === talhaoId) ?? null;

  function atualizarProduto(chave: string, campo: keyof ProdutoItem, valor: string) {
    setProdutos((atual) => atual.map((p) => (p.chave === chave ? { ...p, [campo]: valor } : p)));
  }
  function removerProduto(chave: string) {
    setProdutos((atual) => (atual.length > 1 ? atual.filter((p) => p.chave !== chave) : atual));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!perfilId || !fazendaId || !cicloId || !talhaoSelecionado) {
      setErro("Selecione fazenda, ciclo e talhão.");
      return;
    }
    const produtosValidos = produtos.filter((p) => p.insumoId && p.dose);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos um produto.");
      return;
    }

    setSalvando(true);
    const id = crypto.randomUUID();
    const payload: PayloadAvulsoAdubacao = {
      id,
      fazendaId,
      cicloId,
      talhaoId,
      areaHa: talhaoSelecionado.area_ha,
      perfilId,
      maquinaId: maquinaId || null,
      data,
      observacoes: observacoes || null,
      modalidade,
      produtos: produtosValidos.map((p) => ({
        insumoId: p.insumoId,
        nome: fertilizantes.find((i) => i.id === p.insumoId)?.nome ?? "Produto",
        dose: Number(p.dose),
      })),
    };

    const resultado = await enfileirarEExecutar(
      { id, tipo: "avulso_adubacao", fazenda_id: fazendaId, payload },
      () => executarAvulsoAdubacao(supabase, payload)
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
    return (
      <SucessoCriacao
        titulo="Adubação registrada — enviada para aprovação."
        pendenteSync={pendenteSync}
        onVoltar={() => router.push("/")}
      />
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Lançamento Avulso — Adubação</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>Operação que já aconteceu</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Local</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Fazenda</span>
            <select style={inputStyle} value={fazendaId} onChange={(e) => { setFazendaId(e.target.value); setTalhaoId(""); }}>
              {fazendas.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Ciclo</span>
            <select style={inputStyle} value={cicloId} onChange={(e) => setCicloId(e.target.value)}>
              <option value="">Selecione...</option>
              {ciclos.map((c) => <option key={c.id} value={c.id}>{c.descricao} ({c.cultura})</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Talhão</span>
            <select style={inputStyle} value={talhaoId} onChange={(e) => setTalhaoId(e.target.value)}>
              <option value="">Selecione...</option>
              {talhoes.map((t) => <option key={t.id} value={t.id}>{t.nome} ({t.area_ha} ha)</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Modalidade</span>
            <select
              style={inputStyle}
              value={modalidade}
              onChange={(e) => {
                const nova = e.target.value as typeof modalidade;
                setModalidade(nova);
                setProdutos((atual) =>
                  atual.map((p) => {
                    const produto = fertilizantes.find((i) => i.id === p.insumoId);
                    const aindaValido = !produto || ehFertilizanteFoliar(produto.subgrupo) === (nova === "foliar");
                    return aindaValido ? p : { ...p, insumoId: "" };
                  })
                );
              }}
            >
              {MODALIDADES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </label>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Produtos aplicados</p>
          {produtos.map((produto, index) => (
            <div key={produto.chave} style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, borderRadius: 8, border: "0.5px solid var(--azul-petroleo)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--azul-escuro)" }}>Produto {index + 1}</span>
                {produtos.length > 1 && (
                  <button type="button" onClick={() => removerProduto(produto.chave)} style={{ border: "none", background: "transparent", color: "var(--vermelho)", fontSize: 12, fontWeight: 600 }}>
                    Remover
                  </button>
                )}
              </div>
              <select style={inputStyle} value={produto.insumoId} onChange={(e) => atualizarProduto(produto.chave, "insumoId", e.target.value)}>
                <option value="">Selecione...</option>
                {produtosDisponiveis.map((i) => <option key={i.id} value={i.id}>{i.nome}</option>)}
              </select>
              <input
                type="number" inputMode="decimal" step="0.0001" placeholder="Dose (kg/ha)"
                style={inputStyle} value={produto.dose} onChange={(e) => atualizarProduto(produto.chave, "dose", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button" onClick={() => setProdutos((atual) => [...atual, novoProduto()])}
            style={{ height: 44, borderRadius: 8, border: "0.5px dashed var(--azul-petroleo)", background: "transparent", color: "var(--azul-petroleo)", fontSize: 13, fontWeight: 600 }}
          >
            + Adicionar produto
          </button>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Data e máquina</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data da aplicação</span>
            <input type="date" style={inputStyle} value={data} onChange={(e) => setData(e.target.value)} />
          </label>
          <MaquinaField maquinas={maquinas} maquinaId={maquinaId} setMaquinaId={setMaquinaId} />
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Observações</p>
          <textarea style={{ ...inputStyle, height: 80, paddingTop: 10, resize: "vertical" }} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </section>

        {erro && (
          <p style={{ fontSize: 13, color: "var(--vermelho)", fontWeight: 600, padding: 12, borderRadius: 8, background: "#FCEAEA" }}>{erro}</p>
        )}

        <button
          type="submit" disabled={salvando}
          style={{ height: 52, borderRadius: 8, border: "none", background: salvando ? "#d9b768" : "var(--mostarda)", color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 24 }}
        >
          {salvando ? "Salvando..." : "Registrar adubação"}
        </button>
      </form>
    </main>
  );
}
