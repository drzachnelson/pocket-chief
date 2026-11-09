import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACG_LGIB_2023_SOURCE as ACG,
  COLONOSCOPY_QUALITY_2024_SOURCE as QUALITY,
  LOWER_GI_ENDOSCOPY_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Downloads/lower-gi-endoscopy-pocket-chief.docx (2026-11-09). Inline citations stripped at the owner's
// request and kept in the source details. The packet's CORRECTED and CLASSIC vs CURRENT lines become the split table,
// which also records where it departs from the SCORE-keyed lower-gastrointestinal-bleeding topic. Surveillance
// intervals live in colonic-polyps.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-le-summary",
    type: "summary",
    heading: "At a glance",
    text: "Colonoscopy is screening, diagnosis, and therapy in one procedure, and its quality is measured: **adenoma detection rate at least 35%, cecal intubation at least 95%, withdrawal at least 8 minutes, perforation under 1 in 1,000**. Small polyps are cold snared, pedunculated ones hot snared with a stalk-bleeding plan, and large flat ones removed by EMR. A diagnostic perforation is mechanical, sigmoid, and large and usually goes to surgery; a therapeutic one is thermal, right-sided, and small and usually takes clips. In lower GI bleeding the unstable patient goes to CT angiography first, and most stable patients get a non-urgent inpatient colonoscopy.",
  }, PACKET),

  sourced({
    id: "block-le-technique",
    type: "bullets",
    heading: "Technique",
    items: [
      "Left lateral decubitus is standard; **position changes** keep the examined segment nondependent and raise adenoma detection. Use supine for an exam through a colostomy.",
      "Keep the lumen in view or use a controlled slide-by, and never push blindly. Reduce sigmoid alpha and N loops with withdrawal and torque, abdominal pressure, position change, or variable stiffness.",
      "**CO2 insufflation** is preferred over air: faster absorption means less distension, pain, and barotrauma. Water exchange during insertion improves adenoma detection.",
      "Photo-document the appendiceal orifice and ileocecal valve, and the terminal ileum if intubated.",
      "On withdrawal, wash debris, look behind folds, keep the colon distended, take a second look at the right colon forward or retroflexed, and retroflex in the rectum.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-quality",
    type: "table",
    heading: "Quality targets",
    columns: ["Indicator", "Target"],
    rows: [
      ["Adenoma detection rate, age 45 or older", "**At least 35%**, and above 50% after a positive FIT or stool DNA test"],
      ["Sessile serrated lesion detection rate", "More than 6%"],
      ["Cecal intubation rate", "At least 95% in screening exams and 90% overall"],
      ["Mean withdrawal time in normal exams", "**At least 8 minutes**"],
      ["Adequate bowel preparation", "More than 90% of exams, with a Boston Bowel Preparation Scale of at least 2 in every segment"],
      ["Perforation", "Under 1 in 1,000 for screening and diagnostic exams; under 1% with polypectomy"],
      ["Post-polypectomy bleeding", "1 in 100 or fewer"],
    ],
  }, QUALITY),

  sourced({
    id: "block-le-adr",
    type: "bullets",
    heading: "↳ Why adenoma detection matters",
    items: [
      "Adenoma detection is the indicator most closely tied to interval cancer: each 1% rise lowers post-colonoscopy CRC by 3% and fatal CRC by 5%.",
      "Older targets were 25% (30% for men and 20% for women) with a 6-minute withdrawal time; 9 minutes was the aspirational goal.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-screening",
    type: "bullets",
    heading: "Screening, incomplete exams, and surveillance",
    items: [
      "Average risk: colonoscopy every 10 years from 45 to 75, individualized from 76 to 85.",
      "A first-degree relative with CRC: colonoscopy every 5 years from age 40 or 10 years before the relative's diagnosis, whichever comes first.",
      "A positive FIT or stool DNA test needs prompt colonoscopy; cancer risk rises when it is delayed 10 months or more.",
      "Poor prep or an incomplete exam: repeat within 1 year, sooner if advanced neoplasia was found; CT colonography, balloon-assisted colonoscopy, or capsule colonoscopy can complete it.",
      "Post-polypectomy intervals are in [[Colonic Polyps]]. More than 20 serrated polyps should raise serrated polyposis.",
      "EPoS II is testing whether the first surveillance after high-risk adenomas can wait 5 years instead of 3; the US standard is still 3 years.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-polypectomy",
    type: "bullets",
    heading: "Polypectomy technique",
    items: [
      "**Cold snare** for polyps under 10 mm, which lowers delayed bleeding against hot snare; cold resection is also reasonable for most 10–15 mm polyps and for sessile serrated lesions of 10 mm or more.",
      "**Hot snare for pedunculated polyps 10 mm or larger**, because the stalk carries a feeding vessel. A stalk 5 mm or wider and a head 20 mm or larger raise bleeding risk; prevent it with dilute epinephrine into the stalk, a detachable loop (endoloop), or clips.",
      "**EMR** is first-line for large nonpedunculated polyps; snare-tip soft coagulation of the margin cuts recurrence below 5%.",
      "**Prophylactic clipping only when all three apply**: lesion larger than 2 cm, proximal to the splenic flexure, removed with electrocautery. Do not clip routinely under 20 mm, and close completely: bleeding was 19.6% with partial against 4.8% with complete closure in CLIPPER.",
      "Cut- and coag-predominant currents give similar serious adverse events, complete resection, and recurrence; cut current causes more immediate bleeding (17% against 11%) but the same delayed bleeding (5.0% against 5.7%).",
    ],
  }, PACKET),

  sourced({
    id: "block-le-perforation-table",
    type: "table",
    heading: "Colonoscopic perforation: diagnostic against therapeutic",
    columns: ["Feature", "Diagnostic colonoscopy", "Therapeutic colonoscopy"],
    rows: [
      ["Mechanism", "**Mechanical** shaft or loop pressure, or barotrauma", "**Thermal** injury from snare, EMR, or ESD"],
      ["Typical site", "**Sigmoid** (83%), or cecum with barotrauma", "**Right colon and cecum** (ascending 27%)"],
      ["Defect", "Larger and often recognized late", "Small and recognized during the procedure"],
      ["Usual management", "Surgery (75%)", "Endoscopic clip closure (75%)"],
    ],
  }, PACKET),

  sourced({
    id: "block-le-perforation",
    type: "bullets",
    heading: "↳ Recognizing and managing perforation",
    items: [
      "Incidence is 0.66 per 1,000 overall: 0.19 per 1,000 diagnostic against 2.09 therapeutic, about tenfold. About 5% of perforations are fatal.",
      "Risk factors: diverticulosis, IBS, corticosteroids, low-volume or non-GI endoscopists, and therapeutic procedures.",
      "Persistent pain and distension, then peritonitis: pain in 75%, tenderness in 50%, fever in 28.6%, distension in 25%. CT is more sensitive than plain films for free air.",
      "**Endoscopic closure** with through-the-scope or over-the-scope clips works for a perforation recognized immediately, under 2 cm, in a well-prepped colon, without contamination or instability, matching surgical success and shortening the stay by about 9 days.",
      "**Surgery** for peritonitis, sepsis or instability, a large defect, delayed diagnosis, or failed closure; get a surgical consult for every perforation. Small, contained perforations in well patients can be managed with bowel rest, IV antibiotics, and serial exams.",
      "**Post-polypectomy coagulation syndrome** is the classic distractor: a transmural burn without perforation, with pain, fever, leukocytosis, and peritoneal signs but **no free air on CT**, treated with antibiotics and bowel rest.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-lgib-context",
    type: "bullets",
    heading: "Lower GI bleeding: what the endoscopist needs",
    items: [
      "Lower GI bleeding comes from distal to the ileocecal valve within reach of colonoscopy; the old obscure bleeding between Treitz and the ileocecal valve is now small bowel bleeding. Full workup is in [[Lower Gastrointestinal Bleeding]].",
      "Causes by frequency: diverticulosis, then ischemic colitis, colorectal neoplasia, and angiodysplasia; also post-polypectomy bleeding, hemorrhoids, IBD, and radiation proctitis.",
      "Diverticular bleeding is ruptured **vasa recta** at the neck or dome: arterial, painless, without mucosal inflammation, which may explain why antiplatelets rather than anticoagulants predict recurrence. Most diverticula are sigmoid, but right-sided ones bleed more often for their number.",
      "Angiodysplasia is mostly right colon and cecum in older adults, associated with aortic stenosis (Heyde syndrome) and ESRD, and bleeds low-grade and recurrently.",
      "Lower GI bleeding is up to 30% of major GI bleeds, about 36 hospitalizations per 100,000 a year, and mostly stops on its own; emergency surgery is now needed in only 0.2%.",
      "NSAIDs and aspirin raise risk; P2Y12 inhibitors raise second diverticular bleeds (HR 1.47); warfarin triples GI bleeding; DOACs do not raise new diverticular bleeding, though rivaroxaban carries more risk than apixaban (HR 1.53).",
      "Hematochezia with hemodynamic instability: exclude an upper source first with NG lavage or EGD, since 10%–15% of severe hematochezia is upper GI.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-lgib-flow",
    type: "flow",
    heading: "↳ Triage of acute lower GI bleeding",
    nodes: [
      { id: "start", label: "Acute hematochezia: resuscitate, and exclude an upper source if the patient is unstable" },
      { id: "unstable", label: "CT angiography first", tone: "caution" },
      { id: "embolize", label: "Prompt catheter angiography with superselective embolization, or colonoscopy at an experienced center" },
      { id: "stable", label: "Calculate the Oakland score" },
      { id: "discharge", label: "Discharge for outpatient colonoscopy", tone: "good" },
      { id: "admit", label: "Admit for non-urgent inpatient colonoscopy" },
    ],
    edges: [
      { from: "start", to: "unstable", label: "Shock index 1 or higher, or bleeding began within 4 hours" },
      { from: "unstable", to: "embolize", label: "CTA shows extravasation" },
      { from: "start", to: "stable", label: "Shock index under 1" },
      { from: "stable", to: "discharge", label: "Oakland score 8 or less" },
      { from: "stable", to: "admit", label: "Oakland score above 8" },
    ],
  }, ACG),

  sourced({
    id: "block-le-imaging",
    type: "table",
    heading: "↳ Localization tests by bleeding rate",
    columns: ["Modality", "Minimum detectable rate", "Strengths", "Limitations"],
    rows: [
      ["Tagged red cell scan", "**0.05–0.1 mL/min**", "Most sensitive test; no prep; repeat imaging up to about 24 hours catches intermittent bleeding", "Poor localization: wrong site in 10%–33%, localization specificity 33.3% against 90.9% for CTA, so wrong-site surgery is a risk"],
      ["CT angiography", "0.3–0.5 mL/min", "Quick, localizes in close to 100%, and gives IR a roadmap", "IV contrast and nephropathy risk"],
      ["Catheter angiography", "0.5–1.0 mL/min", "Diagnostic and therapeutic through superselective embolization", "Invasive, with low yield when bleeding is slow or intermittent"],
      ["Colonoscopy", "Not rate-dependent", "First-line in stable patients, diagnosing and treating in one session", "Needs a purge prep"],
    ],
  }, PACKET),

  sourced({
    id: "block-le-hemostasis",
    type: "bullets",
    heading: "Endoscopic hemostasis",
    items: [
      "**Diverticular bleeding**: through-the-scope clips, on the vessel or closing the diverticulum, or endoscopic band ligation.",
      "**Post-polypectomy bleeding**: treat immediate bleeding endoscopically. Delayed bleeding often stops; repeat colonoscopy is optional if it has stopped and required if it continues.",
      "Through-the-scope clips are first-line, with 93%–100% hemostasis and up to 12% rebleeding. Alternatives are thermal therapy, argon plasma coagulation, over-the-scope clips, or epinephrine plus a thermal or mechanical method; hemostatic powder achieved 97% initial hemostasis.",
      "**Angiodysplasia**: argon plasma coagulation.",
      "**Never use epinephrine alone**; always pair it with a second method.",
      "Prep is a 4–6 L PEG purge, by NG tube if the patient cannot drink it and aspiration risk is low.",
    ],
  }, PACKET),

  sourcedUnits({
    id: "block-le-antithrombotics",
    type: "bullets",
    heading: "Resuscitation, timing, and antithrombotics",
    items: [
      "Transfuse to hemoglobin above 7 g/dL, or 9 g/dL with significant cardiovascular disease or an expected delay to intervention.",
      "Keep platelets above 30,000/µL in severe bleeding and above 50,000/µL before endoscopy.",
      "Endoscopy is generally safe with an INR of 2.5 or less. Reverse a VKA or a DOAC taken within 24 hours only for life-threatening bleeding that does not respond to resuscitation.",
      "**Do not give tranexamic acid**: it raises thromboembolism and seizure risk without benefit.",
      "Most inpatients get a **non-urgent colonoscopy**, because colonoscopy within 24 hours does not reduce rebleeding. None is needed if a high-quality colonoscopy in the past 12 months showed diverticulosis without neoplasia, bleeding has stopped, and nothing is new.",
      "After a diverticular bleed: stop non-aspirin NSAIDs and primary-prevention aspirin, continue secondary-prevention aspirin, and decide on P2Y12 inhibitors with the cardiology team.",
      "On dual antiplatelet therapy, continue aspirin and hold the P2Y12 inhibitor, resuming it within 5 days if a stent was placed within the past year.",
      "Resume anticoagulation, usually within 7 days, when it is needed to prevent thromboembolism.",
    ],
  }, [[PACKET], [ACG], [ACG], [ACG], [ACG], [ACG], [ACG], [ACG]]),

  sourced({
    id: "block-le-ir-surgery",
    type: "bullets",
    heading: "When endoscopy fails: IR and surgery",
    items: [
      "**Superselective embolization** of the vasa recta with microcoils or N-butyl cyanoacrylate glue; collateral flow is minimal at that level, so embolize as small an area as possible. Bowel ischemia is uncommon but real.",
      "Embolization buys time for stabilization and bowel prep before an elective resection; 7%–25% of patients eventually need surgery for bleeding or the underlying disease.",
      "Recurrent bleeding with adequate negative EGD and colonoscopy: capsule endoscopy or CT enterography next, with provocative angiography (heparin or tPA) as a last resort.",
      "Operate for bleeding that continues after endoscopic and angiographic therapy, recurrent significant bleeding when repeat embolization is unsafe, or underlying disease needing resection.",
      "A localized source gets **segmental colectomy**; a blind segmental hemicolectomy rebleeds more and is not recommended. Unlocalized massive bleeding, with upper and small bowel sources excluded, gets **subtotal colectomy**, which has more morbidity and mortality but less rebleeding.",
      "When no source has been found, localize at operation with EGD, intraoperative colonoscopy or enteroscopy, a search for Meckel diverticulum, palpation for masses, and transillumination of the small bowel for angiodysplasia.",
      "In national data, 85% of operations were partial and 15% total colectomies; total colectomy brought more ileus, cardiac, and renal complications and higher mortality, and its patients more often had over 4 units before surgery. Surgery after a positive CTA had 20% major complications.",
      "Emergency colectomy for bleeding carries 12.2% 30-day mortality, higher with age (OR 1.42 per decade), functional dependence (OR 2.14), and higher ASA class, and lower with laparoscopy (OR 0.46) and a higher hematocrit.",
    ],
  }, PACKET),

  sourced({
    id: "block-le-rebleeding",
    type: "bullets",
    heading: "↳ Diverticular rebleeding",
    items: [
      "Recurrence runs about 3,626 per 100,000 person-years after a first diverticular bleed, higher with older age and P2Y12 inhibitor use; anticoagulants were not associated with recurrence, and stopping them raised ischemic stroke.",
      "Antithrombotic use predicts rebleeding (HR 2.38, and 3.88 with multiple agents).",
    ],
  }, PACKET),

  sourced({
    id: "block-le-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Colonoscopy timing in lower GI bleeding", "Within 24 hours in high-risk patients", "Non-urgent inpatient colonoscopy, since 24-hour colonoscopy does not reduce rebleeding"],
      ["First imaging for active bleeding", "Tagged red cell scan as the screen before angiography", "CT angiography; the red cell scan has a rapidly diminishing role, for when CTA is unavailable or contraindicated"],
      ["Tagged red cell scan threshold", "0.04–0.05 mL/min", "0.05–0.1 mL/min; 0.1 mL/min is the safest answer"],
      ["Angiography trigger", "4 or more units of red cells", "More than 5 units in 24 hours or instability; SBP 90 or less with 5 or more units predicts a positive angiogram, and the over-4-unit figure described patients who went on to total colectomy"],
      ["Embolization success", "97%", "High technical success, without one confirmed figure"],
      ["Anticoagulation reversal", "Reverse when the INR is above 2.5", "Endoscope at an INR of 2.5 or less, and reverse only life-threatening bleeding unresponsive to resuscitation"],
      ["Ostomy after subtotal colectomy for bleeding", "Always end ileostomy", "Ileorectal anastomosis in a stable patient; end ileostomy for instability, massive transfusion, or significant comorbidity"],
      ["Emergency colectomy mortality", "2%–6%, rising to 45% with more than 10 units", "12.2% at 30 days in contemporary national data, though more transfusion still means higher mortality"],
      ["Diverticular rebleeding predictors", "Hematocrit under 20 and platelets under 140,000, with 4%–10% rebleeding after surgery", "Medications (NSAIDs, antiplatelets) drive rebleeding, and rebleeding after surgery is low"],
      ["Colonoscopy quality targets", "Adenoma detection 25% and withdrawal 6 minutes", "Adenoma detection at least 35% and withdrawal at least 8 minutes"],
      ["Screening start", "Age 50", "Age 45"],
    ],
  }, PACKET),

  sourced({
    id: "block-le-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Hematochezia with shock: exclude an upper source, then CTA, then IR embolization if CTA is positive.",
      "Bleeding-rate ladder: tagged red cells 0.05–0.1, CTA 0.3–0.5, angiography 0.5–1.0 mL/min; the more sensitive the test, the worse it localizes.",
      "Never a blind segmental colectomy: localized means segmental, unlocalized massive bleeding means subtotal colectomy.",
      "Diagnostic perforation: sigmoid, mechanical, large, surgery. Therapeutic perforation: right colon, thermal, small, clips.",
      "Pain, fever, and peritoneal signs with no free air after hot polypectomy: post-polypectomy coagulation syndrome.",
      "Clip only lesions over 2 cm, proximal to the splenic flexure, removed with cautery.",
      "After a diverticular bleed: stop NSAIDs and primary-prevention aspirin, continue secondary-prevention aspirin, resume anticoagulation within about 7 days, and give no tranexamic acid.",
    ],
  }, PACKET),

  references("block-le-references", [PACKET, ACG, QUALITY]),
];

export const lowerGiEndoscopyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008420",
  versionId: "00000000-0000-4000-8000-000000008421",
  slug: "lower-gi-endoscopy",
  title: "Lower GI Endoscopy",
  aliases: ["colonoscopy", "lower endoscopy", "flexible sigmoidoscopy", "adenoma detection rate", "cecal intubation rate", "colonoscopy withdrawal time", "colonoscopy quality indicators", "polypectomy", "cold snare polypectomy", "hot snare polypectomy", "prophylactic clipping", "colonoscopic perforation", "iatrogenic colon perforation", "Boston Bowel Preparation Scale"],
  scoreNodeId: "endoscopy-procedures",
  scoreCategory: "SCORE · Endoscopy · Operations & Procedures",
  tags: ["endoscopy", "colonoscopy", "polypectomy", "lower-gi-bleeding", "perforation", "quality", "colorectal", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [ACG, QUALITY],
  blocks,
  reviewedAt: "2026-11-09T00:00:00.000Z",
});
