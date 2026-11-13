// Fails a deploy when the export lacks a page the app links to or the service worker precaches. Pages has no server to resolve a slug, and the worker's install (cache.addAll) fails whole on one 404, which would leave the app with no offline reading at all.
// Usage: node scripts/check-export.mjs [dir=out]
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// The fixed URLs sw.js precaches, as export-relative paths (Home is listed there as BASE alone, so it is checked below). The category pages are built from categories.json at install, so they are not literals there.
export const precachedPaths = (swSource) => [...swSource.matchAll(/`\$\{BASE\}([^`$]*)`/g)].map((match) => match[1]);

// A directory URL is a page: `search/` means out/search/index.html.
const file = (path) => (path.endsWith("/") ? `${path}index.html` : path);

/** Returns what the build should have produced and did not: export-relative paths, or a sentence when a list that drives the checks is empty. */
export function missingFromExport(dir) {
  const has = (path) => existsSync(join(dir, path)) && statSync(join(dir, path)).size > 0;
  const json = (name) => JSON.parse(readFileSync(join(dir, name), "utf8"));
  const categories = json("categories.json"), { topics } = json("library.json");
  const wanted = [...precachedPaths(readFileSync(join(dir, "sw.js"), "utf8")).map(file), "index.html", "search/index.html", "search-index.json"];
  for (const slug of categories) wanted.push(`topics/category/${slug}/index.html`);
  for (const { slug } of topics) wanted.push(`topics/${slug}/index.html`);
  const empty = [categories.length ? "" : "categories.json lists no category", topics.length ? "" : "library.json lists no topic"].filter(Boolean);
  return [...empty, ...[...new Set(wanted)].filter((path) => !has(path))];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = process.argv[2] ?? "out";
  const missing = missingFromExport(dir);
  if (missing.length) { console.error(`not exported from ${dir}/:\n  ${missing.join("\n  ")}`); process.exit(1); }
  console.log(`${dir}/ holds every precached URL, the search page, every category page and every topic page`);
}
