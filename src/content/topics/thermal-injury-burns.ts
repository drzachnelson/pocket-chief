import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

const SCORE = "00000000-0000-4000-8000-000000007800";
const FISER = "00000000-0000-4000-8000-000000007801";
const GRAFT = "00000000-0000-4000-8000-000000007802";
const ABA_FLUID = "00000000-0000-4000-8000-000000007803";
const ABA_REFERRAL = "00000000-0000-4000-8000-000000007804";
const EMSB = "00000000-0000-4000-8000-000000007805";

// Call Problems II, Run 2. Original prose condensed from the saved board packet;
// primary ABA sources distinguish current adult care from classic exam formulas.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-burn-overview", type: "summary", heading: "At a glance",
    text: "Assess burns by depth, extent, mechanism, airway risk, and perfusion. During the first 48 hours, capillary leak, hypovolemia, edema, increased vascular resistance, and myocardial depression cause burn shock; later physiology is hypermetabolic, with tachycardia, tachypnea, and increased temperature. Protect marginal tissue with perfusion and wound care, titrate resuscitation to hourly response, and arrange specialist care for deep or extensive injury.",
  }, SCORE),
  sourced({
    id: "block-burn-depth", type: "table", heading: "Assess depth",
    columns: ["Depth", "Examination and tissue"],
    rows: [
      ["Superficial / first degree", "Epidermal erythema, as in sunburn."],
      ["Superficial partial thickness", "Papillary dermis; pink, moist, blanching, blistered."],
      ["Deep partial thickness", "Reticular dermis; drier, dark pink/red, variably blanching."],
      ["Full thickness / third degree", "Entire dermis destroyed; dry, leathery black/brown/maroon eschar."],
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-burn-jackson", type: "prose", heading: "Jackson zones describe perfusion within the wound",
    text: "A central coagulation zone is irreversibly injured; surrounding stasis tissue has impaired microcirculation and may survive or deepen with hypoperfusion, edema, infection, or poor care; the outer hyperemic zone is viable. These zones describe the spatial pattern of injury, not interchangeable burn-depth grades. SCORE's superficial/partial/full-thickness associations are teaching shorthand; protecting the stasis zone limits burn conversion.",
  }, [[EMSB, SCORE]]),
  sourced({
    id: "block-burn-extent", type: "table", heading: "Estimate extent",
    columns: ["Region", "Adult TBSA", "Pediatric approximation"],
    rows: [
      ["Head", "9%", "18%"],
      ["Each arm", "9% per arm", "Also 9% per arm"],
      ["Each leg", "18%", "14%"],
      ["Anterior trunk", "18% anterior", "Also 18% anterior"],
      ["Posterior trunk", "18% posterior", "Also 18% posterior"],
      ["Perineum", "1%", "Use an age-adjusted chart."],
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-burn-size-pearls", type: "bullets", heading: "Sizing and early priorities",
    items: [
      "Use the patient's whole palmar hand, including fingers, as approximately 1% TBSA; Lund–Browder charts refine age-specific estimates.",
      "Count partial- and full-thickness injury in resuscitation TBSA; exclude superficial erythema.",
      "The supplied SCORE module starts formal fluids at ≥20% TBSA in adults and ≥15% in children; electrical injury requires assessment and resuscitation beyond the visible skin area.",
      "Enclosed-space smoke, facial burns, wheeze, and carbonaceous sputum suggest inhalation injury; fiberoptic bronchoscopy evaluates the airway. Stridor/obstruction, worsening hypoxemia, or anticipated massive edema favor early intubation.",
      "Check tetanus protection. Electrical injury can cause arrhythmia, rhabdomyolysis, occult deep damage, fractures, or visceral injury despite small skin wounds.",
    ],
  }, [[SCORE], [ABA_REFERRAL], [SCORE], [FISER], [FISER]]),
  sourced({
    id: "block-burn-referral", type: "bullets", heading: "Current ABA consultation and transfer criteria",
    items: [
      "Seek immediate burn-center consultation, considering transfer, for full-thickness injury, partial-thickness injury ≥10% TBSA, or deep burns of the face, hands, feet, genitalia, perineum, or joints; comorbidity, associated trauma, and uncontrolled pain also qualify.",
      "Suspected inhalation injury, any chemical injury, high-voltage electrical injury (≥1,000 V), and lightning warrant immediate consultation with transfer consideration. Low-voltage injury warrants consultation and follow-up for delayed effects.",
      "Consult for smaller partial-thickness or potentially deep burns. All pediatric burns may benefit from referral for dressing care, pain, rehabilitation, caregiver needs, or possible nonaccidental injury.",
    ],
  }, ABA_REFERRAL),
  sourced({
    id: "block-burn-fluids", type: "bullets", heading: "Classic Parkland calculation and bedside titration",
    items: [
      "Classic Parkland: 4 mL/kg/%TBSA during the first 24 hours after injury, half in the first 8 hours and half over the next 16. It estimates an opening rate; elapsed time is measured from injury, not arrival.",
      "Titrate hourly to perfusion and urine output: adults 0.5 mL/kg/h (often about 30 mL/h), children under 30 kg 1 mL/kg/h, and myoglobinuria 75–100 mL/h until urine clears.",
      "Avoid reflexive boluses for isolated oliguria; reassess perfusion and the infusion rate. Hypotension may require a bolus and increased maintenance of resuscitation.",
    ],
  }, SCORE),
  sourced({
    id: "block-burn-current-fluid", type: "prose", heading: "Current adult resuscitation",
    text: "For adults with burns ≥20% TBSA, the ABA guideline recommends an initial estimated volume of **2 mL/kg/%TBSA over the first 24 hours after injury**, followed by titration. Consider albumin, particularly for larger burns, and selective intra-abdominal/intraocular pressure monitoring. The guideline addresses the first 48 hours in adults; it does not establish a pediatric formula. Keep the classic 4 mL Parkland answer distinct from this starting strategy.",
  }, ABA_FLUID),
  sourcedUnits({
    id: "block-burn-splits", type: "table", heading: "Board answer versus current practice",
    columns: ["Question", "Supplied board source", "Interpretation"],
    rows: [
      ["Formula cap and fluid", "Fiser caps Parkland at 50% TBSA and specifies lactated Ringer; inhalation injury, alcohol, electrical injury, and post-escharotomy states may need more fluid.", "SCORE gives no 50% cap. Preserve the exam detail, but titrate the real rate to response rather than imposing a cap."],
      ["Young infant output", "Fiser: >2 mL/kg/h below 6 months.", "SCORE: children under 30 kg target 1 mL/kg/h, with no infant-specific band; this difference needs pediatric specialist interpretation."],
      ["Legacy admission thresholds", "Fiser: >10% TBSA below age 10 or above 50, >20% otherwise, or full-thickness ≥5%; special sites, electrical/chemical/inhalation injury and social needs also qualify.", "Use the separate current ABA consultation criteria rather than these historical admission cutoffs."],
      ["Chemical irrigation", "Fiser: 15 minutes.", "SCORE: at least 30 minutes; brush powder off first. The source difference is retained."],
      ["Escharotomy timing", "Fiser describes a 4–6-hour frame.", "SCORE: release when compression is suspected; do not wait for pulse or neurologic loss."],
      ["Infection counts", "Fiser: biopsy best separates colonization from infection; >10^5 organisms or beta-hemolytic streptococci preclude grafting; Pseudomonas is the classic organism.", "These are attributed exam rules, not universal culture-only definitions or substitutes for clinical assessment."],
      ["Excision limits", "Fiser: excise after resuscitation within 72 hours; each session <1 L blood loss, <20% skin, and <2 hours.", "Retain as historical board thresholds; actual staging depends on stability, wound extent, and the burn team."],
      ["Nutrition formulas", "Fiser: 25 kcal/kg/day + 30 kcal per %burn; protein 1 g/kg/day + 3 g per %burn.", "These fixed formulas are supplied board estimates, not individualized nutrition prescriptions."],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, ABA_REFERRAL], [FISER, SCORE], [FISER, SCORE], [FISER], [FISER], [FISER]]),
  sourced({
    id: "block-burn-compression", type: "warning", heading: "Release compression promptly",
    text: "Circumferential full-thickness eschar can constrict an edematous limb during resuscitation. A tight examination may be more reliable than pain, paresthesia, pulses, or measured pressures; pressures >30 mmHg or within 30 mmHg of diastolic pressure can support the diagnosis but are difficult to measure through edema. Perform [[Escharotomy]] when concern arises. Torso constriction raises airway pressures and impairs gas exchange. Deep electrical muscle injury with true fascial compartment syndrome requires [[Fasciotomy]], because opening skin eschar alone is insufficient.",
  }, SCORE),
  sourced({
    id: "block-burn-chemical", type: "bullets", heading: "Chemical and electrical mechanisms",
    items: [
      "Remove contaminated clothing; brush dry powder away before water, then irrigate liquid exposures for at least 30 minutes. Irrigate eyes without contaminating the opposite eye and reassess pH. Do not attempt acid–base neutralization: heat from the reaction can worsen injury.",
      "Acids cause coagulative necrosis; alkalis cause liquefactive necrosis and can continue damaging deep tissue. Hydrofluoric acid also causes systemic fluoride toxicity through calcium binding; calcium gluconate is the specific treatment.",
      "Electrical current equals voltage divided by resistance. High voltage (≥1,000 V) may cause deep necrosis and mechanical trauma from tetany; examine beyond the contact wounds.",
    ],
  }, SCORE),
  sourcedUnits({
    id: "block-burn-topicals", type: "table", heading: "Topical agents and infection",
    columns: ["Agent", "Role", "Key adverse effect or limitation"],
    rows: [
      ["Bacitracin", "Partial-thickness prophylaxis; gram-positive coverage", "Poor gram-negative coverage; rash on intact skin."],
      ["Mupirocin", "Suspected staphylococcal/MRSA infection", "Local irritation; not routine prophylaxis."],
      ["Silver sulfadiazine", "Full-thickness wounds; gram-positive and gram-negative activity", "Neutropenia and methemoglobinemia; neonatal/late-pregnancy kernicterus risk. Fiser emphasizes limited eschar penetration and delayed epithelialization, unlike SCORE's penetration wording."],
      ["Mafenide acetate", "Deep wounds, including cartilage or graft contexts", "Pain; carbonic anhydrase inhibition causes hyperchloremic metabolic acidosis; poor fungal/MRSA activity."],
      ["Silver nitrate", "Selected full-thickness or meshed-graft care", "Not routine first line; staining, irritation, methemoglobinemia, and sodium/chloride/potassium/calcium depletion."],
    ],
  }, [[SCORE], [SCORE], [SCORE, FISER], [SCORE, FISER], [SCORE]]),
  sourced({
    id: "block-burn-graft", type: "sequence", heading: "Excision and coverage principles",
    steps: [
      { title: "Select the wound", detail: "Full-thickness injury and deep partial-thickness wounds failing to heal within 21 days, especially at function-critical sites, need graft consideration. A viable, well-perfused, infection-free bed is essential." },
      { title: "Remove nonviable tissue", detail: "Tangential shaving preserves healthy tissue and improves function/cosmesis but increases bleeding and may require further excision. Fascial excision reaches a reliable bed faster with less bleeding, at a functional and cosmetic cost." },
      { title: "Choose permanent or temporary cover", detail: "Autograft is permanent. Allograft temporizes a questionable bed, infection/organ failure, instability, or donor shortage and is eventually rejected." },
      { title: "Match thickness and protect take", detail: "Medium split-thickness grafts balance survival and durability; donor dermal appendages permit regrowth. Full-thickness grafts contract less over time but demand more revascularization. Prevent hematoma, seroma, infection, shear, and reversed graft orientation." },
    ],
  }, GRAFT),
  sourcedUnits({
    id: "block-burn-followup", type: "bullets", heading: "Healing, infection, and long-term traps",
    items: [
      "Superficial partial-thickness wounds often heal within 14–21 days; wounds taking >3 weeks have greater hypertrophic-scar risk. Young age, deeper injury, darker skin, infection, mesh grafting, neck/arm burns, and genetic factors also increase risk.",
      "Treat invasive burn wound infection with systemic antibiotics and excision when indicated; routine prophylactic IV antibiotics do not prevent burn wound infection. Cellulitis alone may need antibiotics without excision.",
      "Hypertrophic scars stay within the original wound. Use rehabilitation, compression, silicone, and scar massage; selected scars need laser or contracture release. Scars can worsen initially during the first 6–8 months; growing children need ongoing review.",
      "A chronic ulcer or unstable burn scar can develop Marjolin squamous cell carcinoma years later.",
      "Possible nonaccidental burns include delayed or conflicting histories, prior injuries, sharply demarcated uniform-depth scalds, absent splash marks, glove/stocking distributions, flexor sparing, and deep focal contact burns.",
    ],
  }, [[SCORE], [FISER], [SCORE], [SCORE], [FISER]]),
  references("block-burn-references", [SCORE, FISER, GRAFT, ABA_FLUID, ABA_REFERRAL, EMSB]),
];

export const thermalInjuryBurnsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000007820",
  versionId: "00000000-0000-4000-8000-000000007821",
  slug: "thermal-injury-burns", title: "Thermal Injury and Burns",
  aliases: ["burns", "cutaneous thermal injury", "burn shock", "Parkland formula", "rule of nines", "burn resuscitation", "inhalation injury", "Jackson zones", "Lund-Browder chart"],
  scoreNodeId: "trauma-conditions", scoreCategory: "SCORE · Trauma · Diseases & Conditions",
  tags: ["trauma", "burns", "thermal-injury", "burn-resuscitation", "general-surgery-call", "absite", "score"],
  sourceId: SCORE, additionalSourceIds: [FISER, GRAFT, ABA_FLUID, ABA_REFERRAL, EMSB], blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
