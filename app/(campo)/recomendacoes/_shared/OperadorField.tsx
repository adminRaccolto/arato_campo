import type { Perfil } from "@/lib/recomendacoes/use-catalogo-fazenda";
import { inputStyle, labelStyle, sectionStyle, sectionTitleStyle } from "./styles";

export function OperadorField({
  perfis,
  operadorPerfilId,
  setOperadorPerfilId,
}: {
  perfis: Perfil[];
  operadorPerfilId: string;
  setOperadorPerfilId: (id: string) => void;
}) {
  return (
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
        A recomendação vira uma tarefa exclusiva desse operador. Transferência exige PIN do Gerente
        Campo.
      </p>
    </section>
  );
}
