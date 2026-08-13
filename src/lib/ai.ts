import { topicBlockSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";
import type { ClozeDraft, TopicBlock, TopicDraftInput } from "@/lib/types";
import { createDuplicateHash, createFallbackCloze } from "@/lib/anki";

const topicDraftJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["blocks", "warnings"],
  properties: {
    blocks: { type: "array", minItems: 1, items: { type: "object" } },
    warnings: { type: "array", items: { type: "string" } },
  },
};

function extractOutputText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const candidate = payload as { output_text?: string; output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }> };
  if (candidate.output_text) return candidate.output_text;
  for (const item of candidate.output ?? []) for (const content of item.content ?? []) if (content.type === "output_text" && content.text) return content.text;
  return null;
}

async function responsesApi(input: string, name: string, schema: object, effort: "low" | "medium") {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.POCKET_CHIEF_TOPIC_MODEL || "gpt-5.6-terra",
      reasoning: { effort },
      input,
      text: { format: { type: "json_schema", name, strict: true, schema } },
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Drafting service returned ${response.status}.`);
  const payload = await response.json();
  const text = extractOutputText(payload);
  if (!text) throw new Error("The drafting model refused or returned no valid content.");
  return JSON.parse(text) as unknown;
}

export async function draftTopic(input: TopicDraftInput): Promise<{ blocks: TopicBlock[]; warnings: string[] }> {
  const phi = detectLikelyPHI(input.rawNotes);
  if (phi.blocked) throw new Error("PHI_SUSPECTED");
  const generated = await responsesApi(`Create a compact general-surgery topic from only these owner-supplied notes. Never add facts. Every factual claim must use one of these source IDs: ${input.sourceIds.join(", ")}. If a claim lacks support, mark it needs_support. Notes:\n${input.rawNotes}`, "topic_draft", topicDraftJsonSchema, "medium");
  if (generated && typeof generated === "object") {
    const value = generated as { blocks?: unknown[]; warnings?: string[] };
    const blocks = (value.blocks ?? []).map((block) => topicBlockSchema.parse(block)) as TopicBlock[];
    return { blocks, warnings: value.warnings ?? [] };
  }
  const sourceId = input.sourceIds[0];
  const claimStatus = sourceId ? "cited" as const : "needs_support" as const;
  const block: TopicBlock = { id: crypto.randomUUID(), type: "summary", heading: "Draft summary", text: input.rawNotes, claims: [{ id: crypto.randomUUID(), text: input.rawNotes, citationIds: sourceId ? [sourceId] : [], status: claimStatus }] };
  return { blocks: [block], warnings: sourceId ? ["Local deterministic draft: review structure and every claim before approval."] : ["Source support is missing."] };
}

export async function draftCloze(selection: string, topicId: string, sourceBlockIds: string[], contextImageRef: string, tags: string[]): Promise<ClozeDraft> {
  const phi = detectLikelyPHI(selection);
  if (phi.blocked) throw new Error("PHI_SUSPECTED");
  const schema = { type: "object", additionalProperties: false, required: ["clozeText", "additionalContext"], properties: { clozeText: { type: "string" }, additionalContext: { type: "string" } } };
  const generated = await responsesApi(`Create exactly one editable Anki cloze deletion from this educational passage. Preserve meaning and add no facts. Passage: ${selection}`, "cloze_draft", schema, "low") as { clozeText?: string; additionalContext?: string } | null;
  const fallback = createFallbackCloze(selection);
  const clozeText = generated?.clozeText || fallback;
  return { id: crypto.randomUUID(), clozeText, additionalContext: generated?.additionalContext || `Pocket Chief · ${topicId}`, sourceBlockIds, contextImageRef, tags, duplicateHash: await createDuplicateHash(clozeText.replace(/{{c\d+::|}}/g, "")) };
}
