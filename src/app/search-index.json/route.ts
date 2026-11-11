import { listPlaybooks, listTopics } from "@/lib/library";
import { buildSearchIndex } from "@/lib/search";

// `force-static` is what turns this into a build artifact: `next build` renders it once and
// writes `out/search-index.json`. Nothing here may read the request.
//
// A third asset, for the reason playbooks.json is a second one: library.json is loaded on every
// route by OfflineHydrator, so folding a normalised copy of every block into it would make topic
// reading pay for search on every navigation. The index also lets search run without downloading
// the 9 MB library at all. It holds only approved topics and playbooks, and for each entry only
// what a result row shows plus normalised text, so no draft, note or claim data can be in it.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(listTopics(), listPlaybooks()));
}
