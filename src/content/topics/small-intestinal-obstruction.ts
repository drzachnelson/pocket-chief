import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_SMALL_BOWEL_SOURCE as FISER,
  SCORE_SMALL_INTESTINAL_OBSTRUCTION_SOURCE as SCORE,
  SMALL_INTESTINAL_OBSTRUCTION_OE_SOURCE as OE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-small-intestinal-obstruction/1-packet.md (S1 SCORE Small Intestinal
// Obstruction, S2 Fiser chapter 35), checked against the folder's OpenEvidence document. Packet blocks are carried
// as written; the split table holds every packet FLAG plus the OpenEvidence document's current-practice positions.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-sb-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Small intestinal obstruction is a mechanical blockage of the small bowel whose three most common causes are adhesive disease from prior surgery, hernia, and malignancy. Obstruction produces nausea, vomiting, crampy abdominal pain, distension, and reduced bowel function, and vomiting classically drives a hypokalemic, hypochloremic metabolic alkalosis that is corrected with isotonic fluid resuscitation. CT with IV contrast is the diagnostic procedure of choice because it identifies the transition point from distended proximal bowel to decompressed distal bowel and can reveal a closed loop obstruction. Adhesive obstruction without peritonitis or bowel compromise is managed with a time-limited trial of bowel rest, resuscitation, and nasogastric decompression, while peritonitis, internal hernia, mesenteric swirling, or bowel compromise mandates immediate operation.",
  }, SCORE),

  sourced({
    id: "block-sb-causes-physiology-presentati",
    type: "bullets",
    heading: "Causes, physiology, and presentation",
    items: [
      "The three most common causes of acute small bowel obstruction are adhesions, hernia, and malignancy.",
      "Gallstone ileus is a rare cause that usually occurs in elderly patients with multiple comorbidities.",
      "Vomiting loses hydrogen and chloride ions as hydrochloric acid, raising bicarbonate and producing a hypochloremic metabolic alkalosis.",
      "Renal compensation retains hydrogen ions while excreting potassium, producing the classic hypokalemic, hypochloremic metabolic alkalosis.",
      "Resuscitation replaces volume lost to emesis and corrects electrolytes with isotonic fluids such as lactated Ringer solution.",
      "A cholecystoenteric fistula forms by pressure necrosis from a large gallstone, and a passed stone obstructs most commonly at or just proximal to the ileocecal valve.",
      "The intermittent symptoms as a gallstone travels through the intestine are called a tumbling obstruction.",
      "Presenting symptoms are nausea and vomiting, anorexia, crampy abdominal pain, and reduced bowel function.",
      "Examination shows abdominal distention, tenderness, and tympany on percussion.",
      "Every patient must be examined for abdominal wall and inguinal hernias, including epigastric, incisional, umbilical, spigelian, inguinal, and femoral hernias, because any hernia containing bowel can obstruct.",
      "Currant jelly stool, a mixture of sloughed mucosa, blood, mucus, and stool, suggests small bowel intussusception.",
      "In intussusception the inner segment is the intussusceptum and the outer segment is the intussuscipiens, and a sausage-like structure may be palpated.",
    ],
  }, SCORE),

  sourced({
    id: "block-sb-obstruction-patterns-by-leve",
    type: "table",
    heading: "Obstruction patterns by level and loop type",
    columns: ["Pattern", "Pain pattern", "Vomiting and distension pattern"],
    rows: [
      ["Proximal small bowel open loop", "Pain in proximal obstruction is intermittent, intense, and colicky, and is often relieved by vomiting.", "Vomiting in proximal obstruction is large-volume, bilious, and frequent, while distension is absent and tenderness is epigastric or periumbilical."],
      ["Distal small bowel open loop", "Pain in distal obstruction is intermittent to constant, with diffuse and progressive tenderness.", "Vomiting in distal obstruction is low in volume and frequency and becomes progressively feculent, while distension is moderate to marked."],
      ["Small bowel closed loop", "Pain in closed loop obstruction is progressive and rapidly worsens, with diffuse progressive tenderness.", "Vomiting in closed loop obstruction may be prominent and reflex, while distension is often absent despite obstipation that may not be present."],
    ],
  }, FISER),

  sourced({
    id: "block-sb-imaging-diagnosis",
    type: "bullets",
    heading: "Imaging diagnosis",
    items: [
      "Plain films in obstruction show air-fluid levels, gastric and small bowel distention, and coin stacking from thickened adjacent folds of small bowel.",
      "CT with IV contrast is the diagnostic imaging procedure of choice for bowel obstruction.",
      "A transition point is a sudden change from distended bowel proximally to decompressed bowel distally and usually marks the site of obstruction.",
      "A closed loop obstruction is obstruction at two distinct areas of bowel, so two transition points may be identified and the entire small bowel must be examined because they may not be adjacent.",
      "Findings suggesting closed loop obstruction or ischemia include swirling of the mesentery, pneumatosis intestinalis, and portal venous gas.",
      "The target sign on cross-sectional imaging results from telescoping of the intussusceptum within the intussuscipiens in intussusception.",
      "Plain films in gallstone ileus show obstruction findings plus a calcified gallstone outside the biliary tree and pneumobilia.",
      "Adult intussusception lead points are most commonly malignancy, polyps, and benign masses, whereas most childhood intussusception is idiopathic, with Meckel diverticulum, lymphoid hyperplasia, and polyps as other causes.",
    ],
  }, SCORE),

  sourced({
    id: "block-sb-adhesive-obstruction-trial-n",
    type: "flow",
    heading: "Adhesive obstruction: trial of nonoperative care versus operation",
    nodes: [
      { id: "start", label: "A patient presents with a mechanical small bowel obstruction attributed to adhesive disease." },
      { id: "resuscitate", label: "Initial care is bowel rest, isotonic fluid resuscitation to correct hypokalemic hypochloremic metabolic alkalosis, and nasogastric decompression." },
      { id: "redflags", label: "Peritonitis, mesenteric swirling, internal hernia, or evidence of bowel compromise requires immediate operative intervention without a prolonged trial.", tone: "caution" },
      { id: "gastrografin", label: "A Gastrografin challenge is followed with serial abdominal radiographs to judge transit of contrast through the small bowel into the colon." },
      { id: "operate", label: "Delayed contrast transit, usually beyond 12 hours, stasis in the small bowel, or a worsening abdominal examination means nonoperative management has failed and surgery is pursued." },
    ],
    edges: [
      { from: "start", to: "resuscitate", label: "Resuscitation and decompression begin for every adhesive obstruction." },
      { from: "resuscitate", to: "redflags", label: "Any sign of compromise at presentation or during the trial short-circuits nonoperative care." },
      { from: "resuscitate", to: "gastrografin", label: "A patient without compromise receives a time-limited trial augmented by enteric contrast." },
      { from: "gastrografin", to: "operate", label: "Failure of contrast to progress or clinical worsening triggers operative management." },
    ],
  }, SCORE),

  sourced({
    id: "block-sb-operation-gallstone-ileus",
    type: "sequence",
    heading: "Operation for gallstone ileus",
    steps: [
      { title: "Run the entire bowel", detail: "The entire bowel is run at laparotomy to look for additional stones beyond the obstructing stone." },
      { title: "Milk the stone proximally", detail: "The obstructing stone is milked back away from the ileocecal valve to healthier, less edematous bowel." },
      { title: "Enterotomy and stone removal", detail: "An enterotomy is created to remove the stone, with small bowel resection performed instead if the bowel requires it." },
      { title: "Omit cholecystectomy", detail: "Cholecystectomy is typically not indicated at the gallstone ileus operation." },
    ],
  }, SCORE),

  sourced({
    id: "block-sb-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser keys the nonoperative success rates that SCORE does not quantify: bowel rest, nasogastric tube, and IV fluids cure 80% of partial small bowel obstructions and 40% of complete obstructions, and Fiser lists progressing pain, peritoneal signs, fever, and increasing white blood cell count as the surgical indications signaling strangulation or perforation. SCORE agrees that worsening examination and failure to progress after a time-limited trial mandate surgery, but adds the Gastrografin transit test and immediate-operation imaging findings (mesenteric swirling, internal hernia, bowel compromise) that Fiser does not detail. Fiser also stratifies causes by surgical history \u2014 hernia is the most common small bowel cause without prior surgery and adhesions the most common with prior surgery, while cancer is the most common large bowel cause in both settings \u2014 where SCORE lists adhesions, hernia, and malignancy together as the three most common causes.",
  }, FISER),

  sourced({
    id: "block-sb-closed-loop-obstruction-stra",
    type: "warning",
    heading: "Closed loop obstruction and strangulation risk",
    text: "A closed loop obstruction must not be given a prolonged nonoperative trial, because obstruction at two points traps a segment whose blood supply is threatened, and CT clues are mesenteric swirling as seen in internal hernias, pneumatosis intestinalis, and portal venous gas. Peritonitis at any point likewise mandates immediate operative intervention. In adults, intussusception is treated operatively with resection of the intussuscepted bowel including the lead point because the lead point is typically a neoplasm, whereas in children reduction by air enema is attempted up to two times before operative reduction.",
  }, SCORE),

  sourcedUnits({
    id: "block-sb-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["How often nonoperative care works", "Fiser: bowel rest, nasogastric decompression and fluids cure 80% of partial and 40% of complete obstructions", "SCORE gives a time-limited trial without success rates; per the OpenEvidence document (EAST), complete obstruction without ischemia may still get a monitored trial"],
      ["Water-soluble contrast challenge", "SCORE: delayed transit beyond about 12 hours, a protocol-dependent cutoff, predicts the need for operation", "WSES, ACR and ACS use contrast not reaching the colon by 24 hours as the failure endpoint; some protocols check at 4 to 8 hours"],
      ["Ileus or obstruction", "Fiser: ileus dilates stomach, small bowel, colon and rectum uniformly, with absent bowel sounds and no passage of gas", "Obstruction has decompressed bowel beyond a transition point; SCORE covers mechanical obstruction and does not restate the ileus criteria"],
      ["A short small bowel intussusception on CT", "Fiser: an incidental segment under 3 cm without a lead point is likely normal peristalsis and is observed", "SCORE: a symptomatic adult intussusception with a lead point is resected; each rule applies in its own context"],
      ["Recognizing strangulation", "Fiser: progressing pain, peritoneal signs, fever and a rising white count signal strangulation", "Clinical signs detect ischemia in only 40% to 50%; adding CT raises detection to 70% to 96%"],
      ["First imaging study", "An obstruction series first: air-fluid levels, a step-ladder pattern and no colonic gas", "CT first; plain films are kept for following contrast transit"],
      ["How long to wait", "Never let the sun rise or set on a bowel obstruction", "A 72-hour nonoperative trial (WSES), and operation if function has not returned by 5 days (EAST)"],
      ["Obstruction in a virgin abdomen", "No prior operation and no hernia means mandatory exploration", "If CT shows no lesion and no ischemia, a monitored nonoperative trial is increasingly used, with a low threshold to operate"],
    ],
  }, [[FISER, SCORE, OE], [SCORE, OE], [FISER, SCORE], [FISER, SCORE], [FISER, OE], [OE], [OE], [OE]]),

  sourced({
    id: "block-sb-bypass",
    type: "warning",
    heading: "After Roux-en-Y gastric bypass",
    text: "Small bowel obstruction after Roux-en-Y gastric bypass is an internal hernia until proven otherwise and goes to the operating room, even when the examination is benign.",
  }, OE),

  references("block-sb-references", [SCORE, FISER, OE]),
];

export const smallIntestinalObstructionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005420",
  versionId: "00000000-0000-4000-8000-000000005421",
  slug: "small-intestinal-obstruction",
  title: "Small Intestinal Obstruction",
  aliases: ["small bowel obstruction", "SBO", "adhesive small bowel obstruction", "adhesive obstruction", "closed loop obstruction", "gallstone ileus", "Gastrografin challenge", "water-soluble contrast challenge", "adult intussusception"],
  scoreNodeId: "small-intestine-conditions",
  scoreCategory: "SCORE · Small Intestine · Diseases & Conditions",
  tags: ["small-intestine", "small-bowel-obstruction", "adhesions", "closed-loop", "strangulation", "gallstone-ileus", "intussusception", "nasogastric-decompression", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
