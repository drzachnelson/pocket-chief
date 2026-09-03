import { listTaxonomy, listTopics } from "@/lib/library";

// `force-static` is what makes this a file rather than a handler: under `output: "export"` Next
// renders it once at build time and writes `out/library.json`. Nothing here may read the request.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ topics: listTopics(), taxonomy: listTaxonomy() });
}
