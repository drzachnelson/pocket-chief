import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export async function GET() {
  const { response } = await apiOwner(); if (response) return response;
  return Response.json({ topics: await (await getRepository()).listBookmarkedTopics() }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const { response } = await apiOwner(); if (response) return response;
  const body = await request.json().catch(() => ({})) as { topicId?: string; saved?: boolean };
  if (!body.topicId || typeof body.saved !== "boolean") return Response.json({ error: "Invalid bookmark request." }, { status: 422 });
  await (await getRepository()).setBookmark(body.topicId, body.saved);
  return Response.json({ saved: body.saved });
}
