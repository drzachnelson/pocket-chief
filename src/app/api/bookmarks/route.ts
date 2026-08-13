import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";
import { bookmarkRequestSchema } from "@/lib/schemas";

export async function GET() {
  const { response } = await apiOwner(); if (response) return response;
  return Response.json({ topics: await (await getRepository()).listBookmarkedTopics() }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const { response } = await apiOwner(); if (response) return response;
  try {
    const body = bookmarkRequestSchema.parse(await request.json());
    await (await getRepository()).setBookmark(body.topicId, body.saved);
    return Response.json({ saved: body.saved });
  } catch { return Response.json({ error: "The bookmark request is invalid or could not be completed.", code: "INVALID_BOOKMARK" }, { status: 422 }); }
}
