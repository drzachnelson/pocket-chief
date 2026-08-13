import { apiOwner } from "@/lib/auth";
import { draftTopic } from "@/lib/ai";
import { createDraft, normalizeClaimSupport, supportWarnings } from "@/lib/editorial";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { draftRequestSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";
import { getRepository } from "@/lib/repository";
import { slugify } from "@/lib/text";
import type { SuppliedSource, TopicBlock } from "@/lib/types";

export async function POST(request: Request) {
  const { owner, response } = await apiOwner();
  if (response || !owner) return response!;
  const rate = checkRateLimit(requestKey(request, "topic-draft"), 8);
  if (!rate.allowed) return Response.json({ error: "Drafting limit reached. Try again shortly.", code: "RATE_LIMITED" }, { status: 429 });
  try {
    const body = draftRequestSchema.parse(await request.json());
    const phi = detectLikelyPHI([
      body.title,
      body.rawNotes,
      ...body.imageIds,
      ...body.tags,
      ...body.sourceMetadata.flatMap((source) => [source.title, source.citation, source.url, source.details]),
    ].filter((value): value is string => Boolean(value)).join("\n"));
    if (phi.blocked) return Response.json({ error: "Remove possible patient identifiers before drafting.", code: "PHI_SUSPECTED", fields: phi.reasons }, { status: 422 });
    const repository = await getRepository();
    const slug = slugify(body.title);
    const existing = body.topicId ? await repository.getTopicById(body.topicId) : await repository.getTopicBySlug(slug);
    const topicId = existing?.id || body.topicId || crypto.randomUUID();
    const sources: SuppliedSource[] = body.sourceMetadata.map((source) => ({ id: source.id || crypto.randomUUID(), title: source.title, kind: source.kind, citation: source.citation || source.title, suppliedAt: new Date().toISOString(), url: source.url, details: source.details }));
    const input = { topicId, rawNotes: body.rawNotes, imageIds: body.imageIds, sourceIds: sources.map((source) => source.id), scoreNodeId: body.scoreNodeId, tags: body.tags };
    const generated = body.mode === "ai" ? await draftTopic(input) : {
      blocks: [{ id: crypto.randomUUID(), type: "summary" as const, heading: "Owner notes", text: body.rawNotes, claims: [{ id: crypto.randomUUID(), text: body.rawNotes, citationIds: [sources[0].id], status: "cited" as const }] }] satisfies TopicBlock[],
      warnings: ["Notes-only draft: organize and review this source before approval."],
    };
    const basedOn = existing?.approvedVersion ?? undefined;
    const base = createDraft(input, basedOn ?? undefined);
    const validSourceIds = new Set(sources.map((source) => source.id));
    const blocks = normalizeClaimSupport(generated.blocks, validSourceIds);
    const claimWarnings = supportWarnings(blocks, validSourceIds);
    const draft = { ...base, id: crypto.randomUUID(), blocks, warnings: [...generated.warnings, ...claimWarnings] };
    const taxonomy = await repository.listTaxonomy();
    const scoreNode = taxonomy.find((node) => node.id === body.scoreNodeId || node.slug === body.scoreNodeId);
    const persisted = await repository.createTopicDraft({
      topic: { id: topicId, title: body.title, slug, aliases: existing?.aliases ?? [], scoreNodeId: scoreNode?.id ?? "unassigned", scoreCategory: scoreNode ? `SCORE · ${scoreNode.title}` : "SCORE · Unassigned", tags: body.tags },
      sources,
      draft: { ...draft, scoreNodeId: scoreNode?.id ?? "unassigned" },
    });
    await repository.audit("topic.draft.created", persisted.draft.id, owner.email, { claimWarnings: claimWarnings.length });
    return Response.json(persisted, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message === "PHI_SUSPECTED" ? "Remove possible patient identifiers before drafting." : "The draft request is invalid or could not be completed.";
    return Response.json({ error: message, code: error instanceof Error && error.message === "PHI_SUSPECTED" ? "PHI_SUSPECTED" : "INVALID_DRAFT" }, { status: 422 });
  }
}
