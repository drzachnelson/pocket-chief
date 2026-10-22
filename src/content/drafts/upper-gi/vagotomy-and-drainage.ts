import { buildDraftTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  SCORE_VAGOTOMY_SOURCE,
  FISER_ESOPHAGUS_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/vagotomy-and-drainage.md. Clinical approval remains pending.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "Vagotomy reduces neural stimulation of acid secretion, but the extent of denervation determines the emptying problem it creates. **Truncal and selective vagotomy require drainage; highly selective vagotomy preserves antral/pyloric innervation and ordinarily does not.** Antrectomy adds gastrin reduction and removes diseased/scarred distal stomach, at the cost of reconstruction and more postgastrectomy morbidity. Medical acid suppression and H. pylori treatment have made definitive ulcer operations uncommon; the indication must justify the added physiologic and anatomic cost.",
  "id": "upper-gi-vagotomy-and-drainage-01"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Select the indication before selecting the operation",
  "text": "SCORE lists obstructing, bleeding, perforated, and intractable ulcers among indications for vagotomy/pyloroplasty; it also lists gastric-conduit drainage after esophagectomy and pyloric stenosis. These are different clinical problems. **Pyloroplasty alone can address drainage without an acid-reducing indication.** Conversely, an emergency ulcer complication does not require definitive acid surgery if the patient cannot tolerate it.",
  "id": "upper-gi-vagotomy-and-drainage-02"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Select the indication before selecting the operation",
  "text": "Before labeling disease intractable, document persistent endoscopic ulceration despite adequate therapy, reconsider H. pylori/NSAIDs/adherence, assess malignancy, and consider a hypersecretory state. SCORE uses 8–12 weeks of treatment and Fiser approximately three months; those descriptions concern persistent disease rather than symptoms alone.",
  "id": "upper-gi-vagotomy-and-drainage-03"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "↳ Select the indication before selecting the operation",
  "columns": [
    "Clinical problem",
    "What the operation must accomplish"
  ],
  "rows": [
    [
      "Active peptic obstruction",
      "Relieve the obstruction and address ulcer drive; antrectomy plus vagotomy is a classic option if feasible."
    ],
    [
      "Refractory high-acid ulcer disease",
      "Reduce acid stimulation after reassessing medical treatment and etiology."
    ],
    [
      "Bleeding or perforation in shock",
      "Control bleeding/contamination first; add definitive acid reduction selectively after judging physiology."
    ],
    [
      "Gastric ulcer suspicious for cancer",
      "Obtain tissue and plan appropriate ulcer removal/resection; vagotomy alone does not resolve the diagnostic issue."
    ],
    [
      "Emptying disorder without active PUD",
      "Establish whether drainage is indicated; vagotomy may exacerbate gastroparesis."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-04"
}, [[SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Acid secretion and gastric emptying",
  "text": "Acetylcholine, gastrin, and histamine stimulate parietal acid output. Vagotomy interrupts neural stimulation, while antrectomy removes antral G cells. Combining them produces more acid suppression than either mechanism alone but adds resection/reconstruction consequences. The source estimates approximately 50% reduction in peak acid output after vagotomy and 85% after vagotomy-antrectomy; these are teaching estimates, not intraoperative adequacy tests.",
  "id": "upper-gi-vagotomy-and-drainage-05"
}, SCORE_VAGOTOMY_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Acid secretion and gastric emptying",
  "text": "The proximal stomach normally undergoes receptive relaxation as food arrives. After denervation, loss of that accommodation can raise intragastric pressure, contributing to early satiety/bloating and faster liquid emptying. Denervating the antrum/pylorus impairs coordinated solid emptying. Thus **rapid liquid emptying and delayed solid emptying can coexist**; “vagotomy speeds emptying” is incomplete.",
  "id": "upper-gi-vagotomy-and-drainage-06"
}, [[FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Vagal anatomy and the recurrence trap",
  "columns": [
    "Landmark",
    "Relevant branch or hazard"
  ],
  "rows": [
    [
      "Anterior distal esophagus",
      "Left vagal trunk; gives hepatic branches and continues as anterior nerve of Latarjet."
    ],
    [
      "Posterior distal esophagus",
      "Right vagal trunk; gives celiac branches and continues as posterior nerve of Latarjet."
    ],
    [
      "Proximal posterior fundic branch",
      "**Criminal nerve of Grassi**: leaving acid-producing stomach innervated can produce recurrent ulceration."
    ],
    [
      "Distal lesser curve",
      "Crow's-foot branches supply the antropyloric region and must be preserved for highly selective vagotomy."
    ],
    [
      "Lesser-curve neurovascular dissection",
      "Separate selective denervation from destructive injury to adjacent perfusion and the preserved Latarjet pathway."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-07"
}, [[SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Vagal anatomy and the recurrence trap",
  "text": "**LARP:** left anterior, right posterior. Exposure also places the distal esophagus, spleen, venous structures near the left liver, and rarely thoracic lymphatics at risk.",
  "id": "upper-gi-vagotomy-and-drainage-08"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Compare the acid-reducing operations",
  "columns": [
    "Operation",
    "Denervation and drainage",
    "Main tradeoff"
  ],
  "rows": [
    [
      "Truncal vagotomy",
      "Divide both vagal trunks above the GE junction; denervates stomach and extragastric branches. Requires drainage or resection with reconstruction.",
      "Strong effect, with emptying/diarrhea consequences."
    ],
    [
      "Selective gastric vagotomy",
      "Divide gastric supply distal to preserved hepatic/celiac branches; pylorus is still denervated, so drainage is needed.",
      "No clear postgastrectomy-symptom advantage in the supplied module; largely abandoned."
    ],
    [
      "Highly selective/proximal gastric/parietal-cell vagotomy",
      "Divide supply to body/fundus while preserving Latarjet/crow's-foot innervation; no routine drainage.",
      "Lower drainage-related morbidity but more recurrent ulcers."
    ],
    [
      "Vagotomy with antrectomy",
      "Neural reduction plus removal of gastrin-producing antrum; reconstruction required.",
      "Lowest recurrence among the classic choices, with higher operative/postgastrectomy burden."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-09"
}, [[FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Compare the acid-reducing operations",
  "text": "The clinically useful comparison is relative recurrence versus morbidity. Fiser and the SCORE modules give overlapping but inconsistent exact recurrence/mortality figures. Do not combine their numbers into a single prediction table without specifying operation, population, and era.",
  "id": "upper-gi-vagotomy-and-drainage-10"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "sequence",
  "heading": "Exposure and vagotomy: key sequence",
  "steps": [
    {
      "title": "Confirm the plan and reconstruction",
      "detail": "Know whether the operation is truncal vagotomy with drainage, vagotomy-antrectomy, or a highly selective procedure. Inspect active ulcer disease and exclude a purely functional indication."
    },
    {
      "title": "Expose the hiatus",
      "detail": "Elevate the left liver and open the peritoneal/phrenoesophageal reflection over the distal esophagus to identify both trunks. Avoid esophageal and splenic injury during exposure."
    },
    {
      "title": "Apply the correct denervation boundary",
      "detail": "Truncal division is proximal to hepatic/celiac branching; selective gastric division preserves those branches but not pyloric motor supply; highly selective dissection preserves the motor pathway to antrum/pylorus."
    },
    {
      "title": "Account for the posterior fundic supply",
      "detail": "An undivided criminal nerve of Grassi is a classic source of incomplete acid reduction."
    },
    {
      "title": "Provide emptying appropriate to the operation",
      "detail": "Truncal/selective procedures need drainage or antrectomy with reconstruction. Do not accidentally convert a highly selective procedure into an antral denervation without addressing drainage."
    }
  ],
  "id": "upper-gi-vagotomy-and-drainage-11"
}, SCORE_VAGOTOMY_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Choose the drainage procedure",
  "columns": [
    "Procedure",
    "Construction",
    "Best use in the supplied module"
  ],
  "rows": [
    [
      "Heineke–Mikulicz pyloroplasty",
      "Longitudinal incision across the pylorus, **transverse closure**",
      "Routine case with tissue that permits a tension-free widening."
    ],
    [
      "Weinberg modification",
      "One-layer transverse closure variant",
      "Minimal scarring without proximal duodenal foreshortening."
    ],
    [
      "Finney pyloroplasty",
      "Approximate antrum and duodenum; create a broad horseshoe/U-shaped opening involving the pylorus",
      "Selected distorted/inflamed outlet anatomy in which this configuration is feasible."
    ],
    [
      "Jaboulay gastroduodenostomy",
      "Side-to-side antrum-to-duodenum anastomosis that bypasses the pylorus",
      "Severe local pyloric scar/fibrosis makes direct pyloric reconstruction unattractive."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-12"
}, [[FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "warning",
  "heading": "↳ Choose the drainage procedure",
  "text": "**Trap:** Jaboulay is a gastroduodenostomy around the scarred pylorus, not just another name for a longitudinal pyloric incision. The amount of usable duodenum and the ability to create a well-perfused, tension-free anastomosis determine feasibility.",
  "id": "upper-gi-vagotomy-and-drainage-13"
}, SCORE_VAGOTOMY_SOURCE),
  sourced({
  "type": "sequence",
  "heading": "Heineke–Mikulicz pyloroplasty: sequence",
  "steps": [
    {
      "title": "Step 1",
      "detail": "Mobilize the duodenum with a Kocher maneuver sufficiently for the intended reconstruction."
    },
    {
      "title": "Step 2",
      "detail": "Place a full-thickness longitudinal incision centered on the anterior pylorus and extending into stomach and duodenum. SCORE describes approximately 2–3 cm on either side."
    },
    {
      "title": "Step 3",
      "detail": "Close transversely to widen the outlet; the module describes a two-layer closure, with a selected one-layer Weinberg alternative. Avoid tension and assess local tissue quality."
    },
    {
      "title": "Step 4",
      "detail": "Reassess whether the drainage actually addresses the obstruction and whether the closure is safe in the inflamed field. Persistent obstructing disease may require a different reconstructive solution."
    }
  ],
  "id": "upper-gi-vagotomy-and-drainage-14"
}, SCORE_VAGOTOMY_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Finney and Jaboulay: know what changes",
  "text": "For a Finney pyloroplasty, mobilize the duodenum, approximate it to the antrum, construct the broad full-thickness horseshoe incision through the outlet complex, and complete the anastomosis posteriorly then anteriorly. The source describes mucosal approximation with an outer seromuscular layer. The decision is whether this larger common channel can be made safely in the actual anatomy.",
  "id": "upper-gi-vagotomy-and-drainage-15"
}, SCORE_VAGOTOMY_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Finney and Jaboulay: know what changes",
  "text": "For Jaboulay, mobilize and appose duodenum and antrum, open each lumen away from the scarred pylorus, and create a side-to-side gastroduodenostomy. The pylorus is bypassed rather than cut through. A heavily diseased duodenum can still prevent a safe bypass anastomosis; the eponym does not eliminate the need for healthy tissue.",
  "id": "upper-gi-vagotomy-and-drainage-16"
}, SCORE_VAGOTOMY_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Antrectomy and reconstruction",
  "text": "Removing the antrum may both relieve distal obstruction and remove gastrin drive. Billroth I is gastroduodenal continuity, Billroth II is a gastrojejunostomy, and Roux-en-Y separates the alimentary stream from a proximal biliopancreatic limb. Choose using tissue quality, reach, inflammation, and the future syndrome burden rather than treating them as interchangeable drawings.",
  "id": "upper-gi-vagotomy-and-drainage-17"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Antrectomy and reconstruction",
  "text": "Type II/III gastric ulcers are the classic high-acid patterns in which acid reduction may accompany resection. A distal gastric ulcer must still be assessed for malignancy. Incomplete antral removal can leave gastrin-producing tissue in a duodenal stump and cause recurrent ulcers.",
  "id": "upper-gi-vagotomy-and-drainage-18"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "table",
  "heading": "Early complications and rescue priorities",
  "columns": [
    "Problem",
    "Recognition and management principle"
  ],
  "rows": [
    [
      "Esophageal injury during exposure",
      "Identify and repair when recognized; the module describes a two-layer absorbable repair. Further contamination management depends on the injury."
    ],
    [
      "Splenic or exposure-related venous bleeding",
      "Identify the source, obtain hemostasis; extensive splenic injury may require splenectomy."
    ],
    [
      "Pyloroplasty/anastomotic leak",
      "Peritonitis or clinical deterioration requires evaluation for source control, drainage and/or reoperation."
    ],
    [
      "Persistent vomiting/fullness",
      "Consider inadequate drainage or mechanical obstruction before labeling it denervation alone. Severe refractory drainage failure may require reconstruction."
    ],
    [
      "Dysphagia",
      "Evaluate postoperative narrowing/dysfunction; dilation is a described option, with surgical treatment selected for refractory cases."
    ],
    [
      "Chylous leak",
      "Rare lymphatic injury; the module describes an initial conservative approach. A full high-output chyle protocol needs additional support."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-19"
}, SCORE_VAGOTOMY_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Late syndromes and recurrent ulcer",
  "columns": [
    "Syndrome",
    "Distinguishing clue",
    "Initial direction"
  ],
  "rows": [
    [
      "Dumping",
      "GI/vasomotor symptoms after meals; later hypoglycemia is a separate phase.",
      "Small frequent meals, limit simple sugars; selected refractory cases may receive octreotide."
    ],
    [
      "Postvagotomy diarrhea",
      "Bile-acid delivery and altered motility contribute.",
      "Cause-directed treatment; cholestyramine/loperamide appear in Fiser."
    ],
    [
      "Delayed solid emptying",
      "Antral/pyloric denervation or inadequate drainage; rule out mechanical/metabolic causes.",
      "Prokinetic therapy is described; correct a structural drainage failure when necessary."
    ],
    [
      "Alkaline reflux gastritis",
      "Bile reflux with postoperative symptoms.",
      "Medical therapy first; refractory cases may need Roux-en-Y diversion."
    ],
    [
      "Recurrent ulcer",
      "H. pylori/NSAIDs, incomplete vagotomy, retained antrum or hypersecretion.",
      "Re-establish the cause and anatomy; persistent disease may require reoperation."
    ],
    [
      "Malnutrition/anemia after resection",
      "Iron/B12 and other nutritional deficits may develop.",
      "Evaluate intake, labs, and anatomy; replace documented deficits."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-20"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [FISER_STOMACH_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Late syndromes and recurrent ulcer",
  "text": "A technically “highly selective” operation is not a guarantee that delayed emptying cannot occur: the intended motor innervation is preserved, but another anatomic/metabolic cause still needs assessment. The supplied module's absolute phrasing is interpreted as the expected physiology rather than an exclusion rule.",
  "id": "upper-gi-vagotomy-and-drainage-21"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "**Truncal + drainage; selective + drainage; highly selective usually no drainage.**",
    "**Crow's foot preserved** is the key to pyloric motor preservation.",
    "Persistent acid after vagotomy: remember the **criminal nerve of Grassi**.",
    "Heineke–Mikulicz: longitudinal opening, transverse closure.",
    "Jaboulay bypasses a scarred pylorus; Finney creates a broader common outlet.",
    "Vagotomy-antrectomy trades low ulcer recurrence for a larger postgastrectomy burden."
  ],
  "id": "upper-gi-vagotomy-and-drainage-22"
}, [[SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE], [FISER_STOMACH_SOURCE], [SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Supplied board-source teaching",
    "Current practice or source correction"
  ],
  "rows": [
    [
      "Criminal nerve of Grassi",
      "Esophageal OCR says a branch left divided can cause acid persistence.",
      "The stomach chapter and SCORE specify an undivided branch as the incomplete-denervation mechanism."
    ],
    [
      "Highly selective vagotomy",
      "SCORE describes no delayed emptying after motor preservation.",
      "Preserved motor innervation is the intended physiology; a different mechanical or metabolic cause of delayed emptying still requires assessment."
    ]
  ],
  "id": "upper-gi-vagotomy-and-drainage-23"
}, [[FISER_ESOPHAGUS_SOURCE, FISER_STOMACH_SOURCE, SCORE_VAGOTOMY_SOURCE], [SCORE_VAGOTOMY_SOURCE, SCORE_PEPTIC_ULCER_SOURCE]]),
  references("upper-gi-vagotomy-and-drainage-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE, FISER_ESOPHAGUS_SOURCE]),
];

export const vagotomyAndDrainageDraft = buildDraftTopic({
  "id": "00000000-0000-4000-8000-000000004722",
  "versionId": "00000000-0000-4000-8000-000000004732",
  "slug": "vagotomy-and-drainage",
  "title": "Vagotomy and Drainage",
  "aliases": [
    "truncal vagotomy",
    "highly selective vagotomy",
    "Heineke-Mikulicz pyloroplasty",
    "Finney pyloroplasty",
    "Jaboulay gastroduodenostomy"
  ],
  "scoreNodeId": "stomach-procedures",
  "scoreCategory": "SCORE · Stomach · Operations & Procedures",
  "tags": [
    "upper-gi",
    "absite",
    "score",
    "clinical-review-pending"
  ],
  "sourceId": SCORE_VAGOTOMY_SOURCE,
  "additionalSourceIds": [
    SCORE_PEPTIC_ULCER_SOURCE,
    FISER_STOMACH_SOURCE,
    SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
    FISER_ESOPHAGUS_SOURCE
  ],
  "blocks": blocks,
  "createdAt": "2026-10-22T00:00:00.000Z",
  "warnings": [
    "Draft — pending Zach's clinical review",
    "**Clinical approval pending.** Operative descriptions are educational overviews; no hands-on technique validation is claimed.",
    "**Source/OCR conflict:** Fiser esophagus p.364 says Grassi left “divided” causes acid persistence; Fiser stomach p.394 and SCORE specify **undivided**. Teaching follows the concordant mechanism.",
    "Absolute absence of delayed emptying after highly selective vagotomy and source-specific recurrence percentages are qualified. Exact dose regimens for octreotide, prokinetics and diarrhea rescue are not supplied here.",
    "**Needs further support:** technical completeness testing, a full highly selective dissection atlas, chylous-leak escalation, and contemporary conduit-drainage selection evidence.",
    "Source figures/videos remain unreviewed; no matching question-bank notes were available.",
    "This sequence explains the operative decisions. Exact dissection lengths, intraoperative completeness testing, and a full technical atlas are not supplied; they remain outside the claimed coverage."
  ]
});
