import { abdominalAndAortoiliacAneurysmRepairTopic } from "@/content/topics/abdominal-and-aortoiliac-aneurysm-repair";
import { abdominalExplorationTopic } from "@/content/topics/abdominal-exploration";
import { abdominalPainTopic } from "@/content/topics/abdominal-pain";
import { abdominalWallReconstructionTopic } from "@/content/topics/abdominal-wall-reconstruction";
import { cardiacPacingTopic } from "@/content/topics/cardiac-pacing";
import { choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
import { desmoidTopic } from "@/content/topics/desmoid-tumors-and-fibromatoses";
import { femoralHerniaTopic } from "@/content/topics/femoral-hernia";
import { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
import { groinHerniaInChildrenTopic } from "@/content/topics/groin-hernia-in-children";
import { groinHerniaRepairTopic } from "@/content/topics/groin-hernia-repair";
import { acuteLiverFailureTopic } from "@/content/topics/acute-liver-failure";
import { inguinalHerniaTopic } from "@/content/topics/inguinal-hernia";
import { malrotationOperationTopic } from "@/content/topics/malrotation-operation";
import { malrotationTopic } from "@/content/topics/malrotation";
import { paraesophagealHerniaRepairTopic } from "@/content/topics/paraesophageal-hernia-repair";
import { peritonealDialysisCatheterTopic } from "@/content/topics/peritoneal-dialysis-catheter";
import { peritonealNeoplasmsTopic } from "@/content/topics/peritoneal-neoplasms";
import { rectusSheathHematomaTopic } from "@/content/topics/rectus-sheath-hematoma";
import { renalArteryDiseaseTopic } from "@/content/topics/renal-artery-disease";
import { umbilicalAndEpigastricHerniaTopic } from "@/content/topics/umbilical-and-epigastric-hernia";
import { unusualHerniasTopic } from "@/content/topics/unusual-hernias";
import { ventralAndIncisionalHerniaTopic } from "@/content/topics/ventral-and-incisional-hernia";
import type { Topic } from "@/lib/types";

export { cardiacPacingTopic } from "@/content/topics/cardiac-pacing";
export { choledoBlocks, choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
export { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
export { acuteLiverFailureTopic } from "@/content/topics/acute-liver-failure";
export { paraesophagealHerniaRepairTopic } from "@/content/topics/paraesophageal-hernia-repair";
export { renalArteryDiseaseTopic } from "@/content/topics/renal-artery-disease";
export { suppliedSources } from "@/content/sources";
export { taxonomy } from "@/content/taxonomy";

export const demoTopics: Topic[] = [
  choledocholithiasisTopic,
  fibroadenomaPhyllodesTopic,
  abdominalPainTopic,
  rectusSheathHematomaTopic,
  desmoidTopic,
  peritonealNeoplasmsTopic,
  abdominalExplorationTopic,
  peritonealDialysisCatheterTopic,
  inguinalHerniaTopic,
  femoralHerniaTopic,
  groinHerniaInChildrenTopic,
  umbilicalAndEpigastricHerniaTopic,
  ventralAndIncisionalHerniaTopic,
  unusualHerniasTopic,
  groinHerniaRepairTopic,
  abdominalWallReconstructionTopic,
  abdominalAndAortoiliacAneurysmRepairTopic,
  acuteLiverFailureTopic,
  cardiacPacingTopic,
  paraesophagealHerniaRepairTopic,
  renalArteryDiseaseTopic,
  malrotationTopic,
  malrotationOperationTopic,
];
