import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ASGE_CHOLEDOCHOLITHIASIS_SOURCE as ASGE,
  CHOLEDOCHOLITHIASIS_CHOLANGITIS_OE_SOURCE as OE,
  CHOLEDOCHOLITHIASIS_SOURCE as ORIGINAL,
  FISER_BILIARY_SOURCE as FISER,
  SCORE_BENIGN_BILIARY_OBSTRUCTION_SOURCE as SCORE,
  SCORE_CBD_EXPLORATION_SOURCE as SCORE_CBDE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

/**
 * Revised in place on 2026-10-23 from the Call Problems I packet
 * (~/Desktop/Pocket Chief/Inbox/2026-10-22-choledocholithiasis-and-cholangitis/1-packet.md: S1 SCORE Benign Biliary
 * Obstruction, S2 SCORE Common Bile Duct Exploration and Choledochoscopy, S3 Fiser chapter 32), checked against the
 * folder's OpenEvidence document. The id, version id and slug are unchanged, so bookmarks survive. The packet blocks
 * go through `sourced()`; the launch topic's route table, transcystic flow, choledochoscopy sequence, warning and
 * pearls are kept as they were approved, still cited to the original August packet. Cholangitis aliases and the full
 * Tokyo 2018 tables stay with Benign Biliary Obstruction, which this topic links to.
 */
const cited = (id: string, text: string) => ({ id, text, citationIds: [ORIGINAL], status: "cited" as const });
const citedUnits = (prefix: string, units: string[]) => units.map((text, index) => cited(`${prefix}-${index + 1}`, text));

const comparisonBlock: TopicBlock = {
    id: "block-comparison",
    type: "table",
    heading: "Choose the route",
    columns: ["Feature", "Transcystic exploration", "Choledochotomy", "ERCP"],
    rows: [
      ["Primary route", "Cystic duct access", "Direct longitudinal CBD incision", "Transampullary endoscopic retrieval"],
      ["Favorable burden", "Small (<6 mm), few (<6), distal", "Large (>1 cm), numerous (>8), proximal", "Variable burden"],
      ["Anatomy", "Pliable, accessible cystic duct", "Dilated CBD (>8–10 mm)", "Patent ampulla"],
      ["Closure / drainage", "Clip cystic duct remnant", "Primary closure, stent, or T-tube", "Sphincterotomy"],
      ["Reported clearance", "Up to 95% with choledochoscopy", "High for complex burden", "Approximately 95% overall"],
    ],
    claims: citedUnits("claim-table", [
      "Primary route — Cystic duct access — Direct longitudinal CBD incision — Transampullary endoscopic retrieval",
      "Favorable burden — Small (<6 mm), few (<6), distal — Large (>1 cm), numerous (>8), proximal — Variable burden",
      "Anatomy — Pliable, accessible cystic duct — Dilated CBD (>8–10 mm) — Patent ampulla",
      "Closure / drainage — Clip cystic duct remnant — Primary closure, stent, or T-tube — Sphincterotomy",
      "Reported clearance — Up to 95% with choledochoscopy — High for complex burden — Approximately 95% overall",
    ]),
  };
const flowBlock: TopicBlock = {
    id: "block-flow",
    type: "flow",
    heading: "Transcystic decision flow",
    nodes: [
      { id: "ioc", label: "Stone on intraoperative cholangiogram" },
      { id: "favorable", label: "<6 stones · <6 mm · distal · pliable cystic duct", tone: "good" },
      { id: "unfavorable", label: ">8 stones · >1 cm · proximal · fragile/tortuous duct", tone: "caution" },
      { id: "ltcbde", label: "Transcystic choledochoscopy + clearance", tone: "good" },
      { id: "alternative", label: "Choledochotomy or intra/post-op ERCP", tone: "caution" },
    ],
    edges: [
      { from: "ioc", to: "favorable", label: "favorable" },
      { from: "ioc", to: "unfavorable", label: "relative contraindications" },
      { from: "favorable", to: "ltcbde" },
      { from: "unfavorable", to: "alternative" },
    ],
    claims: citedUnits("claim-flow", [
      "Stone on intraoperative cholangiogram",
      "<6 stones · <6 mm · distal · pliable cystic duct",
      ">8 stones · >1 cm · proximal · fragile/tortuous duct",
      "Transcystic choledochoscopy + clearance",
      "Choledochotomy or intra/post-op ERCP",
      "favorable",
      "relative contraindications",
    ]),
  };
