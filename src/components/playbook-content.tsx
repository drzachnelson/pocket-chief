"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useCallback, useState } from "react";
import type { Playbook, SuppliedSource } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { specialtyId } from "@/lib/library-items";
import type { ContentsData } from "@/lib/reader-contents";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { ReaderTools } from "@/components/page-toolbar";
import { SourceList } from "@/components/source-list";

/**
 * The playbook counterpart to `TopicContent`: same block rendering, different chrome.
 *
 * Deliberately does NOT record a recent view or offer Save yet. Both write Topic-shaped objects into
 * the `saved` and `recent` stores, and every surface that reads those renders rows through
 * TopicCard, which reads `scoreCategory` and links to `/topics/<slug>`. A playbook in there
 * renders a broken card pointing at a 404; the saved-loader and reader-header slices lift this.
 *
 * No History tab either — playbooks ship approved-only and have no version list.
 */
export function PlaybookContent({ playbook, sources, linkEntries, contents }: { playbook: Playbook; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; contents: ContentsData }) {
  const [tab, setTab] = useState("notes");
  const blocks = playbook.blocks.filter((block) => block.type !== "references");
  const showNotes = useCallback(() => setTab("notes"), []);
  const collapse = useBlockCollapse(blocks, showNotes);

  return (
    <>
      <ReaderTools corpus="playbooks" contents={contents} backFallback={`/playbooks#${specialtyId(playbook.specialty)}`} collapse={collapse} notesShown={tab === "notes"} />
      <Tabs.Root value={tab} onValueChange={setTab} className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Playbook views">
          <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
          <Tabs.Trigger value="sources">Sources <span aria-hidden="true">{sources.length}</span></Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={playbook.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><SourceList sources={sources} /></Tabs.Content>
      </Tabs.Root>
    </>
  );
}
