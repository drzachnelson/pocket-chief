import { buildPlaybook, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  DIPLOMA_TRIAL_SOURCE as DIPLOMA,
  ISGPS_POPF_2016_SOURCE as ISGPS,
  ROBOTIC_DISTAL_PANCREATECTOMY_OE_SOURCE as OE,
  ROBOTIC_DISTAL_PANCREATECTOMY_PLAYBOOK_SOURCE as SOURCE,
  SCORE_DISTAL_PANCREATECTOMY_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Source: ~/Desktop/Pocket Chief/Inbox/2026-10-30-robotic-distal-pancreatectomy/playbook-source.md (from SCORE Distal
// Pancreatectomy and Fiser ch 33, robotic specifics marked beyond sources), checked against the folder's OpenEvidence
// procedure guide. The source's right-side-up tilt and 2005 ISGPF fistula definition are corrected; its port map is kept
// as an alternative to the published configuration. Disease workup and splits live in the Pancreatic Tail Mass topic.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-rdp-summary",
    type: "summary",
    heading: "At a glance",
    text: "Robotic distal pancreatectomy removes the pancreatic body and tail, with the spleen en bloc for adenocarcinoma or with the spleen preserved for indolent disease. The case turns on three decisions made before or early in the dissection: whether malignancy is suspected (which settles the spleen), which direction to mobilize (medial to lateral for cancer), and where to transect (the neck for cancer, just left of the lesion for benign disease). Stage first, control the splenic vessels before they control you, and expect the stump to be where the morbidity comes from.",
  }, SOURCE),

  sourcedUnits({
    id: "block-rdp-cancer-warning",
    type: "warning",
    heading: "Adenocarcinoma takes the spleen",
    text: "Confirmed or suspected adenocarcinoma means en bloc splenectomy with lymphadenectomy of the splenic vessels and hilum: spleen preservation is not indicated, and a cancer specimen is never morcellated.",
  }, [[SCORE, OE]]),

  sourcedUnits({
    id: "block-rdp-evidence",
    type: "bullets",
    heading: "The evidence in four lines",
    items: [
      "Robotic against laparoscopic (21 European centers, 402 matched pairs): conversion 6.7% against 15.2%, spleen preservation 81.4% against 62.9%, clinically relevant fistula 24.6% against 26.5% (not significant), operating time 285 against 240 minutes, readmission 11.0% against 18.2%.",
      "DIPLOMA (258 randomized, adenocarcinoma): minimally invasive resection was noninferior for R0 (73% against 69%), with node yield 22 against 23 and an overall survival hazard ratio of 0.99; only about 27% of the minimally invasive arm was robotic.",
      "The Miami guidelines favor minimally invasive over open distal pancreatectomy for benign and low-grade tumors: shorter stay, less blood loss, equivalent morbidity.",
      "**RAMPS** raises R0 rates (odds ratio 1.51) and adds about 3.8 nodes, without a proven overall survival benefit.",
    ],
  }, [[OE], [DIPLOMA, OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-rdp-indications",
    type: "bullets",
    heading: "Indications and contraindications",
    items: [
      "Solid body and tail neoplasms: ductal adenocarcinoma (oncologic resection with splenectomy), neuroendocrine tumors, solid pseudopapillary tumors, and metastases such as renal cell carcinoma.",
      "Cystic neoplasms: mucinous cystic neoplasm, main-duct IPMN, branch-duct IPMN with high-risk or worrisome features, and a symptomatic serous cystadenoma.",
      "Chronic inflammatory disease confined to the tail, with pain or gland necrosis, and duct disruption from trauma.",
      "Absolute: distant metastases (liver, peritoneum, nonregional nodes), or a patient unfit for pneumoperitoneum and major surgery.",
      "Relative and center-dependent: celiac or common hepatic artery involvement needing a modified Appleby (DP-CAR), SMV or portal vein reconstruction, multivisceral resection, or dense prior upper-abdominal surgery.",
      "A neck lesion may need an extended resection to the right of the SMV, an extended pancreatoduodenectomy or a total pancreatectomy; plan for the SMV and portal vein before the incision.",
    ],
  }, [[SCORE, SOURCE], [SOURCE, SCORE], [SCORE], [OE], [OE, SCORE], [OE]]),

  sourcedUnits({
    id: "block-rdp-workup",
    type: "bullets",
    heading: "Before the day",
    items: [
      "Pancreas-protocol CT (arterial and portal venous phases) or MRI, with staging chest CT and PET when malignancy is suspected.",
      "Read the scan for the operation: tumor contact with the SMV, portal vein, celiac, common hepatic artery and SMA, splenic vessel involvement, the tail-to-hilum distance (short predicts Warshaw infarction), and gland thickness at the planned transection line.",
      "EUS with FNA or fine-needle biopsy where it changes management, with cyst fluid CEA, amylase and glucose; tattoo a small neuroendocrine tumor that may be invisible on the robotic view.",
      "CA 19-9 for adenocarcinoma; chromogranin, gallium-68 DOTATATE PET and a hormone panel for a neuroendocrine tumor.",
      "HbA1c in everyone: prediabetes (HbA1c over 5.7%) independently predicts new-onset diabetes, so counsel on that risk.",
      "Vaccinate against pneumococcus, meningococcus (ACWY and B), Hib and influenza whenever splenectomy is planned or possible.",
      "Type and screen, with 2 units crossmatched for adenocarcinoma or RAMPS; optimize nutrition and glycemic control, and assess VTE risk.",
    ],
  }, [[SCORE], [OE], [SCORE, OE], [OE], [SCORE, OE], [OE], [OE, SOURCE]]),

  sourcedUnits({
    id: "block-rdp-setup",
    type: "bullets",
    heading: "Position, room and docking",
    items: [
      "Supine, split-leg or arms out, in 20 to 25 degrees of reverse Trendelenburg with the **right side down** 15 to 20 degrees so the stomach and colon fall away from the tail; strap and pad the patient for the tilt.",
      "SCORE leaves the position to the surgeon: supine for tumors near the portal vein and SMV, a modified lazy right lateral decubitus for tumors near the spleen.",
      "The patient cart docks from the patient's left shoulder or head, with the bedside assistant on the right or between the legs.",
      "Open the laparoscopic and open trays, vascular instruments, 4-0 and 5-0 Prolene, robotic bulldogs, vascular and pancreatic stapler loads, the ultrasound probe, and a cell saver for adenocarcinoma before the incision.",
      "Enter with an optical trocar or Hasson technique, insufflate to 12 to 15 mm Hg, space ports 6 to 8 cm apart (common practice), and dock after the diagnostic laparoscopy.",
      "Instruments: fenestrated bipolar on the left, vessel sealer or monopolar scissors on the right, a tip-up or Cadiere grasper on arm 4 retracting the stomach, a robotic clip applier, and the 12 mm robotic stapler for the gland.",
    ],
  }, [[OE], [SCORE], [OE, SOURCE], [OE], [OE], [OE, SOURCE]]),

  sourcedUnits({
    id: "block-rdp-ports",
    type: "table",
    heading: "↳ Port map",
    columns: ["Port", "Size", "Position"],
    rows: [
      ["R1", "8 mm robotic", "Right flank, on a transverse line at the umbilicus"],
      ["R2", "8 mm robotic", "Right pararectal, on the same line"],
      ["R3 (camera)", "8 mm robotic", "Periumbilical"],
      ["R4", "8 mm robotic", "Left flank, retracting the stomach"],
      ["Assistant", "12 mm", "Below and between R3 and R4, for stapling, suction, clips and the specimen bag"],
      ["Alternative map", "8 mm and 12 mm", "Camera at or just left of the umbilicus, working ports in the left and right mid-abdomen, a left flank retraction port, and the 12 mm assistant port in the right lower quadrant"],
    ],
  }, [[OE], [OE], [OE], [OE], [OE], [SOURCE]]),

  sourcedUnits({
    id: "block-rdp-steps",
    type: "sequence",
    heading: "The operation, step by step",
    steps: [
      { title: "Stage first", detail: "Survey the peritoneum, omentum, both liver lobes, falciform ligament, pelvis and transverse mesocolon before docking; biopsy any suspicious nodule for frozen section, send washings for adenocarcinoma, and abort if M1 disease is confirmed." },
      { title: "Open the lesser sac", detail: "Divide the gastrocolic ligament outside the gastroepiploic arcade from the mid transverse colon to the lower pole of the spleen, keeping the left gastroepiploic and short gastric vessels whenever the spleen may be preserved." },
      { title: "Expose the gland", detail: "Retract the stomach cephalad with arm 4 or a hitch stitch, divide the splenocolic ligament to bring the splenic flexure down, and expose the inferior border of the pancreas and the SMV at the neck." },
      { title: "Map with ultrasound", detail: "Localize the lesion, set the transection line, measure its distance to the main duct, and confirm its relationship to the splenic vessels, celiac, common hepatic artery and SMV; scan the liver for occult metastases." },
      { title: "Take the short gastrics if the spleen is coming out", detail: "Divide them with the vessel sealer, keeping hemostatic control for splenic mobilization." },
      { title: "Choose the direction", detail: "For adenocarcinoma, go medial to lateral (RAMPS): tunnel under the neck over the SMV and portal vein and clear the common hepatic, celiac and left SMA nodes. For a benign lesion or spleen preservation, lateral to medial is acceptable, but avoid it for cancer because vascular control comes late and node yield falls." },
      { title: "Find the splenic vessels", detail: "The splenic vein comes into view first along the caudal border of the gland, and the artery runs along the cephalad border; plan the transection plane early so the vessels are exposed before bleeding forces the issue." },
      { title: "Divide the splenic artery", detail: "Isolate it at its origin, test-clamp with a bulldog and confirm common hepatic artery flow before dividing, and leave a short double-secured stump about 1 cm from the celiac (common practice)." },
      { title: "Divide the splenic vein", detail: "Expose the inferior mesenteric vein junction, then divide the vein close to the SMV-portal confluence without narrowing it, leaving a short stump." },
      { title: "Transect the pancreas", detail: "For adenocarcinoma, at the neck over the SMV and portal vein with the margin sent for frozen section; for a benign lesion, about 1 to 2 cm left of it to spare parenchyma (common practice), using a stapler load matched to gland thickness." },
      { title: "Set the posterior plane", detail: "Anterior RAMPS stays in front of the adrenal for a confined tumor; posterior RAMPS goes behind Gerota fascia with the left adrenal when the tumor reaches the posterior capsule. Finish laterally through the splenorenal, splenophrenic and splenocolic attachments." },
      { title: "Send frozen sections that change the plan", detail: "The neck margin for adenocarcinoma, IPMN (high-grade dysplasia or invasion extends the resection) and mucinous cystic neoplasm with atypia, plus any suspicious peritoneal, liver or out-of-field nodal lesion." },
      { title: "Extract", detail: "Bag the specimen through the 12 mm port and extract it through a Pfannenstiel or an extended port site; morcellate a benign spleen only inside the bag, and orient and ink the neck, posterior and vessel margins." },
      { title: "Drain and check", detail: "Inspect the bed for hemostasis and leave one closed-suction drain along the staple line, with drain amylase on days 1 and 3." },
    ],
  }, [[SCORE, OE], [SCORE, OE], [SCORE, OE], [SCORE, OE], [SCORE], [SCORE, OE], [SCORE], [OE], [OE, SCORE], [OE, SCORE], [OE, SCORE], [SCORE, OE], [OE, SOURCE], [SCORE, OE]]),

  sourced({
    id: "block-rdp-vessels",
    type: "table",
    heading: "↳ Splenic vessel control",
    columns: ["Option", "Use", "Caveat"],
    rows: [
      ["Vascular stapler", "The splenic vein (usually 8 to 12 mm) or a bulky artery", "Keep the jaws clear of the portal vein, SMV and common hepatic artery, and leave a short venous stump"],
      ["Hem-o-lok with a tie or transfixion", "The splenic artery and small veins", "Never a single Hem-o-lok on the arterial stump: two proximally, or a clip plus a tie or 4-0 Prolene transfixion"],
      ["Silk ties and clips", "Kimura branch control, for tributaries of 1 to 3 mm", "Expect 10 to 20 small venous branches along the splenic vein (common practice)"],
      ["Energy device alone", "Tributaries of 3 mm or less", "Not for the main splenic artery or vein"],
    ],
  }, OE),

  sourced({
    id: "block-rdp-stump",
    type: "bullets",
    heading: "↳ The stump",
    items: [
      "Measure gland thickness: a gland over 12 mm was the high-risk group in robotic series, with clinically relevant fistula in 48.4% after reinforced stapling.",
      "Match the closed staple height to the gland (common practice): about 1.8 to 2.0 mm for a gland under 12 mm, 2.25 to 3.0 mm for 12 to 20 mm, and consider scalpel or energy transection with suture closure above 20 mm.",
      "Close the jaws, pre-compress for 3 to 5 minutes, then fire slowly over 2 to 3 minutes (common practice); peri-firing compression is associated with fewer clinically relevant fistulas.",
      "Oversew a visible main duct with a 5-0 Prolene figure-of-eight.",
      "Stapler against scalpel and hand-sewn closure made little difference in three randomized trials (fistula 26% against 29%), and randomized trials of reinforced staple lines are negative.",
      "Fistula risk follows gland texture, duct size under 3 mm and neck thickness more than closure technique.",
    ],
  }, OE),

  sourcedUnits({
    id: "block-rdp-spleen-flow",
    type: "flow",
    heading: "Keeping or taking the spleen",
    nodes: [
      { id: "start", label: "A body or tail lesion is booked for robotic distal pancreatectomy." },
      { id: "malignant", label: "Confirmed or suspected adenocarcinoma, or splenic vessel or hilar involvement, takes en bloc splenectomy with lymphadenectomy; no attempt at preservation.", tone: "caution" },
      { id: "kimura", label: "A benign or low-grade lesion separable from the vessels gets a Kimura attempt, keeping the splenic artery and vein.", tone: "good" },
      { id: "warshaw", label: "When Kimura fails from bleeding or inseparable vessels, divide the splenic artery and vein and keep the spleen on the short gastric and left gastroepiploic vessels (Warshaw)." },
      { id: "inspect", label: "After a Warshaw, watch the spleen for 10 to 15 minutes." },
      { id: "complete", label: "Diffuse dark ischemia that does not improve means completing the splenectomy.", tone: "caution" },
      { id: "keep", label: "A perfused or patchily infarcted spleen stays; most infarcts are clinically silent.", tone: "good" },
    ],
    edges: [
      { from: "start", to: "malignant", label: "Malignancy confirmed or suspected" },
      { from: "start", to: "kimura", label: "Benign or low grade" },
      { from: "kimura", to: "warshaw", label: "Kimura fails" },
      { from: "warshaw", to: "inspect", label: "Vessels divided" },
      { from: "inspect", to: "complete", label: "No recovery" },
      { from: "inspect", to: "keep", label: "Perfused" },
    ],
  }, [[SOURCE], [SCORE, OE], [SCORE, OE], [OE], [OE], [OE], [OE], [SCORE], [SCORE], [OE], [OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-rdp-bailouts",
    type: "table",
    heading: "Bailouts",
    columns: ["Situation", "Move"],
    rows: [
      ["Hemorrhage", "Pressure first with a sponge through the assistant port, raise insufflation briefly, alert anesthesia and the blood bank, put a bulldog on the splenic artery origin, and repair with 4-0 or 5-0 Prolene once the field is controlled"],
      ["Kimura branch bleed", "Convert to a Warshaw rather than a splenectomy"],
      ["Uncontrolled bleeding or portal vein or SMV injury", "Hold pressure, undock emergently and convert to open through a left subcostal or midline incision"],
      ["Splenic hemorrhage", "Pack the left upper quadrant, use hemostatic agents and argon beam coagulation, and take the spleen"],
      ["Unexpected metastatic disease", "Confirm on frozen section and abort; no palliative distal pancreatectomy, and send tissue for molecular profiling"],
      ["Unexpected celiac or common hepatic artery involvement", "Abort unless the patient was planned and consented for DP-CAR, and refer for neoadjuvant therapy and restaging"],
      ["Gastric or colonic injury entering the lesser sac", "Repair primarily, and convert if exposure is inadequate"],
    ],
  }, [[OE], [OE], [OE, SOURCE], [SCORE], [OE, SCORE], [OE], [SOURCE]]),

  sourcedUnits({
    id: "block-rdp-complications",
    type: "bullets",
    heading: "Complications to expect",
    items: [
      "ISGPS 2016: a fistula is drain amylase over 3 times the institutional upper limit of normal serum amylase on or after day 3 with clinical impact; without impact it is a biochemical leak, grade B changes management (drain over 3 weeks, percutaneous or endoscopic drainage, angiography), and grade C means reoperation, organ failure or death.",
      "A clinically relevant fistula follows about a quarter of robotic distal pancreatectomies; soft or thick glands (over 12 mm), a duct under 3 mm and obesity raise the risk.",
      "Blood in the drain from day 5 to 7 onward in a patient with a fistula is a splenic artery stump pseudoaneurysm until proven otherwise: CT angiography, then embolization or a covered stent, not observation and not the operating room while stable.",
      "Thrombosis of the splenic, portal or superior mesenteric vein: systemic anticoagulation recanalizes 55% to 60%, against 15% to 20% without treatment, and thrombolysis is reserved for progression with mesenteric ischemia.",
      "Kimura preservation carries splenic vein stenosis in 41%, with left-sided portal hypertension, so spleen-preserved patients need follow-up imaging.",
      "New-onset diabetes is pooled at about 28% and reached 74% at 3 years on prospective glucose tolerance testing; prediabetes, splenectomy, a BMI of 25 or more and resection of over 25% of the gland raise it.",
    ],
  }, [[ISGPS], [OE], [OE], [SCORE], [OE], [OE]]),

  sourcedUnits({
    id: "block-rdp-postop",
    type: "bullets",
    heading: "After the case",
    items: [
      "ERAS: clear liquids and walking on day 0 to 1, opioid-sparing analgesia, and early catheter removal.",
      "Check drain amylase on days 1 and 3 and pull the drain early when the day 3 value is low and the fluid is not pancreatic (common practice); keep it and grade by ISGPS when it is high.",
      "Watch glucose closely, and recheck HbA1c or fasting glucose at 3, 6 and 12 months, then yearly.",
      "Screen for steatorrhea and weight loss, and start pancreatic enzyme replacement when present.",
      "If the vaccines were not given before surgery, give them at 14 days or more, or before discharge if follow-up is uncertain, and educate on fever as an emergency.",
      "Image every 3 to 12 months by histology, and refer adenocarcinoma to medical oncology for adjuvant therapy once recovered.",
    ],
  }, [[OE], [OE], [SCORE, OE], [OE], [OE], [SCORE]]),

  sourcedUnits({
    id: "block-rdp-conflicts",
    type: "table",
    heading: "Where the sources disagree",
    columns: ["Question", "One answer", "The other"],
    rows: [
      ["Order of vessel division", "SCORE: the splenic artery, vein and pancreas may be divided in any order the operation dictates", "The OpenEvidence guide: artery first, then vein, which decompresses the spleen and limits congestion and bleeding (classic teaching kept in robotic practice)"],
      ["Fistula definition", "The playbook source and SCORE: drain amylase over 3 times the serum amylase on or after day 3", "ISGPS 2016: over 3 times the institutional upper limit of normal, and a biochemical leak is not a fistula"],
      ["Vaccination timing", "SCORE: 2 to 3 weeks before surgery or 2 weeks after", "The OpenEvidence guide: ideally 4 to 6 weeks before, and at least 2 weeks"],
      ["Specimen extraction", "The playbook source: through the assistant port site, extended as needed", "The OpenEvidence guide: a Pfannenstiel is preferred for the lowest hernia rate"],
      ["Bleeding during Kimura dissection", "Classic open teaching: take the spleen", "Current minimally invasive practice: convert to a Warshaw"],
      ["Stump closure", "Classic: hand-sewn fish-mouth closure, mandatory drains and routine octreotide", "Current: stapler with slow compression; somatostatin analogues cut overall but not clearly clinically relevant fistulas"],
      ["Diabetes after distal pancreatectomy", "Classic: about 14% after resection for a neoplasm", "Prospective testing: much higher, up to 74% at 3 years, which argues for parenchyma-sparing transection and lifelong HbA1c checks"],
    ],
  }, [[SCORE, OE], [SOURCE, SCORE, ISGPS], [SCORE, OE], [SOURCE, OE], [OE], [OE], [OE]]),

  references("block-rdp-references", [SOURCE, OE, SCORE, ISGPS, DIPLOMA]),
];

export const roboticDistalPancreatectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000019",
  slug: "robotic-distal-pancreatectomy",
  title: "Robotic Distal Pancreatectomy (Pancreatic Tail Resection)",
  aliases: ["Robotic distal pancreatectomy", "RDP", "Robotic left pancreatectomy", "Robotic pancreatic tail resection", "Robotic spleen-preserving distal pancreatectomy", "Robotic distal pancreatectomy with splenectomy", "Robotic RAMPS"],
  procedureId: "robotic_distal_pancreatectomy",
  approach: "robotic",
  specialty: "Hepatobiliary",
  tags: ["pancreas", "distal pancreatectomy", "robotic", "spleen preservation", "surgical oncology"],
  sourceId: SOURCE,
  additionalSourceIds: [OE, SCORE, ISGPS, DIPLOMA],
  relatedTopicSlugs: ["pancreatic-tail-mass", "splenectomy-and-splenorrhaphy", "pancreaticoduodenectomy"],
  blocks,
  reviewedAt: "2026-10-30T00:00:00.000Z",
});
