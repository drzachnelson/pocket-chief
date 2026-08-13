import { apiOwner } from "@/lib/auth";
import { createDuplicateHash } from "@/lib/anki";
import { getRepository } from "@/lib/repository";
import { clozeUpdateSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { owner, response } = await apiOwner();
  if (response || !owner) return response!;
  try {
    const { id } = await context.params;
    const body = clozeUpdateSchema.parse(await request.json());
    if (detectLikelyPHI(body.clozeText).blocked) return Response.json({ error: "Remove possible patient identifiers before saving.", code: "PHI_SUSPECTED" }, { status: 422 });
    const repository = await getRepository();
    const current = (await repository.getCards([id]))[0];
    if (!current) return Response.json({ error: "Anki draft not found." }, { status: 404 });
    const draft = await repository.updateCard({
      ...current,
      clozeText: body.clozeText,
      duplicateHash: await createDuplicateHash(body.clozeText.replace(/{{c\d+::|}}/g, "")),
    });
    await repository.audit("anki.draft.reviewed", draft.id, owner.email);
    return Response.json({ draft });
  } catch {
    return Response.json({ error: "Could not save the reviewed cloze draft." }, { status: 422 });
  }
}
