import type { TaxonomyNode } from "@/lib/types";

export const taxonomy: TaxonomyNode[] = [
  { id: "score", title: "SCORE Curriculum", slug: "score", order: 0 },
  { id: "alimentary", title: "Alimentary Tract", slug: "alimentary-tract", parentId: "score", order: 1 },
  { id: "biliary", title: "Biliary Tract", slug: "biliary-tract", parentId: "alimentary", order: 2 },
  { id: "breast", title: "Breast", slug: "breast", parentId: "score", order: 3 },
  { id: "breast-benign", title: "Benign Breast Disease", slug: "benign-breast-disease", parentId: "breast", order: 4 },
  { id: "general-abdomen", title: "General Abdomen", slug: "general-abdomen", parentId: "score", order: 5 },
  { id: "abdomen-conditions", title: "Diseases & Conditions", slug: "abdomen-diseases-conditions", parentId: "general-abdomen", order: 6 },
  { id: "abdomen-procedures", title: "Operations & Procedures", slug: "abdomen-operations-procedures", parentId: "general-abdomen", order: 7 },
  { id: "hernia", title: "Hernia", slug: "hernia", parentId: "score", order: 8 },
  { id: "hernia-conditions", title: "Diseases & Conditions", slug: "hernia-diseases-conditions", parentId: "hernia", order: 9 },
  { id: "hernia-procedures", title: "Operations & Procedures", slug: "hernia-operations-procedures", parentId: "hernia", order: 10 },
  { id: "arterial-disease", title: "Arterial Disease", slug: "arterial-disease", parentId: "score", order: 11 },
  { id: "arterial-procedures", title: "Operations & Procedures", slug: "arterial-operations-procedures", parentId: "arterial-disease", order: 12 },
];
