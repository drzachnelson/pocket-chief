import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  APPENDICITIS_OE_SOURCE as OE,
  FISER_SMALL_BOWEL_SOURCE as FISER,
  SCORE_APPENDECTOMY_SOURCE as SCORE_APPY,
  SCORE_APPENDICITIS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-appendicitis/1-packet.md (S1 SCORE Appendicitis, S2 SCORE
// Appendectomy, S3 Fiser chapter 35), checked against the folder's OpenEvidence document. Packet blocks are carried
// as written; the split table holds every packet FLAG, and the neoplasm block is OpenEvidence-sourced.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-ap-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Acute appendicitis is inflammation of the vermiform appendix, most often caused by luminal obstruction that progresses through distension and inflammation to ischemia, infection, and perforation. The appendix averages 8 to 9 cm in length and arises from the cecum just beyond the ileocecal junction, with the tip most commonly in the right lower quadrant, the pelvis, or a retrocecal position. Prompt laparoscopic appendectomy remains the gold standard for acute uncomplicated appendicitis, while walled-off abscess and delayed presentations are managed initially without operation using percutaneous drainage and intravenous antibiotics. Antibiotics-alone management is an evidence-supported alternative for uncomplicated disease that requires counseling, because a substantial minority of patients still undergo appendectomy within 90 days.",
  }, SCORE),

  sourced({
    id: "block-ap-epidemiology-causes-presenta",
    type: "bullets",
    heading: "Epidemiology, causes, and presentation",
    items: [
      "Most cases occur between ages 5 and 40 years, with a median age of 28 years.",
      "Lifetime risk is about 7% in the United States, higher in men (8%) than in women (6%).",
      "In adults, luminal obstruction is most often from a fecalith or a neoplasm, although neoplasms appear on fewer than 2% of final pathology specimens.",
      "Appendiceal neoplasms are most often neuroendocrine neoplasms (65%), with adenocarcinomas and mucinous tumors making up the remainder.",
      "In children, hypertrophy of mucosa-associated lymphoid tissue is a common obstructing mechanism.",
      "Pain typically begins as vague periumbilical visceral pain and localizes to the right lower quadrant as the parietal peritoneum becomes inflamed.",
      "Anorexia, nausea with or without vomiting, diarrhea, constipation, and fever may accompany the pain.",
      "A retrocecal appendix may present with flank or back pain, and a pelvic appendix may present with suprapubic pain.",
      "McBurney point, two-thirds of the distance from the umbilicus to the anterior superior iliac spine, is the classic site of tenderness.",
      "Rovsing sign is right lower quadrant tenderness on palpation of the left lower quadrant and is often present but not specific.",
      "A retrocecal appendix often produces a positive psoas sign, and a pelvic appendix often produces a positive obturator sign.",
      "Leukocytosis with neutrophil predominance is present in 90% of cases, and urinalysis is typically normal apart from possible microscopic pyuria or hematuria.",
      "Alvarado score bands are: less than 4 appendicitis unlikely, 5 to 6 compatible, 7 to 8 probable, and 9 to 10 very probable.",
    ],
  }, SCORE),

  sourced({
    id: "block-ap-imaging-choices-suspected-ap",
    type: "table",
    heading: "Imaging choices in suspected appendicitis",
    columns: ["Modality", "Strengths in appendicitis", "Limitations to weigh"],
    rows: [
      ["CT abdomen and pelvis with IV contrast", "CT is the most accurate modality, with sensitivity and specificity approaching 100%, and it is operator independent.", "CT uses ionizing radiation to be avoided in children and pregnancy, carries contrast-allergy risk, and costs more than ultrasound."],
      ["Ultrasound", "Ultrasound is faster, less invasive, and less costly than CT and is preferred in children and pregnant patients because it uses no ionizing radiation.", "Ultrasound quality varies with technique and sonographer experience and often fails to identify the appendix, particularly in obese patients."],
      ["MRI without contrast", "MRI is highly accurate, with sensitivity and specificity similar to CT, and is generally reserved for pregnant patients.", "MRI is limited by high cost, difficulty of interpretation, and limited availability."],
    ],
  }, SCORE),

  sourced({
    id: "block-ap-uncomplicated-perforated-dis",
    type: "bullets",
    heading: "Uncomplicated versus perforated disease and initial management",
    items: [
      "Experienced surgeons can diagnose appendicitis accurately from history, examination, and laboratory studies alone in up to 80% of patients, and imaging lowers the negative appendectomy rate.",
      "A man with a classic history, right lower quadrant tenderness, and minimal suspicion of another diagnosis may proceed to surgery without further imaging.",
      "Perforated appendicitis is suggested by fever above 38.5 \u00b0C and leukocytosis above 15,000, sometimes after transient relief of pain from decompression at perforation.",
      "CT in perforated appendicitis may show right lower quadrant inflammation, phlegmon, or a walled-off abscess, while diffuse peritonitis and rigidity are rare and suggest free rupture.",
      "All patients should receive an initial antibiotic dose covering aerobic and anaerobic flora, with Escherichia coli the most common isolate in perforated appendicitis (65%).",
      "Second-generation cephalosporins such as cefoxitin are a common antibiotic choice, and a single dose in uncomplicated disease lowers surgical site infection and intra-abdominal abscess risk.",
      "Initial care also includes fluid resuscitation, appropriate pain management, and keeping the patient nil per os.",
      "In the CODA trial, antibiotics were at least 24 hours of IV therapy followed by oral antibiotics for a 10-day total course.",
      "By 90 days in CODA, 29% of the antibiotics-only group had undergone appendectomy, including 41% of patients with an appendicolith and 25% without an appendicolith.",
      "Complication rates with antibiotics alone were higher than surgery only in patients with an appendicolith (8.1% versus 3.5%) and were similar in patients without an appendicolith.",
    ],
  }, SCORE),

  sourced({
    id: "block-ap-suspected-appendicitis-defin",
    type: "flow",
    heading: "Suspected appendicitis to definitive management",
    nodes: [
      { id: "start", label: "A patient presents with suspected acute appendicitis on history, examination, and laboratory studies." },
      { id: "imaging", label: "Imaging with CT, ultrasound, or MRI confirms appendicitis and distinguishes uncomplicated disease from phlegmon or walled-off abscess." },
      { id: "uncomplicated", label: "Uncomplicated appendicitis is treated with prompt laparoscopic appendectomy, with antibiotics-alone management as a counseled alternative.", tone: "good" },
      { id: "abscess", label: "A walled-off abscess larger than 3 cm is managed nonoperatively with percutaneous drainage and intravenous antibiotics." },
      { id: "failure", label: "Peritonitis, bowel obstruction, or sepsis developing during nonoperative management mandates urgent operative exploration.", tone: "caution" },
    ],
    edges: [
      { from: "start", to: "imaging", label: "Resuscitation, antibiotics, and imaging stratification begin at diagnosis." },
      { from: "imaging", to: "uncomplicated", label: "Imaging without abscess or phlegmon supports operative management." },
      { from: "imaging", to: "abscess", label: "Imaging showing a walled-off abscess supports initial nonoperative management." },
      { from: "abscess", to: "failure", label: "Failure to improve on drainage and antibiotics escalates care to the operating room." },
    ],
  }, SCORE),

  sourced({
    id: "block-ap-laparoscopic-appendectomy-st",
    type: "sequence",
    heading: "Laparoscopic appendectomy steps",
    steps: [
      { title: "Access and ports", detail: "The peritoneum is entered by Veress needle, direct trocar, or cut-down technique, with the camera port at the umbilicus and working ports in combinations such as left lower quadrant plus suprapubic or right mid-abdomen." },
      { title: "Inspection and positioning", detail: "The peritoneum is inspected to confirm the diagnosis and exclude other pathology, and the patient is placed in Trendelenburg with the right side up to clear the right lower quadrant." },
      { title: "Exposure of the appendix", detail: "Atraumatic graspers elevate the appendix, following the taeniae coli of the cecum to the appendiceal base when orientation is difficult." },
      { title: "Division of the mesoappendix", detail: "The mesoappendix, which contains the appendiceal artery, is divided with an endoscopic stapler or an ultrasonic energy device." },
      { title: "Transection of the base", detail: "The appendiceal base is transected just above its junction with the cecum using an endoscopic stapler, ultrasonic energy, or Endoloops." },
      { title: "Specimen extraction", detail: "The appendix is placed in a plastic retrieval bag and extracted through the umbilical incision to limit wound contamination." },
      { title: "Irrigation and closure", detail: "The transection site is checked for hemostasis, the right lower quadrant and pelvis are irrigated and suctioned, and the port sites are closed primarily." },
    ],
  }, SCORE_APPY),

  sourced({
    id: "block-ap-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser keys appendectomy as the treatment of appendicitis and reserves nonoperative care for the CT finding of a walled-off abscess after perforation, treated with percutaneous drainage and later interval appendectomy. SCORE preserves that operative default for uncomplicated disease but adds the CODA trial result: antibiotics alone were not inferior in the trial, yet 29% of antibiotics-only patients underwent appendectomy by 90 days and 41% of those with an appendicolith did so. The board-style answer remains prompt laparoscopic appendectomy; the current-practice addition is shared decision-making about antibiotics-first management, with an appendicolith arguing strongly for operation. Fiser also gives CT size criteria (diameter at least 7 mm or wall thickness at least 2 mm) that SCORE does not state numerically, and Fiser notes the classic symptom order of anorexia first, periumbilical pain second, and vomiting third.",
  }, FISER),

  sourced({
    id: "block-ap-postoperative-abscess-perfor",
    type: "warning",
    heading: "Postoperative abscess and perforated disease",
    text: "Fever, leukocytosis, and delayed return of bowel function after appendectomy for perforated appendicitis should be treated as a postoperative abscess until proven otherwise, because abscesses form in 10% to 20% of patients with perforated appendicitis and are drained percutaneously under imaging guidance. After appendectomy for complicated appendicitis, broad-spectrum antibiotics continue for a total course of 4 to 7 days and oral diet is often held until flatus, whereas after uncomplicated appendicitis postoperative antibiotics are not indicated and most patients are discharged within 24 to 48 hours. Surgical site infection remains the most common complication, at 1.7% after laparoscopic and 5.2% after open appendectomy, and laparoscopic cases convert to open in 1.2% of patients.",
  }, SCORE_APPY),

  sourcedUnits({
    id: "block-ap-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Antibiotics-first for uncomplicated disease", "Fiser: appendectomy for everyone; nonoperative care only for a walled-off abscess on CT", "SCORE (CODA): antibiotics alone were noninferior, but 29% had appendectomy by 90 days, 41% with an appendicolith and 25% without; an appendicolith argues for operation"],
      ["White count", "Fiser: a normal white count does not exclude appendicitis", "SCORE: leukocytosis with a left shift is present in 90%, so expect it, but its absence does not rule appendicitis out"],
      ["Fetal risk with rupture in pregnancy", "Fiser: 35% fetal mortality with rupture, a single-source figure to verify before relying on it", "SCORE: perforation and negative appendectomy both raise preterm labor and fetal loss, with no number given"],
      ["CT size criterion", "Fiser: diameter of at least 7 mm or wall thickness of at least 2 mm", "The OpenEvidence document: diameter over 6 mm diagnoses appendicitis, and over 13 mm flags complicated disease"],
      ["Alvarado score", "Original bands, with 7 to 8 probable and 9 to 10 very probable; a high score alone sends the patient to the operating room", "EAES re-stratified bands (low under 4, intermediate 4 to 8, high 9 or more) decide who needs imaging, not who skips it"],
      ["Periappendiceal abscess", "Drain an abscess over 3 cm, then interval appendectomy for everyone", "WSES 2025 by age: early laparoscopic appendectomy can be considered under 35; at 35 or older avoid early appendectomy, because neoplasm risk reaches 14.3%, and evaluate the colon before any interval operation"],
      ["Imaging in pregnancy and children", "SCORE: MRI is generally reserved for pregnant patients", "Ultrasound first, then MRI rather than CT when ultrasound is inconclusive, in pregnancy and in children (WSES)"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, SCORE], [FISER, OE], [SCORE, OE], [SCORE, OE], [SCORE, OE]]),

  sourced({
    id: "block-ap-neoplasm",
    type: "bullets",
    heading: "Appendiceal neoplasms on the pathology report",
    items: [
      "A neuroendocrine tumor under 1 cm needs only appendectomy with negative margins.",
      "A neuroendocrine tumor over 2 cm needs **right hemicolectomy**, because nodal metastasis is far more likely.",
      "For a 1 to 2 cm neuroendocrine tumor, hemicolectomy is individualized for high-risk features: base or margin involvement, mesoappendiceal invasion over 3 mm, lymphovascular invasion, or grade above G1.",
      "Appendiceal adenocarcinoma needs right hemicolectomy.",
      "A low-grade appendiceal mucinous neoplasm usually needs only negative-margin appendectomy, but perforation or extra-appendiceal mucin raises the risk of pseudomyxoma peritonei, and its staging and follow-up run through [[Peritoneal Neoplasms]].",
    ],
  }, OE),

  references("block-ap-references", [SCORE, SCORE_APPY, FISER, OE]),
];

export const appendicitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005220",
  versionId: "00000000-0000-4000-8000-000000005221",
  slug: "appendicitis",
  title: "Appendicitis",
  aliases: ["acute appendicitis", "Alvarado score", "McBurney point", "perforated appendicitis", "periappendiceal abscess", "appendicolith", "CODA trial", "appendiceal neuroendocrine tumor", "appendiceal carcinoid"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "appendicitis", "appendectomy", "right-lower-quadrant-pain", "alvarado", "perforation", "abscess", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_APPY, FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
