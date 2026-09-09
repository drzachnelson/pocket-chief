// Serves the built `out/` directory the way GitHub Pages does: under the base path, resolving a
// directory to its index.html. This previews the real artifact; it is not a production server.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pocket-chief";
const port = Number(process.env.PORT ?? 3000);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".txt": "text/plain", ".ico": "image/x-icon", ".woff2": "font/woff2" };

async function resolve(pathname) {
  // normalize() collapses any ".." before it can escape out/.
  const candidate = join("out", normalize(pathname).replace(/^(\.\.[/\\])+/, ""));
  const direct = await stat(candidate).catch(() => null);
  if (direct?.isFile()) return candidate;
  if (direct?.isDirectory()) return join(candidate, "index.html");
  return `${candidate}.html`;
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname).replace(new RegExp(`^${basePath}`), "") || "/";
  const file = await resolve(pathname);
  response.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
  createReadStream(file)
    .on("error", () => { response.statusCode = 404; response.setHeader("Content-Type", types[".html"]); createReadStream(join("out", "404.html")).on("error", () => response.end("Not found")).pipe(response); })
    .pipe(response);
}).listen(port, () => console.log(`http://127.0.0.1:${port}${basePath}/`));
