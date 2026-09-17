"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "@/app/(campo)/recomendacoes/_shared/styles";
import { MaquinaField } from "@/app/(campo)/recomendacoes/_shared/MaquinaField";

type Tabela = "plantios" | "pulverizacoes" | "adubacoes_base" | "correcoes_solo" | "abastecimentos";
const TABELAS_VALIDAS: Tabela[] = ["plantios", "pulverizacoes", "adubacoes_base", "correcoes_solo", "abastecimentos"];

type ItemDose = { id: string; nome: string; dose: string };

// Edição de um lançamento (aplicação) enquanto ainda `status_campo =
// 'pendente'` — pelo próprio operador que lançou ou por qualquer Gerente
// Campo com acesso à fazenda (CLAUDE.md 7, decisão 17/set/2026). Escopo
// focado: dose por produto (recalcula a quantidade total, mesmo cálculo do
// fechamento — dose × área), data, máquina, observação — não mexe em
// talhão/área/fazenda, que definem o que já foi aprovado/gerado. Abastecimento
// é o único tipo sem itens (campos próprios: litros, bomba, combustível).
export default function EditarAplicacaoPage() {
  const router = useRouter();
  const params = useParams<{ tabela: string; id: string }>();
  const tabela = params.tabela as Tabela;
  const id = params.id;
  const auth = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [bloqueado, setBloqueado] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const [areaHa, setAreaHa] = useState(0);
  const [maquinas, setMaquinas] = useState<{ id: string; nome: string; tipo: string | null }[]>([]);
  const [maquinaId, setMaquinaId] = useState("");
  const [data, setData] = useState("");
  const [observacao, setObservacao] = useState("");

  // plantios/pulverizacoes/adubacoes_base/correcoes_solo
  const [itens, setItens] = useState<ItemDose[]>([]);

  // abastecimentos
  const [bombas, setBombas] = useState<{ id: string; nome: string; insumo_id: string | null; estoque_atual_l: number | null }[]>([]);
  const [combustiveis, setCombustiveis] = useState<{ id: string; nome: string }[]>([]);
  const [bombaId, setBombaId] = useState("");
  const [insumoManualId, setInsumoManualId] = useState("");
  const [quantidadeL, setQuantidadeL] = useState("");
  const [horimetro, setHorimetro] = useState("");
  const [km, setKm] = useState("");

  useEffect(() => {
    if (auth.carregando || !id) return;

    async function carregar() {
      if (!TABELAS_VALIDAS.includes(tabela)) {
        setErro("Tipo de lançamento inválido.");
        setCarregando(false);
        return;
      }

      // `any` deliberado — `tabela` só é conhecida em runtime (vem da URL),
      // mesma razão documentada em lib/recomendacoes/executores.ts.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as unknown as { from: (t: string) => any };

      const { data: linha, error: erroLinha } = await sb.from(tabela).select("*").eq("id", id).maybeSingle();
      if (erroLinha || !linha) {
        setErro("Lançamento não encontrado.");
        setCarregando(false);
        return;
      }
      const l = linha as unknown as Record<string, unknown>;

      if (l.status_campo !== "pendente") {
        setBloqueado(`Este lançamento já foi ${l.status_campo} — não dá mais pra editar.`);
        setCarregando(false);
        return;
      }
      const podeEditar = auth.ehGerenteCampo || l.lancado_por_perfil_id === auth.perfilId;
      if (!podeEditar) {
        setBloqueado("Você só pode editar lançamentos que você mesmo fez.");
        setCarregando(false);
        return;
      }

      setAreaHa((l.area_ha as number) ?? 0);
      setMaquinaId((l.maquina_id as string) ?? "");
      setObservacao((l.observacao as string) ?? "");

      const { data: maquinasData } = await supabase.from("maquinas").select("id, nome, tipo").eq("fazenda_id", l.fazenda_id as string).eq("ativa", true);
      setMaquinas(maquinasData ?? []);

      if (tabela === "plantios") {
        setData((l.data_plantio as string) ?? "");
        setItens([{ id: "unico", nome: (l.variedade as string) ?? "Semente", dose: String(l.dose_kg_ha ?? "") }]);
      } else if (tabela === "pulverizacoes") {
        setData((l.data_inicio as string) ?? "");
        const { data: itensData } = await supabase.from("pulverizacao_itens").select("id, nome_produto, dose_ha").eq("pulverizacao_id", id);
        setItens((itensData ?? []).map((i) => ({ id: i.id, nome: i.nome_produto ?? "Produto", dose: String(i.dose_ha ?? "") })));
      } else if (tabela === "adubacoes_base") {
        setData((l.data_aplicacao as string) ?? "");
        const { data: itensData } = await supabase.from("adubacoes_base_itens").select("id, produto_nome, dose_kg_ha").eq("adubacao_id", id);
        setItens((itensData ?? []).map((i) => ({ id: i.id, nome: i.produto_nome ?? "Produto", dose: String(i.dose_kg_ha ?? "") })));
      } else if (tabela === "correcoes_solo") {
        setData((l.data_aplicacao as string) ?? "");
        const { data: itensData } = await supabase.from("correcoes_solo_itens").select("id, produto_nome, dose_ton_ha").eq("correcao_id", id);
        setItens((itensData ?? []).map((i) => ({ id: i.id, nome: i.produto_nome ?? "Produto", dose: String(i.dose_ton_ha ?? "") })));
      } else {
        setData((l.data as string) ?? "");
        setBombaId((l.bomba_id as string) ?? "");
        setInsumoManualId((l.bomba_id ? "" : (l.insumo_id as string)) ?? "");
        setQuantidadeL(String(l.quantidade_l ?? ""));
        setHorimetro(l.horimetro != null ? String(l.horimetro) : "");
        setKm(l.km != null ? String(l.km) : "");
        const [{ data: bombasData }, { data: combustiveisData }] = await Promise.all([
          supabase.from("bombas_combustivel").select("id, nome, insumo_id, estoque_atual_l").eq("fazenda_id", l.fazenda_id as string).eq("ativa", true),
          supabase.from("insumos").select("id, nome").eq("fazenda_id", l.fazenda_id as string).eq("categoria", "combustivel"),
        ]);
        setBombas(bombasData ?? []);
        setCombustiveis(combustiveisData ?? []);
      }

      setCarregando(false);
    }

    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, tabela, id, auth.carregando]);

  const bombaSelecionada = bombas.find((b) => b.id === bombaId) ?? null;
  const insumoId = bombaSelecionada?.insumo_id ?? insumoManualId;

  function atualizarDoseItem(itemId: string, valor: string) {
    setItens((atual) => atual.map((i) => (i.id === itemId ? { ...i, dose: valor } : i)));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setSalvando(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as unknown as { from: (t: string) => any };
    let erroSalvar: string | null = null;

    if (tabela === "plantios") {
      const dose = Number(itens[0]?.dose ?? 0);
      const { error } = await sb
        .from("plantios")
        .update({ data_plantio: data, dose_kg_ha: dose, quantidade_kg: dose * areaHa, maquina_id: maquinaId || null, observacao: observacao || null } as never)
        .eq("id", id)
        .eq("status_campo", "pendente");
      erroSalvar = error?.message ?? null;
    } else if (tabela === "pulverizacoes") {
      const { error: erroHeader } = await sb
        .from("pulverizacoes")
        .update({ data_inicio: data, maquina_id: maquinaId || null, observacao: observacao || null } as never)
        .eq("id", id)
        .eq("status_campo", "pendente");
      if (erroHeader) { erroSalvar = erroHeader.message; }
      else {
        for (const item of itens) {
          const dose = Number(item.dose);
          const { error } = await sb.from("pulverizacao_itens").update({ dose_ha: dose, total_consumido: dose * areaHa } as never).eq("id", item.id);
          if (error) { erroSalvar = error.message; break; }
        }
      }
    } else if (tabela === "adubacoes_base") {
      const { error: erroHeader } = await sb
        .from("adubacoes_base")
        .update({ data_aplicacao: data, maquina_id: maquinaId || null, observacao: observacao || null } as never)
        .eq("id", id)
        .eq("status_campo", "pendente");
      if (erroHeader) { erroSalvar = erroHeader.message; }
      else {
        for (const item of itens) {
          const dose = Number(item.dose);
          const { error } = await sb.from("adubacoes_base_itens").update({ dose_kg_ha: dose, quantidade_kg: dose * areaHa } as never).eq("id", item.id);
          if (error) { erroSalvar = error.message; break; }
        }
      }
    } else if (tabela === "correcoes_solo") {
      const { error: erroHeader } = await sb
        .from("correcoes_solo")
        .update({ data_aplicacao: data, maquina_id: maquinaId || null, observacao: observacao || null } as never)
        .eq("id", id)
        .eq("status_campo", "pendente");
      if (erroHeader) { erroSalvar = erroHeader.message; }
      else {
        for (const item of itens) {
          const dose = Number(item.dose);
          const { error } = await sb.from("correcoes_solo_itens").update({ dose_ton_ha: dose, quantidade_ton: dose * areaHa } as never).eq("id", item.id);
          if (error) { erroSalvar = error.message; break; }
        }
      }
    } else {
      if (!insumoId) { setErro("Selecione o combustível (ou uma bomba)."); setSalvando(false); return; }
      const { error } = await sb
        .from("abastecimentos")
        .update({
          data, maquina_id: maquinaId || null, observacao: observacao || null,
          bomba_id: bombaId || null, insumo_id: insumoId || null,
          quantidade_l: Number(quantidadeL), horimetro: horimetro ? Number(horimetro) : null, km: km ? Number(km) : null,
        } as never)
        .eq("id", id)
        .eq("status_campo", "pendente");
      erroSalvar = error?.message ?? null;
    }

    setSalvando(false);
    if (erroSalvar) { setErro(erroSalvar); return; }
    setSalvo(true);
  }

  if (auth.carregando || carregando) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>Carregando...</p>
      </main>
    );
  }

  if (bloqueado || erro) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--azul-petroleo)" }}>{bloqueado ?? erro}</p>
      </main>
    );
  }

  if (salvo) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Lançamento atualizado.</p>
        <button
          onClick={() => router.push("/aprovacoes")}
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
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--azul-escuro)" }}>Editar lançamento</p>
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>{areaHa ? `${areaHa} ha` : ""}</p>
      </header>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        {tabela !== "abastecimentos" && (
          <section style={sectionStyle}>
            <p style={sectionTitleStyle}>Dose aplicada</p>
            {itens.map((item) => (
              <label key={item.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={labelStyle}>{item.nome}</span>
                <input
                  type="number" inputMode="decimal" step="0.0001" style={inputStyle}
                  value={item.dose} onChange={(e) => atualizarDoseItem(item.id, e.target.value)}
                />
              </label>
            ))}
          </section>
        )}

        {tabela === "abastecimentos" && (
          <section style={sectionStyle}>
            <p style={sectionTitleStyle}>Combustível</p>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Bomba (opcional)</span>
              <select style={inputStyle} value={bombaId} onChange={(e) => setBombaId(e.target.value)}>
                <option value="">Sem bomba — abasteceu fora</option>
                {bombas.map((b) => <option key={b.id} value={b.id}>{b.nome}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Combustível{bombaSelecionada ? " (definido pela bomba)" : ""}</span>
              <select style={inputStyle} value={insumoId} onChange={(e) => setInsumoManualId(e.target.value)} disabled={Boolean(bombaSelecionada)}>
                <option value="">Selecione...</option>
                {combustiveis.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Quantidade (litros)</span>
              <input type="number" inputMode="decimal" step="0.01" style={inputStyle} value={quantidadeL} onChange={(e) => setQuantidadeL(e.target.value)} />
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <span style={labelStyle}>Horímetro</span>
                <input type="number" inputMode="decimal" style={inputStyle} value={horimetro} onChange={(e) => setHorimetro(e.target.value)} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <span style={labelStyle}>Km</span>
                <input type="number" inputMode="decimal" style={inputStyle} value={km} onChange={(e) => setKm(e.target.value)} />
              </label>
            </div>
          </section>
        )}

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Data e máquina</p>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Data</span>
            <input type="date" style={inputStyle} value={data} onChange={(e) => setData(e.target.value)} />
          </label>
          <MaquinaField maquinas={maquinas} maquinaId={maquinaId} setMaquinaId={setMaquinaId} />
        </section>

        <section style={sectionStyle}>
          <p style={sectionTitleStyle}>Observações</p>
          <textarea style={{ ...inputStyle, height: 80, paddingTop: 10, resize: "vertical" }} value={observacao} onChange={(e) => setObservacao(e.target.value)} />
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
