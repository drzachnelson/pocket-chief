import { apiOwner } from "@/lib/auth";
import { reviseDraftBlock, supportWarnings } from "@/lib/editorial";
import { reviseBlockSchema } from "@/lib/schemas";
import { getRepository } from "@/lib/repository";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; blockId: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id, blockId } = await params;
  const repository = await getRepository();
  const draft = await repository.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const { block } = reviseBlockSchema.parse(await request.json());
    const revised = reviseDraftBlock(draft, blockId, block);
    const validSources = new Set((await repository.listSources(draft.sourceIds)).map((source) => source.id));
    revised.warnings = supportWarnings(revised.blocks, validSources);
    const persisted = await repository.replaceDraft(id, revised); await repository.audit("topic.draft.block_updated", id, owner.email);
    return Response.json({ draft: persisted });
  } catch { return Response.json({ error: "The block update is invalid." }, { status: 422 }); }
}