const sequenceBlock: TopicBlock = {
    id: "block-sequence",
    type: "sequence",
    heading: "Choledochoscopy sequence",
    steps: [
      { title: "Define the anatomy", detail: "Use diagnostic IOC to confirm stone size, number, and position relative to the cystic duct insertion." },
      { title: "Dilate the cystic duct", detail: "Dilate sequentially with a balloon or bougie to accept the choledochoscope." },
      { title: "Prepare the duct", detail: "Administer IV glucagon and flush with warm saline." },
      { title: "Inspect directly", detail: "Advance the flexible choledochoscope and visualize the mucosa and stones." },
      { title: "Extract", detail: "Use a wire basket or Fogarty balloon under direct vision." },
      { title: "Document completion", detail: "Perform completion cholangiography or choledochoscopy to document clearance." },
    ],
    claims: citedUnits("claim-sequence", [
      "Define the anatomy: Use diagnostic IOC to confirm stone size, number, and position relative to the cystic duct insertion.",
      "Dilate the cystic duct: Dilate sequentially with a balloon or bougie to accept the choledochoscope.",
      "Prepare the duct: Administer IV glucagon and flush with warm saline.",
      "Inspect directly: Advance the flexible choledochoscope and visualize the mucosa and stones.",
      "Extract: Use a wire basket or Fogarty balloon under direct vision.",
      "Document completion: Perform completion cholangiography or choledochoscopy to document clearance.",
    ]),
  };
const warningBlock: TopicBlock = {
    id: "block-warning",
    type: "warning",
    heading: "Avoid forcing the transcystic route",
    text: "Relative contraindications in the supplied notes include more than eight stones, stones larger than 1 cm, common hepatic/intrahepatic stones, and a small, friable, or tortuous cystic duct.",
    claims: [cited("claim-warning", "Relative contraindications in the supplied notes include more than eight stones, stones larger than 1 cm, common hepatic/intrahepatic stones, and a small, friable, or tortuous cystic duct.")],
  };
const pearlsBlock: TopicBlock = {
    id: "block-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Age alone is not a contraindication to operative duct exploration.",
      "Repositioning may help move proximal stones distally for retrieval.",
      "Warm saline and glucagon are described as adjuncts for flushing small stones.",
      "Transcystic exploration avoids choledochotomy and T-tube morbidity when it succeeds.",
    ],
    claims: [
      cited("claim-pearl-age", "Age alone is not a contraindication to operative duct exploration."),
      cited("claim-pearl-position", "Repositioning may help move proximal stones distally for retrieval."),
      cited("claim-pearl-adjunct", "Warm saline and glucagon are described as adjuncts for flushing small stones."),
      cited("claim-pearl-morbidity", "Transcystic exploration avoids choledochotomy and T-tube morbidity when it succeeds."),
    ],
  };
