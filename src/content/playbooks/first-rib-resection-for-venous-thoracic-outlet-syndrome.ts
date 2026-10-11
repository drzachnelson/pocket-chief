import { buildPlaybook, references, sourced } from "@/content/authoring";
import { FIRST_RIB_PLAYBOOK_SOURCE, AVF_UEDVT_2026_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "The goal is to relieve **costoclavicular subclavian vein compression**, not merely remove a piece of rib. Plan the approach around exposure of the vein, required venolysis and any reconstruction. This guide describes transaxillary decompression and the considerations that favor a supra-/infraclavicular exposure."
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-2",
  "type": "prose",
  "heading": "Selection",
  "text": "Confirmed vTOS-associated upper-extremity DVT warrants a decompression plan; the 2026 AVF guideline supports first rib resection as initial operative treatment. Anticoagulation, selective clot removal and surgery are coordinated according to acuity and bleeding risk. The guideline does not establish one mandatory date for all operations."
}, AVF_UEDVT_2026_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-3",
  "type": "table",
  "heading": "Choose the exposure",
  "columns": [
    "Approach",
    "Useful access",
    "Tradeoff"
  ],
  "rows": [
    [
      "Transaxillary",
      "First rib and costoclavicular attachments",
      "Deep narrow field; limited direct vascular reconstruction"
    ],
    [
      "Supraclavicular",
      "Scalenes, plexus and arterial anatomy",
      "Protect phrenic nerve and left thoracic duct; vein exposure may require extension"
    ],
    [
      "Infraclavicular or combined",
      "Anterior venous segment and planned reconstruction",
      "Greater exposure selected for the venous operation, not just cosmetic preference"
    ]
  ]
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-4",
  "type": "bullets",
  "heading": "Setup and landmarks",
  "items": [
    "General anesthesia; prep the chest, shoulder and arm so positioning can be adjusted. For transaxillary exposure use lateral positioning with the operative side up and carefully supported arm.",
    "The subclavian **vein lies anterior** to the anterior scalene; artery and plexus pass between the scalenes. The first rib forms the floor.",
    "Phrenic nerve lies on anterior scalene; long thoracic nerve is vulnerable around middle scalene. The pleural dome is immediately deep to the rib.",
    "Avoid sustained arm traction or excessive abduction; exposure should not be purchased by stretching the plexus."
  ]
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-5",
  "type": "warning",
  "heading": "Identify before dividing",
  "tone": "danger",
  "text": "Protect the subclavian vessels, plexus and pleura under direct vision before dividing rib attachments. A rib cutter or clamp passed blindly around the first rib can injure all three."
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-6",
  "type": "sequence",
  "heading": "Transaxillary decompression",
  "steps": [
    {
      "title": "Expose the chest-wall plane",
      "detail": "Incise below the axillary hairline between pectoralis major and latissimus. Preserve the intercostobrachial nerve when feasible; dissect along the chest wall toward the first rib."
    },
    {
      "title": "Identify the rib and bundle",
      "detail": "Distinguish the first rib and its attachments. Identify the vein anterior to the anterior scalene and protect the artery/plexus posteriorly; minimize retraction."
    },
    {
      "title": "Release compressing attachments",
      "detail": "Divide the anterior scalene insertion and the relevant subclavius/costoclavicular attachments with the vein protected. Release additional bands as the exposure requires."
    },
    {
      "title": "Free and resect the rib",
      "detail": "Use controlled periosteal dissection, keeping pleura inferior and neurovascular structures protected. Divide the anterior and posterior portions under vision and smooth residual bone."
    },
    {
      "title": "Confirm decompression",
      "detail": "Inspect for residual bands or bony compression through arm movement. Add venolysis or reconstruction only as planned and supported by the chosen exposure."
    },
    {
      "title": "Check pleura and close",
      "detail": "Irrigate and coordinate a recruitment breath to assess air leak. Address pleural entry, obtain hemostasis and choose drainage according to findings."
    }
  ]
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-7",
  "type": "table",
  "heading": "Completion and bailout",
  "columns": [
    "Finding",
    "Action"
  ],
  "rows": [
    [
      "Persistent vein narrowing",
      "Distinguish residual external compression from intrinsic scar; arrange venography and selective venoplasty/reconstruction"
    ],
    [
      "Vascular injury",
      "Pressure and controlled exposure; extend or change the approach for repair rather than clamp blindly"
    ],
    [
      "Pleural entry or intrathoracic air",
      "Evacuate air and place pleural drainage when indicated"
    ],
    [
      "Left-sided milky drainage",
      "Consider thoracic duct injury and manage a chyle leak"
    ]
  ]
}, FIRST_RIB_PLAYBOOK_SOURCE),
  sourced({
  "id": "block-first-rib-resection-for-venous-thoracic-outlet-syndrome-8",
  "type": "bullets",
  "heading": "Postoperative priorities",
  "items": [
    "Check respiratory status, arm edema, pulses and motor/sensory function. Assess for pleural air or bleeding and obtain chest imaging as indicated.",
    "Resume anticoagulation when hemostasis permits according to the UEDVT plan; rib resection does not erase the recent clot indication.",
    "Arrange a defined postoperative venous imaging plan and shoulder rehabilitation; some centers use protocolized early venography, while modality and timing vary. Persistent swelling warrants reassessment of residual stenosis or recurrent thrombosis.",
    "Complications include bleeding, recurrent thrombosis, plexus/phrenic/long-thoracic injury, pleural injury, chyle leak and incomplete decompression."
  ]
}, FIRST_RIB_PLAYBOOK_SOURCE),
  references("block-first-rib-resection-for-venous-thoracic-outlet-syndrome-references", [FIRST_RIB_PLAYBOOK_SOURCE, AVF_UEDVT_2026_SOURCE]),
];

export const firstRibResectionForVenousThoracicOutletSyndromePlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000013",
  slug: "first-rib-resection-for-venous-thoracic-outlet-syndrome",
  title: "First Rib Resection for Venous Thoracic Outlet Syndrome",
  aliases: ["venous TOS decompression", "Paget-Schroetter decompression", "transaxillary first rib resection"],
  procedureId: "first_rib_resection_for_venous_thoracic_outlet_syndrome",
  approach: "open",
  specialty: "Vascular",
  relatedTopicSlugs: ["thoracic-outlet-syndrome", "deep-venous-thrombosis"],
  tags: ["vascular", "venous", "operative"],
  sourceId: FIRST_RIB_PLAYBOOK_SOURCE,
  additionalSourceIds: [AVF_UEDVT_2026_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
