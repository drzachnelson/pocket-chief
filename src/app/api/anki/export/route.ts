import { buildAnkiMobileUrl, sendToAnkiConnect, toAnkiTsv } from "@/lib/anki";
import { apiOwner } from "@/lib/auth";
import { ankiExportSchema } from "@/lib/schemas";
import { getRepository } from "@/lib/repository";

export async function POST(request: Request) {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  try {
    const body = ankiExportSchema.parse(await request.json());
    const repository = await getRepository();
    const drafts = await repository.getCards(body.draftIds);
    if (drafts.length !== body.draftIds.length) return Response.json({ error: "One or more Anki drafts were not found." }, { status: 404 });
    await repository.audit("anki.exported", drafts[0].id, owner.email, { count: drafts.length, mode: body.mode });
    if (body.mode === "ankimobile") return Response.json({ urls: drafts.map((draft) => buildAnkiMobileUrl(draft, body.settings)) });
    if (body.mode === "ankiconnect") {
      const noteIds = [];
      for (const draft of drafts) noteIds.push(await sendToAnkiConnect(draft, body.settings));
      return Response.json({ noteIds });
    }
    return new Response(toAnkiTsv(drafts, body.settings), { headers: { "Content-Type": "text/tab-separated-values; charset=utf-8", "Content-Disposition": "attachment; filename=Pocket-Chief-Anki.tsv" } });
  } catch { return Response.json({ error: "AnkiConnect was unavailable. Use the UTF-8 import file fallback.", fallback: "tsv" }, { status: 503 }); }
}
