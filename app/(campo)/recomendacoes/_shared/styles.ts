import type { CSSProperties } from "react";

export const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--azul-escuro)",
};

export const inputStyle: CSSProperties = {
  height: 44,
  padding: "0 12px",
  fontSize: 15,
  border: "0.5px solid var(--azul-petroleo)",
  borderRadius: 8,
  background: "#fff",
  color: "var(--azul-escuro)",
  width: "100%",
};

export const sectionStyle: CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  border: "0.5px solid var(--azul-petroleo)",
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

export const sectionTitleStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--azul-escuro)",
};
