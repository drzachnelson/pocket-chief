import { listCategories } from "@/lib/categories";

// The service worker precaches one page per category and reads the slugs from here, so a taxonomy change never leaves a stale list in `public/sw.js`.
export const dynamic = "force-static";

export function GET() {
  return Response.json(listCategories().map(({ node }) => node.slug));
}
