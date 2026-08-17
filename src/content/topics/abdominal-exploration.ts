import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-lap-summary",
    type: "summary",
    heading: "At a glance",
    text: "An **exploratory laparotomy** has one order of operations: control hemorrhage, control contamination, then decide whether the patient's physiology can tolerate a definitive repair. The **lethal triad** of hypothermia, acidosis, and coagulopathy is the trigger to abbreviate, pack, and return in 24 to 48 hours.",
  }, SOURCE),
  sourced({
    id: "block-lap-indications",
    type: "bullets",
    heading: "Indications to explore",
    items: [
      "**Trauma**",
      "- Hemodynamic instability with a positive FAST or diagnostic peritoneal lavage",
      "- Peritonitis",
      "- Evisceration",
      "- Free intraperitoneal air",
      "- Diaphragmatic rupture",
      "- Intraperitoneal bladder rupture",
      "**Non-trauma**",
      "- Generalized peritonitis",
      "- Free perforation",
      "- Bowel ischemia or gangrene",
      "- Closed-loop obstruction",
      "- Toxic megacolon that fails medical therapy",
      "A positive FAST in a **stable patient** is an indication for CT, not automatically for laparotomy.",
    ],
  }, SOURCE),
  sourced({
    id: "block-lap-sequence",
    type: "sequence",
    heading: "Opening and surveying",
    steps: [
      { title: "Incise", detail: "**Midline** from xiphoid to pubic symphysis, for the exposure and the speed." },
      { title: "Evacuate and pack", detail: "Remove blood, clot, succus, and bile, then pack **all four quadrants**." },
      { title: "Control hemorrhage", detail: "Unpack **one quadrant** at a time and address bleeding before anything else." },
      { title: "Control contamination", detail: "**Staple or ligate** open bowel ends; definitive anastomosis waits for stable physiology." },
      { title: "Run the bowel", detail: "Follow from the **ligament of Treitz** to the ileocecal valve, inspecting both sides of the bowel and its mesentery." },
      { title: "Inspect the rest", detail: "Liver, spleen, stomach including the **lesser sac**, colon, and retroperitoneum before closing." },
    ],
  }, SOURCE),
  sourced({
    id: "block-lap-maneuvers",
    type: "table",
    heading: "Exposure maneuvers",
    columns: ["Maneuver", "What is mobilized", "What it exposes"],
    rows: [
      ["Kocher", "Duodenum reflected medially along its lateral peritoneal attachment", "**Retroperitoneal duodenum**, pancreatic head, infrahepatic vena cava, right renal vessels"],
      ["Cattell-Braasch", "Right colon and small bowel mesentery rotated right to left", "Entire infrahepatic **inferior vena cava** and the right retroperitoneum"],
      ["Mattox", "Left colon, spleen, stomach, pancreas, and left kidney rotated left to right", "The whole **abdominal aorta** from the hiatus to the bifurcation"],
    ],
  }, SOURCE),
  sourced({
    id: "block-lap-zones",
    type: "table",
    heading: "Retroperitoneal hematoma zones",
    columns: ["Zone", "Location", "Blunt versus penetrating"],
    rows: [
      ["Zone I, central", "Midline — aorta, vena cava, pancreaticoduodenal region", "**Explore** both mechanisms"],
      ["Zone II, lateral", "Perinephric and paracolic gutters", "Blunt: leave a **stable, non-expanding** hematoma alone · Penetrating: explore"],
      ["Zone III, pelvic", "Pelvic retroperitoneum", "Blunt: **do not open** — pack and consider angioembolization · Penetrating: explore"],
    ],
  }, SOURCE),
  sourced({
    id: "block-lap-damage-control",
    type: "flow",
    heading: "Damage control decision",
    nodes: [
      { id: "controlled", label: "Hemorrhage and contamination controlled" },
      { id: "warm", label: "Warm, correcting, coagulating normally", tone: "good" },
      { id: "triad", label: "Hypothermia, acidosis, and coagulopathy", tone: "caution" },
      { id: "definitive", label: "Definitive repair and fascial closure", tone: "good" },
      { id: "abbreviate", label: "Abbreviate — pack, shunt, staple, and place a temporary abdominal closure", tone: "caution" },
      { id: "icu", label: "ICU rewarming, correction of coagulopathy, and balanced resuscitation" },
      { id: "relook", label: "Planned re-exploration at 24 to 48 hours for definitive reconstruction", tone: "good" },
    ],
    edges: [
      { from: "controlled", to: "warm", label: "physiology intact" },
      { from: "controlled", to: "triad", label: "lethal triad" },
      { from: "warm", to: "definitive" },
      { from: "triad", to: "abbreviate" },
      { from: "abbreviate", to: "icu" },
      { from: "icu", to: "relook" },
    ],
  }, SOURCE),
  sourced({
    id: "block-lap-acs",
    type: "warning",
    tone: "danger",
    heading: "Abdominal compartment syndrome after the operation",
    text: "A tight closure — and sometimes even an open abdomen — can still decompensate. Sustained bladder pressure **above 20 mmHg** with new organ dysfunction, meaning rising airway pressures, oliguria, or a falling cardiac output, is abdominal compartment syndrome and calls for **decompressive laparotomy** rather than diuresis.",
  }, SOURCE),
  sourced({
    id: "block-lap-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Damage control** trades an anatomically perfect repair for a physiologically survivable one.",
      "Resuscitate with **balanced ratios** rather than crystalloid, which worsens coagulopathy and bowel edema.",
      "**Temporary abdominal closure** with a negative pressure device manages the open abdomen between operations.",
      "The longer the abdomen stays open, the lower the chance of **primary fascial closure**.",
    ],
  }, SOURCE),
  references("block-lap-references", [SOURCE]),
];

export const abdominalExplorationTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000405",
  versionId: "00000000-0000-4000-8000-000000000415",
  slug: "abdominal-exploration",
  title: "Abdominal Exploration",
  aliases: ["exploratory laparotomy", "ex lap", "damage control surgery", "Kocher maneuver", "Cattell-Braasch", "Mattox maneuver", "retroperitoneal hematoma", "abdominal compartment syndrome"],
  scoreNodeId: "abdomen-procedures",
  scoreCategory: "SCORE · General Abdomen · Operations & Procedures",
  tags: ["general-abdomen", "trauma", "damage-control", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
