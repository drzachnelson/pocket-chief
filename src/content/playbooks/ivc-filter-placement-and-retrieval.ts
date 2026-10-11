import { buildPlaybook, references, sourced } from "@/content/authoring";
import { IVC_FILTER_PLAYBOOK_SOURCE, SIR_IVC_FILTER_2020_SOURCE, SCORE_VENA_CAVA_FILTER_SOURCE, IVC_FILTER_DECISION_ANALYSIS_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Plan placement **and retrieval together**. Map the cava, renal inflows and access route; match the device to its instructions for use (IFU). Standard placement is infrarenal. Retrieval requires reassessment of the original PE risk, anticoagulation and trapped thrombus; an embedded filter needs a deliberate advanced-retrieval plan."
}, IVC_FILTER_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-2",
  "type": "bullets",
  "heading": "Selection and follow-up",
  "items": [
    "The clearest indication is acute VTE with a contraindication to anticoagulation. A filter does not treat DVT or replace restarting anticoagulation when safe.",
    "Do not add one routinely to effective anticoagulation or use one as routine surgical/trauma prophylaxis. Recurrent VTE requires confirmation and investigation of treatment failure before exceptional filter use.",
    "Assign responsibility for reassessment and removal at insertion; remove a retrievable filter once protection is no longer needed unless removal risk outweighs benefit."
  ]
}, SIR_IVC_FILTER_2020_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-3",
  "type": "warning",
  "heading": "The device controls the technique",
  "tone": "danger",
  "text": "Caval diameter limits, access direction, deployment, permissible recapture and retrieval tools are **device-specific**. Do not treat 28 mm, 30 mm, one guidewire size, or “hold the pusher and pull the sheath” as a universal instruction. A fully released filter may not be safely recaptured."
}, IVC_FILTER_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-4",
  "type": "table",
  "heading": "Anatomy before deployment",
  "columns": [
    "Finding",
    "Planning consequence"
  ],
  "rows": [
    [
      "Lowest renal inflow",
      "The usual landing zone is below all renal vein inflows; include retroaortic/circumaortic branches"
    ],
    [
      "Duplicated cava",
      "A single right infrarenal filter leaves a bypass route; consider bilateral or suprarenal filtration with specialist planning"
    ],
    [
      "Left-sided cava",
      "Define the crossing and renal junction before choosing access and landing zone"
    ],
    [
      "Large diameter, thrombus or no landing zone",
      "Stop and revise the device/location plan; do not deploy outside labeled limits"
    ]
  ]
}, SCORE_VENA_CAVA_FILTER_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-5",
  "type": "sequence",
  "heading": "Placement",
  "steps": [
    {
      "title": "Prepare",
      "detail": "Review indication, imaging, coagulation/renal status, contrast plan and device IFU. Use fluoroscopy, sterile ultrasound-guided venous access and a compatible delivery system."
    },
    {
      "title": "Access",
      "detail": "Choose a patent jugular or femoral route appropriate to the device and thrombus distribution. Advance wires under imaging; avoid blind branch entry."
    },
    {
      "title": "Cavography",
      "detail": "Confirm patency, diameter, renal vein inflows and variants. Prior cross-sectional imaging can supplement the cavogram."
    },
    {
      "title": "Position and deploy",
      "detail": "Align the planned landing zone below the lowest renal inflow unless a justified suprarenal strategy was chosen. Reconfirm landmarks and release according to the IFU."
    },
    {
      "title": "Complete",
      "detail": "Confirm location, expansion and wall contact; assess tilt, injury and residual thrombus. Remove access equipment, obtain hemostasis and record device details and the follow-up plan."
    }
  ]
}, IVC_FILTER_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-6",
  "type": "sequence",
  "heading": "Standard retrieval",
  "steps": [
    {
      "title": "Reassess indication",
      "detail": "Confirm that ongoing PE risk no longer requires filtration. Review anticoagulation and obtain selective preprocedure imaging for suspected embedment, penetration, fracture or complex dwell."
    },
    {
      "title": "Access and inspect",
      "detail": "Use the compatible retrieval route, commonly the right internal jugular vein. Cavography evaluates the filter and significant trapped clot; defer and treat thrombus when retrieval would risk embolization."
    },
    {
      "title": "Capture and sheath",
      "detail": "Engage the retrieval hook with the appropriate snare and advance the retrieval sheath to collapse the filter according to its IFU. Stop if resistance or deformation suggests embedment."
    },
    {
      "title": "Check completion",
      "detail": "Inspect the removed filter for integrity and image the cava for injury or retained components. Continue anticoagulation according to the underlying VTE indication."
    }
  ]
}, IVC_FILTER_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-7",
  "type": "prose",
  "heading": "Timing: what 29–54 days means",
  "text": "The often-quoted **29–54 days** comes from a decision model for transient risk after that risk has passed. It is not a universal deadline: reassess early and arrange removal when the clinical indication resolves."
}, IVC_FILTER_DECISION_ANALYSIS_SOURCE),
  sourced({
  "id": "block-ivc-filter-placement-and-retrieval-8",
  "type": "table",
  "heading": "Bailouts and complications",
  "columns": [
    "Problem",
    "Response"
  ],
  "rows": [
    [
      "Tilted or embedded hook",
      "Avoid forceful traction; refer for planned advanced snare/loop, forceps or laser techniques with appropriate expertise"
    ],
    [
      "Caval injury or significant bleeding",
      "Stop, obtain hemodynamic and endovascular/surgical support, and control bleeding"
    ],
    [
      "Large trapped thrombus",
      "Reassess anticoagulation and defer removal as appropriate"
    ],
    [
      "Fracture, migration or organ penetration",
      "Define anatomy and symptoms; weigh retrieval against procedural risk"
    ],
    [
      "New bilateral leg swelling",
      "Evaluate filter/caval thrombosis; a filter can worsen venous obstruction"
    ]
  ]
}, IVC_FILTER_PLAYBOOK_SOURCE),
  references("block-ivc-filter-placement-and-retrieval-references", [IVC_FILTER_PLAYBOOK_SOURCE, SIR_IVC_FILTER_2020_SOURCE, SCORE_VENA_CAVA_FILTER_SOURCE, IVC_FILTER_DECISION_ANALYSIS_SOURCE]),
];

export const ivcFilterPlacementAndRetrievalPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000012",
  slug: "ivc-filter-placement-and-retrieval",
  title: "IVC Filter Placement and Retrieval",
  aliases: ["percutaneous caval filter", "filter retrieval", "filter removal"],
  procedureId: "ivc_filter_placement_and_retrieval",
  approach: "endovascular",
  specialty: "Vascular",
  relatedTopicSlugs: ["vena-cava-filter-insertion", "deep-venous-thrombosis"],
  tags: ["vascular", "venous", "operative"],
  sourceId: IVC_FILTER_PLAYBOOK_SOURCE,
  additionalSourceIds: [SIR_IVC_FILTER_2020_SOURCE, SCORE_VENA_CAVA_FILTER_SOURCE, IVC_FILTER_DECISION_ANALYSIS_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
