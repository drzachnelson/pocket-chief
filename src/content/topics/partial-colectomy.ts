import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ASCRS_COLON_CANCER_2022_SOURCE as ASCRS,
  PARTIAL_COLECTOMY_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/partial-colectomy-pocket-chief.docx (2026-11-09). Inline citations stripped at the owner's
// request and kept in the source details. The packet's corrections table becomes the split table. Diverticulitis,
// volvulus, and C. difficile are condensed to the operative decision because each has its own topic.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-pc-summary",
    type: "summary",
    heading: "At a glance",
    text: "A partial (segmental) colectomy removes a colonic segment with its mesentery, defined by the vascular pedicles divided, followed by anastomosis or stoma. For cancer the resection follows lymphovascular drainage: **named vessel ligated at its origin, en bloc mesentery, 5–7 cm margins, and at least 12 nodes**. Bowel preparation is mechanical prep plus oral antibiotics, laparoscopy matches open surgery oncologically, and the benign indications have moved away from episode counts toward complications, physiology, and anastomosis over Hartmann in the stable patient.",
  }, PACKET),

  sourced({
    id: "block-pc-anatomy",
    type: "bullets",
    heading: "Anatomy and oncologic principle",
    items: [
      "Ligate the named feeding vessel at its origin with en bloc mesentery; positive nodes left behind make the resection R2.",
      "The proximal two-thirds of the transverse colon is midgut (SMA) and the distal third hindgut (IMA). The splenic flexure is a watershed (Griffiths point), so its lymphatic drainage varies.",
      "SMA branches: ileocolic, an inconstant right colic, and the middle colic with right and left branches. IMA branches: left colic, sigmoid branches, and superior rectal.",
      "The IMV runs separately, lateral to the ligament of Treitz, and is divided at the inferior border of the pancreas for left-sided and sigmoid cancers.",
      "After high IMA ligation, the marginal artery of Drummond carries the anastomotic blood supply, which is why perfusion assessment matters on the left.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-extent",
    type: "table",
    heading: "Resection extent by location",
    columns: ["Operation", "Typical indication", "Vessels divided at origin"],
    rows: [
      ["Right hemicolectomy", "Cecum, ascending colon", "Ileocolic and right colic if present; ASCRS adds the right branch of the middle colic"],
      ["Extended right hemicolectomy", "Hepatic flexure, proximal or mid transverse", "Ileocolic, right colic, and the middle colic trunk"],
      ["Transverse colectomy", "Mid transverse", "Middle colic"],
      ["Splenic flexure resection", "Splenic flexure", "Left branch of the middle colic and the ascending left colic"],
      ["Left hemicolectomy", "Descending colon", "Inferior mesenteric artery"],
      ["Sigmoid colectomy", "Sigmoid", "IMA, or superior rectal and left colic at their origins, with the IMV at the pancreas"],
      ["Total abdominal colectomy", "Synchronous disease, Lynch syndrome, fulminant colitis", "Ileocolic, right colic, middle colic, and IMA"],
    ],
  }, PACKET),

  sourced({
    id: "block-pc-extent-notes",
    type: "bullets",
    heading: "↳ Where extent is debated",
    items: [
      "**Hepatic flexure**: extended right hemicolectomy yields more nodes but no survival benefit in retrospective series; either operation is accepted, and the classic board answer is often extended right.",
      "**Splenic flexure**: segmental splenic flexure colectomy, left hemicolectomy, and extended right hemicolectomy are all acceptable, with no OS difference; extended right raises postoperative ileus (OR 3.47).",
      "**Transverse colon**: segmental against extended data are inconsistent, and one national database study linked extended resection to lower adjusted survival (HR 1.07), so individualize.",
      "Margins are 5–7 cm longitudinally, with mesentery to the origin of the named vessel and at least 12 nodes; complete mesocolic excision uses about 10 cm.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "**Neoplasia**: colon adenocarcinoma, an endoscopically unresectable polyp, or a malignant polyp with unfavorable histology, a fragmented specimen, or an indeterminate margin. About 20% of colon cancers present emergently with bleeding, perforation, or obstruction.",
      "**Diverticular disease**: elective for fistula, stricture, obstruction, after an abscess, or for symptom burden; emergent for diffuse peritonitis or failed medical therapy.",
      "**Volvulus**: sigmoid (most common in the US, in elderly, institutionalized, constipated, or neuropsychiatric patients) and cecal.",
      "Other: colonic ischemia, ileocecal Crohn disease, iatrogenic perforation, bleeding, and obstruction.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-preop",
    type: "bullets",
    heading: "Preoperative workup and preparation",
    items: [
      "Cancer: complete colonoscopy (repeat 3–6 months after surgery if it was incomplete), CT chest, abdomen, and pelvis, CBC, chemistry, and CEA, with no routine PET/CT; MMR/MSI testing and family-history assessment; tattoo small lesions before minimally invasive surgery.",
      "Clinical T4b or bulky nodes (pMMR): consider neoadjuvant FOLFOX or CAPEOX; dMMR opens a neoadjuvant checkpoint inhibitor option.",
      "After complicated diverticulitis, colonoscopy excludes cancer, which was missed in up to 8% of inflamed segments in the SCANDIV lavage arm.",
      "**Mechanical bowel prep plus oral antibiotics** is recommended before elective colorectal resection (strong, 1B): against prep alone, SSI RR 0.55 and anastomotic leak OR 0.45. Mechanical prep alone does not reduce SSI or leak, and oral antibiotics alone still reduce SSI when prep is contraindicated.",
      "**Ureteral stents are selective**: they do not reduce injury, add 46–49 minutes, and increase urinary infection and hematuria. Reserve them for a reoperative or irradiated pelvis, a large inflammatory mass, distorted anatomy, or obesity, where they may aid recognition. Baseline injury is about 0.6%, and intraoperative recognition improves outcomes (OR 0.22 for management failure).",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-staging",
    type: "bullets",
    heading: "Classification that changes the operation",
    items: [
      "**Modified Hinchey**: I pericolic abscess, II pelvic or distant abscess, III purulent peritonitis, IV feculent peritonitis. Phlegmon or extraluminal gas alone is not complicated disease.",
      "At least 12 nodes establish N stage, and fewer than 12 is a high-risk stage II feature; isolated tumor cells under 0.2 mm are N0, micrometastases of 0.2–2.0 mm are positive, and tumor deposits without positive nodes are N1c.",
      "A national database analysis supports at least 18 nodes, with more stage III detection and better OS, but this is not yet guideline.",
      "High-risk stage II features: poor differentiation, lymphovascular invasion, obstruction, fewer than 12 nodes, perineural invasion, localized perforation, close or positive margins, and high-tier budding.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-technique",
    type: "sequence",
    heading: "Operative conduct",
    steps: [
      { title: "Position", detail: "Supine for right colectomy; **modified lithotomy** (split-leg or stirrups) for left, sigmoid, and splenic flexure work, for the transanal stapler and the sigmoidoscopic leak test. Pad and secure for steep Trendelenburg and tilt." },
      { title: "Choose the plane", detail: "Lateral-to-medial along the white line of Toldt into the plane between mesocolon and Gerota's fascia, or medial-to-lateral, the usual laparoscopic route, ligating the pedicle first and lifting the mesentery before lateral release." },
      { title: "Enter on the right", detail: "Score the peritoneum under the ileocolic pedicle, use the avascular window between ileocolic and middle colic vessels, and find the duodenum early." },
      { title: "Anastomose", detail: "Well perfused, tension-free, correctly oriented, widely patent, and with no distal obstruction; mobilize the splenic flexure for reach on the left and air-leak test a colorectal anastomosis." },
      { title: "Convert when safety demands it", detail: "Uncontrolled bleeding, anatomy that cannot be identified or safely dissected, an anastomosis that cannot be built, intolerance of pneumoperitoneum, or unexpected T4 or multivisceral disease." },
    ],
  }, PACKET),

  sourced({
    id: "block-pc-structures",
    type: "table",
    heading: "Structures at risk",
    columns: ["Operation", "Structure", "Prevention"],
    rows: [
      ["Right or extended right", "**Duodenum (D2–D3)** directly behind the hepatic flexure, pancreatic head, the SMV and gastrocolic trunk of Henle, right ureter, gonadal vessels", "Divide the hepatocolic and gastrocolic attachments, stay anterior to the duodenum and pancreatic head, and use gentle traction on the middle colic and Henle's trunk"],
      ["Left or sigmoid", "**Left ureter** crossing the iliac bifurcation at the base of the sigmoid mesentery, gonadal vessels, and the superior hypogastric nerves at the IMA origin", "Identify the ureter before dividing the IMA, and ligate the IMA 1–2 cm off the aorta to spare the nerves"],
      ["Splenic flexure", "Spleen (capsular tear) and pancreatic tail", "Avoid inferior traction; enter the lesser sac and divide the splenocolic ligament under vision"],
    ],
  }, PACKET),

  sourced({
    id: "block-pc-anastomosis-evidence",
    type: "bullets",
    heading: "↳ Anastomosis and conversion evidence",
    items: [
      "ICG fluorescence angiography lowered leak from 11.6% to 7.9% (RR 0.69) in a randomized meta-analysis, with the benefit concentrated in left-sided anastomoses (8.1% to 4.0%) and none on the right (5.2% against 5.4%).",
      "Intracorporeal and extracorporeal ileocolic anastomoses leak at similar rates.",
      "Conversion is a safety decision, though converted cancer cases in CLASICC had worse OS (HR 2.28) and DFS (HR 2.20), likely reflecting selection and biology.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-lap-trials",
    type: "table",
    heading: "Laparoscopic against open colectomy for cancer",
    columns: ["Trial", "Key result"],
    rows: [
      ["COST", "3-year OS 86% laparoscopic against 85% open, with no stage-specific difference"],
      ["COLOR", "DFS noninferior on per-protocol analysis; equivalent 10-year outcomes"],
      ["CLASICC", "No OS or DFS difference at a median 62.9 months"],
      ["Barcelona (Lacy)", "Suggested a cancer-related survival benefit in stage III only, not confirmed by COST"],
    ],
  }, PACKET),

  sourced({
    id: "block-pc-mis-cme",
    type: "bullets",
    heading: "↳ Minimally invasive surgery and complete mesocolic excision",
    items: [
      "Laparoscopy brings less narcotic use, faster return of bowel function and diet, and shorter stays.",
      "NCCN requires an experienced surgeon, preoperative localization, and full exploration, and generally avoids MIS for invasion of adjacent structures or acute obstruction or perforation.",
      "Complete mesocolic excision with central vascular ligation (Hohenberger, 2009): sharp dissection in the embryologic plane with an intact mesocolic envelope, ligation within 1 cm of the origin, and about 10 cm margins.",
      "A meta-analysis of 4,575 patients showed better DFS and OS without added morbidity; an earlier one found more complications (RR 1.13) without more leak or mortality. ASCRS does not recommend routine extended lymphadenectomy (weak, 2B), noting D3 nodal disease in 3%–11% and skip metastases in 0%–4%.",
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-pc-obstruction",
    type: "bullets",
    heading: "Obstructing colon cancer",
    items: [
      "NCCN options for resectable obstructing cancer: one-stage colectomy, resection with diversion, diversion alone, or a stent in selected cases.",
      "Left-sided and curable: choose among a stent bridge, diverting colostomy with interval colectomy, or oncologic segmental colectomy by patient factors and local expertise (strong, 1B).",
      "Stent bridge against emergency resection across 8 trials: primary anastomosis 70% against 54%, temporary ostomy 34% against 51%, permanent ostomy 22% against 35%, 60-day morbidity 34% against 51%, and the same 60-day mortality.",
      "ASGE conditionally suggests a stent bridge, with a possible rise in recurrence (OR 1.84, very low certainty) and no 3-year OS difference.",
      "Right or transverse obstruction: usually primary resection with ileocolic anastomosis, or stent and interval colectomy.",
      "No stent for perforation, peritonitis, ischemia, or a tumor within 8 cm of the anal verge.",
    ],
  }, [[PACKET], [ASCRS], [ASCRS], [PACKET], [PACKET], [PACKET]]),

  sourced({
    id: "block-pc-benign",
    type: "table",
    heading: "Benign and emergency scenarios",
    columns: ["Scenario", "Operation", "Key evidence"],
    rows: [
      ["Diverticulitis with fistula, stricture, or obstruction", "Elective colectomy, typically recommended (strong, 1B)", "Colovesical is the most common fistula, presenting with pneumaturia or fecaluria"],
      ["After a nonoperatively treated abscess", "Colectomy typically considered", "Conditional recommendation"],
      ["Recurrent uncomplicated diverticulitis", "Individualized by quality of life, symptoms, and operative risk", "Recurrence 13%–33%; emergency stoma about 1 per 2000 patient-years, NNT about 18; young age is not an indication; DIRECT and LASER showed better quality of life, but DIRECT had 15% leak and 21% stoma rates"],
      ["Hinchey III–IV, stable", "Resection with primary anastomosis, with or without diverting loop ileostomy", "Stoma-free 96% against 65% (DIVERTI), 90% against 57% (ColonPerf), 94.6% against 71.7% (LADIES-DIVA) at equal morbidity and mortality; Hartmann reversal carried 20% serious morbidity against 0%"],
      ["Septic shock, frailty, or limited colorectal expertise", "Hartmann procedure, usually open", "Open is generally preferred for generalized fecal peritonitis or instability"],
      ["Sigmoid volvulus, stable without peritonitis", "Endoscopic detorsion, then sigmoid colectomy the same admission", "Detorsion succeeds in 60%–95%; recurrence after detorsion alone is 43%–75%"],
      ["Sigmoid volvulus with failed detorsion, ischemia, or perforation", "Urgent sigmoid resection", "Hartmann mortality 5%–7%; primary anastomosis leak 4.7% and mortality 3.4%"],
      ["Cecal volvulus", "Right hemicolectomy, with no endoscopic reduction", "Detorsion alone recurs in up to 75% and cecopexy in up to 40%"],
      ["Fulminant C. difficile colitis", "Subtotal colectomy with end ileostomy, never segmental", "Partial colectomy needed reoperation for persistent sepsis in 15.9%; diverting loop ileostomy with colonic lavage is an alternative whose 19% against 50% mortality was not reproduced in national data"],
    ],
  }, PACKET),

  sourced({
    id: "block-pc-lavage-damage",
    type: "bullets",
    heading: "↳ Lavage, damage control, and emergency risk",
    items: [
      "Laparoscopic lavage is not routine and is never used for feculent peritonitis: LOLA stopped early for harm, and SCANDIV had more unplanned reoperations (26% against 12%) and recurrence (21% against 4%).",
      "Damage control: resect, leave in discontinuity, close temporarily, and return at 24–48 hours; anastomosis was achieved in 73%.",
      "Emergency colectomy has 5.1% 30-day mortality. Predictors are age over 80, ASA 4–5, creatinine over 1.2 mg/dL, and albumin under 2.5 g/dL, with mortality of 10%, 22.9%, and 53.4% for 2, 3, and 4 factors.",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-complications",
    type: "bullets",
    heading: "Complications and follow-up",
    items: [
      "**Anastomotic leak**: colorectal 1.8%–19.2% (mostly rectal), ileocolic 1%–8.4%. Risks include male sex, age, a low anastomosis, malignancy, high ASA, low albumin, immunosuppression, long operations, emergency surgery, radiation, transfusion, and smoking.",
      "A leak after right hemicolectomy raised mortality from 2.1% to 15.6%. It classically presents on days 5–7 with tachycardia, fever, ileus, rising CRP or WBC, and peritonitis.",
      "A contained abscess gets antibiotics with or without percutaneous drainage; diffuse peritonitis or instability gets reoperation with takedown and end stoma, or proximal diversion with drainage of an intact anastomosis.",
      "Ureteral injury recognized intraoperatively is repaired primarily (stented or spatulated repair or reimplantation by level); delayed recognition means urinoma, drainage, and nephrostomy.",
      "Splenic capsular injury usually responds to hemostatics but can require splenectomy.",
      "Stage II–III cancer follow-up: H&P and CEA every 3–6 months for 2 years then every 6 months to 5 years, CT every 6–12 months for 5 years, and colonoscopy at 1 year (3–6 months if none before surgery). Detail is in [[Colon Cancer]].",
    ],
  }, PACKET),

  sourced({
    id: "block-pc-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Elective sigmoid colectomy for diverticulitis", "After multiple episodes", "Episode count no longer decides: resect for fistula, obstruction, or stricture, consider after an abscess, and individualize otherwise"],
      ["Hinchey III–IV", "Hartmann with temporary diversion", "Primary anastomosis with or without loop ileostomy in the stable patient; Hartmann for septic shock, frailty, or instability"],
      ["Cancer margins", "5 cm proximal and distal", "5–7 cm with mesentery to the origin of the named vessel and at least 12 nodes"],
      ["Positioning", "Lithotomy for every colectomy", "Modified lithotomy for left-sided work; supine for right colectomy"],
      ["Prophylactic ureteral stents", "Protective when indicated", "No reduction in injury, at the cost of time and urinary infection; selective use may aid recognition in a hostile pelvis"],
      ["Protecting the duodenum", "Elevate the gastrohepatic ligament", "The gastrohepatic ligament is not part of colectomy; D2–D3 lie behind the hepatic flexure, so divide the hepatocolic and gastrocolic attachments and stay anterior to duodenum and pancreas"],
      ["Stapled ileocolic anastomosis", "Safer, with fewer leaks (2.5% against 6% in a 2011 Cochrane review)", "National cohorts found double the leaks with stapled side-to-side (5.4% against 2.4%), and a 2026 trial meta-analysis found little difference"],
      ["Complete mesocolic excision", "Not routine (ASCRS, weak)", "Newer meta-analyses show DFS and OS benefit without added morbidity"],
      ["Splenic flexure cancer", "Extended right or left hemicolectomy", "Segmental resection is oncologically equivalent"],
    ],
  }, PACKET),

  sourced({
    id: "block-pc-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Cancer resection: named vessel at origin, en bloc mesentery, 5–7 cm margins, at least 12 nodes.",
      "Mechanical prep alone does nothing; mechanical prep plus oral antibiotics lowers SSI and leak.",
      "Sigmoid volvulus: detorsion, then same-admission sigmoid colectomy. Cecal volvulus: right hemicolectomy, no scope.",
      "Fulminant C. difficile: subtotal colectomy with end ileostomy; segmental colectomy is the wrong answer.",
      "Bleeding near the root of the transverse mesocolon during extended right colectomy: gastrocolic trunk of Henle.",
      "Sexual dysfunction after sigmoid colectomy for cancer: superior hypogastric nerve injury at the IMA origin.",
    ],
  }, PACKET),

  references("block-pc-references", [PACKET, ASCRS]),
];

export const partialColectomyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008320",
  versionId: "00000000-0000-4000-8000-000000008321",
  slug: "partial-colectomy",
  title: "Partial Colectomy",
  aliases: ["segmental colectomy", "right hemicolectomy", "right colectomy", "extended right hemicolectomy", "left hemicolectomy", "left colectomy", "sigmoid colectomy", "sigmoidectomy", "transverse colectomy", "splenic flexure resection", "complete mesocolic excision", "central vascular ligation", "high ligation of the IMA", "mechanical bowel preparation", "oral antibiotic bowel preparation", "ICG fluorescence angiography", "gastrocolic trunk of Henle", "white line of Toldt", "ureteral stents in colectomy", "COST trial", "CLASICC"],
  scoreNodeId: "large-intestine-procedures",
  scoreCategory: "SCORE · Large Intestine · Operations & Procedures",
  tags: ["large-intestine", "colectomy", "hemicolectomy", "colorectal", "anastomosis", "bowel-prep", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [ASCRS],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
