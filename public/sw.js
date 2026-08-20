// v3 discards v2's former Topics shell and guide markup. The shell precache follows redirects, so
// an install while the deployment was unconfigured or signed out can store a locked/sign-in page
// under "/", "/topics", and "/saved". The activate handler deletes every other pocket-chief-*
// cache, so changing this pair is the explicit stale-shell purge.
const SHELL = "pocket-chief-shell-v3";
const CONTENT = "pocket-chief-content-v3";
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
