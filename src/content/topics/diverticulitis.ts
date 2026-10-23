import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  DIVERTICULITIS_OE_SOURCE as OE,
  FISER_COLORECTAL_SOURCE as FISER,
  SCORE_DIVERTICULITIS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-diverticulitis/1-packet.md (S1 SCORE Diverticulitis, S2 Fiser
// chapter 36), checked against the folder's OpenEvidence document. Packet blocks are carried as written; the split
// table holds every packet FLAG plus the OpenEvidence document's current-practice positions.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-dv-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Acute diverticulitis is inflammation from contained microperforation of a colonic diverticulum, where a diverticulum in the colon is a false diverticulum of mucosa and submucosa herniating through the muscular wall at sites where an arteriole enters. The sigmoid colon is most susceptible because it is relatively less distensible, and fecal stasis with fecalith obstruction of a diverticulum drives bacterial stasis, ischemia, microperforation, and infection. Uncomplicated disease is contained inflammation, whereas complicated disease means abscess, free perforation, fistula, or stricture. Management is staged by the Hinchey classification: antibiotics and bowel rest for contained disease, percutaneous drainage for larger abscesses, and emergency resection for generalized peritonitis.",
  }, SCORE),

  sourced({
    id: "block-dv-epidemiology-risk-factors-pr",
    type: "bullets",
    heading: "Epidemiology, risk factors, and presentation",
    items: [
      "More than 50% of Americans older than 60 years have diverticulosis, but fewer than 5% develop acute diverticulitis.",
      "Incidence rises with age and is most common in the Western hemisphere and in countries with a Western lifestyle.",
      "A low-fiber diet produces small-caliber stools and higher intracolonic pressure, which promotes diverticula formation.",
      "Modifiable risk factors include diet, physical activity, obesity, smoking, and use of NSAIDs, steroids, and opiates.",
      "Seeds and nuts are not a cause: a large 2008 observational study found an inverse association between seed and nut consumption and diverticulosis.",
      "Patients typically present with left lower quadrant pain, nausea, vomiting, and low-grade fever.",
      "Complicated disease is suggested by hemodynamic instability, rigidity or guarding, or a palpable mass on abdominal or rectal examination.",
      "Uncomplicated diverticulitis often responds to antibiotics within 48 hours, and complicated disease should be suspected when pain or fever has not improved after 72 hours of treatment.",
      "CT findings of acute diverticulitis are pericolic fat stranding, localized bowel wall thickening greater than 4 mm, and colonic diverticula.",
      "Complicated CT findings include free air, pericolic or pelvic abscess, dilated bowel from obstruction, and fistulous tracts to bowel, bladder, or abdominal wall.",
      "Fistulas are most commonly enterocutaneous, colovesical, or colovaginal, and patients report passing stool or gas through the involved organ.",
      "Profuse watery diarrhea, hematochezia, or bloody diarrhea should prompt consideration of another disease process rather than diverticulitis alone.",
    ],
  }, SCORE),

  sourced({
    id: "block-dv-hinchey-classification-manag",
    type: "table",
    heading: "Hinchey classification and management direction",
    columns: ["Hinchey stage", "Anatomic finding", "Management direction"],
    rows: [
      ["Stage I", "A stage I injury is a pericolic or mesenteric abscess or phlegmon.", "Stage I disease is usually managed with IV antibiotics, fluids, and bowel rest, with drainage if the abscess is large enough."],
      ["Stage II", "A stage II injury is a walled-off distant abscess in the pelvis or retroperitoneum.", "Stage II disease is usually managed with IV antibiotics, fluids, and bowel rest, with percutaneous drainage of accessible abscesses."],
      ["Stage III", "A stage III injury is generalized purulent peritonitis from rupture of a pericolic or pelvic abscess that does not communicate with the bowel lumen.", "Stage III disease usually requires ICU resuscitation and emergency surgery because patients are often septic."],
      ["Stage IV", "A stage IV injury is generalized fecal peritonitis from free perforation of a diverticulum communicating with the bowel lumen.", "Stage IV disease requires immediate resuscitation and emergency surgery for source control."],
    ],
  }, SCORE),

  sourced({
    id: "block-dv-nonoperative-management-absc",
    type: "bullets",
    heading: "Nonoperative management and abscess drainage",
    items: [
      "Mild uncomplicated diverticulitis can be managed as an outpatient with oral antibiotics covering aerobic and anaerobic organisms, and selected healthy patients with early disease may omit antibiotics without higher complication or surgery rates.",
      "Patients who cannot tolerate oral intake or fail to improve after 2 to 3 days of outpatient therapy are admitted for IV hydration, IV antibiotics, and bowel rest.",
      "Admitted patients need serial abdominal examinations with temperature and white blood cell monitoring, and failure to improve after 2 to 3 days of IV antibiotics should prompt repeat imaging.",
      "Abscesses larger than 3 cm that are not immediately adjacent to structures such as small bowel should be drained percutaneously, with CT-guided anterior abdominal wall drainage preferred and a transgluteal approach for deep pelvic abscesses.",
      "Percutaneous drains stay until output is minimal, and failure to improve after drainage may necessitate surgical intervention.",
      "Colorectal cancer risk after an episode is 7.9% to 11% after complicated diverticulitis versus 0.7% to 1.3% after uncomplicated diverticulitis in two systematic reviews.",
      "Colonoscopy is typically performed 6 weeks after resolution to lower perforation risk, and patients with complicated disease or atypical imaging, symptoms, or recovery should be offered colonoscopy.",
      "Of patients treated nonoperatively for a first episode, 20% to 40% have recurrent episodes and approximately 20% continue to have chronic abdominal pain.",
    ],
  }, SCORE),

  sourced({
    id: "block-dv-acute-diverticulitis-triage",
    type: "flow",
    heading: "Acute diverticulitis triage to source control",
    nodes: [
      { id: "start", label: "A patient presents with left lower quadrant pain, fever, and CT findings of acute diverticulitis." },
      { id: "uncomplicated", label: "Uncomplicated diverticulitis is treated with antibiotics and bowel rest, as an outpatient if mild or admitted for IV therapy if oral intake fails.", tone: "good" },
      { id: "abscess", label: "An abscess larger than 3 cm is drained percutaneously while antibiotics and bowel rest continue." },
      { id: "peritonitis", label: "Generalized peritonitis, sepsis, or failure of nonoperative management requires emergency surgery.", tone: "caution" },
      { id: "elective", label: "Complicated disease that resolves nonoperatively is offered elective resection about 6 to 12 weeks after symptoms resolve." },
    ],
    edges: [
      { from: "start", to: "uncomplicated", label: "Contained inflammation without abscess or peritonitis follows the nonoperative pathway." },
      { from: "start", to: "abscess", label: "CT showing a drainable abscess adds percutaneous drainage to nonoperative care." },
      { from: "start", to: "peritonitis", label: "Free perforation or diffuse peritonitis bypasses nonoperative care for the operating room." },
      { from: "abscess", to: "elective", label: "Successful drainage and resolution convert emergency disease into an elective resection decision." },
      { from: "uncomplicated", to: "peritonitis", label: "Deterioration or no improvement after 72 hours escalates nonoperative care to surgery." },
    ],
  }, SCORE),

  sourced({
    id: "block-dv-emergency-surgery-perforated",
    type: "sequence",
    heading: "Emergency surgery for perforated diverticulitis",
    steps: [
      { title: "Resuscitation", detail: "The septic patient is resuscitated, often in the ICU, with IV fluids and antibiotics before and during operative source control." },
      { title: "Washout", detail: "The abdomen is washed out to clear purulent or fecal contamination from perforation." },
      { title: "Resection", detail: "The perforated sigmoid colon is resected, with the distal margin in healthy rectum because leaving diseased distal colon is the most common cause of recurrence after sigmoidectomy." },
      { title: "Colostomy creation", detail: "A Hartmann procedure is completed by creating an end colostomy and leaving a rectal stump, which remains the typical safest strategy in diffuse peritonitis." },
      { title: "Anastomosis alternative", detail: "In selected patients, sigmoidectomy with primary anastomosis with or without proximal diversion is an emerging alternative with similar short-term morbidity and a higher chance of being stoma-free at 12 months." },
      { title: "Damage control option", detail: "An extremely unstable patient in septic shock may undergo damage control laparotomy with the bowel left in discontinuity and the abdomen temporarily closed." },
    ],
  }, SCORE),

  sourced({
    id: "block-dv-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "The classic board answer offered elective sigmoid colectomy after more than two uncomplicated episodes, and to younger patients after a single hospitalized episode, to prevent a future emergency operation with a colostomy. SCORE states that current data do not support that rule: the first episode is usually the worst, recommending elective surgery to avoid a future stoma should be discouraged, and younger patients have higher recurrence rates without necessarily having more complicated episodes or more emergency surgery. The current decision is individualized on operative risk, frequency and severity of flares, and patient preference, while patients with complicated disease managed nonoperatively should still be offered elective operation about 6 to 12 weeks after resolution because recurrence rates are high, and elective colectomy should be considered in immunocompromised patients after a single episode. Elective resection is preferably laparoscopic, with about a 20% conversion rate to open operation and a ureteral injury risk of less than 1% that rises with acute inflammation.",
  }, SCORE),

  sourced({
    id: "block-dv-fiser-thresholds-fistula-spe",
    type: "warning",
    heading: "Fiser thresholds and fistula specifics",
    text: "Fiser keys abscess size differently from SCORE and keys routine post-episode colonoscopy: in Fiser, an abscess smaller than 4 cm usually resolves with antibiotics alone and an abscess of 4 cm or larger needs percutaneous drainage, whereas SCORE uses a larger-than-3 cm drainage threshold. Fiser also directs follow-up colonoscopy 6 weeks after an episode to rule out colorectal cancer and inflammatory bowel disease in all patients, whereas SCORE reserves colonoscopy beyond screening mainly for complicated or atypical cases because cancer risk after uncomplicated disease resembles the general population. For fistulas, Fiser specifies that a colovesical fistula presents with fecaluria and pneumaturia and is best diagnosed by cystoscopy, while a colovaginal or rectovaginal fistula is best diagnosed by the methylene blue tampon test with sigmoidoscopy.",
  }, FISER),

  sourcedUnits({
    id: "block-dv-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Abscess size that needs drainage", "Fiser: antibiotics alone under 4 cm, percutaneous drainage at 4 cm or larger", "SCORE: drain an abscess larger than 3 cm (its staging text also says 3 to 4 cm); the 2020 ASCRS guideline also drains above 3 cm"],
      ["Elective colectomy after uncomplicated episodes", "Classic rule: sigmoid colectomy after two uncomplicated episodes, or after one in a young patient", "SCORE: the episode-count rule is discouraged; decide on operative risk, flare frequency and severity, and preference, with young age alone not an indication and resection 6 to 12 weeks after the flare"],
      ["Antibiotics for uncomplicated diverticulitis", "Fiser: levofloxacin plus metronidazole for every patient", "SCORE: antibiotics may be omitted in selected healthy patients with early-stage disease; per the OpenEvidence document, immunocompetent, non-septic, non-frail outpatients (AVOD and DIABOLO trials)"],
      ["Colonoscopy after an episode", "Fiser: colonoscopy 6 weeks after every episode to exclude cancer and inflammatory bowel disease", "SCORE: after uncomplicated disease the yield may not exceed routine screening; reserve it mainly for complicated or atypical cases"],
      ["Emergency operation for perforation", "Hartmann procedure as the typical safest strategy in diffuse peritonitis", "Primary anastomosis with or without a diverting ileostomy in stable, immunocompetent patients: in DIVA/LADIES, 94.6% against 71.7% were stoma-free at 12 months with similar morbidity"],
      ["Why diverticulitis happens", "A fecalith obstructs the diverticular neck and the diverticulum perforates", "Fecalith obstruction is now thought uncommon; the disease is multifactorial and inflammatory, which is the rationale for omitting antibiotics"],
    ],
  }, [[FISER, SCORE, OE], [SCORE, OE], [FISER, SCORE, OE], [FISER, SCORE], [SCORE, OE], [SCORE, OE]]),

  references("block-dv-references", [SCORE, FISER, OE]),
];

export const diverticulitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005320",
  versionId: "00000000-0000-4000-8000-000000005321",
  slug: "diverticulitis",
  title: "Diverticulitis",
  aliases: ["acute diverticulitis", "sigmoid diverticulitis", "Hinchey classification", "complicated diverticulitis", "diverticular abscess", "colovesical fistula", "perforated diverticulitis", "elective sigmoid colectomy"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "diverticulitis", "hinchey", "sigmoid-colectomy", "hartmann", "pericolic-abscess", "fistula", "colorectal", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
