import { buildTopic, references, sourced } from "@/content/authoring";
import {
  FISER_BILIARY_SOURCE as FISER,
  FISER_CHOLEDOCHAL_CYST_SOURCE as FISER_PEDS,
  SCORE_CHOLEDOCHAL_CYST_PEDIATRIC_SOURCE as SCORE_PEDS,
  SCORE_CHOLEDOCHAL_CYST_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-cc-summary",
    type: "summary",
    heading: "At a glance",
    text: "A choledochal cyst is a congenital dilation of the bile duct, usually behind a **long common pancreaticobiliary channel** that lets pancreatic enzymes reflux into the duct. It is premalignant everywhere in the biliary tree, so the treatment is **excision, not drainage** — for the common type I, cyst excision, cholecystectomy, and a biliary-enteric reconstruction. The exceptions are the choledochocele (type III), handled endoscopically or transduodenally, and Caroli disease (type V), which ends in resection or transplant.",
  }, SCORE),
  sourced({
    id: "block-cc-todani",
    type: "table",
    heading: "Todani classification",
    columns: ["Type", "Anatomy", "Treatment"],
    rows: [
      ["I", "Cystic, focal, or fusiform dilation of the extrahepatic duct — **Ia** cystic, **Ib** focal and usually distal, **Ic** fusiform", "Cyst excision, cholecystectomy, and hepaticoduodenostomy or Roux-en-Y hepaticojejunostomy"],
      ["II", "A **diverticulum** off the common bile duct with no other dilation", "Excision of the diverticulum"],
      ["III", "**Choledochocele** — distal duct dilation within the duodenal or pancreatic wall", "ERCP with sphincterotomy, or marsupialization"],
      ["IVa", "One extrahepatic cyst with **multiple intrahepatic** cysts", "Excision and reconstruction, plus hepatic resection when the intrahepatic disease is confined to one lobe"],
      ["IVb", "**Multiple extrahepatic** cysts only", "Cyst excision and biliary-enteric reconstruction"],
      ["V", "Intrahepatic cysts only — **Caroli disease** when hepatic fibrosis accompanies it", "Liver resection or orthotopic liver transplantation"],
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-fiser",
    type: "bullets",
    heading: "Board numbers",
    items: [
      "Type I is about **85 percent**, type IV about **10 percent**, type II about 3 percent, and types III and V about 1 percent each.",
      "Excision is required because of the risks of **cholangiocarcinoma**, pancreatitis, cholangitis, and obstructive jaundice.",
      "Type III has a **low** malignant transformation rate of 2 to 3 percent over a lifetime, so it does not always need excision — **avoid a Whipple** for it.",
      "Caroli disease brings hepatic fibrosis and may be associated with **congenital hepatic fibrosis and medullary sponge kidney**.",
      "The cause is reflux of pancreatic enzymes into the biliary tree **in utero**, through a long common channel.",
    ],
  }, FISER_PEDS),
  sourced({
    id: "block-cc-fiser-biliary",
    type: "bullets",
    heading: "The patient on the exam",
    items: [
      "Female, and more often Asian.",
      "About **90 percent** are extrahepatic.",
      "About a **15 percent** risk of cholangiocarcinoma.",
      "Older patients have episodic pain, fever, jaundice, and cholangitis; infants can look like **biliary atresia**.",
    ],
  }, FISER),
  sourced({
    id: "block-cc-pathogenesis",
    type: "bullets",
    heading: "Pathogenesis and malignancy",
    items: [
      "Most cysts are associated with an **anomalous pancreaticobiliary junction** — a long common channel.",
      "The reverse does not hold: an anomalous junction is associated with a cyst only about **30 percent** of the time.",
      "Pancreatic enzymes reflux up the long channel, are activated by bile, and inflame the duct.",
      "Debris collecting in the cyst causes obstructive jaundice and cholangitis.",
      "The malignancy risk extends throughout the biliary tree, including **non-dilated duct and the gallbladder**, consistent with a field defect.",
    ],
  }, SCORE),
  sourced({
    id: "block-cc-epidemiology",
    type: "bullets",
    heading: "Who gets one",
    items: [
      "About **1 in 100,000 to 150,000** live births in Western populations, but as many as **1 in 1,000** in Japan.",
      "Female predominance of **3 to 4 to 1**.",
      "About 60 percent are diagnosed in the first decade, 20 to 25 percent **prenatally**, and about 20 percent later in childhood or adulthood.",
      "Pancreaticobiliary maljunction is present in **70 to 90 percent**.",
      "The classic triad of pain, jaundice, and a palpable right upper quadrant mass appears in only about **20 percent**; chronic or intermittent jaundice is the commonest presentation, and some patients present with cholangitis or pancreatitis.",
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-adult-presentation",
    type: "bullets",
    heading: "In adults",
    items: [
      "The classic triad of right upper quadrant pain, a palpable mass, and jaundice is **rarely** seen.",
      "**Jaundice** is the symptom that most often leads to imaging; pain, pruritus, nausea, and weight loss are the others.",
      "Cross-sectional imaging and gallbladder ultrasound find more cysts incidentally.",
    ],
  }, SCORE),
  sourced({
    id: "block-cc-imaging",
    type: "table",
    heading: "Diagnosis",
    columns: ["Study", "Role"],
    rows: [
      ["Ultrasound", "**First** imaging study, and may be diagnostic on its own in infants"],
      ["MRCP", "The **ideal** test — detailed, noninvasive anatomy of both duct systems"],
      ["ERCP or PTC", "Confirms the diagnosis and treats, used when MRCP shows a cyst or the patient is jaundiced"],
      ["CT, HIDA, and postcholecystectomy cholangiogram", "Raise suspicion but cannot define the anatomy fully, so they need MRCP or direct cholangiography after"],
    ],
  }, SCORE),
  sourced({
    id: "block-cc-infant",
    type: "bullets",
    heading: "In the fetus and infant",
    items: [
      "Prenatal ultrasound shows a cyst in the **porta hepatis** that is separate from the gallbladder but continuous with the biliary tree.",
      "The prenatal differential includes hepatic cyst, duodenal atresia, **cystic biliary atresia**, mesenteric or omental cyst, intestinal duplication, and gallbladder duplication.",
      "Ultrasound is the best first test with a sensitivity of **71 to 97 percent**, and MRCP clarifies the anatomy without radiation.",
      "Neonates may need a **liver biopsy** to separate a choledochal cyst from cystic biliary atresia.",
      "Obtain **CA 19-9 or CEA** if malignancy is a concern.",
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-operative",
    type: "bullets",
    heading: "Operative principles",
    items: [
      "Cholangitis or pancreatitis first gets fluids, broad-spectrum antibiotics, and drainage by ERCP or a transhepatic route when needed; **definitive surgery waits** until the acute process resolves.",
      "Cysts are not emergencies, but prompt excision limits malignancy, hepatic fibrosis, and the inflammation that welds the cyst to the portal structures.",
      "When the back wall is fused to the **portal vein**, open the cyst anteriorly away from the hepatic artery and strip its mucosal lining, leaving the outer wall rather than dissecting it off the vein.",
      "With diffuse intrahepatic dilation, close monitoring and possibly transplantation.",
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-excise",
    type: "warning",
    heading: "Excise it — do not drain it",
    text: "Cyst-enteric drainage relieves the obstruction and leaves the premalignant epithelium behind, which is why it has been abandoned. The keyed treatment is **resection**, because of the risk of cholangiocarcinoma, pancreatitis, cholangitis, and obstructive jaundice. Type III is the exception that does not always need excision.",
  }, FISER_PEDS),
  sourced({
    id: "block-cc-timing",
    type: "bullets",
    heading: "Timing",
    items: [
      "In adults, excise **electively**, and promptly if symptoms develop or malignancy is suspected.",
      "In infants diagnosed prenatally, **early excision** is favored because it limits hepatic fibrosis.",
    ],
  }, SCORE),
  sourced({
    id: "block-cc-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["How common is type I?", "Fiser gives **85 percent**, with type IV at 10 percent", "The pediatric SCORE module gives **90 to 95 percent**; both make type I the commonest by far"],
      ["Which reconstruction?", "Fiser keys **hepaticojejunostomy** for types I and IV", "Hepaticoduodenostomy and Roux-en-Y hepaticojejunostomy are likely comparable, with too little data to choose; hepaticoduodenostomy risks **bile reflux gastritis**, the Roux limb risks **adhesive obstruction**"],
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-complications",
    type: "bullets",
    heading: "After excision",
    items: [
      "**Anastomotic stricture** is the most common complication, suspected from acholic stools, direct hyperbilirubinemia, or ultrasound and MRCP.",
      "Endoscopic dilation and stenting are hard after a biliary-enteric reconstruction, so a stricture often needs transhepatic drainage or revision.",
      "Malignancy risk falls greatly after excision but stays above the general population, because metaplasia increases with age and can progress to adenocarcinoma.",
      "**Cholangiocarcinoma and gallbladder adenocarcinoma** are the cancers to watch for.",
      "Follow excised patients **yearly** with laboratory tests and imaging, and add MRCP and CA 19-9 for any suspicion.",
    ],
  }, SCORE_PEDS),
  sourced({
    id: "block-cc-adult-followup",
    type: "bullets",
    heading: "Long-term in the adult module",
    items: [
      "Primary choledocholithiasis can form, usually in intrahepatic cysts left in place.",
      "The residual cancer risk persists after excision but is thought to be reduced.",
      "The adult module notes **no follow-up guidelines** exist, where the pediatric module recommends yearly surveillance.",
    ],
  }, SCORE),
  references("block-cc-references", [SCORE, SCORE_PEDS, FISER_PEDS, FISER]),
];

export const choledochalCystTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000003124",
  versionId: "00000000-0000-4000-8000-000000003134",
  slug: "choledochal-cyst",
  title: "Choledochal Cyst",
  aliases: ["choledochal cysts", "pediatric choledochal cyst", "biliary cyst", "Todani classification", "choledochocele", "Caroli disease", "Caroli syndrome", "anomalous pancreaticobiliary junction", "pancreaticobiliary maljunction", "long common channel", "cyst excision"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: ["biliary", "choledochal-cyst", "pediatric-surgery", "premalignant", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_PEDS, FISER_PEDS, FISER],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
