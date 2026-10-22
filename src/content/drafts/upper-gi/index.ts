import { pepticUlcerDiseaseDraft } from "@/content/drafts/upper-gi/peptic-ulcer-disease";
import { gastroduodenalPerforationRepairDraft } from "@/content/drafts/upper-gi/gastroduodenal-perforation-repair";
import { vagotomyAndDrainageDraft } from "@/content/drafts/upper-gi/vagotomy-and-drainage";
import { upperGastrointestinalBleedingDraft } from "@/content/drafts/upper-gi/upper-gastrointestinal-bleeding";
import { stressGastritisDraft } from "@/content/drafts/upper-gi/stress-gastritis";
import { esophagogastroduodenoscopyDraft } from "@/content/drafts/upper-gi/esophagogastroduodenoscopy";
import type { Topic } from "@/lib/types";

/** Review-only registry. Never add these to libraryTopics without explicit clinical approval. */
export const upperGiDraftTopics: Topic[] = [
  pepticUlcerDiseaseDraft,
  gastroduodenalPerforationRepairDraft,
  vagotomyAndDrainageDraft,
  upperGastrointestinalBleedingDraft,
  stressGastritisDraft,
  esophagogastroduodenoscopyDraft,
];
