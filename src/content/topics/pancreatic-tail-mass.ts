import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  DIPLOMA_TRIAL_SOURCE as DIPLOMA,
  FISER_PANCREAS_SOURCE as FISER,
  FUKUOKA_IPMN_2017_SOURCE as FUKUOKA,
  ISGPS_POPF_2016_SOURCE as ISGPS,
  NCCN_PANCREATIC_V4_2026_SOURCE as NCCN,
  PANCREATIC_TAIL_MASS_OE_SOURCE as OE,
  PRODIGE24_SOURCE as PRODIGE,
  SCORE_DISTAL_PANCREATECTOMY_SOURCE as SCORE_DP,
  SCORE_ENDOCRINE_PANCREATIC_NEOPLASMS_SOURCE as SCORE_ENDO,
  SCORE_EXOCRINE_PANCREATIC_NEOPLASMS_SOURCE as SCORE_EXO,
  SCORE_PANCREATIC_CYSTIC_NEOPLASMS_SOURCE as SCORE_CYST,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-30-pancreatic-tail-mass/1-packet.md (S1-S4 SCORE Exocrine, Cystic and
// Endocrine Pancreatic Neoplasms and Distal Pancreatectomy, S5 Fiser chapter 33), checked against the folder's
// OpenEvidence document. The packet's 2005 ISGPF fistula definition is replaced with ISGPS 2016, and its PNET figures that
// came from Fiser rather than the SCORE endocrine module are cited to Fiser. The operation itself is the robotic distal
// pancreatectomy playbook; head tumors and PRODIGE-24 detail stay in Pancreaticoduodenectomy.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-ptm-summary",
    type: "summary",
    heading: "At a glance",
    text: "A mass in the pancreatic body or tail does not obstruct the bile duct, so it announces itself late: weight loss and left upper quadrant or back pain, usually once a ductal adenocarcinoma is already locally advanced, or as an incidental finding when the lesion is cystic or neuroendocrine. The differential runs from ductal adenocarcinoma through the cystic neoplasms (mucinous cystic neoplasm, serous cystadenoma, IPMN) to neuroendocrine and solid pseudopapillary tumors and the pseudocyst. Pancreas-protocol CT defines the lesion and its vessels, MRI defines cyst anatomy, and EUS supplies tissue and cyst fluid. The operation is a distal pancreatectomy: with the spleen en bloc for adenocarcinoma, and with the spleen preserved for indolent disease.",
  }, SCORE_EXO),

  sourcedUnits({
    id: "block-ptm-presentation",
    type: "bullets",
    heading: "How a tail lesion presents",
    items: [
      "Body and tail cancers are usually **locally advanced** (borderline resectable or unresectable) at diagnosis, because symptoms appear only with tumor progression or metastasis.",
      "Weight loss is very common in pancreatic cancer wherever the tumor sits.",
      "About 30% to 35% of ductal adenocarcinomas arise in the body or tail, and their pain is vague left upper quadrant or epigastric pain **radiating to the back** from celiac and splanchnic plexus invasion, often with new-onset or worsening diabetes.",
      "- Head tumors present earlier and smaller, with painless jaundice and a Courvoisier gallbladder.",
      "Splenic vein thrombosis from a tail tumor causes **sinistral (left-sided) portal hypertension**: isolated gastric varices and splenomegaly, treated by splenectomy if they bleed.",
      "Most cystic tail lesions and small nonfunctional neuroendocrine tumors are found on imaging done for something else, while functional tumors present with their hormone syndrome whatever their size.",
      "A tail tumor adherent to the stomach, transverse colon, mesocolon or inferior vena cava may still be resectable en bloc with the involved tissue.",
    ],
  }, [[SCORE_EXO], [SCORE_EXO], [OE], [OE], [OE, FISER], [OE], [SCORE_EXO]]),

  sourcedUnits({
    id: "block-ptm-differential",
    type: "table",
    heading: "The differential, lesion by lesion",
    columns: ["Lesion", "Who and where", "Imaging and markers", "Management"],
    rows: [
      ["Ductal adenocarcinoma", "60s to 70s, smokers, new diabetes; about a third in the body or tail", "Hypoattenuating, hypovascular, ill-defined solid mass with upstream duct dilation; CA 19-9 elevated", "Distal pancreatectomy with en bloc splenectomy and systemic therapy; spleen preservation is not indicated"],
      ["Mucinous cystic neoplasm", "Women 40 to 50 (10:1 female); more than 90% in the body or tail", "Thick-walled septated macrocyst, peripheral eggshell calcification, no duct communication, ovarian-type stroma; CEA high, amylase low, mucin positive", "Resect for malignant potential; spleen-preserving resection if no malignant features"],
      ["Serous cystadenoma", "Women 60 to 70 (4:1 female)", "Microcystic honeycomb with central starburst calcification; CEA low, amylase low, no mucin", "Observe unless symptomatic or growing"],
      ["Branch-duct IPMN", "60s to 70s, both sexes; often the head or uncinate", "Grape-like cysts communicating with side branches, main duct under 5 mm; CEA and amylase high", "Resect for high-risk stigmata; otherwise size-based surveillance"],
      ["Main-duct IPMN", "60s to 70s; diffuse or segmental", "Main duct 5 mm or more without another cause", "Resect if fit, with frozen section of the duct margin"],
      ["Nonfunctional PNET", "Most common PNET (35%), 75% malignant; MEN 1 and VHL", "Arterial-phase hyperenhancement, unlike adenocarcinoma; chromogranin A", "Observe at 1 cm or less; observe or resect at 1 to 2 cm; formal resection with lymphadenectomy above 2 cm"],
      ["Insulinoma", "Most common functional PNET, spread evenly through the gland, 90% benign", "Whipple triad; confirmed by a supervised 72-hour fasting test", "Enucleation when more than 2 mm from the main duct, otherwise anatomic resection"],
      ["Glucagonoma", "Most in the distal pancreas; usually malignant", "Diabetes, necrolytic migratory erythema, DVT and weight loss; fasting glucagon over 1000 pg/mL", "Resect regardless of size, like every functional PNET"],
      ["Solid pseudopapillary neoplasm", "Young women (10:1 female) in the second or third decade; body and tail common", "Large encapsulated mixed solid-cystic mass with hemorrhage; beta-catenin mutation", "Resect; about 95% five-year survival, and formal lymphadenectomy is not needed"],
      ["Pseudocyst", "History of pancreatitis or alcohol", "Unilocular, no solid component, mature wall at 4 weeks or more; CEA low, amylase very high", "Expectant unless symptomatic, infected or obstructing; endoscopic cystgastrostomy preferred"],
    ],
  }, [[SCORE_EXO, OE], [SCORE_CYST, OE], [SCORE_CYST], [SCORE_CYST, OE], [SCORE_CYST, OE], [FISER, SCORE_ENDO, OE], [FISER, SCORE_ENDO], [FISER, SCORE_ENDO, OE], [SCORE_EXO, OE], [SCORE_CYST, OE]]),

  sourcedUnits({
    id: "block-ptm-workup-flow",
    type: "flow",
    heading: "Working up a tail mass",
    nodes: [
      { id: "start", label: "An adult has a pancreatic tail mass, found incidentally or with left upper quadrant pain and weight loss." },
      { id: "ct", label: "Pancreas-protocol CT, with pancreatic and portal venous phases, defines the location, duct dilation and the relationship to the celiac axis, SMA, SMV and portal vein." },
      { id: "characterize", label: "The lesion is classified as solid or cystic, and as hypervascular or hypovascular in the arterial phase." },
      { id: "mri", label: "MRI with MRCP characterizes a cystic lesion and shows whether it communicates with the main duct.", tone: "good" },
      { id: "eus", label: "EUS with FNA or fine-needle biopsy obtains tissue when neoadjuvant therapy is planned or the diagnosis is in doubt, and cyst fluid for CEA, glucose, amylase and cytology." },
      { id: "stage", label: "Staging adds CT of the chest, liver function tests and CA 19-9, with staging laparoscopy for high CA 19-9, indeterminate imaging or borderline disease." },
      { id: "resect", label: "Resectable disease in a fit patient proceeds to distal pancreatectomy, with or without the spleen." },
      { id: "neoadjuvant", label: "Borderline resectable adenocarcinoma gets neoadjuvant FOLFIRINOX or gemcitabine with nab-paclitaxel after tissue diagnosis, then restaging.", tone: "caution" },
    ],
    edges: [
      { from: "start", to: "ct", label: "Cross-sectional imaging begins every workup." },
      { from: "ct", to: "characterize", label: "The CT appearance sets the solid or cystic pathway." },
      { from: "characterize", to: "mri", label: "A cyst needs its ductal anatomy defined first." },
      { from: "characterize", to: "eus", label: "A solid lesion needs tissue only when it changes the plan." },
      { from: "mri", to: "eus", label: "A cyst with worrisome features, or one over 2 cm, goes to EUS." },
      { from: "eus", to: "stage", label: "Confirmed or suspected malignancy triggers full staging." },
      { from: "stage", to: "resect", label: "Resectable and no metastases" },
      { from: "stage", to: "neoadjuvant", label: "Borderline resectable" },
    ],
  }, [[SCORE_EXO], [SCORE_EXO, OE], [SCORE_ENDO], [SCORE_CYST, OE], [SCORE_DP, OE], [SCORE_EXO], [SCORE_EXO], [SCORE_EXO], [SCORE_EXO], [SCORE_EXO], [SCORE_CYST], [SCORE_EXO, OE], [OE], [SCORE_EXO], [SCORE_EXO], [SCORE_EXO]]),

  sourced({
    id: "block-ptm-biopsy-warning",
    type: "warning",
    heading: "Tissue: when it is needed, and how to get it",
    text: "A biopsy is **not** required before resecting a suspected adenocarcinoma, but it **is** required before neoadjuvant therapy. Get it by EUS, which yields more and seeds less than a percutaneous CT-guided biopsy, and do not let a nondiagnostic biopsy delay resection when suspicion is high.",
  }, OE),

  sourcedUnits({
    id: "block-ptm-cyst-fluid",
    type: "table",
    heading: "Reading the cyst fluid",
    columns: ["Test", "Result", "What it means"],
    rows: [
      ["CEA", "Above 192 ng/mL", "Mucinous (MCN or IPMN); specific but not sensitive, and the level does not predict dysplasia or cancer"],
      ["Glucose", "50 mg/dL or less", "Mucinous, and more accurate than CEA: pooled sensitivity 91%, specificity 86%"],
      ["Amylase", "Very high", "Duct communication, as in a pseudocyst or IPMN; below 250 U/L practically excludes a pseudocyst"],
      ["Mucin", "Present", "MCN or IPMN; absent in serous cystadenoma and pseudocyst"],
      ["Molecular markers", "KRAS, GNAS, VHL", "KRAS means mucinous, GNAS means IPMN specifically, VHL means serous"],
    ],
  }, [[SCORE_CYST, OE], [OE], [SCORE_CYST, OE], [SCORE_CYST], [OE]]),

  sourcedUnits({
    id: "block-ptm-ipmn-features",
    type: "table",
    heading: "IPMN risk features: the SCORE list and the 2017 Fukuoka wording",
    columns: ["Tier", "SCORE module", "Fukuoka 2017"],
    rows: [
      ["High-risk stigmata (resect if fit)", "Main duct over 1 cm, an enhancing solid component, jaundice", "Obstructive jaundice from a head cyst, an enhancing mural nodule of 5 mm or more, main duct 10 mm or more"],
      ["Worrisome features (go to EUS)", "Cyst over 3 cm, main duct 5 to 9 mm, thickened enhancing wall, nonenhancing mural nodules", "Cyst 3 cm or more, enhancing nodule under 5 mm, thickened enhancing wall, main duct 5 to 9 mm, abrupt duct caliber change with distal atrophy, lymphadenopathy, elevated CA 19-9, growth of 5 mm or more over 2 years, pancreatitis"],
    ],
  }, [[SCORE_CYST, FUKUOKA], [SCORE_CYST, FUKUOKA]]),

  sourcedUnits({
    id: "block-ptm-ipmn-risk",
    type: "bullets",
    heading: "↳ How dangerous an IPMN is",
    items: [
      "SCORE gives branch-duct IPMN a 10% to 15% risk of invasive malignancy and main-duct or mixed IPMN 30% to 50%.",
      "In a 1,160-patient surveillance cohort, five-year cancer risk was 2% to 3% for cysts without worrisome features, 4.1% with worrisome features, and 49.7% with high-risk stigmata.",
      "In resected IPMNs, malignancy rose with the number of worrisome features (22%, 34%, 59%, then 100% with four or more), and was 70% with any high-risk stigma.",
      "The 2024 Kyoto revision adds suspicious or positive cytology as a high-risk stigma and growth of 2.5 mm a year as a worrisome feature.",
      "After resection of an IPMN, the remnant is surveilled for life.",
    ],
  }, [[SCORE_CYST], [OE], [OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-ptm-resectability",
    type: "table",
    heading: "Resectability of a body or tail cancer",
    columns: ["Status", "Definition"],
    rows: [
      ["Resectable", "No arterial contact; no SMV or portal vein contact, or contact of 180 degrees or less without contour distortion"],
      ["Borderline resectable", "Neither resectable nor unresectable; for a body or tail tumor, solid contact with the celiac axis of 180 degrees or less, decided at a multidisciplinary tumor board"],
      ["Locally advanced", "More than 180 degrees of contact with the SMA or celiac axis, celiac contact with aortic involvement, or an unreconstructable SMV or portal vein; locally advanced does not mean unresectable"],
      ["Metastatic", "Any distant metastasis, nonregional nodes included: no upfront resection, whatever the anatomy"],
      ["Splenic vessels", "Splenic artery or vein involvement alone does not preclude resection, because both come out with the specimen"],
    ],
  }, [[SCORE_EXO, NCCN], [SCORE_EXO, NCCN, OE], [SCORE_EXO, NCCN], [SCORE_EXO], [SCORE_EXO, OE]]),

  sourcedUnits({
    id: "block-ptm-staging",
    type: "bullets",
    heading: "↳ Staging and markers",
    items: [
      "Staging needs CT of the chest and pelvis with the pancreas-protocol study, liver function tests, and CA 19-9 drawn after biliary decompression.",
      "CA 19-9 is elevated in about 80% of advanced cancers but is useless for screening, Lewis antigen-negative patients cannot make it, and a preoperative level of 500 IU/mL or more signals a worse prognosis.",
      "Staging laparoscopy is good practice for every borderline resectable cancer, because 25% harbor occult metastases, and it is used **especially for body and tail lesions**.",
      "Positive peritoneal cytology is M1 disease.",
      "Germline testing is recommended for every patient with pancreatic adenocarcinoma.",
    ],
  }, [[SCORE_EXO], [SCORE_EXO, OE], [SCORE_EXO, OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-ptm-operation",
    type: "bullets",
    heading: "Distal pancreatectomy: the principles",
    items: [
      "Distal pancreatectomy removes the body and tail, usually dividing the gland at the neck along the SMV, with the line moved left or right by pathology and the wish to preserve endocrine and exocrine function.",
      "For confirmed or suspected adenocarcinoma, the spleen comes out **en bloc** with the tail to clear the nodes along the splenic vessels and hilum, and the neck margin goes for frozen section.",
      "Up to 40% of R0 resections for adenocarcinoma need en bloc removal of organs beyond the spleen: stomach, colon or mesocolon, adrenal, kidney or jejunum. An R0 margin means no tumor within 1 mm.",
      "For a benign or low-grade tail lesion, a more distal transection keeps more gland and lowers the risk of postoperative diabetes.",
      "**RAMPS** (radical antegrade modular pancreatosplenectomy) divides the neck first and dissects medial to lateral, anterior to the adrenal for a confined tumor or behind Gerota fascia with the adrenal for posterior extension; it raises margin clearance and node yield without a proven survival benefit.",
      "The stump is closed with a stapler or an energy device, with or without oversewing or an omental flap, and the splenic vessel stumps are kept short because long stumps thrombose or rupture.",
      "Intraoperative ultrasound localizes small solid and cystic tumors that cannot be seen or felt.",
      "Distal pancreatectomy carries more new-onset diabetes than a Whipple, because the body and tail hold most of the beta-cell mass.",
      "Vaccinate against encapsulated organisms 2 to 3 weeks before any operation that may include splenectomy, or 2 weeks after.",
    ],
  }, [[SCORE_DP], [SCORE_DP, OE], [OE], [OE], [SCORE_DP, OE], [SCORE_DP], [SCORE_DP], [SCORE_DP], [SCORE_DP]]),

  sourcedUnits({
    id: "block-ptm-spleen",
    type: "table",
    heading: "↳ Keeping the spleen: Kimura against Warshaw",
    columns: ["Point", "Kimura", "Warshaw"],
    rows: [
      ["What is kept", "Splenic artery, splenic vein and short gastric vessels, dissected off the gland", "Only the short gastric vessels; the splenic artery and vein are taken away from the hilum"],
      ["How the spleen is perfused", "Its native vessels", "Short gastric and left gastroepiploic collaterals"],
      ["Best suited to", "Small, distal benign lesions separable from the vessels", "Larger or more proximal lesions, lesions stuck to the vessels, or rescue when Kimura fails"],
      ["Splenic infarction", "Less frequent (odds ratio about 0.14 to 0.17 against Warshaw)", "More frequent; long-term hypoperfusion 30.4% against 12.2%"],
      ["Gastric varices", "Less frequent (odds ratio about 0.1 to 0.19)", "Perigastric varices 19.6% against 7.3%"],
    ],
  }, [[SCORE_DP], [OE], [OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-ptm-pnet",
    type: "bullets",
    heading: "Neuroendocrine tumors of the tail",
    items: [
      "PNETs enhance in the arterial phase because they are hypervascular, which separates them from hypovascular adenocarcinoma.",
      "A nonfunctional tumor of 1 cm or less is observed; at 1 to 2 cm it is observed or resected, and a grade 1 tumor under 2 cm can be safely observed; above 2 cm, or invasive or node-positive, it gets formal pancreatectomy with regional lymphadenectomy.",
      "A functional tumor is resected whatever its size.",
      "Enucleation suits tumors more than 2 mm from the main pancreatic duct, most of all insulinomas, but leaks more often than formal resection; a deep tumor or one against the duct needs a spleen-preserving distal pancreatectomy instead.",
      "**MEN 1**, the commonest syndrome behind PNETs, is an autosomal dominant menin mutation on chromosome 11q13 with parathyroid disease and pituitary adenomas.",
      "An observed small PNET gets CT or MRI at least yearly, and is resected if it grows, the duct dilates or the grade rises.",
    ],
  }, [[SCORE_ENDO], [OE], [OE], [SCORE_ENDO, OE], [SCORE_ENDO], [OE]]),

  sourced({
    id: "block-ptm-fistula-warning",
    type: "warning",
    heading: "The fistula after distal pancreatectomy",
    text: "Tachycardia, fever or high drain output after a distal pancreatectomy means CT for a fistula or collection. A leak at the transection margin is one of the commonest complications, in up to one third of patients, because the stump cannot be anastomosed. Leave an operative drain at the staple line.",
  }, SCORE_DP),

  sourced({
    id: "block-ptm-isgps",
    type: "table",
    heading: "↳ ISGPS 2016 fistula grades",
    columns: ["Grade", "Definition"],
    rows: [
      ["Biochemical leak", "Drain amylase over 3 times the institutional upper limit of normal serum amylase on or after day 3 with no clinical impact; the old grade A, and no longer a fistula"],
      ["Grade B", "A change in management: drain left more than 3 weeks, percutaneous or endoscopic drainage, angiographic treatment of bleeding, or infection without organ failure"],
      ["Grade C", "Reoperation, organ failure, or death attributable to the fistula"],
    ],
  }, ISGPS),

  sourcedUnits({
    id: "block-ptm-systemic",
    type: "bullets",
    heading: "Systemic therapy for adenocarcinoma",
    items: [
      "The regimen follows comorbidity and ECOG performance status.",
      "Neoadjuvant therapy is increasingly used for borderline resectable disease: FOLFIRINOX for fit patients, gemcitabine with nab-paclitaxel for the less fit.",
      "After resection, modified FOLFIRINOX for ECOG 0 to 1 and gemcitabine with capecitabine are the category 1 options, with gemcitabine alone for poor performance status.",
      "Adjuvant therapy starts within 6 to 12 weeks of surgery and runs 6 months.",
    ],
  }, [[SCORE_EXO], [SCORE_EXO], [SCORE_EXO, NCCN], [OE]]),

  sourcedUnits({
    id: "block-ptm-surveillance",
    type: "bullets",
    heading: "Surveillance of an unresected branch-duct IPMN",
    items: [
      "Under 1 cm: MRI or CT at 6 months, then every 2 years if unchanged.",
      "2 to 3 cm: EUS in 3 to 6 months, then lengthen to yearly, alternating MRI with EUS; consider surgery in a young, fit patient facing decades of surveillance.",
      "Over 3 cm: close surveillance alternating MRI and EUS every 3 to 6 months, and strongly consider surgery in a young, fit patient.",
      "Any new worrisome feature goes to EUS, and any new high-risk stigma to resection.",
    ],
  }, [[SCORE_CYST], [SCORE_CYST], [SCORE_CYST], [OE]]),

  sourcedUnits({
    id: "block-ptm-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["The spleen with a distal tumor", "Fiser: distal pancreatectomy and splenectomy for resectable distal tumors", "SCORE: splenectomy en bloc for confirmed or suspected adenocarcinoma, and Kimura or Warshaw spleen preservation for indolent lesions, increasingly during minimally invasive resection"],
      ["PNET enucleation", "Fiser: enucleate an insulinoma of 2 cm or less, formal resection above that", "SCORE: enucleate when the tumor is more than 2 mm from the main duct; NCCN: not adjacent to the duct. Distance and depth decide, not size"],
      ["Branch-duct IPMN malignancy", "Fiser: 5% malignant transformation over 5 years", "SCORE: 10% to 15% risk of invasive malignancy; a Mayo surveillance cohort: 2% to 3% at 5 years without worrisome features. Surgical series and surveillance cohorts count different patients"],
      ["Adjuvant chemotherapy", "Fiser: FOLFIRINOX for everyone after resection", "SCORE and NCCN: by fitness, modified FOLFIRINOX for ECOG 0 to 1 and gemcitabine-capecitabine or gemcitabine for the less fit"],
      ["Survival", "Fiser: 10% overall at 5 years, 20% after resection for cure", "SCORE (SEER 2015 to 2021): 13.3% overall and about 44% for localized disease; PRODIGE-24: 43% at 5 years with modified FOLFIRINOX in fit patients"],
      ["Mucinous cyst marker", "Fiser and SCORE: cyst fluid CEA above 192 ng/mL", "Cyst fluid glucose of 50 mg/dL or less is more accurate, and adding CEA adds little"],
      ["Fistula definition", "SCORE module: drain amylase over 3 times the serum amylase on or after day 3", "ISGPS 2016: over 3 times the institutional upper limit of normal serum amylase, and a biochemical leak without clinical impact is not a fistula"],
      ["Celiac contact over 180 degrees", "NCCN 2017 to 2021: borderline if there is no aortic involvement and the GDA is intact, because a modified Appleby (DP-CAR) is possible", "NCCN v4.2026: locally advanced; arterial resection only in experienced centers after an objective response to neoadjuvant therapy"],
      ["The approach", "Open distal pancreatectomy with splenectomy for every left-sided lesion", "Minimally invasive resection preferred for benign and low-grade disease (Miami guidelines), and noninferior for R0 in adenocarcinoma (DIPLOMA: 73% against 69%)"],
    ],
  }, [[FISER, SCORE_DP], [FISER, SCORE_ENDO, OE], [FISER, SCORE_CYST, OE], [FISER, SCORE_EXO, NCCN], [FISER, SCORE_EXO, PRODIGE], [FISER, SCORE_CYST, OE], [SCORE_DP, ISGPS], [OE], [OE, DIPLOMA]]),

  sourced({
    id: "block-ptm-playbook-pointer",
    type: "prose",
    heading: "↳ The operation",
    text: "Port placement, vessel control, stapler technique and the bailouts are in the robotic distal pancreatectomy playbook. Head tumors, the Whipple and PRODIGE-24 in detail are in [[Pancreaticoduodenectomy]].",
  }, SCORE_DP),

  references("block-ptm-references", [SCORE_EXO, SCORE_CYST, SCORE_ENDO, SCORE_DP, FISER, OE, NCCN, ISGPS, FUKUOKA, PRODIGE, DIPLOMA]),
];

export const pancreaticTailMassTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000006020",
  versionId: "00000000-0000-4000-8000-000000006021",
  slug: "pancreatic-tail-mass",
  title: "Pancreatic Tail Mass",
  aliases: [
    "pancreatic tail tumor", "tail of pancreas mass", "pancreatic tail lesion", "distal pancreatic mass", "left-sided pancreatic cancer",
    "body and tail pancreatic cancer", "body and tail pancreatic lesion", "mucinous cystic neoplasm", "serous cystadenoma", "IPMN",
    "intraductal papillary mucinous neoplasm", "branch-duct IPMN", "main-duct IPMN", "Fukuoka criteria", "worrisome features",
    "high-risk stigmata", "cyst fluid CEA", "solid pseudopapillary neoplasm", "solid pseudopapillary tumor", "pancreatic neuroendocrine tumor",
    "PNET", "nonfunctional PNET", "insulinoma", "glucagonoma", "Whipple triad", "sinistral portal hypertension", "left-sided portal hypertension", "Kimura technique",
    "Warshaw technique", "spleen-preserving distal pancreatectomy", "RAMPS", "radical antegrade modular pancreatosplenectomy",
  ],
  scoreNodeId: "pancreas-conditions",
  scoreCategory: "SCORE · Pancreas · Diseases & Conditions",
  tags: ["pancreas", "pancreatic-cancer", "pancreatic-tail", "cystic-neoplasm", "pnet", "distal-pancreatectomy", "surgical-oncology", "absite", "score"],
  sourceId: SCORE_EXO,
  additionalSourceIds: [SCORE_CYST, SCORE_ENDO, SCORE_DP, FISER, OE, NCCN, ISGPS, FUKUOKA, PRODIGE, DIPLOMA],
  blocks,
  reviewedAt: "2026-10-30T00:00:00.000Z",
});
