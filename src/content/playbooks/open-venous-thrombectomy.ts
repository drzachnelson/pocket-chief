import { buildPlaybook, references, sourced } from "@/content/authoring";
import { SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE, SIR_ILIOFEMORAL_DVT_2023_SOURCE, OPEN_VENOUS_PLAYBOOK_SOURCE, OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-open-venous-thrombectomy-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Open thrombectomy is a selected option for **acute iliofemoral DVT**, especially limb-threatening venous ischemia when catheter treatment is unsuitable, unavailable or unsuccessful. The aim is rapid restoration of venous drainage with correction of important outflow obstruction; clot removal does not replace anticoagulation."
}, SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-2",
  "type": "bullets",
  "heading": "Decide before incision",
  "items": [
    "Phlegmasia with threatened viability requires urgent vascular assessment and a thrombus-removal plan. Anticoagulation alone is standard for most uncomplicated DVT.",
    "Assess clot extent, symptom duration, bleeding risk and whether a catheter approach offers a better balance. A contraindication to thrombolysis does not mean systemic anticoagulation is automatically safe.",
    "Anticipate iliac/caval outflow lesions and plan access to completion imaging and endovascular adjuncts."
  ]
}, SIR_ILIOFEMORAL_DVT_2023_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-3",
  "type": "bullets",
  "heading": "Setup and structures at risk",
  "items": [
    "Supine in a fluoroscopy-capable operating room; prepare the groin and leg with access for imaging and adjunctive intervention.",
    "Expose the common femoral vein medial to the artery; control relevant femoral/deep femoral tributaries and preserve crossing lymphatics.",
    "Plan anticoagulation and prevention of embolization with anesthesia and the vascular team; routine prophylactic filter placement is not implied."
  ]
}, OPEN_VENOUS_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-4",
  "type": "warning",
  "heading": "Venous valves change the technique",
  "tone": "danger",
  "text": "Do not copy an arterial embolectomy maneuver into the distal venous tree. Repeated blind distal balloon passage can damage valves. Define proximal outflow under imaging and use controlled distal clot evacuation."
}, OPEN_VENOUS_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-5",
  "type": "sequence",
  "heading": "Core operation",
  "steps": [
    {
      "title": "Expose and control",
      "detail": "Expose the common femoral vein through a groin incision; establish control and the planned systemic anticoagulation before venotomy."
    },
    {
      "title": "Open the vein",
      "detail": "Create a venotomy adequate for clot extraction and later closure without stenosis."
    },
    {
      "title": "Clear proximal outflow",
      "detail": "Perform controlled proximal iliac/caval balloon thrombectomy under fluoroscopy. Stop with resistance or suspected injury."
    },
    {
      "title": "Restore distal inflow",
      "detail": "Use controlled distal-to-proximal external compression to evacuate infrainguinal clot rather than routine blind catheter passage through valves."
    },
    {
      "title": "Image and correct outflow",
      "detail": "Completion phlebography evaluates retained clot and iliac obstruction; selectively treat a significant residual lesion."
    },
    {
      "title": "Close and confirm",
      "detail": "Close without narrowing, restore flow and confirm patency. Check the limb and compartments; arrange postoperative anticoagulation and surveillance."
    }
  ]
}, OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-6",
  "type": "table",
  "heading": "Bailout and postoperative care",
  "columns": [
    "Problem",
    "Response"
  ],
  "rows": [
    [
      "Poor outflow or rapid rethrombosis",
      "Reimage for retained thrombus, iliac compression or technical narrowing; consider an adjunctive catheter or reconstructive strategy"
    ],
    [
      "Bleeding or vein injury",
      "Obtain control and repair with adequate exposure; reassess anticoagulation against limb and bleeding risk"
    ],
    [
      "Threatened compartments",
      "Urgent compartment assessment and fasciotomy when indicated"
    ],
    [
      "Follow-up",
      "Continue therapeutic anticoagulation when safe; monitor wound/lymph leak, recurrent DVT, PE and post-thrombotic symptoms"
    ]
  ]
}, OPEN_VENOUS_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-open-venous-thrombectomy-7",
  "type": "prose",
  "heading": "Where technique varies",
  "text": "Published series describe temporary caval occlusion, adjunctive arteriovenous fistulas and different anticoagulation courses. These are selected strategies, not obligatory steps."
}, OPEN_VENOUS_PLAYBOOK_SOURCE),
  references("block-open-venous-thrombectomy-references", [SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE, SIR_ILIOFEMORAL_DVT_2023_SOURCE, OPEN_VENOUS_PLAYBOOK_SOURCE, OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE]),
];

export const openVenousThrombectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000014",
  slug: "open-venous-thrombectomy",
  title: "Open Venous Thrombectomy",
  aliases: ["open iliofemoral thrombectomy", "surgical venous thrombectomy", "phlegmasia thrombectomy"],
  procedureId: "open_venous_thrombectomy",
  approach: "open",
  specialty: "Vascular",
  relatedTopicSlugs: ["deep-venous-thrombosis", "evaluation-of-a-swollen-leg"],
  tags: ["vascular", "venous", "operative"],
  sourceId: SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE,
  additionalSourceIds: [SIR_ILIOFEMORAL_DVT_2023_SOURCE, OPEN_VENOUS_PLAYBOOK_SOURCE, OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
