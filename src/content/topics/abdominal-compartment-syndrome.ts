import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

// Clinical draft: delivery remains unmerged pending Zach’s per-entry sign-off.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "**Intra-abdominal hypertension (IAH)** is sustained/repeated IAP ≥12 mm Hg in adults. **Abdominal compartment syndrome (ACS)** is sustained IAP >20 mm Hg **with new organ dysfunction**; pressure alone is insufficient. In an at-risk patient with oliguria, rising ventilator pressures, or shock, measure bladder pressure and treat the cause immediately. Rapid luminal/fluid decompression and improved wall compliance may avert surgery; overt or rapidly worsening ACS needs prompt decompressive laparotomy without a prolonged medical trial."
}, [["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007702"]]),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-2",
  "type": "table",
  "heading": "Definitions and grades",
  "columns": [
    "Term",
    "Threshold/meaning",
    "Interpretation"
  ],
  "rows": [
    [
      "Normal adult IAP",
      "About 5–7 mm Hg in critical illness",
      "Chronic obesity, pregnancy, or ascites may raise baseline without ACS."
    ],
    [
      "Grade I IAH",
      "12–15 mm Hg",
      "Begin cause-directed treatment and serial assessment."
    ],
    [
      "Grade II IAH",
      "16–20 mm Hg",
      "Active treatment; evaluate organ-function trend."
    ],
    [
      "Grade III IAH",
      "21–25 mm Hg",
      "Severe IAH; ACS only if new organ dysfunction accompanies it."
    ],
    [
      "Grade IV IAH",
      ">25 mm Hg",
      "High pressure alone still does not establish ACS."
    ],
    [
      "Adult ACS",
      "Sustained >20 mm Hg plus new organ dysfunction/failure",
      "May occur with or without abdominal perfusion pressure <60 mm Hg."
    ],
    [
      "APP",
      "MAP minus IAP",
      "Physiologic descriptor; WSACS does not endorse a specific APP resuscitation target."
    ],
    [
      "Etiology",
      "Primary: abdominopelvic disease; secondary: extra-abdominal origin",
      "Recurrent ACS redevelops after prior medical or surgical treatment."
    ],
    [
      "Polycompartment syndrome",
      "Elevated pressure in ≥2 anatomic compartments",
      "Abdominal, thoracic, and cranial pressures can interact."
    ],
    [
      "Compliance / open abdomen",
      "Compliance = volume change per pressure change",
      "An open abdomen requires temporary closure because fascia/skin remain unclosed."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"]]),
  sourced({
  "id": "block-abdominal-compartment-syndrome-3",
  "type": "bullets",
  "heading": "Risk factors and physiology",
  "items": [
    "IAP rises from **luminal volume** (gastroparesis, ileus, constipation, obstruction, pseudo-obstruction), **extraluminal volume** (blood, ascites, edema, masses, pregnancy, packs), or **poor wall compliance** (pain, agitation, obesity, tight closure, torso eschar, positioning). Once compliance is exhausted, a small volume increase sharply raises pressure.",
    "Screen after damage-control laparotomy/packing, massive transfusion or crystalloid, trauma, ruptured AAA (open repair or EVAR), sepsis/capillary leak, severe pancreatitis, major burns, tense cirrhotic ascites, complex abdominal-wall reconstruction, or ECMO. Secondary ACS often reflects resuscitation-related edema; avoid ongoing fluid creep.",
    "Trauma predictors of needing an open abdomen include pH ≤7.2, lactate ≥5 mmol/L, temperature ≤34°C, systolic pressure ≤70 mm Hg, blood loss ≥4 L, ≥10 units PRBC, and INR/PT >1.5 times normal. These are risk markers, not independent ACS definitions.",
    "IVC compression reduces venous return and cardiac output while afterload rises. Diaphragmatic elevation lowers thoracic volume, functional residual capacity and compliance; peak/plateau pressures rise, producing hypoxemia and hypercarbia. CVP/PCWP may be falsely high and should not trigger automatic fluid loading.",
    "Renal compression and venous congestion reduce GFR, causing early oliguria, then anuria/AKI. Mesenteric ischemia disrupts the gut barrier, promotes bacterial translocation and edema, and may progress to necrosis. Lower portal/hepatic flow impairs liver function and lactate clearance; rectus ischemia further reduces compliance.",
    "Raised intrathoracic pressure impairs cerebral venous drainage and raises ICP, especially important with brain injury. Ventilatory recruitment/PEEP must balance lung protection and hemodynamics; relieving abdominal pressure addresses the underlying restriction."
  ]
}, "00000000-0000-4000-8000-000000007701"),
  sourced({
  "id": "block-abdominal-compartment-syndrome-4",
  "type": "bullets",
  "heading": "Recognition and surveillance",
  "items": [
    "The classic cluster is a tense/distended abdomen, rising airway pressures, oliguria despite apparently adequate filling pressures, and hypotension/falling cardiac output. Worsening acidosis/lactate, escalating oxygen/PEEP needs, feeding intolerance, or raised ICP add concern.",
    "Examination is unreliable: important IAH can exist without obvious distension. Measure baseline IAP when risk factors are present, at ICU admission and with new/progressive organ failure. Follow a protocol and repeat about every 4–6 hours when IAH persists, more often as deterioration demands.",
    "Assess the **IAP level/trend, organ dysfunction trajectory, and cause together**. Improvement after decompression supports pressure-mediated organ injury. High suspicion demands immediate evaluation, but the formal adult ACS definition still requires measured pressure plus organ dysfunction.",
    "IAH affects roughly 30–50% of ICU patients; ACS frequency depends strongly on population (about 1% in general ICUs versus approximately 5–15% in high-risk groups). Supplied cohorts report higher IAH rates in trauma, emergency surgery, ventilation, and severe pancreatitis. Modern restrictive/hemostatic resuscitation has reduced ACS in some series.",
    "Untreated ACS progresses to multiorgan failure. SCORE reports historical mortality up to 75–90%; treated series remain high (roughly 25–55%). A decompression meta-analysis reported about 50% adult and 61% pediatric mortality. These heterogeneous populations do not predict an individual outcome."
  ]
}, "00000000-0000-4000-8000-000000007701"),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-5",
  "type": "sequence",
  "heading": "Measure bladder pressure correctly",
  "steps": [
    {
      "title": "Position and zero",
      "detail": "Place fully supine, relaxed, without abdominal contractions; measure at end-expiration in mm Hg. Zero at the midaxillary line at the iliac crest, using the same reference for serial readings."
    },
    {
      "title": "Prepare the closed system",
      "detail": "Use a Foley-linked transducer/manometer system; stop distal urinary drainage during measurement. Empty the bladder, then instill no more than 25 mL sterile saline in an adult (typically 20–25 mL)."
    },
    {
      "title": "Allow relaxation and read",
      "detail": "Allow about 30–60 seconds for detrusor relaxation, open the pressure path to the patient/transducer, record end-expiratory pressure, then restore urinary drainage. Compare serial values under consistent conditions."
    },
    {
      "title": "Check for misleading measurements",
      "detail": "Head elevation, pain, agitation, forced expiration, dyssynchrony, neurogenic bladder, pelvic packs/hematoma, or a mass can distort readings. Correlate trends with organ function; if the bladder is unusable, specialist alternatives include gastric or direct intraperitoneal measurement. Femoral venous pressure is not an accepted substitute."
    }
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"]]),
  sourced({
  "id": "block-abdominal-compartment-syndrome-6",
  "type": "warning",
  "heading": "Pediatric thresholds are lower",
  "text": "WSACS pediatric IAH is sustained/repeated **IAP >10 mm Hg**, and pediatric ACS is sustained **>10 mm Hg with new/worsening organ dysfunction attributable to pressure**. Normal critical-care IAP is approximately 4–10 mm Hg. Instill **1 mL/kg**, minimum **3 mL**, maximum **25 mL**. The supplied review says IAH ≥10 mm Hg; WSACS uses >10. Adult 12/20-mm Hg thresholds and investigational pediatric grading schemes should not replace these pediatric definitions."
}, "00000000-0000-4000-8000-000000007702"),
  sourced({
  "id": "block-abdominal-compartment-syndrome-7",
  "type": "bullets",
  "heading": "Imaging helps find the cause",
  "items": [
    "Use bedside ultrasound to identify drainable intraperitoneal fluid. CT may show a round abdomen (AP/transverse diameter ratio >0.8 at the left renal vein), compressed IVC, bowel thickening, or renal compression/displacement; these findings support suspicion but do not measure IAP or establish ACS.",
    "Do not delay decompression in a rapidly deteriorating patient to obtain an anatomic label. Imaging primarily guides drainage/source control and evaluates hemorrhage, obstruction, ischemia, or another treatable cause."
  ]
}, "00000000-0000-4000-8000-000000007701"),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-8",
  "type": "table",
  "heading": "Rapid medical and minimally invasive bundle",
  "columns": [
    "Target",
    "Measures",
    "Limits"
  ],
  "rows": [
    [
      "Abdominal wall",
      "Analgesia/sedation; remove constrictive dressings; escharotomy when appropriate; consider positioning and brief neuromuscular blockade.",
      "Deep sedation can worsen shock. Paralysis buys time while the cause is corrected."
    ],
    [
      "Intraluminal contents",
      "NG and rectal decompression; bladder drainage; prokinetics/enemas; selected colonoscopic decompression or neostigmine for refractory colonic ileus.",
      "Adjust enteral feeding during severe distension; distinguish obstruction from dysmotility."
    ],
    [
      "Extraluminal volume",
      "Ultrasound-guided paracentesis/percutaneous catheter drainage for accessible fluid or blood; surgical evacuation when needed.",
      "Draining fluid does not correct uncontrolled hemorrhage or ischemic bowel."
    ],
    [
      "Fluid balance",
      "Restore perfusion without excess crystalloid; balanced hemostatic resuscitation in hemorrhage; aim for even/negative balance after shock resolves.",
      "Oliguria may reflect compression rather than underfilling; do not chase urine output with unbounded fluid."
    ],
    [
      "Selected fluid removal",
      "Diuretics or net ultrafiltration/RRT for appropriate stable, overloaded patients, particularly with AKI.",
      "WSACS found insufficient evidence for a specific diuretic/RRT recommendation; fluid removal does not rescue refractory ACS."
    ],
    [
      "Organ support",
      "Optimize ventilation/recruitment, oxygen delivery, and hemodynamic assessment while trending IAP and organ function.",
      "No prolonged medical ladder when ACS is rapidly worsening."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"]]),
  sourced({
  "id": "block-abdominal-compartment-syndrome-9",
  "type": "prose",
  "heading": "Drainage response is not a universal clock",
  "text": "In a matched single-center study of 62 patients, percutaneous drainage avoided laparotomy in 25/31 treated patients (81%). Drainage >1,000 mL or IAP reduction >9 mm Hg during 4 hours predicted success. Failure to achieve a meaningful fluid and pressure response should prompt urgent surgical reassessment. These are study-derived response markers, not validated universal requirements to wait 4 hours or operate solely because one numeric marker is missed; persistent/worsening organ failure governs escalation."
}, "00000000-0000-4000-8000-000000007705"),
  sourced({
  "id": "block-abdominal-compartment-syndrome-10",
  "type": "bullets",
  "heading": "Decompressive laparotomy and reperfusion",
  "items": [
    "Overt ACS with persistent/new organ dysfunction despite rapid feasible measures requires prompt decompression. Primary/postinjury ACS, packing, uncontrolled abdominal pathology, or rapidly progressive organ failure often warrants immediate surgery. Do not defer treatment until a pressure reaches 25–30 mm Hg or every medical option has been exhausted.",
    "Alert anesthesia before opening: the fall in systemic vascular resistance and washout of ischemic metabolites may cause hypotension, acidosis, hyperkalemia, arrhythmia, or arrest. Prepare hemodynamic support and correct acid-base/electrolyte problems while avoiding renewed over-resuscitation.",
    "Decompression usually lowers IAP and airway pressures and improves oxygenation and urine output, but cardiac-output improvement and survival are variable. Persistent organ failure requires reassessment for ischemia or another cause; pressure can recur even beneath temporary abdominal closure.",
    "Leave temporary abdominal closure rather than force fascial approximation over swollen viscera. Continue serial IAP monitoring; recurrent ACS can develop despite an open-abdomen dressing."
  ]
}, "00000000-0000-4000-8000-000000007701"),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-11",
  "type": "table",
  "heading": "Temporary closure and definitive repair",
  "columns": [
    "Strategy",
    "Role",
    "Tradeoff"
  ],
  "rows": [
    [
      "NPWT plus continuous fascial traction",
      "Preferred contemporary temporary closure when available; protects viscera and limits lateral retraction.",
      "Use a protective layer; avoid foam or synthetic mesh directly against bowel."
    ],
    [
      "NPWT alone",
      "Evacuates exudate/edema; useful temporary system.",
      "Less control of fascial retraction; non-trauma comparative evidence remains low certainty."
    ],
    [
      "Bogotá bag",
      "Inexpensive passive silo when resources are limited.",
      "Allows retraction and usually achieves lower primary fascial closure rates."
    ],
    [
      "Wittmann patch / ABRA / dynamic systems",
      "Alternatives for progressive approximation; vertical traction is emerging.",
      "Technique and expertise affect results; dynamic sutures require care around bowel."
    ],
    [
      "Definitive fascial closure",
      "Re-explore within 24–48 hours, earlier if worsening; aim for early closure when resuscitation, source control, and viability permit.",
      "Common early target is 4–7 days; measure IAP during closure and never force closure that recreates ACS."
    ],
    [
      "Unable to close",
      "Selected biologic reconstruction or planned ventral hernia with skin closure/graft; later abdominal-wall reconstruction.",
      "Avoid definitive synthetic bridging except when no alternative; component separation is for definitive reconstruction, not temporary closure."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"]]),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-12",
  "type": "bullets",
  "heading": "Open-abdomen follow-up and complications",
  "items": [
    "Prolonged exposure promotes frozen abdomen, fascial retraction/loss of domain, ventral hernia, fistula, abscess, evisceration, malnutrition, and impaired quality of life. Early traction and closure reduce the opportunity for these complications; avoid synthetic mesh contact with bowel.",
    "The WSACS/Björck scheme describes grade 1 without fixation, grade 2 developing fixation, grade 3 frozen abdomen, and grade 4 frozen abdomen with enteroatmospheric fistula; clean, contaminated, and enteric-leak subtypes further describe complexity.",
    "An open abdomen is hypercatabolic and loses protein/nitrogen in effluent. Replace losses and start enteral nutrition early when bowel is viable and functional; discontinuity, obstruction, or inaccessible high-output fistula changes the feeding plan.",
    "For enteroatmospheric fistula, isolate effluent with appropriate NPWT/fistula devices and restore fluid, electrolyte, protein, and nutritional balance. Output is low <200 mL/day, moderate 200–500, or high >500. Spontaneous closure is unusual; definitive repair generally waits at least 6 months after recovery, with staged reconstruction often at 6–12 months."
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"]]),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-13",
  "type": "table",
  "heading": "Special settings",
  "columns": [
    "Setting",
    "Pressure problem",
    "Management emphasis"
  ],
  "rows": [
    [
      "Trauma/damage control",
      "Swollen viscera, blood, packing, and resuscitation; symptoms may appear within hours.",
      "Prompt return for decompression/source control when ACS develops; planned second look and temporary closure when necessary."
    ],
    [
      "Ruptured AAA, including EVAR",
      "Retroperitoneal hematoma and ongoing sac bleeding (lumbar/IMA) can persist after aneurysm exclusion.",
      "Monitor particularly after severe hypotension, aortic balloon use, or large transfusion; decompression ± hematoma evacuation and bleeding control may be needed."
    ],
    [
      "Major burns",
      "Fluid-related edema and/or restrictive torso eschar.",
      "Monitor IAP with large burns or excessive resuscitation; supplied burn guidance flags ~6 mL/kg/%TBSA or 250 mL/kg/24 hours. Escharotomy addresses external restriction; drain fluid or perform laparotomy if ACS persists."
    ],
    [
      "Severe pancreatitis",
      "Fluid overload, ileus, inflammatory edema, and ascites.",
      "Medical/percutaneous step-up first when feasible; refractory worsening ACS may need decompression. Leave lesser sac/retroperitoneum intact and do not add early necrosectomy."
    ],
    [
      "Tense cirrhotic ascites",
      "Drainable volume may dominate.",
      "Paracentesis can reverse IAH; prevent post-paracentesis circulatory dysfunction when >5 L is removed using the appropriate albumin protocol."
    ],
    [
      "Tension pneumoperitoneum",
      "Rapid intraperitoneal gas accumulation, sometimes after endoscopy.",
      "Immediate abdominal needle decompression can bridge to evaluation/treatment of the leak."
    ],
    [
      "Complex wall reconstruction",
      "Fascial closure lowers compliance.",
      "Check IAP during closure; reconsider closure that produces dangerous pressure or organ dysfunction."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007703"], ["00000000-0000-4000-8000-000000007701"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007803"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007704", "00000000-0000-4000-8000-000000007706"], ["00000000-0000-4000-8000-000000007701"], ["00000000-0000-4000-8000-000000007701"], ["00000000-0000-4000-8000-000000007701"]]),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-14",
  "type": "prose",
  "heading": "Pancreatitis: historical threshold versus revised guidance",
  "text": "The supplied review labels **sustained IAP >25 mm Hg with refractory organ failure** as the IAP/APA 2013 pancreatitis trigger. The 2025 IAP revision retains ACS at **>20 mm Hg with new/progressive organ dysfunction** and advises considering surgical decompression when nonoperative measures fail and organ dysfunction worsens. Do not use the older >25 threshold as a mandatory delay. WSES 2019 separately advises avoiding early necrosectomy when an early open abdomen is required for ACS."
}, [["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007704", "00000000-0000-4000-8000-000000007706"]]),
  sourcedUnits({
  "id": "block-abdominal-compartment-syndrome-15",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Classic/supplied teaching",
    "Current qualification"
  ],
  "rows": [
    [
      "Trauma recognition",
      "Fiser 5 X’s: hypotension, distension, low urine output, rising airway pressures, prolonged transport; massive fluids/prolonged laparotomy.",
      "Useful scenario pattern; ACS also occurs outside trauma, and an apparently soft abdomen does not exclude IAH."
    ],
    [
      "Action threshold",
      "Fiser persistent bladder pressure >25–30 suggests decompression.",
      "Adult ACS is >20 plus new organ dysfunction; do not wait for the higher number when deterioration demands action."
    ],
    [
      "Bladder technique",
      "Older 50–100 mL instillation and pubic-symphysis reference; SCORE text inconsistently says 50 mL.",
      "Use ≤25 mL, end-expiratory supine reading at midaxillary iliac-crest level. SCORE illustration agrees at 20–25 mL."
    ],
    [
      "Medical therapy",
      "Fiser: sedate/paralyze. SCORE: broader decompression, drainage, and fluid measures.",
      "Brief paralysis is a bridge; prompt cause-directed therapy or surgery is required."
    ],
    [
      "RRT and fluids",
      "“Dialyze off the fluid”; historical hypertonic/colloid regimens.",
      "Selected de-resuscitation may modestly lower IAP, but no WSACS evidence-based RRT/diuretic mandate; these measures must not delay decompression."
    ],
    [
      "Diagnostic shortcut",
      "SCORE permits diagnosis on high clinical suspicion irrespective of absolute IAP.",
      "Act urgently on suspicion, obtain reliable IAP, and retain measured pressure plus organ dysfunction in the formal definition."
    ],
    [
      "Closure",
      "SCORE lists bridging mesh among alternatives.",
      "Distinguish temporary fascial traction from definitive synthetic bridging; prioritize early safe fascia closure or planned ventral hernia."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007701"], ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007702"], ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007703"]]),
  references("block-abdominal-compartment-syndrome-references", ["00000000-0000-4000-8000-000000007700", "00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702", "00000000-0000-4000-8000-000000007703", "00000000-0000-4000-8000-000000007704", "00000000-0000-4000-8000-000000007705", "00000000-0000-4000-8000-000000007706", "00000000-0000-4000-8000-000000007803"], "References"),
];

export const abdominalCompartmentSyndromeTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007720",
  "versionId": "00000000-0000-4000-8000-000000007721",
  "slug": "abdominal-compartment-syndrome",
  "title": "Abdominal Compartment Syndrome",
  "aliases": ["abdominal compartment syndrome", "intra-abdominal hypertension", "IAH", "elevated intra-abdominal pressure", "bladder pressure", "decompressive laparotomy", "polycompartment syndrome", "abdominal needle decompression"],
  "scoreNodeId": "critical-care-conditions",
  "scoreCategory": "SCORE · Surgical Critical Care · Diseases & Conditions",
  "tags": ["abdominal-compartment-syndrome", "critical-care", "intra-abdominal-hypertension", "open-abdomen", "wsacs", "absite", "score"],
  "sourceId": "00000000-0000-4000-8000-000000007700",
  "additionalSourceIds": ["00000000-0000-4000-8000-000000007701", "00000000-0000-4000-8000-000000007702", "00000000-0000-4000-8000-000000007703", "00000000-0000-4000-8000-000000007704", "00000000-0000-4000-8000-000000007705", "00000000-0000-4000-8000-000000007706", "00000000-0000-4000-8000-000000007803"],
  "reviewedAt": "2026-11-08T12:00:00.000Z",
  blocks,
});
