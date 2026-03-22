const CACHE_NAME = "sistema-cache-v1";
const ARQUIVOS = [
  "/",
  "/index.html",
  "/login.html",
  "/app.html",
  "/css/estilo.css",
  "/js/app.js",
  "/js/db.js",
  "/js/sync.js",
  "/js/supabase.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});