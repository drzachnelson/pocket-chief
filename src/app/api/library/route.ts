import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const { response } = await apiOwner();
  if (response) return response;
  const repository = await getRepository();
  const [topics, taxonomy] = await Promise.all([repository.listTopics(), repository.listTaxonomy()]);
  return Response.json({ topics: topics.filter((topic) => topic.approvedVersion), taxonomy }, { headers: { "Cache-Control": "private, no-store" } });
}
