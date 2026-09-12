import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campo",
    short_name: "Campo",
    description: "Lançamento de operações de campo — plantio, pulverização, colheita, adubação",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F4F6FA",
    theme_color: "#1A4870",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
