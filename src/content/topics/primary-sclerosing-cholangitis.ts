import { buildTopic, references, sourced } from "@/content/authoring";
import {
  AASLD_PSC_SOURCE as AASLD,
  FISER_BILIARY_SOURCE as FISER,
  SCORE_PSC_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-psc-summary",
    type: "summary",
    heading: "At a glance",
    text: "Primary sclerosing cholangitis is idiopathic, progressive inflammatory stricturing of the intrahepatic and extrahepatic ducts, usually in a **man around 40 with ulcerative colitis**. The cholangiogram is **beaded**. No drug changes its course; endoscopy treats dominant strictures, and **transplant** is the only definitive therapy once cirrhosis arrives. Any **dominant stricture is cholangiocarcinoma** until proven otherwise, and the patient needs lifelong surveillance of the ducts, the gallbladder, and the colon.",
  }, SCORE),
  sourced({
    id: "block-psc-epidemiology",
    type: "bullets",
    heading: "Who gets it",
    items: [
      "Incidence about **1 per 100,000 person-years**, more common in **men**, with a median age of **41** at presentation.",
      "Up to **90 percent** of patients with PSC have **ulcerative colitis**; Crohn disease is also associated.",
      "It is a diagnosis of exclusion — **secondary** strictures from neoplasm, infection, and ischemia must be ruled out first.",
    ],
  }, SCORE),
  sourced({
    id: "block-psc-presentation",
    type: "bullets",
    heading: "Presentation",
    items: [
      "Symptoms are often intermittent, and many patients are **asymptomatic** at diagnosis.",
      "Fatigue, **pruritus** from cholestasis, and jaundice.",
      "Examination may show jaundice, hepatomegaly, splenomegaly, and excoriations.",
      "A raised **alkaline phosphatase**, with or without bilirubin, is the usual laboratory clue.",
    ],
  }, SCORE),
  sourced({
    id: "block-psc-fiser",
    type: "bullets",
    heading: "On the exam",
    items: [
      "Men in the **fourth and fifth decades**, associated with ulcerative colitis, pancreatitis, and diabetes.",
      "Jaundice, fatigue, pruritus, weight loss, and right upper quadrant pain.",
      "Progressive fibrosis of the ducts leads to **portal hypertension and liver failure**.",
      "**Does not improve after colectomy** for ulcerative colitis.",
      "Complications are **cirrhosis and cholangiocarcinoma**.",
      "Most need a transplant eventually; PTC drainage, choledochojejunostomy, or balloon dilation of dominant strictures relieves symptoms.",
      "**Cholestyramine** relieves pruritus by binding bile acids.",
    ],
  }, FISER),
  sourced({
    id: "block-psc-imaging",
    type: "table",
    heading: "Diagnostic modalities",
    columns: ["Study", "What it shows", "Role"],
    rows: [
      ["Ultrasound", "Thickened duct walls and focal dilations", "Supportive"],
      ["MRCP", "Multifocal short strictures that look like **beads**", "Noninvasive anatomy"],
      ["ERCP", "Multifocal strictures and dilations", "Allows brushings, dilation, and stenting"],
      ["PTC", "The same cholangiographic picture from above", "When ERCP is not possible"],
    ],
  }, SCORE),
  sourced({
    id: "block-psc-mimics",
    type: "bullets",
    heading: "Exclude the mimics",
    items: [
      "Measure **serum IgG4** at diagnosis: IgG4-related sclerosing cholangitis looks the same on a cholangiogram and responds to steroids.",
      "Secondary sclerosing cholangitis from prior biliary surgery, ischemia, chronic obstruction, or infection must be excluded before the label is applied.",
      "**MRCP** is the diagnostic test of choice; ERCP is reserved for sampling and treating a stricture.",
    ],
  }, AASLD),
  sourced({
    id: "block-psc-dominant",
    type: "warning",
    heading: "A dominant stricture is cancer until proven otherwise",
    text: "Any **dominant lesion** in a patient with PSC must raise suspicion for **cholangiocarcinoma**. Sample it before attributing it to the disease, and treat a new dominant stricture or a sudden rise in bilirubin as a cancer workup, not a flare.",
  }, SCORE),
  sourced({
    id: "block-psc-interventions",
    type: "table",
    heading: "Treating the strictures",
    columns: ["Option", "When", "Reported results"],
    rows: [
      ["Endoscopic dilation and stenting", "Dominant stricture without cirrhosis", "**83 percent** 5-year survival with repeated balloon dilation, and **89 percent** transplant-free at 7 years in another series"],
      ["Biliary resection and reconstruction", "Dominant stricture at the **bifurcation** without cirrhosis, with silastic stenting", "**35 percent** symptom-free at 10 years"],
      ["Orthotopic liver transplantation", "**Cirrhosis**, offered at a MELD of **15** or more", "Better outcomes than reconstruction"],
    ],
  }, SCORE),
  sourced({
    id: "block-psc-medical",
    type: "bullets",
    heading: "Medical therapy",
    items: [
      "Drugs can improve liver tests and symptoms, but **none has been shown to change outcomes**.",
      "Ursodeoxycholic acid improves laboratory values without changing mortality or transplant rates, and the module does not recommend it.",
      "Glucocorticoids give **no benefit**.",
      "Antibiotics improve laboratory values without slowing the disease.",
    ],
  }, SCORE),
  sourced({
    id: "block-psc-udca",
    type: "prose",
    heading: "Board answer versus current practice: ursodeoxycholic acid",
    text: "The three sources answer differently and each is describing something real. SCORE says ursodeoxycholic acid **is not recommended**, because it improves liver tests without changing survival or transplant. Fiser keys it as relieving symptoms and improving liver enzymes. The 2022 AASLD guidance reversed its earlier recommendation against the drug: a moderate dose of **13 to 23 mg/kg/day** may be considered for a patient with a persistently raised alkaline phosphatase, and continued only if the alkaline phosphatase falls meaningfully or symptoms improve after **12 months**. What everyone agrees on is the high dose — **28 to 30 mg/kg/day** caused harm in trial and should not be prescribed. On an exam, \"no medical therapy changes the natural history\" is the safe answer, and high-dose ursodiol is the wrong one.",
  }, AASLD),
  sourced({
    id: "block-psc-transplant",
    type: "bullets",
    heading: "After transplant",
    items: [
      "Complications are rejection, biliary stricture, biliary leak, and the effects of immunosuppression.",
      "Five-year survival reaches **85 percent**.",
      "The disease **recurs** in up to **14 to 20 percent**, and a third of those need retransplantation.",
    ],
  }, SCORE),
  sourced({
    id: "block-psc-surveillance",
    type: "table",
    heading: "Board answer versus current practice: surveillance",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Cholangiocarcinoma", "Fiser: MRCP and ultrasound every **6 months** with an annual CA 19-9; SCORE: ultrasound or MRI every 6 to 12 months with CA 19-9", "MRI with MRCP, with or without CA 19-9, every **6 to 12 months**"],
      ["Gallbladder", "SCORE: cholecystectomy for a gallbladder mass", "Cholecystectomy for a polyp of **8 mm** or more, given the high rate of malignancy in PSC"],
      ["Colon", "SCORE: colonoscopy every **1 to 2 years** from diagnosis", "With IBD, high-definition colonoscopy with biopsies every **1 to 2 years**; several gastroenterology societies scope annually"],
      ["Diagnosis", "SCORE calls **ERCP** the test of choice", "**MRCP** first, with ERCP for brushings and therapy"],
    ],
  }, AASLD),
  references("block-psc-references", [SCORE, FISER, AASLD]),
];

export const primarySclerosingCholangitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000003125",
  versionId: "00000000-0000-4000-8000-000000003135",
  slug: "primary-sclerosing-cholangitis",
  title: "Primary Sclerosing Cholangitis",
  aliases: ["PSC", "sclerosing cholangitis", "beaded bile ducts", "dominant stricture", "IgG4-related sclerosing cholangitis", "IgG4 cholangitis", "secondary sclerosing cholangitis", "ursodeoxycholic acid", "ursodiol", "UDCA", "cholangiocarcinoma surveillance"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: ["biliary", "psc", "cholangiocarcinoma-risk", "transplant", "inflammatory-bowel-disease", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, AASLD],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
