import { apiOwner } from "@/lib/auth";
import { draftTopic } from "@/lib/ai";
import { supportWarnings } from "@/lib/editorial";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { revisionPromptSchema } from "@/lib/schemas";
import { demoStore } from "@/lib/store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  if (!checkRateLimit(requestKey(request, "topic-revise"), 12).allowed) return Response.json({ error: "Revision limit reached.", code: "RATE_LIMITED" }, { status: 429 });
  const { id } = await params;
  const draft = demoStore.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const body = revisionPromptSchema.parse(await request.json());
    const generated = await draftTopic({ topicId: draft.topicId, rawNotes: body.instruction, imageIds: [], sourceIds: draft.sourceIds, scoreNodeId: draft.scoreNodeId, tags: draft.tags });
    const retained = body.blockIds.length ? draft.blocks.filter((block) => !body.blockIds.includes(block.id)) : [];
    const revised = { ...draft, blocks: [...retained, ...generated.blocks], warnings: [...generated.warnings, ...supportWarnings([...retained, ...generated.blocks])] };
    demoStore.replaceDraft(id, revised); demoStore.audit("topic.draft.revised", revised.id, owner.email, { blocks: generated.blocks.length });
    return Response.json({ draft: revised });
  } catch { return Response.json({ error: "The revision request is invalid." }, { status: 422 }); }
}