const packetBlocks: TopicBlock[] = [
  sourced({
    id: "block-cd-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Choledocholithiasis \u2014 stones in the common bile duct, usually migrated from the gallbladder (secondary) and occasionally formed de novo in the duct (primary) \u2014 obstructs bile flow, and when the obstructed bile becomes infected the result is acute (ascending) cholangitis, an infection of the biliary tree in which complete obstruction raises biliary pressure and drives bacteremia. The presentation ranges from obstructive jaundice with right upper quadrant pain to the Charcot triad of fever, right upper quadrant pain, and jaundice, and to the Reynolds pentad \u2014 the triad plus hypotension and altered mental status \u2014 in severe disease. Ultrasound is the initial imaging study, MRCP defines ductal anatomy and stones when the picture is unclear, and treatment is antibiotics and resuscitation followed by biliary drainage: ERCP first (successful in over 90%), percutaneous transhepatic drainage second, and surgical duct exploration as the last resort, with cholecystectomy after the acute illness to prevent recurrence.",
  }, SCORE),

  sourced({
    id: "block-cd-anatomy-organisms-presentati",
    type: "bullets",
    heading: "Anatomy, organisms, and presentation",
    items: [
      "The common bile duct is formed by the union of the common hepatic and cystic ducts, joins the pancreatic duct, and empties through the sphincter of Oddi at the ampulla of Vater; biliary anatomic variants occur in up to 30% of patients.",
      "The extrahepatic bile duct is supplied only by arteries, running at the 3 o'clock and 9 o'clock positions of the duct \u2014 the supraduodenal duct and common hepatic duct from the right hepatic and cystic arteries, and the distal duct from the posterosuperior pancreaticoduodenal and gastroduodenal arteries.",
      "The organisms of cholangitis are gram-negative and anaerobic, led by Escherichia coli, with Klebsiella, Enterobacter, Pseudomonas, and Citrobacter also common.",
      "Causes of obstruction and cholangitis beyond duct stones include obstructed indwelling stents and catheters, post-ERCP infection, anastomotic strictures, Mirizzi syndrome, primary sclerosing cholangitis, pancreatitis-related distal strictures, parasites such as Clonorchis sinensis and Ascaris, choledochal cysts, and Lemmel syndrome.",
      "Jaundice becomes visible at the frenulum of the tongue first, then in the sclera at a bilirubin of about 2.5 mg/dL, and finally in the skin above 5 mg/dL.",
      "Obstruction produces dark urine and acholic stools, and the laboratory pattern is cholestatic: bilirubin and alkaline phosphatase rise from cholestasis while transaminases reflect hepatocellular injury from infection and inflammation.",
      "Ultrasound is highly sensitive for common bile duct dilation but can be blocked by bowel gas, while CT gives better anatomic detail for masses and extrinsic causes yet visualizes gallstones poorly because stones are isodense to bile.",
      "MRCP gives excellent noninvasive definition of the whole biliary tree and pancreas with high sensitivity for duct stones, and it is used selectively \u2014 for strictures, complex pathology, possible malignancy, or an unclear picture of choledocholithiasis \u2014 rather than routinely.",
      "Blood cultures are necessary in any patient presenting with signs of sepsis.",
    ],
  }, SCORE),

  sourced({
    id: "block-cd-asgesages-risk-stratificatio",
    type: "table",
    heading: "ASGE-SAGES risk stratification for choledocholithiasis",
    columns: ["Risk category", "How the category is assigned", "Recommended route"],
    rows: [
      ["Low probability", "The patient has none of the listed risk factors.", "No further duct evaluation is required before cholecystectomy."],
      ["Intermediate probability", "The patient has exactly one risk factor, such as a duct over 6 mm, a bilirubin over 1.7, clinical cholangitis, or a stone seen on ultrasound.", "Intraoperative cholangiography or preoperative MRCP is recommended, with the direct-to-surgery approach and cholangiography preferred."],
      ["High probability", "The patient has two or more of the listed risk factors.", "Preoperative ERCP or direct-to-surgery with cholangiography plus or minus laparoscopic duct exploration is recommended, with the surgical route preferred when expertise allows."],
    ],
  }, SCORE_CBDE),

  sourced({
    id: "block-cd-acute-cholangitis-resuscitat",
    type: "flow",
    heading: "Acute cholangitis: resuscitate, grade, drain",
    nodes: [
      { id: "start", label: "A patient presents with fever, right upper quadrant pain, and jaundice, or with the Reynolds pentad of added hypotension and altered mental status." },
      { id: "resuscitate", label: "Blood cultures are drawn, intravenous fluids are given, and antibiotics covering gram-negative, gram-positive (including Enterococcus), and anaerobic organisms are started; antifungal therapy is added for patients with indwelling biliary catheters or immune compromise." },
      { id: "severe", label: "A patient with severe cholangitis and end-organ dysfunction (Tokyo Guidelines grade III) goes straight to urgent biliary drainage.", tone: "caution" },
      { id: "observe", label: "A patient without organ failure (Tokyo Guidelines grade I or II) is resuscitated, given parenteral antibiotics, and observed for improvement over 12 to 24 hours." },
      { id: "ercp", label: "ERCP is the first drainage procedure attempted and succeeds more than 90% of the time, at a complication rate of about 10% including pancreatitis, bleeding, and duodenal perforation." },
      { id: "ptc", label: "Percutaneous transhepatic cholangiography with drain placement is the second option when ERCP cannot access the biliary tree, succeeding about 90% of the time.", tone: "caution" },
      { id: "surgery", label: "Laparoscopic or open common bile duct exploration is reserved for failure of all nonoperative options, because operative intervention carries a significant mortality rate." },
    ],
    edges: [
      { from: "start", to: "resuscitate", label: "Cultures, fluids, and antibiotics begin immediately on recognition." },
      { from: "resuscitate", to: "severe", label: "Organ dysfunction at presentation short-circuits observation." },
      { from: "resuscitate", to: "observe", label: "Patients without organ failure earn a defined window of medical therapy." },
      { from: "severe", to: "ercp", label: "Urgent drainage starts with ERCP." },
      { from: "observe", to: "ercp", label: "Failure to improve within 12 to 24 hours, or any deterioration, triggers drainage." },
      { from: "ercp", to: "ptc", label: "A failed or impossible ERCP moves drainage to the percutaneous route." },
      { from: "ptc", to: "surgery", label: "Only failure of both drainage routes leads to operative duct exploration." },
    ],
  }, SCORE),

  sourced({
    id: "block-cd-laparoscopic-common-bile-duc",
    type: "sequence",
    heading: "Laparoscopic common bile duct exploration",
    steps: [
      { title: "Cholangiogram", detail: "An intraoperative cholangiogram is performed first, ideally with a catheter that accepts a guidewire, to confirm the stone and the anatomy." },
      { title: "Flush and relax", detail: "The duct is flushed transcystically with saline and intravenous glucagon (1 to 2 mg) is given to relax the sphincter so small stones and debris can pass into the duodenum." },
      { title: "Transcystic retrieval", detail: "Through the cystic duct, a basket or a flexible choledochoscope passed over a wire retrieves the stones, with gentle balloon dilation of the cystic duct when it is too small for the scope." },
      { title: "Choledochotomy", detail: "When the transcystic route fails or stones are large, multiple, impacted, or proximal, a distal vertical supraduodenal choledochotomy is made, avoiding the 3 and 9 o'clock ductal blood supply; it is avoided entirely when the duct is small, under 7 mm." },
      { title: "Completion study", detail: "A completion cholangiogram confirms that all stones have been extracted before closure." },
      { title: "Closure", detail: "The choledochotomy is closed primarily or over a T-tube of at least 14F with absorbable monofilament suture, with larger ducts closed transversely to avoid stricture." },
    ],
  }, SCORE_CBDE),

  sourced({
    id: "block-cd-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser's ABSITE Review keys the board facts of cholangitis: it is usually caused by obstruction from gallstones, the organisms are E. coli first and Klebsiella second, colovenous reflux driving systemic bacteremia occurs at biliary pressures above 200 mm Hg, mortality is 5% to 10%, and renal failure is the number one serious complication. Fiser's treatment sequence is fluid resuscitation and antibiotics, then emergent ERCP with sphincterotomy and stone extraction, with a percutaneous tube to decompress if ERCP fails, and tube change when cholangitis comes from an infected percutaneous tube. Fiser also keys the test characteristics used to hunt a duct stone \u2014 GGT has the highest sensitivity and alkaline phosphatase the highest specificity \u2014 and the post-bypass workaround: after Roux-en-Y gastric bypass, a duct stone is reached by percutaneous transhepatic extraction, double-balloon ERCP, or laparoscopic gastrostomy-assisted ERCP rather than standard ERCP. SCORE's Tokyo Guidelines framing agrees on the sequence but grades the urgency, as the flags record.",
  }, FISER),

  sourced({
    id: "block-cd-severe-cholangitis-is-draina",
    type: "warning",
    heading: "Severe cholangitis is a drainage emergency, and the gallbladder must still come out",
    text: "A capped percutaneous biliary drain in a patient who presents with obstructive symptoms or cholangitis should be opened and placed to gravity drainage as a first bedside move. The lethal error is delay: complete obstruction raises biliary pressure until bacteria enter the bloodstream, and the grade III patient with end-organ dysfunction needs urgent drainage, not a prolonged antibiotic trial. After the duct is cleared, the gallbladder remains the recurrence source \u2014 the Tokyo Guidelines recommend cholecystectomy once the acute illness has resolved, evidence favors operating within 6 weeks rather than later, and more recent studies support cholecystectomy during the initial hospitalization as safe with equal or better morbidity, mortality, conversion, and length of stay. When stones cannot be removed by ERCP, the surgical fallback is choledochoduodenostomy \u2014 indicated for primary stones in a dilated duct, stones impacted at the ampulla, benign distal strictures, and Lemmel syndrome, and avoided when the duct is not dilated or the stones are ERCP-removable.",
  }, SCORE),

];

