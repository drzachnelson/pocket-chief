import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_BILIARY_SOURCE as FISER,
  GALLSTONES_CHOLECYSTITIS_OE_SOURCE as OE,
  SAGES_SAFE_CHOLECYSTECTOMY_SOURCE as SAGES,
  SCORE_CHOLECYSTECTOMY_CHOLANGIOGRAPHY_SOURCE as SCORE_CHOLE,
  SCORE_SYMPTOMATIC_GALLSTONES_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-symptomatic-gallstones-and-cholecystitis/1-packet.md (S1 SCORE
// Symptomatic Gallstones and Cholecystitis, S2 SCORE Cholecystectomy and Cholangiography, S3 Fiser chapter 32),
// checked against the folder's OpenEvidence document. The packet deliberately names the Tokyo classification without
// grades (SCORE's grading table was an image); the TG18 table below is taken from the OpenEvidence document.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-gs-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Symptomatic gallstone disease spans a spectrum set by how long a stone obstructs the cystic duct: transient obstruction causes biliary colic, unresolved obstruction causes acute calculous cholecystitis with stasis, pressure, infection, and inflammation, and recurrent transient attacks cause chronic calculous cholecystitis with scarring of the gallbladder neck and cystic duct. Acalculous cholecystitis instead follows gallbladder stasis and ischemia in critically ill patients. The gallbladder holds 30 to 60 mL of bile, biliary anatomic variations occur in up to 30% of patients, and laparoscopic cholecystectomy is the treatment of choice and gold standard for acute cholecystitis, best performed early within the first week rather than after a delayed interval of about 6 weeks.",
  }, SCORE),

  sourced({
    id: "block-gs-stone-epidemiology-disease-s",
    type: "bullets",
    heading: "Stone epidemiology and disease spectrum",
    items: [
      "Most gallstones are asymptomatic, and only 20% to 30% of patients with asymptomatic stones develop symptoms within 20 years.",
      "Between 10% and 18% of patients with silent stones develop biliary pain and approximately 7% require operative intervention.",
      "Between 1% and 4% of patients with gallstones develop complications such as acute cholecystitis, gallstone pancreatitis, and choledocholithiasis, and only 1% of asymptomatic patients develop complications before symptoms.",
      "Risk factors for cholelithiasis include advancing age, female sex, obesity, pregnancy, rapid weight loss, hemolytic anemias, family history, and high cholesterol.",
      "Biliary colic pain starts 30 minutes to 1 hour after eating, is felt in the right upper quadrant or epigastrium with nausea or vomiting, lasts several hours, and resolves on its own.",
      "Cholecystitis pain is persistent and does not resolve, with tenderness, a positive Murphy sign, and often fever with nausea or vomiting.",
      "Leukocytosis with polymorphonuclear predominance suggests acute inflammation, while these markers are typically normal in biliary colic.",
      "Elevated total bilirubin is uncommon in uncomplicated acute cholecystitis and should raise concern for cholangitis, choledocholithiasis, or Mirizzi syndrome.",
      "Prophylactic cholecystectomy is not warranted for asymptomatic stones in general, but should be considered for sickle cell anemia, a calcified porcelain gallbladder, stones larger than 2.5 cm, a long common channel of bile and pancreatic ducts, and patients undergoing transplantation.",
      "Acalculous cholecystitis risk factors include older age, critical illness, burns, trauma, prolonged total parenteral nutrition, diabetes, and immunosuppression.",
    ],
  }, SCORE),

  sourced({
    id: "block-gs-biliary-colic-cholecystitis",
    type: "table",
    heading: "Biliary colic versus cholecystitis syndromes",
    columns: ["Syndrome", "Obstruction mechanism", "Clinical course that distinguishes it"],
    rows: [
      ["Biliary colic", "Biliary colic is a temporary blockage of the cystic duct by a gallstone.", "Biliary colic causes intense spasmodic right upper quadrant pain that resolves on its own within hours."],
      ["Acute calculous cholecystitis", "Acute calculous cholecystitis is an unresolved blockage of the cystic duct by a stone impacted in the gallbladder neck.", "Acute calculous cholecystitis causes persistent pain with Murphy sign and fever because stasis, pressure, infection, and inflammation develop."],
      ["Chronic calculous cholecystitis", "Chronic calculous cholecystitis follows recurrent attacks with only temporary occlusion of the cystic duct.", "Chronic calculous cholecystitis produces chronic inflammatory change and scarring of the gallbladder neck and cystic duct."],
      ["Acalculous cholecystitis", "Acalculous cholecystitis results from gallbladder stasis and ischemia without a stone obstructing the duct.", "Acalculous cholecystitis occurs in critically ill patients and is commonly followed by secondary infection with enteric pathogens."],
    ],
  }, SCORE),

  sourced({
    id: "block-gs-diagnosis-complications",
    type: "bullets",
    heading: "Diagnosis and complications",
    items: [
      "Transabdominal ultrasound has a sensitivity of 85% and a specificity of 95% for biliary disease and shows gallstones, gallbladder wall thickening, and pericholecystic fluid in cholecystitis.",
      "CT is useful to exclude disease outside the gallbladder, but gallstones are not always seen on CT, so a negative CT does not exclude gallstone disease and an ultrasound must still be obtained.",
      "On HIDA scintigraphy, failure of the gallbladder to fill 2 hours after injection demonstrates obstruction of the cystic duct, and HIDA can also identify bile leaks and measure gallbladder ejection.",
      "The most frequent biliary isolates are Escherichia coli (41%), Enterococcus (12%), Klebsiella (11%), and Enterobacter (9%), so antibiotics should cover gram-negative rods and anaerobes.",
      "Unresolved cystic duct obstruction can progress to gallbladder ischemia and necrosis, producing gangrenous cholecystitis and, with a gas-forming organism, emphysematous cholecystitis.",
      "Acute cholangitis requires both bacteria in the biliary tree and obstruction of flow, most often from a stone, and can also follow any obstructing lesion including malignancy.",
      "Gallstone pancreatitis follows a stone lodging at the ampulla or passing through it and obstructing the pancreatic duct.",
      "Gallstone ileus follows fistulization of a large stone from the gallbladder into the duodenum, with blockage most commonly in the distal ileum where the bowel tapers before the cecum.",
      "Acute cholecystitis severity is graded with the Tokyo classification referenced by SCORE.",
    ],
  }, SCORE),

  sourced({
    id: "block-gs-right-upper-quadrant-pain-de",
    type: "flow",
    heading: "Right upper quadrant pain to definitive treatment",
    nodes: [
      { id: "start", label: "A patient presents with right upper quadrant or epigastric pain after eating, with or without fever and Murphy sign." },
      { id: "ultrasound", label: "Transabdominal ultrasound evaluates the gallbladder for stones, wall thickening, and pericholecystic fluid, supported by blood counts and liver tests." },
      { id: "colic", label: "Pain that resolves within hours without inflammatory markers is biliary colic and is treated with elective laparoscopic cholecystectomy.", tone: "good" },
      { id: "acute", label: "Persistent pain with Murphy sign, fever, and leukocytosis is acute cholecystitis and is treated with antibiotics and early laparoscopic cholecystectomy within the first week." },
      { id: "tubepath", label: "A critically ill patient at prohibitive operative risk, without necrosis or perforation, receives a percutaneous cholecystostomy tube instead of immediate cholecystectomy.", tone: "caution" },
    ],
    edges: [
      { from: "start", to: "ultrasound", label: "Ultrasound is the first test for suspected gallbladder disease." },
      { from: "ultrasound", to: "colic", label: "Stones with transient pain and normal inflammatory markers follow the elective pathway." },
      { from: "ultrasound", to: "acute", label: "Stones with wall thickening, fluid, and systemic inflammation follow the early operative pathway." },
      { from: "acute", to: "tubepath", label: "Prohibitive operative risk diverts acute cholecystitis care to tube drainage." },
    ],
  }, SCORE),

  sourced({
    id: "block-gs-laparoscopic-cholecystectomy",
    type: "sequence",
    heading: "Laparoscopic cholecystectomy steps",
    steps: [
      { title: "Port placement", detail: "Four trocars are placed, typically a supraumbilical camera port, a subxiphoid working port, and right anterior axillary and right midclavicular retractor ports." },
      { title: "Retraction", detail: "The fundus is retracted cephalad toward the right shoulder and the infundibulum is retracted inferolaterally to open the hepatocystic triangle and separate the cystic duct from the common hepatic duct." },
      { title: "Triangle dissection", detail: "Fibrofatty tissue around the node of Calot is cleared from the hepatocystic triangle, beginning dissection at the infundibulum." },
      { title: "Cystic plate exposure", detail: "The lower third of the gallbladder is dissected off the liver bed to expose the cystic plate." },
      { title: "Critical view of safety", detail: "The critical view is confirmed when the triangle is cleared, the cystic plate is exposed, and two and only two tubular structures are seen entering the gallbladder." },
      { title: "Division and removal", detail: "The cystic duct and cystic artery are divided between clips and the gallbladder is removed from the hepatic plate." },
      { title: "Cholangiography when indicated", detail: "Intraoperative cholangiography cannulates the cystic duct at the gallbladder junction to image the common hepatic duct, common bile duct, bifurcation, and duodenal flow, finding choledocholithiasis in 2% to 12% of patients." },
    ],
  }, SCORE_CHOLE),

  sourced({
    id: "block-gs-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser and SCORE agree that early operation is correct: Fiser states there is no benefit to cooling the patient off with antibiotics before surgery, and SCORE states early cholecystectomy within the first week has equivalent or improved morbidity, mortality, and length of stay with a similar conversion rate compared with the historic delayed operation at about 6 weeks. The sources diverge on test emphasis and on size thresholds. Fiser keys the HIDA-based cholecystokinin cholescintigraphy test as the most sensitive test for cholecystitis and gives biliary dyskinesia criteria of emptying beyond 60 minutes or an ejection fraction below 40%, plus normal sizes of a common bile duct at or below 6 mm (at or below 10 mm after cholecystectomy) and a gallbladder wall at or below 4 mm; SCORE keys ultrasound first at 85% sensitivity and 95% specificity and uses the HIDA nonfilling time of 2 hours for cystic duct obstruction. Fiser keys cholesterol stones as 75% of stones in the United States and most gallstones as asymptomatic with observation only, consistent with SCORE's no-prophylaxis default.",
  }, FISER),

  sourced({
    id: "block-gs-bile-duct-injury-prevention",
    type: "warning",
    heading: "Bile duct injury prevention and response",
    text: "Bile duct injury is the most devastating complication of cholecystectomy: 80% of iatrogenic bile duct injuries occur during cholecystectomy, visual misperception accounts for 97% of injuries while poor technique or knowledge accounts for only 3%, and obtaining the critical view of safety lowers incidence from 0.6% to between 0% and 0.03%. Most injuries are not recognized intraoperatively; when one is recognized, a colleague experienced in biliary reconstruction should be called immediately, and if no help is available the right upper quadrant should be widely drained and the patient transferred to a tertiary center. Postoperative bile leak from the cystic duct stump or a duct of Luschka is treated with percutaneous drainage and ERCP with ampullary stenting to decompress the biliary tree, and stone spillage at operation occurs in 20% to 40% of cholecystectomies.",
  }, SCORE_CHOLE),

  sourced({
    id: "block-gs-tokyo",
    type: "table",
    heading: "Tokyo Guidelines (TG18): diagnosis and severity",
    columns: ["Tokyo 2018 element", "Definition"],
    rows: [
      ["Suspected acute cholecystitis", "One local sign (Murphy sign, or right upper quadrant mass, pain or tenderness) plus either one systemic sign (fever, raised CRP or raised white count) or a characteristic imaging finding"],
      ["Definite acute cholecystitis", "One local sign, one systemic sign and a characteristic imaging finding"],
      ["Grade I (mild)", "No organ dysfunction and only mild gallbladder inflammation, so cholecystectomy is low risk"],
      ["Grade II (moderate)", "Any one of: white count over 18,000/mm³, a palpable tender right upper quadrant mass, symptoms for more than 72 hours, or marked local inflammation (gangrenous or emphysematous cholecystitis, pericholecystic or hepatic abscess, biliary peritonitis)"],
      ["Grade III (severe)", "Dysfunction of any one organ system: dopamine at least 5 µg/kg/min or any norepinephrine, decreased consciousness, PaO2/FiO2 under 300, oliguria or creatinine over 2.0 mg/dL, PT-INR over 1.5, or platelets under 100,000/mm³"],
      ["What grade III changes", "Resuscitate and consider gallbladder drainage first, then cholecystectomy once the patient is stable"],
    ],
  }, OE),

  sourcedUnits({
    id: "block-gs-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Most sensitive test for cholecystitis", "Fiser: HIDA (cholecystokinin cholescintigraphy)", "SCORE: ultrasound is the standard evaluation (85% sensitive, 95% specific); HIDA is the physiologic test, positive when the gallbladder has not filled by 2 hours"],
      ["Prophylactic cholecystectomy for asymptomatic stones", "Fiser: stones in a patient having liver transplantation or gastric bypass; porcelain gallbladder carries about a 3% cancer risk and is removed if symptomatic or in a young, fit patient", "SCORE: consider it for porcelain gallbladder, stones over 2.5 cm, sickle cell anemia, a long common channel, and transplantation"],
      ["Repairing a recognized bile duct injury", "Fiser: primary repair if under 50% of the circumference, otherwise hepaticojejunostomy, delayed 6 to 8 weeks when found more than 7 days out", "SCORE: call an experienced biliary surgeon, or drain widely and transfer to a tertiary center; no timing rule"],
      ["Tokyo grading", "SCORE names the Tokyo classification, but its grade criteria were an image not present in the extracted module text", "The Tokyo 2018 criteria and grades above come from the OpenEvidence document, pending sign-off"],
      ["Timing of cholecystectomy for acute cholecystitis", "SCORE and Fiser: early cholecystectomy within the first week; no benefit to cooling off for about 6 weeks", "Ideally within 72 hours of symptom onset in the index admission, after which conversion, complications and bile duct injury rise"],
      ["Intraoperative cholangiography", "Routine cholangiography to prevent bile duct injury", "Selective cholangiography, for unclear anatomy or suspected duct stones, is noninferior"],
      ["When the critical view cannot be obtained", "Persist laparoscopically or convert to an open total cholecystectomy", "Subtotal (fenestrating or reconstituting) cholecystectomy is an accepted bail-out"],
      ["Grade III cholecystitis", "Emergent cholecystectomy for the sick gallbladder", "Resuscitate and consider percutaneous cholecystostomy first; operate once stable"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, SCORE_CHOLE], [SCORE, OE], [SCORE, FISER, OE], [OE], [OE, SAGES], [OE]]),

  references("block-gs-references", [SCORE, SCORE_CHOLE, FISER, OE, SAGES]),
];

export const symptomaticGallstonesAndCholecystitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005520",
  versionId: "00000000-0000-4000-8000-000000005521",
  slug: "symptomatic-gallstones-and-cholecystitis",
  title: "Symptomatic Gallstones and Cholecystitis",
  aliases: ["gallstones", "cholelithiasis", "biliary colic", "acute cholecystitis", "calculous cholecystitis", "acalculous cholecystitis", "laparoscopic cholecystectomy", "Tokyo cholecystitis grading", "TG18 cholecystitis grading", "percutaneous cholecystostomy"],
  scoreNodeId: "biliary",
  scoreCategory: "SCORE · Alimentary Tract · Biliary Tract",
  tags: ["biliary", "gallstones", "cholecystitis", "cholecystectomy", "biliary-colic", "critical-view-of-safety", "bile-duct-injury", "hida", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_CHOLE, FISER, OE, SAGES],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
