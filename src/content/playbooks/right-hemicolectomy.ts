import { buildPlaybook, references, sourced } from "@/content/authoring";
import { ASCRS_SAGES_ERAS_2023_SOURCE as ERAS, RIGHT_HEMICOLECTOMY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-rhc-summary",
    type: "summary",
    heading: "At a glance",
    text: "Resection of terminal ileum, caecum, appendix, ascending colon, hepatic flexure and proximal transverse colon with a primary ileocolic anastomosis. The default is an elective minimally invasive oncologic operation. The whole case turns on one plane — the avascular interface between mesocolic fascia and Toldt's fascia — and on proving you are in it by seeing the duodenum from below before anything is stapled.",
  }, SOURCE),

  sourced({
    id: "block-rhc-critical-view",
    type: "warning",
    heading: "See the duodenum before you fire",
    tone: "danger",
    text: "The correct plane is confirmed when the third part of the duodenum and the uncinate process are visible from ventral and below — and that confirmation belongs before vascular ligation, not after. Dissecting posterior to the duodenopancreatic plane puts the duodenum, pancreatic head, ureter and gonadal vessels all on the wrong side of your dissection at once.",
  }, SOURCE),

  sourced({
    id: "block-rhc-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "Adenocarcinoma of the caecum, ascending colon or hepatic flexure — laparoscopic right colectomy is the standard of care for non-locally-advanced right-sided disease.",
      "Endoscopically unresectable right-sided polyps or high-grade dysplasia.",
      "Appendiceal neoplasms, where the threshold is histology-specific.",
      "Caecal volvulus, when endoscopic reduction with caecopexy is unsuitable or the bowel is not viable.",
      "Bleeding arteriovenous malformation, ischaemic stricture, or appendicitis with caecal wall involvement precluding a safe appendicectomy.",
      "Complicated Crohn ileocolitis, though the more common Crohn operation is a limited ileocaecal resection rather than an oncologic hemicolectomy.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-appendiceal",
    type: "table",
    heading: "↳ Appendiceal tumour thresholds",
    columns: ["Histology", "Operation", "The reasoning"],
    rows: [
      ["Neuroendocrine tumour under 1 cm", "Appendicectomy alone", "Curative; nodal risk does not justify a colectomy"],
      ["Neuroendocrine tumour over 2 cm", "Right hemicolectomy with lymphadenectomy, retrieving more than 12 nodes", "Nodal risk is high enough to warrant the resection"],
      ["Neuroendocrine tumour 1 to 2 cm", "Genuinely controversial — decide multidisciplinary", "High-risk features argue for completion, pooled cohorts argue against overtreatment"],
      ["Appendiceal or goblet cell adenocarcinoma", "Right hemicolectomy with adequate lymphadenectomy", "Behaves as a colonic adenocarcinoma"],
      ["Low- and high-grade mucinous neoplasm", "Negative-margin appendicectomy, not colectomy", "Colectomy adds morbidity without oncologic benefit"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-net-conflict",
    type: "warning",
    heading: "↳ The 1 to 2 cm neuroendocrine tumour, unresolved",
    tone: "pearl",
    text: "European and North American neuroendocrine societies list high-risk features that trigger completion hemicolectomy: size at or above 1.5 cm, mesoappendiceal invasion beyond 3 mm, grade 2, lymphovascular invasion, or base and margin involvement — and one surgical series identified size above 15.5 mm, grade 2 and lymphovascular invasion as independent predictors of nodal disease. Against that, a Europe-wide pooled cohort and North American series found no survival difference between hemicolectomy and appendicectomy in this size band, which raises a real concern about overtreatment. Nodal risk and survival benefit are not the same endpoint, and that is exactly where the disagreement lives.",
  }, SOURCE),

  sourced({
    id: "block-rhc-oncologic",
    type: "bullets",
    heading: "↳ Oncologic resection principles",
    items: [
      "Proximal and distal margins of at least 5 cm, though many work to a 10 cm rule — nodal metastasis beyond 10 cm from the tumour is around 0.2 per cent.",
      "Ligate the ileocolic pedicle at its origin.",
      "Take the right colic artery where it is present, and the right branch of the middle colic.",
      "For a hepatic flexure or mid-transverse lesion, extend the resection and ligate the middle colic trunk.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-workup",
    type: "bullets",
    heading: "Workup and contraindications to a pure minimally invasive approach",
    items: [
      "Colonoscopy with biopsy, and a preoperative tattoo of any small or flat lesion — without it, intraoperative localization becomes guesswork.",
      "Contrast CT of chest, abdomen and pelvis, with a carcinoembryonic antigen level.",
      "Optimize anaemia, nutrition, glycaemia and smoking before an elective case.",
      "Have a low threshold to convert for haemodynamic instability, diffuse peritonitis, free perforation, or uncontrolled haemorrhage.",
      "For an obstructing right-sided cancer, primary resection with immediate anastomosis is safe in a stable, uncontaminated patient; endoscopic stenting can bridge to an elective minimally invasive resection in experienced centres.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-setup",
    type: "bullets",
    heading: "Positioning and room setup",
    items: [
      "Supine or modified lithotomy with the arms tucked, on a non-slip surface with every pressure point padded and the patient secured for steep tilt.",
      "Trendelenburg with the left side down for the ileocolic and retroperitoneal phase.",
      "Reverse Trendelenburg with the left side down for the hepatic flexure.",
      "Laparoscopic: surgeon and camera on the patient's left, monitor at the right shoulder or hip.",
      "Robotic: cart docked over the right side, assistant on the left.",
      "Urinary catheter and orogastric decompression, with normothermia and goal-directed fluids.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-prophylaxis",
    type: "bullets",
    heading: "↳ Preparation and prophylaxis",
    items: [
      "Mechanical bowel preparation combined with oral antibiotics before an elective colorectal resection — a strong recommendation on moderate-quality evidence. Combined preparation reduces surgical site infection and anastomotic leak against mechanical preparation alone. Omit the mechanical component in obstruction.",
      "Weight-based intravenous prophylaxis within 60 minutes of incision, redosed by agent half-life and stopped within 24 hours.",
      "Mechanical compression plus pharmacologic prophylaxis at the highest prophylactic dose, started perioperatively.",
      "Extended prophylaxis for four weeks after major abdominopelvic cancer surgery in patients without a high bleeding risk.",
    ],
  }, ERAS),

  sourced({
    id: "block-rhc-vascular-anatomy",
    type: "bullets",
    heading: "Vascular anatomy, which is the core difficulty",
    items: [
      "Ileocolic artery and vein: constant. The arterial origin from the superior mesenteric artery is the caudal landmark of the whole dissection, and the vein drains to the superior mesenteric vein.",
      "Right colic artery: present in only a minority. Where it is absent, the right branch of the middle colic supplies the ascending colon.",
      "Middle colic vessels: the right branch comes out in a standard resection, the trunk in an extended one.",
      "Gastrocolic trunk of Henle: a frequent bleeding point at the inferior border of the pancreas, formed by variable contributions from the right gastroepiploic, superior right colic and pancreaticoduodenal veins. Skeletonize it deliberately rather than discovering its tributaries by tearing one.",
      "Superior mesenteric vessels: the medial boundary of the central dissection. Both the artery and the ligamentum teres are midline surface landmarks that locate the pedicle regardless of habitus.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-planes",
    type: "bullets",
    heading: "↳ The plane, and the landmarks at each border",
    items: [
      "The correct plane is the avascular interface between the mesocolic visceral fascia and the retroperitoneal Toldt and Gerota fascia. Staying ventral keeps the ureter, gonadal vessels, duodenum and pancreas safely behind you.",
      "Stay on the shiny anterior surface of Toldt's fascia.",
      "Stay off Gerota's fascia and everything under it — never dive posterior to the duodenopancreatic plane.",
      "Caudal and medial border: the ileocolic takeoff from the superior mesenteric artery, where a medial-to-lateral dissection starts.",
      "Lateral border: the white line of Toldt from caecum to hepatic flexure.",
      "Posterior border: the duodenal C-loop, pancreatic head, right ureter on the psoas, gonadal vessels, and the lower renal pole.",
      "Cranial border: the gastrocolic ligament and lesser sac, Henle's trunk, and the middle colic origin.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "access", label: "Access, ports, explore for metastases", tone: "default" },
      { id: "expose", label: "Sweep small bowel left, expose the ileocolic pedicle", tone: "default" },
      { id: "clear", label: "Central anatomy clearly seen?", tone: "default" },
      { id: "lateral", label: "Switch to lateral-to-medial, vessels last", tone: "caution" },
      { id: "view", label: "Duodenum and uncinate seen from below", tone: "default" },
      { id: "ligate", label: "Ligate ileocolic and colic pedicles at origin", tone: "default" },
      { id: "toldt", label: "Develop the plane anterior to Toldt's fascia", tone: "default" },
      { id: "flexure", label: "Hepatic flexure and lesser sac, reverse Trendelenburg", tone: "default" },
      { id: "anast", label: "Divide bowel and build the ileocolic anastomosis", tone: "default" },
      { id: "check", label: "Check perfusion, orientation, staple lines", tone: "default" },
      { id: "close", label: "Protected extraction, close fascia", tone: "good" },
    ],
    edges: [
      { from: "access", to: "expose" },
      { from: "expose", to: "clear" },
      { from: "clear", to: "view", label: "Yes" },
      { from: "clear", to: "lateral", label: "No" },
      { from: "view", to: "ligate" },
      { from: "ligate", to: "toldt" },
      { from: "lateral", to: "toldt" },
      { from: "toldt", to: "flexure" },
      { from: "flexure", to: "anast" },
      { from: "anast", to: "check" },
      { from: "check", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Access and exploration", detail: "Pneumoperitoneum by open Hasson at the umbilicus or Veress at Palmer's point, then a 10 to 12 mm camera port with working and assistant ports across the left abdomen and suprapubic or right lower quadrant positions under vision. Inspect liver and peritoneum systematically and confirm the tattoo. The pitfall is placing ports before excluding carcinomatosis, and missing a peritoneal or hepatic deposit that would change the operation." },
      { title: "Exposure", detail: "Steep Trendelenburg with the left side down, sweeping small bowel to the left upper quadrant to expose the ileocolic pedicle, the mesenteric root and the duodenum. The pitfall is inadequate small bowel retraction, which hides the ileocolic origin and invites dissection in the wrong plane from the first cut." },
      { title: "Vascular isolation", detail: "Retract the ileocaecal mesentery anterolaterally to tent the ileocolic artery, score the peritoneum over its origin, expose the superior mesenteric vein, and skeletonize and divide the artery and vein at their origins. Develop the avascular plane anterior to Toldt's fascia and continue cranially along the vascular axis to take the right colic where present and the right branch of the middle colic — or the middle colic trunk for an extended resection. Achieve the duodenal critical view before firing on the pedicle. The pitfall is avulsing the superior mesenteric vein or a tributary of Henle's trunk, which is the commonest cause of haemorrhage and conversion: give gentle deliberate traction and expose the branches before dividing anything." },
      { title: "Hepatic flexure and lesser sac", detail: "Reverse Trendelenburg, cephalad traction on omentum and caudad-medial traction on the flexure, dividing the hepatocolic and gastrocolic ligaments into the lesser sac and separating omentum from transverse colon along the embryologic plane, then join the lateral and medial dissections. The pitfall is thermal injury to the duodenum during the takedown, and bleeding from the right gastroepiploic and Henle complex." },
      { title: "Resection and anastomosis", detail: "Transect ileum and transverse colon with linear staplers and build a stapled side-to-side isoperistaltic ileocolic anastomosis, verifying there is no mesenteric twist and inspecting the internal staple line for bleeding before closing the common enterotomy. Closing the mesenteric defect is optional and variably practised. The pitfall is accepting malorientation or tension — take it down and redo it rather than live with it." },
      { title: "Closure", detail: "Reinspect anastomotic perfusion, orientation, tension and haemostasis, and check the duodenal sweep once more. Close the fascia at every port of 10 mm or more and at the extraction site, using a wound protector for every extraction to reduce infection and wound recurrence." },
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Variant", "Key steps", "Indications", "Cautions", "Advantages"],
    rows: [
      ["Medial-to-lateral, vessel first", "Ileocolic origin, then the retroperitoneal plane, then flexure and anastomosis", "Standard elective oncologic resection", "Obscured central anatomy or dense inflammation", "Early vascular control, and the approach roughly 74 per cent of surgeons use"],
      ["Lateral-to-medial", "White line of Toldt or the ileocaecal peritoneum first, vessels last", "A hostile or inflammatory field, or vessels you cannot see", "Loses the no-touch sequence", "Familiar from open surgery and safe when the central plane is unclear"],
      ["Intracorporeal anastomosis", "Division and anastomosis entirely inside, with off-midline extraction", "Any minimally invasive resection, and the natural fit on a robot", "Steeper learning curve", "Lower infection rate, faster bowel recovery, a shorter incision"],
      ["Extracorporeal anastomosis", "Bowel exteriorized, then resected and joined outside", "Any minimally invasive resection", "A larger midline incision", "Technically simpler and quicker to construct"],
      ["Robotic resection", "As laparoscopic with articulated instruments", "Complex or obese patients, and when an intracorporeal join is wanted", "Cost and operative time", "Fewer conversions, more nodes, faster recovery"],
      ["Open resection", "Midline laparotomy", "Instability, contamination, multivisceral disease, or conversion", "Wound morbidity", "Speed and control when either is what the patient needs"],
      ["Complete mesocolic excision with central ligation", "Sharp mesocolic-plane dissection with central ligation and apical nodes", "Selected advanced tumours in reference centres", "Longer learning curve and higher bleeding risk", "Higher node yield, with a disputed survival benefit"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-radicality",
    type: "warning",
    heading: "D2 versus D3: preserve the disagreement",
    tone: "pearl",
    text: "Multiple meta-analyses report better five-year overall and disease-free survival with complete mesocolic excision and central ligation than with conventional colectomy. The RELARC randomized trial found no significant difference in disease-free or overall survival once surgical quality was standardized in both arms, and a prospective study found no general survival benefit. What the randomized data consistently do show is more lymph nodes and a longer operation without more leaks or deaths. The guideline position follows from that: high-quality D2 is the standard for the average patient, and D3 with complete mesocolic excision is an option in reference centres with the expertise for it.",
  }, SOURCE),

  sourced({
    id: "block-rhc-anastomosis-evidence",
    type: "prose",
    heading: "↳ Intracorporeal versus extracorporeal, by trial",
    text: "The double-blind Allaix trial found faster return of bowel function with an intracorporeal join but no difference in length of stay. The IEA trial found less ileus, less pain and fewer minor complications with a shorter incision, again without a significant stay reduction. A triple-blind robotic trial found no recovery difference under optimized perioperative care at all. A randomized-trial meta-analysis found roughly half the odds of surgical site infection and a slightly shorter stay, at the cost of about 13 minutes more operating. The net is that an intracorporeal anastomosis improves wound and recovery endpoints while the length-of-stay benefit is inconsistent.",
  }, SOURCE),

  sourced({
    id: "block-rhc-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Obstructing right-sided cancer: primary resection with an ileocolic anastomosis if stable and without faecal peritonitis, otherwise diversion. Skip the mechanical preparation, and consider a stent as a bridge in an experienced centre.",
      "Hostile or reoperative abdomen: favour a lateral-to-medial or retroperitoneal-first approach and keep the threshold to convert low. A retroperitoneal dissection can bypass extensive adhesiolysis entirely.",
      "Crohn ileocolitis: a limited ileocaecal resection, not an oncologic hemicolectomy, and handle the friable thickened mesentery deliberately.",
      "Bulky disease involving adjacent organs: en bloc multivisceral resection, usually open, with a minimally invasive approach relatively contraindicated.",
      "Haemorrhage from the superior mesenteric vein or Henle's trunk: direct pressure with a gauze, restore exposure, control with a clip or suture, and convert early rather than persisting in a bloody field.",
      "A peritoneal tear degrading a retroperitoneal working space: seal it with a clip to restore the carbon dioxide tamponade.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark and course", "Complication if injured", "Prevention pearl"],
    rows: [
      ["Duodenum, second and third parts", "C-loop deep to the right mesocolon, uncinate at the superior mesenteric vein", "Duodenal leak or fistula, and thermal perforation", "See it from ventral and below before any vascular ligation, sweep it posteriorly, and keep energy off it"],
      ["Right ureter", "Crosses the iliac vessels and runs on psoas beneath Toldt's fascia", "Stricture, urinoma, obstruction", "Identify it, leave it dorsal on the psoas, and stay ventral to Gerota's fascia"],
      ["Gonadal vessels", "Parallel and lateral to the ureter, retroperitoneal", "Bleeding and gonadal ischaemia", "Keep them in the posterior leaf during mobilization"],
      ["Superior mesenteric vessels", "Medial boundary of the central dissection", "Catastrophic haemorrhage and bowel ischaemia", "Skeletonize with gentle traction, expose the ileocolic origin before stapling, and dissect parallel to the arterial axis"],
      ["Gastrocolic trunk of Henle", "Inferior pancreatic border, draining gastroepiploic, colic and pancreaticoduodenal veins", "Brisk venous bleeding and conversion", "Identify the tributaries deliberately before dividing, preserving the gastroepiploic and pancreaticoduodenal drainage"],
      ["Pancreatic head", "Dorsal to the transverse mesocolon", "Pancreatitis and pancreatic fistula", "Stay strictly anterior to Toldt's fascia and never dissect behind the duodenopancreatic block"],
      ["The anastomosis itself", "Ileocolic staple or suture line", "Leak and ischaemia", "Confirm no mesenteric twist and brisk bleeding at both transection margins"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-icg",
    type: "warning",
    heading: "Fluorescence perfusion is a left-sided finding",
    tone: "pearl",
    text: "Across colorectal surgery as a whole, indocyanine green angiography reduces anastomotic leak with a pooled relative risk near 0.69 and prompts a change of transection point intraoperatively. The benefit is concentrated in left-sided and low anastomoses: randomized subgroup and trial data do not show a significant reduction for right-sided anastomoses. It is a reasonable adjunct for an ileocolic join, not an established one, and quoting the pooled figure at a right hemicolectomy overstates what the evidence supports.",
  }, SOURCE),

  sourced({
    id: "block-rhc-leak",
    type: "bullets",
    heading: "Anastomotic leak",
    items: [
      "Ileocolic leak rates are low at roughly 0.5 to 3 per cent, against up to about 19 per cent for a coloanal join — but right-sided leaks carry disproportionately high mortality near 20 per cent in audit data, because succus spreads diffusely rather than staying contained.",
      "Independent predictors after a laparoscopic right colectomy: pulmonary disease, chronic steroid use, open conversion, and higher intraoperative blood loss.",
      "A rising C-reactive protein or procalcitonin on the second or third postoperative day with clinical signs should trigger imaging rather than continued observation.",
      "For the septic or peritonitic patient: resuscitate, give broad-spectrum antibiotics, keep nil by mouth and image urgently — or go straight to theatre if unstable.",
      "Grade A needs no change in management; grade B is antibiotics with percutaneous drainage of an accessible collection, and a collection under 4 cm is often managed medically; grade C is reoperation.",
      "At reoperation for an ileocolic leak, resection with re-anastomosis is favoured in the stable patient without gross contamination or severe inflammation, while overt sepsis or contamination warrants resection with diversion. Re-laparoscopy is a reasonable first attempt in a stable patient and succeeds in the majority.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rhc-complications",
    type: "bullets",
    heading: "↳ The rest of the complication list",
    items: [
      "Postoperative haemorrhage from a staple line or the mesentery: resuscitate and correct coagulopathy, then endoscopy for luminal bleeding, or embolization or reoperation for ongoing instability.",
      "Prolonged ileus or small bowel obstruction: nasogastric decompression, correct electrolytes, and exclude a leak. An intracorporeal anastomosis is associated with lower ileus rates.",
      "Surgical site infection is the main driver of wound morbidity, mitigated by combined oral antibiotic and mechanical preparation, a wound protector, and an intracorporeal anastomosis.",
      "Chylous leak after an extensive central nodal dissection, seen as milky drain fluid: usually managed with a low-fat or medium-chain triglyceride diet, with drainage if needed.",
    ],
  }, SOURCE),

  references("block-rhc-references", [SOURCE, ERAS]),
];

export const rightHemicolectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000008",
  slug: "right-hemicolectomy",
  title: "Right Hemicolectomy",
  aliases: ["Right colectomy", "Ileocolic resection", "Extended right hemicolectomy", "Complete mesocolic excision"],
  procedureId: "right_hemicolectomy",
  approach: "laparoscopic",
  specialty: "Colorectal",
  tags: ["colorectal", "oncology", "colectomy", "minimally invasive", "anastomosis"],
  sourceId: SOURCE,
  additionalSourceIds: [ERAS],
  relatedTopicSlugs: ["crohn-disease"],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
