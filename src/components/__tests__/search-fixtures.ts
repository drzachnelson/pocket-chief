import { buildSearchIndex } from "@/lib/search";
import type { Playbook, Topic, TopicBlock } from "@/lib/types";

// Small synthetic library so the search UI tests read the real matcher's output without the real content.
const prose = (text: string): TopicBlock => ({ id: "block", type: "prose", text, claims: [] });

export const topic = (id: string, title: string, text = "", scoreCategory = "SCORE · Abdominal Wall · Diseases & Conditions"): Topic => ({
  id, slug: id, title, aliases: [], scoreNodeId: "score", scoreCategory, tags: [],
  approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", blocks: [prose(text)], sourceIds: [], scoreNodeId: "score", tags: [], warnings: [], createdAt: "2026-01-01T00:00:00.000Z" },
  versions: [], updatedAt: "2026-01-01T00:00:00.000Z",
});

export const playbook = (id: string, title: string, text = ""): Playbook => ({
  id, slug: id, title, aliases: [], procedureId: id.replace(/-/g, "_"), approach: "open", specialty: "Vascular", tags: [],
  blocks: [prose(text)], sourceIds: [], warnings: [], reviewedAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
});

/** Eight titled hernias (more than the six quick rows), one topic that only mentions the word in its body, and one playbook. */
export const library = () => buildSearchIndex(
  [
    ...["Inguinal", "Umbilical", "Femoral", "Incisional", "Hiatal", "Parastomal", "Spigelian", "Obturator"].map((kind) => topic(`${kind.toLowerCase()}-hernia`, `${kind} Hernia`)),
    topic("appendicitis", "Appendicitis", "A hernia can mimic right lower quadrant pain.", "SCORE · Acute Care · Diseases & Conditions"),
  ],
  [playbook("hernia-mesh-repair", "Hernia Mesh Repair")],
);
