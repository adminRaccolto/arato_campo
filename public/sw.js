// Service Worker — App Campo PWA
// Estratégia (portada de public/sw.js do Arato principal — ver CLAUDE.md 2.9/4.6):
//   /_next/static/*  → Cache First (assets imutáveis por hash de build)
//   navegação HTML   → Network First, fallback cache, fallback /login
//   /api/, supabase  → Network Only (dados sempre frescos)
//   imagens/fontes   → Stale-While-Revalidate

const V = "campo-v1";
const STATIC = "campo-static-v1";
const SHELL = "campo-shell-v1";
const IMAGES = "campo-img-v1";

const OFFLINE_FALLBACK = "/login";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((c) => c.add(OFFLINE_FALLBACK).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const keep = new Set([V, STATIC, SHELL, IMAGES]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.protocol === "chrome-extension:") return;

  // API interna + Supabase → Network Only (dado sempre fresco; a fila
  // offline de escrita é responsabilidade do app, não do service worker)
  if (url.pathname.startsWith("/api/") || url.hostname.includes("supabase.co")) {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(JSON.stringify({ error: "offline", data: null }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          })
      )
    );
    return;
  }

  // Next.js static assets → Cache First (imutáveis por hash)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC).then((cache) =>
        cache.match(request).then((hit) => {
          if (hit) return hit;
          return fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  // Next.js image optimization → Stale-While-Revalidate
  if (url.pathname.startsWith("/_next/image")) {
    event.respondWith(
      caches.open(IMAGES).then((cache) =>
        cache.match(request).then((hit) => {
          const net = fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          });
          return hit ?? net;
        })
      )
    );
    return;
  }

  // Assets estáticos (ícones, fontes) → Stale-While-Revalidate
  if (/\.(png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|otf)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGES).then((cache) =>
        cache.match(request).then((hit) => {
          const net = fetch(request)
            .then((res) => {
              if (res.ok) cache.put(request, res.clone());
              return res;
            })
            .catch(() => hit);
          return hit ?? net;
        })
      )
    );
    return;
  }

  // Navegação HTML → Network First, salva no cache, fallback /login offline
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(SHELL).then((cache) =>
        fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cache.match(request).then((cached) => cached ?? cache.match(OFFLINE_FALLBACK)))
      )
    );
    return;
  }
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
