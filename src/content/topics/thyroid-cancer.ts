import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  THYROID_CANCER_PACKET_SOURCE as PACKET,
  SCORE_THYROID_CANCER_SOURCE as SCORE,
  ATA_THYROID_2025_SOURCE as DTC,
  JOHANSSON_C_CELL_ORIGIN_2015_SOURCE as ORIGIN,
  NCI_THYROID_PDQ_SOURCE as NCI,
  ATA_MTC_2015_SOURCE as MTC,
  FDA_SELPERCATINIB_MTC_SOURCE as FDA,
  ATA_ATC_2021_SOURCE as ATC,
  ROAR_ATC_2022_SOURCE as ROAR,
  ATA_NODULE_DTC_2015_SOURCE as ATA,
  FISER_THYROID_SOURCE as FISER
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Educational draft: clinical approval is tracked on the unmerged batch PR.
const blocks: TopicBlock[] = [
  sourced({
  "id": "block-tc-summary",
  "type": "summary",
  "heading": "At a glance",
  "text": "Histology determines treatment. Selected low-risk papillary cancers permit surveillance or lobectomy; >4 cm, gross extrathyroidal extension or clinical nodal/distant disease favors total thyroidectomy with indicated therapeutic nodes. Follicular/oncocytic invasion requires surgical histology. Medullary cancer requires RET and pheochromocytoma evaluation before surgery. Rapidly enlarging masses need urgent tissue, airway assessment and distinction between anaplastic cancer and lymphoma."
}, PACKET),
  sourced({
  "id": "block-tc-histology",
  "type": "table",
  "heading": "Histology, spread and treatment consequence",
  "columns": [
    "Type",
    "Biology / recognizable pathology",
    "Clinical implication"
  ],
  "rows": [
    [
      "Papillary (PTC)",
      "About 80–85%; lymphatic spread; clear nuclei, grooves, pseudoinclusions and psammoma bodies.",
      "Excellent localized prognosis; extent and surveillance depend on risk."
    ],
    [
      "Follicular (FTC)",
      "About 10%; capsular/vascular invasion; hematogenous spread to bone/lung.",
      "FNA cannot distinguish adenoma from carcinoma; invasion determines completion decisions."
    ],
    [
      "Oncocytic carcinoma",
      "Formerly Hürthle cell; follicular lineage, oncocytes with invasion; blood-borne and nodal spread.",
      "Separate WHO entity, often less iodine-avid; do not assume either universal RAI response or universal nonavidity."
    ],
    [
      "Medullary (MTC)",
      "C-cell tumor; calcitonin/CEA, Congo-red amyloid stroma; central/lateral nodes and liver/lung/bone.",
      "About 1–2%; ~75% sporadic/~25% hereditary. Total plus central nodes; no RAI or tumor-directed TSH suppression."
    ],
    [
      "Anaplastic (ATC)",
      "Undifferentiated follicular lineage; rapidly invasive fixed mass, often in an older patient.",
      "All stage IV; urgent molecular testing, especially BRAF V600E, and multidisciplinary care."
    ],
    [
      "Primary thyroid lymphoma",
      "Usually DLBCL or MALT; associated with Hashimoto.",
      "Core tissue/flow cytometry; primarily systemic therapy and/or radiation."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tc-high-grade",
  "type": "prose",
  "heading": "High-grade is not synonymous with anaplastic",
  "text": "Differentiated high-grade carcinoma retains papillary, follicular or oncocytic architecture but has increased mitoses and/or necrosis. Poorly differentiated carcinoma is invasive without the characteristic PTC nuclear or anaplastic features. Their prognosis is between conventional differentiated cancer and ATC. Follicular lineage does not guarantee useful Tg production, iodine uptake or TSH dependence after dedifferentiation."
}, SCORE),
  sourced({
  "id": "block-tc-niftp",
  "type": "prose",
  "heading": "NIFTP: the absence of invasion matters",
  "text": "Noninvasive follicular thyroid neoplasm with papillary-like nuclear features is an encapsulated noninvasive follicular-patterned neoplasm, reclassified from a low-risk cancer category. Whole-capsule histology must exclude invasion; FNA cannot establish the diagnosis. Lobectomy generally suffices without completion or RAI. Use thyroid hormone only as needed for normal TSH."
}, DTC),
  sourced({
  "id": "block-tc-embryology",
  "type": "prose",
  "heading": "C-cell embryology: classic teaching and lineage evidence",
  "text": "Classical board sources describe neural-crest C cells. Experimental mouse lineage tracing instead supports endodermal origin through the ultimobranchial body. This challenges the classical account; it is not direct fate mapping in humans."
}, ORIGIN),
  sourced({
  "id": "block-tc-drivers",
  "type": "table",
  "heading": "Genetics and associations",
  "columns": [
    "Clue",
    "Meaning"
  ],
  "rows": [
    [
      "BRAF V600E",
      "Strong support for PTC in a thyroid nodule; actionable in ATC. High-risk combinations with TERT/TP53 can alter risk."
    ],
    [
      "RAS",
      "Follicular-patterned adenoma, NIFTP or carcinoma; not proof of malignancy alone."
    ],
    [
      "RET fusion versus RET mutation",
      "RET/PTC fusion occurs in PTC, including radiation-associated disease; germline RET mutation causes hereditary MTC/MEN2."
    ],
    [
      "Childhood radiation",
      "Chiefly PTC risk; ask about therapeutic and environmental exposure."
    ],
    [
      "APC/FAP or PTEN/Cowden",
      "APC: cribriform-morular carcinoma; PTEN: classic FTC association, also PTC and benign nodules."
    ],
    [
      "Other syndromes",
      "Carney/PRKAR1A, DICER1 and familial nonmedullary disease; TP53/Li-Fraumeni is associated with ATC."
    ],
    [
      "Iodine deficiency or Hashimoto",
      "Iodine deficiency favors follicular-patterned disease; Hashimoto raises suspicion for lymphoma when the gland rapidly enlarges."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tc-epidemiology",
  "type": "prose",
  "heading": "Prognosis and the history",
  "text": "Thyroid cancer is the most common endocrine malignancy, usually presenting as a painless nodule in a euthyroid patient. Age is important for differentiated-cancer mortality, but nodal burden and pathology also affect recurrence; nodes are not prognostically irrelevant. Children more often have nodal/lung disease yet can have excellent outcomes. Adult algorithms below should not be applied wholesale to children. Historical incidence, survival and nodal percentages vary by era and population."
}, PACKET),
  sourced({
  "id": "block-tc-presentation",
  "type": "bullets",
  "heading": "Clinical recognition",
  "items": [
    "Ask about prior radiation, familial subtype, growth, fixation, cervical nodes, hoarseness, dysphagia and throat pain. A compensated unilateral cord palsy can sound normal.",
    "Rapid enlargement suggests ATC or lymphoma; sudden painful enlargement can also be hemorrhage.",
    "MTC can cause diarrhea/flushing with high burden. MEN2B clues are mucosal neuromas, marfanoid habitus and intestinal ganglioneuromatosis.",
    "All MTC requires germline RET assessment even when apparently sporadic. Familial nonmedullary screening is selective: ATA permits ultrasound for relevant families with at least three affected first-/second-degree relatives and selected concerning two-case families."
  ]
}, PACKET),
  sourcedUnits({
  "id": "block-tc-workup",
  "type": "sequence",
  "heading": "Diagnosis and operative staging",
  "steps": [
    {
      "title": "TSH and complete thyroid/neck ultrasound",
      "detail": "Assess thyroid, central and both lateral compartments. Subnormal TSH prompts scintigraphy; a concordant hot nodule generally does not need FNA. Normal TSH does not exclude cancer."
    },
    {
      "title": "Choose FNA by one ultrasound system",
      "detail": "ATA high/intermediate: at least 1 cm; low: at least 1.5 cm; very-low: consider at least 2 cm or observe; pure cyst: no diagnostic biopsy. ACR TR5/TR4/TR3 thresholds are 1/1.5/2.5 cm; see Thyroid Nodule for full scoring."
    },
    {
      "title": "Resolve cytology and architecture",
      "detail": "Bethesda III/IV and selected V can undergo molecular testing if it changes management. Reassuring molecular results permit selected surveillance; follicular/oncocytic invasion and NIFTP require surgical histology."
    },
    {
      "title": "Map proven cancer before operating",
      "detail": "FNA suspicious preoperative nodes >8–10 mm short axis if management changes; selective Tg washout can help, but intact-thyroid interpretation is difficult."
    },
    {
      "title": "Define invasive or bulky disease",
      "detail": "Contrast CT/MRI for suspected aerodigestive/mediastinal invasion or bulky nodes. Laryngoscopy for abnormal voice, prior at-risk surgery or invasive/bulky central disease. Needed contrast should not be withheld solely for near-term RAI; baseline Tg and PET/CT are not routine in ordinary preoperative DTC."
    }
  ]
}, [[ATA], [ATA, PACKET], [PACKET], [DTC], [DTC]]),
  sourced({
  "id": "block-tc-cytology",
  "type": "prose",
  "heading": "Bethesda: name the category and its limitation",
  "text": "2023 categories are I nondiagnostic, II benign, III AUS, IV follicular neoplasm including oncocytic, V suspicious for malignancy and VI malignant. The supplied guide reports mean ROMs 13/4/22/30/74/97% including NIFTP; the full numeric table was not independently retrieved. Use local prevalence, ultrasound and test context rather than treating these means as an individual probability. See Thyroid Nodule for repeat FNA and benign follow-up decisions."
}, PACKET),
  sourced({
  "id": "block-tc-tnm",
  "type": "table",
  "heading": "AJCC8 T and N definitions",
  "columns": [
    "Category",
    "Definition"
  ],
  "rows": [
    [
      "T1a / T1b",
      "At most 1 cm / over 1 through 2 cm, confined to thyroid."
    ],
    [
      "T2 / T3a",
      "Over 2 through 4 cm / over 4 cm, confined to thyroid."
    ],
    [
      "T3b",
      "Gross invasion limited to strap muscles."
    ],
    [
      "T4a",
      "Gross invasion of subcutaneous tissue, larynx, trachea, esophagus or RLN."
    ],
    [
      "T4b",
      "Prevertebral fascia invasion or carotid/mediastinal-vessel encasement."
    ],
    [
      "N1a / N1b",
      "Central VI/VII / lateral I–V or retropharyngeal nodes."
    ],
    [
      "Microscopic ETE",
      "Does not itself upstage T in AJCC8."
    ]
  ]
}, NCI),
  sourced({
  "id": "block-tc-stage",
  "type": "table",
  "heading": "AJCC8 stage groups: M1 overrides local disease",
  "columns": [
    "Histology / age",
    "M0 groups",
    "M1 group"
  ],
  "rows": [
    [
      "DTC under 55",
      "I: any T, any N.",
      "II: any T, any N."
    ],
    [
      "DTC at least 55",
      "I: T1–2 N0/NX. II: T1–2 N1 or T3 any N. III: T4a. IVA: T4b.",
      "IVB regardless of T/N."
    ],
    [
      "ATC, any age",
      "IVA: T1–T3a N0. IVB: T1–T3a N1 or T3b/T4 any N.",
      "IVC for distant disease."
    ],
    [
      "MTC, any age",
      "I: T1N0. II: T2–3N0. III: T1–3N1a. IVA: T4a any N or T1–3N1b. IVB: T4b.",
      "IVC; no differentiated-cancer age rule."
    ]
  ]
}, NCI),
  sourced({
  "id": "block-tc-recurrence",
  "type": "prose",
  "heading": "Mortality stage and recurrence risk answer different questions",
  "text": "AJCC8 estimates mortality; ATA recurrence risk and subsequent response guide treatment intensity. ATA 2025 tiers are low <10%, low-intermediate 10–15%, intermediate-high 16–30% and high >30%, using histology-specific features. Large/many clinical nodes, extranodal extension, gross ETE, incomplete resection, metastases and extensive vascular invasion raise risk. Do not assign a tier from a percentage label without the full pathology criteria."
}, DTC),
  sourced({
  "id": "block-tc-risk-history",
  "type": "prose",
  "heading": "The 2015 framework still appears on boards",
  "text": "The older ATA three-tier scheme used low/intermediate/high. Low included intrathyroidal favorable disease, cN0 or at most five nodal micrometastases each <0.2 cm and selected minimally invasive FTC. Intermediate included microscopic ETE, aggressive histology, vascular invasion in PTC and larger nodal burden below 3 cm. High included gross ETE, incomplete resection, M1, nodes at least 3 cm or extensive FTC angioinvasion. The current extensive-invasion boundary is at least four vessels; older supplied wording of >4 foci/vessels is not interchangeable."
}, PACKET),
  sourced({
  "id": "block-tc-as",
  "type": "prose",
  "heading": "Active surveillance and selected ablation",
  "text": "ATA 2025 allows surveillance for selected cT1aN0M0 PTC at most 1 cm; percutaneous ablation is another selected option. Exclude aggressive cytology, visible ETE, nodal/distant disease, invasion or unsafe relationship to RLN/trachea/esophagus and unreliable follow-up. Use expert US every 6 months for 1–2 years, then yearly. Surgery is prompted by at least 3 mm growth, posterior progression/ETE, new biopsy-proven nodes, metastasis or patient/follow-up factors. Data on 1.5–2 cm surveillance do not make that the routine eligible category."
}, DTC),
  sourced({
  "id": "block-tc-extent",
  "type": "table",
  "heading": "ATA 2025: initial gland operation",
  "columns": [
    "Setting",
    "Operation"
  ],
  "rows": [
    [
      "At most 2 cm, cN0M0, no gross ETE",
      "Lobectomy unless bilateral cancers or another indication for contralateral removal."
    ],
    [
      "Over 2 through 4 cm, unilateral low risk",
      "Lobectomy may be preferred. Total can reflect disease features, contralateral concern, RAI/follow-up goals or preference; counsel about conversion/completion."
    ],
    [
      "Over 4 cm, gross ETE, cN1 or M1",
      "Total thyroidectomy with gross tumor removal and indicated therapeutic nodes unless contraindicated."
    ]
  ]
}, DTC),
  sourced({
  "id": "block-tc-tradeoffs",
  "type": "prose",
  "heading": "Discuss the tradeoffs before lobectomy",
  "text": "Lobectomy generally has fewer nerve, calcium and bleeding complications than total thyroidectomy. Total requires lifelong replacement; lobectomy may also require hormone depending on reserve and target TSH. Low-risk survival comparisons cannot be generalized to advanced disease. Refer complex/extensive disease to an experienced thyroid surgeon; ATA describes high-volume experience around >25–50 thyroidectomies/year rather than a single universal cutoff."
}, PACKET),
  sourced({
  "id": "block-tc-nodes",
  "type": "table",
  "heading": "Central and lateral compartments",
  "columns": [
    "Situation",
    "Dissection"
  ],
  "rows": [
    [
      "Most cT1–T2 cN0 PTC / most FTC",
      "Do not routinely perform prophylactic central dissection."
    ],
    [
      "Advanced T3/T4 cN0 PTC",
      "Consider prophylactic central dissection if it will guide subsequent treatment, balanced against added injury risk."
    ],
    [
      "Clinical central disease, cN1a",
      "Therapeutic central VI/upper VII dissection with thyroidectomy."
    ],
    [
      "Clinical lateral disease, cN1b",
      "Therapeutic lateral compartment dissection plus ipsilateral central dissection. Lateral typically includes IIa, III, IV and Vb; extend for involved compartments."
    ],
    [
      "A lateral node containing thyroid tissue",
      "Think metastatic PTC, not harmless lateral aberrant thyroid. Use compartmental clearance rather than berry picking."
    ]
  ]
}, DTC),
  sourced({
  "id": "block-tc-surgical-safety",
  "type": "prose",
  "heading": "Anatomy and intraoperative safety",
  "text": "Superior thyroid artery arises from external carotid; inferior from thyrocervical trunk. Superior/middle veins drain to IJV, inferior to brachiocephalic veins. The variant artery is thyroid ima, not “inferior mesenteric”; its frequency differs between supplied sources and is unresolved. Capsular superior-pole ligation protects EBSLN, which supplies cricothyroid. Identify RLN and preserve parathyroid perfusion. First-side nerve injury/loss of signal in a planned bilateral operation generally prompts staging while cord function is assessed; prior contralateral palsy makes even unilateral surgery dangerous."
}, PACKET),
  sourced({
  "id": "block-tc-completion",
  "type": "table",
  "heading": "Follicular and oncocytic completion decisions",
  "columns": [
    "Finding after lobectomy",
    "Next decision"
  ],
  "rows": [
    [
      "Benign or NIFTP",
      "No cancer completion or RAI for NIFTP; monitor and maintain normal thyroid function."
    ],
    [
      "FTC with capsular-only/minimal invasion or <4 involved vessels",
      "Lobectomy can suffice; integrate size, histology and disease extent when discussing completion."
    ],
    [
      "Widely invasive FTC or at least 4 invaded vessels",
      "High-risk pathology favors completion thyroidectomy."
    ],
    [
      "Oncocytic cancer",
      "Lobectomy or total depends on invasion, size and spread; locoregional disease favors total plus therapeutic nodes. Lower RAI avidity must inform adjuvant decisions."
    ],
    [
      "Preoperative Bethesda IV",
      "Molecular test or diagnostic lobectomy; upfront total may be chosen for large/invasive disease, bilateral concerns or patient factors."
    ]
  ]
}, PACKET),
  sourced({
  "id": "block-tc-completion-caution",
  "type": "prose",
  "heading": "Completion is an integrated decision",
  "text": "Do not apply a vessel count as an automatic stand-alone operative order. Re-review the full pathology, residual disease, need for RAI and patient goals. Check cord function before operating on the other side. The supplied NCCN-specific preferences for minimally invasive oncocytic lesions were not independently verified."
}, PACKET),
  sourced({
  "id": "block-tc-rai-indications",
  "type": "prose",
  "heading": "RAI: match the goal to recurrence risk",
  "text": "After total/near-total thyroidectomy, RAI is not routine for low-risk DTC; consider it for low-intermediate/intermediate-high risk and recommend it for high risk or distant metastases. Distinguish remnant ablation, adjuvant treatment of suspected microscopic disease and therapy of known disease. Small size alone does not determine use. Oncocytic avidity is variable; MTC and ATC are not treated with RAI."
}, DTC),
  sourcedUnits({
  "id": "block-tc-rai-prep",
  "type": "table",
  "heading": "RAI preparation and safety",
  "columns": [
    "Element",
    "Requirement / distinction"
  ],
  "rows": [
    [
      "TSH stimulation",
      "Goal >30 mIU/L. ATA prefers rhTSH for remnant/adjuvant treatment; if withdrawing hormone, stop LT4 for 3–4 weeks and LT3 for at least 2 weeks if used."
    ],
    [
      "rhTSH logistics",
      "Thyrotropin alfa is given intramuscularly on two consecutive days; use the nuclear-medicine protocol for dose and timing."
    ],
    [
      "Iodine preparation",
      "Low-iodine diet for 7–14 days; assess iodine clearance after contrast rather than withholding necessary imaging."
    ],
    [
      "Pregnancy and lactation",
      "No RAI during pregnancy/nursing; pregnancy testing is required. ATA defers until nursing/pumping has stopped at least 3 months and avoids conception for at least 6 months after RAI."
    ],
    [
      "Activity selection",
      "ATA risk/goal examples: intermediate 30–100 mCi; high 100–150; distant disease 100–200 or dosimetry. These are specialist-planned ranges, not interchangeable prescriptions."
    ]
  ]
}, [[DTC], [PACKET], [DTC], [DTC], [DTC]]),
  sourced({
  "id": "block-tc-rai-refractory",
  "type": "prose",
  "heading": "RAI-refractory disease and systemic therapy",
  "text": "Absent uptake in structural lesions or progression despite appropriate RAI can indicate refractory disease. Cumulative activity >600 mCi alone does not define refractoriness. Stable asymptomatic disease does not automatically require a kinase inhibitor. For progressive/symptomatic metastatic disease, use molecular profiling and multidisciplinary review: actionable RET/NTRK fusions can support targeted therapy, while lenvatinib or sorafenib are multikinase options. Verify the current indication and patient context before choosing an agent."
}, DTC),
  sourced({
  "id": "block-tc-tsh",
  "type": "prose",
  "heading": "TSH: reassess the response, not just the initial stage",
  "text": "The older initial targets were high risk <0.1, intermediate 0.1–0.5 and low risk approximately 0.5–2 mIU/L. ATA 2025 instead emphasizes response: excellent/indeterminate response generally permits normal-range TSH; consider below-normal TSH for biochemical/structural persistence, balancing AF and osteoporosis. Normal TSH is appropriate after low-risk lobectomy and for MTC replacement. Benign nodules do not warrant routine suppression."
}, PACKET),
  sourced({
  "id": "block-tc-mtc-prep",
  "type": "sequence",
  "heading": "Medullary cancer: prepare before operating",
  "steps": [
    {
      "title": "Establish biology and inherited risk",
      "detail": "Obtain calcitonin, CEA, germline RET testing/counseling, neck US and calcium assessment; exclude pheochromocytoma when hereditary disease is possible."
    },
    {
      "title": "Treat a pheochromocytoma first",
      "detail": "Biochemical evaluation uses plasma-free or urinary fractionated metanephrines. If present, prepare with appropriate alpha blockade and treat the adrenal disease before thyroid surgery."
    },
    {
      "title": "Stage the disease burden",
      "detail": "Calcitonin >500 pg/mL or extensive disease prompts contrast neck/chest imaging, multiphase liver CT/MRI and skeletal assessment. Units are pg/mL, not mg/dL."
    },
    {
      "title": "Operate by involved compartments",
      "detail": "Standard MTC treatment is total thyroidectomy plus bilateral central VI dissection; add therapeutic lateral II–V dissection for involved compartments. Calcitonin burden informs planning but is not an automatic prophylactic-lateral mandate."
    }
  ]
}, MTC),
  sourced({
  "id": "block-tc-calcitonin-nodes",
  "type": "prose",
  "heading": "Calcitonin predicts burden, not an automatic dissection",
  "text": "The supplied guide relays correlations around 20 pg/mL for ipsilateral central/lateral, 50 for contralateral central, 200 for contralateral lateral and 500 for upper-mediastinal disease. These are population correlations, not universal operative triggers. ATA found no consensus for prophylactic lateral dissection in an imaging-negative neck. The supplied NCCN >300 pg/mL systemic-imaging trigger differs from verified ATA >500 and remains unverified source-specific guidance."
}, PACKET),
  sourced({
  "id": "block-tc-mtc-completion",
  "type": "prose",
  "heading": "Incidental MTC after lobectomy",
  "text": "ATA recommends completion for a germline RET mutation, elevated postoperative calcitonin or structural residual MTC. The supplied claim that germline-negative patients can omit completion must not ignore postoperative calcitonin. Hereditary disease requires bilateral-gland treatment; selective neck treatment in distant disease may still provide useful local control."
}, MTC),
  sourced({
  "id": "block-tc-ret",
  "type": "table",
  "heading": "RET risk determines prophylactic timing",
  "columns": [
    "ATA tier",
    "Thyroidectomy timing",
    "Follow-up clue"
  ],
  "rows": [
    [
      "Highest: M918T / MEN2B",
      "First year of life, or promptly at diagnosis.",
      "Experienced pediatric/MEN team; aggressive biology."
    ],
    [
      "High: C634 / A883F",
      "By age 5, earlier with calcitonin elevation.",
      "Calcitonin and nodes help determine central dissection."
    ],
    [
      "Moderate: other pathogenic variants",
      "Individualized to calcitonin, US and family history; childhood surgery may be chosen.",
      "Begin clinical/US/calcitonin assessment around age 5; some can be followed for years."
    ]
  ]
}, MTC),
  sourced({
  "id": "block-tc-men-screen",
  "type": "prose",
  "heading": "MEN2 screening and parathyroids",
  "text": "ATA starts pheochromocytoma screening at 11 years in highest/high RET risk and 16 years in moderate risk; screen before thyroid surgery whenever hereditary disease is possible. MEN2A also needs calcium/PTH assessment. Preserve normal parathyroids and remove visibly enlarged glands; when all four are enlarged, subtotal or total with heterotopic autograft are options. Do not let an unverified low-penetrance estimate for V804M override family-specific risk."
}, MTC),
  sourced({
  "id": "block-tc-mtc-systemic",
  "type": "prose",
  "heading": "Advanced MTC: select treatment for structural disease",
  "text": "Rising calcitonin/CEA alone is not a reason for systemic treatment without structural progression. Symptomatic/progressive unresectable or metastatic disease can require molecularly selected therapy or a multikinase inhibitor; vandetanib and cabozantinib are options. Selected MSI-high/dMMR/TMB-high disease may qualify for tumor-agnostic immunotherapy after specialist review. The supplied pralsetinib listing needs current jurisdiction/label verification."
}, PACKET),
  sourced({
  "id": "block-tc-selpercatinib",
  "type": "prose",
  "heading": "Verified RET-directed approval",
  "text": "FDA traditional approval covers selpercatinib for adults and children at least 2 years old with advanced/metastatic RET-mutant MTC, detected by an approved test, who require systemic therapy. Age and molecular selection matter; dosing is age/size-dependent and should follow current labeling."
}, FDA),
  sourced({
  "id": "block-tc-atc",
  "type": "sequence",
  "heading": "Anaplastic cancer: urgent tissue, airway and molecular workup",
  "steps": [
    {
      "title": "Establish the diagnosis quickly",
      "detail": "Core tissue or open biopsy if FNA is inadequate; IHC distinguishes ATC from lymphoma, MTC and other high-grade cancers."
    },
    {
      "title": "Assess airway and stage",
      "detail": "Laryngoscopy and cross-sectional staging, with FDG-PET/brain imaging as clinically indicated. Involve surgery, oncology, radiation, airway specialists and palliative care early."
    },
    {
      "title": "Send rapid BRAF and broad molecular testing",
      "detail": "Rapid BRAF IHC plus molecular testing can identify BRAF V600E, RET/NTRK/ALK or other actionable alterations. Wild-type BRAF is not an automatic palliation-only branch."
    },
    {
      "title": "Choose a realistic multimodal path",
      "detail": "Resectable disease: gross complete resection and indicated nodes, followed by radiation with or without radiosensitizing chemotherapy. For unresectable IVB BRAF V600E disease, chemoradiation or neoadjuvant dabrafenib plus trametinib are options; for IVC or when radiation is declined, BRAF/MEK therapy is preferred over other systemic agents when available. Reassess resectability after response. Other cases need molecularly directed options, chemoradiation, trials or symptom-focused treatment."
    }
  ]
}, ATC),
  sourced({
  "id": "block-tc-atc-airway",
  "type": "warning",
  "heading": "Do not substitute debulking for an oncologic plan",
  "text": "Avoid noncurative debulking and routine prophylactic tracheostomy. Use airway intervention for a real airway indication, coordinated with disease anatomy and goals. Historical survival from unselected ATC cohorts is not a prognosis for every molecularly selected patient. The supplied ASCO 2026 pembrolizumab combinations and 93.6% neoadjuvant survival estimate were not independently verified and are not adopted as treatment recommendations."
}, PACKET),
  sourced({
  "id": "block-tc-roar",
  "type": "prose",
  "heading": "What the ROAR trial actually showed",
  "text": "In the phase II BRAF V600E ATC cohort, oral dabrafenib 150 mg twice daily plus trametinib 2 mg daily produced an overall response of 56%, including three complete responses; median PFS was 6.7 months and OS 14.5 months. This is a selected single-arm trial, not a guarantee of response or proof that all patients can undergo resection."
}, ROAR),
  sourced({
  "id": "block-tc-lymphoma",
  "type": "prose",
  "heading": "Lymphoma: obtain architecture, then subtype-directed therapy",
  "text": "Rapid goiter in an older patient with Hashimoto warrants core biopsy with flow cytometry; open biopsy may be needed when inadequate. FNA alone can miss the subtype. DLBCL commonly uses R-CHOP—rituximab, cyclophosphamide, doxorubicin, vincristine and prednisone—with or without involved-site radiation. Subtype and stage govern therapy; thyroidectomy is mainly diagnostic or selected airway rescue."
}, SCORE),
  sourced({
  "id": "block-tc-dtc-followup",
  "type": "prose",
  "heading": "DTC follow-up: Tg always needs TgAb and TSH context",
  "text": "After total thyroidectomy, measure Tg with anti-Tg antibodies and TSH; antibodies interfere with interpretation and their trends can be informative. ATA 2025 obtains postoperative Tg at 6–12 weeks and ultrasound at 6–12 months, then adapts intensity to risk/response. SCORE’s initial Tg at 3–6 months is an older source schedule. After lobectomy, US is primary; one postoperative Tg may identify a markedly unexpected result, but serial Tg has no established recurrence cutoff."
}, PACKET),
  sourced({
  "id": "block-tc-response",
  "type": "table",
  "heading": "Response after total thyroidectomy: Tg in ng/mL",
  "columns": [
    "Response",
    "With RAI",
    "Without RAI",
    "TSH approach"
  ],
  "rows": [
    [
      "Excellent",
      "Negative imaging; nonstimulated <0.2 or stimulated <1.",
      "Negative imaging; nonstimulated <2.5.",
      "Normal range."
    ],
    [
      "Indeterminate",
      "Nonspecific imaging, nonstimulated 0.2–1, stimulated 1–10 or stable/declining TgAb.",
      "Nonspecific imaging, nonstimulated 2.5–5 or stable/declining TgAb.",
      "Normal reference range."
    ],
    [
      "Biochemically incomplete",
      "Negative imaging; nonstimulated >1, stimulated >10 or rising TgAb.",
      "Negative imaging; nonstimulated >5 or rising TgAb.",
      "Consider below normal after weighing harms."
    ],
    [
      "Structurally incomplete",
      "Structural disease on imaging/biopsy.",
      "Persistent or recurrent structural disease.",
      "Individualized below-normal target when appropriate."
    ]
  ]
}, DTC),
  sourced({
  "id": "block-tc-response-caution",
  "type": "prose",
  "heading": "Do not transplant total-thyroidectomy cutoffs to lobectomy",
  "text": "Interpret the response table with imaging, assay sensitivity, TgAb and TSH. The numeric values are retained from the supplied guide’s ATA Table 9 transcription. An isolated laboratory boundary is not a complete response assessment; the remaining normal lobe changes Tg interpretation."
}, PACKET),
  sourced({
  "id": "block-tc-deescalate",
  "type": "prose",
  "heading": "When long-term surveillance can decrease",
  "text": "For low-risk DTC with sustained excellent response after total with or without RAI, ATA permits stopping routine US after 5–8 years, continuing biochemical markers every 1–2 years and stopping routine biochemical cancer monitoring after 10–15 years. This means complete remission, not guaranteed cure. After low-risk lobectomy with negative initial US: US every 1–3 years for 5–8 years and no routine additional Tg if the postoperative value is not markedly high. New symptoms, rising markers or residual-lobe nodules change the plan."
}, DTC),
  sourced({
  "id": "block-tc-recurrence-treatment",
  "type": "prose",
  "heading": "Recurrent structural disease",
  "text": "Reassess disease location, growth, prior surgery, nerve function and distant burden. Resect suitable clinically meaningful disease; selected nodal recurrences may suit ethanol or radiofrequency ablation. Laboratory change should trigger targeted evaluation rather than automatic reoperation or systemic therapy."
}, DTC),
  sourced({
  "id": "block-tc-mtc-followup",
  "type": "prose",
  "heading": "MTC follow-up uses calcitonin and CEA",
  "text": "ATA measures calcitonin/CEA about 3 months after surgery, then at 6 months/annually when normal; persistent markers require risk-adapted neck US and marker doubling-time assessment. Postoperative calcitonin >150 pg/mL prompts neck/chest/liver and skeletal imaging. The supplied NCCN attribution uses ≥150, a source-specific boundary difference. Lower levels do not exclude neck disease. Continue MEN2 pheochromocytoma and MEN2A calcium surveillance."
}, MTC),
  sourced({
  "id": "block-tc-complications",
  "type": "table",
  "heading": "Complications: identify the mechanism quickly",
  "columns": [
    "Finding",
    "Action"
  ],
  "rows": [
    [
      "Expanding neck / stridor / dysphagia",
      "Summon surgical and airway help. If threatened, release constricting skin and strap closure immediately, then OR control; do not wait for imaging."
    ],
    [
      "Unilateral RLN injury",
      "Hoarseness, weak cough or thin-liquid aspiration: laryngoscopy, early SLP/laryngology; selected patients benefit from medialization."
    ],
    [
      "Bilateral RLN injury",
      "Postextubation stridor with paramedian cords: secure airway by reintubation or tracheostomy; exclude hematoma."
    ],
    [
      "EBSLN injury",
      "Voice fatigue or loss of high pitch/projection; prevention is careful capsular superior-pole dissection."
    ],
    [
      "Hypoparathyroidism",
      "Paresthesias, Chvostek/Trousseau or tetany: calcium/PTH, calcium with calcitriol as indicated; IV calcium for severe symptomatic disease."
    ],
    [
      "Thyroid storm",
      "Prevent with euthyroid preparation. Treat with support, beta blockade as tolerated, thionamide, iodine after thionamide and glucocorticoid; see Hyperthyroidism for the full algorithm."
    ]
  ]
}, PACKET),
  sourcedUnits({
  "id": "block-tc-split",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Historical supplied teaching",
    "Current approach"
  ],
  "rows": [
    [
      "Cancer around 1 cm",
      "Fiser: total thyroidectomy and postoperative RAI.",
      "ATA 2025: selected T1a surveillance; eligible cancers at most 2 cm get lobectomy when operated; RAI is risk-adapted."
    ],
    [
      "Age and stage",
      "Older AMES/AGES/AJCC7 used age 45 or mnemonic-specific cutoffs.",
      "AJCC8 cutoff is 55; DTC under 55 with M1 is stage II."
    ],
    [
      "MTC prophylactic surgery",
      "2009 RET levels A–D with fixed age shorthand.",
      "2015 ATA highest/high/moderate tiers with calcitonin/family-context timing."
    ],
    [
      "Nodal surgery",
      "Broad MRND shorthand or nodes described as nonprognostic.",
      "Therapeutic compartmental dissection; no routine central dissection for most small cN0 PTC. Nodal burden affects recurrence."
    ],
    [
      "ATC",
      "Rapidly fatal, generally palliative surgery/chemoradiation.",
      "Urgent BRAF and broader profiling; targeted therapy may permit resection, with realistic goals and airway planning."
    ],
    [
      "TSH and follow-up",
      "Fixed initial suppression targets and lifelong cancer testing.",
      "Response- and risk-adapted TSH and selective long-term de-escalation for sustained low-risk remission."
    ]
  ]
}, [[FISER, DTC], [PACKET, NCI], [FISER, MTC], [FISER, DTC], [FISER, ATC], [PACKET, DTC]]),
  sourced({
  "id": "block-tc-checks",
  "type": "bullets",
  "heading": "Scenario pivots",
  "items": [
    "Bethesda IV: molecular testing or diagnostic lobectomy; capsular/vascular invasion decides carcinoma, and integrated pathology decides completion.",
    "1.8 cm intrathyroidal cN0 PTC: lobectomy. Gross ETE, proven clinical nodes, M1 or >4 cm changes the operation.",
    "MTC with calcitonin 650 pg/mL: RET, CEA, calcium and pheochromocytoma assessment; neck/chest/liver/skeletal staging; treat any pheochromocytoma before thyroid surgery.",
    "Rapidly enlarging fixed neck mass with stridor: urgent airway and tissue assessment, rapid BRAF/broad molecular workup and multidisciplinary treatment; do not reflexively choose prophylactic tracheostomy.",
    "Psammoma/clear nuclei: PTC. Hematogenous bone/lung spread with invasion: FTC. Amyloid/calcitonin: MTC. Hashimoto with rapid goiter: lymphoma."
  ]
}, PACKET),
  references("block-tc-references", [PACKET, SCORE, DTC, ORIGIN, NCI, MTC, FDA, ATC, ROAR, ATA, FISER]),
];

export const thyroidCancerTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000008920",
  "versionId": "00000000-0000-4000-8000-000000008921",
  "slug": "thyroid-cancer",
  "title": "Thyroid Cancer",
  "aliases": ["papillary thyroid carcinoma", "follicular thyroid carcinoma", "oncocytic thyroid carcinoma", "Hürthle cell carcinoma", "medullary thyroid carcinoma", "anaplastic thyroid carcinoma", "thyroid lymphoma", "NIFTP", "RET-associated medullary cancer"],
  "scoreNodeId": "endocrine-conditions",
  "scoreCategory": "SCORE · Endocrine · Diseases & Conditions",
  "tags": ["endocrine", "thyroid"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, DTC, ORIGIN, NCI, MTC, FDA, ATC, ROAR, ATA, FISER],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
