import { apiOwner } from "@/lib/auth";
import { draftTopic } from "@/lib/ai";
import { normalizeClaimSupport, supportWarnings } from "@/lib/editorial";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { revisionPromptSchema } from "@/lib/schemas";
import { getRepository } from "@/lib/repository";
import { detectLikelyPHI } from "@/lib/safety";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  if (!checkRateLimit(requestKey(request, "topic-revise"), 12).allowed) return Response.json({ error: "Revision limit reached.", code: "RATE_LIMITED" }, { status: 429 });
  const { id } = await params;
  const repository = await getRepository();
  const draft = await repository.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const body = revisionPromptSchema.parse(await request.json());
    if (detectLikelyPHI(body.instruction).blocked) return Response.json({ error: "Remove possible patient identifiers before revising.", code: "PHI_SUSPECTED" }, { status: 422 });
    const targetBlocks = body.blockIds.length ? draft.blocks.filter((block) => body.blockIds.includes(block.id)) : draft.blocks;
    const generated = process.env.OPENAI_API_KEY
      ? await draftTopic({ topicId: draft.topicId, rawNotes: `Current source-bound draft:\n${JSON.stringify(targetBlocks)}\n\nRevision instruction:\n${body.instruction}`, imageIds: [], sourceIds: draft.sourceIds, scoreNodeId: draft.scoreNodeId, tags: draft.tags })
      : { blocks: targetBlocks, warnings: ["Local preview kept the current source-bound blocks because AI drafting is not configured."] };
    const retained = body.blockIds.length ? draft.blocks.filter((block) => !body.blockIds.includes(block.id)) : [];
    const validSources = new Set((await repository.listSources(draft.sourceIds)).map((source) => source.id));
    const blocks = normalizeClaimSupport([...retained, ...generated.blocks], validSources);
    const revised = { ...draft, blocks, warnings: [...generated.warnings, ...supportWarnings(blocks, validSources)] };
    const persisted = await repository.replaceDraft(id, revised); await repository.audit("topic.draft.revised", persisted.id, owner.email, { blocks: generated.blocks.length });
    return Response.json({ draft: persisted });
  } catch { return Response.json({ error: "The revision request is invalid." }, { status: 422 }); }
}
