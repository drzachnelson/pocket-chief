import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// public/sw.js is a plain script with no build step, so this runs the file itself against a fake `self`, `caches` and `fetch`.
const source = readFileSync(join(import.meta.dirname, "..", "..", "..", "public", "sw.js"), "utf8");
const BASE = "/pocket-chief/";
const ORIGIN = "http://localhost";
const SEARCH_PAGE = `<script src="${BASE}_next/static/chunks/webpack-1.js" async=""></script><script src="${BASE}_next/static/chunks/app/search/page-2.js?v=99" async=""></script><link rel="stylesheet" href="${BASE}_next/static/css/3.css" data-precedence="next"/>`;
const served: Record<string, string> = {
  [BASE]: "<h1>Home</h1>", [`${BASE}topics/`]: "topics", [`${BASE}playbooks/`]: "playbooks", [`${BASE}saved/`]: "saved", [`${BASE}search/`]: SEARCH_PAGE,
  [`${BASE}icon.svg`]: "icon", [`${BASE}icon-32.png`]: "p", [`${BASE}apple-touch-icon.png`]: "p", [`${BASE}icon-192.png`]: "p", [`${BASE}icon-512.png`]: "p", [`${BASE}icon-maskable-512.png`]: "p", [`${BASE}manifest.webmanifest`]: "{}", [`${BASE}library.json`]: "{}", [`${BASE}playbooks.json`]: "{}", [`${BASE}search-index.json`]: "{}",
  [`${BASE}categories.json`]: '["trauma"]', [`${BASE}topics/category/trauma/`]: "trauma",
  [`${BASE}_next/static/chunks/webpack-1.js`]: "1", [`${BASE}_next/static/chunks/app/search/page-2.js`]: "2", [`${BASE}_next/static/css/3.css`]: "3",
};

function boot() {
  const listeners: Record<string, (event: unknown) => void> = {};
  const stores = new Map<string, Map<string, Response>>();
  let offline = false;
  const path = (input: string | { url: string }, ignoreSearch = false) => { const url = new URL(typeof input === "string" ? input : input.url, ORIGIN); return ignoreSearch ? url.pathname : url.pathname + url.search; };
  const fakeFetch = async (input: string | { url: string }) => {
    if (offline) throw new TypeError("Failed to fetch");
    const body = served[path(input, true)];
    return body === undefined ? new Response("", { status: 404 }) : new Response(body, { status: 200 });
  };
  const find = (store: Map<string, Response>, request: string | { url: string }, { ignoreSearch = false } = {}) => {
    const hit = [...store].find(([key]) => path(key, ignoreSearch) === path(request, ignoreSearch));
    return hit?.[1].clone();
  };
  const caches = {
    open: async (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name)!;
      return {
        addAll: async (urls: string[]) => { for (const url of urls) { const response = await fakeFetch(url); if (!response.ok) throw new Error(`${url} ${response.status}`); store.set(url, response); } },
        match: async (request: string | { url: string }, options?: { ignoreSearch?: boolean }) => find(store, request, options),
        put: async (request: { url: string }, response: Response) => { store.set(request.url, response); },
      };
    },
    match: async (request: string | { url: string }) => { for (const store of stores.values()) { const hit = find(store, request); if (hit) return hit; } return undefined; },
    keys: async () => [...stores.keys()],
    delete: async (key: string) => stores.delete(key),
  };
  const self = { location: new URL(`${BASE}sw.js`, ORIGIN), addEventListener: (type: string, listener: (event: unknown) => void) => { listeners[type] = listener; }, skipWaiting: async () => undefined, clients: { claim: async () => undefined } };
  new Function("self", "caches", "fetch", source)(self, caches, fakeFetch);
  return {
    stores,
    install: async () => { let work: Promise<unknown> = Promise.resolve(); listeners.install({ waitUntil: (promise: Promise<unknown>) => { work = promise; } }); await work; },
    goOffline: () => { offline = true; },
    request: async (url: string, mode: "navigate" | "cors") => { let answer: Promise<Response> | undefined; listeners.fetch({ request: { method: "GET", url: `${ORIGIN}${url}`, mode }, respondWith: (promise: Promise<Response>) => { answer = promise; }, waitUntil: () => undefined }); return answer!; },
  };
}

describe("service worker", () => {
  it("names its caches v8, past the version that held the old icon", () => {
    expect(source).toContain('"pocket-chief-shell-v8"');
    expect(source).toContain('"pocket-chief-content-v8"');
  });

  it("precaches /search/, the search index, and the search page's own scripts and styles", async () => {
    const worker = boot();
    await worker.install();
    const keys = [...worker.stores.get("pocket-chief-shell-v8")!.keys()].map((key) => new URL(key, ORIGIN).pathname);
    expect(keys).toEqual(expect.arrayContaining([`${BASE}search/`, `${BASE}search-index.json`, `${BASE}topics/category/trauma/`, `${BASE}_next/static/chunks/app/search/page-2.js`, `${BASE}_next/static/css/3.css`]));
  });

  it("precaches the icon set", async () => {
    const worker = boot();
    await worker.install();
    const keys = [...worker.stores.get("pocket-chief-shell-v8")!.keys()].map((key) => new URL(key, ORIGIN).pathname);
    expect(keys).toEqual(expect.arrayContaining(["icon.svg", "icon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"].map((name) => `${BASE}${name}`)));
  });

  it("answers an offline document request for /search/?q=… with the precached /search/", async () => {
    const worker = boot();
    await worker.install();
    worker.goOffline();
    const response = await worker.request(`${BASE}search/?q=inguinal%20hernia`, "navigate");
    expect(await response.text()).toBe(SEARCH_PAGE);
  });

  it("does not answer an offline script or router payload with Home's HTML, so the router falls back to a browser navigation", async () => {
    const worker = boot();
    await worker.install();
    worker.goOffline();
    for (const url of [`${BASE}search/index.txt?q=inguinal%20hernia&_rsc=abc`, `${BASE}_next/static/chunks/missing.js`]) {
      const response = await worker.request(url, "cors");
      expect(response.type, url).toBe("error");
    }
  });

  it("still falls back to Home for a page it has never seen", async () => {
    const worker = boot();
    await worker.install();
    worker.goOffline();
    expect(await (await worker.request(`${BASE}somewhere/`, "navigate")).text()).toBe("<h1>Home</h1>");
  });
});
