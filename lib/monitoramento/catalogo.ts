export type TipoOcorrencia = "praga" | "doenca" | "planta_daninha";

// Mesmo catálogo já usado em produção no Arato principal
// (app/campo/monitoramento/page.tsx) — reaproveitado pra manter os nomes
// consistentes entre os dois apps.
export const CATALOGO: Record<TipoOcorrencia, string[]> = {
  praga: [
    "Lagarta-da-soja", "Lagarta-falsa-medideira", "Helicoverpa armigera",
    "Percevejo-marrom", "Percevejo-verde", "Percevejo-pequeno",
    "Mosca-branca", "Pulgão", "Trips", "Ácaro-rajado", "Ácaro-branco",
    "Lagarta-do-cartucho", "Outra praga",
  ],
  doenca: [
    "Ferrugem-asiática", "Mofo-branco", "Mancha-alvo", "Antracnose", "Oídio",
    "Mancha-parda", "Podridão-radicular", "Mosaico", "Nematoide-de-cisto",
    "Nematoide-de-galha", "Enfezamento (milho)", "Outra doença",
  ],
  planta_daninha: [
    "Buva resistente", "Capim-amargoso resistente", "Corda-de-viola", "Picão-preto",
    "Trapoeraba", "Leiteiro", "Capim-colchão", "Brachiaria", "Caruru", "Outra invasora",
  ],
};

export const NIVEIS = [
  { n: 1, label: "Baixo", icone: "🟢", cor: "#166534", fundo: "#DCFCE7", legenda: "Abaixo do NE" },
  { n: 2, label: "Médio", icone: "🟡", cor: "#92400E", fundo: "#FEF3C7", legenda: "Próximo ao NE" },
  { n: 3, label: "Alto", icone: "🟠", cor: "#9A3412", fundo: "#FFEDD5", legenda: "Acima do NE" },
  { n: 4, label: "Crítico", icone: "🔴", cor: "#DC2626", fundo: "#FEE2E2", legenda: "Ação emergencial" },
] as const;

// Referência de Nível de Ação Econômica (NE) por ocorrência — orientação
// geral (fonte: práticas usuais de MIP em soja/milho no Centro-Oeste), não
// substitui a recomendação do agrônomo responsável pela fazenda.
export const REFERENCIA_NE: Record<string, string> = {
  "Lagarta-da-soja": "NE ≈ 20 lagartas grandes (>1,5cm) por pano-de-batida, ou desfolha de 15% (vegetativo) / 30% (reprodutivo).",
  "Lagarta-falsa-medideira": "NE ≈ 20 lagartas grandes por pano-de-batida — mesmo limiar do complexo de desfolhadoras.",
  "Helicoverpa armigera": "Praga-chave — NE mais rigoroso, ≈ 20 lagartas/pano; ação recomendada assim que confirmada a espécie.",
  "Percevejo-marrom": "NE ≈ 2 percevejos/m em grão comum, 1/m em área de produção de semente ou consumo.",
  "Percevejo-verde": "NE ≈ 2 percevejos/m em grão comum, 1/m em área de semente ou consumo.",
  "Percevejo-pequeno": "Piezodorus guildinii — mais agressivo, NE ≈ 1 percevejo/m.",
  "Mosca-branca": "Sem contagem padronizada — monitorar aumento populacional e risco de transmissão de vírus; ação preventiva se colônias visíveis.",
  "Pulgão": "NE ≈ 5% das plantas com colônias — considerar inimigos naturais antes de decidir.",
  "Lagarta-do-cartucho": "NE ≈ 20% das plantas com dano fresco no cartucho, na fase vegetativa do milho.",
  "Ferrugem-asiática": "Tolerância baixa em regiões de risco — monitorar terço inferior do dossel; ação preventiva costuma anteceder sintoma visível.",
  "Mofo-branco": "Controle é preventivo, não curativo — decisão de fungicida antecede o fechamento das linhas em áreas com histórico.",
  "Nematoide-de-cisto": "Manejo de longo prazo (rotação de cultura, cultivar resistente) — monitoramento apoia decisão de variedade na próxima safra.",
  "Nematoide-de-galha": "Manejo de longo prazo (rotação de cultura, cultivar resistente) — monitoramento apoia decisão de variedade na próxima safra.",
};

export function referenciaNe(nome: string): string {
  return REFERENCIA_NE[nome] ?? "Sem referência de NE cadastrada para esta ocorrência — usar julgamento agronômico local.";
}
