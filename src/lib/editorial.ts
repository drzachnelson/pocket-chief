import type { TopicBlock } from "@/lib/types";

export function factualUnits(block: TopicBlock): string[] {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return [block.text];
  if (block.type === "bullets") return block.items;
  if (block.type === "table") return block.rows.map((row) => row.join(" — "));
  if (block.type === "sequence") return block.steps.map((step) => `${step.title}: ${step.detail}`);
  if (block.type === "flow") return [...block.nodes.map((node) => node.label), ...block.edges.flatMap((edge) => edge.label ? [edge.label] : [])];
  if (block.type === "image") return [block.alt, ...(block.caption ? [block.caption] : [])];
  return [];
}

const comparable = (value: string) => value.trim().replace(/\s+/g, " ");

/**
 * The claim-support invariant, and the only thing standing behind it now that the SQL is gone:
 * a block is supported when `claims[i].text` matches `factualUnits(block)[i]` exactly and in
 * order, every claim is `cited`, and every citation resolves to a source the topic supplied.
 * `sourced()` in `src/content/authoring.ts` derives both sides from `factualUnits`, so the
 * contract test is what catches a hand-edited claim list drifting from rendered text.
 */
export function supportWarnings(blocks: TopicBlock[], validSourceIds?: ReadonlySet<string>): string[] {
  const warnings: string[] = [];
  for (const block of blocks) {
    const units = factualUnits(block);
    units.forEach((unit, index) => {
      const claim = block.claims[index];
      if (!claim || comparable(claim.text) !== comparable(unit)) {
        warnings.push(`Needs support: ${unit}`);
        return;
      }
      const citationsAreValid = claim.citationIds.length > 0
        && (!validSourceIds || claim.citationIds.every((id) => validSourceIds.has(id)));
      if (claim.status !== "cited" || !citationsAreValid) warnings.push(`Needs support: ${claim.text}`);
    });
    for (const claim of block.claims.slice(units.length)) warnings.push(`Needs support: ${claim.text}`);
  }
  return [...new Set(warnings)];
}
