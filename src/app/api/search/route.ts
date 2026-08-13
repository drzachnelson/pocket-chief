import { apiOwner } from "@/lib/auth";
import { searchTopics } from "@/lib/search";
import { demoStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { response } = await apiOwner();
  if (response) return response;
  const query = new URL(request.url).searchParams.get("q")?.slice(0, 300) ?? "";
  const results = searchTopics(query, demoStore.topics()).map((topic) => ({ id: topic.id, slug: topic.slug, title: topic.title, aliases: topic.aliases, category: topic.scoreCategory, tags: topic.tags, version: topic.approvedVersion!.versionNumber }));
  return Response.json({ query, results }, { headers: { "Cache-Control": "private, max-age=60" } });
}
