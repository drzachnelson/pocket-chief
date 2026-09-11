import { listPlaybooks } from "@/lib/library";

// `force-static` is what turns this into a build artifact: `next build` renders it once and
// writes `out/playbooks.json`. Nothing here may read the request.
//
// A second asset rather than a `playbooks` key on library.json. OfflineHydrator calls
// loadLibrary() on every route, so folding long-form operative prose into that payload makes
// topic reading pay for it on every navigation, forever — and a malformed playbook would take
// the atlas down with it.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ playbooks: listPlaybooks() });
}
