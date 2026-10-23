import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  COLONIC_VOLVULUS_OE_SOURCE as OE,
  FISER_COLORECTAL_SOURCE as FISER,
  SCORE_COLONIC_VOLVULUS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-colonic-volvulus-and-obstruction/1-packet.md (S1 SCORE Colonic
// Volvulus and Obstruction, S2 Fiser chapter 36), checked against the folder's OpenEvidence document. Packet blocks are
// carried as written; the split table holds every packet FLAG plus the OpenEvidence document's current-practice
// positions. The mechanical and pseudo-obstruction cecal thresholds stay separate, as the packet requires.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-cv-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Large bowel obstruction is most commonly caused by malignancy, diverticulitis, and volvulus, and it presents with abdominal pain, distension, and obstipation. The cecum is the segment at greatest perforation risk because, by the law of Laplace, wall tension is highest where the diameter is largest, and a competent ileocecal valve converts a distal obstruction into a closed loop. Sigmoid volvulus, the most common volvulus, twists around the inferior mesenteric artery pedicle and is managed in a nontoxic patient by endoscopic decompression followed by sigmoid resection during the same admission. Cecal volvulus, which twists around the ileocolic pedicle, is not decompressed endoscopically and requires resection. Any patient with peritonitis or systemic toxicity suggesting ischemia or perforation goes directly to emergency operation and resection.",
  }, SCORE),

  sourced({
    id: "block-cv-anatomy-physiology-diagnosis",
    type: "bullets",
    heading: "Anatomy, physiology, and diagnosis",
    items: [
      "The superior mesenteric artery supplies the proximal colon and first two-thirds of the transverse colon, while the inferior mesenteric artery supplies the distal third of the transverse colon, the descending and sigmoid colon, and the upper rectum, with collateral flow through the marginal artery at the splenic flexure.",
      "An elongated or narrowed mesentery predisposes to volvulus; chronic constipation can produce a redundant colon with an elongated mesentery that can twist.",
      "As intraluminal pressure rises in obstruction, ischemia and then necrosis develop once pressure exceeds first venous pressure and then capillary perfusion pressure of the bowel wall.",
      "An incompetent ileocecal valve lets a distal obstruction decompress into the small bowel, producing small bowel dilation and vomiting instead of a closed loop.",
      "An obstructing stricture or mass on imaging should be considered malignant until proven otherwise.",
      "Sigmoid volvulus produces an omega or coffee-bean sign on plain radiography, while cecal volvulus typically shows a dilated loop of colon displaced to the left upper quadrant.",
      "CT of the abdomen and pelvis is useful in most cases to locate the transition point from dilated to decompressed colon and to characterize the etiology.",
      "Dilation of the entire colon and rectum on CT without a discrete transition point suggests a functional rather than mechanical obstruction.",
      "A nontoxic patient should have a complete blood count, a metabolic profile, and a lactic acid level as part of the laboratory workup.",
      "Screening endoscopy for colorectal cancer should begin at age 45 in asymptomatic patients without risk factors for earlier screening, which prevents neoplastic obstruction.",
    ],
  }, SCORE),

  sourced({
    id: "block-cv-obstructed-colon-by-etiology",
    type: "table",
    heading: "The obstructed colon by etiology",
    columns: ["Etiology", "Anatomic basis", "Signature imaging finding", "First move in a nontoxic patient"],
    rows: [
      ["Sigmoid volvulus", "The sigmoid twists around the inferior mesenteric artery pedicle on an elongated mesentery.", "An omega or coffee-bean sign appears on plain radiography.", "Endoscopic decompression is followed by sigmoid resection during the same admission."],
      ["Cecal volvulus", "The cecum twists around the ileocolic pedicle.", "A dilated colonic loop is displaced to the left upper quadrant on plain films.", "Surgical resection is required because endoscopic decompression is not the treatment."],
      ["Malignant obstruction", "A tumor narrows the lumen, most dangerously in the left colon.", "A stricture or mass with a transition point appears on CT.", "Oncologic resection is planned, with diversion or stent placement when an R0 operation is not feasible."],
      ["Colonic pseudo-obstruction", "The entire colon dilates from dysmotility without a mechanical blockage.", "CT shows dilation of the whole colon and rectum with no discrete transition point.", "Mechanical obstruction is excluded and supportive care begins while decompression options are weighed."],
    ],
  }, SCORE),

  sourced({
    id: "block-cv-sigmoid-volvulus-decompress",
    type: "flow",
    heading: "Sigmoid volvulus: decompress, then resect",
    nodes: [
      { id: "start", label: "A patient presents with pain, distension, and obstipation, and imaging shows a sigmoid volvulus." },
      { id: "toxic", label: "A patient with peritonitis, systemic toxicity, or imaging suggesting ischemia or perforation needs no further workup before the operating room.", tone: "caution" },
      { id: "emergency", label: "Emergency operation with resection of the compromised sigmoid is performed, usually without a primary anastomosis." },
      { id: "stable", label: "A patient without toxicity or peritonitis is a candidate for endoscopic decompression first." },
      { id: "detorsion", label: "Endoscopic decompression untwists the volvulus and decompresses the colon, confirmed by a rush of gas and stool." },
      { id: "resection", label: "Sigmoid colectomy is performed during the same admission after decompression, because decompression alone leaves a high recurrence risk.", tone: "good" },
    ],
    edges: [
      { from: "start", to: "toxic", label: "Toxicity is assessed before any endoscopic attempt." },
      { from: "start", to: "stable", label: "Absence of toxicity opens the endoscopic pathway." },
      { from: "toxic", to: "emergency", label: "Ischemia or perforation mandates emergency resection." },
      { from: "stable", to: "detorsion", label: "Endoscopic decompression is the first treatment for uncomplicated sigmoid volvulus." },
      { from: "detorsion", to: "resection", label: "Successful decompression converts an emergency into a same-admission semielective resection." },
    ],
  }, SCORE),

  sourced({
    id: "block-cv-ogilvie-syndrome-stepup-mana",
    type: "sequence",
    heading: "Ogilvie syndrome step-up management",
    steps: [
      { title: "Supportive correction", detail: "Fluid resuscitation, replacement of potassium and magnesium, bowel rest with nasogastric decompression, and stopping opioids and anticholinergics that slow the gut are the initial treatment." },
      { title: "Neostigmine", detail: "Neostigmine is given in a monitored setting when the cecum exceeds 12 cm, there is no improvement after 3 days, or the duration exceeds 4 days, with atropine available for the resulting bradycardia." },
      { title: "Colonoscopic decompression", detail: "Colonoscopic decompression is the third-line step when neostigmine fails." },
      { title: "Operation", detail: "Surgery is indicated for perforation, gangrenous colitis, or no improvement after 6 days, with the extent of resection set by intraoperative findings." },
    ],
  }, FISER),

  sourced({
    id: "block-cv-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser's ABSITE Review keys the classic volvulus demographics and numbers: sigmoid volvulus occurs in elderly, debilitated, psychiatric, and neurologically impaired patients and in high-fiber-diet populations, colonoscopic decompression reduces about 80% of cases, and about 50% recur without resection \u2014 which is exactly why SCORE also mandates same-admission sigmoidectomy after decompression. For the cecum, Fiser keys right hemicolectomy with primary anastomosis as the best treatment and reserves cecopexy for a frail patient with viable colon while advising against cecostomy, whereas SCORE frames cecopexy and tube cecostomy as historical options that are rarely appropriate. Fiser also supplies the pseudo-obstruction thresholds SCORE states only in principle: perforation risk climbs with a cecum over 12 cm or a duration over 6 days.",
  }, FISER),

  sourced({
    id: "block-cv-closed-loop-laplace-anastomo",
    type: "warning",
    heading: "Closed loop, Laplace, and the anastomosis trap",
    text: "A competent ileocecal valve makes any distal obstruction a closed loop, and the cecum \u2014 the widest, most distensible segment \u2014 perforates first as wall tension rises with diameter. Do not attempt endoscopic decompression in a patient with gangrenous bowel, diffuse peritoneal signs, or full-thickness injury. In the emergency setting a primary anastomosis is usually ill-advised because of bowel size mismatch and hemodynamic instability; left-sided emergencies are typically managed with a segmental colectomy and end colostomy (Hartmann procedure) or a subtotal colectomy, while a stable patient with a right-sided obstruction can have a right colectomy with an ileocolic anastomosis. When resection is for cancer, oncologic principles still apply: high ligation of the vascular pedicle for an adequate lymph node harvest and 5-cm proximal and distal margins.",
  }, SCORE),

  sourcedUnits({
    id: "block-cv-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Plain-film signs", "Fiser: sigmoid volvulus is the bent inner tube with its apex to the right upper quadrant; the coffee bean belongs to cecal volvulus, a dilated cecum pointing to the left upper quadrant", "SCORE: sigmoid volvulus gives the omega or coffee-bean sign, and cecal volvulus is a dilated loop displaced to the left upper quadrant"],
      ["Cecal volvulus with viable bowel", "Fiser: cecopexy is acceptable for a frail patient with viable colon; avoid cecostomy", "SCORE: cecopexy and tube cecostomy are historical and rarely appropriate; resection is preferred even when the cecum is viable"],
      ["Primary anastomosis for sigmoid volvulus", "Fiser: sigmoidectomy with primary anastomosis after decompression, in the same admission", "SCORE: primary anastomosis is usually ill-advised in an emergency operation and is reserved for select stable patients; the setting, semielective after decompression or emergency for ischemia, decides"],
      ["Ogilvie syndrome thresholds", "Fiser alone: neostigmine at a cecum over 12 cm or no improvement by 3 days, and operation by about 6 days", "ASCRS and ASGE: neostigmine after 48 to 72 hours of failed supportive care; a cecum over 12 cm leaves the supportive-only pathway"],
      ["Cecal diameter that threatens perforation in mechanical obstruction", "Neither packet source gives a number; SCORE states the law of Laplace qualitatively, and Fiser's 12 cm belongs to pseudo-obstruction", "The OpenEvidence document (ACS): over 9 cm in mechanical large bowel obstruction; pseudo-obstruction risk is about 7% at 12 to 14 cm and 23% above 14 cm"],
      ["Endoscopic decompression of sigmoid volvulus", "Fiser: about 80% success and about 50% recurrence without resection", "ASCRS: 60% to 95% success, with 43% to 75% recurrence, so resect during the same admission after preparing the bowel"],
      ["First diagnostic study", "Contrast enema to diagnose volvulus or obstruction", "CT first, with an enema only for equivocal cases and never barium when perforation is possible"],
      ["Obstructing left-sided colon cancer", "A three-stage operation or a Hartmann procedure", "Individualized one-stage resection with or without anastomosis or diverting ileostomy, a stent or stoma as a bridge to surgery, and Hartmann for the unfit or fecal peritonitis"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE, OE], [FISER, SCORE], [FISER, OE], [SCORE, FISER, OE], [FISER, OE], [OE], [OE]]),

  references("block-cv-references", [SCORE, FISER, OE]),
];

export const colonicVolvulusAndObstructionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005720",
  versionId: "00000000-0000-4000-8000-000000005721",
  slug: "colonic-volvulus-and-obstruction",
  title: "Colonic Volvulus and Obstruction",
  aliases: ["large bowel obstruction", "LBO", "colonic obstruction", "sigmoid volvulus", "cecal volvulus", "colonic volvulus", "colonic pseudo-obstruction", "Ogilvie syndrome", "acute colonic pseudo-obstruction", "coffee bean sign", "omega sign", "neostigmine"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "large-bowel-obstruction", "colonic-volvulus", "sigmoid-volvulus", "cecal-volvulus", "ogilvie-syndrome", "endoscopic-decompression", "colorectal", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
