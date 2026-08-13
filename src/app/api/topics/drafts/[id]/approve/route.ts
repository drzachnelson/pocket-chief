import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id } = await params;
  const repository = await getRepository();
  const draft = await repository.getDraft(id);
  if (!draft) return Response.json({ error: "Draft not found." }, { status: 404 });
  try {
    const approved = await repository.approveDraft(id, owner.email);
    await repository.audit("topic.version.approved", approved.id, owner.email, { version: approved.versionNumber });
    return Response.json({ version: approved });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Approval blocked.", code: "SUPPORT_REQUIRED", warnings: draft.warnings }, { status: 409 });
  }
}
