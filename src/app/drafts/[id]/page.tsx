import { notFound } from "next/navigation";
import { DraftReview } from "@/components/draft-review";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function DraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repository = await getRepository();
  const draft = await repository.getDraft(id);
  if (!draft) notFound();
  const topic = await repository.getTopicById(draft.topicId);
  if (!topic) notFound();
  const sources = await repository.listSources(draft.sourceIds);
  return <DraftReview initialDraft={draft} topic={topic} sources={sources} />;
}
