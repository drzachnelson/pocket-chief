// v2 discards everything v1 held. The shell precache follows redirects, so any install that ran
// while the deployment was unconfigured or signed out stored the "locked" or sign-in page under
// "/", "/topics" and "/saved" — which is what an offline launch would then serve. The activate
// handler already deletes any pocket-chief-* cache outside this pair, so renaming is the purge.
const SHELL = "pocket-chief-shell-v2";
const CONTENT = "pocket-chief-content-v2";
const SHELL_ASSETS = ["/", "/topics", "/saved", "/icon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((cache) => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-") && ![SHELL, CONTENT].includes(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/") && !["/api/search", "/api/library"].includes(url.pathname)) return;
  event.respondWith(fetch(event.request).then((response) => {
    // Clone before returning, not inside the caches.open callback: that resolves a microtask later,
    // by which point `return response` has handed the body to the page and cloning throws
    // "Response body is already used". That fired on every cacheable GET, so nothing was ever
    // cached. waitUntil keeps the worker alive until the write lands.
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CONTENT).then((cache) => cache.put(event.request, copy))); }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/"))));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_PRIVATE_DATA") {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("pocket-chief-"))
            .map((key) => caches.delete(key)),
        ),
      ),
    );
  }
});
