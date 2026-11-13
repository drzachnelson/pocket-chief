import type { MetadataRoute } from "next";

// Next rewrites hrefs in JSX but not values inside a manifest, so every path here is prefixed by
// hand. `start_url` is what the installed icon opens; getting it wrong installs a 404.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Metadata routes are dynamic by default; under `output: "export"` Next refuses to collect page
// data for one without an explicit static declaration, matching library.json/route.ts.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pocket Chief",
    short_name: "Pocket Chief",
    description: "General surgery reference",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    // A manifest cannot switch by theme, so both take the light canvas. No `orientation`: tables and flows scroll sideways, so landscape is how a phone reads them.
    background_color: "#f4f6fa",
    theme_color: "#f4f6fa",
    categories: ["medical", "education", "productivity"],
    // The full drawing, opaque and full-bleed. Its mark sits inside the 410px centre circle, so the maskable file is the same picture.
    icons: [
      { src: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${basePath}/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
