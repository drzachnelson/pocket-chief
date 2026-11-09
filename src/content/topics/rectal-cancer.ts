import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACOSOG_Z6051_SOURCE as Z6051,
  ALACART_TRIAL_SOURCE as ALACART,
  DOSTARLIMAB_FDA_2026_SOURCE as FDA,
  NCCN_RECTAL_2026_SOURCE as NCCN,
  RECTAL_CANCER_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/rectal-cancer-pocket-chief.docx (2026-11-09). Inline citations stripped at the owner's request
// and kept in the source details. The packet's DRAFT CORRECTION and CLASSIC vs CURRENT lines are gathered into the
// split table. TNM categories match colon cancer and are not repeated here.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-rc-summary",
    type: "summary",
    heading: "At a glance",
    text: "The first steps in any new rectal cancer are **pelvic MRI and universal MMR/MSI testing**. Favorable T1 tumors can be locally excised; T2 N0 goes to total mesorectal excision (TME). Locally advanced pMMR disease (T3, T4, or node-positive) gets **total neoadjuvant therapy**, then TME or watch-and-wait after a clinical complete response, while **dMMR** disease gets a checkpoint inhibitor first and often avoids radiation and surgery. An involved circumferential margin (1 mm or less) is the strongest predictor of local recurrence.",
  }, PACKET),

  sourced({
    id: "block-rc-stage-management",
    type: "table",
    heading: "Stage-based management (pMMR/MSS unless stated)",
    columns: ["Clinical stage", "TNM", "Primary treatment"],
    rows: [
      ["Stage 0 or malignant polyp", "Tis, or a pT1 polyp", "Polypectomy or local excision; observe if favorable"],
      ["Low-risk stage I", "Favorable T1 N0", "ESD, transanal local excision (TEM or TAMIS), or transabdominal resection"],
      ["High-risk T1 or T2", "High-risk T1 N0 (positive margin, lymphovascular invasion, poor differentiation, sm3); T2 N0", "TME preferred; alternatively chemoradiation or short-course RT with consideration of FOLFOX or CAPEOX, then restage"],
      ["Locally advanced, pMMR", "T3 N any; T1–2 N1–2; T4 N any", "Total neoadjuvant therapy, then TME or watch-and-wait after clinical complete response"],
      ["Locally advanced, dMMR/MSI-H", "Same T and N categories", "Checkpoint inhibitor for up to 6 months, preferred"],
      ["Stage IV", "Any T, any N, M1", "Systemic therapy; resect or ablate liver and lung oligometastases when feasible"],
    ],
  }, PACKET),

  sourced({
    id: "block-rc-anatomy",
    type: "bullets",
    heading: "Anatomy that drives staging and morbidity",
    items: [
      "The rectum is 12–15 cm long, with **no taeniae, appendices epiploicae, or haustra**, and three valves of Houston.",
      "Peritoneum covers the upper third anteriorly and laterally and the middle third anteriorly only; the lower third is entirely extraperitoneal.",
      "Arteries: superior rectal (terminal IMA), middle rectal (internal iliac), and inferior rectal (internal pudendal).",
      "Upper rectal veins drain through the IMV to the portal system, so liver metastasis comes first. Middle and lower rectal veins drain to the internal iliac vein and IVC, bypassing the liver, so **isolated lung metastases** are more common in distal rectal cancer.",
      "Upper and mid rectum drain along the superior rectal vessels to IMA nodes; the low rectum also drains laterally to internal iliac and obturator nodes, and below the dentate line to inguinal nodes.",
      "Regional nodes are mesorectal, internal iliac, and obturator. **Common iliac, external iliac, and retroperitoneal nodes are M1**; inguinal nodes are regional only when tumor extends below the dentate line.",
      "Fascia: the mesorectal fascia is the envelope TME removes and defines the circumferential margin; Waldeyer fascia lies posterior, Denonvilliers fascia anterior.",
      "Nerves: hypogastric (sympathetic) injury causes **ejaculatory dysfunction**; pelvic splanchnic (parasympathetic, nervi erigentes) injury causes **erectile and bladder dysfunction**.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-epidemiology-presentation",
    type: "bullets",
    heading: "Epidemiology and presentation",
    items: [
      "About 30% of colorectal cancers are rectal; about 5%–10% of rectal cancers are dMMR, fewer than in the colon.",
      "Under age 50, incidence has risen about 2% a year since 2003 and is projected to reach 25% of rectal cancers; these tumors are disproportionately distal, found because of symptoms, and often advanced.",
      "Average-risk screening starts at 45. High-yield risks: age, Lynch syndrome, FAP, IBD, a first-degree relative with CRC or advanced adenoma, prior adenoma or CRC, obesity, smoking, alcohol, and processed or red meat.",
      "Hematochezia, often misattributed to hemorrhoids in young patients, plus change in habits, tenesmus, narrow stools, mucus, and iron-deficiency anemia.",
      "Red flags: obstruction or perforation, tenesmus or pain from sphincter or levator invasion, and a **fixed tumor on DRE** suggesting T4 or a threatened margin.",
      "Exclude anal canal squamous cell carcinoma, treated with definitive chemoradiation (Nigro) rather than TME, and anorectal melanoma, which follows its own pathway.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-workup",
    type: "table",
    heading: "Workup",
    columns: ["Step", "Test", "Purpose"],
    rows: [
      ["Exam", "DRE", "Height, mobility or fixation, sphincter involvement and tone"],
      ["Surgeon endoscopy", "Rigid proctoscopy or flexible sigmoidoscopy by the treating surgeon", "Distance from the anal verge and anorectal ring, size, circumferential extent, orientation"],
      ["Whole colon", "Complete colonoscopy", "Synchronous lesions and biopsy"],
      ["Local staging", "**Pelvic MRI**, preferred", "T, N, mesorectal fascia and margin, EMVI, tumor deposits, lateral nodes, sphincter relationship, and relation to the peritoneal reflection"],
      ["Limited local staging", "Endorectal ultrasound", "Only for T1 tumors or when MRI is contraindicated"],
      ["Distant staging", "CT chest plus CT or MRI abdomen", "Metastases"],
      ["Labs", "CBC, chemistry, CEA", "Baseline"],
      ["Molecular", "**Universal MMR or MSI testing**", "Decides immunotherapy first against TNT, and screens for Lynch"],
      ["Not routine", "FDG-PET/CT", "Only for equivocal findings, contrast contraindication, or potentially curable M1 disease"],
    ],
  }, PACKET),

  sourced({
    id: "block-rc-mri",
    type: "bullets",
    heading: "↳ MRI technique and margin definitions",
    items: [
      "MRI needs at least 1.5 T, an external phased-array coil (endorectal coils are not recommended), 2D high-resolution T2 slices of 1–3 mm, and diffusion-weighted imaging with b at least 800–1000.",
      "MRI cannot reliably separate Tis, T1, and T2, which is where endorectal ultrasound complements it.",
      "**Clear margin on MRI**: more than 1 mm from the mesorectal fascia and levators, with no intersphincteric plane invasion.",
      "**Involved margin on MRI**: 1 mm or less from the mesorectal fascia, or from the levator in low tumors.",
      "**Positive pathologic margin**: tumor 1 mm or less from the margin, by direct extension or within a node.",
    ],
  }, NCCN),

  sourced({
    id: "block-rc-staging",
    type: "bullets",
    heading: "Staging features that change treatment",
    items: [
      "AJCC 8th TNM and stage groups are the same as for [[Colon Cancer]]: T4b invades or adheres to adjacent organs, N1c is tumor deposits with negative nodes, and M1c is peritoneal metastasis.",
      "Micrometastases of 0.2–2.0 mm are positive nodes; isolated tumor cells under 0.2 mm are N0. At least 12 nodes is the standard, but it is often not reached after neoadjuvant therapy and the minimum in that setting is unknown.",
      "High-risk MRI features that drive TNT: T4, EMVI, tumor deposits, a threatened or involved mesorectal fascia, a threatened intersphincteric plane, cN2, and enlarged lateral nodes.",
      "Tumor regression grade after neoadjuvant therapy: 0 complete, 1 moderate, 2 minimal, 3 poor response.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-local-excision",
    type: "table",
    heading: "Transanal local excision criteria",
    columns: ["Criterion", "Requirement"],
    rows: [
      ["Depth", "**T1 only**, with no lymphadenopathy on imaging"],
      ["Size", "Under 3 cm"],
      ["Circumference", "Under 30% of the bowel wall"],
      ["Mobility", "Mobile, not fixed"],
      ["Height", "Within 8 cm of the anal verge; TEM and TAMIS reach higher"],
      ["Histology", "Well to moderately differentiated, with no lymphovascular or perineural invasion"],
      ["Margin and specimen", "Clear margin over 3 mm from a full-thickness excision aiming for 10 mm, delivered intact and unfragmented"],
    ],
  }, NCCN),

  sourced({
    id: "block-rc-local-excision-notes",
    type: "bullets",
    heading: "↳ Why selection is strict, and what follows",
    items: [
      "Occult nodal metastasis occurs in 6%–11% of T1 tumors, more with sm3 invasion, poor differentiation, budding, lymphovascular or perineural invasion.",
      "After local excision, pT1 without high-risk features is observed. **High-risk pT1 or pT2 on final pathology means completion TME** (preferred), or chemoradiation or short-course RT with consideration of chemotherapy.",
      "TEM and TAMIS beat conventional transanal excision for en bloc and complete resection and for local recurrence; ESD is an endoscopic alternative.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-tnt",
    type: "bullets",
    heading: "Total neoadjuvant therapy for locally advanced pMMR disease",
    items: [
      "Indications: T3 N any, T1–2 N1–2, T4 N any, and locally unresectable or medically inoperable disease.",
      "**Consolidation**: long-course chemoradiation or short-course RT first, then 12–16 weeks of FOLFOX or CAPEOX (consider FOLFIRINOX).",
      "**Induction**: 12–16 weeks of chemotherapy first, then radiation.",
      "Non-T4 tumors eligible for sphincter-sparing surgery (the PROSPECT pathway): FOLFOX or CAPEOX for 12–16 weeks, then restage. Regression over 20% goes to surgery; 20% or less, or persistent high-risk features, adds chemoradiation or short-course RT.",
      "ASCO: offer TNT for low tumors and high-risk tumors, prefer consolidation sequencing and long-course chemoradiation over short-course RT, and do not decide on MRI nodal status alone.",
      "Pelvic dose is 45–54 Gy in 25–30 fractions, classically **50.4 Gy in 28**, with an optional 5.4–9.0 Gy boost; short-course RT is **25 Gy in 5 fractions**. Concurrent capecitabine 825 mg/m² twice daily on RT days or infusional 5-FU 225 mg/m² a day.",
      "Total perioperative chemotherapy runs 3–6 months. Stage II–III tumors with somatic PI3K pathway alterations get aspirin 100–162 mg daily for 3 years after surgery.",
      "ctDNA is prognostic but not used for treatment decisions, de-escalation, or surveillance.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-trials",
    type: "table",
    heading: "Landmark trials",
    columns: ["Trial", "Design", "Key result"],
    rows: [
      ["German CAO/ARO/AIO-94", "Preoperative against postoperative chemoradiation", "5-year local recurrence 6% against 13% and less toxicity, with **no OS difference**; sphincter preservation 39% against 19% when APR was predicted"],
      ["PRODIGE 23", "mFOLFIRINOX, chemoradiation, TME, and adjuvant chemotherapy against standard care", "pCR 27.8% against 12.1%; 7-year OS 81.9% against 76.1%, the first TNT survival benefit"],
      ["RAPIDO", "Short-course RT then chemotherapy then TME, against chemoradiation", "pCR 28.4% against 14.3% and less disease-related treatment failure, but no OS gain and more 5-year local recurrence (10.2% against 6.1%)"],
      ["OPRA", "Induction against consolidation TNT, with watch-and-wait after complete response", "Similar 5-year DFS; **TME-free survival 54% with consolidation against 39% with induction**; 94% of regrowths within 2 years, and salvage TME matched upfront TME"],
      ["PROSPECT", "FOLFOX with selective chemoradiation against chemoradiation", "Noninferior 5-year DFS (80.8% against 78.6%) and local recurrence (1.8% against 1.6%); only 9.1% needed preoperative chemoradiation"],
      ["TNTCRT", "CAPOX throughout long-course RT against chemoradiation in high-risk disease", "3-year DFS 74.8% against 66.0%; pCR 26.4% against 9.8%"],
    ],
  }, PACKET),

  sourced({
    id: "block-rc-watch-and-wait",
    type: "bullets",
    heading: "Watch-and-wait after clinical complete response",
    items: [
      "Only at centers with experienced multidisciplinary teams, in patients committed to intensive surveillance.",
      "Complete response requires all three: a pale, smooth scar on endoscopy with no ulcer, nodularity, or stricture; a smooth, flat scar on DRE; and a low-signal T2 scar on MRI with **no diffusion restriction** and no suspicious nodes.",
      "**Biopsy adds nothing** when the criteria are met, and suspected regrowth needs no biopsy either, because false negatives are common.",
      "Assess no earlier than 8 weeks after radiation in induction TNT, and within 1 month of finishing chemotherapy in consolidation TNT; a near-complete response is reassessed after 8 more weeks.",
      "Selective watch-and-wait matched mandatory TME for DFS, distant and local recurrence, and OS in pooled trial data, with better long-term bowel function and quality of life.",
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-rc-dmmr",
    type: "bullets",
    heading: "dMMR/MSI-H locally advanced rectal cancer",
    items: [
      "A **checkpoint inhibitor for up to 6 months** is preferred, re-evaluating every 2–3 months: complete response goes to surveillance, persistent disease at 6 months to chemoradiation or short-course RT and then surgery. TNT remains an alternative.",
      "Dostarlimab 500 mg IV every 3 weeks for 9 cycles produced complete clinical response in all of the first 12 patients and sustained response in 49 of 49 at a median 30 months, with no chemoradiation or surgery.",
      "The FDA granted dostarlimab accelerated approval in October 2026 for stage II–III dMMR/MSI-H locally advanced rectal cancer, based on the single-arm AZUR-1 trial.",
      "dMMR tumors respond poorly to chemotherapy and chemoradiation and are exquisitely sensitive to PD-1 blockade.",
    ],
  }, [[PACKET], [PACKET], [FDA], [PACKET]]),

  sourced({
    id: "block-rc-surgery",
    type: "bullets",
    heading: "Surgical principles",
    items: [
      "**TME** is sharp dissection in the avascular holy plane between the mesorectal fascia and the parietal pelvic fascia; it lowers margin positivity and local recurrence and is standard for mid and low tumors.",
      "Take the mesorectum **4–5 cm below the tumor** (tumor-specific mesorectal excision for upper-rectal tumors). For distal tumors within 5 cm of the anal verge, a 1–2 cm distal bowel-wall margin may be acceptable.",
      "When MRI predicts an involved margin, plan en bloc resection beyond the TME plane, including exenteration elements, aiming for R0.",
      "Extended lateral node dissection is not indicated without clinically suspicious nodes; suspicious nodes outside the field are biopsied or removed.",
      "LAR with TME for mid and upper tumors with an adequate distal margin; coloanal anastomosis, with or without intersphincteric resection, for very low tumors with intact external sphincter function.",
      "**APR** with end colostomy for direct sphincter or levator invasion, no achievable negative distal margin, or poor baseline continence; Hartmann when sphincter preservation is unwise but a perineal wound is undesirable or the goal is palliation.",
      "Upfront surgery alone suits an adequately staged, low-risk upper-rectal T3 N0 tumor.",
      "Minimally invasive surgery is safe with no DFS or recurrence difference, but open surgery is preferred for a threatened margin, and MIS is generally not used for obstruction or perforation.",
      "After upfront resection, pT1–2 N0 is observed and pT3 N0 or node-positive disease gets chemotherapy with or without chemoradiation; postoperative RT is highly selective.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-stage-iv",
    type: "bullets",
    heading: "Stage IV disease",
    items: [
      "Resectable synchronous liver or lung metastases, pMMR: chemotherapy first (FOLFOX, CAPEOX, or FOLFIRINOX), then pelvic RT, then staged or synchronous resection of the metastases and primary; RT can be held after a good response. dMMR: checkpoint inhibitor.",
      "Resection is preferred over ablation, but thermal ablation is equivalent for lesions 3 cm or smaller (COLLISION: 5-year OS 51.2% against 58%, not significant).",
      "Five-year OS is 35%–65% after liver resection against about 15.6% for unresectable metastatic CRC. Resecting an asymptomatic primary with unresectable metastases does not improve survival.",
      "Consider portal vein embolization or staging when the standardized future liver remnant is under 30%, or under 40% after prolonged chemotherapy.",
      "Fong clinical risk score, 1 point each: node-positive primary, disease-free interval under 12 months, more than 1 tumor, CEA over 200 ng/mL, and largest tumor over 5 cm.",
    ],
  }, PACKET),

  sourced({
    id: "block-rc-surveillance",
    type: "table",
    heading: "Surveillance",
    columns: ["Scenario", "Schedule"],
    rows: [
      ["Stage II–IV", "H&P and CEA every 3–6 months for 2 years, then every 6 months to 5 years; CT chest, abdomen, and pelvis every 6–12 months for 5 years (stage IV every 3–6 months for 2 years)"],
      ["Colonoscopy", "At 1 year, or 3–6 months if no complete preoperative colonoscopy; advanced adenoma means repeat in 1 year, otherwise 3 years then every 5"],
      ["After transanal local excision", "Proctoscopy with endorectal ultrasound or MRI every 3–6 months for 2 years, then every 6 months to 5 years"],
      ["Stage I with full surgical staging", "Colonoscopy at 1 year; imaging is not routine"],
      ["Not recommended", "FDG-PET/CT or ctDNA for routine surveillance"],
      ["Watch-and-wait", "Intensive endoscopy, DRE, and MRI; most regrowth occurs within 2 years"],
    ],
  }, PACKET),

  sourced({
    id: "block-rc-complications",
    type: "bullets",
    heading: "Complications",
    items: [
      "**Anastomotic leak** follows 6.5%–13.6% of anterior resections and up to 20% of low or ultralow anastomoses. Risks: male sex, higher BMI, ASA 3 or higher, low tumor, neoadjuvant RT, open surgery, and long operations. In stage III disease, a leak raises local recurrence.",
      "A **diverting loop ileostomy** cut symptomatic leak from 28.0% to 10.3% and urgent reoperation from 25.4% to 8.6% (Matthiessen trial), so diversion should be considered after LAR, at the cost of stoma morbidity, dehydration, and a second operation.",
      "**Low anterior resection syndrome** — urgency, frequency, clustering, incontinence — affects up to 90% after rectal resection and is a major argument for organ preservation.",
      "Sexual dysfunction follows in 10%–35% and urinary dysfunction in about 5%, from autonomic nerve injury.",
      "**Presacral venous bleeding** from dissection behind the presacral fascia: pressure first, then sterile thumbtacks, bone wax, or a muscle tamponade weld. Suture ligation tears the basivertebral veins.",
      "APR perineal wound complications are worse after radiation; consider flap closure (VRAM or gracilis).",
      "Before pelvic RT, counsel on vaginal dilators, premature menopause, the inability of an irradiated uterus to carry to term, and sperm or oocyte banking.",
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-rc-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["What counts as rectum", "A tumor within 12–15 cm of the anal verge on rigid proctoscopy", "Below a line from the sacral promontory to the top of the pubic symphysis on MRI (the sigmoid take-off); tumors above it are treated as colon cancer"],
      ["Stage II–III sequence", "Chemoradiation, TME, then adjuvant chemotherapy", "TNT with chemotherapy before surgery; PROSPECT allows omitting radiation in selected tumors; dMMR gets immunotherapy first"],
      ["Who needs surgery", "Everyone", "Watch-and-wait after clinical complete response, and dostarlimab for dMMR disease"],
      ["Biopsy of the post-treatment scar", "Biopsy to confirm response", "Not needed when complete-response criteria are met; false negatives are common"],
      ["Local staging", "Endorectal ultrasound", "MRI first; endorectal ultrasound only for T1 or when MRI is contraindicated"],
      ["Distal margin", "2 cm", "1–2 cm is acceptable for distal tumors, 1 cm especially after neoadjuvant therapy"],
      ["Circumference limit for local excision", "Under 40%", "Under 30%"],
      ["Pelvic radiation dose", "5000 cGy", "45–54 Gy in 25–30 fractions; classically 50.4 Gy in 28"],
      ["Short-course RT in high-risk disease", "Interchangeable with chemoradiation", "RAPIDO's short-course arm had more 5-year local recurrence (about 10% against 6%) in cT4, EMVI, cN2, involved fascia, or enlarged lateral nodes"],
      ["Preoperative chemoradiation and the anastomosis", "Lowers anastomotic complications", "Neoadjuvant therapy is a recognized leak risk factor; its proven advantages are local control, lower toxicity, and sphincter preservation"],
      ["Laparoscopic TME", "Equivalent to open, per COLOR II and COREAN", "ACOSOG Z6051 (81.7% against 86.9%) and ALaCaRT (82% against 89%) failed pathologic noninferiority, yet Z6051 2-year DFS and local recurrence were similar, and LASRE supports laparoscopy for low tumors"],
      ["Liver resection 5-year survival", "24% to 58%", "35% to 65%; 51% at 5 years and 33% at 10 in a large series"],
    ],
  }, [[PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET, Z6051, ALACART], [PACKET]]),

  sourced({
    id: "block-rc-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "New rectal cancer: pelvic MRI plus MMR/MSI. dMMR means immunotherapy first; pMMR with T3 or node-positive disease means TNT.",
      "Involved margin is 1 mm or less; it is the strongest predictor of local recurrence, and radiation cannot rescue a positive margin.",
      "Local excision: T1, under 3 cm, under 30% circumference, mobile, within 8 cm, no lymphovascular or perineural invasion, margin over 3 mm.",
      "Preoperative beats postoperative chemoradiation for local control (6% against 13%), not survival.",
      "PRODIGE 23 is the only TNT trial with an OS gain; consolidation TNT preserves more rectums (54% against 39%).",
      "Distal tumor with isolated lung nodules: middle and inferior rectal veins drain to the IVC. Common and external iliac nodes are M1.",
    ],
  }, PACKET),

  references("block-rc-references", [PACKET, NCCN, FDA, Z6051, ALACART]),
];

export const rectalCancerTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008120",
  versionId: "00000000-0000-4000-8000-000000008121",
  slug: "rectal-cancer",
  title: "Rectal Cancer",
  aliases: ["rectal adenocarcinoma", "total mesorectal excision", "TME", "total neoadjuvant therapy", "TNT", "nonoperative management of rectal cancer", "circumferential resection margin", "CRM", "mesorectal fascia", "transanal endoscopic microsurgery", "TEM", "TAMIS", "transanal minimally invasive surgery", "German rectal cancer trial", "PRODIGE 23", "RAPIDO", "OPRA", "PROSPECT trial", "dostarlimab", "low anterior resection syndrome", "LARS", "presacral bleeding"],
  scoreNodeId: "anorectal-conditions",
  scoreCategory: "SCORE · Anorectal · Diseases & Conditions",
  tags: ["anorectal", "rectal-cancer", "colorectal", "oncology", "tme", "neoadjuvant", "dmmr", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [NCCN, FDA, Z6051, ALACART],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
