import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { response } = await apiOwner();
  if (response) return response;
  const query = new URL(request.url).searchParams.get("q")?.slice(0, 300) ?? "";
  const repository = await getRepository();
  const results = (await repository.searchTopics(query)).filter((topic) => topic.approvedVersion).map((topic) => ({ id: topic.id, slug: topic.slug, title: topic.title, aliases: topic.aliases, category: topic.scoreCategory, tags: topic.tags, version: topic.approvedVersion!.versionNumber }));
  return Response.json({ query, results }, { headers: { "Cache-Control": "private, max-age=60" } });
}
