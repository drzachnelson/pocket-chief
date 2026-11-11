import { Contents } from "@/components/contents";
import { playbookContents, playbookSlugs } from "@/lib/reader-contents";

// The laptop sidebar's Contents for a playbook page; see the topics counterpart.
export const generateStaticParams = playbookSlugs;

export default async function PlaybookContents({ params }: { params: Promise<{ slug: string }> }) {
  const data = playbookContents((await params).slug);
  return data && <Contents data={data} />;
}
