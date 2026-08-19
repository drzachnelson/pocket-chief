import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_SPLENIC_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-splenectomy-summary",
    type: "summary",
    heading: "At a glance",
    text: "Splenectomy converts a bleeding solid organ into a controlled one, and the operation is built around two anatomic facts: the gastrosplenic ligament is the one attachment that is not avascular and must be actively ligated, and the pancreatic tail sits close enough to the hilum — within **2 cm** in roughly **85 percent** of patients — that hilar control is really pancreatic-tail avoidance. In the unstable or peritonitic patient this becomes an emergency: mobilize the spleen medially until it behaves like a midline organ, take the short gastrics on the splenic side to protect the stomach, then individually double-ligate the artery and vein. Splenorrhaphy and splenic salvage techniques still exist for the rare case — more often penetrating trauma already open on the table — where the spleen can be preserved instead of removed. Once the spleen is gone, the operation is not over: overwhelming postsplenectomy infection is a lifelong risk that starts with getting the vaccines right.",
  }, PACKET),
  sourced({
    id: "block-splenectomy-anatomy",
    type: "bullets",
    heading: "Surgical anatomy and critical relationships",
    items: [
      "The splenophrenic, splenorenal, and splenocolic ligaments are avascular reflections in the absence of portal hypertension; the splenic artery and vein travel within the splenorenal ligament.",
      "The gastrosplenic ligament is the exception — it carries the short gastric arteries along the greater curvature, and it is the one ligament that must be actively ligated during mobilization.",
      "The splenic artery branches in one of two patterns: a **distributed type** (roughly 70 percent) that branches far proximal to the hilum, and a **magistral type** (roughly 30 percent) that divides close to the hilum.",
      "The pancreatic tail abuts the splenic hilum — in contact or within **2 cm** — in roughly **85 percent** of individuals, making it the key structure at risk during hilar control.",
      "Accessory spleens are present in up to roughly **20 percent** of patients, most commonly at the **splenic hilum**, then the gastrosplenic and gastrocolic ligaments and greater omentum, the mesentery, and the presacral space; they matter most in elective hematologic splenectomy, where a missed accessory spleen causes disease relapse.",
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-indications",
    type: "bullets",
    heading: "Operative indications",
    items: [
      "Emergent splenectomy is indicated for hemodynamic instability or peritonitis.",
      "In the hemodynamically stable patient, nonoperative management is the default regardless of injury grade, and splenectomy is reserved for those who fail that pathway or who are unstable from the outset.",
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-sequence",
    type: "sequence",
    heading: "Emergent trauma splenectomy — operative sequence",
    steps: [
      { title: "Rapid control and exposure", detail: "Rapid midline laparotomy with evisceration and four-quadrant packing for resuscitation, plus nasogastric decompression." },
      { title: "Make the spleen a midline organ", detail: "Divide the avascular splenophrenic, splenorenal, and splenocolic attachments, then sweep the fingers anterior to the left kidney (anterior to Gerota fascia) and posterior to the pancreatic tail to deliver the spleen medially." },
      { title: "Ligate the short gastrics, then the hilum", detail: "Ligate the short gastric arteries staying close to the spleen to avoid gastric wall necrosis, then individually double-ligate the splenic artery and vein while protecting the pancreatic tail." },
      { title: "Inspect and decide on drainage", detail: "Inspect the bed, diaphragm, short-gastric line, and splenic flexure; drain only if pancreatic tail injury is suspected." },
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-hilar-warning",
    type: "warning",
    heading: "Avoid these two hilar mistakes",
    text: "Ligating the short gastric arteries too near the fundus rather than the spleen risks **gastric necrosis and perforation**. And because the pancreatic tail abuts the hilum in most patients, careless clamping or mass ligation of the pedicle risks **pancreatic tail injury** — the source of postoperative pancreatic fistula. Stay on the splenic side of the short gastrics and take the artery and vein individually, under direct vision, well clear of the tail.",
    tone: "danger",
  }, PACKET),
  sourced({
    id: "block-splenectomy-salvage",
    type: "bullets",
    heading: "Splenorrhaphy and splenic salvage techniques",
    items: [
      "Splenic salvage is reserved for the rare case where preservation is feasible — it is now rarely used in blunt trauma but is more common in penetrating injury that is already being surgically explored.",
      "Techniques include topical hemostatic agents, argon beam coagulation, pledgeted mattress sutures, a mesh wrap around the parenchyma, and partial splenic resection.",
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-complications",
    type: "table",
    heading: "Postoperative complications",
    columns: ["Complication", "Detail"],
    rows: [
      ["Pancreatic fistula or leak", "Suspect when drain amylase exceeds **3 times** the serum upper limit; treat with continued drainage, adding ERCP or stenting if the leak persists."],
      ["Gastric necrosis or perforation", "Follows short-gastric ligation taken too close to the gastric fundus rather than to the spleen."],
      ["Subphrenic abscess", "Managed with antibiotics plus percutaneous drainage."],
      ["Postsplenectomy thrombocytosis and leukocytosis", "Usually benign."],
      ["Splenoportal or portal vein thrombosis", "Splenectomy roughly **doubles** thrombotic risk; propagation into the portal vein or superior mesenteric vein warrants therapeutic anticoagulation."],
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-opsi-risk",
    type: "bullets",
    heading: "Overwhelming postsplenectomy infection: risk and pathogens",
    items: [
      "Lifetime OPSI risk is roughly **5 percent** (range 0.1 to 8.5 percent), with an annual incidence of about **0.23 to 0.42 percent** per year; mortality runs as high as **50 percent** (reported range 38 to 69 percent). Pooled series report a lower prevalence of about **3.2 percent** and mortality near **1.4 percent**, and trauma carries the lowest OPSI risk of any indication for splenectomy, at roughly **2.3 percent**.",
      "Risk is highest in young children, in the first **1 to 2 years** after splenectomy (though the risk persists for life), and in hematologic indications such as thalassemia, sickle cell disease, and Hodgkin lymphoma — not trauma.",
      "The causative organisms are encapsulated: **Streptococcus pneumoniae** accounts for **50 to 90 percent**, followed by **Haemophilus influenzae type b** and **Neisseria meningitidis**. Also consider **Capnocytophaga canimorsus** after a dog or cat bite, and **Babesia**.",
      "Presentation is a nonspecific viral-type prodrome that can progress within hours to fulminant shock, disseminated intravascular coagulation, and purpura fulminans. Any febrile asplenic patient receives **immediate empiric antibiotics**.",
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-vaccination",
    type: "table",
    heading: "Vaccination after splenectomy",
    columns: ["Scenario", "Timing"],
    rows: [
      ["Elective splenectomy", "Vaccinate **at least 14 days** before surgery, ideally **4 to 6 weeks** ahead, to allow an adequate antibody response."],
      ["Emergent or trauma splenectomy", "Classic teaching is to vaccinate at roughly **14 days** postoperatively, or at discharge, for the best antibody response."],
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-prophylaxis",
    type: "bullets",
    heading: "Vaccines and antibiotic prophylaxis",
    items: [
      "Required vaccines are pneumococcal, meningococcal (**MenACWY and MenB**), **Hib**, and annual inactivated influenza — the live attenuated intranasal influenza vaccine is contraindicated.",
      "Antibiotic prophylaxis is routine for asplenic children, and lifelong for any patient after a prior OPSI episode.",
      "WSES 2022 suggests against routine OPSI vaccination in patients managed nonoperatively (with or without angioembolization), favoring a tailored approach based on residual functional splenic mass, since splenic function is preserved when the spleen is not removed.",
    ],
  }, PACKET),
  sourced({
    id: "block-splenectomy-pneumococcal-board-vs-practice",
    type: "prose",
    heading: "Board answer versus current practice: pneumococcal vaccination",
    text: "The board-classic answer is **PCV13 followed by PPSV23** at least **8 weeks** later. Current ACIP and NCCN guidance has moved to newer conjugate vaccines: a single dose of **PCV20** (or **PCV21**), or **PCV15 followed by PPSV23** at least **1 year** later. Know both — the exam still rewards the classic sequence, and current practice has moved past it.",
  }, PACKET),
  references("block-splenectomy-references", [PACKET]),
];

export const splenectomyAndSplenorrhaphyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001211",
  versionId: "00000000-0000-4000-8000-000000001221",
  slug: "splenectomy-and-splenorrhaphy",
  title: "Splenectomy and Splenorrhaphy",
  aliases: ["splenectomy", "splenorrhaphy", "splenic salvage", "spleen-preserving surgery", "emergent splenectomy", "trauma splenectomy", "short gastric arteries", "gastrosplenic ligament", "splenic hilum", "splenic artery ligation", "OPSI", "overwhelming postsplenectomy infection", "postsplenectomy vaccination", "pneumococcal vaccine splenectomy", "PCV13 PPSV23", "PCV20", "asplenia", "pancreatic tail injury", "pancreatic fistula", "subphrenic abscess", "postsplenectomy thrombocytosis", "portal vein thrombosis", "splenic mobilization", "make the spleen a midline organ", "double ligation splenic artery", "Capnocytophaga", "purpura fulminans"],
  scoreNodeId: "trauma-procedures",
  scoreCategory: "SCORE · Trauma · Operations & Procedures",
  tags: ["trauma", "spleen", "operative-technique", "splenectomy", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-18T00:00:00.000Z",
});
