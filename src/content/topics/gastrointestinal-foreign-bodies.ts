import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

// Clinical draft: delivery remains unmerged pending Zach’s per-entry sign-off.
const blocks: TopicBlock[] = [
  sourced({
  "id": "block-gastrointestinal-foreign-bodies-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Triage ingestion by **object, location, symptoms, and time**. Inability to handle secretions, esophageal batteries, and esophageal sharps demand emergency removal; magnets and gastric batteries need object-specific pathways. Endoscopy diagnoses and treats most retained upper-GI objects. Peritonitis, sepsis, instability, or an uncontained perforation requires immediate surgical assessment and source control. Population passage rates never justify watching a dangerous object."
}, "00000000-0000-4000-8000-000000007601"),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-2",
  "type": "bullets",
  "heading": "Who, what, and where",
  "items": [
    "Children peak at 6 months–6 years; coins predominate. Adults most often present with food impaction, commonly meat; bones are prominent in Asian series. Dentures, intoxication, cognitive or developmental impairment, psychiatric illness, incarceration, and intentional ingestion increase risk. Repeated intentional ingestion warrants behavioral-health assessment; factitious disorder is one possible association, not a diagnosis from repetition alone.",
    "Food impaction suggests underlying disease: eosinophilic esophagitis (EoE), Schatzki ring, peptic stricture, malignancy, achalasia, web, diverticulum, or hiatal hernia. Congenital narrowing and prior GI surgery also predispose to retention or recurrence.",
    "Upper esophageal narrowing is at the cricopharyngeus (C6)/thoracic inlet; additional impressions occur at the aortic arch (T4), left bronchus (T6), and hiatus/LES (T10–T11). Children and true objects often lodge proximally; adult food boluses commonly lodge distally. Pain location does not reliably localize the object.",
    "The pylorus limits diameter, the duodenal sweep/ligament of Treitz limits length, and the ileocecal region is a classic sharp-object perforation site. Small objects can still lodge in altered anatomy.",
    "Batteries generate hydroxide at the negative pole, causing rapid liquefactive necrosis; serious esophageal injury can develop within 2 hours. Multiple magnets or a magnet plus metal compress intervening bowel, producing necrosis, fistula, perforation, volvulus, or obstruction; gastric ulceration has been reported within 8 hours. Blunt objects cause pressure injury; sharps lacerate or migrate; water beads expand and obstruct."
  ]
}, [["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"]]),
  sourced({
  "id": "block-gastrointestinal-foreign-bodies-3",
  "type": "bullets",
  "heading": "Presentation and workup",
  "items": [
    "Ask ingestion time, last meal, dimensions/material, possible additional objects, prior disease or surgery, and whether ingestion was witnessed. Toddlers may have only drooling, gagging, feeding refusal, vomiting, wheeze, cough, or stridor; adults describe acute dysphagia or odynophagia after a meal. Prior transient choking does not establish that the object has safely passed.",
    "Pooled saliva indicates high-grade obstruction and aspiration risk. Neck swelling, tenderness, erythema or crepitus suggests proximal perforation; severe chest/back pain, chest crepitus or a Hamman sign suggests thoracic injury; epigastric pain or peritonitis suggests abdominal perforation. Fever or sepsis is concerning at any level.",
    "Obtain AP and lateral radiographs covering neck, chest, and abdomen for suspected objects or an uncertain history; count batteries and magnets in at least two views. An esophageal coin is usually en face on AP and posterior on lateral; a tracheal coin is usually edge-on on AP and anterior on lateral.",
    "A battery may show an AP double rim/halo and lateral step-off. Absence of these signs does not exclude a thin/small battery or an imperfect lateral view; stacked coins and pot magnets can mislead. Treat an uncertain round esophageal opacity as a battery until distinguished.",
    "Fish/chicken bones, wood/toothpicks, plastic, some glass, and thin metal may be missed on films. CT localizes suspected radiolucent objects and evaluates perforation or migration. Persistent esophageal symptoms despite negative films require endoscopy; uncomplicated non-bony food impaction need not wait for imaging.",
    "Avoid routine oral contrast before retrieval because of aspiration and obscured endoscopy. SCORE pediatrics describes esophagram for persistent symptoms with negative films, whereas the esophageal module favors endoscopy; reserve contrast for a specific diagnostic question, particularly leak assessment, with specialist input."
  ]
}, "00000000-0000-4000-8000-000000007601"),
  sourced({
  "id": "block-gastrointestinal-foreign-bodies-4",
  "type": "table",
  "heading": "Adult endoscopy timing",
  "columns": [
    "Tier",
    "Indications",
    "Timing"
  ],
  "rows": [
    [
      "Emergency",
      "Complete obstruction; esophageal battery or sharp object",
      "Preferably within 2 hours, no later than 6 hours; remove batteries immediately."
    ],
    [
      "Urgent",
      "Other esophageal objects or food; gastric/proximal duodenal sharps, magnets, batteries, or long objects",
      "Within 24 hours."
    ],
    [
      "Nonurgent",
      "Large blunt gastric object without symptoms",
      "Within 72 hours; objects >2.5 cm wide are unlikely to pass the pylorus."
    ],
    [
      "Observe",
      "Small blunt gastric/distal object; no battery, magnet, obstruction, or injury",
      "Reliable follow-up and serial assessment; escalate for symptoms or nonprogression."
    ]
  ]
}, "00000000-0000-4000-8000-000000007602"),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-5",
  "type": "bullets",
  "heading": "Coins, size limits, and distal sharps",
  "items": [
    "Asymptomatic esophageal coin: observe briefly, repeat the film just before retrieval, and remove within 24 hours if retained. Symptoms require earlier removal. Unknown/prolonged dwell time warrants prompt specialist management and surgical backup. Younger age, a proximal coin, quarter-sized diameter (about 23.5 mm), and longer impaction reduce passage likelihood.",
    "Gastric coin: check stools and radiographs every 1–2 weeks; elective removal if retained at 2–4 weeks or symptomatic. Preserve the supplied SCORE divergence: its pediatric module removes a still-gastric coin at the 2-week film, while the gastric module allows 3–4 weeks.",
    "Usual adult passage limits are **>2.5 cm diameter** and **>6 cm length**; remove long objects at or proximal to the duodenum. SCORE gastric text uses >2 cm width, while its pediatric material uses smaller age-dependent limits (infants >2 cm wide or >3 cm long; older children >2 cm thick or >5 cm long). Do not substitute an adult cutoff for pediatric specialist assessment.",
    "Sharp esophageal objects require emergency removal; gastric/proximal duodenal sharps generally require prompt retrieval. Distal sharps require serial films and surgical involvement; symptoms or no progression for about 3 days prompt retrieval or operation. Toothpicks and bones particularly risk occult perforation, delayed abscess, and migration to liver, retroperitoneum, or vessels. A benign examination does not exclude injury.",
    "For children, older European guidance favors emergency retrieval of proximal sharps; 2026 ESPGHAN permits individualized observation of selected asymptomatic gastric sharps, considering shape, age, anatomy, local expertise, and retrieval risk. Distal observation needs dependable close follow-up, usually inpatient."
  ]
}, [["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007607"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007603"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-6",
  "type": "bullets",
  "heading": "Food-bolus impaction",
  "items": [
    "Complete obstruction requires emergency EGD with airway protection; partial obstruction still requires EGD within 24 hours. After viewing the distal lumen, gently push a suitable bolus into the stomach or retrieve en bloc/piecemeal; never push blindly against resistance.",
    "Glucagon 1 mg IV in adults is an optional bridge, not a reason to delay EGD. The supplied review gives pediatric 0.02–0.03 mg/kg IV (maximum 0.5 mg under 20 kg), requiring pediatric dosing review. Nausea, vomiting, and hyperglycemia are concerns. A 2024 randomized trial found no advantage over placebo (23.6% versus 20.6% spontaneous clearance); pooled earlier data likewise found no benefit and more adverse events.",
    "Obtain proximal and distal esophageal biopsies for EoE, avoiding the traumatized impaction site. Dilate a ring or stricture at the same session only when safe; defer with marked edema, ulceration, or suspected active EoE until biopsy-directed treatment. Arrange follow-up to treat the cause and prevent recurrence."
  ]
}, [["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007602"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007608"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-7",
  "type": "warning",
  "heading": "Button battery: do not lose time",
  "tone": "danger",
  "text": "Remove an esophageal battery immediately, ideally within 2 hours of ingestion; fasting status does not justify delay. **Any hematemesis may be a herald bleed of an aortoesophageal fistula.** Delayed diagnosis/removal (>12 hours), bleeding, or concern for deep/vascular injury requires urgent multidisciplinary planning, surgical/cardiothoracic backup, and consideration of contrast CT before controlled removal. A battery already in the stomach does not exclude prior esophageal injury."
}, [["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007606", "00000000-0000-4000-8000-000000007603"]]),
  sourced({
  "id": "block-gastrointestinal-foreign-bodies-8",
  "type": "bullets",
  "heading": "Battery mitigation and post-removal care",
  "items": [
    "If a child is **at least 12 months old**, can swallow, and ingestion was within 12 hours, give **honey 10 mL every 10 minutes, up to 6 doses**, while traveling to care. Once an esophageal battery is confirmed, **sucralfate suspension 1 g/10 mL: 10 mL every 10 minutes, up to 3 doses**, may be given until sedation. Neither is used when dwell time may exceed 12 hours; neither delays removal.",
    "Do not induce vomiting or blindly pass an NG/OG tube. After retrieval, document negative-pole orientation and depth/location of injury, inspect for other objects, and plan neutralizing irrigation under the battery protocol only after excluding perforation. Deep injury requires admission, NPO status, and specialist-directed feeding access and imaging.",
    "Injury may progress after removal: monitor for perforation, tracheoesophageal fistula, vascular fistula/bleeding, mediastinitis, vocal cord paralysis, and later stricture. Surveillance imaging and surgical follow-up depend on injury depth and vessel proximity; delayed bleeding remains an emergency."
  ]
}, "00000000-0000-4000-8000-000000007604"),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-9",
  "type": "table",
  "heading": "Gastric batteries: keep the pathways separate",
  "columns": [
    "Authority/population",
    "Higher-risk features",
    "Observation pathway"
  ],
  "rows": [
    [
      "NASPGHAN 2015 / supplied SCORE pediatric pathway",
      "Symptoms; ≥20 mm battery in child <5 years; possible prior esophageal dwell >2 hours favor EGD to assess esophagus.",
      "For ≥20 mm battery retained in stomach, repeat film/removal at 48 hours; smaller batteries have longer follow-up (SCORE 10–14 days)."
    ],
    [
      "ESPGHAN 2021",
      "Symptoms, magnet co-ingestion, or delayed/unwitnessed ingestion warrant removal/assessment; >12-hour delay raises vascular-injury concern.",
      "Early-diagnosed, asymptomatic post-esophageal battery: film at 7–14 days if stool passage not confirmed."
    ],
    [
      "ESPGHAN 2026",
      "Symptoms or magnet co-ingestion: urgent EGD. Consider EGD for unwitnessed/>12-hour ingestion particularly if age <5 and battery ≥20 mm, or abnormal anatomy/prior surgery.",
      "Other asymptomatic gastric batteries: outpatient observation with reliable follow-up and film at 7–14 days; retrieve if retained."
    ],
    [
      "Adult ESGE versus ASGE-era guidance",
      "Esophageal battery always emergency; symptoms/injury preclude observation.",
      "ESGE removes gastric batteries within 24 hours; ASGE permits selected asymptomatic gastric disk/cylindrical batteries up to 48 hours."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007606"], ["00000000-0000-4000-8000-000000007603"], ["00000000-0000-4000-8000-000000007602", "00000000-0000-4000-8000-000000007607"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-10",
  "type": "bullets",
  "heading": "Magnets: verify count, location, and progression",
  "items": [
    "Confirm a truly single magnet with two-view imaging: stacked magnets can appear single. An asymptomatic single gastric/distal magnet may be observed with serial films and reliable follow-up; remove external magnetic/metal objects near the child. Esophageal retention, symptoms, uncertain count, unusual size/shape, or failure to pass changes the plan.",
    "Multiple magnets or magnet plus metal within reach need immediate endoscopic coordination, even if asymptomatic. NASPGHAN targets retrieval within 12 hours and surgical consultation before endoscopy when later; 2026 ESPGHAN calls reachable multiple magnets an emergency. Early joint GI/surgical ownership is essential.",
    "Symptomatic distal magnets or bowel injury require surgery. Selected asymptomatic distal magnets can undergo controlled inpatient observation, serial radiographs every few hours, and possible laxatives/enteroscopy/colonoscopy under specialist direction. Symptoms or nonprogression require escalation; supplied protocols use different triggers (24 hours, 48 hours, or unchanged films on consecutive days), so no universal safe waiting interval exists.",
    "Magnets may remain clinically silent for days despite trapped bowel. Fistula/perforation may need repair, bowel resection/anastomosis, or diversion. Failed or unsafe endoscopic separation requires surgical assistance; confirm all objects have been recovered."
  ]
}, [["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007605"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-11",
  "type": "sequence",
  "heading": "Safe endoscopic retrieval",
  "steps": [
    {
      "title": "Select team, scope, and airway",
      "detail": "Flexible endoscopy is first line for most GI objects; ENT direct laryngoscopy/rigid esophagoscopy suits objects at/above the cricopharyngeus, impacted proximal dentures, and selected pediatric cases. Match scope and channels to patient size; dual-channel irrigation/suction can help. Children usually need intubated general anesthesia; adult proximal objects, large boluses, repeated passes, or poor cooperation favor intubation."
    },
    {
      "title": "Match device to object",
      "detail": "Use forceps for coins/flat objects, nets for round objects or small magnets, snares for long objects/food, baskets or tripod graspers for irregular items, and a suction cap for selected food boluses. Impacted batteries may require graspers when a net cannot open. Have alternatives ready."
    },
    {
      "title": "Protect sharp edges",
      "detail": "Use an appropriate hood/cap or overtube; contain the point or withdraw with the point trailing. Adult short overtubes protect the proximal airway during repeated passes; longer overtubes protect the distal esophagus when retrieving gastric sharps. Pediatric size and proximal strictures limit use; overtubes themselves can cause pharyngeal/esophageal injury."
    },
    {
      "title": "Inspect and confirm clearance",
      "detail": "Reinspect the mucosa, account for every object, and evaluate injury. Blind bougienage, meat tenderizers/papain, effervescent agents, and induced vomiting risk aspiration or perforation. Difficult dentures and suspected vascular involvement require surgical backup."
    }
  ]
}, [["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603"], ["00000000-0000-4000-8000-000000007601"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-12",
  "type": "bullets",
  "heading": "Special situations and complications",
  "items": [
    "Drug packets: avoid endoscopic retrieval because rupture can release a lethal dose. Observe an asymptomatic body packer with specialist oversight; operate for obstruction, rupture, or toxicity. Cocaine has no specific antidote.",
    "Superabsorbent water beads: arrange emergency endoscopic retrieval before expansion; negative plain films do not exclude them. Failed/incomplete retrieval requires admission and surgical observation.",
    "Long toothbrushes/utensils generally need snare and protective overtube. Prior pyloric/esophageal surgery or anatomic narrowing lowers the threshold for intervention. Intentional ingestion may involve multiple sharp objects; complete object accounting and behavioral-health follow-up matter.",
    "Endoscopy can cause mucosal laceration, perforation, aspiration, or overtube injury; prolonged impaction raises risk. CT evaluates perforation or migration. Instability, sepsis, peritonitis, uncontained leak, obstruction, or failure to retrieve a dangerous retained object requires surgical management, sometimes open or thoracoscopic esophageal access."
  ]
}, [["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007607"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007603"], ["00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007601"]]),
  sourcedUnits({
  "id": "block-gastrointestinal-foreign-bodies-13",
  "type": "table",
  "heading": "Board answer versus current evidence",
  "columns": [
    "Question",
    "Classic/supplied answer",
    "Clinical qualification"
  ],
  "rows": [
    [
      "Chance of spontaneous passage",
      "80–90% pass; 10–20% endoscopy; about 1% surgery.",
      "Population figures weighted toward benign pediatric objects; adult hospital cohorts may pass only about 45%. Object-specific risk governs."
    ],
    [
      "Most common lodging site",
      "Cricopharyngeus; SCORE pediatric retained objects 63–84% proximal, 10–17% aortic, 5–20% distal.",
      "Adult food impaction often distal and usually has underlying pathology; do not transfer pediatric percentages to adults."
    ],
    [
      "Sharp-object risk",
      "SCORE quotes 15–35% perforation; older reports cite 35% morbidity/26% mortality.",
      "Historical/selected data differ from promptly treated modern cohorts, where surgery is about 4%; delayed injury can still be occult."
    ],
    [
      "Glucagon first",
      "SCORE permits 1 mg IV for food impaction.",
      "Optional bridge with no proven advantage over placebo; endoscopy and cause assessment still required."
    ],
    [
      "Width threshold",
      "SCORE gastric module says >2 cm.",
      "Adult ASGE passage/removal threshold is >2.5 cm; pediatric age/size and battery rules differ."
    ],
    [
      "Battery mechanism",
      "Older wording emphasizes alkaline leakage.",
      "Local electrical generation of hydroxide at the negative pole is central; leakage is not required."
    ],
    [
      "Fiser coverage",
      "Endoscopy diagnoses/treats; cricopharyngeus is the classic site.",
      "Extracted chapters lack battery, magnet, size, or timed-observation rules. These come from SCORE and society guidance, not Fiser."
    ]
  ]
}, [["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601"], ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007608"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007607"], ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007604"], ["00000000-0000-4000-8000-000000007600"]]),
  references("block-gastrointestinal-foreign-bodies-references", ["00000000-0000-4000-8000-000000007600", "00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007602", "00000000-0000-4000-8000-000000007603", "00000000-0000-4000-8000-000000007604", "00000000-0000-4000-8000-000000007605", "00000000-0000-4000-8000-000000007606", "00000000-0000-4000-8000-000000007607", "00000000-0000-4000-8000-000000007608"], "References"),
];

export const gastrointestinalForeignBodiesTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007620",
  "versionId": "00000000-0000-4000-8000-000000007621",
  "slug": "gastrointestinal-foreign-bodies",
  "title": "Gastrointestinal Foreign Bodies",
  "aliases": ["foreign body ingestion", "swallowed foreign body", "button battery", "magnet ingestion", "coin ingestion", "food bolus impaction", "esophageal foreign body", "gastric foreign body", "steakhouse syndrome", "body packing", "water beads"],
  "scoreNodeId": "stomach-conditions",
  "scoreCategory": "SCORE · Stomach · Diseases & Conditions",
  "tags": ["foreign-body", "button-battery", "magnets", "food-bolus", "endoscopy", "absite", "score"],
  "sourceId": "00000000-0000-4000-8000-000000007600",
  "additionalSourceIds": ["00000000-0000-4000-8000-000000007601", "00000000-0000-4000-8000-000000007602", "00000000-0000-4000-8000-000000007603", "00000000-0000-4000-8000-000000007604", "00000000-0000-4000-8000-000000007605", "00000000-0000-4000-8000-000000007606", "00000000-0000-4000-8000-000000007607", "00000000-0000-4000-8000-000000007608"],
  "reviewedAt": "2026-11-08T12:00:00.000Z",
  blocks,
});
