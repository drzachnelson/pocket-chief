import { buildDraftTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  SCORE_VAGOTOMY_SOURCE,
  SCORE_EGD_SOURCE,
  ACG_H_PYLORI_2024_SOURCE,
  ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
  FISER_PANCREAS_SOURCE,
  FISER_GI_HORMONES_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/peptic-ulcer-disease.md. Clinical approval remains pending.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "Peptic ulcer disease reflects acid-peptic injury overwhelming mucosal protection. **H. pylori and NSAIDs are the major correctable causes.** Identify the complication before debating acid-reducing surgery: hemorrhage requires resuscitation and hemostasis, free perforation requires source control, and obstruction requires decompression and correction of volume/electrolyte deficits. Gastric ulcers also require a malignancy assessment. Most uncomplicated ulcers are treated medically; an operation addresses an uncontrolled complication or objectively persistent disease after the cause and treatment have been reassessed.",
  "id": "upper-gi-peptic-ulcer-disease-01"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Cells and signals that explain treatment",
  "columns": [
    "Cell",
    "Product and role",
    "Clinical connection"
  ],
  "rows": [
    [
      "Parietal, predominantly body/fundus",
      "Acid and intrinsic factor",
      "The PPI target is the final H+/K+-ATPase pathway."
    ],
    [
      "Chief, predominantly body/fundus",
      "Pepsinogen",
      "Acid and proteolysis contribute to mucosal injury."
    ],
    [
      "G, antral",
      "Gastrin",
      "Antrectomy removes a major gastrin stimulus."
    ],
    [
      "ECL",
      "Histamine",
      "Histamine, acetylcholine, and gastrin stimulate acid secretion. ECL location is flagged below because the supplied module is problematic."
    ],
    [
      "D, including antral",
      "Somatostatin",
      "Inhibits G/ECL/parietal stimulation and provides negative feedback."
    ],
    [
      "Surface mucous",
      "Mucus and bicarbonate",
      "Prostaglandin-dependent defense is impaired by NSAIDs."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-02"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_GI_HORMONES_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Cells and signals that explain treatment",
  "text": "Vagotomy removes neural stimulation; antrectomy removes gastrin-producing mucosa. Neither concept replaces eradication of H. pylori or withdrawal of an ulcerogenic drug. A technically successful operation can still leave an untreated ulcer driver.",
  "id": "upper-gi-peptic-ulcer-disease-03"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Injury mechanisms and histology",
  "text": "H. pylori produces chronic gastritis and changes acid regulation and mucosal resistance. NSAIDs impair prostaglandin-mediated protection; a patient may have both exposures. Smoking impairs healing. Recurrent, multiple, or unusually distal ulcers warrant consideration of a hypersecretory disorder rather than repeated empiric treatment alone. The historical H. pylori prevalence figures in SCORE/Fiser are source-era estimates, not reliable current probabilities for an individual patient.",
  "id": "upper-gi-peptic-ulcer-disease-04"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Injury mechanisms and histology",
  "text": "Older age and substantial cardiac, pulmonary, renal, or metabolic comorbidity increase the consequences of an ulcer complication. This matters when selecting a limited emergency repair versus a larger definitive operation. Epidemiologic percentages in the local module are retained as historical source data rather than current incidence estimates.",
  "id": "upper-gi-peptic-ulcer-disease-05"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Injury mechanisms and histology",
  "text": "Acute inflammatory injury includes mucin depletion and neutrophils. Chronic gastritis includes lymphocytes and plasma cells. NSAID-related reactive gastropathy may show foveolar hyperplasia and edema with comparatively little inflammation. These are contextual patterns; an ulcer's appearance or symptom pattern does not establish that it is benign.",
  "id": "upper-gi-peptic-ulcer-disease-06"
}, SCORE_PEPTIC_ULCER_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Injury mechanisms and histology",
  "text": "The module mentions hypergastrinemia/ECL changes and gastric atrophy with prolonged antisecretory therapy. It does not establish a blanket causal risk estimate for clinically indicated PPI use; that claim is retained as a review issue rather than a reason to withhold ulcer treatment.",
  "id": "upper-gi-peptic-ulcer-disease-07"
}, SCORE_PEPTIC_ULCER_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Modified Johnson classification",
  "columns": [
    "Type",
    "Defining location/pattern",
    "Acid and operative implication"
  ],
  "rows": [
    [
      "I",
      "Distal lesser curvature near the incisura",
      "Usually a mucosal-defense problem; normal/low acid in classic teaching."
    ],
    [
      "II",
      "**Gastric ulcer plus a duodenal ulcer**",
      "High-acid phenotype; consider the acid component if definitive surgery is needed."
    ],
    [
      "III",
      "Prepyloric ulcer, within approximately 3 cm of the pylorus",
      "High-acid phenotype; proximity to the outlet changes repair/resection choices."
    ],
    [
      "IV",
      "Proximal lesser curve near the cardia",
      "Location makes excision/reconstruction difficult; mucosal protection is central. Supplied acid descriptions differ."
    ],
    [
      "V",
      "NSAID-associated ulcer at any gastric location",
      "Correct the exposure; location alone does not predict a high-acid state."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-08"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "warning",
  "heading": "↳ Modified Johnson classification",
  "text": "**Trap:** type II means a paired gastric/duodenal pattern, not simply any gastric ulcer at the incisura. The PUD module's wording is ambiguous; Fiser and the operative context clarify the distinction.",
  "id": "upper-gi-peptic-ulcer-disease-09"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Recognize uncomplicated disease and the complication",
  "text": "Burning epigastric discomfort is typical. The classic distinction is relief of duodenal-ulcer pain with food versus less relief with gastric ulcers, but the supplied texts disagree on meal timing. Use bleeding, weight loss, persistent vomiting, anemia, abnormal endoscopic appearance, and nonhealing to drive investigation rather than diagnosing the ulcer site from food response.",
  "id": "upper-gi-peptic-ulcer-disease-10"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "↳ Recognize uncomplicated disease and the complication",
  "columns": [
    "Presentation",
    "Priority"
  ],
  "rows": [
    [
      "Hematemesis, melena, or major blood loss",
      "Enter the [[Upper Gastrointestinal Bleeding]]."
    ],
    [
      "Abrupt severe pain, rigidity, sepsis",
      "Evaluate for perforation and obtain urgent source control when indicated."
    ],
    [
      "Persistent vomiting, poor intake, distension, weight loss",
      "Consider gastric outlet obstruction; decompress and evaluate malignancy."
    ],
    [
      "Recurrent/multiple ulcers despite treatment",
      "Reassess cause, adherence, malignancy, and hypersecretion."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-11"
}, [[SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Diagnose the ulcer and explain its cause",
  "text": "EGD identifies the lesion and enables tissue sampling. **Biopsy a gastric ulcer or suspicious abnormality to assess malignancy**, with documentation of location and pathology follow-up. The SCORE disease module describes four-quadrant sampling when appropriate; safe sampling depends on the lesion and clinical setting. Healing surveillance remains important for gastric ulcers, especially those that are suspicious or fail to resolve.",
  "id": "upper-gi-peptic-ulcer-disease-12"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Diagnose the ulcer and explain its cause",
  "text": "Tests for H. pylori include urea breath testing, stool antigen, and biopsy-based histology/urease testing. Serology appears in the supplied diagnostic list but should not be used to prove cure; antibodies do not establish eradication. Plan testing around suppressive treatment, and do not mistake a symptom response for microbiologic cure.",
  "id": "upper-gi-peptic-ulcer-disease-13"
}, [[SCORE_PEPTIC_ULCER_SOURCE, ACG_H_PYLORI_2024_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Treat H. pylori and document cure",
  "text": "**Current-practice addition:** ACG 2024 prefers **14-day optimized bismuth quadruple therapy** when susceptibility is unknown: oral PPI twice daily, bismuth subcitrate 120–300 mg or subsalicylate 300–524 mg four times daily, tetracycline 500 mg four times daily, and metronidazole 500 mg three or four times daily. Do not automatically substitute doxycycline. Clarithromycin- or levofloxacin-based treatment requires demonstrated susceptibility. Confirm cure at least four weeks after therapy using breath, stool antigen, or an appropriate biopsy test; withhold PPI for two weeks and antibiotics/bismuth for four weeks before testing. Regimen selection still requires allergy, interaction, and prior-treatment review.",
  "id": "upper-gi-peptic-ulcer-disease-14"
}, ACG_H_PYLORI_2024_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Treat H. pylori and document cure",
  "text": "The local SCORE/Fiser default of clarithromycin triple therapy is older teaching. Preserve it as source history, not the empiric regimen in this guide. Persistent infection calls for a prior-antibiotic and susceptibility-informed salvage plan; repeating the same failed antibiotics without reassessment is not an adequate endpoint.",
  "id": "upper-gi-peptic-ulcer-disease-15"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, ACG_H_PYLORI_2024_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "NSAID-associated and uncomplicated ulcers",
  "text": "Stop NSAIDs when feasible, start acid suppression, address smoking, and treat H. pylori if present. If ongoing NSAID treatment is unavoidable, the supplied module favors a PPI to facilitate healing. Confirm the reason for aspirin before stopping it: cardiovascular secondary prevention requires a different risk discussion from discretionary analgesic NSAID use.",
  "id": "upper-gi-peptic-ulcer-disease-16"
}, [[SCORE_PEPTIC_ULCER_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ NSAID-associated and uncomplicated ulcers",
  "text": "Evaluate persistent disease by endoscopic healing, rather than symptoms alone. Review drug exposure, treatment adherence, H. pylori persistence, biopsy adequacy, and possible hypersecretion before labeling the ulcer medically refractory. SCORE's 8–12-week vagotomy indication and Fiser's approximately three-month description are a reassessment framework, not a reason to delay urgent management of a complication.",
  "id": "upper-gi-peptic-ulcer-disease-17"
}, [[FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "sequence",
  "heading": "Gastric outlet obstruction",
  "steps": [
    {
      "title": "Decompress and resuscitate",
      "detail": "Vomiting and poor intake produce volume contraction, hypochloremia, hypokalemia, and metabolic alkalosis. Correct these deficits before elective reconstruction."
    },
    {
      "title": "Define the lesion",
      "detail": "EGD with biopsy helps distinguish peptic narrowing from gastric malignancy; evaluate nutrition as well as luminal anatomy."
    },
    {
      "title": "Treat the reversible component",
      "detail": "PPI treatment, H. pylori eradication, and endoscopic dilation are initial options for peptic obstruction."
    },
    {
      "title": "Operate for persistent obstruction",
      "detail": "Antrectomy with reconstruction and an acid-reducing component is a classic option in active ulcer disease; the exact operation depends on scar, anatomy, and physiology. A drainage/bypass option may be needed when resection is unsafe."
    }
  ],
  "id": "upper-gi-peptic-ulcer-disease-18"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "warning",
  "heading": "↳ Gastric outlet obstruction",
  "text": "**Trap:** a denervating operation can worsen emptying if the real problem is gastroparesis without active ulcer disease. Prove the indication and identify the actual obstruction.",
  "id": "upper-gi-peptic-ulcer-disease-19"
}, SCORE_VAGOTOMY_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "When an operation becomes necessary",
  "text": "Uncontrolled bleeding, perforation, refractory obstruction, objectively persistent ulcers despite adequate treatment, and inability to exclude malignancy are the main indications. The operation must solve the presenting problem. An unstable patient may need limited source control; a stable patient with refractory disease may tolerate definitive resection/acid reduction. See the companion procedures for exposure and closure.",
  "id": "upper-gi-peptic-ulcer-disease-20"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "↳ When an operation becomes necessary",
  "columns": [
    "Strategy",
    "Main tradeoff"
  ],
  "rows": [
    [
      "Truncal vagotomy with antrectomy",
      "Strong acid reduction and low recurrence, with greater operative and postgastrectomy burden."
    ],
    [
      "Truncal vagotomy with drainage",
      "Less resection, but requires a functioning drainage procedure; recurrence remains possible."
    ],
    [
      "Highly selective vagotomy",
      "Preserves antral/pyloric innervation and avoids routine drainage; higher recurrent-ulcer risk."
    ],
    [
      "Gastric-ulcer excision/resection",
      "Tissue diagnosis and ulcer removal matter; location near pylorus/GE junction may require more than a wedge."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-21"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ When an operation becomes necessary",
  "text": "Calling vagotomy-antrectomy the historical definitive operation does not make it mandatory for every ulcer perforation or for every patient who has ever taken a PPI. The perforation module explicitly prioritizes physiology and limits added acid-reducing procedures to selected stable patients.",
  "id": "upper-gi-peptic-ulcer-disease-22"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Hypersecretion: interpret gastrin in context",
  "text": "Suspect gastrinoma with recurrent, multiple, distal, or treatment-resistant ulcers, especially with diarrhea or MEN1 features. Gastrin must be interpreted with gastric acidity and acid-suppressant exposure; hypergastrinemia alone does not explain the mechanism. The supplied Fiser pancreatic section uses **pg/mL**, whereas the perforation module prints **ng/mL** for its diagnostic threshold. Do not propagate that unit error or use the isolated threshold as a stand-alone diagnosis. No secretin-test cutoff is adopted here because the supplied older cutoff needs a separate contemporary endocrine review.",
  "id": "upper-gi-peptic-ulcer-disease-23"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, FISER_PANCREAS_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Recognize postoperative syndromes",
  "columns": [
    "Syndrome",
    "Mechanism/clue and response"
  ],
  "rows": [
    [
      "Early dumping",
      "Rapid hyperosmolar delivery causes GI/vasomotor symptoms shortly after meals; start smaller meals and avoid simple carbohydrates."
    ],
    [
      "Late dumping",
      "Postprandial hyperinsulinemic hypoglycemia occurs later; nutritional modification first, specialist-directed medication if persistent."
    ],
    [
      "Blind-loop syndrome",
      "Stasis/bacterial overgrowth causes steatorrhea and B12 deficiency; medical therapy unless anatomic obstruction needs correction."
    ],
    [
      "Afferent-loop obstruction",
      "Pain with a distended biliopancreatic limb; acute obstruction can become ischemic and requires surgical assessment."
    ],
    [
      "Efferent-loop obstruction",
      "Adhesions or internal hernia obstruct the alimentary limb; correct the mechanical cause."
    ],
    [
      "Retained antrum",
      "Antral mucosa left in a duodenal stump drives gastrin and recurrent ulcers; resect retained tissue after evaluation."
    ],
    [
      "Alkaline reflux gastritis",
      "Bile reflux, especially with Billroth II; persistent cases may need Roux-en-Y revision."
    ],
    [
      "Delayed emptying or diarrhea",
      "Evaluate anatomy/metabolic causes; prokinetics or cause-directed diarrhea treatment may help."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-24"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "**Anterior duodenal ulcer perforates; posterior ulcer can erode the GDA.**",
    "**Johnson II and III are the classic high-acid gastric-ulcer patterns.**",
    "Gastric-ulcer management includes tissue diagnosis and follow-up, even if bleeding has stopped.",
    "Obstruction produces a **hypochloremic, hypokalemic metabolic alkalosis**; correct physiology before reconstruction.",
    "Highly selective vagotomy preserves the crow's foot and ordinarily needs no drainage.",
    "Persistent ulcers after treatment require a new causal assessment, not automatic escalation to a larger operation."
  ],
  "id": "upper-gi-peptic-ulcer-disease-25"
}, [[FISER_STOMACH_SOURCE], [FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Supplied board-source teaching",
    "Current practice or source correction"
  ],
  "rows": [
    [
      "H. pylori eradication",
      "Local SCORE/Fiser describe empirical clarithromycin triple therapy.",
      "ACG 2024 prefers optimized bismuth quadruple therapy when susceptibility is unknown; confirm eradication."
    ],
    [
      "Gastrin units",
      "The perforation module prints a diagnostic threshold in ng/mL.",
      "Fiser uses pg/mL. Interpret gastrin with gastric acidity and treatment exposure; do not copy the isolated unit-error threshold."
    ]
  ],
  "id": "upper-gi-peptic-ulcer-disease-26"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, ACG_H_PYLORI_2024_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE, FISER_PANCREAS_SOURCE]]),
  references("upper-gi-peptic-ulcer-disease-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE, SCORE_EGD_SOURCE, ACG_H_PYLORI_2024_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE, FISER_PANCREAS_SOURCE, FISER_GI_HORMONES_SOURCE]),
];

export const pepticUlcerDiseaseDraft = buildDraftTopic({
  "id": "00000000-0000-4000-8000-000000004720",
  "versionId": "00000000-0000-4000-8000-000000004730",
  "slug": "peptic-ulcer-disease",
  "title": "Peptic Ulcer Disease",
  "aliases": [
    "PUD",
    "peptic ulceration",
    "Johnson gastric ulcer classification"
  ],
  "scoreNodeId": "stomach-conditions",
  "scoreCategory": "SCORE · Stomach · Diseases & Conditions",
  "tags": [
    "upper-gi",
    "absite",
    "score",
    "clinical-review-pending"
  ],
  "sourceId": SCORE_PEPTIC_ULCER_SOURCE,
  "additionalSourceIds": [
    FISER_STOMACH_SOURCE,
    SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
    SCORE_VAGOTOMY_SOURCE,
    SCORE_EGD_SOURCE,
    ACG_H_PYLORI_2024_SOURCE,
    ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
    FISER_PANCREAS_SOURCE,
    FISER_GI_HORMONES_SOURCE
  ],
  "blocks": blocks,
  "createdAt": "2026-10-22T00:00:00.000Z",
  "warnings": [
    "Draft — pending Zach's clinical review",
    "**Clinical approval pending.** Source review does not establish clinical approval.",
    "**Conflicting anatomy:** S1 places ECL cells predominantly in the antrum and describes duodenal ulcers within the antral-pyloric channel. ECL location is not taught here; duodenal location follows the concordant duodenal-bulb descriptions in S3 §1 and S2 p.398.",
    "**Classification/physiology:** type II wording and type IV acid descriptions differ; the table preserves the paired-lesion definition and avoids an unsupported universal acid claim for type IV.",
    "**Historical management:** empirical clarithromycin triple therapy, fixed blood-unit thresholds, and automatic acid surgery after prior PPI use must not drive the contemporary algorithms.",
    "**Needs further support:** a full gastrinoma diagnostic protocol, exact ulcer-healing/endoscopic surveillance intervals, and causal claims about long-term PPI atrophy. The apparent gastrin-unit error is omitted from diagnostic teaching.",
    "No matching stomach/EGD question-bank entries were supplied; no bank key or tested-frequency claim is inferred. SCORE figures/videos remain unreviewed."
  ]
});
