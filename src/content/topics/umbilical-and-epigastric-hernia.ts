import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-ue-summary",
    type: "summary",
    heading: "At a glance",
    text: "Umbilical and epigastric hernias are true midline fascial defects, and diastasis recti — the thing they are most often confused with — is not. That distinction decides everything, because a defect can incarcerate and a widened linea alba cannot. In children the umbilical ring usually closes on its own; in adults it never does. The genuinely difficult version of this topic is the cirrhotic patient with ascites, where the hernia is a symptom of portal pressure and the operation fails unless the ascites is addressed first.",
  }, SOURCE),
  sourced({
    id: "block-ue-compare",
    type: "table",
    heading: "Umbilical, epigastric, and diastasis compared",
    columns: ["Feature", "Umbilical hernia", "Epigastric hernia", "Diastasis recti"],
    rows: [
      ["Defect", "A true fascial defect at the umbilical ring", "A true fascial defect in the linea alba between xiphoid and umbilicus", "No fascial defect at all"],
      ["Mechanism", "Failure of the umbilical ring to close, or later stretching under sustained intra-abdominal pressure", "A gap at the point where a perforating vessel crosses the midline", "Widening of the linea alba with separation of the rectus bellies, the sheet itself intact but attenuated"],
      ["Usual content", "Preperitoneal fat, omentum, or bowel", "Incarcerated preperitoneal fat, which is why a tiny one can hurt a great deal", "Nothing, because there is no defect to hold anything"],
      ["Incarceration risk", "Real, and the reason adult hernias are repaired", "Real, and frequently already present at diagnosis", "None"],
      ["Examination", "Bulge at the umbilicus with a palpable ring", "Tender midline nodule above the umbilicus", "A midline ridge appearing on sit-up, with no edge to feel"],
      ["Management", "Repair in adults, observe in young children", "Repair, because the pain of trapped fat rarely settles", "Reassurance, since surgery is cosmetic and recurrence is high"],
    ],
  }, SOURCE),
  sourced({
    id: "block-ue-pediatric",
    type: "bullets",
    heading: "The pediatric umbilical hernia",
    items: [
      "Most umbilical hernias in children close on their own, and observation until about four or five years of age is the default.",
      "Repair earlier for incarceration, which is uncommon, or for a ring wide enough that spontaneous closure has become unlikely.",
      "A child with a ventriculoperitoneal shunt is repaired rather than watched, because shunt flow keeps the ring loaded and it will not close.",
      "The redundant skin that sits over a large infant hernia is not itself an indication to operate, since it settles once the ring closes.",
      "Adult umbilical hernias are acquired and never close spontaneously, so none of the pediatric reasoning transfers to them.",
    ],
  }, SOURCE),
  sourced({
    id: "block-ue-size",
    type: "table",
    heading: "Defect size drives the repair",
    columns: ["Defect", "Repair", "Reasoning"],
    rows: [
      ["Under 1 cm", "Primary suture repair is acceptable", "Recurrence after suture repair climbs steeply with defect width, and the smallest rings do well without a prosthesis"],
      ["1 to 4 cm", "Mesh repair, usually preperitoneal or retromuscular", "Arroyo's randomized trial of adult umbilical repair reported recurrence of roughly 11 percent after suture and about 1 percent after mesh"],
      ["Over 4 cm", "Retromuscular mesh, planned as a ventral hernia rather than as an umbilical one", "At this width the determinants are the same as for an incisional hernia: mesh position, overlap, and midline fascial closure"],
    ],
  }, SOURCE),
  sourced({
    id: "block-ue-cirrhosis",
    type: "flow",
    heading: "Umbilical hernia in cirrhosis with ascites",
    nodes: [
      { id: "cirrhotic", label: "Umbilical hernia in a patient with cirrhosis and ascites" },
      { id: "emergency", label: "Ruptured, incarcerated, or with necrosis of the overlying skin", tone: "caution" },
      { id: "stable", label: "Reducible with intact skin" },
      { id: "optimize", label: "Control the ascites with diuretics, paracentesis, or a transjugular intrahepatic portosystemic shunt", tone: "good" },
      { id: "elective", label: "Elective repair with mesh once ascites is controlled", tone: "good" },
      { id: "urgent", label: "Urgent repair without waiting for optimization", tone: "caution" },
      { id: "nomesh", label: "Primary repair with secure peritoneal closure, withholding mesh in a contaminated field", tone: "caution" },
    ],
    edges: [
      { from: "cirrhotic", to: "emergency", label: "emergency presentation" },
      { from: "cirrhotic", to: "stable", label: "no emergency" },
      { from: "stable", to: "optimize" },
      { from: "optimize", to: "elective" },
      { from: "emergency", to: "urgent" },
      { from: "urgent", to: "nomesh" },
    ],
  }, SOURCE),
  sourced({
    id: "block-ue-drain",
    type: "warning",
    heading: "No intraperitoneal drain after repair in an ascitic patient",
    text: "A drain left in the peritoneal cavity of a patient with ascites does not decompress the repair, it opens a controlled fistula. The losses are protein-rich and relentless, and they run to circulatory collapse, renal failure, and infection of the ascites. Manage postoperative ascites medically with sodium restriction and diuretics, escalate to paracentesis if the wound is under tension, and keep the peritoneal closure intact.",
  }, SOURCE),
  sourced({
    id: "block-ue-timing",
    type: "prose",
    heading: "Why elective beats emergent in cirrhosis",
    text: "The reflex to leave a cirrhotic patient's umbilical hernia alone is understandable and largely wrong. These hernias erode the skin and rupture, and mortality after emergency repair for rupture or incarceration is several times that of an elective repair in the same patient. What actually predicts the outcome is liver function rather than the hernia — MELD score and Child-Pugh class carry the risk, and a patient whose ascites can be controlled tolerates an elective repair far better than the same patient tolerates an emergency. So the sequence is to treat the portal hypertension, then repair the hernia electively with mesh, rather than to wait for the hernia to declare itself.",
  }, SOURCE),
  references("block-ue-references", [SOURCE]),
];

export const umbilicalAndEpigastricHerniaTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000504",
  versionId: "00000000-0000-4000-8000-000000000514",
  slug: "umbilical-and-epigastric-hernia",
  title: "Umbilical & Epigastric Hernia",
  aliases: ["umbilical hernia", "epigastric hernia", "diastasis recti", "linea alba", "midline hernia", "cirrhosis hernia", "ascites", "VP shunt", "Arroyo"],
  scoreNodeId: "hernia-conditions",
  scoreCategory: "SCORE · Hernia · Diseases & Conditions",
  tags: ["hernia", "abdominal-wall", "cirrhosis", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
