import { apiOwner } from "@/lib/auth";
import { restoreVersion } from "@/lib/editorial";
import { demoStore } from "@/lib/store";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const { id } = await params;
  const version = demoStore.topics().flatMap((topic) => topic.versions).find((item) => item.id === id);
  if (!version) return Response.json({ error: "Version not found." }, { status: 404 });
  const draft = restoreVersion(version);
  demoStore.saveDraft(draft); demoStore.audit("topic.version.restored", draft.id, owner.email, { fromVersion: version.versionNumber });
  return Response.json({ draft }, { status: 201 });
}
