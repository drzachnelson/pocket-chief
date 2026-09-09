import type { Topic, TopicBlock, TopicVersion } from "@/lib/types";

/**
 * These blocks are written out by hand rather than through `sourced()`, unlike every other topic.
 *
 * That was once mandatory: `ensure_launch_topic` in the Supabase migrations rejected launch content
 * whose sha256 over `JSON.stringify(choledoBlocks)` did not match a pinned digest, so key order was
 * load-bearing. The static migration deleted that SQL, and with it the constraint — this file is now
 * an ordinary topic that simply has not been converted yet. `supportWarnings()` in the content
 * contract test guards it exactly as it guards the other forty-five.
 *
 * Re-authoring it through `sourced()` is safe and would be an improvement; it is only left alone
 * because that is a content change rather than part of the migration.
 */
const cited = (id: string, text: string) => ({ id, text, citationIds: ["00000000-0000-4000-8000-000000000102"], status: "cited" as const });
const citedUnits = (prefix: string, units: string[]) => units.map((text, index) => cited(`${prefix}-${index + 1}`, text));

const summaryBlock: TopicBlock = {
    id: "block-summary",
    type: "summary",
    heading: "At a glance",
    text: "Choose a duct-clearance strategy from stone burden, stone location, and duct anatomy. A favorable cystic duct and a small distal burden support a transcystic approach; larger, numerous, or proximal stones favor choledochotomy or ERCP.",
    claims: [cited("claim-summary", "Choose a duct-clearance strategy from stone burden, stone location, and duct anatomy. A favorable cystic duct and a small distal burden support a transcystic approach; larger, numerous, or proximal stones favor choledochotomy or ERCP.")],
  };
const comparisonBlock: TopicBlock = {
    id: "block-comparison",
    type: "table",
    heading: "Choose the route",
    columns: ["Feature", "Transcystic exploration", "Choledochotomy", "ERCP"],
    rows: [
      ["Primary route", "Cystic duct access", "Direct longitudinal CBD incision", "Transampullary endoscopic retrieval"],
      ["Favorable burden", "Small (<6 mm), few (<6), distal", "Large (>1 cm), numerous (>8), proximal", "Variable burden"],
      ["Anatomy", "Pliable, accessible cystic duct", "Dilated CBD (>8–10 mm)", "Patent ampulla"],
      ["Closure / drainage", "Clip cystic duct remnant", "Primary closure, stent, or T-tube", "Sphincterotomy"],
      ["Reported clearance", "Up to 95% with choledochoscopy", "High for complex burden", "Approximately 95% overall"],
    ],
    claims: citedUnits("claim-table", [
      "Primary route — Cystic duct access — Direct longitudinal CBD incision — Transampullary endoscopic retrieval",
      "Favorable burden — Small (<6 mm), few (<6), distal — Large (>1 cm), numerous (>8), proximal — Variable burden",
      "Anatomy — Pliable, accessible cystic duct — Dilated CBD (>8–10 mm) — Patent ampulla",
      "Closure / drainage — Clip cystic duct remnant — Primary closure, stent, or T-tube — Sphincterotomy",
      "Reported clearance — Up to 95% with choledochoscopy — High for complex burden — Approximately 95% overall",
    ]),
  };
const flowBlock: TopicBlock = {
    id: "block-flow",
    type: "flow",
    heading: "Transcystic decision flow",
    nodes: [
      { id: "ioc", label: "Stone on intraoperative cholangiogram" },
      { id: "favorable", label: "<6 stones · <6 mm · distal · pliable cystic duct", tone: "good" },
      { id: "unfavorable", label: ">8 stones · >1 cm · proximal · fragile/tortuous duct", tone: "caution" },
      { id: "ltcbde", label: "Transcystic choledochoscopy + clearance", tone: "good" },
      { id: "alternative", label: "Choledochotomy or intra/post-op ERCP", tone: "caution" },
    ],
    edges: [
      { from: "ioc", to: "favorable", label: "favorable" },
      { from: "ioc", to: "unfavorable", label: "relative contraindications" },
      { from: "favorable", to: "ltcbde" },
      { from: "unfavorable", to: "alternative" },
    ],
    claims: citedUnits("claim-flow", [
      "Stone on intraoperative cholangiogram",
      "<6 stones · <6 mm · distal · pliable cystic duct",
      ">8 stones · >1 cm · proximal · fragile/tortuous duct",
      "Transcystic choledochoscopy + clearance",
      "Choledochotomy or intra/post-op ERCP",
      "favorable",
      "relative contraindications",
    ]),
  };
