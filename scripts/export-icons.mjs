// Regenerates the raster icons in public/ from the two brand drawings. Nothing in the build runs this:
// run `node scripts/export-icons.mjs` after redrawing, then commit the PNGs. The repo has no rasteriser,
// so Playwright's Chromium (already a dev dependency) renders each SVG at its exact pixel size.
// scripts/brand/icon-full.svg is the full drawing (60px and up); public/icon.svg is the simple one (34px and below).
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const full = await readFile("scripts/brand/icon-full.svg", "utf8");
const simple = await readFile("public/icon.svg", "utf8");
// The full drawing keeps its content inside the 410px centre circle, so the maskable icon is the same picture.
const icons = [["apple-touch-icon.png", full, 180], ["icon-192.png", full, 192], ["icon-512.png", full, 512], ["icon-maskable-512.png", full, 512], ["icon-32.png", simple, 32]];

const browser = await chromium.launch();
try {
  for (const [name, svg, size] of icons) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<body style="margin:0;background:#160146"><img alt="" width="${size}" height="${size}" style="display:block" src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}">`);
    const png = await page.screenshot({ type: "png" });
    await page.close();
    // The IHDR chunk holds width and height as big-endian words at byte 16 and 20.
    if (png.readUInt32BE(16) !== size || png.readUInt32BE(20) !== size) throw new Error(`${name} came out ${png.readUInt32BE(16)}x${png.readUInt32BE(20)}, not ${size}x${size}`);
    await writeFile(`public/${name}`, png);
    console.log(`${name} ${size}x${size} ${png.length} bytes`);
  }
} finally { await browser.close(); }
