import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  COLON_CANCER_PACKET_SOURCE as PACKET,
  NCCN_COLON_2026_SOURCE as NCCN,
  PRODIGE7_TRIAL_SOURCE as PRODIGE7,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/colon-cancer-pocket-chief.docx (2026-11-09). Inline citations stripped at the owner's request
// and kept in the source details; figures the packet marks UNVERIFIED are not carried. Malignant polyp detail lives
// in colonic-polyps, hereditary surgery in colonic-polyposis-syndromes, operative detail in partial-colectomy.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-cc-summary",
    type: "summary",
    heading: "At a glance",
    text: "Colon adenocarcinoma arises from cecum to rectosigmoid, mostly through the adenoma–carcinoma sequence. Screening starts at 45; every new cancer gets complete colonoscopy, CEA, CT chest, abdomen, and pelvis, and universal MMR or MSI testing. Treatment is **en bloc colectomy with high vascular ligation and at least 12 nodes**, adjuvant chemotherapy for stage III and high-risk stage II, and resection of liver or lung metastases when R0 is achievable. **dMMR** tumors follow a separate path: no fluorouracil alone in stage II, chemoimmunotherapy in stage III, and immunotherapy first for bulky or metastatic disease.",
  }, PACKET),

  sourced({
    id: "block-cc-pathophysiology",
    type: "bullets",
    heading: "Pathophysiology and risk",
    items: [
      "Intramucosal carcinoma (Tis) cannot metastasize because the colonic lamina propria has essentially no lymphatics; a malignant polyp is pT1, invading the submucosa. Malignant polyp management is in [[Colonic Polyps]].",
      "**Chromosomal instability** (about 85%): APC first, then KRAS, then DCC/SMAD4 on 18q, then TP53 as the late adenoma-to-carcinoma step.",
      "**Microsatellite instability**: germline mismatch repair loss in Lynch syndrome, or sporadic MLH1 promoter hypermethylation, often with BRAF V600E. BRAF V600E with MLH1 loss largely excludes Lynch, though about 1% are still Lynch.",
      "**Serrated (CIMP) pathway**: sessile serrated lesions, BRAF-mutant, right-sided.",
      "Most cancers are sporadic, older, and solitary; hereditary cancers (Lynch, FAP, MAP) are younger. Syndrome surgery is in [[Colonic Polyposis Syndromes]].",
      "**Clostridium septicum** bacteremia carries the strongest link (20.8% diagnosed with CRC within a year, HR 76.2); **Streptococcus gallolyticus** (formerly S. bovis) is the classic one (4.3%, HR 8.46). Either warrants colonoscopy.",
      "Diet and lifestyle: red and processed meat, low fiber, obesity, alcohol, and smoking.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-epidemiology-presentation",
    type: "bullets",
    heading: "Epidemiology and presentation",
    items: [
      "About 158,850 new US cases and 55,000 deaths in 2026: third most diagnosed cancer, second leading cause of cancer death, and leading cancer death under age 50.",
      "Lifetime risk is 4.3% in men and 4.0% in women.",
      "Incidence is rising 3% a year at ages 20–49, mostly distal colon and rectum; rectal cancer is now 32% of CRC. The sigmoid is the classic most common colon site.",
      "**Right colon**: occult bleeding, iron-deficiency anemia, fatigue, mass. Obstruction is late because the lumen is wide and stool liquid.",
      "**Left colon**: change in caliber or habits, hematochezia, obstruction, an apple-core lesion on contrast enema.",
      "About 20% present emergently with bleeding, perforation, or obstruction. Obstruction with a competent ileocecal valve is a closed loop that risks cecal perforation.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-screening",
    type: "table",
    heading: "Average-risk screening",
    columns: ["Test", "Interval", "Notes"],
    rows: [
      ["Colonoscopy", "Every 10 years", "Diagnostic gold standard; repeat within 1 year if incomplete or the prep was poor"],
      ["FIT or high-sensitivity guaiac test", "Every year", "FIT is more sensitive than guaiac"],
      ["Multitarget stool DNA", "Every 3 years (American Cancer Society); every 1–3 years (USPSTF)", "Stool RNA testing follows the same interval"],
      ["CT colonography", "Every 5 years", "Polyps 5 mm or smaller are not reported"],
      ["Flexible sigmoidoscopy", "Every 5 years, or every 10 with annual FIT", "Any positive finding needs full colonoscopy"],
      ["Blood-based cfDNA test", "Not a preferred test", "Only for patients who decline every preferred test"],
    ],
  }, PACKET),

  sourced({
    id: "block-cc-screening-rules",
    type: "bullets",
    heading: "↳ Who and when",
    items: [
      "Screen from 45 through 75 when life expectancy is at least 10 years, individualize at 76–85, and discourage after 85 (USPSTF grade B at 45–49, grade A at 50–75).",
      "A positive non-colonoscopy test needs colonoscopy within 6 months; cancer risk rises when it is delayed 10 months or more.",
      "A first-degree relative with CRC or advanced adenoma before 60, or two first-degree relatives at any age: colonoscopy every 5 years from age 40 or 10 years before the youngest diagnosis, whichever is earlier.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-workup",
    type: "bullets",
    heading: "Staging workup",
    items: [
      "**Complete colonoscopy** for synchronous lesions; when obstruction prevents it, colonoscopy 3–6 months after surgery.",
      "CBC, chemistry, and **CEA** as the surveillance baseline.",
      "CT chest, abdomen, and pelvis; pelvic MRI when low sigmoid against high rectal matters. FDG-PET/CT is not routine.",
      "Universal MMR or MSI testing on every new colon cancer; PI3K pathway profiling for stage II–III to guide aspirin; RAS, BRAF, and HER2 testing for metastatic disease.",
      "Mark a cancerous polyp site at colonoscopy or within 2 weeks; tattoo lesions likely to need surgical localization, not every polypectomy site.",
      "Classic CT: a short segment of irregular, asymmetric wall thickening or a mass with shouldered margins, sometimes with fat stranding, regional nodes, or hypoattenuating liver lesions.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-staging-table",
    type: "table",
    heading: "AJCC 8th edition stage and primary treatment (pMMR/MSS)",
    columns: ["Stage", "TNM", "Primary treatment"],
    rows: [
      ["0", "Tis N0 M0", "Complete endoscopic or local excision; no colectomy once completely removed"],
      ["I", "T1–T2 N0 M0", "Colectomy with en bloc lymphadenectomy, then observation"],
      ["IIA", "T3 N0 M0", "Colectomy; observation preferred without high-risk features"],
      ["IIB", "T4a N0 M0", "Colectomy; consider adjuvant chemotherapy"],
      ["IIC", "T4b N0 M0", "Consider neoadjuvant FOLFOX or CAPEOX for clinical T4b, then colectomy and adjuvant therapy"],
      ["IIIA", "T1–T2 N1/N1c; T1 N2a", "Colectomy plus adjuvant chemotherapy (low risk if T1–3 N1)"],
      ["IIIB", "T3–T4a N1/N1c; T2–T3 N2a; T1–T2 N2b", "Colectomy plus adjuvant chemotherapy (high risk if T4 or N2)"],
      ["IIIC", "T4a N2a; T3–T4a N2b; T4b N1–N2", "Colectomy plus high-risk adjuvant chemotherapy"],
      ["IVA / IVB / IVC", "Any T, any N, M1a / M1b / M1c (peritoneum)", "Systemic therapy; resect liver or lung metastases if R0 is achievable"],
    ],
  }, PACKET),

  sourced({
    id: "block-cc-survival",
    type: "warning",
    heading: "Survival is not hierarchical",
    text: "Five-year survival is about 100% for stage 0, over 90% for stage I, and about 82% for stage II overall. **Stage IIIA (83.4%) does better than stage IIB (72.2%)**, a classic trick question; IIIB is 64.1%, IIIC 44.3%, and stage IV about 12% for colon. The inversion persists in AJCC 8th, and the proposed 9th edition treats tumor deposits as an independent parameter partly to fix it.",
  }, PACKET),

  sourced({
    id: "block-cc-pathology",
    type: "bullets",
    heading: "↳ T, N, and M details",
    items: [
      "**T4a** goes through the visceral peritoneum, including gross perforation through tumor; **T4b** invades or adheres to adjacent organs. Gross adherence is staged cT4b and becomes pT1–4a if the adhesion holds no tumor microscopically.",
      "N1a is 1 node, N1b 2–3, **N1c tumor deposits with negative nodes**; N2a is 4–6, N2b 7 or more.",
      "A positive node holds tumor of at least 0.2 mm, so micrometastases of 0.2–2.0 mm count and isolated tumor cells under 0.2 mm are N0.",
      "Examine **at least 12 nodes**. With fewer in pN0 disease the pathologist resubmits tissue, and fewer than 12 is a high-risk feature.",
      "M1a is one organ, M1b two or more, M1c peritoneal metastasis with or without other sites.",
      "Perineural invasion in stage II drops 5-year DFS from 82% to 29%. Tumor budding tiers are low 0–4, intermediate 5–9, and high 10 or more buds.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-spread",
    type: "bullets",
    heading: "Patterns of spread",
    items: [
      "**Liver first**, through the portal vein via the superior and inferior mesenteric veins.",
      "**Lung second**, usually after liver involvement; colon drains entirely through the portal system. Lung metastasis that bypasses the liver is a feature of distal rectal cancer, through the middle and inferior rectal veins to the IVC.",
      "**Peritoneum third**: up to 17% develop peritoneal metastases, and up to 2% have them in isolation. Bone metastases are uncommon.",
      "Intraoperative ultrasound is the classic answer for the most sensitive test for intrahepatic metastases.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-surgery",
    type: "bullets",
    heading: "Surgical principles",
    items: [
      "En bloc colectomy with its mesentery and **high ligation** of the feeding pedicle; remove suspicious nodes outside the field, because positive nodes left behind make the resection R2.",
      "Margins: at least 5 cm proximal and distal is the classic answer, but NCCN stresses proximal vascular ligation and a 12-node yield over a fixed length.",
      "Cecum or ascending colon: right hemicolectomy. Hepatic flexure or transverse: extended right hemicolectomy. Splenic flexure or descending: left hemicolectomy. Sigmoid: sigmoidectomy with IMA or sigmoid pedicle ligation. Detail is in [[Partial Colectomy]].",
      "**T4b**: en bloc multivisceral resection. Never separate the adhesion, since about 40% contain tumor; a transverse colon cancer invading the pancreatic head needs pancreaticoduodenectomy with extended right hemicolectomy en bloc.",
      "Laparoscopy is oncologically equivalent with faster recovery (COST, COLOR, CLASICC) but needs an experienced surgeon, preoperative localization, and full exploration, and is generally not used for locally advanced disease, acute obstruction, or perforation.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-obstruction",
    type: "bullets",
    heading: "Obstructing colon cancer",
    items: [
      "**Left-sided, curable**: individualize among a stent as a bridge to surgery, diverting colostomy with interval colectomy, or upfront oncologic segmental colectomy.",
      "Stent bridge against emergency resection: 60-day morbidity 34% against 51%, temporary stoma 34% against 51%, primary anastomosis 70% against 54%, permanent stoma 22% against 35%, and the same 60-day mortality.",
      "Stents succeed technically in 77%–81% and perforate in 2%–9%; a stent perforation raises locoregional recurrence. Bridging does not change DFS or OS.",
      "**Right-sided or transverse**: resection with primary anastomosis is the standard answer, with stent and interval colectomy as an alternative.",
      "Hartmann procedure for the unstable patient, perforation with fecal peritonitis, or poor-quality bowel; many temporary stomas become permanent.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-adjuvant",
    type: "bullets",
    heading: "Adjuvant therapy by stage (pMMR/MSS)",
    items: [
      "Stage I: observation.",
      "Stage IIA without high-risk features: observation preferred; capecitabine or 5-FU/leucovorin for 6 months can be considered.",
      "High-risk stage II (T3 N0 with high-risk features, or T4 N0): capecitabine or 5-FU/leucovorin for 6 months, FOLFOX for 6 months or CAPEOX for 3 months, or observation.",
      "High-risk stage II features, applied only to MSS tumors: poor or undifferentiated histology, lymphovascular invasion, **obstruction**, **fewer than 12 nodes**, perineural invasion, localized perforation, close or positive margins, high budding, and T4.",
      "**Oxaliplatin has no proven survival benefit in stage II**; FOLFOX is reasonable only with several high-risk factors.",
      "**Low-risk stage III** (T1–3 N1): CAPEOX for 3 months preferred, or FOLFOX for 3–6 months.",
      "**High-risk stage III** (T4 N1–2 or any N2): CAPEOX for 3–6 months or FOLFOX for 6 months.",
    ],
  }, NCCN),

  sourced({
    id: "block-cc-adjuvant-evidence",
    type: "bullets",
    heading: "↳ Duration, aspirin, exercise, and ctDNA",
    items: [
      "IDEA and SCOT: 3 months of CAPEOX is noninferior to 6 in low-risk stage III, while 3 months of FOLFOX is inferior in high-risk stage III. Final SCOT 5-year OS was 82.4% in both arms (HR 0.96).",
      "Grade 3 or higher neuropathy runs 3% against 16% for 3 against 6 months of FOLFOX, and 3% against 9% for CAPEOX — the rationale for shorter CAPEOX.",
      "Radiation is not routine in colon cancer but can be considered for T4 tumors penetrating a fixed structure.",
      "Stage II–III tumors with somatic PI3K pathway alterations (PIK3CA, PIK3R1, PTEN) get **aspirin 100–162 mg daily for 3 years** after surgical recovery. In ALASCCA, aspirin cut 3-year recurrence from 14.1% to 7.7% (HR 0.49) with PIK3CA exon 9 or 20 mutations and from 16.8% to 7.7% (HR 0.42) with other PI3K alterations.",
      "A 3-year structured exercise program after adjuvant chemotherapy improved DFS (HR 0.72; 5-year 80.3% against 73.9%) and OS (HR 0.63) in CHALLENGE; the goal is at least 150 minutes of moderate to vigorous activity a week.",
      "ctDNA is prognostic, not predictive: do not use it to de-escalate treatment or for surveillance outside trials.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-dmmr",
    type: "bullets",
    heading: "dMMR/MSI-H disease without metastases",
    items: [
      "Stage II dMMR (T1–4a N0): observation; **dMMR stage II tumors do not benefit from fluorouracil alone**. T4b N0: observation, or adjuvant therapy as for low-risk stage III.",
      "Stage III dMMR: **FOLFOX or CAPEOX plus atezolizumab** is preferred. ATOMIC 3-year DFS was 86.4% against 76.6% (HR 0.50).",
      "Clinical T4b or bulky nodes: **neoadjuvant checkpoint inhibitor** therapy is preferred. NICHE-2 nivolumab plus ipilimumab gave a 95% major pathologic response, 68% pCR, and 100% 3-year DFS.",
      "dMMR tumors barely respond to chemotherapy: only 7% responded to neoadjuvant chemotherapy in FOxTROT.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-neoadjuvant",
    type: "bullets",
    heading: "Neoadjuvant chemotherapy for locally advanced pMMR disease",
    items: [
      "FOxTROT: 6 weeks of preoperative FOLFOX lowered 2-year residual or recurrent disease (16.9% against 21.5%) and raised R0 rates (94% against 89%) without excess morbidity; about 4% needed expedited surgery for obstruction.",
      "NeoCol was negative for DFS (3-year 83% against 87%), and OPTICAL showed no DFS difference with a possible OS signal.",
      "CT overstages about 25% of cT3–T4 tumors. The testable answer: neoadjuvant FOLFOX or CAPEOX is an option for clinical T4b or bulky nodes.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-stage-iv",
    type: "bullets",
    heading: "Stage IV: what is resectable",
    items: [
      "Resectable synchronous liver or lung metastases (pMMR): synchronous or staged colectomy with metastasectomy, or 2–3 months of neoadjuvant FOLFOX or CAPEOX first, or colectomy, chemotherapy, then staged metastasectomy. Total perioperative therapy runs up to 6 months.",
      "Liver resection requires feasible **R0** with an adequate remnant and no unresectable extrahepatic disease; debulking short of R0 is not recommended. Thermal ablation equals resection for lesions 3 cm or smaller.",
      "Use a staged approach when the standardized future liver remnant is under 30%, or under 40% after prolonged chemotherapy: portal vein embolization, two-stage hepatectomy, or Y-90 radiation lobectomy.",
      "Bevacizumab and other VEGF inhibitors are contraindicated with a hepatic artery infusion pump.",
      "Lung metastasectomy needs an R0-resected primary; resectable extrapulmonary disease does not preclude it, and surgery, ablation, and SBRT are all options.",
      "Potentially convertible disease is re-evaluated after 2 months of chemotherapy and every 2 months thereafter.",
      "**Do not resect an asymptomatic primary** with unresectable metastases (SYNCHRONOUS: OS 18.6 against 16.7 months, not significant); operate only for imminent obstruction, significant bleeding, or perforation.",
      "After hepatectomy, 5-year OS is 40%–60% (about 51% in a large series), about 70% recur, and repeat resection prolongs survival. After lung metastasectomy, 5-year OS is 40%–68%.",
      "Peritoneal metastases: cytoreduction with systemic chemotherapy at experienced centers, with complete cytoreduction (CC-0/1) the key prognostic factor.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-systemic",
    type: "bullets",
    heading: "↳ Metastatic biomarkers and immunotherapy",
    items: [
      "dMMR/MSI-H metastatic disease gets **first-line checkpoint inhibition**: KEYNOTE-177 pembrolizumab PFS 16.5 against 8.2 months (HR 0.60); CheckMate 8HW nivolumab plus ipilimumab OS HR 0.37 against chemotherapy.",
      "Any **KRAS or NRAS** mutation rules out cetuximab and panitumumab, except in KRAS G12C-targeted regimens.",
      "**BRAF V600E** makes anti-EGFR response unlikely without a BRAF inhibitor.",
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-cc-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Colorectal peritoneal metastases", "Cytoreduction plus HIPEC", "Cytoreduction with systemic chemotherapy: PRODIGE 7 showed no OS gain from 30-minute oxaliplatin HIPEC (41.7 against 41.2 months) and more grade 3 or higher complications at 60 days (26% against 15%)"],
      ["Clinical T4b, pMMR", "Neoadjuvant chemoradiation", "Neoadjuvant FOLFOX or CAPEOX, or immunotherapy if dMMR; radiation only for unresectable disease or T4 fixed to a structure"],
      ["Stage IV 5-year survival", "Under 5%", "About 12% for colon"],
      ["Liver metastasectomy 5-year survival", "35%", "40% to 60%, about 51% in a large series"],
      ["Lung metastasectomy 5-year survival", "25%", "40% to 68%, though the randomized PulMiCC trial found similar median survival with or without metastasectomy (3.5 against 3.8 years)"],
      ["Stool DNA interval", "Every 3 years", "Every 3 years by the American Cancer Society; every 1–3 years by USPSTF"],
      ["Bacteremia that should prompt colonoscopy", "Clostridium septicum", "Both C. septicum, the strongest link, and S. gallolyticus, the classic one"],
      ["Which sites to tattoo", "Every polypectomy site", "Malignant polyp sites and lesions likely to need surgical localization"],
    ],
  }, [[PACKET, PRODIGE7], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET], [PACKET]]),

  sourced({
    id: "block-cc-surveillance",
    type: "table",
    heading: "Surveillance after resection",
    columns: ["Stage", "H&P and CEA", "CT chest, abdomen, and pelvis", "Colonoscopy"],
    rows: [
      ["I", "Not routinely specified", "Not routine", "At 1 year, then 3 years, then every 5 years"],
      ["II–III", "Every 3–6 months for 2 years, then every 6 months to 5 years", "Every 6–12 months for 5 years", "At 1 year (3–6 months if no complete preoperative colonoscopy); advanced adenoma means repeat in 1 year, otherwise 3 years then every 5"],
      ["IV, resected", "As for stage II–III", "Every 3–6 months for 2 years, then every 6–12 months to 5 years", "Same schedule as stage II–III"],
    ],
  }, NCCN),

  sourced({
    id: "block-cc-surveillance-notes",
    type: "bullets",
    heading: "↳ Surveillance rules",
    items: [
      "FDG-PET/CT and ctDNA are not used for surveillance. A **serial CEA rise** triggers a recurrence workup.",
      "Advanced adenoma for surveillance purposes: villous histology, larger than 1 cm, or high-grade dysplasia.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-complications",
    type: "bullets",
    heading: "Complications",
    items: [
      "**Anastomotic leak** classically shows on postoperative days 5–7 with fever, tachycardia, and ileus. A small contained abscess gets percutaneous drainage and antibiotics; diffuse peritonitis or instability gets reoperation with diversion.",
      "**Oxaliplatin neuropathy** is cumulative and duration-dependent.",
      "**Capecitabine and 5-FU** cause hand-foot syndrome, diarrhea, and coronary vasospasm; check for DPD deficiency when toxicity is severe.",
      "Checkpoint inhibitors cause immune-related colitis, hepatitis, thyroiditis, and myositis, which delayed surgery in two NICHE-2 patients.",
      "Stents perforate (2%–9%), migrate, and re-obstruct.",
    ],
  }, PACKET),

  sourced({
    id: "block-cc-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Tis with clear margins needs no colectomy; pT1 with a margin within 1 mm, invasion of 1 mm or more, lymphovascular invasion, high grade, or high budding needs colectomy.",
      "At least 12 nodes; a positive node is at least 0.2 mm; fewer than 12 nodes makes stage II high risk.",
      "3 months of CAPEOX for low-risk stage III, 6 months of FOLFOX for high-risk stage III, and no oxaliplatin benefit in stage II.",
      "dMMR: no 5-FU alone in stage II, atezolizumab with FOLFOX in stage III, neoadjuvant immunotherapy for T4b or bulky disease, first-line immunotherapy when metastatic.",
      "Colon cancer reaches the liver first through the portal vein; distal rectal cancer can go straight to the lung.",
    ],
  }, PACKET),

  references("block-cc-references", [PACKET, NCCN, PRODIGE7]),
];

export const colonCancerTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008020",
  versionId: "00000000-0000-4000-8000-000000008021",
  slug: "colon-cancer",
  title: "Colon Cancer",
  aliases: ["colon adenocarcinoma", "colon carcinoma", "colorectal cancer", "colorectal carcinoma", "colon cancer screening", "stage III colon cancer", "adjuvant chemotherapy for colon cancer", "obstructing colon cancer", "colonic stent", "Clostridium septicum", "Streptococcus gallolyticus", "Streptococcus bovis", "IDEA collaboration", "FOxTROT", "ATOMIC trial", "NICHE-2", "ALASCCA", "CHALLENGE trial", "KEYNOTE-177"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "colon-cancer", "colorectal", "oncology", "adjuvant-chemotherapy", "dmmr", "screening", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [NCCN, PRODIGE7],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
