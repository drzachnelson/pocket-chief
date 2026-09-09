import type { MetadataRoute } from "next";

// Next rewrites hrefs in JSX but not values inside a manifest, so every path here is prefixed by
// hand. `start_url` is what the installed icon opens; getting it wrong installs a 404.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Metadata routes are dynamic by default; under `output: "export"` Next refuses to collect page
// data for one without an explicit static declaration, matching library.json/route.ts.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pocket Chief · General Surgery Atlas",
    short_name: "Pocket Chief",
    description: "Private general surgery notes for rapid reference.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#1748d2",
    orientation: "portrait",
    categories: ["medical", "education", "productivity"],
    icons: [
      { src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: `${basePath}/icon-maskable.svg`, sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
