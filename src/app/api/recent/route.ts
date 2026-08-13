import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";
import { recentViewRequestSchema } from "@/lib/schemas";

export async function GET() {
  const { response } = await apiOwner(); if (response) return response;
  return Response.json({ topics: await (await getRepository()).listRecentTopics() }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const { response } = await apiOwner(); if (response) return response;
  try {
    const body = recentViewRequestSchema.parse(await request.json());
    await (await getRepository()).recordRecentView(body.topicId);
    return Response.json({ recorded: true });
  } catch { return Response.json({ error: "The recent-view request is invalid or could not be completed.", code: "INVALID_RECENT_VIEW" }, { status: 422 }); }
}
