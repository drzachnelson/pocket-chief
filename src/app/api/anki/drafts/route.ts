import { draftCloze } from "@/lib/ai";
import { apiOwner } from "@/lib/auth";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { clozeRequestSchema } from "@/lib/schemas";
import { demoStore } from "@/lib/store";

export async function POST(request: Request) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  if (!checkRateLimit(requestKey(request, "cloze"), 20).allowed) return Response.json({ error: "Cloze limit reached.", code: "RATE_LIMITED" }, { status: 429 });
  try {
    const body = clozeRequestSchema.parse(await request.json());
    const draft = await draftCloze(body.selection, body.topicId, body.sourceBlockIds, body.contextImageRef, body.tags);
    demoStore.addCard(draft); demoStore.audit("anki.draft.created", draft.id, owner.email);
    return Response.json({ draft }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error && error.message === "PHI_SUSPECTED" ? "Remove possible patient identifiers." : "Could not create the cloze draft." }, { status: 422 });
  }
}
