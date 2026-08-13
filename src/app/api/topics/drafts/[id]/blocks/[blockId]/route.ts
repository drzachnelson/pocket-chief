import { apiOwner } from "@/lib/auth";
import { reviseDraftBlock } from "@/lib/editorial";
import { reviseBlockSchema } from "@/lib/schemas";
import { demoStore } from "@/lib/store";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; blockId: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id, blockId } = await params;
  const draft = demoStore.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const { block } = reviseBlockSchema.parse(await request.json());
    const revised = reviseDraftBlock(draft, blockId, block);
    demoStore.replaceDraft(id, revised); demoStore.audit("topic.draft.block_updated", id, owner.email);
    return Response.json({ draft: revised });
  } catch { return Response.json({ error: "The block update is invalid." }, { status: 422 }); }
}
