import { buildTopic, references, sourced } from "@/content/authoring";
import { ACUTE_LIVER_FAILURE_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-alf-summary",
    type: "summary",
    heading: "At a glance",
    text: "Acute liver failure (ALF) is defined by coagulopathy (**INR ≥ 1.5**), **hepatic encephalopathy**, and acute liver injury occurring **within 26 weeks** of symptom onset in a patient without prior cirrhosis or chronic liver disease. **Cerebral edema** and intracranial hypertension are unique to acute liver failure and are not seen in chronic cirrhosis.",
  }, SOURCE),

  sourced({
    id: "block-alf-definitions",
    type: "bullets",
    heading: "Pathophysiology & core diagnostic triad",
    items: [
      "**Pathophysiology**: massive, rapid hepatocyte necrosis leading to loss of hepatic synthetic and metabolic function.",
      "**Diagnostic triad**",
      "- INR ≥ 1.5",
      "- Hepatic encephalopathy of any grade",
      "- Acute liver injury (transaminitis and hyperbilirubinemia) in the absence of preexisting cirrhosis",
      "**Duration threshold**: symptom onset < 26 weeks defines acute liver failure; illness lasting > 26 weeks represents chronic liver failure.",
      "**Hallmarks**: hyperammonemia, severe coagulopathy, and intracranial hypertension secondary to cerebral edema.",
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-subtypes-table",
    type: "table",
    heading: "Subtypes of acute liver failure",
    columns: ["Subtype", "Onset Duration (Jaundice to Encephalopathy)", "Typical Etiologies", "Spontaneous Recovery Likelihood"],
    rows: [
      ["Hyperacute", "**0 to 6 days**", "**Acetaminophen (APAP)**, ischemia ('shock liver'), Hepatitis A / E", "**High** (~60%+)"],
      ["Acute", "**7 to 21 days**", "**Hepatitis B**, idiosyncratic drug reactions", "**Moderate**"],
      ["Subacute", "**22 days to 26 weeks**", "Non-APAP **drug-induced liver injury (DILI)**, indeterminate", "**Poor** (frequently requires transplant)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-workup-table",
    type: "table",
    heading: "Etiology-directed diagnostic workup panel",
    columns: ["Suspected Etiology", "Diagnostic Tests"],
    rows: [
      ["Acetaminophen Toxicity", "Serum APAP level, toxicology screen"],
      ["Viral Hepatitis", "Anti-HAV IgM, HBsAg, Anti-HBc IgM, Anti-HCV, Anti-HEV, HSV/EBV/CMV PCR"],
      ["Autoimmune Hepatitis", "ANA, ASMA, Anti-LKM-1, serum IgG"],
      ["Wilson Disease", "Serum ceruloplasmin, 24-hour urine copper, Kayser-Fleischer ring exam"],
      ["Vascular / Outflow (Budd-Chiari)", "Right upper quadrant Doppler ultrasound"],
      ["Pregnancy-Related (AFLP / HELLP)", "Urine/serum beta-hCG, peripheral blood smear, uric acid, LFTs"],
      ["Unknown / Inconclusive", "Transjugular liver biopsy"],
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-histology-pearls",
    type: "bullets",
    heading: "↳ High-yield histology & pathology pearls",
    items: [
      "**Acute fatty liver of pregnancy (AFLP)**: characterized by **microvesicular steatosis** on liver biopsy.",
      "**HELLP syndrome**: characterized predominantly by **periportal hemorrhage** and hepatic necrosis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-west-haven-table",
    type: "table",
    heading: "West Haven criteria for hepatic encephalopathy",
    columns: ["Grade", "Clinical Manifestations", "Airway & Monitoring Priority"],
    rows: [
      ["Grade I", "Mild confusion, euphoria or anxiety, slurred speech, **inverted sleep-wake cycle**", "Observation on floor/step-down/ICU"],
      ["Grade II", "Moderate confusion, lethargy, **asterixis**, overt personality changes", "**ICU admission** and close monitoring"],
      ["Grade III", "Marked confusion, incoherent speech, somnolence, **arousable to stimuli**", "**Intubation** for airway protection"],
      ["Grade IV", "**Comatose**, unresponsive to verbal stimuli, decerebrate/decorticate posturing", "Intubation and **intracranial pressure monitoring**"],
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-kings-college-flow",
    type: "flow",
    heading: "King's College criteria for emergency liver transplantation",
    nodes: [
      { id: "eval", label: "Patient with Acute Liver Failure Evaluated for Transplant" },
      { id: "apap", label: "Acetaminophen-Induced ALF" },
      { id: "non-apap", label: "Non-Acetaminophen Causes" },
      { id: "apap-criteria", label: "Arterial pH < 7.30 OR all 3: Grade III/IV HE, INR > 6.5, Creatinine > 3.4 mg/dL", tone: "caution" },
      { id: "non-apap-criteria", label: "INR > 6.5 OR any 3 of: Age < 10 or > 40, Non-A/B or DILI, Jaundice-to-HE > 7d, INR > 3.5, Bilirubin > 17.5 mg/dL", tone: "caution" },
      { id: "transplant", label: "Urgent Emergency Liver Transplant Evaluation & Listing", tone: "good" },
    ],
    edges: [
      { from: "eval", to: "apap", label: "APAP overdose" },
      { from: "eval", to: "non-apap", label: "All other etiologies" },
      { from: "apap", to: "apap-criteria" },
      { from: "non-apap", to: "non-apap-criteria" },
      { from: "apap-criteria", to: "transplant", label: "Meets criteria" },
      { from: "non-apap-criteria", to: "transplant", label: "Meets criteria" },
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-icu-management",
    type: "bullets",
    heading: "ICU resuscitation & organ support",
    items: [
      "**Transplant center referral**: immediate consultation and transfer to a liver transplant center significantly improves long-term survival.",
      "**Antidote therapy**: administer **N-acetylcysteine (NAC)** promptly for APAP toxicity; NAC also provides microcirculatory benefits in non-APAP ALF.",
      "**Autoimmune etiology**: initiate high-dose systemic corticosteroids in close coordination with hepatology.",
      "**Coagulopathy rule**: do **not** correct coagulopathy prophylactically with FFP or factor concentrates unless active invasive bleeding is present or immediately prior to ICP monitor placement, as INR is the primary prognostic marker.",
      "**Prophylaxis & sepsis**: stress ulcer prophylaxis with a PPI or H2 blocker; routine empiric antibiotics are **not recommended**, but surveillance cultures are mandatory as clinical decompensation often indicates occult sepsis; early enteral nutrition.",
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-ich-management",
    type: "sequence",
    heading: "Neurocritical care & intracranial hypertension (ICH) protocol",
    steps: [
      { title: "Target hemodynamics", detail: "Maintain **MAP > 75 mm Hg**, **ICP < 25 mm Hg**, and Cerebral Perfusion Pressure (CPP = MAP - ICP) **> 60 mm Hg**." },
      { title: "Airway protection", detail: "Endotracheal intubation for **Grade III or IV** hepatic encephalopathy." },
      { title: "Neuroimaging", detail: "**Non-contrast head CT** for acute neurological decline or Grade III/IV coma to rule out intracranial hemorrhage and assess herniation risk." },
      { title: "Hyperosmolar therapy", detail: "**Mannitol** bolus (0.5 to 1 g/kg, provided serum osmolality < 320 mOsm/kg) or **hypertonic saline** (3% or 23.4%, targeting serum sodium 145 to 155 mEq/L)." },
      { title: "Refractory crisis", detail: "**Barbiturate coma** (pentobarbital/thiopental) and **therapeutic hypothermia** (32°C to 34°C) for refractory elevated ICP." },
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-outcomes-prognosis",
    type: "bullets",
    heading: "Outcomes & prognostic factors",
    items: [
      "**Population outcomes**: approximately **45% spontaneous recovery** without transplant, 30% mortality without transplant, and 25% undergo liver transplantation (with ~80% 1-year post-transplant survival).",
      "**Favorable spontaneous recovery**: APAP toxicity (~60%), Hepatitis A, ischemic hepatitis ('shock liver'), pregnancy-related ALF (following delivery), and low-grade encephalopathy (Grades I–II).",
      "**Poor prognosis without transplant**: Grade III/IV encephalopathy, Hepatitis B, Wilson disease, autoimmune hepatitis, idiosyncratic DILI, and indeterminate etiologies.",
      "**Non-predictive for spontaneous recovery alone**: patient age and length of jaundice-to-encephalopathy interval (though both serve as negative prognostic criteria within King's College non-APAP rules).",
    ],
  }, SOURCE),

  sourced({
    id: "block-alf-coagulopathy-warning",
    type: "warning",
    tone: "danger",
    heading: "Do not correct the INR routinely",
    text: "Prophylactic correction of coagulopathy with fresh frozen plasma or clotting factor concentrates obscures **serial INR trend monitoring** — the single most vital marker of spontaneous recovery versus deterioration — and **volume overload** exacerbates cerebral edema.",
  }, SOURCE),

  references("block-alf-references", [SOURCE]),
];

export const acuteLiverFailureTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000701",
  versionId: "00000000-0000-4000-8000-000000000711",
  slug: "acute-liver-failure",
  title: "Acute Liver Failure",
  // The SCORE outline files this under "Hepatic Failure and Hepatorenal Syndrome", but
  // these blocks cover acute liver failure only — no HRS criteria, staging, or therapy.
  // The title tracks what is actually here; the outline records the section as partial.
  aliases: ["ALF", "fulminant hepatic failure", "hepatic failure", "Kings College criteria", "cerebral edema in liver failure"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "liver", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-16T00:00:00.000Z",
});
