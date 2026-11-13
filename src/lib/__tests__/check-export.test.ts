import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error a plain .mjs script, run by the deploy workflow with no build step
import { missingFromExport, precachedPaths } from "../../../scripts/check-export.mjs";

const ROOT = join(import.meta.dirname, "..", "..", "..");
const sw = readFileSync(join(ROOT, "public", "sw.js"), "utf8");
const dirs: string[] = [];
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });

// A complete export in miniature: sw.js itself, the two lists that drive the checks, one category and one topic, and a file for every URL the worker precaches.
function exportDir() {
  const dir = mkdtempSync(join(tmpdir(), "export-"));
  dirs.push(dir);
  const put = (path: string, body = "x") => { mkdirSync(dirname(join(dir, path)), { recursive: true }); writeFileSync(join(dir, path), body); };
  for (const path of [...precachedPaths(sw), "index.html", "search/", "search-index.json", "topics/category/trauma/", "topics/fasciotomy/"]) put(path.endsWith("/") ? `${path}index.html` : path);
  put("sw.js", sw); // after the loop: the precached list names categories.json and library.json too, and these two must stay valid JSON
  put("categories.json", '["trauma"]');
  put("library.json", '{"topics":[{"slug":"fasciotomy"}]}');
  return dir;
}

describe("the deploy gate on the export", () => {
  it("reads the precache list out of sw.js, including the new shell routes and the icon set", () => {
    expect(precachedPaths(sw)).toEqual(expect.arrayContaining(["topics/", "playbooks/", "saved/", "settings/", "search/", "search-index.json", "icon.svg", "icon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "manifest.webmanifest"]));
  });

  it("passes a complete export", () => {
    expect(missingFromExport(exportDir())).toEqual([]);
  });

  it.each([
    ["a category page", "topics/category/trauma/index.html"],
    ["the search page", "search/index.html"],
    ["the search index", "search-index.json"],
    ["a topic page", "topics/fasciotomy/index.html"],
    ["the Saved page the worker precaches", "saved/index.html"],
    ["an icon the worker precaches", "icon-512.png"],
  ])("names %s when it is missing", (_name, path) => {
    const dir = exportDir();
    rmSync(join(dir, path));
    expect(missingFromExport(dir)).toEqual([path]);
  });

  it("fails an export whose category list is empty, since no category page would then be checked", () => {
    const dir = exportDir();
    writeFileSync(join(dir, "categories.json"), "[]");
    expect(missingFromExport(dir)).toEqual(["categories.json lists no category"]);
  });

  it("exits non-zero from the command line and lists what is missing", () => {
    const dir = exportDir();
    rmSync(join(dir, "search", "index.html"));
    const run = spawnSync(process.execPath, [join(ROOT, "scripts", "check-export.mjs"), dir], { encoding: "utf8" });
    expect(run.status).toBe(1);
    expect(run.stderr).toContain("search/index.html");
  });

  it("is a step of the deploy workflow, after the build and before the upload", () => {
    const workflow = readFileSync(join(ROOT, ".github", "workflows", "deploy.yml"), "utf8");
    expect(workflow).toMatch(/run: pnpm build[\s\S]*run: node scripts\/check-export\.mjs out[\s\S]*actions\/upload-pages-artifact/);
  });

  // Like content-privacy.test.ts: skipped without a build, and the workflow runs the same script on the real thing.
  it.skipIf(!existsSync(join(ROOT, "out", "sw.js")))("finds nothing missing from the real export", () => {
    expect(missingFromExport(join(ROOT, "out"))).toEqual([]);
  });
});
