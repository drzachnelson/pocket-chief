// v7 discards every earlier cache. The worker derives its own mount point from its script URL, so
// the same file works at the site root and under a GitHub Pages project path with no build step.
const BASE = new URL("./", self.location).pathname;
const SHELL = "pocket-chief-shell-v7";
const CONTENT = "pocket-chief-content-v7";
const SHELL_ASSETS = [BASE, `${BASE}topics/`, `${BASE}playbooks/`, `${BASE}saved/`, `${BASE}search/`, `${BASE}icon.svg`, `${BASE}manifest.webmanifest`, `${BASE}library.json`, `${BASE}playbooks.json`, `${BASE}search-index.json`];

self.addEventListener("install", (event) => {
  // One page per category, listed by the build in categories.json so a taxonomy change cannot leave a stale slug here: addAll fails the whole install on a 404.
  event.waitUntil(caches.open(SHELL).then(async (cache) => {
    const categories = await fetch(`${BASE}categories.json`).then((response) => response.json());
    await cache.addAll([...SHELL_ASSETS, ...categories.map((slug) => `${BASE}topics/category/${slug}/`)]);
    // The results page is a client component, so its HTML alone cannot list results offline until it has been opened once online. Its own scripts and styles are read from the HTML just stored and precached too.
    const page = await cache.match(`${BASE}search/`).then((response) => response.text());
    await cache.addAll([...new Set(Array.from(page.matchAll(/(?:src|href)="([^"]*\/_next\/static\/[^"?]*\.(?:js|css|woff2)(?:\?[^"]*)?)"/g), (match) => match[1]))]);
  }).then(() => self.skipWaiting()));
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
    // A search offline asks for /search/?q=..., which only /search/ is precached under: the page is the same HTML for every query (the client reads ?q=), so a document request matches without its query string.
    const navigating = event.request.mode === "navigate";
    const shell = await caches.open(SHELL).then((cache) => cache.match(event.request, { ignoreSearch: navigating }));
    // Only a page request may fall back to Home. Answering a script or a router payload with Home's HTML breaks the script, and the router follows the response's URL: an offline search would land on Home instead of falling back to a browser navigation to the results page.
    return shell || (navigating ? await caches.match(BASE) : Response.error());
  }));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_PRIVATE_DATA") {
    event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("pocket-chief-")).map((key) => caches.delete(key)))));
  }
});
