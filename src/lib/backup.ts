import type { ClozeDraft, SuppliedSource, Topic, TopicBlock } from "@/lib/types";

function blockMarkdown(block: TopicBlock): string {
  const heading = block.heading ? `\n## ${block.heading}\n\n` : "\n";
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return `${heading}${block.text}\n`;
  if (block.type === "bullets") return `${heading}${block.items.map((item) => `- ${item}`).join("\n")}\n`;
  if (block.type === "table") {
    const separator = block.columns.map(() => "---");
    return `${heading}| ${block.columns.join(" | ")} |\n| ${separator.join(" | ")} |\n${block.rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}\n`;
  }
  if (block.type === "sequence") return `${heading}${block.steps.map((step, index) => `${index + 1}. **${step.title}** — ${step.detail}`).join("\n")}\n`;
  if (block.type === "flow") return `${heading}${block.nodes.map((node) => `- ${node.label}`).join("\n")}\n`;
  if (block.type === "image") return `${heading}![${block.alt}](${block.mediaId})${block.caption ? `\n_${block.caption}_` : ""}\n`;
  return "sourceIds" in block ? `${heading}${block.sourceIds.map((id: string) => `- ${id}`).join("\n")}\n` : heading;
}

export function topicToMarkdown(topic: Topic): string {
  const version = topic.approvedVersion;
  if (!version) return `# ${topic.title}\n\nDraft only.\n`;
  return `# ${topic.title}\n\n${topic.scoreCategory}\n\n${version.blocks.map(blockMarkdown).join("\n")}\n`;
}

export function buildBackupManifest(topics: Topic[], sources: SuppliedSource[], ankiDrafts: ClozeDraft[]) {
  return {
    format: "pocket-chief-backup" as const,
    version: 1,
    exportedAt: new Date().toISOString(),
    topics: topics.filter((topic) => topic.approvedVersion).map((topic) => ({ id: topic.id, slug: topic.slug, version: topic.approvedVersion!.versionNumber })),
    sources: sources.map(({ id, title }) => ({ id, title })),
    ankiDrafts: ankiDrafts.map(({ id, duplicateHash }) => ({ id, duplicateHash })),
    files: ["manifest.json", "topics/", "sources.json", "anki-drafts.json", "media/manifest.json"],
  };
}
