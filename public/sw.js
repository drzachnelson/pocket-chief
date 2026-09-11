// v5 discards every earlier cache. The worker derives its own mount point from its script URL, so
// the same file works at the site root and under a GitHub Pages project path with no build step.
const BASE = new URL("./", self.location).pathname;
const SHELL = "pocket-chief-shell-v5";
const CONTENT = "pocket-chief-content-v5";
const SHELL_ASSETS = [BASE, `${BASE}topics/`, `${BASE}playbooks/`, `${BASE}saved/`, `${BASE}icon.svg`, `${BASE}manifest.webmanifest`, `${BASE}library.json`, `${BASE}playbooks.json`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((cache) => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-") && ![SHELL, CONTENT].includes(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    // Clone before returning, not inside the caches.open callback: that resolves a microtask later,
    // by which point `return response` has handed the body to the page and cloning throws
    // "Response body is already used". waitUntil keeps the worker alive until the write lands.
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CONTENT).then((cache) => cache.put(event.request, copy))); }
    return response;
  }).catch(async () => {
    // Ask CONTENT before SHELL. An unscoped caches.match() picks whichever cache answers first,
    // which after a redeploy can be the precached SHELL copy of an asset CONTENT has fresher.
    const content = await caches.open(CONTENT).then((cache) => cache.match(event.request));
    if (content) return content;
    const shell = await caches.open(SHELL).then((cache) => cache.match(event.request));
    return shell || await caches.match(BASE);
  }));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_PRIVATE_DATA") {
    event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-")).map((key) => caches.delete(key)))));
  }
});
