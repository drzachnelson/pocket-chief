import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACUTE_PANCREATITIS_OE_SOURCE as OE,
  FISER_PANCREAS_SOURCE as FISER,
  SCORE_ACUTE_PANCREATITIS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-acute-pancreatitis/1-packet.md (S1 SCORE Acute Pancreatitis, S2 Fiser
// chapter 33), checked against the folder's OpenEvidence document. Packet blocks are carried as written; the split
// table holds every packet FLAG plus the OpenEvidence document's current-practice positions. BISAP is in neither SCORE
// nor Fiser; it appears only in the split table, cited to the OpenEvidence document, and is flagged for sign-off.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-pa-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Acute pancreatitis is acute inflammation of the pancreas that accounts for more than 300,000 admissions per year in the United States, most often from gallstones (40% of cases) or alcohol (35% of cases). Diagnosis rests on epigastric pain that may radiate to the back, a threefold or greater elevation of amylase and lipase, and imaging findings on CT, the standard modality. Severity is graded by the revised Atlanta framework: mild disease has no organ failure and mortality under 1%, whereas severe disease with persistent organ failure carries 10% to 30% mortality. Management is supportive \u2014 fluid resuscitation, analgesia, and early enteral nutrition \u2014 with antibiotics reserved for suspected or documented infection, ERCP reserved for biliary obstruction or severe biliary disease, cholecystectomy during the index admission for gallstone pancreatitis, and a delayed, minimally invasive step-up approach for infected necrosis.",
  }, SCORE),

  sourced({
    id: "block-pa-etiology-severity-scoring-co",
    type: "bullets",
    heading: "Etiology, severity scoring, and collections",
    items: [
      "Less common causes include pancreatic and ampullary tumors, hypertriglyceridemia, hypercalcemia, medications such as sulfonamides, azathioprine, and thiazide diuretics, trauma including post-ERCP injury, and congenital anatomic obstruction.",
      "Hereditary pancreatitis is linked to PRSS1 mutation, present in 80% of autosomal dominant hereditary cases, as well as CFTR and SPINK1 mutations.",
      "The Ranson score uses separate prognostic features for gallstone and non-gallstone pancreatitis, while an APACHE II score of 8 or higher identifies severe pancreatitis even though the score is not disease-specific.",
      "The CT Severity Index grades pancreatitis by the degree of inflammation, the presence of fluid collections, and the extent of necrosis.",
      "About 20% of patients with acute pancreatitis develop pancreatic necrosis, and the risk of infecting that necrosis rises with the amount of necrotic tissue.",
      "Signs of infected necrosis include fever, increasing leukocytosis, and new or worsening organ failure.",
      "Mortality in severe pancreatitis is bimodal: early deaths under 2 weeks come from multiorgan failure driven by systemic inflammation, and late deaths after 2 weeks come from septic complications, with infection the most common cause.",
      "Pseudocysts complicate 5% to 15% of peripancreatic fluid collections after acute pancreatitis, are lined by collagen and granulation tissue rather than epithelium, and are observed when asymptomatic.",
      "After pancreatic debridement, the risk of endocrine and exocrine insufficiency is about 25% and rises with the amount of gland lost.",
      "Autoimmune pancreatitis presents as an inflammatory mass that must be distinguished from malignancy, shows lymphocyte-only infiltration on biopsy, is associated with elevated serum IgG4, and should resolve completely with corticosteroids.",
    ],
  }, SCORE),

  sourced({
    id: "block-pa-revised-atlanta-severity-cla",
    type: "table",
    heading: "Revised Atlanta severity classification",
    columns: ["Severity grade", "Defining features", "Expected mortality"],
    rows: [
      ["Mild acute pancreatitis", "Absence of organ failure and absence of local or systemic complications define this grade.", "Mortality is less than 1% for mild disease."],
      ["Moderately severe acute pancreatitis", "Transient organ failure resolving within 48 hours and/or local or systemic complications without persistent organ failure define this grade.", "Mortality is intermediate and driven mainly by local complications rather than persistent organ failure."],
      ["Severe acute pancreatitis", "Persistent organ failure involving one or multiple organs defines this grade.", "Mortality is 10% to 30% for severe disease."],
    ],
  }, SCORE),

  sourced({
    id: "block-pa-from-presentation-stepup-app",
    type: "flow",
    heading: "From presentation to the step-up approach for necrosis",
    nodes: [
      { id: "start", label: "A patient presents with epigastric pain radiating to the back, vomiting, and amylase and lipase at least three times the upper limit of normal." },
      { id: "support", label: "Resuscitation begins with intravenous fluids, analgesia, and oral or enteral nutrition as tolerated, with parenteral nutrition only when enteral feeding is impossible." },
      { id: "etiology", label: "The etiology is established, with ultrasound to look for gallstones and a possible common bile duct stone." },
      { id: "biliary", label: "A patient with biliary pancreatitis and suspected persistent biliary obstruction, or severe acute biliary pancreatitis, is selected for ERCP rather than routine ERCP for everyone.", tone: "caution" },
      { id: "necrosis", label: "A deteriorating patient with fever, rising white count, or new organ failure after the second week is evaluated for infected pancreatic necrosis with imaging and cultures.", tone: "caution" },
      { id: "drain", label: "Image-guided percutaneous drainage is placed first for infected necrosis, which alone can successfully manage many patients and temporizes the rest." },
      { id: "debride", label: "Debridement is delayed until about 4 weeks after onset when possible and performed by the least invasive workable route, including transgastric endoscopic, laparoscopic, retroperitoneal, or video-assisted retroperitoneal debridement, reserving open necrosectomy for failure of lesser steps.", tone: "good" },
    ],
    edges: [
      { from: "start", to: "support", label: "Supportive resuscitation is the cornerstone for every severity grade." },
      { from: "support", to: "etiology", label: "Etiology determines the disease-specific interventions that follow." },
      { from: "etiology", to: "biliary", label: "Gallstone etiology raises the question of duct obstruction and ERCP." },
      { from: "biliary", to: "necrosis", label: "Patients who fail to improve are reassessed for necrosis and infection." },
      { from: "necrosis", to: "drain", label: "Suspected infected necrosis is drained percutaneously before any debridement." },
      { from: "drain", to: "debride", label: "Drainage failure, failure to thrive, or worsening organ failure despite maximal support leads to delayed debridement." },
    ],
  }, SCORE),

  sourced({
    id: "block-pa-open-pancreatic-necrosectomy",
    type: "sequence",
    heading: "Open pancreatic necrosectomy steps",
    steps: [
      { title: "Access", detail: "The retroperitoneum is reached by laparotomy, a retroperitoneal open approach, or video-assisted retroperitoneal exposure, and the lesser sac is entered through the gastrocolic ligament or the transverse mesocolon." },
      { title: "Debridement", detail: "Necrotic pancreas and fluid are removed with blunt or finger dissection, taking care not to injure the peripancreatic vessels." },
      { title: "Culture", detail: "Removed tissue and fluid are sent for culture to direct antimicrobial therapy." },
      { title: "Drainage", detail: "Drainage catheters are placed into the debrided cavity before closure." },
    ],
  }, SCORE),

  sourced({
    id: "block-pa-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser's ABSITE Review remains the board source for the Ranson criteria: on admission, age over 55, white count over 16, glucose over 200, AST over 250, and LDH over 350, with 48-hour criteria of hematocrit fall of 10%, BUN rise of 5, calcium under 8, PaO2 under 60, base deficit over 4, and fluid sequestration of 6 liters or more, and Fiser keys mortality near 100% when eight criteria are met. Fiser also teaches classic points that SCORE does not carry forward unchanged: morphine should be avoided because it can contract the sphincter of Oddi, imipenem is the best antibiotic for severe pancreatitis, and enteral tube feeds should start within 24 to 48 hours in severe disease. SCORE instead emphasizes the Atlanta classification and APACHE II, states that prophylactic antibiotics play no role, and lists narcotic analgesia as an acceptable requirement without a morphine restriction.",
  }, FISER),

  sourced({
    id: "block-pa-infected-necrosis-cost-opera",
    type: "warning",
    heading: "Infected necrosis and the cost of operating early",
    text: "Infected pancreatic necrosis is the lethal complication of this disease: suspect it with fever, increasing leukocytosis, bacteremia, gas within a collection, or new organ failure, and exclude peripancreatic infection in any patient with recent severe pancreatitis who presents with fever. Operative mortality falls significantly when intervention is delayed until 4 weeks after disease onset, so percutaneous drainage should temporize whenever possible, because open necrosectomy mortality has been reported as high as 25% to 30%. Vascular complications also kill: splanchnic venous thrombosis forces a bleeding-versus-thrombosis judgment on anticoagulation, and pseudoaneurysms are typically treated with embolization because of their bleeding risk.",
  }, SCORE),

  sourcedUnits({
    id: "block-pa-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Mortality", "Fiser: 10% overall, 50% for hemorrhagic pancreatitis, and near 100% with eight Ranson criteria", "SCORE (revised Atlanta): under 1% for mild disease and 10% to 30% for severe disease with persistent organ failure"],
      ["Antibiotics", "Fiser: antibiotics for severe pancreatitis, with imipenem the best choice", "SCORE: no role for prophylactic antibiotics, which may select resistant organisms or fungi; treat only suspected or culture-proven infection"],
      ["Pain control", "Fiser: avoid morphine, which contracts the sphincter of Oddi", "SCORE: narcotic analgesia may be required, with no morphine restriction"],
      ["ERCP in gallstone pancreatitis", "Fiser: usually unnecessary because the stone passes; ERCP for cholangitis, bilirubin over 3, or a stone on imaging", "SCORE: ERCP for persistent biliary obstruction, with trial benefit in severe biliary pancreatitis and no routine role in mild disease; in the APEC trial, routine early ERCP did not help predicted-severe disease without cholangitis"],
      ["Cholecystectomy timing in gallstone pancreatitis", "SCORE: during the index admission once symptoms resolve and labs normalize, because 25% recur within 3 months without it", "Fiser's exception, which the OpenEvidence document shares: with necrosis, fluid collections or pseudocysts, wait about 6 weeks or until collections resolve"],
      ["Severity scoring", "Ranson criteria, which need 48 hours to complete", "An admission-available score such as BISAP (BUN over 25, impaired mental status, SIRS, age over 60, pleural effusion; 3 or more predicts severe disease) or APACHE II; no score is clearly superior"],
      ["Fluid resuscitation", "Aggressive fluids at 250 to 500 mL/h", "Goal-directed moderate resuscitation at 5 to 10 mL/kg/h with lactated Ringer solution; in WATERFALL, aggressive fluids caused more overload without less progression"],
      ["Feeding", "Nothing by mouth to rest the gut, with parenteral nutrition", "Early oral feeding as tolerated in mild disease, and enteral rather than parenteral nutrition for those who cannot eat"],
      ["CT", "CT to make the diagnosis", "No imaging is needed when pain and enzymes make the diagnosis; contrast CT at 72 to 96 hours characterizes necrosis"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, SCORE], [FISER, SCORE, OE], [SCORE, FISER, OE], [FISER, OE], [OE], [FISER, OE], [SCORE, OE]]),

  references("block-pa-references", [SCORE, FISER, OE]),
];

export const acutePancreatitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005620",
  versionId: "00000000-0000-4000-8000-000000005621",
  slug: "acute-pancreatitis",
  title: "Acute Pancreatitis",
  aliases: ["pancreatitis", "gallstone pancreatitis", "biliary pancreatitis", "alcoholic pancreatitis", "necrotizing pancreatitis", "infected pancreatic necrosis", "walled-off necrosis", "pancreatic pseudocyst", "Ranson criteria", "Atlanta classification", "BISAP", "step-up approach", "necrosectomy"],
  scoreNodeId: "pancreas-conditions",
  scoreCategory: "SCORE · Pancreas · Diseases & Conditions",
  tags: ["pancreas", "acute-pancreatitis", "gallstone-pancreatitis", "pancreatic-necrosis", "step-up-approach", "ercp", "cholecystectomy", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
