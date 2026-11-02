import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ASCO_2025_OVARIAN_SOURCE as ASCO,
  CHIPOR_TRIAL_SOURCE as CHIPOR,
  FISER_GYNECOLOGY_SOURCE as FISER,
  GYNECOLOGIC_NEOPLASMS_OE_SOURCE as OE,
  KOV_HIPEC_TRIAL_SOURCE as KOV_HIPEC,
  LION_TRIAL_SOURCE as LION,
  OVHIPEC1_TRIAL_SOURCE as OVHIPEC1,
  OVHIPEC2_PROTOCOL_SOURCE as OVHIPEC2,
  SCORE_GYNECOLOGIC_MALIGNANT_NEOPLASMS_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-11-01-gynecologic-neoplasms/1-packet.md (S1 SCORE Gynecologic Malignant
// Neoplasms, S2 Fiser chapter 40, S3 PubMed abstracts), checked against the folder's condensed OpenEvidence document
// and 4-claude-research.md. Whole SCORE topic, the first in the Obstetrics & Gynecology section. No NCCN evidence
// category is stated for ovarian HIPEC, because none could be confirmed in a primary text.
const UNVERIFIED = "(**UNVERIFIED**: secondary sources only, not checked against the primary text)";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-gyn-summary",
    type: "summary",
    heading: "At a glance",
    text: "The general surgeon meets gynecologic cancer as an adnexal mass, a carcinomatosis, or an unexpected finding at laparotomy, and the rules that matter most are about the ovary. Never biopsy an ovarian mass percutaneously, refer early to gynecologic oncology, and aim for no gross residual disease. When that cannot be done first, neoadjuvant chemotherapy and interval cytoreduction follow, and HIPEC at that interval operation is the gynecologic HIPEC setting with the most durable survival benefit.",
  }, SCORE),
  sourced({
    id: "block-gyn-four",
    type: "table",
    heading: "The four cancers at a glance",
    columns: ["Cancer", "Risk and presentation", "Primary treatment"],
    rows: [
      ["Endometrial", "Most prevalent gynecologic cancer, linked to obesity, unopposed estrogen, Lynch and Cowden syndromes, and tamoxifen, presenting with abnormal bleeding or an endometrium over 4 mm after menopause", "Total hysterectomy, bilateral salpingo-oophorectomy, and sentinel node mapping, minimally invasive for uterine-confined disease"],
      ["Ovarian, tubal, and peritoneal epithelial", "Ranks 18th in incidence but 14th in cancer death, presenting late with bloating, pain, early satiety, or a pelvic mass", "Surgical staging or cytoreduction to no gross residual disease, plus platinum chemotherapy"],
      ["Cervical", "High-risk HPV 16 and 18 cause over 90%, presenting with abnormal or postcoital bleeding and discharge", "Surgery for stages I to IIA1 and definitive chemoradiation for locally advanced disease"],
      ["Vulvar", "About 6% of gynecologic cancers, mostly squamous, with pruritus the commonest symptom", "Radical vulvectomy with 2 cm margins plus sentinel node biopsy or inguinofemoral lymphadenectomy"],
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-gyn-ovarian-workup",
    type: "bullets",
    heading: "Ovarian cancer: risk, prevention, and workup",
    items: [
      "Average-risk lifetime risk is 1% to 2%, the average age at presentation is the early 60s, and about 20% of ovarian or tubal cancers are hereditary, mostly BRCA1, BRCA2, or Lynch syndrome.",
      "Most high-grade serous carcinomas start in the fimbriated end of the fallopian tube, so ovarian, tubal, and peritoneal epithelial cancers are treated as one disease.",
      "Tubal ligation, prior pregnancy, oral contraceptives, and breastfeeding are protective.",
      "Risk-reducing salpingo-oophorectomy is offered by age 35 to 40 for BRCA1 and 40 to 45 for BRCA2, or at completion of childbearing, while salpingectomy alone is not yet standard.",
      "ACOG supports opportunistic salpingectomy during other pelvic operations in counseled patients who do not want future pregnancy.",
      "CA-125 is most useful after menopause, with a normal value under 35 units/mL, and it is normal in half of early-stage cancers.",
      "Refer to gynecologic oncology for a rising or elevated CA-125, papillary projections, mural nodules, thick or multiple septations, irregular vascularity, or size over 10 cm.",
      "Laparoscopy is preferred only if the mass can be removed intact into a bag without spilling cyst contents.",
      "Early gynecologic oncology referral improves survival, and every patient considered for neoadjuvant chemotherapy should see a gynecologic oncologist.",
      "Every patient with epithelial ovarian cancer is offered genetic counseling and testing.",
      "Five-year survival is about 91.9% for early-stage disease, 41% for stage III, and 20% for stage IV.",
      "A **Krukenberg tumor** is gastric signet ring cancer metastatic to the ovary.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE], [FISER]]),
  sourced({
    id: "block-gyn-no-biopsy",
    type: "warning",
    tone: "danger",
    heading: "No percutaneous biopsy of an ovarian mass",
    text: "Image-guided biopsy of an ovarian mass is not recommended, because **rupture** disseminates malignant cells from a tumor otherwise confined to the adnexa. Remove an apparently early mass intact and refer.",
  }, SCORE),
  sourced({
    id: "block-gyn-figo",
    type: "table",
    heading: "FIGO 2018 ovarian staging",
    columns: ["Stage", "Extent", "Teaching point"],
    rows: [
      ["I", "Limited to one or both ovaries or tubes", "Substages separate one ovary, both ovaries, surgical spill, prior rupture, and positive cytology, so bilateral disease is still stage I"],
      ["II", "Pelvic extension below the brim, or primary peritoneal cancer", "Uterine involvement is stage II"],
      ["III", "Peritoneal metastasis outside the pelvis or retroperitoneal nodal metastasis", "Microscopically confirmed omental disease alone makes it stage III"],
      ["IV", "Distant metastasis", "Includes a cytology-positive pleural effusion, liver or splenic parenchymal disease, extra-abdominal nodes, and transmural bowel involvement"],
    ],
  }, SCORE),
  sourced({
    id: "block-gyn-flow",
    type: "flow",
    heading: "Suspected ovarian cancer",
    nodes: [
      { id: "mass", label: "Adnexal mass or suspected ovarian cancer" },
      { id: "benign", label: "Low-risk ultrasound features and CA-125", tone: "good" },
      { id: "concerning", label: "Suspicious imaging features or an elevated or rising CA-125", tone: "caution" },
      { id: "gynecology", label: "Gynecology management of a likely benign mass", tone: "good" },
      { id: "referral", label: "Gynecologic oncology referral with CT or MRI including the chest, and no image-guided biopsy of the ovary" },
      { id: "confined", label: "Disease apparently confined to the ovary: intact removal with frozen section and full surgical staging", tone: "good" },
      { id: "extraovarian", label: "Extra-ovarian disease", tone: "caution" },
      { id: "primary", label: "Primary cytoreduction to no gross residual disease, then platinum chemotherapy", tone: "good" },
      { id: "interval", label: "Neoadjuvant chemotherapy, reimaging after 3 cycles, then interval cytoreduction with HIPEC considered", tone: "caution" },
    ],
    edges: [
      { from: "mass", to: "benign", label: "low risk" },
      { from: "mass", to: "concerning", label: "high risk" },
      { from: "benign", to: "gynecology" },
      { from: "concerning", to: "referral" },
      { from: "referral", to: "confined", label: "localized" },
      { from: "referral", to: "extraovarian", label: "spread beyond the ovary" },
      { from: "extraovarian", to: "primary", label: "complete resection achievable" },
      { from: "extraovarian", to: "interval", label: "residual disease expected" },
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-gyn-ovarian-ops",
    type: "bullets",
    heading: "Ovarian operations, adjuvant therapy, and recurrence",
    items: [
      "Staging of apparent early disease takes ascites or washings for cytology, total hysterectomy with bilateral salpingo-oophorectomy, omentectomy, pelvic and para-aortic nodes to the renal vessels, and random peritoneal biopsies of the cul-de-sac, gutters, bladder, mesentery, and diaphragm.",
      "A unilateral oophorectomy can replace hysterectomy and bilateral oophorectomy in a patient with apparently localized disease who wants children.",
      "Appendectomy is added when tumor involvement is suspected or the histology is mucinous.",
      "Cytoreduction for extra-ovarian disease removes all visible tumor, which may mean bowel resection, splenectomy, peritonectomy, diaphragm stripping or resection, liver wedge resection, or cholecystectomy, with no gross residual disease as the goal.",
      "With complete resection and normal-looking nodes, systematic lymphadenectomy adds no survival and more morbidity, so only suspicious or enlarged nodes come out.",
      "Omentectomy is part of debulking partly because it helps intraperitoneal therapy reach the peritoneum.",
      "Postoperative therapy is platinum-based chemotherapy, with PARP inhibitors for up to 2 years for BRCA mutation or homologous recombination deficiency, and bevacizumab maintenance if it was given with primary chemotherapy.",
      "Surveillance is a pelvic examination and CA-125 every 3 months for 2 years, then every 6 months to 5 years.",
      "Recurrence treatment depends on the time since the last platinum, and secondary cytoreduction suits selected patients with a long recurrence-free interval and isolated metastases.",
      "Germ cell and sex cord-stromal tumors affect younger patients, carry different tumor markers, and need fertility-sparing staging by a gynecologic oncologist.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [LION], [FISER], [SCORE], [SCORE], [SCORE], [SCORE]]),
  sourced({
    id: "block-gyn-surgeon-finds",
    type: "bullets",
    heading: "↳ When the general surgeon finds it",
    items: [
      "An incidental adnexal mass at another operation gets washings, inspection of all peritoneal surfaces, and biopsy of anything suspicious, with no rupture or morcellation, then a call to gynecologic oncology.",
      "Without gynecologic oncology available, remove only what diagnosis and safety require and leave staging to the referral.",
      "A mucinous ovarian tumor means inspecting the appendix and thinking of a gastrointestinal primary, because bilateral tumors or those under 13 cm favor metastasis.",
      "A mucinous ovarian mass with an abnormal appendix or pseudomyxoma is treated as appendiceal until proven otherwise.",
    ],
  }, OE),
  sourcedUnits({
    id: "block-gyn-hipec",
    type: "table",
    heading: "HIPEC trials in ovarian cancer",
    columns: ["Trial", "Setting and regimen", "Result", "Takeaway"],
    rows: [
      ["OVHIPEC-1, 2018; final 2023", "Phase 3, 245 patients with stage III epithelial ovarian cancer after neoadjuvant chemotherapy: interval cytoreduction with or without cisplatin 100 mg/m² HIPEC", "Recurrence-free survival 14.2 versus 10.7 months (HR 0.66) and overall survival 45.7 versus 33.9 months (HR 0.67), with grade 3 or 4 events 27% versus 25%; at about 10 years, survival 44.9 versus 33.3 months (HR 0.70)", "HIPEC at interval cytoreduction improves survival, and the benefit holds at 10 years"],
      ["KOV-HIPEC-01, 2022", "RCT, 184 patients with stage III or IV disease at primary or interval cytoreduction: cisplatin 75 mg/m² at 41.5 °C for 90 minutes", "No overall difference in progression-free survival (19.8 versus 18.8 months) or overall survival (69.5 versus 61.3 months); interval subgroup survival 61.8 versus 48.2 months (HR 0.53)", "No benefit at primary cytoreduction, and the interval subgroup agrees with OVHIPEC-1"],
      ["CHIPOR, 2024", "Phase 3, 415 patients at first platinum-sensitive relapse at least 6 months after 6 cycles of platinum, complete cytoreduction with or without cisplatin 75 mg/m² at 41 °C for 60 minutes", "Overall survival 54.3 versus 45.8 months (HR 0.73), with grade 3 or higher events 49% versus 27% and renal failure 10% versus 1%", "The first positive phase 3 trial in recurrent disease, bought with more renal and electrolyte toxicity"],
      ["OVHIPEC-2", "Phase 3, target 538 patients: primary cytoreduction with or without HIPEC", "No results on PubMed as of November 1, 2026", "Pending, so HIPEC at primary cytoreduction is not established"],
    ],
  }, [[OVHIPEC1], [KOV_HIPEC], [CHIPOR], [OVHIPEC2]]),
  sourcedUnits({
    id: "block-gyn-hipec-guidelines",
    type: "bullets",
    heading: "↳ Where the guidelines stand",
    items: [
      "Prospective trials show a survival benefit for HIPEC after interval cytoreduction following neoadjuvant chemotherapy, and possibly at first platinum-sensitive relapse.",
      "ASCO 2025 says HIPEC may be offered at interval cytoreduction for stage III disease with good performance status and adequate renal function.",
      `NCCN Ovarian lists cisplatin 100 mg/m² HIPEC as an option at interval cytoreduction for stage III disease; its evidence category is not stated here because none could be confirmed ${UNVERIFIED}.`,
    ],
  }, [[SCORE], [ASCO], [OE]]),
  sourced({
    id: "block-gyn-other",
    type: "bullets",
    heading: "Endometrial, cervical, and vulvar points for the surgeon",
    items: [
      "Endometrial biopsy is indicated for postmenopausal bleeding, persistent abnormal bleeding under age 45, and high-risk patients, with dilation and curettage if the biopsy is nondiagnostic and bleeding persists.",
      "Lynch syndrome carriers have endometrial sampling every 1 to 2 years from age 30 to 35, and prophylactic hysterectomy with salpingo-oophorectomy after childbearing or at age 40.",
      "Endometrial cancer surgery avoids morcellation and removes the tumor en bloc, with indocyanine green injected into the cervix for sentinel node mapping and a side-specific pelvic dissection where mapping fails.",
      "Stage 1A endometrial cancer of grade 1 or 2 needs no treatment beyond surgery.",
      "Radical hysterectomy removes the uterus and cervix en bloc with the parametrium, uterosacral ligaments, and upper vagina, plus nodal sampling.",
      "The LACC trial showed worse survival with minimally invasive radical hysterectomy for early cervical cancer, and SHAPE showed simple hysterectomy is noninferior for low-risk early disease.",
      "Locally advanced cervical cancer gets external beam radiation, brachytherapy, and weekly radiosensitizing chemotherapy, with pembrolizumab added for high-risk disease.",
      "Central pelvic recurrence after radiation may be cured by pelvic exenteration when there is no distant disease and an en bloc negative-margin resection is possible.",
      "Vulvar cancer under 4 cm gets sentinel node biopsy, and larger tumors or suspicious nodes get inguinofemoral lymphadenectomy.",
      "During hysterectomy, find the ureter on the medial leaf of the broad ligament, open a window between the ureter and the ovarian vessels before ligating them, and give cefazolin and metronidazole before incision.",
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-gyn-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Operation for ovarian cancer", "Fiser: total abdominal hysterectomy and bilateral oophorectomy for every stage", "SCORE: fertility-sparing unilateral oophorectomy is allowed for apparently localized disease"],
      ["Advanced disease that cannot be cleared", "Fiser: debulking with omentectomy, then cisplatin and paclitaxel", "SCORE: neoadjuvant chemotherapy and interval cytoreduction, with PARP inhibitor or bevacizumab maintenance"],
      ["HIPEC", "Fiser: not mentioned", "Survival benefit at interval cytoreduction (OVHIPEC-1, holding at 10 years) and at first platinum-sensitive relapse (CHIPOR), but none at primary cytoreduction (KOV-HIPEC-01)"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, OVHIPEC1, CHIPOR, KOV_HIPEC]]),
  references("block-gyn-references", [SCORE, FISER, OE, OVHIPEC1, KOV_HIPEC, CHIPOR, OVHIPEC2, ASCO, LION]),
];

export const gynecologicNeoplasmsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000006420",
  versionId: "00000000-0000-4000-8000-000000006421",
  slug: "gynecologic-neoplasms",
  title: "Gynecologic Neoplasms",
  aliases: ["gynecologic malignant neoplasms", "gynecologic cancer", "ovarian cancer", "epithelial ovarian cancer", "high-grade serous carcinoma", "fallopian tube cancer", "primary peritoneal carcinoma", "endometrial cancer", "uterine cancer", "cervical cancer", "vulvar cancer", "adnexal mass", "FIGO staging", "interval debulking", "interval cytoreduction", "OVHIPEC", "CHIPOR", "risk-reducing salpingo-oophorectomy", "opportunistic salpingectomy", "radical hysterectomy", "radical vulvectomy"],
  scoreNodeId: "obstetrics-gynecology-conditions",
  scoreCategory: "SCORE · Obstetrics & Gynecology · Diseases & Conditions",
  tags: ["obstetrics-gynecology", "gynecologic-oncology", "ovarian-cancer", "peritoneal-surface", "hipec", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE, OVHIPEC1, KOV_HIPEC, CHIPOR, OVHIPEC2, ASCO, LION],
  blocks,
  reviewedAt: "2026-11-01T00:00:00.000Z",
});
