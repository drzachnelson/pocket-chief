import { buildPlaybook, references, sourced } from "@/content/authoring";
import { ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE, SVS_AVF_AVLS_VARICOSE_2023_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-endovenous-ablation-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "This guide covers **radiofrequency or laser thermal ablation** of a refluxing saphenous trunk. Confirm the symptomatic reflux target and deep outflow, position the catheter under ultrasound, create a circumferential tumescent heat shield and deliver energy according to the device. Nonthermal techniques have different setup and closure instructions."
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-2",
  "type": "bullets",
  "heading": "Selection and alternatives",
  "items": [
    "Map reflux with standing duplex and establish that it explains symptoms or skin/ulcer disease. Identify the junction, target length, tortuosity and deep patency.",
    "Defer elective treatment during acute DVT or acute superficial thrombosis and address active local infection. Check arterial perfusion before prescribing compression.",
    "Assess whether the saphenous trunk is an essential collateral or a potential reconstructive conduit; deep venous disease is not a blanket prohibition.",
    "Alternatives include compression, nonthermal closure, ultrasound-guided foam, tributary phlebectomy or selected surgical stripping."
  ]
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-3",
  "type": "table",
  "heading": "Structures at risk",
  "columns": [
    "Structure",
    "Risk",
    "Protection"
  ],
  "rows": [
    [
      "Common femoral or popliteal vein",
      "Thrombus extension or deep injury",
      "Map the junction and confirm catheter position before energy"
    ],
    [
      "Saphenous nerve",
      "Below-knee great saphenous treatment",
      "Choose access and treatment extent; consider a nonthermal alternative in vulnerable segments"
    ],
    [
      "Sural nerve",
      "Small saphenous treatment",
      "Map anatomy and avoid unsafe distal thermal treatment"
    ],
    [
      "Skin",
      "Burn or pigmentation in a superficial segment",
      "Circumferential tumescence; change technique if adequate separation cannot be obtained"
    ]
  ]
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-4",
  "type": "sequence",
  "heading": "Thermal ablation",
  "steps": [
    {
      "title": "Prepare and map",
      "detail": "Mark the target and tributaries; use sterile ultrasound and local anesthesia. For laser, apply the specified eye and laser safety precautions."
    },
    {
      "title": "Access the target",
      "detail": "Puncture under ultrasound and advance the wire/sheath without forcing tortuous segments."
    },
    {
      "title": "Position the active tip",
      "detail": "Identify the deep junction and relevant tributaries. Set and recheck the starting position using the device IFU; one fixed distance does not apply to every system."
    },
    {
      "title": "Create tumescence",
      "detail": "Infiltrate dilute local anesthetic circumferentially around the entire treatment segment. Confirm vein compression and separation from skin and nearby structures; account for total anesthetic dose."
    },
    {
      "title": "Treat under control",
      "detail": "Recheck tip position after tumescence and repositioning. Deliver the specified cycles or pullback energy; do not substitute a generic watts/J-per-cm rule. Stop energy before the active segment reaches the skin."
    },
    {
      "title": "Complete",
      "detail": "Confirm target closure and deep vein flow by ultrasound. Obtain puncture hemostasis, dress the site and prescribe the ambulation/compression and follow-up plan."
    }
  ]
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-5",
  "type": "warning",
  "heading": "Stop when the geometry is unsafe",
  "tone": "danger",
  "text": "Do not force a catheter, activate in the deep vein, or heat a segment without an adequate tumescent shield. Reaccess, stage treatment or choose a nonthermal/surgical alternative when the target cannot be treated safely."
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-6",
  "type": "bullets",
  "heading": "Surveillance and thrombosis",
  "items": [
    "After thermal ablation, **average-risk asymptomatic** patients do not need routine early duplex. Obtain early duplex for symptoms or high thrombotic risk.",
    "Assess VTE risk before treatment; selected high-risk patients may warrant pharmacologic prophylaxis.",
    "Symptomatic ablation-related thrombus extension (ARTE), and asymptomatic **ARTE III–IV**, warrant anticoagulation. Treat proximal DVT according to DVT guidance and use duplex to guide ARTE retraction."
  ]
}, SVS_AVF_AVLS_VARICOSE_2023_SOURCE),
  sourced({
  "id": "block-endovenous-ablation-7",
  "type": "bullets",
  "heading": "Aftercare and complications",
  "items": [
    "Encourage early walking. Compression may reduce pain after thermal treatment; fit and duration follow the treatment and perfusion assessment.",
    "Review new leg swelling, calf pain, dyspnea or chest symptoms promptly for DVT/PE.",
    "Other complications include superficial thrombophlebitis, hematoma, burns, pigmentation, sensory nerve injury, recanalization and recurrent varicosities."
  ]
}, ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE),
  references("block-endovenous-ablation-references", [ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE, SVS_AVF_AVLS_VARICOSE_2023_SOURCE]),
];

export const endovenousAblationPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000015",
  slug: "endovenous-ablation",
  title: "Endovenous Ablation",
  aliases: ["endovenous thermal ablation", "RFA vein ablation", "EVLA", "endovenous laser ablation", "radiofrequency saphenous ablation"],
  procedureId: "endovenous_ablation",
  approach: "endovascular",
  specialty: "Vascular",
  relatedTopicSlugs: ["varicose-veins", "venous-stasis-and-chronic-venous-insufficiency", "thrombophlebitis"],
  tags: ["vascular", "venous", "operative"],
  sourceId: ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE,
  additionalSourceIds: [SVS_AVF_AVLS_VARICOSE_2023_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