const sequenceBlock: TopicBlock = {
    id: "block-sequence",
    type: "sequence",
    heading: "Choledochoscopy sequence",
    steps: [
      { title: "Define the anatomy", detail: "Use diagnostic IOC to confirm stone size, number, and position relative to the cystic duct insertion." },
      { title: "Dilate the cystic duct", detail: "Dilate sequentially with a balloon or bougie to accept the choledochoscope." },
      { title: "Prepare the duct", detail: "Administer IV glucagon and flush with warm saline." },
      { title: "Inspect directly", detail: "Advance the flexible choledochoscope and visualize the mucosa and stones." },
      { title: "Extract", detail: "Use a wire basket or Fogarty balloon under direct vision." },
      { title: "Document completion", detail: "Perform completion cholangiography or choledochoscopy to document clearance." },
    ],
    claims: citedUnits("claim-sequence", [
      "Define the anatomy: Use diagnostic IOC to confirm stone size, number, and position relative to the cystic duct insertion.",
      "Dilate the cystic duct: Dilate sequentially with a balloon or bougie to accept the choledochoscope.",
      "Prepare the duct: Administer IV glucagon and flush with warm saline.",
      "Inspect directly: Advance the flexible choledochoscope and visualize the mucosa and stones.",
      "Extract: Use a wire basket or Fogarty balloon under direct vision.",
      "Document completion: Perform completion cholangiography or choledochoscopy to document clearance.",
    ]),
  };
const warningBlock: TopicBlock = {
    id: "block-warning",
    type: "warning",
    heading: "Avoid forcing the transcystic route",
    text: "Relative contraindications in the supplied notes include more than eight stones, stones larger than 1 cm, common hepatic/intrahepatic stones, and a small, friable, or tortuous cystic duct.",
    claims: [cited("claim-warning", "Relative contraindications in the supplied notes include more than eight stones, stones larger than 1 cm, common hepatic/intrahepatic stones, and a small, friable, or tortuous cystic duct.")],
  };
const pearlsBlock: TopicBlock = {
    id: "block-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Age alone is not a contraindication to operative duct exploration.",
      "Repositioning may help move proximal stones distally for retrieval.",
      "Warm saline and glucagon are described as adjuncts for flushing small stones.",
      "Transcystic exploration avoids choledochotomy and T-tube morbidity when it succeeds.",
    ],
    claims: [
      cited("claim-pearl-age", "Age alone is not a contraindication to operative duct exploration."),
      cited("claim-pearl-position", "Repositioning may help move proximal stones distally for retrieval."),
      cited("claim-pearl-adjunct", "Warm saline and glucagon are described as adjuncts for flushing small stones."),
      cited("claim-pearl-morbidity", "Transcystic exploration avoids choledochotomy and T-tube morbidity when it succeeds."),
    ],
  };
const referencesBlock: TopicBlock = { id: "block-references", type: "references", heading: "Supplied sources", sourceIds: ["00000000-0000-4000-8000-000000000102"], claims: [] };

export const choledoBlocks: TopicBlock[] = [summaryBlock, pearlsBlock, flowBlock, comparisonBlock, sequenceBlock, warningBlock, referencesBlock];

const approvedVersion: TopicVersion = {
  id: "00000000-0000-4000-8000-000000000103",
  topicId: "00000000-0000-4000-8000-000000000101",
  versionNumber: 1,
  status: "approved",
  blocks: choledoBlocks,
  sourceIds: ["00000000-0000-4000-8000-000000000102"],
  scoreNodeId: "biliary",
  tags: ["biliary", "common-bile-duct", "absite", "score"],
  warnings: [],
  createdAt: "2026-08-12T00:00:00.000Z",
  reviewedAt: "2026-08-12T00:00:00.000Z",
  reviewedBy: "owner",
};

export const choledocholithiasisTopic: Topic = {
  id: "00000000-0000-4000-8000-000000000101",
  slug: "choledocholithiasis",
  title: "Choledocholithiasis",
  aliases: ["CBD stones", "common bile duct stones", "duct exploration", "LTCBDE"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: approvedVersion.tags,
  approvedVersion,
  versions: [approvedVersion],
  updatedAt: approvedVersion.reviewedAt!,
};
