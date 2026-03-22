const CACHE_NAME = "empresafree-cache-v2";
const ARQUIVOS = [
  "/",
  "/index.html",
  "/login.html",
  "/menu.html",
  "/app.html",
  "/css/estilo.css",
  "/js/app.js",
  "/js/db.js",
  "/js/sync.js",
  "/js/supabase.js",
  "/js/login.js",
  "/js/menu.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(ARQUIVOS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (event.request.method === 'GET' && !event.request.url.startsWith('chrome-extension')) {
             cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback or ignore network error if it works offline
      });
      return cachedResponse || fetchPromise;
    })
  );
});