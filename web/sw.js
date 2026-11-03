/* Offline-Unterstützung: immer zuerst das Netz (damit neue Inhalte sofort da sind), sonst der Zwischenspeicher. */
const CACHE = "deutsch-lernen-v1";
const CORE = ["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "icons/icon-192.png",
  "content/manifest.json", "content/woerter.json", "content/saetze.json", "content/schreiben.json"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(fetch(req).then(res => {
    if (res && res.ok && (new URL(req.url).origin === location.origin || req.url.includes("fonts."))) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
});
