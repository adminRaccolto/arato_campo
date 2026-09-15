"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type TalhaoMapa = { id: string; nome: string; kml_url: string | null };

// Mapa de visão geral da fazenda — todos os talhões de uma vez, cada um com
// o próprio contorno KML. Diferente de TalhaoMapaKml (monitoramento), que
// mostra um talhão só + ponto de GPS.
export function FazendaMapaKml({ talhoes }: { talhoes: TalhaoMapa[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelado = false;

    import("leaflet").then(async (L) => {
      if (cancelado || !containerRef.current) return;

      const map = L.map(containerRef.current, { center: [-13.83, -56.08], zoom: 13, zoomControl: true });
      mapRef.current = map;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "© ESRI", maxZoom: 19 }
      ).addTo(map);

      const { kml } = await import("@tmcw/togeojson");
      const grupo = L.featureGroup();

      await Promise.all(
        talhoes
          .filter((t) => t.kml_url)
          .map(async (t) => {
            try {
              const res = await fetch(t.kml_url!);
              const texto = await res.text();
              const doc = new DOMParser().parseFromString(texto, "text/xml");
              const geojson = kml(doc);
              const camada = L.geoJSON(geojson, {
                style: () => ({ color: "#1A4870", fillColor: "#1A4870", fillOpacity: 0.15, weight: 2 }),
              });
              camada.bindTooltip(t.nome, { sticky: true });
              camada.addTo(grupo);
            } catch {
              // talhão sem KML válido — só não entra no mapa, resto segue
            }
          })
      );

      if (cancelado) return;
      grupo.addTo(map);

      try {
        const b = grupo.getBounds();
        if (b.isValid()) map.fitBounds(b, { padding: [24, 24] });
      } catch {
        // nenhum talhão com contorno válido — mantém view padrão
      }
    });

    return () => {
      cancelado = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talhoes.map((t) => t.id + (t.kml_url ?? "")).join(",")]);

  const semKml = talhoes.length > 0 && talhoes.every((t) => !t.kml_url);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div ref={containerRef} style={{ width: "100%", height: 260, borderRadius: 12, overflow: "hidden", background: "#EEF3F8" }} />
      {semKml && (
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          Nenhum talhão desta fazenda tem contorno KML cadastrado.
        </p>
      )}
    </div>
  );
}
