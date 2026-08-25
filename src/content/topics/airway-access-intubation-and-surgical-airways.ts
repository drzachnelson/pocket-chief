import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_AIRWAY_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-airway-summary",
    type: "summary",
    heading: "At a glance",
    text: "The lethal endpoint in a failed airway is **failure of oxygenation, not failure to intubate** — the concept behind \"cannot intubate, cannot oxygenate\" (CICO). A **definitive airway** is a cuffed tube in the trachea; a supraglottic device is only a rescue bridge. **Continuous waveform capnography is the gold standard** for confirming tracheal placement, and when the difficult-airway algorithm is exhausted, the adult front-of-neck-access technique of choice is **scalpel-bougie-tube cricothyroidotomy**, performed through the cricothyroid membrane.",
  }, SOURCE),

  sourced({
    id: "block-airway-definitions-indications",
    type: "bullets",
    heading: "Definitions, physiology & indications for intubation",
    items: [
      "**Oxygenation versus ventilation**: oxygenation is O₂ delivery (PaO₂/SpO₂); ventilation is CO₂ clearance (PaCO₂). The lethal endpoint in a failed airway is failure of oxygenation, not failure to intubate — the concept behind \"cannot intubate, cannot oxygenate\" (CICO).",
      "**Definitive airway**: a cuffed tube in the trachea connected to a ventilation source — an ETT, a tracheostomy, or a cricothyroidotomy. A supraglottic or LMA device is a rescue or temporizing device, not a definitive airway.",
      "**Front-of-neck airway (FONA)**: surgical or needle access below the glottis — the final rescue step, Plan D, in the difficult-airway algorithm.",
      "**Airway protection or neurologic failure**: inability to protect the airway; the classic threshold is GCS ≤ 8 → intubate.",
      "**Mechanical obstruction**: trauma, tumor, hematoma, or infection.",
      "**Anticipated deterioration — intubate early**: deep facial or inhalation burns (posterior oropharyngeal soot, singed nares, stridor), an expanding neck hematoma, Ludwig angina or a deep-space neck infection, and angioedema.",
      "**Oxygenation or ventilation failure**: refractory hypoxemia or hypercarbia. There is no universal ABG cutoff — chronic baseline disease demands clinical judgment.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-difficult-prediction",
    type: "bullets",
    heading: "Difficult-airway prediction & preparation",
    items: [
      "**Mallampati class III–IV** (only the soft palate, or only the hard palate, visible) predicts a poor laryngoscopic view.",
      "**The 3-3-2 rule** — each measurement below threshold predicts difficulty: 3 fingerbreadths of inter-incisor mouth opening, 3 fingerbreadths from the hyoid to the mentum, and 2 fingerbreadths from the thyroid notch to the floor of the mouth (larynx position).",
      "**Reduced neck mobility**: C-spine injury, a cervical collar or in-line stabilization, or a prior cervical fusion.",
      "**Other anatomic predictors**: a short or thick neck, a large tongue, a receding mandible, obesity, and prior head or neck radiation or surgery.",
      "**The physiologically difficult airway** — a 2025 Difficult Airway Society emphasis: shock, severe hypoxemia, metabolic acidosis, and RV failure carry a high risk of peri-intubation arrest independent of anatomy.",
      "**Preparation mnemonic — STOP MAID**: suction, tools (blades, bougie, video laryngoscope), oxygen, positioning, monitors, assistants, IV access, and drugs.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-technique-sequence",
    type: "sequence",
    heading: "Intubation technique",
    steps: [
      { title: "Position the patient", detail: "Sniffing position — neck flexed on the torso, head extended — maintaining in-line stabilization if a C-spine injury is suspected." },
      { title: "Preoxygenate", detail: "Continuous oxygen delivery throughout, per current Difficult Airway Society guidance." },
      { title: "Insert the laryngoscope", detail: "Blade in on the right, sweep the tongue left; do not lever on the maxillary teeth. A Macintosh blade seats in the vallecula; a Miller blade lifts the epiglottis directly." },
      { title: "Optimize the view", detail: "External laryngeal manipulation with backward-upward-rightward pressure (BURP) if needed." },
      { title: "Pass the tube and confirm", detail: "Pass the ETT through the cords under direct vision, inflate the cuff, and confirm placement." },
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-confirmation-cuff",
    type: "bullets",
    heading: "Confirmation & cuff pressure",
    items: [
      "**Continuous waveform capnography is the gold standard**, confirming tracheal placement in roughly 88.5–100% of difficult airways; a sustained four-phase waveform had 100% sensitivity and specificity for tracheal placement in a controlled model.",
      "**Clinical signs cannot reliably exclude esophageal intubation**: the false-positive rate is roughly 0.69 for misting, 0.14 for lung auscultation, and 0.18 for five-point auscultation.",
      "**Caveat**: in cardiac arrest or very low pulmonary blood flow, end-tidal CO₂ can be falsely low or absent despite correct tube placement.",
      "**Cuff pressure — the current recommended range is 20–30 cmH₂O** (many sources say 25–30), measured by manometry rather than palpation. Above 30 cmH₂O risks mucosal capillary ischemia, stenosis, tracheoesophageal fistula, or tracheal rupture; below 20 cmH₂O risks aspiration and ventilator-associated pneumonia.",
      "**Board-classic versus current evidence**: the board-classic \"under 20–25 cmH₂O\" is a simplification, and empiric palpation is inaccurate in roughly 60% of patients.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-acute-complications-table",
    type: "table",
    heading: "Acute intubation complications",
    columns: ["Complication", "Identification", "Immediate management"],
    rows: [
      ["Esophageal intubation", "Flatline end-tidal CO₂, epigastric gurgling, progressive hypoxia", "Remove the ETT, bag-valve-mask to reoxygenate, then reattempt"],
      ["Right mainstem intubation", "Asymmetric breath sounds, high peak pressures, tube tip past the carina on chest X-ray", "Withdraw the ETT until breath sounds are symmetric, then reconfirm depth"],
      ["Dental or lip trauma", "Levering on the maxilla during laryngoscopy", "Lift along the handle's axis; retract the lip"],
      ["Failed airway", "Failure after 3 or fewer attempts, or desaturation", "Video laryngoscopy, then a supraglottic airway rescue, then emergency front-of-neck access if CICO"],
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-other-complications",
    type: "bullets",
    heading: "Complications: prolonged intubation & OR fire",
    items: [
      "**Prolonged intubation complications**: vocal cord granuloma, subglottic stenosis, tracheoesophageal fistula, tracheoinnominate fistula, ventilator-associated pneumonia, and sinusitis — mitigated by atraumatic technique, cuff manometry, and repositioning.",
      "**OR airway fire triad**: an oxidizer (oxygen, nitrous oxide), an ignition source (electrocautery or laser), and fuel (the ETT, drapes, or alcohol prep).",
      "**Prevention**: at least 3 minutes of drying time for alcohol preps, minimizing FiO₂, avoiding nitrous oxide, and using caution with cautery near the airway.",
      "**Action if a fire occurs**: simultaneously remove the ETT and stop gas flow, pour saline into the field, re-establish ventilation, then perform bronchoscopy to assess injury and remove debris.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-cico-flow",
    type: "flow",
    heading: "The failed airway / CICO algorithm (DAS Plans A–D)",
    nodes: [
      { id: "plana", label: "Plan A — tracheal intubation: optimize the first attempt with video laryngoscopy, limited to ≤ 3 attempts" },
      { id: "success", label: "Successful intubation", tone: "good" },
      { id: "planb", label: "Plan B — supraglottic airway: a second-generation device to restore oxygenation", tone: "caution" },
      { id: "planc", label: "Plan C — facemask ventilation if the SGA fails; consider waking the patient in elective cases", tone: "caution" },
      { id: "cico", label: "CICO declared: cannot intubate, cannot oxygenate", tone: "caution" },
      { id: "pland", label: "Plan D — emergency front-of-neck access: full neuromuscular blockade, one final attempt, then scalpel-bougie-tube cricothyroidotomy without delay", tone: "caution" },
    ],
    edges: [
      { from: "plana", to: "success", label: "first-pass or rescue success" },
      { from: "plana", to: "planb", label: "intubation fails or desaturation" },
      { from: "planb", to: "success", label: "oxygenation restored" },
      { from: "planb", to: "planc", label: "SGA fails" },
      { from: "planc", to: "success", label: "facemask ventilation adequate" },
      { from: "planc", to: "cico", label: "cannot oxygenate by any route" },
      { from: "cico", to: "pland" },
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-surgical-anatomy",
    type: "bullets",
    heading: "Surgical airway — anatomy & landmarks",
    items: [
      "**Landmarks, superior to inferior**: thyroid cartilage → cricothyroid membrane → cricoid cartilage → tracheal rings → sternal notch.",
      "**Cricothyroidotomy site**: through the cricothyroid membrane, between the thyroid and cricoid cartilage.",
      "**Tracheostomy site**: between the 2nd and 3rd tracheal rings (some texts describe 2nd to 4th).",
      "**Anterior jugular veins** run vertically and superficially, and bleed briskly if injured.",
      "**The thyroid isthmus** overlies rings 2–4 and should be retracted, or divided and suture-ligated.",
      "**The innominate (brachiocephalic) artery** crosses the trachea just behind the sternal notch — an incision below the 3rd ring risks a fatal tracheoinnominate fistula.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-modalities-table",
    type: "table",
    heading: "Surgical airway modalities — comparison",
    columns: ["Airway", "Primary indication", "Key contraindication"],
    rows: [
      ["Surgical cricothyroidotomy", "Adult CICO emergency; massive maxillofacial trauma", "Classic teaching held age under 10 to 12 years as a contraindication (a funnel-shaped cricoid risking subglottic stenosis) — current pediatric guidance is more nuanced (see Pediatric Considerations)"],
      ["Needle cricothyroidotomy", "Historically the pediatric CICO approach with jet ventilation", "Inability to jet-ventilate; tracheal disruption"],
      ["Open tracheostomy", "Elective prolonged ventilation, pulmonary toilet, complex head or neck disease", "Local infection, uncorrected coagulopathy, recent anterior cervical fusion (under 7 days)"],
      ["Percutaneous dilational tracheostomy (PDT)", "ICU bedside placement; faster and more cost-effective", "Emergency airway need, unpalpable landmarks or morbid obesity, a high-riding innominate artery, inability to extend the neck"],
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-surgical-techniques",
    type: "bullets",
    heading: "Surgical airway techniques",
    items: [
      "**Scalpel-bougie cricothyroidotomy (adult CICO)**",
      "- Stabilize the larynx with the non-dominant hand.",
      "- Make a vertical midline skin incision, avoiding the anterior jugular veins, then a horizontal stab through the cricothyroid membrane.",
      "- Rotate the scalpel or insert a bougie into the trachea, directed caudad.",
      "- Rail-road a cuffed 6.0 ETT or a size-6 tracheostomy tube over the bougie, and confirm placement with end-tidal CO₂.",
      "**Percutaneous dilational tracheostomy (two providers)**",
      "- FiO₂ 100%, a shoulder roll, and a bronchoscope adapter on the ETT.",
      "- The bronchoscopist withdraws the ETT, cuff deflated, to the subglottis and maintains a view of the anterior tracheal wall.",
      "- The operator punctures the 2nd–3rd tracheal interspace under bronchoscopic guidance, then uses a Seldinger wire and serial dilation to place the tube.",
      "- Reconfirm the tube's distal position above the carina before removing the ETT.",
      "**Open tracheostomy**",
      "- A horizontal incision roughly 2 cm above the sternal notch.",
      "- Separate the strap muscles at the midline raphe; retract or divide the thyroid isthmus.",
      "- Place stay sutures lateral to the tracheotomy, and open between the 2nd and 3rd rings.",
      "- Anesthesia withdraws the ETT under vision; place the tube, confirm with end-tidal CO₂, and secure it.",
      "- **Antibiotic prophylaxis is not routinely indicated** for tracheostomy creation.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-trach-timing",
    type: "bullets",
    heading: "Tracheostomy timing & physiologic benefits",
    items: [
      "**Physiologic advantages over prolonged ETT**: decreased dead space and airway resistance (lowering the work of breathing), decreased sedation, improved pulmonary toilet, comfort, and the ability to communicate.",
      "**TracMan (JAMA, 2013)**: early tracheostomy (≤ 4 days) versus late (> 10 days) showed no difference in 30-day or 2-year mortality.",
      "**A 2015 Cochrane meta-analysis** associated early tracheostomy with lower mortality (relative risk 0.83, a number needed to treat of roughly 11) — conflicting with TracMan.",
      "**More recent randomized-trial meta-analyses** found early tracheostomy shortens mechanical ventilation and ICU stay, but does not significantly reduce mortality or pneumonia.",
      "**Bottom line**: there is no universally mandated day — decide based on expected ventilation duration and weaning potential.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-post-trach-emergencies",
    type: "bullets",
    heading: "Post-tracheostomy emergencies",
    items: [
      "**Early dislodgement (under 7 days) is an emergency.** The tract is not yet epithelialized, so blind reinsertion creates a pretracheal false lumen and can cause airway loss. **Do not reinsert blindly through the stoma — secure the airway from above with orotracheal intubation.**",
      "**Late complication — tracheal stenosis** is the most common late complication; diagnose by bronchoscopy or CT, and treat with dilation, stenting, or segmental resection with end-to-end anastomosis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-tif-sequence",
    type: "sequence",
    heading: "↳ Tracheoinnominate fistula management",
    steps: [
      { title: "Recognize the sentinel bleed", detail: "Any bleeding from 3 days to 6 weeks after tracheostomy is tracheoinnominate fistula until proven otherwise — incidence is roughly 0.1–1%, with a classic peak at 7–14 days (a systematic-review median of 79.5 days). Risk factors include an incision below the 3rd tracheal ring, high cuff pressure, a malpositioned or low tube, and radiation." },
      { title: "Hyperinflate the tracheostomy cuff", detail: "Controls bleeding in roughly 70–85% of cases and is the first maneuver." },
      { title: "If bleeding continues, secure the airway from above", detail: "Orotracheal intubation past the stoma, remove the tracheostomy tube, and insert a finger through the stoma to compress the innominate artery against the posterior sternum — the Utley maneuver." },
      { title: "Achieve definitive repair", detail: "Median sternotomy with innominate artery ligation — low rebleed risk and tolerated via collateral flow. Direct repair or grafting in an infected field carries a high rebleed and mortality risk; endovascular stenting is a temporizing bridge only." },
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-pediatric",
    type: "bullets",
    heading: "Pediatric considerations",
    items: [
      "**Narrowest airway point**: classically the cricoid cartilage functionally, with the larynx more cephalad and anterior than in adults.",
      "**Uncuffed ETT sizing**: internal diameter (mm) = (age ÷ 4) + 4; cuffed sizing = (age ÷ 4) + 3.",
      "**Pediatric cuff pressure**: keep at or below 20 cmH₂O, or at or below 15 cmH₂O with modern high-volume, low-pressure microcuff tubes.",
      "**Pediatric front-of-neck access is genuinely unsettled below age 8.** The neonatal cricothyroid membrane is only about 2.6 mm tall — too small for a standard tube — so the older blanket teaching of \"no surgical cricothyroidotomy under 10 years, use a needle instead\" is outdated. Current Difficult Airway Society pediatric guidance keeps needle cricothyroidotomy first-line under 8 years, reserving a scalpel technique for needle failure, while separate otolaryngology-oriented reviews instead favor primary surgical tracheotomy under 8 when an otolaryngologist is immediately available. Above 8 years, a scalpel-bougie-tube technique is used for all front-of-neck access, as in adults.",
    ],
  }, SOURCE),

  sourced({
    id: "block-airway-warning",
    type: "warning",
    tone: "danger",
    heading: "Never reinsert a dislodged tracheostomy tube blindly",
    text: "Within the first **7 days**, the tracheostomy tract is not epithelialized. Blind reinsertion through the stoma creates a **pretracheal false lumen** and can cause airway loss. Secure the airway from above with **orotracheal intubation** instead.",
  }, SOURCE),

  sourced({
    id: "block-airway-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**GCS ≤ 8 → intubate.**",
      "**Waveform capnography is the gold standard** for confirming tracheal placement; clinical exam cannot reliably exclude esophageal intubation.",
      "**Cricothyroidotomy uses the cricothyroid membrane; tracheostomy uses rings 2–3.** Placement below ring 3 risks a fatal tracheoinnominate fistula.",
      "**Tracheoinnominate fistula**: hyperinflate the cuff first, then Utley finger compression, then sternotomy with innominate ligation. Any bleed 3 days to 6 weeks post-tracheostomy is TIF until proven otherwise.",
      "**Early tracheostomy dislodgement (under 7 days): intubate from above — never blind reinsertion through the stoma.**",
      "**Cuff pressure, classic versus current**: board-classic teaching says under 20–25 cmH₂O; the current evidence-based target is 20–30 cmH₂O by manometry, since above 30 risks ischemia and stenosis.",
      "**Tracheostomy timing, classic versus current**: older teaching and some meta-analyses suggested early tracheostomy lowers mortality, but TracMan showed no mortality benefit — early tracheostomy mainly reduces ventilator days and ICU stay.",
      "**Pediatric front-of-neck access, classic versus current**: the old \"no surgical cric under 10 years\" rule is outdated, but current guidance is itself mixed — needle cric first-line under 8 by DAS, or primary surgical tracheotomy under 8 by otolaryngology-oriented reviews.",
      "**Adult CICO rescue is scalpel-bougie-tube** — needle and cannula techniques fail in roughly 43% of real-world attempts.",
      "**No routine antibiotics are needed for tracheostomy creation.**",
    ],
  }, SOURCE),

  references("block-airway-references", [SOURCE]),
];

export const airwayAccessIntubationAndSurgicalAirwaysTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002001",
  versionId: "00000000-0000-4000-8000-000000002011",
  slug: "airway-access-intubation-and-surgical-airways",
  title: "Airway Access: Intubation and Surgical Airways",
  aliases: ["difficult airway", "CICO", "cannot intubate cannot oxygenate", "cricothyroidotomy", "surgical cricothyroidotomy", "needle cricothyroidotomy", "tracheostomy", "percutaneous dilational tracheostomy", "PDT", "front-of-neck access", "FONA", "waveform capnography", "video laryngoscopy", "Mallampati", "3-3-2 rule", "BURP maneuver", "STOP MAID", "tracheoinnominate fistula", "TIF", "Utley maneuver", "OR airway fire"],
  scoreNodeId: "critical-care-procedures",
  scoreCategory: "SCORE · Surgical Critical Care · Operations & Procedures",
  tags: ["surgical-critical-care", "airway", "absite", "score", "icu", "procedures"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
