import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id } = await params;
  const repository = await getRepository();
  const version = await repository.getVersion(id);
  if (!version) return Response.json({ error: "Version not found." }, { status: 404 });
  try {
    const draft = await repository.restoreVersion(id);
    await repository.audit("topic.version.restored", draft.id, owner.email, { fromVersion: version.versionNumber });
    return Response.json({ draft }, { status: 201 });
  } catch { return Response.json({ error: "The version could not be restored.", code: "RESTORE_FAILED" }, { status: 422 }); }
}
