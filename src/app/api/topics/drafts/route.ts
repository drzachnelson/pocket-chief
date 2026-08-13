import { apiOwner } from "@/lib/auth";
import { draftTopic } from "@/lib/ai";
import { createDraft, supportWarnings } from "@/lib/editorial";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { draftRequestSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";
import { demoStore } from "@/lib/store";
import type { SuppliedSource } from "@/lib/types";

export async function POST(request: Request) {
  const { owner, response } = await apiOwner();
  if (response || !owner) return response!;
  const rate = checkRateLimit(requestKey(request, "topic-draft"), 8);
  if (!rate.allowed) return Response.json({ error: "Drafting limit reached. Try again shortly.", code: "RATE_LIMITED" }, { status: 429 });
  try {
    const body = draftRequestSchema.parse(await request.json());
    const phi = detectLikelyPHI(body.rawNotes);
    if (phi.blocked) return Response.json({ error: "Remove possible patient identifiers before drafting.", code: "PHI_SUSPECTED", fields: phi.reasons }, { status: 422 });
    const topicId = body.topicId || `topic-${crypto.randomUUID()}`;
    const sources: SuppliedSource[] = body.sourceMetadata.map((source) => ({ id: source.id || `source-${crypto.randomUUID()}`, title: source.title, kind: source.kind, citation: source.citation || source.title, suppliedAt: new Date().toISOString(), url: source.url, details: source.details }));
    sources.forEach((source) => demoStore.addSource(source));
    const input = { topicId, rawNotes: body.rawNotes, imageIds: body.imageIds, sourceIds: sources.map((source) => source.id), scoreNodeId: body.scoreNodeId, tags: body.tags };
    const generated = await draftTopic(input);
    const basedOn = demoStore.topics().find((topic) => topic.id === topicId)?.approvedVersion ?? undefined;
    const base = createDraft(input, basedOn ?? undefined);
    const draft = { ...base, blocks: generated.blocks, warnings: [...generated.warnings, ...supportWarnings(generated.blocks)] };
    demoStore.saveDraft(draft);
    demoStore.audit("topic.draft.created", draft.id, owner.email, { claimWarnings: supportWarnings(draft.blocks).length });
    return Response.json({ draft }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message === "PHI_SUSPECTED" ? "Remove possible patient identifiers before drafting." : "The draft request is invalid or could not be completed.";
    return Response.json({ error: message, code: error instanceof Error && error.message === "PHI_SUSPECTED" ? "PHI_SUSPECTED" : "INVALID_DRAFT" }, { status: 422 });
  }
}
