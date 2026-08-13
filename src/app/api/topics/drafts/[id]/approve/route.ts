import { apiOwner } from "@/lib/auth";
import { approveDraft } from "@/lib/editorial";
import { demoStore } from "@/lib/store";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id } = await params;
  const draft = demoStore.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const approved = approveDraft(draft, owner.email);
    demoStore.approveVersion(approved); demoStore.audit("topic.version.approved", approved.id, owner.email, { version: approved.versionNumber });
    return Response.json({ version: approved });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Approval blocked.", code: "SUPPORT_REQUIRED", warnings: draft.warnings }, { status: 409 });
  }
}
