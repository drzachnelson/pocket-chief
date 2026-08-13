import type { TaxonomyNode } from "@/lib/types";

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
