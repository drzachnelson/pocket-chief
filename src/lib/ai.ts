import { z } from "zod";
import { topicBlockSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";
import type { ClozeDraft, TopicBlock, TopicDraftInput } from "@/lib/types";
import { createDuplicateHash, createFallbackCloze } from "@/lib/anki";

const nullableString = { anyOf: [{ type: "string" }, { type: "null" }] } as const;
const claimJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "text", "citationIds", "status"],
  properties: {
    id: { type: "string" },
    text: { type: "string" },
    citationIds: { type: "array", items: { type: "string" } },
    status: { type: "string", enum: ["cited", "needs_support"] },
  },
} as const;

function blockJsonSchema(type: string, properties: Record<string, unknown>, required: string[]) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["id", "type", "heading", "claims", ...required],
    properties: {
      id: { type: "string" },
      type: { type: "string", const: type },
      heading: nullableString,
      claims: { type: "array", items: claimJsonSchema },
      ...properties,
    },
  };
}

export const topicDraftJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["blocks", "warnings"],
  properties: {
    blocks: {
      type: "array",
      minItems: 1,
      items: {
        anyOf: [
          blockJsonSchema("summary", { text: { type: "string" } }, ["text"]),
          blockJsonSchema("prose", { text: { type: "string" } }, ["text"]),
          blockJsonSchema("warning", { text: { type: "string" } }, ["text"]),
          blockJsonSchema("bullets", { items: { type: "array", items: { type: "string" } } }, ["items"]),
          blockJsonSchema("table", { columns: { type: "array", items: { type: "string" } }, rows: { type: "array", items: { type: "array", items: { type: "string" } } } }, ["columns", "rows"]),
          blockJsonSchema("flow", {
            nodes: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["id", "label", "tone"],
                properties: {
                  id: { type: "string" },
                  label: { type: "string" },
                  tone: { anyOf: [{ type: "string", enum: ["default", "good", "caution"] }, { type: "null" }] },
                },
              },
            },
            edges: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["from", "to", "label"],
                properties: { from: { type: "string" }, to: { type: "string" }, label: nullableString },
              },
            },
          }, ["nodes", "edges"]),
          blockJsonSchema("sequence", {
            steps: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["title", "detail"],
                properties: { title: { type: "string" }, detail: { type: "string" } },
              },
            },
          }, ["steps"]),
          blockJsonSchema("image", { mediaId: { type: "string" }, alt: { type: "string" }, caption: nullableString }, ["mediaId", "alt", "caption"]),
          blockJsonSchema("references", { sourceIds: { type: "array", items: { type: "string" } } }, ["sourceIds"]),
        ],
      },
    },
    warnings: { type: "array", items: { type: "string" } },
  },
} as const;

const topicDraftOutputSchema = z.object({ blocks: z.array(topicBlockSchema).min(1), warnings: z.array(z.string()) }).strict();

function withoutNullOptionals(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutNullOptionals);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => item === null ? [] : [[key, withoutNullOptionals(item)]]));
}

export function parseTopicDraftOutput(value: unknown): { blocks: TopicBlock[]; warnings: string[] } {
  return topicDraftOutputSchema.parse(withoutNullOptionals(value)) as { blocks: TopicBlock[]; warnings: string[] };
}

export function assertGeneratedOutputIsPhiFree(value: unknown) {
  if (detectLikelyPHI(JSON.stringify(value)).blocked) throw new Error("PHI_SUSPECTED");
}

function extractOutputText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const candidate = payload as { output_text?: string; output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }> };
  if (candidate.output_text) return candidate.output_text;
  for (const item of candidate.output ?? []) for (const content of item.content ?? []) if (content.type === "output_text" && content.text) return content.text;
  return null;
}

async function responsesApi(input: string, name: string, schema: object, effort: "low" | "medium", model: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
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
  const generated = await responsesApi(`Create a compact general-surgery topic from only these owner-supplied notes. Never add facts. Every factual claim must use one of these source IDs: ${input.sourceIds.join(", ")}. If a claim lacks support, mark it needs_support. Notes:\n${input.rawNotes}`, "topic_draft", topicDraftJsonSchema, "medium", process.env.POCKET_CHIEF_TOPIC_MODEL || "gpt-5.6-terra");
  if (generated && typeof generated === "object") {
    const parsed = parseTopicDraftOutput(generated);
    assertGeneratedOutputIsPhiFree(parsed);
    return parsed;
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
  const generated = await responsesApi(`Create exactly one editable Anki cloze deletion from this educational passage. Preserve meaning and add no facts. Passage: ${selection}`, "cloze_draft", schema, "low", process.env.POCKET_CHIEF_CLOZE_MODEL || process.env.POCKET_CHIEF_TOPIC_MODEL || "gpt-5.6-terra") as { clozeText?: string; additionalContext?: string } | null;
  if (generated) assertGeneratedOutputIsPhiFree(generated);
  const fallback = createFallbackCloze(selection);
  const clozeText = generated?.clozeText || fallback;
  return { id: crypto.randomUUID(), clozeText, additionalContext: generated?.additionalContext || `Pocket Chief · ${topicId}`, sourceBlockIds, contextImageRef, tags, duplicateHash: await createDuplicateHash(clozeText.replace(/{{c\d+::|}}/g, "")) };
}
