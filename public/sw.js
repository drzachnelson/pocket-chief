const SHELL = "pocket-chief-shell-v1";
const CONTENT = "pocket-chief-content-v1";
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
  if (url.pathname.startsWith("/api/") && url.pathname !== "/api/search") return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) caches.open(CONTENT).then((cache) => cache.put(event.request, response.clone()));
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
