import { abdominalExplorationTopic } from "@/content/topics/abdominal-exploration";
import { abdominalPainTopic } from "@/content/topics/abdominal-pain";
import { choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
import { desmoidTopic } from "@/content/topics/desmoid-tumors-and-fibromatoses";
import { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
import { peritonealDialysisCatheterTopic } from "@/content/topics/peritoneal-dialysis-catheter";
import { peritonealNeoplasmsTopic } from "@/content/topics/peritoneal-neoplasms";
import { rectusSheathHematomaTopic } from "@/content/topics/rectus-sheath-hematoma";
import type { Topic } from "@/lib/types";

export { choledoBlocks, choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
export { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
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
];
