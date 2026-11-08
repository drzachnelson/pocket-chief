import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

// Clinical draft: regular library entry held in an unmerged batch PR pending Zach's sign-off.
const PACKET = "00000000-0000-4000-8000-000000007200";
const OE = "00000000-0000-4000-8000-000000007201";
const GUIDELINE = "00000000-0000-4000-8000-000000007202";
const STS = "00000000-0000-4000-8000-000000007203";
const WEI = "00000000-0000-4000-8000-000000007204";
const PSS = "00000000-0000-4000-8000-000000007205";
const HAMMAN = "00000000-0000-4000-8000-000000007206";

const blocks: TopicBlock[] = [
  sourced({
  "id": "esophageal-perforation-1",
  "type": "summary",
  "heading": "Recognize and control contamination",
  "text": "Esophageal perforation is a full-thickness wall breach that spreads upper-GI contents into the neck, mediastinum, pleura or abdomen. Lack of serosa permits rapid mediastinitis and sepsis. **Resuscitate, keep NPO, give broad-spectrum antibiotics, drain contamination, close or control the leak, relieve obstruction and establish nutrition.** Physiology, containment, viable tissue and underlying esophageal disease determine treatment; elapsed time predicts risk but does not alone prohibit repair."
}, OE),
  sourced({
  "id": "esophageal-perforation-2",
  "type": "table",
  "heading": "Causes and clinical clues",
  "columns": [
    "Cause or location",
    "High-yield features"
  ],
  "rows": [
    [
      "Iatrogenic injury",
      "Most common cause, sometimes up to 90% in selected series: endoscopy/dilation, POEM, TEE, NG/intubation or surgery. Cervical injury near the cricopharyngeus/Killian triangle is classic; other sites include aortic-arch/left-mainstem narrowing and distal esophagus/GEJ, especially at a stricture or tumor. Injury may be seen immediately or present days later."
    ],
    [
      "Boerhaave syndrome",
      "Forceful vomiting against a nonrelaxing cricopharyngeus causes a longitudinal left posterolateral distal tear, usually 2–3 cm above the GEJ (Fiser 2–4 cm). Often follows binge eating/alcohol in men aged 50–70; men comprise 75–80%, and left-pleural communication is reported in 80–90%. Accounts for about 15% of perforations."
    ],
    [
      "Other etiologies",
      "Foreign body, caustic ingestion, penetrating or blunt trauma (shear at fixed points), and malignancy. Penetrating injury exceeds blunt and often involves the neck. Untreated cancer rarely perforates directly but may fistulize; dilation, stenting and radiation can perforate or fistulize malignant disease."
    ],
    [
      "Location-specific symptoms",
      "Cervical injury: neck pain, dysphagia, odynophagia and crepitus, sometimes indolent because fascial attachments limit spread. Thoracic injury: chest pain/dyspnea; abdominal injury: epigastric pain/peritonitis. Any new pain after instrumentation or retching warrants suspicion."
    ],
    [
      "Important mimics and red flags",
      "MI-negative chest pain with left effusion, empyema, pericarditis or pneumothorax may conceal rupture. Boerhaave usually has little bleeding; Mallory–Weiss is a bleeding mucosal tear without full-thickness perforation. Hypotension, respiratory compromise, fever >38.5 °C, leukocytosis or tension physiology suggests severe disease."
    ]
  ]
}, OE),
  sourced({
  "id": "esophageal-perforation-3",
  "type": "bullets",
  "heading": "History, frequency, and bedside traps",
  "items": [
    "Ask about recent procedures, retching, alcohol, unusual food/foreign bodies, cannabis-associated emesis and previous dysphagia/achalasia, stricture, eosinophilic esophagitis or cancer. A missed instrumental tear can declare itself days later.",
    "Mackler triad is vomiting, chest pain and subcutaneous emphysema; it occurs in only about 14% (5.1% in another series), so its absence excludes nothing. Untreated Boerhaave can deteriorate within hours and approaches 100% mortality in historical descriptions.",
    "The supplied review estimates incidence at 3.1/million/year; procedural perforation risks are 0.03–0.11% for diagnostic EGD, 2–5% for pneumatic dilation and 0.3–9% for POEM, with variation by procedure and series. Reported overall morbidity reaches 40% and mortality 27%; expanding therapeutic endoscopy increases iatrogenic presentations."
  ]
}, OE),
  sourcedUnits({
  "id": "esophageal-perforation-4",
  "type": "table",
  "heading": "Imaging and complementary tests",
  "columns": [
    "Test",
    "Role and limits"
  ],
  "rows": [
    [
      "Contrast-enhanced CT / CT esophagography",
      "First-line in a stable patient; oral contrast when feasible demonstrates leakage and maps mediastinal air/fluid, abscess, pleural effusion, hydropneumothorax, air-fluid collections and peritoneal extension. In Wei’s ED series sensitivity was 100%, specificity 79.8% and NPV 100%; adding fluoroscopy did not improve accuracy there. These are study results, not a universal guarantee after a negative CT."
    ],
    [
      "Fluoroscopic esophagram",
      "Problem-solving or confirmation: water-soluble first, then thin barium if negative/equivocal but suspicion persists. Wei reported sensitivity/specificity 77.8%/98.9%; the supplied meta-analysis reports 69.2%/98.4%. Water-soluble studies can miss 22–50%, barium 10–12%; combined testing reached about 90% sensitivity historically."
    ],
    [
      "Flexible endoscopy",
      "Useful for equivocal CT, operative localization/leak testing, unstable trauma and treatment; defines defect location, length, multiplicity and underlying disease. Subtle tears may be missed; insufflation may enlarge a tear or contaminate further. Use experienced operators and cautious CO2 insufflation."
    ],
    [
      "Chest/upright abdominal radiographs",
      "Support suspicion with mediastinal or subcutaneous air, pleural effusion, hydropneumothorax or air-fluid levels; not diagnostic, and normal early films do not exclude injury (only 42.9% positive early in one Boerhaave series)."
    ],
    [
      "Pleural-fluid analysis",
      "Food in a chest tube or salivary-amylase-rich exudate with very low pH (around 6) strongly suggests esophageal communication. It complements, rather than replaces, anatomical evaluation."
    ],
    [
      "Trauma investigation",
      "For a concerning transmediastinal projectile trajectory, CT/formal esophagram and flexible esophagoscopy are complementary; bronchoscopy evaluates associated airway injury. Resuscitation and control of associated injuries remain first."
    ]
  ]
}, [[OE, WEI, GUIDELINE], [OE, WEI], [OE, GUIDELINE], [OE], [OE], [OE, PACKET]]),
  sourced({
  "id": "esophageal-perforation-5",
  "type": "bullets",
  "heading": "Immediate measures and active nonoperative care",
  "items": [
    "Initiate IV resuscitation, NPO, aerobic/anaerobic antibiotics and PPI when suspected. Drain tension pneumothorax or a large compressive effusion immediately rather than waiting for fluoroscopy. Septic shock or noncontained contamination demands urgent source control.",
    "Antibiotic examples include piperacillin–tazobactam, ampicillin–sulbactam or a carbapenem. Fiser includes yeast coverage routinely; the supplied current review considers fluconazole with hospitalization, prior antibiotics, long-term acid suppression, immunosuppression or failure to improve. Antifungal choice is risk/culture directed; optimal antibiotic regimen and duration lack consensus.",
    "Nonoperative management requires stable physiology, no sepsis, a small contained/self-draining leak, minimal contamination, no abdominal free leak, and no obstructing cancer/distal obstruction. Early presentation favors success; a late presentation already tolerated may still qualify. Specialized imaging, continuous reassessment and immediate thoracic-surgical backup are essential.",
    "Active nonoperative care includes endoscopically placed NG decompression, PPI, early distal enteral feeding or parenteral nutrition, endoscopic leak closure when appropriate, and image-guided drainage or VATS/decortication of collections. Any worsening triggers renewed imaging and operative source control.",
    "Supplied schedules vary from NPO 48–72 hours to 5–7 days, with antibiotics 7–14 days; these are source-specific examples, not validated universal durations. Obtain contrast assessment before oral intake and individualize to healing and source control. A combined minimally invasive series achieved 68% nonoperative success with 6% mortality; conservative care alone for spontaneous rupture had 22% pooled mortality and 45.5% in one selected/unfit cohort."
  ]
}, OE),
  sourcedUnits({
  "id": "esophageal-perforation-6",
  "type": "table",
  "heading": "Pittsburgh Perforation Severity Score",
  "columns": [
    "Points",
    "Variables"
  ],
  "rows": [
    [
      "One point each",
      "Age >75, heart rate >100, WBC >10,000/µL, pleural effusion."
    ],
    [
      "Two points each",
      "Temperature >38.5 °C, noncontained leak, respiratory compromise (RR >30, increasing oxygen requirement or ventilation), diagnosis delayed >24 hours."
    ],
    [
      "Three points each",
      "Esophageal cancer and hypotension (systolic pressure <90 mm Hg)."
    ],
    [
      "Interpretation",
      "Total 0–18: ≤2 low, 3–5 intermediate, >5 high; original mortality estimates were 1%, 3%, 27%. WSES suggests ≤2 can support nonoperative selection, but a Boerhaave cohort did not validate outcome discrimination; the score does not override clinical deterioration."
    ]
  ]
}, [[OE, PSS], [OE, PSS], [OE, PSS], [OE, GUIDELINE]]),
  sourced({
  "id": "esophageal-perforation-7",
  "type": "table",
  "heading": "Endoscopic closure requires drainage",
  "columns": [
    "Modality",
    "Selection and follow-up",
    "Limitations and supplied evidence"
  ],
  "rows": [
    [
      "TTS/OTSC clips",
      "Fresh, discrete defects <2 cm; one algorithm uses TTS <1 cm and OTSC 1–2 cm. Recognized iatrogenic tears should be closed during the procedure, followed by assessment for contamination.",
      "Friable, inflamed or delayed edges reduce success; size alone does not determine suitability."
    ],
    [
      "Covered stent",
      "Larger defects, incomplete clip closure, selected iatrogenic/spontaneous injuries or postoperative leak; cover several centimeters above/below. Reassess and generally retain at least 2–4 weeks; one series removed at mean 41 days.",
      "If surgical exploration is needed, stent afterward because it limits mobility and may dislodge during manipulation. Sealing does not drain the chest. Avoid near the cricopharyngeus; GEJ crossing migrates more. Radial force can cause pain, airway compression, erosion/bleeding, end strictures and rarely aortic/airway fistula. Migration is reported at 8.7–18%; clips/suture fixation can reduce it."
    ],
    [
      "Endoscopic vacuum therapy",
      "Sponge placed at/over/in the defect or cavity with repeated endoscopic exchanges, commonly about every 3 days; SCORE requires removal/inspection at least weekly. Avoid direct contact with airway or great vessels.",
      "Reported perforation closure 96% with median 17 days; Boerhaave primary success 80% versus 43.8% without EVT in one study. Delay, sepsis and malnutrition predict failure; repeated procedures are required."
    ],
    [
      "Comparative evidence",
      "A review cited by WSES reports stent success/mortality 88%/7.5% versus surgery 83%/17%; a mixed upper-GI-defect meta-analysis favored EVT for closure by 21 percentage points, mortality by 12 points and adverse events by 24 points.",
      "Mixed postoperative leaks and selection bias limit application to perforation. One traumatic cohort found no EVT/stent success difference; no definitive prospective comparison or RCT ranks modalities. US stenting rose 7% to 30% (2007–2014) without clear outcome improvement."
    ]
  ]
}, OE),
  sourced({
  "id": "esophageal-perforation-8",
  "type": "flow",
  "heading": "Select definitive source control",
  "nodes": [
    {
      "id": "start",
      "label": "Confirmed or strongly suspected perforation receives resuscitation, antibiotics, NPO, decompression and an immediate drainage/nutrition plan."
    },
    {
      "id": "contained",
      "label": "Stable, contained/self-draining leak with minimal contamination and no obstruction or sepsis permits closely supervised nonoperative/endoscopic management.",
      "tone": "good"
    },
    {
      "id": "surgery",
      "label": "Instability, sepsis, free spill, peritonitis, associated injuries, necrosis, unrelieved obstruction or failed lesser treatment requires urgent operation.",
      "tone": "caution"
    },
    {
      "id": "repair",
      "label": "Viable repairable tissue favors debridement, tension-free closure, vascularized buttress, wide drainage and distal feeding access, even after delayed diagnosis."
    },
    {
      "id": "salvage",
      "label": "Destroyed, extensively diseased or nonrepairable esophagus may need T-tube controlled fistula, damage-control drainage, exclusion/diversion or esophagectomy.",
      "tone": "caution"
    }
  ],
  "edges": [
    {
      "from": "start",
      "to": "contained"
    },
    {
      "from": "start",
      "to": "surgery"
    },
    {
      "from": "surgery",
      "to": "repair"
    },
    {
      "from": "surgery",
      "to": "salvage"
    }
  ]
}, OE),
  sourcedUnits({
  "id": "esophageal-perforation-9",
  "type": "table",
  "heading": "Exposure by injury level",
  "columns": [
    "Level",
    "Approach and landmarks"
  ],
  "rows": [
    [
      "Cervical",
      "Left neck along medial/anterior SCM or collar incision. Divide omohyoid, retract carotid sheath laterally, and divide middle thyroid vein/inferior thyroid artery as needed; gentle dissection protects adjacent structures."
    ],
    [
      "Upper/middle thoracic",
      "Right posterolateral thoracotomy or VATS; the supplied operative review suggests 6th–7th interspace. Divide inferior pulmonary ligament and open posterior mediastinal pleura; esophagus lies behind airway and anterior/superficial to aorta."
    ],
    [
      "Distal thoracic",
      "Usually left thoracotomy/VATS (review: 7th–8th interspace), dividing inferior pulmonary ligament and opening posterior mediastinal pleura to expose esophagus anterior to aorta. CT defect and effusion side can change the chosen approach."
    ],
    [
      "Very distal/abdominal",
      "Laparoscopy/laparotomy, selected transhiatal exposure or left thoracoabdominal incision when needed to reach both compartments; fundoplication can buttress an abdominal repair."
    ]
  ]
}, [[PACKET], [PACKET, OE], [PACKET, OE], [PACKET, OE]]),
  sourcedUnits({
  "id": "esophageal-perforation-10",
  "type": "sequence",
  "heading": "Primary repair: expose the entire mucosal injury",
  "steps": [
    {
      "title": "Drain and debride",
      "detail": "Control soilage, debride devitalized tissue and drain all involved spaces. SCORE recommends drainage even for small associated pleural effusions; complex collections need VATS/thoracotomy and decortication to re-expand lung. Open pleura anterior and posterior to the esophagus to drain mediastinum."
    },
    {
      "title": "Extend the myotomy",
      "detail": "Incise muscle longitudinally above and below the visible injury until the full mucosal tear is exposed; it commonly extends beyond the muscular defect. Missing this extent is a major cause of persistent postoperative leak."
    },
    {
      "title": "Close without narrowing",
      "detail": "Perform tension-free closure, traditionally two layers with absorbable mucosa/submucosa and permanent muscle sutures; repair over a bougie/esophagoscope if needed. Intraoperative endoscopy can localize and leak-test. Single-layer repair is also used in appropriate tissue."
    },
    {
      "title": "Buttress and relieve obstruction",
      "detail": "Use viable intercostal muscle, pleura, pericardial fat/pericardium or other vascularized tissue; options include diaphragm, serratus/latissimus, omentum or fundoplication. Separate concomitant airway repair with a flap to prevent fistula. Relieve distal obstruction; operative achalasia-dilation injury may need contralateral myotomy and partial fundoplication."
    },
    {
      "title": "Drain and feed distally",
      "detail": "Leave large-bore drains in contaminated spaces near the repair, or near but not in an unrepaired defect. Establish feeding jejunostomy and NG/gastrostomy decompression as appropriate. Preserve gastroepiploic supply if the stomach may be needed later; PEG can compromise a future conduit."
    },
    {
      "title": "Verify healing",
      "detail": "SCORE recommends esophagram within 1 week after repair or stenting, and before oral intake. Persistent sepsis warrants CT for undrained collections and contrast assessment for leak; continued leakage or failure to thrive requires escalation."
    }
  ]
}, [[PACKET, OE], [PACKET, OE], [PACKET, OE, GUIDELINE], [PACKET, OE], [PACKET, OE], [PACKET, OE]]),
  sourced({
  "id": "esophageal-perforation-11",
  "type": "bullets",
  "heading": "Salvage, nutrition, and special settings",
  "items": [
    "If repair cannot hold, a T-tube can create a controlled fistula; wide drainage is a damage-control option. Exclusion/diversion or esophagectomy is reserved for major destruction, necrosis, cancer or end-stage intrinsic disease. Routine cervical diversion is unnecessary after a successful repair. Immediate reconstruction requires stability and limited contamination; otherwise stage reconstruction after sepsis resolves and nutrition recovers.",
    "In unipolar exclusion, a stapled blind-ending esophagus **requires NG decompression and revision within days** to avoid stump leakage. Bipolar exclusion adds cervical esophagostomy/spit fistula and gastrostomy, with later reconstruction. A supplied diversion series reported survival to discharge 84.1%, reconstruction in 57.1% at median 6.3 months, and 42% gastric-conduit anastomotic leak, usually managed conservatively.",
    "Favor jejunostomy when future esophagectomy is plausible; use PEG only when that concern is low. If a decompressive gastrostomy is necessary, keep it away from the right gastroepiploic arcade and preserve potential conduit vessels. The supplied NCCN feeding preference is extrapolated from cancer care.",
    "Small contained cervical injuries may be treated with NPO/antibiotics ± drainage; otherwise attempt left-neck repair with SCM/strap-muscle buttress and drainage. If repair is impossible, drainage ± cervical esophagostomy controls contamination. Cervical stents fit poorly.",
    "Boerhaave usually contaminates more heavily: stent or EVT must be paired with drainage. Stable resectable perforated cancer may need esophagectomy; unresectable/unfit patients may receive covered stent plus drainage.",
    "Traumatic perforation generally favors operative primary repair with flap rather than a first-line stent. The supplied EAST multicenter study reports leak in 80% after stent versus 22.6% after repair and overall mortality 9.8%; EAST study data are not a dedicated practice guideline. Instability, noncontained leak or severe sepsis mandates surgery. For traumatic neck repair, WSES describes contralateral drainage and avoiding adjacent tracheostomy."
  ]
}, OE),
  sourcedUnits({
  "id": "esophageal-perforation-12",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Board/supplied position",
    "Clinical interpretation"
  ],
  "rows": [
    [
      "First test and endoscopy",
      "Fiser: chest film, water-soluble swallow then barium, “no EGD”; SCORE favors esophagram but uses complementary endoscopy, especially in trauma.",
      "WSES and the verified STS 2026 abstract favor CT esophagography first in stable patients. Selective fluoroscopy/endoscopy resolves persistent uncertainty; immediate therapeutic closure is appropriate when an instrumental tear is recognized."
    ],
    [
      "Timing of repair",
      "Fiser favors primary repair <24 hours with little soilage; >48 hours/heavy contamination favors neck drainage or thoracic resection/exclusion-diversion. SCORE gives principles without mandatory hour thresholds.",
      "Delay worsens prognosis, but viable tissue, contamination, underlying disease and physiology govern repair versus salvage. WSES supports primary repair when feasible, and single- or double-layer closure according to setting; a delayed presentation alone is not an automatic esophagectomy indication."
    ],
    [
      "Boerhaave detail and eponym",
      "Fiser specifies left lateral 2–4 cm above GEJ, highest perforation mortality, and “Hartmann” mediastinal crunch; SCORE describes distal post-emesis rupture without a distance or mortality percentage.",
      "The clinical review specifies left posterolateral 2–3 cm and greater contamination; outcome depends on case mix. The accepted crunch eponym is Hamman sign; the Fiser transcription/attribution is retained as a flagged discrepancy, not taught as a second sign."
    ],
    [
      "Single-source technique and devices",
      "The saved packet flags permanent muscle sutures and contralateral achalasia myotomy as Fiser-only; SCORE alone supplies the PEG-conduit caution, stent placement limits, at-least-weekly EVT inspection and unipolar revision within days.",
      "These distinctions remain explicit rather than implying both sources support every detail. More frequent EVT exchanges (often ~3 days) and individualized stent surveillance are contemporary practice examples, not contradictory to weekly minimum inspection."
    ],
    [
      "Antifungal and aspiration precautions",
      "Fiser includes routine yeast coverage and avoids Gastrografin in aspiration risk, using dilute barium; the clinical review favors risk-selected antifungal therapy and low-osmolar nonionic contrast.",
      "Antimicrobial duration and routine antifungal use are not settled by WSES. Hyperosmolar contrast aspiration can cause severe chemical pneumonitis; select the contrast with radiology rather than applying a single agent to every patient."
    ]
  ]
}, [[GUIDELINE, STS], [GUIDELINE], [PACKET, HAMMAN], [PACKET], [OE]]),
  sourced({
  "id": "esophageal-perforation-13",
  "type": "table",
  "heading": "Outcomes: compare populations cautiously",
  "columns": [
    "Setting",
    "Supplied results and limits"
  ],
  "rows": [
    [
      "Boerhaave pooled treatment outcomes",
      "Immediate mortality 11% overall: primary closure 6%, stent 8%, T-tube 14%, conservative care 22%, esophagectomy 2%. Highly selected surgical populations prevent ranking treatments from these percentages."
    ],
    [
      "Timing and cause",
      "Spontaneous rupture mortality 3% treated within 24 hours versus 12% later in a pooled analysis; a late operative cohort reported 25% versus 27% overall in-hospital mortality. Another series reported 30-day mortality 21.4% spontaneous versus 3.2% iatrogenic, with similar 90-day/1-year mortality. Severity/comorbidity and selection confound timing comparisons."
    ],
    [
      "Contemporary cohorts",
      "A 216-patient Boerhaave cohort had 12% in-hospital/90-day mortality across endoscopic, surgical and combined strategies; combined care had longer stay. A supplied iatrogenic meta-analysis reports mortality 11.37% endoscopic versus 11.58% surgical, with selection confounding."
    ],
    [
      "Repair or stent failure",
      "WSES quotes repair breakdown 25–50%. One stent series found persistent leak in 17.3%, managed with re-stenting, drainage or selected observation. Drained contained leaks may receive NPO/nutrition plus stent/EVT; uncontrolled leaks require reexploration and source control."
    ]
  ]
}, OE),
  sourced({
  "id": "esophageal-perforation-14",
  "type": "warning",
  "heading": "Do not equate sealing with source control",
  "text": "Empyema/mediastinal abscess needs drainage ± decortication even after closure. Continued sepsis, an uncontrolled leak or failure to thrive demands escalation. Monitor pneumonia, ARDS, organ failure, esophagopleural/tracheoesophageal fistula and late stricture; post-EVT pneumonia predicted death in a supplied series. Reassess the defect endoscopically or with contrast when removing a stent, exchange EVT sponges repeatedly, and delay reconstructive surgery until nutrition and sepsis permit. SCORE notes late strictures may require gentle dilation. The supplied STS summary suggests selected typical spontaneous pneumomediastinum may need no esophageal imaging, but its full selection criteria need confirmation; do not apply that omission to post-emesis pain, effusion, systemic illness or persistent suspicion."
}, OE),
  references("esophageal-perforation-references", [PACKET, OE, GUIDELINE, STS, WEI, PSS, HAMMAN], "References"),
];

export const esophagealPerforationTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007220",
  "versionId": "00000000-0000-4000-8000-000000007221",
  "slug": "esophageal-perforation",
  "title": "Esophageal Perforation",
  "aliases": [
    "esophageal injury",
    "Boerhaave syndrome",
    "esophageal rupture",
    "iatrogenic esophageal perforation",
    "mediastinitis",
    "esophageal exclusion",
    "endoscopic esophageal stent",
    "Pittsburgh Perforation Severity Score",
    "Mackler triad",
    "esophagography",
    "Hamman sign"
  ],
  "scoreNodeId": "trauma-conditions",
  "scoreCategory": "SCORE · Trauma · Diseases & Conditions",
  "tags": [
    "esophageal-perforation",
    "boerhaave",
    "mediastinitis",
    "esophagram",
    "primary-repair",
    "exclusion-diversion",
    "stent",
    "general-surgery-call",
    "absite",
    "score"
  ],
  sourceId: PACKET,
  additionalSourceIds: [OE, GUIDELINE, STS, WEI, PSS, HAMMAN],
  blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
