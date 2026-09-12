import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister } from "./service-worker-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campo",
  description: "Lançamento de operações de campo — plantio, pulverização, colheita, adubação",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Campo",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#1A4870",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
