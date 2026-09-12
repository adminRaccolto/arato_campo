"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export function TalhaoMapaKml({
  kmlUrl,
  talhaoNome,
  lat,
  lng,
  accuracyM,
}: {
  kmlUrl: string | null;
  talhaoNome: string;
  lat: number | null;
  lng: number | null;
  accuracyM: number | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layersRef = useRef<import("leaflet").Layer[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [-13.83, -56.08],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "© ESRI", maxZoom: 19 }
      ).addTo(map);

      mapRef.current = map;
      render(L, map);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => render(L, mapRef.current!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kmlUrl, lat, lng, accuracyM]);

  function render(L: typeof import("leaflet"), map: import("leaflet").Map) {
    layersRef.current.forEach((l) => map.removeLayer(l));
    layersRef.current = [];

    const boundsPontos: [number, number][] = [];
    let boundaryLayer: import("leaflet").Layer | null = null;

    function plotarPonto() {
      if (lat == null || lng == null) return;
      boundsPontos.push([lat, lng]);

      if (accuracyM) {
        const circulo = L.circle([lat, lng], {
          radius: accuracyM,
          color: "#C9921B",
          weight: 1,
          fillColor: "#C9921B",
          fillOpacity: 0.12,
        }).addTo(map);
        layersRef.current.push(circulo);
      }

      const marcador = L.circleMarker([lat, lng], {
        radius: 9,
        fillColor: "#E24B4A",
        color: "#fff",
        weight: 2,
        fillOpacity: 0.95,
      }).addTo(map);
      marcador.bindTooltip("Ponto do monitoramento", { permanent: false });
      layersRef.current.push(marcador);

      if (!boundaryLayer) map.setView([lat, lng], 17);
    }

    if (kmlUrl) {
      fetch(kmlUrl)
        .then((r) => r.text())
        .then((kmlText) => {
          import("@tmcw/togeojson").then(({ kml }) => {
            const doc = new DOMParser().parseFromString(kmlText, "text/xml");
            const geojson = kml(doc);

            boundaryLayer = L.geoJSON(geojson, {
              style: () => ({ color: "#1A4870", fillColor: "#1A4870", fillOpacity: 0.15, weight: 2 }),
            }).addTo(map);
            layersRef.current.push(boundaryLayer);

            try {
              const b = (boundaryLayer as import("leaflet").GeoJSON).getBounds();
              if (b.isValid()) map.fitBounds(b, { padding: [30, 30] });
            } catch {
              /* sem bounds válidos, mantém view padrão */
            }

            plotarPonto();
          });
        })
        .catch(() => {
          plotarPonto();
        });
    } else {
      plotarPonto();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 220, borderRadius: 10, overflow: "hidden", background: "#EEF3F8" }}
      />
      {!kmlUrl && (
        <p style={{ fontSize: 11, color: "var(--azul-petroleo)" }}>
          {talhaoNome} não tem contorno KML cadastrado — mostrando só o ponto do GPS.
        </p>
      )}
    </div>
  );
}
