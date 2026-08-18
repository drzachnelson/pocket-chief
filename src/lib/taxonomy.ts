import type { TaxonomyNode, Topic } from "@/lib/types";

export function taxonomyDescendantIds(nodeId: string, nodes: TaxonomyNode[]): Set<string> {
  const descendants = new Set<string>();
  const queue = [nodeId];
  while (queue.length) {
    const parentId = queue.shift()!;
    for (const node of nodes) if (node.parentId === parentId && !descendants.has(node.id)) { descendants.add(node.id); queue.push(node.id); }
  }
  return descendants;
}

export function taxonomyAncestry(nodeId: string | undefined, nodes: TaxonomyNode[]): TaxonomyNode[] {
  const path: TaxonomyNode[] = [];
  const seen = new Set<string>();
  let current = nodes.find((node) => node.id === nodeId);
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    path.unshift(current);
    current = nodes.find((node) => node.id === current!.parentId);
  }
  return path;
}

export function taxonomyDepth(nodeId: string | undefined, nodes: TaxonomyNode[]) {
  return Math.max(taxonomyAncestry(nodeId, nodes).length - 1, 0);
}

export function taxonomyParentIsValid(nodeId: string | undefined, parentId: string | undefined, nodes: TaxonomyNode[]) {
  if (!parentId) return true;
  if (!nodes.some((node) => node.id === parentId)) return false;
  if (!nodeId) return true;
  return parentId !== nodeId && !taxonomyDescendantIds(nodeId, nodes).has(parentId);
}

export interface TaxonomySubsection { node: TaxonomyNode; topics: Topic[] }
export interface TaxonomySection { node: TaxonomyNode; subsections: TaxonomySubsection[]; topics: Topic[]; topicCount: number }

// Topics hang off leaf nodes, so a category's count has to include everything beneath it.
// Subsections are flattened to a single tier on purpose: SCORE is only ever
// category → section → topic, and a second disclosure tier would repeat "Diseases &
// Conditions" at two indents without buying any navigation.
export function taxonomySections(nodes: TaxonomyNode[], topics: Topic[], rootId = "score"): TaxonomySection[] {
  const byOrder = (a: { node: TaxonomyNode }, b: { node: TaxonomyNode }) => a.node.order - b.node.order;
  const byTitle = (a: Topic, b: Topic) => a.title.localeCompare(b.title);
  function topicsUnder(nodeId: string) {
    const ids = taxonomyDescendantIds(nodeId, nodes);
    ids.add(nodeId);
    return topics.filter((topic) => ids.has(topic.scoreNodeId)).sort(byTitle);
  }
  return nodes.filter((node) => node.parentId === rootId).map((node) => {
    const subsections = nodes.filter((child) => child.parentId === node.id).map((child) => ({ node: child, topics: topicsUnder(child.id) })).filter((subsection) => subsection.topics.length > 0).sort(byOrder);
    const direct = topics.filter((topic) => topic.scoreNodeId === node.id).sort(byTitle);
    return { node, subsections, topics: direct, topicCount: direct.length + subsections.reduce((total, subsection) => total + subsection.topics.length, 0) };
  }).sort(byOrder);
}
