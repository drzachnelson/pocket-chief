import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export async function GET() {
  const { response } = await apiOwner(); if (response) return response;
  return Response.json({ topics: await (await getRepository()).listRecentTopics() }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const { response } = await apiOwner(); if (response) return response;
  const body = await request.json().catch(() => ({})) as { topicId?: string };
  if (!body.topicId) return Response.json({ error: "Invalid recent-view request." }, { status: 422 });
  await (await getRepository()).recordRecentView(body.topicId);
  return Response.json({ recorded: true });
}
