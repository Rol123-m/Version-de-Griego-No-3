/* Service Worker – Curso de Griego Koiné
 * Independiente de la ruta de despliegue: todo se resuelve respecto a registration.scope.
 * El identificador de versión (BUILD) lo fija vite.config.ts en cada build para invalidar la app (no el contenido descargado).
 */
const BUILD = '20261015132011';
const APP_CACHE = `app-${BUILD}`;        // index, JS/CSS con hash, iconos
const CONTENT_CACHE = 'content-v1';       // lecciones y juegos (/semanas/…), persiste entre versiones
const CDN_CACHE = 'cdn-v1';               // Font Awesome, Google Fonts
const SCOPE = self.registration.scope;    // p. ej. https://usuario.github.io/Version-de-Griego-No-3/
const u = (p) => new URL(p, SCOPE).toString();
const SHELL = ['./', 'manifest.webmanifest', 'offline.html', 'logo.jpeg', 'icons/icon-192.png', 'icons/icon-512.png'].map(u);
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_CACHE).then((c) => c.addAll(SHELL)));
  // No hacemos skipWaiting() solos: la app avisa "Nueva versión disponible" y el usuario decide.
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [APP_CACHE, CONTENT_CACHE, CDN_CACHE];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  const d = event.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'CACHE_URLS') event.waitUntil(cacheMany(d.urls || [], event.source));
  if (d.type === 'CLEAR_CONTENT') event.waitUntil(caches.delete(CONTENT_CACHE).then(() => reply(event.source, { type: 'CONTENT_CLEARED' })));
  if (d.type === 'GET_STATUS') event.waitUntil(status(event.source));
});

function reply(client, msg) { if (client) client.postMessage(msg); }

async function cacheMany(urls, client) {
  const cache = await caches.open(CONTENT_CACHE);
  let done = 0, failed = 0;
  const total = urls.length;
  const queue = urls.slice();
  const worker = async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (res.ok) await cache.put(url, res); else failed++;
      } catch { failed++; }
      done++;
      if (done % 5 === 0 || done === total) reply(client, { type: 'CACHE_PROGRESS', done, total, failed });
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  reply(client, { type: 'CACHE_DONE', done, total, failed });
}

async function status(client) {
  const cache = await caches.open(CONTENT_CACHE);
  const keys = await cache.keys();
  reply(client, { type: 'STATUS', cachedContent: keys.length, build: BUILD });
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  return cached || (await network) || null;
}

async function networkFirstNavigation(event) {
  const cache = await caches.open(APP_CACHE);
  try {
    const pre = await event.preloadResponse;
    const res = pre || await fetch(event.request);
    if (res.ok) cache.put(u('./'), res.clone());
    return res;
  } catch {
    return (await cache.match(u('./'))) || (await cache.match(u('offline.html'))) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, CDN_CACHE).then((r) => r || Response.error()));
    return;
  }
  if (url.origin !== self.location.origin) return; // Firebase, Drive, Forms, YouTube… van directo a la red

  const path = decodeURIComponent(url.pathname);
  const rel = path.startsWith(new URL(SCOPE).pathname) ? path.slice(new URL(SCOPE).pathname.length) : path;

  // Lecciones y juegos (HTML/CSS/JS/imágenes de /semanas)
  if (rel.startsWith('semanas/') || rel === 'estilos-contenido.css') {
    event.respondWith((async () => {
      const r = await staleWhileRevalidate(request, CONTENT_CACHE);
      if (r) return r;
      if (request.destination === 'document' || request.destination === 'iframe') {
        return (await caches.match(u('offline.html'))) || Response.error();
      }
      return Response.error();
    })());
    return;
  }

  // Aplicación: navegación → red primero, caché si no hay conexión
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(event));
    return;
  }

  // Archivos con hash (assets/*), iconos, manifest: caché primero
  event.respondWith((async () => {
    const cache = await caches.open(APP_CACHE);
    const hit = await cache.match(request);
    if (hit) return hit;
    try {
      const res = await fetch(request);
      if (res.ok) cache.put(request, res.clone());
      return res;
    } catch { return Response.error(); }
  })());
});
