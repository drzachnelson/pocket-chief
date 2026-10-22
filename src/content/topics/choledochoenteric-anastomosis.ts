import { buildTopic, references, sourced } from "@/content/authoring";
import {
  FISER_BILIARY_SOURCE as FISER,
  SCORE_BENIGN_BILIARY_OBSTRUCTION_SOURCE as SCORE_BBO,
  SCORE_CHOLEDOCHOENTERIC_ANASTOMOSIS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-cea-summary",
    type: "summary",
    heading: "At a glance",
    text: "Most bile duct injuries, and many benign strictures, end in a **biliary-enteric anastomosis**, and the default is a **Roux-en-Y hepaticojejunostomy**. Three things decide whether it lasts: **no tension, mucosa to mucosa, and a living duct**. A duct dissected too far, or one whose right hepatic artery was injured with it, strictures; the answer to the second is to extend the anastomosis onto the left hepatic duct.",
  }, SCORE),
  sourced({
    id: "block-cea-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "**Iatrogenic bile duct injury**, 80 percent of which occur during cholecystectomy.",
      "Repair of a **traumatic** bile duct injury.",
      "Part of a **planned hepatobiliary** operation.",
    ],
  }, SCORE),
  sourced({
    id: "block-cea-benign-indications",
    type: "bullets",
    heading: "Benign disease that ends in an anastomosis",
    items: [
      "Ischemic and chronic pancreatitis strictures, where **choledochojejunostomy** is the best long-term solution.",
      "Mirizzi syndrome with a strictured common hepatic duct.",
      "Primary duct stones that keep recurring, which need a drainage procedure.",
    ],
  }, FISER),
  sourced({
    id: "block-cea-choice",
    type: "table",
    heading: "Choosing the reconstruction",
    columns: ["Option", "When it fits", "Trade-off"],
    rows: [
      ["Primary repair over a T-tube", "**Non-thermal** injury under 50 percent of the circumference", "Not for cautery injuries or larger defects"],
      ["Duct-to-duct repair", "Defect **under 1 cm**, below the hilum and bifurcation, mobilized without tension", "T-tube brought out through a separate vertical choledochotomy"],
      ["Choledochoduodenostomy", "**Distal** injury that a Kocher maneuver brings to the duodenum without tension", "Keeps endoscopic access, but leaks more than a Roux limb"],
      ["Roux-en-Y hepaticojejunostomy", "The **preferred** repair for most injuries, including at or near the bifurcation", "Excludes later endoscopic access to the ducts"],
    ],
  }, SCORE),
  sourced({
    id: "block-cea-anatomy",
    type: "bullets",
    heading: "Anatomy that decides patency",
    items: [
      "Up to **40 percent** of patients have biliary variants, most commonly the right posterior sectoral duct inserting into the left hepatic duct.",
      "The duct's arteries run at **3 and 9 o'clock**.",
      "Below the duodenal bulb the duct is fed by the posterosuperior pancreaticoduodenal and gastroduodenal arteries; above it, by right hepatic and cystic branches.",
      "More than **20 percent** of bile duct injuries carry an unrecognized vascular injury that leads to leak or late stricture after repair.",
      "Strasberg **E1 to E5** injuries typically need a biliary-enteric anastomosis.",
    ],
  }, SCORE),
  sourced({
    id: "block-cea-preop",
    type: "bullets",
    heading: "Before a delayed reconstruction",
    items: [
      "**Control infection** first: percutaneous drainage of bile collections, decompression if needed, and broad-spectrum antibiotics.",
      "Start with **ERCP** to define the injury and try to bridge it with a stent.",
      "If ERCP cannot show the proximal tree, **PTC** decompresses it, and a rendezvous can convert an external drain to an internal-external one.",
      "**MR or CT angiography** looks for the concomitant vascular injury that changes timing and approach.",
      "Then commit to a definitive plan — repeated dilation and stenting, or surgical reconstruction.",
    ],
  }, SCORE),
  sourced({
    id: "block-cea-steps",
    type: "sequence",
    heading: "Hepatico- or choledochojejunostomy",
    steps: [
      { title: "Dissect the porta", detail: "Follow drain tracts and old clips, and aspirate with a fine needle to tell bile duct from vessel." },
      { title: "Drop the hilar plate", detail: "Dissect in the avascular plane just anterior to the bifurcation, which also exposes the extrahepatic left hepatic duct." },
      { title: "Reach healthy duct", detail: "Trim back to duct that bleeds and is free of scar, minimizing devascularization." },
      { title: "Extend onto the left if the artery is gone", detail: "With a right hepatic artery injury, carry the opening onto the left hepatic duct — the **Hepp-Couinaud** approach — to lower the risk of late stricture." },
      { title: "Anastomose", detail: "End-to-side, or side-to-side when extended onto the left duct, **mucosa to mucosa** with fine absorbable monofilament, most often **5-0 PDS**." },
      { title: "Stent if planned", detail: "Pass any transhepatic drain across the anastomosis." },
      { title: "Complete the Roux", detail: "Jejunojejunostomy about **50 cm** downstream of the biliary anastomosis." },
    ],
  }, SCORE),
  sourced({
    id: "block-cea-principles",
    type: "warning",
    heading: "Three rules that decide whether it strictures",
    text: "A **tension-free**, **mucosa-to-mucosa** anastomosis on a duct with an **intact blood supply**. Patients with a concomitant vascular injury stricture more often and may need further procedures; recognizing the injury early and referring immediately to an experienced center is what produces the high success rates.",
  }, SCORE),
  sourced({
    id: "block-cea-cdd",
    type: "bullets",
    heading: "Choledochoduodenostomy for benign disease",
    items: [
      "For duct stones **ERCP cannot clear**, primary duct stones with a dilated duct, stones impacted at the ampulla, benign distal strictures, and Lemmel syndrome.",
      "Not for a **non-dilated** duct, recurrent pancreatitis, sclerosing cholangitis, or stones ERCP can remove.",
      "Make the choledochotomy about **2.5 cm** distal to the cystic duct and a slightly smaller duodenotomy, triangulated with three traction sutures.",
      "The blind segment of duct below a side-to-side anastomosis can collect food and debris — **sump syndrome**, with cholangitis or pancreatitis.",
    ],
  }, SCORE_BBO),
  sourced({
    id: "block-cea-procedure-risk",
    type: "table",
    heading: "Risks of getting there",
    columns: ["Procedure", "Overall complications", "Specific risks"],
    rows: [
      ["ERCP", "**10 percent**", "Pancreatitis 5.4 percent, hemorrhage 2 percent, mortality 0.4 percent"],
      ["PTC", "**12 percent**", "SIRS 4.2 percent, major bleeding 3.6 percent, pulmonary 2.4 percent, and higher still with non-dilated ducts"],
    ],
  }, SCORE),
  sourced({
    id: "block-cea-complications",
    type: "bullets",
    heading: "After hepaticojejunostomy",
    items: [
      "Thirty-day complications run **25 to 40 percent**: wound infection 8 percent, cholangitis 6 percent, anastomotic leak 5 percent, and abscess or biloma 3 percent.",
      "Mortality is **1.7 to 1.9 percent**, and the typical stay is about **9 days**.",
      "**Bile leak** is the most common early complication, managed with percutaneous abdominal drainage and transhepatic catheters, and reoperation only if that fails.",
      "A late **stricture** presents with direct hyperbilirubinemia, cholangitis, or a liver abscess.",
      "Because the Roux limb **excludes endoscopic access**, a stricture is treated with repeated percutaneous decompression, balloon dilation, and stenting.",
      "Revision, occasionally including major hepatectomy, follows when percutaneous treatment fails, and is more likely after a vascular injury.",
    ],
  }, SCORE),
  sourced({
    id: "block-cea-fiser",
    type: "bullets",
    heading: "On the exam",
    items: [
      "A complete transection or major injury needs a **hepaticojejunostomy or choledochojejunostomy**.",
      "Anastomotic leaks after hepaticojejunostomy or transplant are usually handled with **percutaneous drainage** of the collection and a temporary stent, and they heal.",
      "Bile cultures are most often positive with **postoperative strictures**, usually E. coli and often polymicrobial.",
    ],
  }, FISER),
  sourced({
    id: "block-cea-outcomes",
    type: "bullets",
    heading: "Outcomes",
    items: [
      "More than **90 percent** of patients stay free of jaundice and cholangitis after reconstruction.",
      "Surgical reconstruction has better long-term patency than dilation and stenting.",
      "Managing bile duct injuries cost about **$600,000 per million people per year** in a Swedish population.",
    ],
  }, SCORE),
  references("block-cea-references", [SCORE, SCORE_BBO, FISER]),
];

export const choledochoentericAnastomosisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000003123",
  versionId: "00000000-0000-4000-8000-000000003133",
  slug: "choledochoenteric-anastomosis",
  title: "Choledochoenteric Anastomosis",
  aliases: ["biliary-enteric anastomosis", "bilioenteric anastomosis", "hepaticojejunostomy", "Roux-en-Y hepaticojejunostomy", "choledochojejunostomy", "choledochoduodenostomy", "hepaticoduodenostomy", "Hepp-Couinaud", "sump syndrome", "biliary bypass"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: ["biliary", "operative-technique", "reconstruction", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_BBO, FISER],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
