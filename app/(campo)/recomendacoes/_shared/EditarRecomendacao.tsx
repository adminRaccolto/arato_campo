"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "./styles";
import { MaquinaField } from "./MaquinaField";
import { atualizarRecomendacao, type ConfigRecomendacao } from "@/lib/recomendacoes/executores";

// Formato de dose varia por tipo: plantio/pulverização deixam escolher a
// unidade (kg/g/L/mL); adubação é sempre kg/ha; corretivo é sempre ton/ha e
// ainda tem um campo extra (PRNT). Um só componente cobre os 4 tipos
// normalizando pra essa forma genérica na tela e voltando pro formato real
// da tabela só na hora de salvar.
export type CampoDoseConfig =
  | { modo: "selecionavel"; campoDose: string; campoUnidade: string; unidades: string[]; campoLote?: string }
  | { modo: "fixa"; campoDose: string; unidadeLabel: string; campoExtra?: { campo: string; label: string } };

type ProdutoEdit = { chave: string; insumoId: string; dose: string; unidade: string; extra: string };

function novoProduto(unidadeInicial: string): ProdutoEdit {
  return { chave: crypto.randomUUID(), insumoId: "", dose: "", unidade: unidadeInicial, extra: "" };
}

export function EditarRecomendacao({
  tipo,
  config,
  campoDose,
  insumosCategoria,
}: {
  tipo: string;
  config: ConfigRecomendacao;
  campoDose: CampoDoseConfig;
  // filtro de categoria pro catálogo de insumos (ex: ["defensivo"] pra
  // pulverização) — carregado à parte aqui porque a tela de edição não
  // precisa do resto do catálogo (fazenda/ciclo/talhões, já fixos).
  insumosCategoria: string[];
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const recomendacaoId = params.id;
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [bloqueado, setBloqueado] = useState<string | null>(null);

  const [contexto, setContexto] = useState<{
    fazendaNome: string;
    talhoes: string;
    hectares: number;
    operadorNome: string;
  } | null>(null);

  const [insumos, setInsumos] = useState<{ id: string; nome: string }[]>([]);
  const [maquinas, setMaquinas] = useState<{ id: string; nome: string; tipo: string | null }[]>([]);
  const [maquinaId, setMaquinaId] = useState("");
  const [dataAplicacaoIndicada, setDataAplicacaoIndicada] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [produtos, setProdutos] = useState<ProdutoEdit[]>([]);

  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const unidadeInicial = campoDose.modo === "selecionavel" ? campoDose.unidades[0] : campoDose.unidadeLabel;

  useEffect(() => {
    if (auth.carregando || !recomendacaoId) return;

    async function carregar() {
      // `any` deliberado — nome de tabela só conhecido em runtime (`tipo`
      // varia por página), mesma razão documentada em
      // lib/recomendacoes/executores.ts.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as unknown as { from: (t: string) => any };

      const { data: rec, error: erroRec } = await sb
        .from(config.tabela)
        .select("*")
        .eq("id", recomendacaoId)
        .maybeSingle();
      if (erroRec || !rec) {
        setErro("Recomendação não encontrada.");
        setCarregando(false);
        return;
      }
      const r = rec as Record<string, unknown>;

      const { data: tarefa } = await supabase
        .from("tarefas")
        .select("status, perfil_atribuido_id")
        .eq(config.colunaTarefaRecomendacao, r.id as string)
        .maybeSingle();
      if (!tarefa || (tarefa.status !== "pendente" && tarefa.status !== "em_andamento")) {
        setBloqueado(
          tarefa ? `Esta recomendação já está com a tarefa ${tarefa.status} — não dá mais pra editar.` : "Tarefa não encontrada."
        );
        setCarregando(false);
        return;
      }

      const [{ data: fazenda }, { data: talhoesRows }, { data: insumosData }, { data: maquinasData }, { data: operadorData }] =
        await Promise.all([
          supabase.from("fazendas").select("nome").eq("id", r.fazenda_id as string).maybeSingle(),
          sb.from(config.tabelaTalhoes).select("area_ha, talhoes(nome)").eq("recomendacao_id", r.id as string),
          supabase.from("insumos").select("id, nome").eq("fazenda_id", r.fazenda_id as string).in("categoria", insumosCategoria),
          supabase.from("maquinas").select("id, nome, tipo").eq("fazenda_id", r.fazenda_id as string).eq("ativa", true),
          tarefa.perfil_atribuido_id
            ? supabase.from("perfis").select("nome").eq("id", tarefa.perfil_atribuido_id).maybeSingle()
            : Promise.resolve({ data: null }),
        ]);

      type TalhaoJoin = { area_ha: number; talhoes: { nome: string } | { nome: string }[] | null };
      const talhoesNomes = ((talhoesRows ?? []) as unknown as TalhaoJoin[]).map((t) =>
        Array.isArray(t.talhoes) ? t.talhoes[0]?.nome : t.talhoes?.nome
      ).filter(Boolean);
      const hectares = ((talhoesRows ?? []) as unknown as TalhaoJoin[]).reduce((s, t) => s + (t.area_ha ?? 0), 0);

      setContexto({
        fazendaNome: fazenda?.nome ?? "Fazenda",
        talhoes: talhoesNomes.join(", "),
        hectares,
        operadorNome: (operadorData as { nome?: string } | null)?.nome ?? "—",
      });
      setInsumos(insumosData ?? []);
      setMaquinas(maquinasData ?? []);
      setMaquinaId((r.maquina_id as string) ?? "");
      setDataAplicacaoIndicada((r.data_aplicacao_indicada as string) ?? "");
      setObservacoes((r.observacoes as string) ?? "");

      const { data: produtosRows } = await sb.from(config.tabelaProdutos).select("*").eq("recomendacao_id", r.id as string);
      const listaProdutos = ((produtosRows ?? []) as Record<string, unknown>[]).map((p): ProdutoEdit => ({
        chave: crypto.randomUUID(),
        insumoId: (p.insumo_id as string) ?? "",
        dose: campoDose.modo === "selecionavel" ? String(p[campoDose.campoDose] ?? "") : String(p[campoDose.campoDose] ?? ""),
        unidade: campoDose.modo === "selecionavel" ? ((p[campoDose.campoUnidade] as string) ?? unidadeInicial) : unidadeInicial,
        extra:
          campoDose.modo === "selecionavel"
            ? campoDose.campoLote ? String(p[campoDose.campoLote] ?? "") : ""
            : campoDose.campoExtra ? String(p[campoDose.campoExtra.campo] ?? "") : "",
      }));
      setProdutos(listaProdutos.length > 0 ? listaProdutos : [novoProduto(unidadeInicial)]);

      setCarregando(false);
    }

    carregar();
    // `config`/`campoDose`/`insumosCategoria` ficam de fora de propósito —
    // são literais recriados a cada render pelo componente-pai (um por
    // tipo), incluí-los aqui causaria refetch em loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, recomendacaoId, auth.carregando]);

  function atualizarProduto(chave: string, campo: keyof ProdutoEdit, valor: string) {
    setProdutos((atual) => atual.map((p) => (p.chave === chave ? { ...p, [campo]: valor } : p)));
  }

  function removerProduto(chave: string) {
    setProdutos((atual) => (atual.length > 1 ? atual.filter((p) => p.chave !== chave) : atual));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    const produtosValidos = produtos.filter((p) => p.insumoId && p.dose);
    if (produtosValidos.length === 0) {
      setErro("Adicione ao menos um produto.");
      return;
    }
    if (!dataAplicacaoIndicada) {
      setErro("Informe a data indicada.");
      return;
    }

    setSalvando(true);

    const header: Record<string, unknown> = {
      data_aplicacao_indicada: dataAplicacaoIndicada,
      observacoes: observacoes || null,
      maquina_id: maquinaId || null,
    };

    const produtosPayload = produtosValidos.map((p) => {
      const linha: Record<string, unknown> = { insumo_id: p.insumoId };
      if (campoDose.modo === "selecionavel") {
        linha[campoDose.campoDose] = Number(p.dose);
        linha[campoDose.campoUnidade] = p.unidade;
        if (campoDose.campoLote) linha[campoDose.campoLote] = p.extra || null;
      } else {
        linha[campoDose.campoDose] = Number(p.dose);
        if (campoDose.campoExtra) linha[campoDose.campoExtra.campo] = p.extra ? Number(p.extra) : null;
      }
      return linha;
    });

    const resultado = await atualizarRecomendacao(supabase, config, {
      recomendacaoId,
      header,
      produtos: produtosPayload,
    });

    setSalvando(false);
    if (!resultado.ok) {
      setErro(resultado.erro ?? "Não foi possível salvar.");
      return;
    }
    setSalvo(true);
  }

  if (auth.carregando) {
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
          Só o Gerente Campo edita recomendações.
        </p>
      </main>
    );
  }

  if (carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (bloqueado) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>{bloqueado}</p>
      </main>
    );
  }

  if (salvo) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Recomendação atualizada.</p>
        <button
          onClick={() => router.push("/recomendacoes")}
          style={{ height: 48, padding: "0 24px", borderRadius: 8, border: "none", background: "var(--azul-petroleo)", color: "#fff", fontSize: 15, fontWeight: 600 }}
        >
          Voltar
        </button>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "16px 20px", borderBottom: "0.5px solid var(--azul-petroleo)", background: "#fff" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Editar recomendação — {tipo}</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          {contexto?.fazendaNome} · {contexto?.talhoes} ({contexto?.hectares.toFixed(1)} ha) · operador: {contexto?.operadorNome}
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          Fazenda, ciclo, talhões e operador não mudam aqui — pra corrigir isso, cancele esta
          recomendação (rejeite a tarefa) e crie uma nova.
        </p>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Produtos</p>
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
                <option value="">Selecione o produto...</option>
                {insumos.map((i) => <option key={i.id} value={i.id}>{i.nome}</option>)}
              </select>

              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number" inputMode="decimal" step="0.0001"
                  placeholder={campoDose.modo === "fixa" ? `Dose (${campoDose.unidadeLabel})` : "Dose por ha"}
                  style={inputStyle} value={produto.dose}
                  onChange={(e) => atualizarProduto(produto.chave, "dose", e.target.value)}
                />
                {campoDose.modo === "selecionavel" ? (
                  <select style={{ ...inputStyle, maxWidth: 90 }} value={produto.unidade} onChange={(e) => atualizarProduto(produto.chave, "unidade", e.target.value)}>
                    {campoDose.unidades.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                ) : (
                  <span style={{ ...inputStyle, maxWidth: 90, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azul-petroleo)" }}>
                    {campoDose.unidadeLabel}
                  </span>
                )}
              </div>

              {campoDose.modo === "selecionavel" && campoDose.campoLote && (
                <input type="text" placeholder="Lote (opcional)" style={inputStyle} value={produto.extra} onChange={(e) => atualizarProduto(produto.chave, "extra", e.target.value)} />
              )}
              {campoDose.modo === "fixa" && campoDose.campoExtra && (
                <input
                  type="number" inputMode="decimal" placeholder={campoDose.campoExtra.label}
                  style={inputStyle} value={produto.extra} onChange={(e) => atualizarProduto(produto.chave, "extra", e.target.value)}
                />
              )}
            </div>
          ))}
          <button
            type="button" onClick={() => setProdutos((atual) => [...atual, novoProduto(unidadeInicial)])}
            style={{ height: 44, borderRadius: 8, border: "0.5px dashed var(--azul-petroleo)", background: "transparent", color: "var(--azul-petroleo)", fontSize: 13, fontWeight: 600 }}
          >
            + Adicionar produto
          </button>
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Data e máquina</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data indicada</span>
            <input type="date" style={inputStyle} value={dataAplicacaoIndicada} onChange={(e) => setDataAplicacaoIndicada(e.target.value)} />
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
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </main>
  );
}
