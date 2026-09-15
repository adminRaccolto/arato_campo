import type { AnoSafra, Ciclo, Fazenda } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "./styles";

export function LocalESafraFields({
  fazendas,
  fazendaId,
  setFazendaId,
  anosSafra,
  anoSafraId,
  setAnoSafraId,
  ciclos,
  cicloId,
  setCicloId,
}: {
  fazendas: Fazenda[];
  fazendaId: string;
  setFazendaId: (id: string) => void;
  anosSafra: AnoSafra[];
  anoSafraId: string;
  setAnoSafraId: (id: string) => void;
  ciclos: Ciclo[];
  cicloId: string;
  setCicloId: (id: string) => void;
}) {
  return (
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
  );
}
