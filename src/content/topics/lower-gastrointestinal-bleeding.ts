import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_COLORECTAL_SOURCE as FISER,
  LOWER_GI_BLEEDING_OE_SOURCE as OE,
  SCORE_LOWER_GI_BLEEDING_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-22-lower-gastrointestinal-bleeding/1-packet.md (S1 SCORE Lower
// Gastrointestinal Bleeding, S2 Fiser chapter 36), checked against the folder's OpenEvidence document. Packet blocks are
// carried as written; the split table holds every packet FLAG plus the OpenEvidence document's current-practice
// positions. The Oakland score is in neither packet source and is cited to the OpenEvidence document only.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-lg-definition-overview",
    type: "summary",
    heading: "Definition and overview",
    text: "Lower gastrointestinal bleeding, bleeding distal to the ligament of Treitz, accounts for about 20% of all GI bleeding, and about 15% of patients with presumed lower GI bleeding actually have an upper GI source. Diverticulosis is the dominant etiology at 30% to 65% of cases, followed by ischemic colitis, hemorrhoids, polyps and neoplasms, and angioectasias, whose submucosal arteriovenous lesions form as chronic colonic contraction obstructs submucosal veins. Resuscitation comes first, targeting a hemoglobin of at least 7 g/dL in most patients, and colonoscopy after bowel preparation is the initial diagnostic test of choice, performed within 24 hours. The hemodynamically unstable patient who cannot be prepped goes to CT angiography, with tagged red cell scintigraphy for slower intermittent bleeding, mesenteric angiography when bleeding continues, and surgery reserved for bleeding that cannot be localized or controlled \u2014 segmental resection when the site is known, subtotal colectomy with end ileostomy when it is not.",
  }, SCORE),

  sourced({
    id: "block-lg-etiologies-risk-factors-resu",
    type: "bullets",
    heading: "Etiologies, risk factors, and resuscitation",
    items: [
      "Colonic diverticula are false diverticula \u2014 mucosa and submucosa herniating through the muscularis at the points where vasa recta penetrate the wall \u2014 which leaves only a thin layer between the artery and the lumen, so rupture of a vas rectum produces brisk, high-volume bleeding.",
      "Angiodysplasias account for 5% to 10% of lower GI bleeds and tend to cause slow blood loss presenting as melena or subacute anemia rather than exsanguination.",
      "Bleeding after polypectomy occurs in 2% to 7% of patients.",
      "About 50% of patients older than 60 years have radiologic diverticulosis, and its incidence rises with age, as do angiodysplasia and colonic neoplasms.",
      "Antiplatelet agents, anticoagulants, and NSAIDs all increase the risk and severity of lower GI bleeding, and older patients are the most likely to be taking them.",
      "Comorbidities that raise bleeding risk include hypertension, hemorrhoids, inflammatory bowel disease, chronic kidney disease, and coagulopathies.",
      "Diverticular bleeding is more frequent in African Americans than Caucasians, at 34.4 versus 20.3 per 100,000, and lower GI bleeding overall is more common in males.",
      "Resuscitation uses intravenous fluids and blood products to normalize hemodynamics before therapeutic intervention, maintaining hemoglobin at least 7 g/dL, with a higher target acceptable in the briskly bleeding patient.",
      "Massive transfusion, generally more than 10 units of packed red cells in 24 hours, should be balanced, with a 1:1:1 ratio of red cells to plasma to single-donor platelets extrapolated from trauma data.",
      "Reversal agents are recommended for patients with an INR greater than 2.5, or at a lower INR when bleeding is ongoing.",
      "Colon cancer rarely presents with significant lower GI bleeding, so a major bleed should not be attributed to a tumor without evaluation.",
    ],
  }, SCORE),

  sourced({
    id: "block-lg-localization-studies-by-blee",
    type: "table",
    heading: "Localization studies by bleeding rate and role",
    columns: ["Localization study", "Detection threshold or timing", "What it does best", "Main limitation"],
    rows: [
      ["Colonoscopy", "Performed within 24 hours of the index bleed after adequate bowel preparation.", "It diagnoses and treats in one session, with clips or band ligation for diverticula and cautery or argon plasma coagulation for angioectasias.", "It needs a prepped bowel and a patient stable enough to tolerate preparation."],
      ["CT angiography", "It detects bleeding at roughly 0.3 to 1.0 mL/min, with sensitivity of 79% to 95% and specificity of 95% to 100%.", "It localizes bleeding in the unstable patient who cannot be prepped and guides endoscopic or angiographic therapy.", "It shows the bleeding moment only and offers no therapy by itself."],
      ["Tagged red cell scintigraphy", "It can detect bleeding as slow as 0.04 to 0.05 mL/min and stays useful for up to 24 hours after tracer injection.", "It catches slow and intermittent bleeding without any bowel preparation.", "Its anatomic localization is poor because tracer moves with peristalsis and gravity."],
      ["Mesenteric angiography", "It localizes best in unstable patients and in those who have received four or more units of blood in 12 hours.", "It treats as it diagnoses, with superselective embolization stopping active bleeding in up to 97% of patients in some studies.", "It is invasive and can miss bleeding that has temporarily stopped."],
      ["Video capsule endoscopy", "It is performed after adequate upper and lower endoscopy in the stable patient, with a diagnostic yield of 50% to 72% in obscure overt bleeding.", "It surveys the small bowel, the blind spot of standard endoscopy.", "It has no therapeutic capability and localizes the bleeding site imprecisely."],
    ],
  }, SCORE),

  sourced({
    id: "block-lg-localization-sequence-lower",
    type: "flow",
    heading: "Localization sequence for lower GI bleeding",
    nodes: [
      { id: "start", label: "A patient presents with hematochezia or maroon stool and a history is taken for onset, volume, stool color, clots, and symptoms of blood loss." },
      { id: "resuscitate", label: "Two large-bore intravenous lines are placed, resuscitation with fluids and blood products begins, and coagulopathy is reversed." },
      { id: "upper", label: "An upper GI source is actively excluded, remembering that 15% of presumed lower GI bleeds are upper in origin and that a negative nasogastric lavage has only a 64% negative predictive value.", tone: "caution" },
      { id: "exam", label: "Perineal inspection and digital rectal examination look for fissures, masses, and hemorrhoids as an anorectal source." },
      { id: "scope", label: "A stable patient undergoes colonoscopy after bowel preparation, within 24 hours of the index bleed, with endoscopic therapy of any lesion found.", tone: "good" },
      { id: "cta", label: "An unstable patient, or one who cannot tolerate preparation, undergoes CT angiography to localize the bleed and direct angiographic, endoscopic, or operative therapy.", tone: "caution" },
      { id: "angio", label: "Mesenteric angiography with superselective embolization is used for ongoing bleeding, rebleeding after stabilization, or transfusion of four or more units." },
      { id: "surgery", label: "Surgery is the last step: a targeted segmental resection when the site is localized and uncontrolled, or a subtotal colectomy with end ileostomy when no source was ever found." },
    ],
    edges: [
      { from: "start", to: "resuscitate", label: "Resuscitation precedes every diagnostic step in the unstable bleeder." },
      { from: "resuscitate", to: "upper", label: "Stabilization permits the search for the source, starting with exclusion of an upper source." },
      { from: "upper", to: "exam", label: "Anorectal examination completes the bedside source survey." },
      { from: "exam", to: "scope", label: "Stable patients proceed to prepared colonoscopy as the first test." },
      { from: "exam", to: "cta", label: "Instability diverts the workup to CT angiography instead of colonoscopy." },
      { from: "cta", to: "angio", label: "A localized active bleed on CT angiography goes to angiography for embolization." },
      { from: "angio", to: "surgery", label: "Bleeding that angiography localizes but cannot control goes to targeted resection." },
      { from: "scope", to: "surgery", label: "Bleeding that no study localizes and no therapy controls ends in subtotal colectomy." },
    ],
  }, SCORE),

  sourced({
    id: "block-lg-intraoperative-localization",
    type: "sequence",
    heading: "Intraoperative localization when no source was found",
    steps: [
      { title: "Examine", detail: "The intestines are thoroughly examined for a Meckel diverticulum or a palpable mass." },
      { title: "Transilluminate", detail: "The small bowel is transilluminated to look for angiodysplasia." },
      { title: "Scope", detail: "Intraoperative colonoscopy is performed in the hemodynamically stable patient to find the source before any resection." },
      { title: "Resect", detail: "If no source is identified, the default operation is a subtotal colectomy with end ileostomy." },
    ],
  }, SCORE),

  sourced({
    id: "block-lg-board-answer-current-practic",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Fiser's ABSITE Review keys the classic localization thresholds and sequence: arteriography requires bleeding of at least 0.5 mL/min, a tagged red cell scan requires at least 0.1 mL/min, and the Fiser algorithm sends continued massive hemorrhage to angiography while low-rate or intermittent bleeding goes to colonoscopy first. Fiser also keys diverticular bleeding as the most common cause of lower GI bleeding, stopping spontaneously 75% of the time and recurring in 25%, with hemoclips the best endoscopic therapy, and keys angiodysplasia as a right-sided, venous, less severe bleed that recurs in 80% of patients and is associated with aortic stenosis in 20%. SCORE agrees on the etiology ranking but frames the modern sequence around early colonoscopy, CT angiography for the unstable, and a much weaker nasogastric test than Fiser teaches, as flagged below.",
  }, FISER),

  sourced({
    id: "block-lg-unlocalized-bleed-transfusio",
    type: "warning",
    heading: "The unlocalized bleed and the transfusion cliff",
    text: "Operating without localization is the dangerous end of this algorithm: emergency colectomy for an acute unlocalized lower GI bleed carries mortality of about 2% to 6% with rebleeding under 5%, but mortality climbs to 45% in patients who receive more than 10 units of packed red cells before the operation \u2014 so localization efforts and the decision to operate must move faster than the transfusion count. When the site is known, choose segmental colectomy over subtotal colectomy, which has better postoperative morbidity, bowel frequency, and quality of life. Overall rebleeding after any management ranges from 0% to 40%, is lowest after surgery at 4% to 10%, and is more likely when the source is small bowel, the presenting hematocrit is under 20, or the platelet count is under 140,000 per microliter.",
  }, SCORE),

  sourcedUnits({
    id: "block-lg-splits",
    type: "table",
    heading: "Board answer versus current practice, point by point",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Slowest bleed each study detects", "Fiser: tagged red cell scan at 0.1 mL/min and angiography at 0.5 mL/min", "SCORE: scintigraphy at 0.04 to 0.05 mL/min and CT angiography at 0.3 to 1.0 mL/min; scintigraphy is now largely replaced by CT angiography and kept for slow or intermittent bleeding"],
      ["Nasogastric aspirate", "Fiser: a clear aspirate rules out an upper source", "SCORE: a negative lavage has a negative predictive value of only 64%, so it does not end the upper workup; the 2023 ACG guideline advises against routine lavage"],
      ["First move in massive bleeding", "Fiser: continued massive hemorrhage goes to angiography early", "SCORE: colonoscopy after preparation is the first test, CT angiography for the unstable or those who cannot be prepared, and angiography for ongoing bleeding, rebleeding or 4 or more units transfused"],
      ["How often it bleeds again", "Fiser: diverticular bleeding stops on its own 75% of the time and recurs in 25%; angiodysplasia recurs in 80%", "SCORE: overall rebleeding of 0% to 40% across presentations, 4% to 10% after surgery and 10% to 15% in most series; each figure belongs to its own scope"],
      ["Colonoscopy timing", "Colonoscopy within 24 hours for high-risk ongoing bleeding", "Urgent colonoscopy within 24 hours has not improved rebleeding, mortality or transfusion over 24 to 96 hours in trials"],
      ["Who can go home", "Neither packet source gives a risk score", "The Oakland score: 8 or less in a stable patient identifies a candidate for discharge with outpatient colonoscopy; above 8, admit"],
      ["Operating for a colonic bleed", "Subtotal colectomy for the unlocalized massive colonic bleed", "Most bleeds are now localized, allowing segmental resection with lower morbidity and mortality; subtotal colectomy remains for the colonic bleed that cannot be localized"],
      ["What counts as lower GI bleeding", "Any bleeding distal to the ligament of Treitz", "The 2023 ACG guideline restricts it to a colorectal source and treats small bowel bleeding as a separate entity"],
    ],
  }, [[FISER, SCORE, OE], [FISER, SCORE, OE], [FISER, SCORE], [FISER, SCORE], [SCORE, OE], [OE], [SCORE, OE], [SCORE, OE]]),

  references("block-lg-references", [SCORE, FISER, OE]),
];

export const lowerGastrointestinalBleedingTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005820",
  versionId: "00000000-0000-4000-8000-000000005821",
  slug: "lower-gastrointestinal-bleeding",
  title: "Lower Gastrointestinal Bleeding",
  aliases: ["LGIB", "lower GI bleed", "lower GI bleeding", "hematochezia", "diverticular bleeding", "diverticular hemorrhage", "angiodysplasia", "angioectasia", "massive lower GI hemorrhage", "Oakland score"],
  scoreNodeId: "large-intestine-conditions",
  scoreCategory: "SCORE · Large Intestine · Diseases & Conditions",
  tags: ["large-intestine", "lower-gi-bleeding", "lgib", "diverticular-bleeding", "angiodysplasia", "colonoscopy", "ct-angiography", "embolization", "colectomy", "general-surgery-call", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE],
  blocks,
  reviewedAt: "2026-10-23T00:00:00.000Z",
});
