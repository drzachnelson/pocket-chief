import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACG_POLYPOSIS_2026_SOURCE as ACG,
  NCCN_GENETIC_COLORECTAL_2026_SOURCE as NCCN,
  POLYPOSIS_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/hereditary-polyposis-syndromes-pocket-chief.docx (2026-11-09), titled for the SCORE outline
// entry. The hereditary sections of the colonic polyps and colon cancer reviews are consolidated here. Inline
// citations stripped at the owner's request and kept in the source details; [CORRECTED] and [BOARD vs EVIDENCE]
// lines are gathered into the split table.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-ps-summary",
    type: "summary",
    heading: "At a glance",
    text: "Classify by polyp histology first: **adenomatous** (FAP, attenuated FAP, MAP, polymerase proofreading polyposis), **hamartomatous** (Peutz–Jeghers, juvenile polyposis, Cowden), and **serrated** (serrated polyposis). Lynch syndrome is the high-yield hereditary cancer that is not a polyposis, since polyposis means at least 10 polyps. Prophylactic colectomy is the answer in FAP, not in Lynch without cancer (unless surveillance is impossible), and not in Peutz–Jeghers. After colectomy, duodenal disease and desmoids decide survival in FAP.",
  }, PACKET),

  sourced({
    id: "block-ps-framework",
    type: "table",
    heading: "Syndromes at a glance",
    columns: ["Syndrome", "Category", "Gene and inheritance", "CRC risk, untreated or lifetime"],
    rows: [
      ["Classic FAP", "Adenomatous", "APC (5q21), autosomal dominant, about 30% de novo", "Approaches 100%, median age 39"],
      ["Attenuated FAP (AFAP)", "Adenomatous, under 100 adenomas", "APC variants at the 5′ or 3′ ends or exon 9, autosomal dominant", "High, with cancer at a mean age over 50"],
      ["MUTYH-associated polyposis (MAP)", "Adenomatous, often 10–100", "Biallelic MUTYH (base-excision repair), **autosomal recessive**", "70%–90% untreated by NCCN; 43%–63% by ACG"],
      ["Polymerase proofreading-associated polyposis", "Adenomatous, oligopolyposis", "POLE or POLD1, autosomal dominant", "Over 20% with POLD1"],
      ["Lynch syndrome", "Non-polyposis", "MLH1, MSH2, MSH6, PMS2, or EPCAM; autosomal dominant", "Gene-specific, 8.7%–61%"],
      ["Peutz–Jeghers syndrome", "Hamartomatous, small bowel more than colon", "STK11 (LKB1), autosomal dominant", "39%"],
      ["Juvenile polyposis syndrome", "Hamartomatous, juvenile polyps", "SMAD4 or BMPR1A, autosomal dominant", "39%–68% for colon and stomach combined"],
      ["Cowden syndrome (PTEN hamartoma tumor syndrome)", "Hamartomatous, mixed polyps", "PTEN, autosomal dominant", "9%–20%"],
      ["Serrated polyposis syndrome", "Serrated", "Usually no germline cause; rarely RNF43", "Elevated, not precisely defined"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-genetics",
    type: "bullets",
    heading: "FAP and attenuated FAP",
    items: [
      "APC is a tumor suppressor that regulates **β-catenin** in the Wnt pathway; it is the gatekeeper and first hit of the adenoma–carcinoma sequence.",
      "**Classic FAP**: at least 100 cumulative adenomas, often thousands, appearing in early adolescence, with a 15–20 year adenoma-to-cancer interval.",
      "About 30% of cases are de novo, so a negative family history does not exclude FAP.",
      "Genotype predicts phenotype: profuse polyposis near codons 1250–1464 (especially 1309), AFAP at the extreme 5′ or 3′ ends, desmoids with variants 3′ of codon 1399–1444, and CHRPE with central-region variants.",
      "**AFAP**: 10 to fewer than 100 cumulative adenomas (average 30), right-sided, often sparing the rectum, cancer at a mean age over 50; upper GI, duodenal, and thyroid risks match classic FAP, and CHRPE is unusual.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-extracolonic",
    type: "table",
    heading: "↳ FAP extracolonic manifestations",
    columns: ["Manifestation", "Cumulative risk", "Note"],
    rows: [
      ["Duodenal adenomas", "90% by age 70", "Duodenal cancer 4.5% by age 70"],
      ["Duodenal or periampullary cancer", "Under 1% to 10%, at age 50–52", "**Leading cancer cause of death after colectomy**"],
      ["Intra-abdominal desmoid", "10%–24%, at age 31–33", "Range 6.8%–38%; in one cohort of 780, 12.4% developed desmoids and 8% of them died of intra-abdominal complications"],
      ["Thyroid cancer", "1.2%–12%, at age 26–44", "Papillary, cribriform-morular variant, in young women"],
      ["Gastric cancer", "0.1%–7.1%", "Fundic gland polyps are common; gastric adenomas in 2%–10% of Western patients"],
      ["Hepatoblastoma", "0.4%–2.5%, at 18–33 months", "Screening can be considered in infancy"],
      ["CNS tumor", "About 1%", "Medulloblastoma"],
      ["Adrenal adenoma", "13%–27%", "Rarely functional; no routine screening"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-variants-dx",
    type: "bullets",
    heading: "↳ Eponymous variants and diagnosis",
    items: [
      "**Gardner syndrome**: FAP with osteomas of the mandible and skull, epidermoid or sebaceous cysts, desmoids, and supernumerary or unerupted teeth.",
      "**Turcot syndrome** is two entities: APC with **medulloblastoma** (FAP type) and mismatch repair genes with **glioblastoma** (Lynch or constitutional MMR deficiency type). Medulloblastoma means more polyps; glioblastoma means genetic MMR.",
      "Germline APC testing confirms the diagnosis and enables cascade testing; a multigene panel separates APC from MUTYH and other polyposis genes. Test at-risk children by 10–15, or in infancy if hepatoblastoma screening is planned.",
      "**Test for APC in any patient with a desmoid tumor**: 12%–16% of presumed sporadic desmoids carry APC variants, and because CTNNB1 and APC mutations are mutually exclusive, a CTNNB1-wild-type intra-abdominal desmoid suggests FAP. Desmoid detail is in [[Desmoid Tumors & Fibromatoses]].",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-surveillance",
    type: "table",
    heading: "FAP surveillance before colectomy",
    columns: ["Population or test", "Start", "Interval"],
    rows: [
      ["Classic FAP or at-risk APC carrier", "Age 10–15", "Colonoscopy every 12 months, preferred over sigmoidoscopy (every 2 years after 15 if no adenomas); ACG allows 1–3 years by burden"],
      ["Attenuated FAP", "Late teens (ACG: 18–20)", "Every 1–2 years (NCCN) or 1–3 years (ACG)"],
      ["Upper endoscopy, side-viewing or cap-assisted with the ampulla seen", "Age 20–25", "Set by Spigelman stage"],
      ["Thyroid ultrasound", "Late teens", "Every 2–5 years if normal"],
      ["Hepatoblastoma screening, considered", "Infancy", "Liver exam, ultrasound, and AFP every 3–6 months for the first 5 years"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-timing",
    type: "bullets",
    heading: "FAP surgery: timing and absolute indications",
    items: [
      "**Colectomy is the cornerstone** of cancer prevention in FAP; polypectomy does not remove the need for it in most patients.",
      "Cancer is rare before 18: 0% before 10, 0.2% before 15, and 1.3% before 20 in European registries. Timing before 18 is individualized, with annual colonoscopy until surgery (median colectomy age 14 in one US pediatric cohort).",
      "Surgery can be deferred safely while all polyps stay under 5 mm without progression.",
      "Prompt colectomy for cancer or suspected cancer, high-grade dysplasia, symptoms (bleeding, anemia), adenomas of 1 cm or more, a marked rise in polyp number, or inability to survey adequately.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-fap-operations",
    type: "table",
    heading: "Choice of operation in FAP",
    columns: ["Feature", "Total colectomy with IRA", "Proctocolectomy with IPAA", "Proctocolectomy with end ileostomy"],
    rows: [
      ["Indication", "Rectal sparing (20 or fewer rectal adenomas); AFAP and MAP", "More than 20 rectal adenomas, a rectal adenoma of 1 cm or more or with advanced histology, curable rectal cancer, or failed IRA", "Very low advanced rectal cancer, IPAA impossible (desmoid, short mesentery), sphincter dysfunction, or patient choice"],
      ["Contraindication", "Severe rectal disease or unreliable surveillance", "Desmoid preventing completion, Crohn disease, or sphincter dysfunction", "None specific"],
      ["Advantages", "One stage, no stoma, better function, preserved fertility and sexual and bladder function", "Removes most at-risk mucosa", "Removes rectal risk in one operation"],
      ["Disadvantages", "Retained rectum needs endoscopy every 6–12 months", "Usually a temporary stoma, incontinence risk, and about a 54% drop in female fertility", "Permanent stoma, which may deter relatives from evaluation"],
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-ps-fap-operation-rules",
    type: "bullets",
    heading: "↳ How the rectal threshold is set",
    items: [
      "ACG suggests IRA with 20 or fewer rectal adenomas, for quality of life, and IPAA with more than 20 when the patient prioritizes lower rectal cancer and proctectomy risk over function. The recommendation is conditional, on very low certainty evidence, and the cutoff is not immutable.",
      "ASCRS uses manageability instead of a count: IRA if every rectal adenoma larger than 5 mm can be removed endoscopically, proctocolectomy for any that cannot.",
      "Secondary proctectomy after IRA is more likely with more than 500–1000 colonic adenomas, more than 20 rectal adenomas, a codon 1250–1450 variant, and surgery before 25. By genotype, 20-year secondary proctectomy is 10% attenuated, 39% intermediate, and 61% severe.",
      "Women of childbearing age may be offered IRA first and conversion to IPAA after childbearing.",
    ],
  }, [[ACG], [PACKET], [PACKET], [PACKET]]),

  sourced({
    id: "block-ps-fap-outcomes",
    type: "bullets",
    heading: "↳ IRA against IPAA outcomes",
    items: [
      "Modern cohort of 685: rectal or pouch cancer at 10 years was 1.6% after IRA against 0.4% after IPAA, and 2.5% against 0.9% at 20 years (not significant); reoperation 10.7% against 7.5%.",
      "2026 meta-analysis of 4,700 patients, IPAA against IRA: rectal or pouch cancer RR 0.22, but desmoids RR 1.58, incontinence RR 1.90, about 1.9 more stools a day, and stricture RR 2.91.",
      "An older meta-analysis put rectal cancer after IRA at 5%–6%.",
      "Pouch adenomas reach 7%–19% at 5 years and up to 85% at 20. Cancer risk is up to 5% in the pouch and 2.7% in the anal transition zone or cuff, higher with a long cuff and a stapled rather than hand-sewn (mucosectomy) anastomosis.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-spigelman-points",
    type: "table",
    heading: "Duodenal disease: modified Spigelman points",
    columns: ["Feature", "0 points", "1 point", "2 points", "3 points"],
    rows: [
      ["Polyp number", "0", "1–4", "5–20", "More than 20"],
      ["Size (mm)", "None", "1–4", "5–10", "More than 10"],
      ["Histology", "None", "Tubular", "Tubulovillous", "Villous"],
      ["Dysplasia", "None", "Low grade", "No 2-point category", "High grade"],
    ],
  }, NCCN),

  sourced({
    id: "block-ps-spigelman-stage",
    type: "table",
    heading: "↳ Spigelman stage and repeat EGD",
    columns: ["Stage (points)", "NCCN repeat EGD", "Where ACG differs"],
    rows: [
      ["0 (0)", "Every 3–5 years", "Agrees"],
      ["I (1–4)", "Every 2–3 years", "Every 3 years"],
      ["II (5–6)", "Every 1–2 years", "Every 2–3 years"],
      ["III (7–8)", "Every 6–12 months", "Agrees"],
      ["IV (9–12)", "Expert surveillance every 3–6 months; consider duodenectomy", "Every 3–6 months"],
    ],
  }, NCCN),

  sourced({
    id: "block-ps-duodenal",
    type: "bullets",
    heading: "↳ Acting on duodenal disease",
    items: [
      "Stage IV carries a 38% risk of duodenal cancer over a median 10 years; consider pancreas-preserving duodenectomy or pancreaticoduodenectomy.",
      "Intervene endoscopically or surgically for duodenal adenomas larger than 10 mm or with any high-grade dysplasia; protect endoscopic papillectomy with a pancreatic duct stent and rectal indomethacin.",
      "Stage IV is only 51% sensitive for duodenal cancer, and up to half of cancers arise in patients who never reached it; **high-grade dysplasia** (RR 7.6) and size over 10 mm (RR 1.9) predict best.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-desmoids",
    type: "bullets",
    heading: "Desmoids in FAP",
    items: [
      "Benign, locally aggressive myofibroblastic tumors that do not metastasize; most are mesenteric or in the abdominal wall and arise after colectomy, at a mean of 4.6 years.",
      "Risk factors: female sex, an APC variant 3′ of codon 1399–1400 (desmoids in 37.1%, against 23.2% for codons 401–1400 and 14.9% 5′ of 400), a family history of desmoids, and prior abdominal surgery (OR 3.40).",
      "**Intra-abdominal desmoids get medical therapy first, not surgery**; mesenteric desmoid resection carries high morbidity and recurrence. Asymptomatic abdominal wall desmoids are observed, with surgery second-line.",
      "Sulindac or other NSAIDs with or without tamoxifen are the classic agents, with limited prospective efficacy.",
      "**Nirogacestat**, an oral γ-secretase inhibitor approved in November 2023: in DeFi, PFS HR 0.29 and response 41% against 8%, with diarrhea in 84% and ovarian dysfunction in 75% of women of childbearing potential (resolving in 74%). Most DeFi patients did not have FAP; in the APC-mutant subgroup response was 38% against 13%.",
      "Sorafenib gave 2-year PFS of 81% against 36%; NCCN lists nirogacestat and sorafenib as category 1 preferred.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-desmoid-operation",
    type: "prose",
    heading: "↳ Does the operation change desmoid risk?",
    text: "The supplied sources disagree, and the evidence is observational. A 2022 meta-analysis found no difference between IRA and IPAA (OR 0.99) or between open and laparoscopic colectomy, while a 2026 meta-analysis found higher desmoid risk after IPAA (RR 1.58), and one single-center series found lower 5-year desmoid risk after laparoscopic colectomy (4% against 13%). The practical answer for a high-risk patient is **laparoscopic IRA** when the rectal burden allows it.",
  }, PACKET),

  sourced({
    id: "block-ps-fap-after",
    type: "bullets",
    heading: "FAP chemoprevention, post-colectomy surveillance, and causes of death",
    items: [
      "Sulindac, celecoxib, and sulindac with erlotinib reduce adenoma burden, sulindac most potently, but **no agent prevents cancer or replaces surgery**, none is FDA-approved, and celecoxib's FAP indication was withdrawn. Use is limited to selected patients, mainly the retained rectum or pouch.",
      "After IRA: rectal endoscopy every 6–12 months, with completion proctectomy for dense polyposis or high-grade dysplasia beyond endoscopic control.",
      "After IPAA: pouch and cuff endoscopy annually, or every 6 months for large flat or villous polyps or high-grade dysplasia.",
      "After end ileostomy: annual inspection, with ileoscopy considered every 1–3 years.",
      "Lifelong upper endoscopy continues after any colectomy.",
      "Duodenal or periampullary cancer is the classic leading cause of cancer death after colectomy; desmoid disease is the second leading cause of death in FAP after CRC and is implicated in 21% of FAP deaths.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-map",
    type: "bullets",
    heading: "MUTYH-associated polyposis (MAP)",
    items: [
      "Biallelic MUTYH, **autosomal recessive**: a base-excision repair defect causing G:C to T:A transversions. Parents are unaffected, siblings may be affected, and consanguinity may be present.",
      "Typically 10–100 adenomas, occasionally 100–1,000, with proximal predominance; hyperplastic polyps and SSLs also occur (18% meet serrated polyposis criteria), and cancer can arise without polyposis.",
      "CRC risk is 70%–90% untreated by NCCN and 43%–63% by ACG, at a mean age of 40–60. Duodenal polyposis occurs in 17%–34% and duodenal cancer in about 4%.",
      "Biallelic MUTYH yield rises with adenoma count: 1%–4% with 10–19 adenomas, 4.5%–20% with 20–99, and 7%–15% with 100 or more.",
      "**Monoallelic carriers** (1%–2% of the population) have no meaningful added risk and follow average-risk screening.",
      "Colonoscopy from no later than 25–30 (ACG: 18–20), every 1–2 years; EGD from 30–35.",
      "A small adenoma burden — fewer than 20 adenomas, all under 1 cm, without advanced histology — is managed endoscopically. Otherwise total colectomy with IRA, or IPAA for a dense rectum; AFAP uses the same thresholds.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-lynch",
    type: "bullets",
    heading: "Lynch syndrome",
    items: [
      "An autosomal dominant germline variant in **MLH1, MSH2, MSH6, PMS2, or EPCAM** (a 3′ deletion that silences MSH2) gives microsatellite instability and a hypermutated tumor.",
      "About 1 in 279 people carry it; it causes about 3% of CRC and 2% of endometrial cancer.",
      "Mismatch repair proteins pair as **MLH1–PMS2** and **MSH2–MSH6**; losing the major partner (MLH1 or MSH2) also loses its minor partner.",
      "Carcinogenesis is accelerated, and some cancers arise without an adenoma stage, which is why intervals are short and interval cancers still occur.",
      "Classic tumor: **right-sided**, mucinous or signet-ring, poorly differentiated, with tumor-infiltrating lymphocytes and a Crohn-like reaction, and a better stage-for-stage prognosis. Stage II MSI-H colon cancer gains nothing from fluorouracil alone.",
      "Extracolonic cancers: endometrial (the most common), ovarian, gastric, small bowel, urothelial (renal pelvis and ureter), biliary, pancreatic, brain (usually glioblastoma), and sebaceous neoplasms. Breast cancer is not Lynch-associated.",
      "**Muir–Torre syndrome** is Lynch with sebaceous tumors or keratoacanthomas. MSH2 carries the highest urothelial (2.2%–28%), brain, and sebaceous risks.",
      "Biallelic variants cause constitutional MMR deficiency with childhood cancers, so counsel carriers whose partner carries a variant in the same gene.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-lynch-genes",
    type: "table",
    heading: "↳ Lynch risk by gene (cumulative to age 80)",
    columns: ["Gene", "CRC risk", "Endometrial risk", "Ovarian risk", "Colonoscopy"],
    rows: [
      ["MLH1", "46%–61%, mean age 44", "34%–54%", "4%–20%", "From 20–25 (or 2–5 years before the earliest family CRC), every 1–2 years"],
      ["MSH2 or EPCAM", "33%–52%, mean age 44", "21%–57%", "8%–38%", "From 20–25, every 1–2 years"],
      ["MSH6", "10%–44%", "16%–49%", "Not specified", "From 30–35, every 1–3 years"],
      ["PMS2", "8.7%–20%, mean age 61–66", "13%–26%", "Not clearly elevated", "From 30–35, every 1–3 years"],
    ],
  }, NCCN),

  sourced({
    id: "block-ps-lynch-diagnosis",
    type: "bullets",
    heading: "↳ Diagnosis: from Amsterdam criteria to universal testing",
    items: [
      "**Amsterdam II (3-2-1-0)**: 3 or more relatives with a Lynch-associated cancer, one a first-degree relative of the other two; 2 or more successive generations; 1 or more diagnosed before 50; FAP excluded and tumors pathologically verified. Amsterdam I counted only CRC; revised Bethesda criteria select tumors for MSI testing.",
      "Clinical criteria are specific but miss about 28% of carriers, so every CRC, endometrial, and gastric cancer now gets universal tumor testing, and germline panel testing goes to CRC before 50, all endometrial cancers, and any dMMR tumor.",
      "10%–15% of sporadic colon cancers are MSI-H, usually from MLH1 promoter hypermethylation. BRAF testing is not valid in endometrial cancer, where MLH1 methylation testing is used instead.",
      "More than 90% of Lynch tumors are MSI-H or IHC-abnormal; IHC has a 5%–10% false-negative rate, and MSI and IHC are 99.1% concordant. Germline testing makes the diagnosis.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-ihc",
    type: "table",
    heading: "↳ Tumor IHC and the next step",
    columns: ["IHC pattern", "Next step"],
    rows: [
      ["All four proteins retained, MSS", "Likely sporadic; refer for genetics if under 50 or the family history is strong"],
      ["MLH1 and PMS2 lost", "**BRAF V600E or MLH1 promoter methylation**: positive means sporadic (about 1% are still Lynch), negative means germline testing"],
      ["MSH2 and MSH6 lost", "Germline MSH2 or EPCAM testing, rarely MSH6"],
      ["Isolated MSH6 or PMS2 loss", "Germline testing of that gene; isolated MSH6 loss can be an effect of neoadjuvant chemoradiation in rectal cancer"],
      ["dMMR, germline negative, no methylation", "Lynch-like: tumor sequencing for double somatic MMR inactivation, which explains 45%–68%"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-lynch-surgery",
    type: "bullets",
    heading: "↳ Colon cancer surgery in Lynch syndrome",
    items: [
      "Metachronous CRC after segmental resection is about 10%–32% at 10 years against 0%–12% after extended resection, and up to 43% lifetime for MLH1 or MSH2 carriers.",
      "The extended operation for colon cancer is **total abdominal colectomy with IRA, not proctocolectomy**; proctocolectomy is for rectal cancer or a failed rectum.",
      "ASCRS prefers total colectomy (strong recommendation). NCCN individualizes: extended resection for MLH1 or MSH2, younger age, synchronous lesions, or strong family history; segmental resection for PMS2, often MSH6, older age (over 60–65), or poor sphincter function.",
      "Segmental resection raises metachronous CRC (RR 2.87) without changing 5- or 10-year OS, which is about 90% either way; in one large series, extended resection cut metachronous cancer only in high-risk genes (6% against 30%).",
      "After extended resection, rectal endoscopy every 1–2 years.",
      "dMMR rectal cancer: test MMR status before the treatment plan, because checkpoint blockade may replace surgery.",
      "**Prophylactic colectomy without cancer is not recommended**, unless the patient cannot be surveilled. Coordinate risk-reducing gynecologic surgery with any colectomy.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-lynch-gyn-aspirin",
    type: "bullets",
    heading: "↳ Gynecologic risk reduction and aspirin",
    items: [
      "MLH1 or MSH2: consider hysterectomy with bilateral salpingo-oophorectomy from age 40.",
      "MSH6: hysterectomy with opportunistic salpingectomy at 40, delaying oophorectomy to 45–50.",
      "PMS2: hysterectomy with salpingo-oophorectomy at 50 or menopause, whichever comes first.",
      "Endometrial biopsy every 1–2 years from 30–35 can be considered; transvaginal ultrasound is not recommended before menopause. Hysterectomy lowers endometrial cancer incidence but has not been shown to lower mortality.",
      "**Aspirin**: CAPP2 (600 mg daily for at least 2 years) cut CRC with ITT HR 0.65 and NNT 24, with benefit appearing after 4–5 years, lasting about 10 years after stopping, and no effect on other Lynch cancers. In CaPP3, the 100 mg arm had the fewest cancers, though per-protocol noninferiority was not formally proven.",
      "All carriers with remaining colorectal risk should consider daily aspirin at an individualized dose; high-dose aspirin is unsafe in pregnancy.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-pjs",
    type: "bullets",
    heading: "Peutz–Jeghers syndrome",
    items: [
      "STK11 (LKB1), autosomal dominant. Hamartomas with **arborizing smooth-muscle bands**, predominantly in the small bowel, especially jejunum.",
      "Diagnosis needs one of: 2 or more confirmed PJ polyps; any PJ polyp with a family history; mucocutaneous pigmentation of lips, buccal mucosa, digits, or perianal skin with a family history; or any PJ polyp with pigmentation.",
      "Intussusception risk exceeds 20% by age 10 and 50% by age 20. Do not reduce an ileoileal intussusception radiographically; at laparotomy, do a **clean sweep** with intraoperative enteroscopy and enterotomy polypectomy.",
      "Baseline EGD, colonoscopy, and small-bowel imaging at 8–10, repeated every 2–3 years if polyps are found, otherwise resumed at 18.",
      "Remove small-bowel polyps that are symptomatic or 10 mm or larger by balloon-assisted enteroscopy, and gastric or colonic polyps larger than 5 mm.",
      "Prophylactic colectomy is not indicated.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-pjs-risks",
    type: "table",
    heading: "↳ Peutz–Jeghers cancer risks and adult surveillance",
    columns: ["Site", "Lifetime risk", "Surveillance", "Start"],
    rows: [
      ["Breast", "32%–54%", "Annual mammogram and MRI", "About 30"],
      ["Colon", "39%", "Colonoscopy every 2–3 years", "About 18"],
      ["Stomach", "29%", "EGD every 2–3 years", "About 18"],
      ["Small bowel", "13%", "Capsule or CT or MR enterography every 2–3 years", "About 18"],
      ["Pancreas", "11%–36%", "Annual EUS or MRI/MRCP", "About 30–35"],
      ["Cervix (minimal deviation adenocarcinoma)", "At least 10%", "Annual Pap; consider hysterectomy after childbearing", "About 18–20"],
      ["Ovary (sex cord tumor with annular tubules)", "At least 20%", "Annual pelvic exam and ultrasound", "About 18–20"],
      ["Testis (Sertoli cell tumor, causing gynecomastia)", "9%", "Annual testicular exam", "From diagnosis"],
      ["Lung", "7%–17%", "Smoking cessation", "Not applicable"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-jps",
    type: "bullets",
    heading: "Juvenile polyposis syndrome",
    items: [
      "SMAD4 or BMPR1A, autosomal dominant, about 25% de novo; only 50%–60% of clinically diagnosed patients have an identifiable variant.",
      "Juvenile describes the histology, not the age: hamartomas with cystic, dilated, mucin-filled glands and no smooth-muscle core.",
      "Diagnosis needs one of: at least 5 juvenile polyps of the colon, multiple juvenile polyps throughout the GI tract, or any juvenile polyp with a family history.",
      "Only solitary sporadic juvenile polyps of childhood are benign; syndromic polyps carry substantial risk through dysplasia. Gastric cancer is about 10% with SMAD4 and rare with BMPR1A.",
      "**SMAD4 brings JPS–HHT overlap (22%)** with severe gastric polyposis: test SMAD4 families within the first 6 months of life, BMPR1A families by 12–15.",
      "Colonoscopy and EGD from 12–15 (earlier with bleeding or anemia), every 1–3 years. Colectomy or gastrectomy for cancer, multifocal high-grade dysplasia, uncontrolled bleeding or anemia, protein-losing gastropathy, or polyposis beyond endoscopic control.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-jps-risk",
    type: "warning",
    heading: "↳ Juvenile polyposis CRC risk: the supplied numbers disagree",
    text: "The polyposis review gives 39% to 68% for colon and stomach combined and up to 50% for colon alone. The colonic polyps review gives CRC incidence approaching 68% (mean age 34) in untreated patients but 14% to 22% in case series. The high figures describe untreated cohorts and combined sites, so know that the risk is substantial rather than one precise figure.",
  }, PACKET),

  sourced({
    id: "block-ps-cowden-sps",
    type: "bullets",
    heading: "Cowden syndrome and serrated polyposis",
    items: [
      "**Cowden (PTEN)**: mixed polyposis of hamartomas, ganglioneuromas, and hyperplastic, inflammatory, and adenomatous polyps.",
      "Cowden cancer risks: breast 40%–60% historically or over 60% projected, thyroid 35% (classically follicular), endometrial 28%, kidney 34%, CRC 9%–20%, and melanoma 6%.",
      "Cowden features: **macrocephaly**, trichilemmomas, oral papillomas, acral keratoses, Lhermitte–Duclos disease (dysplastic cerebellar gangliocytoma), and autism spectrum disorder. Colonoscopy from 35, every 5 years or sooner with polyps; colectomy is rarely needed.",
      "**Serrated polyposis** is the most common polyposis syndrome, about 1 in 250 in screening cohorts, and widely under-recognized.",
      "WHO 2019 criteria, either one: at least 5 serrated lesions proximal to the rectum, all 5 mm or larger with at least 2 of 10 mm or larger; or more than 20 serrated lesions of any size throughout the colon with at least 5 proximal to the rectum. The count is cumulative across colonoscopies and includes every serrated subtype.",
      "Serrated polyposis has no common germline cause (rarely RNF43 or biallelic MUTYH) and is associated with prior treatment for Hodgkin lymphoma. Pooled CRC risk is about 19%.",
      "Clear every polyp 5 mm or larger, then colonoscopy every 1–3 years, with surgery for cancer or a burden beyond endoscopic control. First-degree relatives start at the earliest of 40, the youngest family diagnosis of serrated polyposis, or 10 years before the earliest related CRC, then every 5 years if normal.",
    ],
  }, PACKET),

  sourced({
    id: "block-ps-first-scope",
    type: "table",
    heading: "When the first scope happens",
    columns: ["Syndrome", "First colonoscopy", "First EGD", "Other must-know screening"],
    rows: [
      ["Classic FAP", "10–15", "20–25", "Thyroid ultrasound from the late teens; hepatoblastoma screening to age 5"],
      ["Attenuated FAP", "Late teens (18–20)", "20–25", "Thyroid ultrasound"],
      ["MAP", "25–30 (ACG: 18–20)", "30–35", "None specific"],
      ["Lynch, MLH1 or MSH2", "20–25", "Individualized", "Consider endometrial biopsy from 30–35; hysterectomy and salpingo-oophorectomy at 40"],
      ["Lynch, MSH6 or PMS2", "30–35", "Individualized by family history", "Hysterectomy at 40 for MSH6, 50 for PMS2"],
      ["Peutz–Jeghers", "8–10", "8–10, with small-bowel imaging", "Pancreas from 30–35; breast from 30"],
      ["Juvenile polyposis", "12–15", "12–15, with colonoscopy", "HHT screening and infant gene testing for SMAD4"],
      ["Cowden", "35", "Not routine", "Breast, thyroid, endometrial, and renal"],
      ["Serrated polyposis relatives", "40, or earlier by family history", "Not routinely indicated", "Every 5 years if normal"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["FAP de novo rate", "About 20%", "About 30% (25%–30%)"],
      ["Desmoids in FAP", "About 5%", "10%–24%, range 6.8%–38%"],
      ["Rectal threshold for IPAA", "More than 1000 colonic or more than 20 rectal polyps", "ACG keeps 20 rectal adenomas as a conditional, very-low-certainty cutoff; ASCRS uses endoscopic manageability; genotype matters; colonic count is a proctectomy risk factor, not an indication"],
      ["Pre-colectomy FAP screening", "Annual flexible sigmoidoscopy or colonoscopy from 10–12, EGD every 1–2 years", "Colonoscopy from 10–15, because sigmoidoscopy misses right-sided polyps; EGD from 20–25 at Spigelman-based intervals"],
      ["Cause of death after FAP colectomy", "Periampullary or duodenal cancer", "Still the keyed answer for cancer death, but desmoid disease is the second leading cause of death overall; know both"],
      ["Sulindac and celecoxib", "Proven to suppress polyp formation", "Reduce adenoma burden only; no proven cancer prevention and no FDA approval"],
      ["MUTYH in APC-negative polyposis", "Up to 30%", "1% to 15%, depending on adenoma count"],
      ["Lynch CRC risk", "60% to 80%", "Gene-specific, 8.7% to 61%; the higher figures came from lower-quality studies"],
      ["Lynch colonoscopy", "Every 1–2 years from 20–25 for everyone", "Only for MLH1, MSH2, and EPCAM; MSH6 and PMS2 start at 30–35, every 1–3 years"],
      ["Colon cancer in Lynch", "Proctocolectomy, with up to 50% metachronous cancer at 10 years", "Total abdominal colectomy with IRA as the board answer, individualized by gene; metachronous risk about 10%–32% at 10 years, with no OS benefit from extended resection"],
      ["Lynch I and Lynch II", "Active classification", "Historical; management is gene-based"],
      ["Aspirin in Lynch", "Evidence not robust enough to recommend", "CAPP2 HR 0.65; NCCN advises considering daily aspirin"],
      ["Cowden colonoscopy start", "Age 15", "Age 35"],
      ["JPS and Cowden genetics", "One PTEN syndrome", "Separate syndromes: JPS is SMAD4 or BMPR1A, Cowden is PTEN"],
    ],
  }, PACKET),

  sourced({
    id: "block-ps-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Carpeted colon in a teenager: FAP, colonoscopy from 10–15, prophylactic colectomy; 20 or fewer rectal adenomas means IRA, more than 20 means IPAA.",
      "Desmoid in any patient: test for APC. Intra-abdominal desmoid: medical therapy first.",
      "Spigelman IV: duodenectomy or Whipple. CHRPE on fundoscopy suggests an APC carrier.",
      "10–100 adenomas with unaffected parents and an affected sibling: MAP, autosomal recessive.",
      "Young patient with right-sided mucinous CRC and lymphocytes: Lynch. MLH1/PMS2 loss with BRAF V600E: sporadic. MSH2/MSH6 loss: germline testing.",
      "Lynch woman done with childbearing: hysterectomy and salpingo-oophorectomy, at 40 for MLH1 or MSH2.",
      "Perioral freckling with small-bowel intussusception: Peutz–Jeghers; remember the ovarian SCTAT, testicular Sertoli cell tumor, and pancreatic cancer.",
      "Juvenile polyps with epistaxis or AVMs: SMAD4 JPS–HHT. Macrocephaly with trichilemmomas: Cowden, colonoscopy from 35.",
    ],
  }, PACKET),

  references("block-ps-references", [PACKET, NCCN, ACG]),
];

export const colonicPolyposisSyndromesTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008220",
  versionId: "00000000-0000-4000-8000-000000008221",
  slug: "colonic-polyposis-syndromes",
  title: "Colonic Polyposis Syndromes",
  aliases: ["polyposis syndromes", "hereditary polyposis syndromes", "hereditary colorectal cancer syndromes", "familial adenomatous polyposis", "FAP", "attenuated FAP", "attenuated familial adenomatous polyposis", "AFAP", "MUTYH-associated polyposis", "MUTYH", "MAP", "Lynch syndrome", "HNPCC", "hereditary nonpolyposis colorectal cancer", "Amsterdam criteria", "Bethesda criteria", "Muir-Torre syndrome", "Turcot syndrome", "Peutz-Jeghers syndrome", "STK11", "juvenile polyposis syndrome", "Cowden syndrome", "PTEN hamartoma tumor syndrome", "serrated polyposis syndrome", "Spigelman classification", "CHRPE", "polymerase proofreading-associated polyposis", "CAPP2"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "polyposis", "hereditary-cancer", "fap", "lynch", "genetics", "colorectal", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [NCCN, ACG],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