export const choledoBlocks: TopicBlock[] = [
  ...packetBlocks.slice(0, 3),
  comparisonBlock,
  packetBlocks[3],
  sourced({
    id: "block-cd-tokyo",
    type: "prose",
    heading: "↳ Tokyo 2018 grade decides when to drain",
    text: "Grade III cholangitis, with dysfunction of any organ system, gets urgent biliary drainage once resuscitation is under way; grade II gets early drainage alongside antibiotics; grade I gets antibiotics and fluids, with drainage only if there is no improvement within 24 hours. The full Tokyo 2018 diagnostic criteria and grade definitions are tabled in [[Benign Biliary Obstruction]].",
  }, OE),
  packetBlocks[4],
  flowBlock,
  sequenceBlock,
  warningBlock,
  pearlsBlock,
  ...packetBlocks.slice(5),
  sourcedUnits({
    id: "block-cd-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Tokyo grading", "SCORE's Tokyo diagnostic and grading tables were images, so the packet teaches only the grade-linked management its text states", "The grade-to-drainage rules above come from the OpenEvidence document and match the Tokyo 2018 tables in Benign Biliary Obstruction"],
      ["ERCP timing in cholangitis", "Fiser: fluids and antibiotics, then emergent ERCP", "SCORE (Tokyo): a 12 to 24 hour trial of medical therapy for grade I or II without organ failure; urgent drainage for grade III, non-improvers and the deteriorating"],
      ["T-tube after choledochotomy", "SCORE Benign Biliary Obstruction: T-tube placement is a standard step", "SCORE Common Bile Duct Exploration: no benefit of routine T-tube drainage over primary closure, with longer operations and stays"],
      ["Cholecystectomy after cholangitis", "Tokyo: once the acute illness has resolved; one comparative study favors within 6 weeks over later", "More recent studies support cholecystectomy during the initial hospitalization; SCORE reports all three"],
      ["When ERCP fails", "Fiser: percutaneous transhepatic drainage", "Percutaneous drainage remains the backup; EUS-guided biliary drainage is third line, at high-volume centers only"],
      ["The Charcot triad", "Fiser: fever, jaundice and right upper quadrant pain as the hallmark", "The full triad appears in only 15% to 70%, so Tokyo 2018 diagnoses on inflammation, cholestasis and imaging instead"],
      ["Bilirubin as a duct-stone predictor", "SCORE (ASGE-SAGES): bilirubin over 1.7 counts as a risk factor", "ASGE 2019: bilirubin over 4 mg/dL with a dilated duct, or a visualized stone or cholangitis alone, defines high risk"],
      ["One stage or two", "Preoperative ERCP, then laparoscopic cholecystectomy", "Single-stage cholecystectomy with duct exploration is at least equivalent where expertise exists, with fewer procedures and a shorter stay"],
      ["Antibiotic duration", "Prolonged courses", "Tokyo 2018: a short course, as few as 4 to 7 days after drainage"],
    ],
  }, [[SCORE, OE], [FISER, SCORE], [SCORE, SCORE_CBDE], [SCORE], [FISER, OE], [FISER, OE], [SCORE_CBDE, ASGE, OE], [OE], [OE]]),

  references("block-cd-references", [SCORE, SCORE_CBDE, FISER, OE, ASGE, ORIGINAL]),
];

export const choledocholithiasisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000101",
  versionId: "00000000-0000-4000-8000-000000000103",
  slug: "choledocholithiasis",
  title: "Choledocholithiasis",
  aliases: ["CBD stones", "common bile duct stones", "duct exploration", "LTCBDE", "choledocholithiasis", "laparoscopic common bile duct exploration", "transcystic exploration", "choledochotomy", "ASGE risk stratification"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: ["biliary", "common-bile-duct", "choledocholithiasis", "cholangitis", "ercp", "cbd-exploration", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_CBDE, FISER, OE, ASGE, ORIGINAL],
  blocks: choledoBlocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
