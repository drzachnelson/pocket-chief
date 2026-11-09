import { buildTopic, references, sourced } from "@/content/authoring";
import {
  COLONIC_POLYPS_PACKET_SOURCE as PACKET,
  NCCN_COLON_2026_SOURCE as NCCN,
  USMSTF_MALIGNANT_POLYP_2020_SOURCE as USMSTF_MALIGNANT,
  USMSTF_SURVEILLANCE_2020_SOURCE as USMSTF_SURVEILLANCE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/colonic-polyps-pocket-chief.docx (2026-11-09). Inline author-year citations are stripped from
// block text at the owner's request and kept in the source details. Hereditary syndromes live in
// colonic-polyposis-syndromes; this topic links there rather than repeating them.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-cp-summary",
    type: "summary",
    heading: "At a glance",
    text: "A polyp is any mucosal protrusion into the lumen. **Neoplastic** polyps (conventional adenomas, sessile serrated lesions, traditional serrated adenomas) can progress to cancer; hyperplastic, hamartomatous, and inflammatory polyps mostly do not. Lymphatics begin in the submucosa, so intramucosal carcinoma (pTis) cannot metastasize, while a **malignant polyp** is pT1: cancer through the muscularis mucosae into the submucosa. Most polyps are found at screening and removed endoscopically, large benign polyps go to expert EMR rather than colectomy, and a malignant polyp needs colectomy only for unfavorable histology, margin, or specimen.",
  }, PACKET),

  sourced({
    id: "block-cp-pathways",
    type: "bullets",
    heading: "Carcinogenic pathways",
    items: [
      "**Adenoma–carcinoma sequence** (chromosomal instability): APC, then KRAS, then TP53. The most common route.",
      "**Serrated pathway**: BRAF mutation, CpG island methylation, and MLH1 silencing; about 15% of colorectal cancers.",
      "**Microsatellite instability**: germline mismatch repair loss in Lynch syndrome, or sporadic MLH1 promoter hypermethylation.",
      "Submucosally invasive cancer is found in 0.75% to 5.6% of adenomas.",
      "Hereditary syndromes (FAP, MAP, Lynch, Peutz–Jeghers, juvenile polyposis, Cowden, serrated polyposis) are covered in [[Colonic Polyposis Syndromes]].",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-histology",
    type: "table",
    heading: "Polyp histology and malignant potential",
    columns: ["Type", "Key features", "Malignant potential"],
    rows: [
      ["Tubular adenoma", "**Most common adenoma**; under 25% villous", "One or two tubular adenomas under 10 mm do not significantly raise CRC risk"],
      ["Tubulovillous adenoma", "25% to 75% villous", "Advanced adenoma; CRC hazard about 3-fold"],
      ["Villous adenoma", "Over 75% villous; sessile, large, distal; may secrete mucus", "Cancer in 15% to 40%, rising with size; CRC hazard about 8.5-fold"],
      ["Hyperplastic polyp", "**Most common polyp overall**; small, rectosigmoid", "Negligible when small and distal; manage one 10 mm or larger like an SSL"],
      ["Sessile serrated lesion (SSL)", "**Proximal**, flat, mucus cap, indistinct borders; no dysplasia by definition", "SSL with dysplasia of any grade is managed like a high-risk adenoma"],
      ["Traditional serrated adenoma", "Dysplastic by definition; usually distal", "Surveillance at 3 years"],
      ["Hamartomatous polyp", "A solitary juvenile polyp of childhood is benign", "Syndromic polyps are not: lifetime CRC 39% in Peutz–Jeghers syndrome"],
      ["Inflammatory pseudopolyp", "Residual or regenerating mucosa among ulceration in IBD, infectious, or ischemic colitis", "Not neoplastic"],
    ],
  }, PACKET),

  sourced({
    id: "block-cp-risk-presentation",
    type: "bullets",
    heading: "Risk, presentation, and when to suspect a syndrome",
    items: [
      "**Advanced adenoma**: 10 mm or larger, villous component of 25% or more, or high-grade dysplasia.",
      "Cancer prevalence by adenoma size: 1% at 10–20 mm, 6.1% at 20–30 mm, and 38.1% above 30 mm.",
      "Average-risk screening runs from age 45 to 75 and is individualized from 76 to 85.",
      "Most polyps are asymptomatic. Large ones cause occult bleeding with iron-deficiency anemia, hematochezia, mucus, obstruction, or serve as an intussusception lead point.",
      "Suspect a syndrome with 10 or more adenomas at one colonoscopy (repeat in 1 year), 10–19 cumulative adenomas with young age or family history (offer germline testing), 2 or more hamartomatous polyps, or WHO serrated polyposis criteria.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-mckittrick-wheelock",
    type: "warning",
    heading: "McKittrick-Wheelock syndrome",
    text: "A large secretory villous adenoma of the rectum or rectosigmoid causes profuse mucous diarrhea with dehydration, prerenal AKI, **hyponatremia**, **hypokalemia**, and metabolic acidosis; in the largest series median sodium was 122 and potassium 2.7 mmol/L after about 2 years of symptoms. About 3% of villous adenomas larger than 3–4 cm are secretory. Resuscitate fluid and electrolytes, bridge with indomethacin, and resect endoscopically, transanally, or by low anterior resection.",
  }, PACKET),

  sourced({
    id: "block-cp-workup",
    type: "bullets",
    heading: "Workup and signs of deep invasion",
    items: [
      "Colonoscopy is diagnostic and therapeutic; a positive stool test or CT colonography leads to colonoscopy.",
      "CT colonography does not report polyps 5 mm or smaller. Cancer rates are 0% at 5 mm or smaller, 0.2% at 6–9 mm, and 2.6% at 10 mm or larger.",
      "Measure size against an open snare of known width rather than calling a lesion small.",
      "Paris morphology: 0-Ip pedunculated, 0-Is sessile, 0-IIa/IIb/IIc flat (elevated, flat, depressed), 0-III excavated.",
      "Signs of deep submucosal invasion: **NICE type 3**, **Kudo type V**, a **non-lifting sign**, Paris 0-III, or a firm, fixed, ulcerated lesion. Biopsy the worst area, tattoo, stage, and refer to surgery rather than attempting endoscopic resection.",
      "A malignant polyp on pathology needs pathology review, complete colonoscopy, marking of the site within 2 weeks, and MMR or MSI testing; add CEA and CT chest, abdomen, and pelvis when features are unfavorable. PET/CT is not indicated.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-depth",
    type: "table",
    heading: "Depth of invasion in malignant polyps",
    columns: ["System", "Applies to", "Levels", "Nodal metastasis risk"],
    rows: [
      ["Haggitt", "Pedunculated polyps", "0 intramucosal; 1 head; 2 neck; 3 stalk; 4 submucosa below the stalk", "Levels 1–3 about 0%; **level 4 27%**"],
      ["Kikuchi", "Sessile polyps", "sm1 superficial third, sm2 middle third, sm3 deepest third", "sm1 1%–3%, sm2 8%, **sm3 23%**"],
      ["Micrometer depth", "Nonpedunculated lesions resected en bloc", "Superficial under 1000 µm; deep 1000 µm or more", "Superficial 0%–4% without other adverse features; deep 10%–18% residual or nodal disease"],
    ],
  }, USMSTF_MALIGNANT),

  sourced({
    id: "block-cp-resection",
    type: "table",
    heading: "Endoscopic resection by size",
    columns: ["Lesion", "Preferred technique", "Notes"],
    rows: [
      ["4–9 mm", "**Cold snare**", "At least 90% should be cold snared; forceps leave more residual tissue above 3 mm"],
      ["10–19 mm, nonpedunculated", "Cold or hot snare, with or without submucosal injection", "EMR for flat and serrated lesions"],
      ["20 mm or larger, nonpedunculated", "Single-session **EMR** by an experienced endoscopist", "Avoids the morbidity, mortality, and cost of surgery"],
      ["Pedunculated", "Hot snare", "In a malignant pedunculated polyp, the stalk margin decides"],
    ],
  }, PACKET),

  sourced({
    id: "block-cp-emr",
    type: "bullets",
    heading: "↳ EMR technique and when to operate on a benign polyp",
    items: [
      "Lift the lesion off the muscularis propria with a contrast-stained injectate (indigo carmine or methylene blue), viscous for lesions 20 mm or larger; never use tattoo ink as the lift.",
      "Do not ablate visible residual tissue with argon plasma coagulation, which raises recurrence. After piecemeal resection, thermally ablate the margin with snare-tip soft coagulation.",
      "Cold against hot EMR above 15 mm: perforation 0% against 1.1%–3.9% and delayed bleeding about 1% against 4.4%–7.8%, but recurrence 18.4%–23.7% against 1.1%–13.8%.",
      "Colectomy for benign polyps is overused, rising from 6% to 18% of colectomies between 2000 and 2014. Refer to an expert endoscopist first.",
      "Operate for endoscopic signs of deep invasion, a lesion an expert cannot remove, a malignant polyp with unfavorable features, or polyposis beyond endoscopic control.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-malignant-features",
    type: "table",
    heading: "Malignant polyp (pT1): polypectomy or colectomy",
    columns: ["Feature", "Favorable: polypectomy may suffice", "Unfavorable: colectomy"],
    rows: [
      ["Grade", "Low grade", "High grade"],
      ["Lymphovascular invasion", "Absent", "Present"],
      ["Submucosal invasion depth", "Under 1 mm", "1 mm or more"],
      ["Tumor budding", "Low", "High"],
      ["Margin", "Tumor more than 1 mm from the transected margin", "Tumor at or within 1 mm (positive)"],
      ["Specimen", "Single piece, completely removed", "Fragmented, or margin cannot be assessed"],
    ],
  }, NCCN),

  sourced({
    id: "block-cp-malignant-decisions",
    type: "bullets",
    heading: "↳ Deciding after a malignant polyp",
    items: [
      "All favorable features: observation or colectomy. Any unfavorable feature or a fragmented specimen: staging, then oncologic segmental colectomy with **high ligation** of the vascular pedicle and en bloc nodes.",
      "Shape alone does not decide. A sessile malignant polyp with every favorable feature can be treated by polypectomy alone, even though every sessile malignant polyp is Haggitt level 4 by definition.",
      "Colon cancer surgery carries 1% to 8% mortality depending on age and comorbidity, so an elderly, comorbid patient may reasonably forgo colectomy despite one unfavorable feature.",
      "Rectal malignant polyp: transanal full-thickness excision, TEM, or TAMIS when it is under 3 cm, pT1, grade 1–2, without lymphovascular invasion, and margin-negative. Size over 3 cm, deeper than pT1, grade 3, lymphovascular invasion, a positive margin, high budding, or sm3 depth means total mesorectal excision.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Villous adenoma cancer risk", "About 40%, sometimes quoted as 50%", "15% to 40%, rising with size"],
      ["Clear margin for a malignant polyp", "More than 2 mm", "NCCN calls a margin positive at or within 1 mm; some experts still prefer 2 mm"],
      ["Favorable depth of invasion", "2 mm or less", "Under 1 mm (1000 µm)"],
      ["Grade", "G1–G2 is low risk", "WHO low grade against high grade, with low tumor budding added as a favorable feature"],
      ["Deep invasion as the only risk factor", "Colectomy", "Absolute nodal risk is about 2.6% and was not an independent predictor in a 2025 meta-analysis; organ preservation is expanding, but the keyed answer is still surgery"],
      ["Distribution of polyps", "Adenomas are left-sided, sigmoid most common", "Hyperplastic polyps are distal, but SSLs and MUTYH-associated polyps are proximal"],
      ["Terminology", "Sessile serrated polyp; pseudopseudopolyp", "Sessile serrated lesion; inflammatory pseudopolyp (pseudopseudopolyp is not a recognized term)"],
    ],
  }, PACKET),

  sourced({
    id: "block-cp-surveillance",
    type: "table",
    heading: "Post-polypectomy surveillance (USMSTF 2020)",
    columns: ["Baseline finding", "Next colonoscopy"],
    rows: [
      ["Normal colonoscopy", "10 years"],
      ["20 or fewer rectosigmoid hyperplastic polyps under 10 mm", "10 years (same as normal)"],
      ["1–2 tubular adenomas under 10 mm", "7–10 years"],
      ["3–4 tubular adenomas under 10 mm", "3–5 years"],
      ["5–10 tubular adenomas under 10 mm", "3 years"],
      ["Adenoma 10 mm or larger, tubulovillous or villous, or high-grade dysplasia", "3 years (advanced adenoma)"],
      ["More than 10 adenomas", "1 year, and consider genetic testing"],
      ["Piecemeal resection of an adenoma or SSL 20 mm or larger", "6 months"],
      ["1–2 SSLs under 10 mm", "5–10 years"],
      ["3–4 SSLs under 10 mm, or a hyperplastic polyp 10 mm or larger", "3–5 years (serrated)"],
      ["5–10 SSLs, SSL 10 mm or larger, SSL with dysplasia, or traditional serrated adenoma", "3 years (high-risk serrated)"],
    ],
  }, USMSTF_SURVEILLANCE),

  sourced({
    id: "block-cp-surveillance-differences",
    type: "bullets",
    heading: "↳ Where other guidelines differ",
    items: [
      "Changes from 2012: 1–2 small adenomas went from 5–10 to 7–10 years, 3–4 small adenomas from 3 to 3–5 years, and more than 10 adenomas from under 3 years to 1 year.",
      "NCCN keeps 3 or more small adenomas or SSLs at 3 years and 1–2 small SSLs at 5 years, and follows piecemeal resection of a lesion 2 cm or larger at 6–12 months, then 1 year, then 3 years.",
      "ESGE and BSG give no surveillance colonoscopy for 1–4 adenomas under 10 mm without high-grade dysplasia, and villous histology alone does not shorten the interval.",
      "Surveillance applies from 45 to 75 and is individualized at 76–85. After a malignant polyp, follow colon or rectal cancer surveillance instead.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-complications",
    type: "bullets",
    heading: "Complications and tattooing",
    items: [
      "**Bleeding** is immediate or delayed up to about 2 weeks. Cold resection nearly eliminates delayed bleeding and perforation in small lesions, so clips are rarely needed after it.",
      "**Perforation** recognized at the time is closed with clips; peritonitis or failed endoscopic closure goes to surgery.",
      "**Post-polypectomy coagulation syndrome**: a transmural burn with pain, fever, leukocytosis, and localized peritonitis but **no free air**. Treat with bowel rest, antibiotics, and observation.",
      "Tattoo technique: raise a saline bleb first, then inject 0.75–1.0 mL of sterile carbon suspension per site at 2–3 sites 3–5 cm distal to the lesion, circumferentially when it is for surgical localization, and photograph it.",
      "Never inject into or beside the lesion, which causes submucosal fibrosis that defeats later EMR; a transmural injection can cause localized peritonitis.",
      "Tattooing is unnecessary in the cecum, at the ileocecal valve, or in the low rectum. NCCN tattoos sessile and lateral spreading lesions 20 mm or larger.",
    ],
  }, PACKET),

  sourced({
    id: "block-cp-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Malignant polyp is low risk only with margin over 1 mm, invasion under 1 mm, low grade, no lymphovascular invasion, low budding, and an en bloc specimen.",
      "Haggitt 4 means sessile and 27% nodal risk; Haggitt 1–3 is about 0%; Kikuchi sm3 is 23%.",
      "Large benign polyp means expert EMR, not colectomy; NICE 3, Kudo V, non-lifting, or excavated means biopsy, tattoo, and surgery.",
      "Hypokalemia, mucous diarrhea, and a giant rectal villous adenoma mean McKittrick-Wheelock syndrome.",
    ],
  }, PACKET),

  references("block-cp-references", [PACKET, USMSTF_SURVEILLANCE, USMSTF_MALIGNANT, NCCN]),
];

export const colonicPolypsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000007920",
  versionId: "00000000-0000-4000-8000-000000007921",
  slug: "colonic-polyps",
  title: "Colonic Polyps",
  aliases: ["colon polyps", "colorectal polyps", "adenomatous polyp", "tubular adenoma", "tubulovillous adenoma", "villous adenoma", "sessile serrated lesion", "sessile serrated polyp", "SSL", "traditional serrated adenoma", "hyperplastic polyp", "advanced adenoma", "malignant polyp", "Haggitt classification", "Kikuchi classification", "Paris classification", "endoscopic mucosal resection", "EMR", "post-polypectomy surveillance", "McKittrick-Wheelock syndrome", "post-polypectomy coagulation syndrome", "colonic tattoo"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "colonic-polyps", "adenoma", "malignant-polyp", "polypectomy", "surveillance", "colorectal", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [USMSTF_SURVEILLANCE, USMSTF_MALIGNANT, NCCN],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
