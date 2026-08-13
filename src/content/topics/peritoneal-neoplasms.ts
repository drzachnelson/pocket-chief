import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-pn-summary",
    type: "summary",
    heading: "At a glance",
    text: "Most peritoneal disease is metastatic. The surgical prize is the appendiceal mucinous group, where an intact mucocele is cured by an appendectomy that does not rupture it, and a ruptured one seeds pseudomyxoma peritonei — treatable with complete cytoreduction and heated intraperitoneal chemotherapy, and lethal through recurrent bowel obstruction when it is not.",
  }, SOURCE),
  sourced({
    id: "block-pn-classification",
    type: "table",
    heading: "Primary versus secondary",
    columns: ["Category", "Examples", "Notes"],
    rows: [
      ["Secondary, metastatic", "Colorectal, appendiceal, ovarian, gastric, and pancreatic adenocarcinoma", "Far more common than any primary peritoneal tumor"],
      ["Primary, mesothelial", "Malignant peritoneal mesothelioma", "Strong asbestos association with a long latency"],
      ["Primary, serous", "Primary peritoneal serous carcinoma", "Behaves like ovarian serous cancer with normal ovaries"],
    ],
  }, SOURCE),
  sourced({
    id: "block-pn-pmp",
    type: "bullets",
    heading: "Pseudomyxoma peritonei",
    items: [
      "Arises when a low-grade appendiceal mucinous neoplasm or mucinous adenocarcinoma ruptures and seeds the peritoneum.",
      "Presents as jelly belly — progressive distention, mucinous ascites, bilateral ovarian masses, or a new hernia filled with mucin.",
      "Implants follow the redistribution phenomenon, sparing peristaltic small bowel loops and collecting in the omentum, subphrenic spaces, and pelvis.",
      "Recurrent small bowel obstruction from tumor coating is the leading cause of death.",
      "Treatment is complete cytoreduction with peritonectomy and omentectomy plus hyperthermic intraperitoneal chemotherapy using mitomycin C or oxaliplatin.",
    ],
  }, SOURCE),
  sourced({
    id: "block-pn-flow",
    type: "flow",
    heading: "Appendiceal mucinous lesion",
    nodes: [
      { id: "lesion", label: "Appendiceal mucinous lesion identified" },
      { id: "intact", label: "Intact mucocele with no perforation", tone: "good" },
      { id: "ruptured", label: "Ruptured, with mucinous peritoneal disease", tone: "caution" },
      { id: "appendectomy", label: "En bloc appendectomy without rupture; right hemicolectomy for adenocarcinoma or a positive base", tone: "good" },
      { id: "crs", label: "Cytoreductive surgery with HIPEC at a peritoneal surface malignancy center", tone: "caution" },
      { id: "systemic", label: "Systemic therapy and palliation", tone: "caution" },
    ],
    edges: [
      { from: "lesion", to: "intact", label: "no spillage" },
      { from: "lesion", to: "ruptured", label: "mucin in the peritoneum" },
      { from: "intact", to: "appendectomy" },
      { from: "ruptured", to: "crs" },
      { from: "crs", to: "systemic", label: "complete cytoreduction unachievable" },
    ],
  }, SOURCE),
  sourced({
    id: "block-pn-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "A Krukenberg tumor is a metastasis to the ovary, classically signet ring gastric cancer, not a primary peritoneal tumor.",
      "A Sister Mary Joseph nodule is a periumbilical metastatic implant signaling advanced intra-abdominal malignancy.",
      "The peritoneal cancer index quantifies disease burden and predicts whether complete cytoreduction is achievable.",
      "Completeness of cytoreduction drives survival far more than the choice of intraperitoneal agent.",
      "Malignant peritoneal mesothelioma is the asbestos-linked primary tumor of the peritoneum.",
    ],
  }, SOURCE),
  sourced({
    id: "block-pn-warning",
    type: "warning",
    heading: "Never rupture a mucocele",
    text: "Spillage converts a curable appendiceal lesion into iatrogenic pseudomyxoma peritonei. Avoid laparoscopic manipulation that risks perforation, resect en bloc with an intact serosa, and send peritoneal fluid for cytology.",
  }, SOURCE),
  references("block-pn-references", [SOURCE]),
];

export const peritonealNeoplasmsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000404",
  versionId: "00000000-0000-4000-8000-000000000414",
  slug: "peritoneal-neoplasms",
  title: "Peritoneal Neoplasms",
  aliases: ["pseudomyxoma peritonei", "jelly belly", "appendiceal mucocele", "LAMN", "HIPEC", "cytoreductive surgery", "peritoneal mesothelioma", "peritoneal carcinomatosis"],
  scoreNodeId: "abdomen-conditions",
  scoreCategory: "SCORE · General Abdomen · Diseases & Conditions",
  tags: ["general-abdomen", "peritoneal-surface", "hipec", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
