import type { Talhao } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { sectionStyle, sectionTitleStyle } from "./styles";

export function TalhoesSelector({
  talhoes,
  selecionados,
  onAlternar,
  hectaresSugeridos,
}: {
  talhoes: Talhao[];
  selecionados: Set<string>;
  onAlternar: (id: string) => void;
  hectaresSugeridos: number;
}) {
  return (
    <section style={sectionStyle}>
      <p style={sectionTitleStyle}>Talhões</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {talhoes.map((t) => (
          <label
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: 8,
              border: "0.5px solid var(--azul-petroleo)",
              background: selecionados.has(t.id) ? "#EAF0F6" : "#fff",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={selecionados.has(t.id)}
                onChange={() => onAlternar(t.id)}
                style={{ width: 20, height: 20 }}
              />
              <span style={{ fontSize: 14 }}>{t.nome}</span>
            </span>
            <span style={{ fontSize: 12, color: "var(--azul-petroleo)" }}>{t.area_ha} ha</span>
          </label>
        ))}
        {talhoes.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--azul-petroleo)" }}>
            Nenhum talhão cadastrado para esta fazenda.
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderRadius: 8,
          background: "#EAF7EF",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--verde)" }}>
          Hectares sugeridos (automático)
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--verde)" }}>
          {hectaresSugeridos.toFixed(2)} ha
        </span>
      </div>
    </section>
  );
}
