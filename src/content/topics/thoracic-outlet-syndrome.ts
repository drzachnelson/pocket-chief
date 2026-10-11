import { buildTopic, references, sourced } from "@/content/authoring";
import { SCORE_TOS_SOURCE, TOS_PACKET_SOURCE, ESVS_VTE_2021_SOURCE, AVF_UEDVT_2026_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-thoracic-outlet-syndrome-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Thoracic outlet syndrome is compression of the **brachial plexus, subclavian vein or subclavian artery**. Neurogenic disease is most common and usually begins with physical therapy. A swollen cyanotic arm suggests venous disease; hand ischemia or distal embolization suggests arterial disease. Choose testing and treatment by the compressed structure."
}, SCORE_TOS_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-2",
  "type": "table",
  "heading": "Three spaces",
  "columns": [
    "Space",
    "Boundaries",
    "Structures"
  ],
  "rows": [
    [
      "Interscalene triangle",
      "Anterior scalene, middle scalene and first rib",
      "Brachial plexus and subclavian artery"
    ],
    [
      "Costoclavicular interval",
      "Clavicle and first rib",
      "Subclavian vein; it lies anterior to the anterior scalene"
    ],
    [
      "Subpectoral interval",
      "Beneath pectoralis minor near the coracoid",
      "Plexus and axillary vessels"
    ]
  ]
}, SCORE_TOS_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-3",
  "type": "table",
  "heading": "Three presentations",
  "columns": [
    "Subtype",
    "Presentation",
    "Evaluation"
  ],
  "rows": [
    [
      "Neurogenic",
      "Position-related pain, paresthesias and weakness; often ulnar-sided",
      "Exclude cervical radiculopathy and peripheral entrapment; clinical assessment ± electrodiagnostic testing"
    ],
    [
      "Venous",
      "Effort-related arm swelling, pain, cyanosis and collaterals; pulses may remain normal",
      "Duplex for axillosubclavian DVT; central imaging if suspicion persists"
    ],
    [
      "Arterial",
      "Ischemic fingers, embolization or subclavian aneurysmal disease, often with a bony anomaly",
      "Duplex and arterial imaging; chest radiograph for cervical/abnormal first rib"
    ]
  ]
}, SCORE_TOS_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-4",
  "type": "warning",
  "heading": "Provocative tests are not the diagnosis",
  "tone": "danger",
  "text": "Positional pulse loss or symptoms on a provocative maneuver alone do not establish clinically significant TOS. Correlate symptoms with anatomy and exclude competing neurologic or vascular disease. A negative limited duplex does not reliably exclude central subclavian thrombosis."
}, TOS_PACKET_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-5",
  "type": "sequence",
  "heading": "Venous TOS pathway",
  "steps": [
    {
      "title": "Confirm and anticoagulate",
      "detail": "Acute primary upper-extremity DVT usually receives therapeutic anticoagulation for at least three months when safe."
    },
    {
      "title": "Select thrombus removal",
      "detail": "Do not lyse every arm clot. Severe recent symptoms in a young active patient with low bleeding risk may justify early thrombus removal; ESVS describes selection within the first two weeks."
    },
    {
      "title": "Address the compression",
      "detail": "First rib resection is considered when clear venous TOS is present. Coordinate decompression, venous imaging and any residual stenosis treatment with the vascular team."
    }
  ]
}, ESVS_VTE_2021_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-6",
  "type": "prose",
  "heading": "↳ Current guidance on decompression",
  "text": "The **2026 AVF guideline** supports first rib resection as the initial operative treatment for vTOS-associated upper-extremity DVT. This strengthens the older ESVS “may be considered” wording. It does not make same-admission surgery or thrombolysis mandatory for every presentation; timing depends on symptoms, clot age, bleeding risk and the planned venous intervention."
}, AVF_UEDVT_2026_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-7",
  "type": "table",
  "heading": "Neurogenic versus arterial treatment",
  "columns": [
    "Problem",
    "Initial treatment",
    "Escalation"
  ],
  "rows": [
    [
      "Neurogenic TOS",
      "Postural and shoulder-girdle physical therapy; exclude competing diagnoses",
      "Selected persistent disabling symptoms: specialist evaluation, often a scalene block before decompression"
    ],
    [
      "Arterial TOS",
      "Urgent assessment of limb ischemia; define embolic and aneurysmal lesions",
      "Decompress the outlet and address damaged artery/distal emboli as indicated"
    ]
  ]
}, SCORE_TOS_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-8",
  "type": "warning",
  "heading": "Do not stent an undecompressed outlet",
  "tone": "danger",
  "text": "A stent across persistent costoclavicular compression can deform or fracture. Decompression and residual-lesion assessment come before considering selective venous stenting."
}, TOS_PACKET_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-9",
  "type": "bullets",
  "heading": "Operative anatomy and complications",
  "items": [
    "Phrenic nerve: anterior surface of the anterior scalene; protect during scalenectomy.",
    "Brachial plexus and subclavian vessels are immediately adjacent to the first rib. Excess traction can cause nerve injury.",
    "Pleural injury causes pneumothorax or hemothorax; left-sided dissection also risks the thoracic duct.",
    "Residual rib or fibrous bands can leave recurrent compression."
  ]
}, SCORE_TOS_SOURCE),
  sourced({
  "id": "block-thoracic-outlet-syndrome-10",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Board answer",
    "Current interpretation"
  ],
  "rows": [
    [
      "Young athlete with a blue swollen arm",
      "Paget-Schroetter: lysis then first rib resection",
      "Anticoagulate; select thrombus removal and decompression rather than automatically lysing every UEDVT"
    ],
    [
      "Neurogenic symptoms with overhead activity",
      "First rib resection",
      "Physical therapy and exclusion of mimics first; surgery for selected persistent disease"
    ]
  ]
}, TOS_PACKET_SOURCE),
  references("block-thoracic-outlet-syndrome-references", [SCORE_TOS_SOURCE, TOS_PACKET_SOURCE, ESVS_VTE_2021_SOURCE, AVF_UEDVT_2026_SOURCE]),
];

export const thoracicOutletSyndromeTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002920",
  slug: "thoracic-outlet-syndrome",
  title: "Thoracic Outlet Syndrome",
  aliases: ["TOS", "neurogenic TOS", "venous TOS", "arterial TOS", "venous thoracic outlet syndrome", "Paget-Schroetter syndrome", "effort thrombosis", "cervical rib"],
  versionId: "00000000-0000-4000-8000-000000002921",
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["absite", "score", "venous"],
  sourceId: SCORE_TOS_SOURCE,
  additionalSourceIds: [TOS_PACKET_SOURCE, ESVS_VTE_2021_SOURCE, AVF_UEDVT_2026_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
