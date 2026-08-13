import { z } from "zod";

export const sourceMetadataSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(240),
  kind: z.enum(["user_notes", "book", "article", "website", "image"]),
  citation: z.string().max(500).optional(),
  url: z.url().optional(),
  details: z.string().max(1000).optional(),
});

export const draftRequestSchema = z.object({
  topicId: z.uuid().optional(),
  title: z.string().min(1).max(180),
  rawNotes: z.string().min(1).max(100_000),
  imageIds: z.array(z.string()).max(20).default([]),
  sourceMetadata: z.array(sourceMetadataSchema).min(1).max(30),
  scoreNodeId: z.string().min(1),
  tags: z.array(z.string().min(1).max(80)).max(30).default([]),
  mode: z.enum(["ai", "notes_only"]).default("ai"),
});

const claimSchema = z.object({
  id: z.string(),
  text: z.string(),
  citationIds: z.array(z.string()),
  status: z.enum(["cited", "needs_support"]),
});

const base = { id: z.string(), heading: z.string().optional(), claims: z.array(claimSchema) };
export const topicBlockSchema = z.discriminatedUnion("type", [
  z.object({ ...base, type: z.enum(["summary", "prose", "warning"]), text: z.string() }),
  z.object({ ...base, type: z.literal("bullets"), items: z.array(z.string()) }),
  z.object({ ...base, type: z.literal("table"), columns: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({ ...base, type: z.literal("flow"), nodes: z.array(z.object({ id: z.string(), label: z.string(), tone: z.enum(["default", "good", "caution"]).optional() })), edges: z.array(z.object({ from: z.string(), to: z.string(), label: z.string().optional() })) }),
  z.object({ ...base, type: z.literal("sequence"), steps: z.array(z.object({ title: z.string(), detail: z.string() })) }),
  z.object({ ...base, type: z.literal("image"), mediaId: z.string(), alt: z.string(), caption: z.string().optional() }),
  z.object({ ...base, type: z.literal("references"), sourceIds: z.array(z.string()) }),
]);

export const reviseBlockSchema = z.object({ block: topicBlockSchema });
export const revisionPromptSchema = z.object({ instruction: z.string().min(3).max(5000), blockIds: z.array(z.string()).max(20).default([]) });

export const clozeRequestSchema = z.object({
  selection: z.string().min(5).max(4000),
  topicId: z.string(),
  sourceBlockIds: z.array(z.string()).min(1),
  contextImageRef: z.string().max(100_000),
  tags: z.array(z.string()).max(40).default([]),
});

export const ankiExportSchema = z.object({
  draftIds: z.array(z.string()).min(1),
  mode: z.enum(["tsv", "ankimobile", "ankiconnect"]),
  settings: z.object({ deck: z.string().min(1), noteType: z.string().min(1), tagPrefix: z.string(), fieldMap: z.object({ text: z.string(), extra: z.string() }).optional() }),
});
