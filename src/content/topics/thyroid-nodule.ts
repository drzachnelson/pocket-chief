import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ATA_NODULE_DTC_2015_SOURCE as ATA,
  THYROID_NODULE_PACKET_SOURCE as PACKET,
  SCORE_THYROID_NODULES_SOURCE as SCORE,
  ATA_THYROID_2025_SOURCE as DTC,
  ACR_TIRADS_2017_SOURCE as ACR,
  BETHESDA_2023_SOURCE as BETHESDA,
  ATA_MTC_2015_SOURCE as MTC,
  FISER_THYROID_SOURCE as FISER
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Educational draft: clinical approval is tracked on the unmerged batch PR.
const blocks: TopicBlock[] = [
  sourced({
  "id": "block-tn-summary",
  "type": "summary",
  "heading": "At a glance",
  "text": "Start with TSH and ultrasound of the thyroid and cervical nodes. Subnormal TSH calls for scintigraphy; a concordant hyperfunctioning nodule usually does not need FNA. For other nodules, use ultrasound risk plus size to select FNA, then cytology and clinical context to choose surveillance, molecular testing or surgery. Most benign asymptomatic nodules need observation."
}, ATA),
  sourced({
  "id": "block-tn-definitions",
  "type": "prose",
  "heading": "What is the lesion?",
  "text": "A nodule is a discrete intrathyroidal imaging lesion; goiter means gland enlargement, with or without nodules. Colloid/hyperplastic nodules, follicular or oncocytic adenomas, cysts and thyroiditis pseudonodules are common benign explanations. Most nodules are nonfunctional. Autonomous nodules and toxic multinodular goiter can produce hormone excess. A benign nodule is not ordinarily a cancer precursor, but a benign aspirate can miss a separate or unsampled malignancy."
}, PACKET),
  sourced({
  "id": "block-tn-prevalence",
  "type": "prose",
  "heading": "How common and how dangerous?",
  "text": "SCORE describes palpable nodules in about 5% of adults and ultrasound nodules in 19–68%; prevalence increases with age and is higher in women. Most are benign. Iodine deficiency is a major worldwide cause of goiter. Do not use growth alone as a cancer diagnosis or assume that every benign nodule grows at a fixed rate."
}, SCORE),
  sourced({
  "id": "block-tn-history",
  "type": "bullets",
  "heading": "History and examination",
  "items": [
    "Ask about childhood head/neck radiation, familial thyroid-cancer subtype, MEN2/RET and other syndromes, rapid growth, fixation, voice change and cervical nodes.",
    "Compression may appear as globus, dysphagia, supine pressure, discomfort with neck flexion or dyspnea. Substernal goiter can produce stridor or a positive Pemberton sign.",
    "Hoarseness suggests possible recurrent laryngeal nerve dysfunction; it does not prove invasion. A compensated unilateral palsy may sound nearly normal.",
    "Hyperfunction: heat intolerance, sweating, tremor, palpitations/AF, weight loss despite appetite, insomnia, proximal weakness, hyperreflexia, cardiomyopathy and bone loss. Ophthalmopathy/pretibial myxedema favor Graves rather than toxic adenoma.",
    "Hypofunction suggests associated thyroiditis: cold intolerance, weight gain, fatigue, bradycardia, constipation, hair loss, stiffness, entrapment neuropathy, delayed reflex relaxation, impaired cognition and myxedematous skin."
  ]
}, PACKET),
  sourced({
  "id": "block-tn-physiology",
  "type": "prose",
  "heading": "Physiology that explains the tests",
  "text": "Follicular cells secrete predominantly T4; more active T3 also arises by peripheral deiodination. Peroxidase-mediated iodination and coupling join DIT + DIT into T4 and MIT + DIT into T3. Most circulating hormone is protein-bound, chiefly to thyroxine-binding globulin. Levothyroxine supplies T4; liothyronine supplies T3. TSH is the sensitive initial functional test. SCORE’s triglyceride-binding wording and exact free-T4 fraction are source errors; do not memorize them."
}, PACKET),
  sourced({
  "id": "block-tn-syndromes",
  "type": "table",
  "heading": "Hereditary clues",
  "columns": [
    "Association",
    "Thyroid implication"
  ],
  "rows": [
    [
      "RET / MEN2",
      "Medullary carcinoma; establish the family subtype and evaluate pheochromocytoma before surgery."
    ],
    [
      "FAP / Gardner / APC",
      "Cribriform-morular thyroid carcinoma, historically categorized as a papillary variant."
    ],
    [
      "Cowden / PTEN",
      "Classically follicular carcinoma; papillary carcinoma and benign nodules also occur."
    ],
    [
      "DICER1, Carney complex, Werner",
      "Consider a syndromic nonmedullary pathway and selective genetic evaluation."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tn-family-screen",
  "type": "prose",
  "heading": "Familial nonmedullary screening",
  "text": "ATA 2025 permits screening ultrasound in relevant families with at least three affected first- or second-degree relatives. Selected two-case families may merit screening when unusually young onset or other concerning features suggest a true inherited disorder; this is not a universal ultrasound-screening recommendation."
}, DTC),
  sourced({
  "id": "block-tn-workup",
  "type": "sequence",
  "heading": "Initial diagnostic pathway",
  "steps": [
    {
      "title": "Obtain TSH and a complete neck ultrasound",
      "detail": "Image the thyroid and cervical nodes. Add free T4 when TSH is abnormal; a normal TSH does not exclude cancer."
    },
    {
      "title": "If TSH is low, identify the source of hormone excess",
      "detail": "Use radionuclide scintigraphy, preferably I-123. A concordant hot nodule generally needs no FNA; assess separate nonfunctioning nodules by their own ultrasound findings."
    },
    {
      "title": "If nonfunctioning, apply ultrasound risk and size",
      "detail": "Use one system consistently and perform ultrasound-guided FNA when eligible. Cold uptake alone is nonspecific; most cold nodules are benign."
    },
    {
      "title": "Interpret the cytology in context",
      "detail": "Report the Bethesda name and category. Reconcile an apparently benign result with highly suspicious imaging; cytology does not overrule discordant anatomy."
    }
  ]
}, ATA),
  sourced({
  "id": "block-tn-extra-tests",
  "type": "prose",
  "heading": "Selective tests and cross-sectional imaging",
  "text": "Routine calcitonin screening remains unresolved in ATA 2015; consider testing when MTC/MEN2 is suspected or the result would change the operation. CT/MRI is useful for substernal extension, invasive aerodigestive disease or bulky nodes. Necessary contrast imaging should not be withheld merely to preserve immediate RAI access; coordinate subsequent timing. PET/CT is not a routine initial nodule test."
}, PACKET),
  sourced({
  "id": "block-tn-us-features",
  "type": "table",
  "heading": "Recognize the ultrasound pattern",
  "columns": [
    "Finding",
    "Interpretation"
  ],
  "rows": [
    [
      "Pure cyst or spongiform lesion",
      "Benign leaning; large colloid comet-tail artifacts are reassuring."
    ],
    [
      "Solid hypoechoic tissue",
      "Assess margins, shape and foci; very hypoechoic means darker than strap muscles."
    ],
    [
      "Irregular margin, taller-than-wide or punctate foci",
      "Suspicious; also look for extrathyroidal extension and abnormal nodes."
    ],
    [
      "Calcified lesion",
      "Macrocalcification alone is not proof of benignity. Disrupted rim with extruding soft tissue is particularly concerning."
    ]
  ]
}, ATA),
  sourced({
  "id": "block-tn-ata-fna",
  "type": "table",
  "heading": "ATA 2015: pattern and FNA threshold",
  "columns": [
    "Pattern",
    "Typical definition",
    "FNA"
  ],
  "rows": [
    [
      "High suspicion",
      "Hypoechoic solid tissue plus irregular margins, microcalcifications, taller-than-wide shape, extrusive rim soft tissue or ETE; estimated risk >70–90%.",
      "At least 1 cm."
    ],
    [
      "Intermediate suspicion",
      "Smooth hypoechoic solid nodule without the high-risk features; estimated risk 10–20%.",
      "At least 1 cm."
    ],
    [
      "Low suspicion",
      "Iso-/hyperechoic solid or eccentric partly cystic tissue without suspicious features; estimated risk 5–10%.",
      "At least 1.5 cm."
    ],
    [
      "Very low suspicion",
      "Spongiform/partly cystic without suspicious findings; estimated risk <3%.",
      "Consider at least 2 cm; observation is reasonable."
    ],
    [
      "Benign pattern",
      "Pure cyst; estimated risk <1%.",
      "No diagnostic FNA; aspiration may relieve symptoms."
    ]
  ]
}, ATA),
  sourcedUnits({
  "id": "block-tn-small-biopsy",
  "type": "warning",
  "heading": "A 5 mm TR5 nodule is not a routine biopsy indication",
  "text": "Do not import Fiser’s blanket 5 mm biopsy rule. ACR uses 0.5 cm as the TR5 surveillance threshold and 1 cm as its routine FNA threshold. Suspicious nodes, invasion and other high-risk clinical circumstances need separate evaluation. ATA 2025 recommends preoperative FNA of suspicious nodes >8–10 mm in short axis if it would change management; selective Tg washout is harder to interpret with an intact thyroid."
}, [[FISER, ACR, DTC]]),
  sourced({
  "id": "block-tn-acr-points",
  "type": "table",
  "heading": "ACR TI-RADS: add the points",
  "columns": [
    "Domain",
    "Points"
  ],
  "rows": [
    [
      "Composition",
      "Cystic/spongiform 0; mixed solid/cystic 1; solid 2."
    ],
    [
      "Echogenicity",
      "Anechoic 0; iso-/hyperechoic 1; hypoechoic 2; very hypoechoic 3."
    ],
    [
      "Shape",
      "Wider-than-tall 0; taller-than-wide 3."
    ],
    [
      "Margins",
      "Smooth or ill-defined 0; lobulated/irregular 2; ETE 3."
    ],
    [
      "Echogenic foci",
      "None/large comet-tail 0; macrocalcification 1; rim 2; punctate 3. Add all applicable foci."
    ]
  ]
}, ACR),
  sourced({
  "id": "block-tn-acr-use",
  "type": "prose",
  "heading": "Use the ACR rules as a separate system",
  "text": "Choose one composition, echogenicity, shape and margin category; sum all relevant echogenic foci. Cystic/spongiform lesions score zero without scoring the remaining categories. Small comet-tail foci can be punctate rather than benign colloid tails. ATA patterns and ACR categories are not interchangeable. In multinodular glands, prioritize the most suspicious eligible nodules rather than simply the largest."
}, PACKET),
  sourced({
  "id": "block-tn-acr-management",
  "type": "table",
  "heading": "ACR category thresholds",
  "columns": [
    "Category / points",
    "FNA",
    "Ultrasound follow-up"
  ],
  "rows": [
    [
      "TR1 / 0",
      "None routinely",
      "None routinely."
    ],
    [
      "TR2 / 2",
      "None routinely",
      "No routine follow-up."
    ],
    [
      "TR3 / 3",
      "At least 2.5 cm",
      "At least 1.5 cm: years 1, 3 and 5."
    ],
    [
      "TR4 / 4–6",
      "At least 1.5 cm",
      "At least 1 cm: years 1, 2, 3 and 5."
    ],
    [
      "TR5 / at least 7",
      "At least 1 cm",
      "At least 0.5 cm: yearly, up to 5 years."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tn-bethesda-names",
  "type": "prose",
  "heading": "Bethesda 2023 terminology",
  "text": "Report one category name: nondiagnostic, benign, atypia of undetermined significance (AUS), follicular neoplasm, suspicious for malignancy, or malignant. FLUS is retired; oncocytic replaces Hürthle terminology. AUS-nuclear and AUS-other convey different risks. Numeric risks vary with selection, local prevalence and whether NIFTP is counted."
}, BETHESDA),
  sourced({
  "id": "block-tn-bethesda",
  "type": "table",
  "heading": "Cytology directs the next decision",
  "columns": [
    "Category",
    "Supplied mean ROM (range)",
    "Usual next step"
  ],
  "rows": [
    [
      "I — nondiagnostic",
      "13% (5–20%)",
      "Repeat US-guided FNA; persistent inadequacy plus suspicious findings can justify diagnostic surgery."
    ],
    [
      "II — benign",
      "4% (2–7%)",
      "Follow ultrasound pattern and symptoms; this is not a universal false-negative rate."
    ],
    [
      "III — AUS",
      "22% (13–30%)",
      "Repeat FNA, selective molecular test, surveillance or lobectomy; persistent atypia and concerning imaging favor surgery."
    ],
    [
      "IV — follicular neoplasm, including oncocytic",
      "30% (23–34%)",
      "Molecular testing or diagnostic lobectomy."
    ],
    [
      "V — suspicious for malignancy",
      "74% (67–83%)",
      "Lobectomy or total according to clinical risk; selective molecular testing if useful."
    ],
    [
      "VI — malignant",
      "97% (97–100%)",
      "Histology- and risk-adapted treatment; total thyroidectomy is not automatic."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tn-rom-limit",
  "type": "prose",
  "heading": "How to use the numeric risks",
  "text": "The preceding 2023 means/ranges are retained from the supplied guide, including NIFTP, and have not been independently checked against the full Bethesda numerical table. Do not substitute them for local outcome data or combine them with unrelated surgical-cohort false-negative rates."
}, PACKET),
  sourced({
  "id": "block-tn-invasion",
  "type": "warning",
  "heading": "FNA cannot establish follicular invasion",
  "text": "Follicular and oncocytic carcinoma require capsular or vascular invasion on surgical histology. FNA cannot distinguish either carcinoma from adenoma. NIFTP requires examination of the capsule and absence of invasion; it is not diagnosed by finding invasion. Diagnostic lobectomy remains the board operation when tissue architecture is needed."
}, PACKET),
  sourced({
  "id": "block-tn-molecular",
  "type": "bullets",
  "heading": "Molecular testing: decide what the answer would change",
  "items": [
    "Use Afirma GSC, ThyroSeq v3 or ThyGeNEXT/ThyraMIR selectively for Bethesda III/IV and selected V; performance depends on baseline prevalence and test intent.",
    "A reassuring result can support surveillance when ultrasound and clinical risk agree. Suspicious results lead to mutation- and risk-adapted surgery rather than a universal total-thyroidectomy rule.",
    "BRAF V600E strongly supports PTC; isolated RAS is also found in adenoma and NIFTP and does not establish cancer. High-risk combinations such as BRAF plus TERT can influence planning.",
    "Prior radiation, contralateral disease, compression, patient preference and the feasibility of follow-up may alter the decision even with molecular results."
  ]
}, PACKET),
  sourced({
  "id": "block-tn-benign-treatment",
  "type": "table",
  "heading": "Benign nodules: symptoms matter",
  "columns": [
    "Setting",
    "Management"
  ],
  "rows": [
    [
      "Asymptomatic, benign and nonfunctional",
      "Observation. Modest asymptomatic growth alone does not mandate surgery."
    ],
    [
      "Growing despite repeat benign FNA",
      "Consider surgery for >4 cm, compression/structural symptoms or clinical concern."
    ],
    [
      "Recurrent benign cyst",
      "Surgery or percutaneous ethanol according to symptoms and cosmesis."
    ],
    [
      "Inadequate dietary iodine",
      "Ensure adequate intake; ATA recommends a supplement containing 150 micrograms iodine daily when intake is inadequate."
    ],
    [
      "Suppressive levothyroxine",
      "Do not use routinely: modest shrinkage does not justify arrhythmia and bone risks."
    ]
  ]
}, ATA),
  sourced({
  "id": "block-tn-rfa",
  "type": "prose",
  "heading": "Where ablation fits",
  "text": "Selected symptomatic benign solid nodules may be treated by radiofrequency ablation instead of surgery. Confirm benignity and assess ultrasound risk, access, substernal extension and local expertise before ablation; exact biopsy prerequisites and outcome percentages in the supplied guide await primary-source confirmation. Ablation is not a substitute for evaluating a suspicious nodule."
}, PACKET),
  sourced({
  "id": "block-tn-toxic",
  "type": "table",
  "heading": "Toxic nodule versus toxic multinodular goiter",
  "columns": [
    "Disease",
    "Definitive options",
    "Preparation / selection"
  ],
  "rows": [
    [
      "Solitary toxic adenoma",
      "RAI or ipsilateral lobectomy; RFA in selected circumstances.",
      "Treat biochemical excess before surgery. Consider nodule size, compression, cancer concern and treatment preference."
    ],
    [
      "Toxic multinodular goiter",
      "RAI or total/near-total thyroidectomy.",
      "Surgery is favored for large compressive goiter, cancer concern, concurrent hyperparathyroidism or need for rapid control; RFA is not routine."
    ],
    [
      "Role of antithyroid drugs",
      "Control hormone excess; they do not induce remission of autonomy.",
      "Usually a bridge; selected patients may use long-term low-dose therapy. RAI is contraindicated during pregnancy/lactation and requires pregnancy planning."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tn-cancer-options",
  "type": "prose",
  "heading": "If papillary cancer is found",
  "text": "For selected cT1aN0M0 PTC at most 1 cm, surveillance, lobectomy or selected percutaneous ablation can be discussed. Exclude aggressive histology, ETE, metastases, unsafe posterior/RLN/tracheal relationships and inability to obtain reliable follow-up. ATA surveillance uses US every 6 months for 1–2 years, then yearly; surgery is prompted by at least 3 mm growth, posterior progression/ETE, new proven nodes, metastasis or patient/follow-up factors."
}, DTC),
  sourced({
  "id": "block-tn-cancer-operation",
  "type": "table",
  "heading": "ATA 2025: gland extent",
  "columns": [
    "Clinical setting",
    "Initial operation"
  ],
  "rows": [
    [
      "At most 2 cm, cN0M0, no gross ETE",
      "Lobectomy unless bilateral cancer or another reason to remove the opposite lobe."
    ],
    [
      "Over 2 through 4 cm, unilateral low risk",
      "Lobectomy may be preferred; total remains an option for disease features, RAI/follow-up goals or patient preference."
    ],
    [
      "Over 4 cm, gross ETE, cN1 or M1",
      "Total thyroidectomy with gross disease removal and indicated therapeutic compartmental dissection."
    ]
  ]
}, DTC),
  sourced({
  "id": "block-tn-mtc",
  "type": "prose",
  "heading": "A medullary result changes the preparation",
  "text": "Obtain calcitonin, CEA, germline RET, neck ultrasound and MEN2 biochemical assessment, including pheochromocytoma exclusion before thyroid surgery. Calcitonin >500 pg/mL calls for neck/chest, liver and skeletal imaging. Standard treatment is total thyroidectomy plus central dissection, with therapeutic lateral dissection for involved compartments. A pheochromocytoma is prepared and treated first."
}, MTC),
  sourced({
  "id": "block-tn-benign-followup",
  "type": "table",
  "heading": "ATA follow-up after benign cytology",
  "columns": [
    "Ultrasound pattern",
    "Follow-up"
  ],
  "rows": [
    [
      "High suspicion",
      "Repeat US and FNA within 12 months."
    ],
    [
      "Low or intermediate suspicion",
      "US at 12–24 months; repeat FNA or closer observation for significant growth or new suspicious features."
    ],
    [
      "Very low / spongiform",
      "If US is repeated, wait at least 24 months."
    ],
    [
      "Two benign US-guided FNAs",
      "Malignancy surveillance is no longer required; size and symptoms may still need reassessment. This is not a ban on a third FNA."
    ]
  ]
}, ATA),
  sourced({
  "id": "block-tn-growth",
  "type": "prose",
  "heading": "Growth and unbiopsied nodules",
  "text": "Significant growth means at least 20% in two dimensions with at least 2 mm absolute increase, or more than 50% volume increase. New suspicious features matter more than growth alone. For nodules below the FNA threshold: high-suspicion US at 6–12 months; low/intermediate at 12–24 months; very-low >1 cm at least 24 months if repeated."
}, ATA),
  sourcedUnits({
  "id": "block-tn-split",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Older supplied board/source teaching",
    "Current decision"
  ],
  "rows": [
    [
      "Minimum biopsy size",
      "Fiser: at least 5 mm.",
      "Use ATA/ACR pattern plus size; TR5 5 mm generally triggers surveillance."
    ],
    [
      "Benign follow-up",
      "Uniform 6–12-month US; no more than two FNAs.",
      "ATA uses ultrasound-pattern intervals and stops malignancy surveillance after two benign results."
    ],
    [
      "Benign nodule suppression",
      "Fiser thyroxine; SCORE TSH below 3 to prevent growth.",
      "Do not prescribe routine suppressive levothyroxine for benign nodules."
    ],
    [
      "Follicular neoplasm",
      "Lobectomy for all.",
      "Still the diagnostic operation; a concordant reassuring molecular result can permit surveillance."
    ],
    [
      "Small PTC",
      "Fiser total/RAI for tumor around 1 cm; SCORE surveillance below 1.5 cm.",
      "ATA 2025 standard surveillance category is cT1a; lobectomy is recommended when operating on eligible cancers at most 2 cm."
    ]
  ]
}, [[FISER, ACR, ATA], [FISER, SCORE, ATA], [FISER, SCORE, ATA], [PACKET], [FISER, SCORE, DTC]]),
  sourced({
  "id": "block-tn-rescue",
  "type": "table",
  "heading": "Recognize operative complications",
  "columns": [
    "Finding",
    "Response"
  ],
  "rows": [
    [
      "Expanding neck with stridor/dysphagia",
      "Call airway/surgical help; decompress constricting skin and strap closure immediately if airway threatened, then OR hemostasis. Do not wait for imaging."
    ],
    [
      "Stridor without swelling",
      "Consider bilateral RLN palsy; secure airway with reintubation or tracheostomy as required."
    ],
    [
      "Hoarseness or thin-liquid aspiration",
      "Laryngoscopy and early laryngology/SLP assessment for unilateral RLN dysfunction."
    ],
    [
      "Loss of high pitch / voice fatigue",
      "External superior laryngeal nerve injury; capsular superior-pole dissection protects it."
    ],
    [
      "Perioral paresthesia, tetany",
      "Check calcium/PTH; calcium with active vitamin D when indicated, IV calcium for severe symptomatic hypocalcemia."
    ],
    [
      "Postoperative hormone problem",
      "Total requires lifelong replacement; lobectomy can also cause hypothyroidism. Prevent storm by controlling hyperthyroidism before surgery."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tn-checks",
  "type": "bullets",
  "heading": "Decision checks",
  "items": [
    "1.2 cm hypoechoic nodule with punctate foci and normal TSH: FNA. A benign result still needs repeat US and FNA within 12 months when imaging remains high suspicion.",
    "2.5 cm Bethesda IV nodule: molecular testing or diagnostic lobectomy; invasion needs histology.",
    "1.8 cm intrathyroidal cN0 PTC: lobectomy. A proven lateral node changes the plan to total plus therapeutic compartmental dissection.",
    "Rapid growth with Hashimoto: consider lymphoma and obtain adequate tissue/flow cytometry; a fixed invasive mass also raises ATC. See Thyroid Cancer for staging, oncologic follow-up and histology-specific treatment."
  ]
}, PACKET),
  references("block-tn-references", [ATA, PACKET, SCORE, DTC, ACR, BETHESDA, MTC, FISER]),
];

export const thyroidNoduleTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000009020",
  "versionId": "00000000-0000-4000-8000-000000009021",
  "slug": "thyroid-nodule",
  "title": "Thyroid Nodule",
  "aliases": ["thyroid nodules", "initial workup of a thyroid nodule", "Bethesda thyroid cytology", "ACR TI-RADS", "thyroid fine needle aspiration", "toxic thyroid adenoma", "benign thyroid nodule"],
  "scoreNodeId": "endocrine-conditions",
  "scoreCategory": "SCORE · Endocrine · Diseases & Conditions",
  "tags": ["endocrine", "thyroid"],
  sourceId: PACKET,
  additionalSourceIds: [ATA, SCORE, DTC, ACR, BETHESDA, MTC, FISER],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
