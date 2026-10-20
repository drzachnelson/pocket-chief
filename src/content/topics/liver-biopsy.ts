import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_LIVER_SOURCE as FISER,
  LIVER_BIOPSY_OE_SOURCE as OE,
  SCORE_HEPATIC_BIOPSY_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-lb-summary",
    type: "summary",
    heading: "At a glance",
    text: "Liver biopsy takes tissue to make a diagnosis, grade inflammation and stage fibrosis, or guide treatment. Noninvasive tests have taken over many of those jobs, and imaging now diagnoses most HCC. The route follows one principle: a percutaneous needle crosses **Glisson's capsule**, so bleeding can run into the peritoneum, while a transjugular needle works from inside a hepatic vein, so bleeding drains back into the venous system. That is why coagulopathy and ascites point to the transjugular route. The two rules surgeons are tested on: do not biopsy a resectable malignancy, and never biopsy a hemangioma.",
  }, OE),
  sourcedUnits({
    id: "block-lb-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "Three purposes: establish a diagnosis, grade and stage inflammation and fibrosis, and guide management.",
      "Indeterminate focal lesions when multiphase imaging is inconclusive; staging chronic disease such as viral hepatitis, MASLD, or autoimmune hepatitis; storage disease (Wilson disease, hemochromatosis); allograft dysfunction after transplant; acute liver failure of unclear cause; and confirming malignancy before systemic or palliative therapy.",
      "In suspected HCC, biopsy only a lesion that **does not meet imaging criteria**, a patient not at high risk, or when confirmation would change management. A LI-RADS 5 lesion in a high-risk patient is HCC without a biopsy.",
      "Characteristic CT findings with an elevated AFP make the diagnosis of HCC.",
    ],
  }, [[OE], [OE], [OE], [FISER]]),
  sourcedUnits({
    id: "block-lb-dont",
    type: "warning",
    tone: "danger",
    heading: "Two lesions you do not needle",
    text: "**Resectable malignancy**: a suspected resectable HCC, colorectal metastasis, or intrahepatic cholangiocarcinoma goes to multidisciplinary review and resection without a biopsy, which risks needle-track seeding, spillage, bleeding from a vascular tumor, and delay. Refer a potential transplant candidate to a transplant center before any biopsy. **Hemangioma**: never biopsy a suspected hemangioma or other vascular lesion, because of uncontrolled hemorrhage; needle one only with a cuff of normal liver between capsule and lesion.",
  }, [[OE, FISER]]),
  sourcedUnits({
    id: "block-lb-intraop",
    type: "bullets",
    heading: "↳ A lesion found at operation",
    items: [
      "During resection of a GI cancer, biopsy a poorly circumscribed, firm, irregular lesion with a rough contour that has none of the features of a hemangioma, simple cyst, echinococcal cyst, or highly vascular lesion.",
      "A large heterogeneous lesion may need an **incisional** biopsy to get enough tissue.",
    ],
  }, [[SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-lb-contra",
    type: "bullets",
    heading: "Contraindications",
    items: [
      "**Absolute**: a patient who cannot cooperate or hold their breath, a suspected vascular lesion such as hemangioma, and no safe percutaneous window.",
      "**Relative**: ascites, severe coagulopathy, morbid obesity, extrahepatic biliary obstruction (bile peritonitis), suspected echinococcal cyst, and amyloidosis.",
      "Stop aspirin about 7 days before and shorter-acting antiplatelet agents about 72 hours before; plan anticoagulant interruption with the prescriber.",
      "Many centers still go percutaneous only with platelets over 60,000/µL and INR of 1.4 or less.",
      "If severe thrombocytopenia is to be corrected before an elective biopsy, a thrombopoietin receptor agonist (avatrombopag for 5 days or lusutrombopag for 7) is an alternative to platelet transfusion; the count peaks 10 to 14 days after starting.",
    ],
  }, [[OE], [OE], [OE], [OE], [OE]]),
  sourcedUnits({
    id: "block-lb-societies",
    type: "table",
    heading: "↳ Coagulation thresholds by society",
    columns: ["Society", "Platelets", "INR"],
    rows: [
      ["AASLD 2021", "No routine testing or prophylactic transfusion", "No fixed INR cutoff; assess the individual"],
      ["AGA 2021", "Suggests against routine platelet testing or transfusion in stable cirrhosis", "Suggests against routine INR testing or plasma"],
      ["EASL 2022", "Consider correcting at 20,000 to 50,000/µL if local hemostasis is impossible; correct under 20,000/µL", "Do not correct"],
      ["BSG 2020", "Transvenous route under 50,000/µL", "Transvenous route if INR is over 1.4; percutaneous lesional biopsy if under 2.0"],
      ["SIR 2020", "Transfuse under 20,000/µL for low-risk or transjugular biopsy, under 50,000/µL for high-risk or percutaneous", "Correct to 2.0 to 3.0 or less for low risk, 1.5 to 1.8 for high risk"],
    ],
  }, [[OE], [OE], [OE], [OE], [OE]]),
  sourcedUnits({
    id: "block-lb-routes",
    type: "table",
    heading: "Choosing the route",
    columns: ["Route", "Best for", "Coagulopathy or ascites", "Measures HVPG", "Key risk"],
    rows: [
      ["Percutaneous (ultrasound or CT)", "Diffuse disease or a focal lesion with a safe window and acceptable hemostasis", "Relative contraindication", "No", "Hemoperitoneum, subcapsular hematoma, pneumothorax"],
      ["Transjugular", "Coagulopathy, ascites, obesity, a small cirrhotic liver, or a failed percutaneous attempt", "Preferred", "Yes", "Arrhythmia (under 0.5%), neck hematoma, rare capsular perforation"],
      ["EUS-guided", "When varices or portal pressure need assessment at the same session", "Selected patients", "Through the portal pressure gradient", "Bleeding; needs endoscopic expertise"],
      ["Laparoscopic or open", "Staging or a concurrent operation, or a failed less invasive route", "Handled by direct hemostasis", "Not measured", "Trocar or visceral injury, anesthesia"],
    ],
  }, [[OE], [OE], [OE], [OE, SCORE]]),
  sourcedUnits({
    id: "block-lb-percutaneous",
    type: "sequence",
    heading: "Percutaneous biopsy",
    steps: [
      { title: "1. Position", detail: "Supine, with the right hand under the head to open the intercostal spaces." },
      { title: "2. Find the target", detail: "Identify the lesion or window with percussion and real-time ultrasound; ultrasound guidance reduces major complications against a blind technique and is the standard of care." },
      { title: "3. Anesthetize over the rib", detail: "Inject lidocaine over the **upper border** of the rib to avoid the neurovascular bundle that runs under the rib above." },
      { title: "4. Pass the needle", detail: "Make a small skin nick and advance the core or Tru-Cut needle into the target under ultrasound guidance." },
      { title: "5. Take the core on breath-hold", detail: "Fire while the patient holds their breath to limit diaphragmatic excursion and pleural injury. A coaxial system takes several cores through one capsular puncture, lowering bleeding and seeding." },
      { title: "6. Recover and watch", detail: "Lie the patient right side down for about 2 hours to tamponade the site; check vitals every 15 minutes for the first hour, every 30 for the second, then hourly, and observe at least 2 to 6 hours." },
    ],
  }, [[SCORE, OE], [SCORE, OE], [SCORE, OE], [SCORE], [SCORE, OE], [OE]]),
  sourcedUnits({
    id: "block-lb-transjugular",
    type: "bullets",
    heading: "Transjugular biopsy",
    items: [
      "Right internal jugular access, then through the SVC, right atrium, and IVC into a hepatic vein; the needle passes through the vein wall into liver under fluoroscopy.",
      "**No capsular puncture**, and it **measures HVPG** in the same sitting.",
      "Diagnostic tissue in about 81 to 97%, though cores are smaller and more fragmented than percutaneous ones.",
      "SIR classes it as a low-risk procedure, with major bleeding under 1.5%; arrhythmia is now under 0.5%.",
    ],
  }, [[OE], [OE], [OE], [OE]]),
  sourcedUnits({
    id: "block-lb-operative",
    type: "bullets",
    heading: "Laparoscopic and open biopsy",
    items: [
      "**Laparoscopic**: a camera port plus one or two working ports, usually subcostal and epigastric; biopsy with a core or Tru-Cut needle once the lesion is exposed. Intraoperative ultrasound localizes deep lesions.",
      "Hard laparoscopic targets: dome lesions near the diaphragm, pleura, lung, heart, or spine; small lesions beside large vessels or ducts, especially the hepatic veins; and small caudate lesions.",
      "**Open**: right subcostal or upper midline incision with a fixed retractor; take down the round and falciform ligaments, and the triangular and coronary ligaments if needed; biopsy by needle or wedge.",
      "Open biopsy adds infection (subphrenic abscess), diaphragm or organ injury, more pain, and a longer stay.",
    ],
  }, [[SCORE, OE], [SCORE], [SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-lb-results",
    type: "bullets",
    heading: "Reading the specimen",
    items: [
      "An adequate core is at least **15 mm with 6 to 11 complete portal tracts**; longer cores stage more accurately but need more passes.",
      "Fibrosis stages 0 to 2 are early, **F3** is bridging fibrosis, and **F4** is cirrhosis, with regenerative nodules inside fibrous septa.",
      "HVPG at transjugular biopsy: normal 1 to 5 mmHg, portal hypertension over 5, clinically significant at 10 or more, variceal bleeding risk over 12, poor outcomes over 20. The details are in [[Cirrhosis and Portal Hypertension]].",
      "Biopsy sensitivity for HCC is 70 to 93%, about 60% under 2 cm, so a negative biopsy does not exclude HCC and can be repeated.",
      "Budd-Chiari biopsy shows sinusoidal dilatation and centrilobular congestion.",
    ],
  }, [[OE], [OE], [OE], [OE], [FISER]]),
  sourcedUnits({
    id: "block-lb-complications",
    type: "table",
    heading: "Complications",
    columns: ["Complication", "Clue", "Management"],
    rows: [
      ["Pain", "The commonest minor event, in the right upper quadrant or right shoulder; pain in the first hour is the strongest predictor of a major complication", "Analgesia, with a low threshold for blood count and ultrasound"],
      ["Hemorrhage", "Tachycardia, hypotension, worsening RUQ pain, falling hemoglobin, rising drain output", "Resuscitate and reverse coagulopathy; transcatheter arterial embolization for active extravasation; packing, Pringle, and suture ligation for refractory instability"],
      ["Hemobilia", "Quincke triad of upper GI bleeding, biliary pain, and jaundice, classically about 5 days later; the least common hemorrhagic complication", "Selective transcatheter hepatic artery embolization"],
      ["Bile leak", "Nausea, fever, RUQ pain, jaundice, bilious drain output; commoner with extrahepatic obstruction", "Observe a small asymptomatic leak, drain a larger one, ERCP with sphincterotomy for a persistent one"],
      ["Pneumothorax", "The commonest organ injury", "Oxygen and serial films if small; tube or pigtail if large or symptomatic"],
      ["Bacteremia", "Transient in about 6 to 14%, usually harmless", "No routine prophylactic antibiotics, except caution with biliary obstruction"],
    ],
  }, [[OE, SCORE], [OE, SCORE], [OE], [SCORE, OE], [SCORE, OE], [OE, SCORE]]),
  sourcedUnits({
    id: "block-lb-rates",
    type: "bullets",
    heading: "↳ How often, and when",
    items: [
      "Major complications run about 24 per 1,000 and minor about 90 per 1,000; about half of severe events are bleeding.",
      "Mortality is about **0.01%** (1 in 10,000), almost always hemorrhage in cirrhosis or malignancy.",
      "Most complications appear in the first **2 to 4 hours** and up to 90% within 24 hours, but hemobilia and abscess can come days later.",
    ],
  }, [[OE], [OE], [OE]]),
  sourcedUnits({
    id: "block-lb-bleeding",
    type: "bullets",
    heading: "Bleeding at operation",
    items: [
      "Control bleeding from a biopsy site with cautery, argon beam, hepatorrhaphy with #1 chromic, or topical sealants.",
      "Major hemorrhage: pack, then perform a **Pringle maneuver** through the lesser sac with a Rummel tourniquet on the hepatoduodenal ligament.",
      "Bleeding that persists despite the Pringle comes from the **hepatic veins or retrohepatic IVC**.",
      "Mild bleeding or leak afterward is managed with correction of coagulopathy, resuscitation, and drainage; reoperate if the patient is unstable or it does not settle.",
    ],
  }, [[SCORE], [SCORE, OE], [OE, FISER], [SCORE]]),
  sourcedUnits({
    id: "block-lb-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Coagulation cutoffs", "INR under 1.5 and platelets over 50,000/µL", "AGA and AASLD set no fixed cutoff and advise against routine testing and prophylactic transfusion in stable cirrhosis; where anything predicts bleeding it is INR more than platelets"],
      ["Needle-track seeding", "About 1% for HCC and up to 19% for colorectal metastases", "0.62% across 13,959 HCC biopsies, falling further with coaxial needles: real but overstated"],
      ["Mortality", "1 in 10,000 to 12,000", "About 0.01% in pooled modern data, so the old figure holds"],
    ],
  }, [[OE], [OE], [OE]]),
  sourcedUnits({
    id: "block-lb-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Resectable HCC, colorectal metastasis, or cholangiocarcinoma: **resect, do not biopsy**.",
      "Hemangioma: never biopsy.",
      "Coagulopathy or ascites: **transjugular** biopsy, which also gives HVPG.",
      "Needle and local anesthetic go over the **top of the rib**.",
      "Quincke triad after biopsy is hemobilia: embolize the hepatic artery.",
      "Pringle fails: think hepatic vein or retrohepatic IVC.",
    ],
  }, [[OE], [OE, FISER], [OE], [OE, SCORE], [OE], [OE]]),
  references("block-lb-references", [SCORE, OE, FISER]),
];

export const liverBiopsyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004320",
  versionId: "00000000-0000-4000-8000-000000004321",
  slug: "liver-biopsy",
  title: "Liver Biopsy",
  aliases: ["hepatic biopsy", "percutaneous liver biopsy", "transjugular liver biopsy", "TJLB", "EUS-guided liver biopsy", "laparoscopic liver biopsy", "wedge liver biopsy", "needle-track seeding", "METAVIR"],
  scoreNodeId: "liver-procedures",
  scoreCategory: "SCORE · Liver · Operations & Procedures",
  tags: ["liver", "procedures", "biopsy", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [OE, FISER],
  blocks,
  reviewedAt: "2026-10-19T00:00:00.000Z",
});
