"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Playbook, SuppliedSource } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { specialtyId } from "@/lib/library-items";
import { recordRecentView } from "@/lib/offline";
import type { ContentsData } from "@/lib/reader-contents";
import { BlockList, useBlockCollapse } from "@/components/block-list";
import { ReaderTools } from "@/components/page-toolbar";
import { ReaderHeader } from "@/components/reader-header";
import { SourceList } from "@/components/source-list";

/**
 * The playbook counterpart to `TopicContent`: same header, same block rendering, different chrome.
 *
 * It records a recent view and offers Save, like a topic. The `saved` and `recent` stores hold
 * entries with a `kind`, and a playbook entry is just an id, so every reader rebuilds the row from
 * the library by kind and a playbook never reaches a topic card (see `offline.ts`).
 *
 * No History tab, and no Studied or next link: playbooks ship approved-only, with no version
 * list, and sit in no curriculum order.
 */
export function PlaybookContent({ playbook, sources, linkEntries, contents, breadcrumb }: { playbook: Playbook; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[]; contents: ContentsData; breadcrumb?: ReactNode }) {
  const [tab, setTab] = useState("notes");
  const blocks = playbook.blocks.filter((block) => block.type !== "references");
  const showNotes = useCallback(() => setTab("notes"), []);
  const collapse = useBlockCollapse(blocks, showNotes);

  useEffect(() => { recordRecentView(playbook).catch(() => undefined); }, [playbook]);

  return (
    <>
      <ReaderTools corpus="playbooks" contents={contents} backFallback={`/playbooks#${specialtyId(playbook.specialty)}`} collapse={collapse} tab={tab} />
      <Tabs.Root value={tab} onValueChange={setTab} className="topic-tabs">
        <ReaderHeader item={playbook} breadcrumb={breadcrumb}>
          <Tabs.List className="tabs-list" aria-label="Playbook views">
            <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
            <Tabs.Trigger value="sources">Sources <span aria-hidden="true">{sources.length}</span></Tabs.Trigger>
          </Tabs.List>
        </ReaderHeader>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={playbook.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><SourceList sources={sources} /></Tabs.Content>
      </Tabs.Root>
    </>
  );
}
