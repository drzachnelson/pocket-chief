import type { NextConfig } from "next";

// GitHub Pages serves a project repository under /<repo>, and the app is mounted there in
// development too: a basePath that only exists in CI produces a class of broken-asset bug you
// cannot see until the deploy is live.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pocket-chief";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  // Static hosting has no image optimizer.
  images: { unoptimized: true },
  // `headers()` is inert under `output: "export"` and GitHub Pages cannot set response headers.
  // The crawler signals now ship in the document: `robots` metadata in the root layout, plus
  // public/robots.txt.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
