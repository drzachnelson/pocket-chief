"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import type { Playbook, SuppliedSource } from "@/lib/types";
import type { LinkIndexEntry } from "@/lib/inline";
import { BlockList, useBlockCollapse } from "@/components/block-list";

/**
 * The playbook counterpart to `TopicContent`: same block rendering, different chrome.
 *
 * Deliberately does NOT record a recent view or offer Save. Both write Topic-shaped objects into
 * the `saved` and `recent` stores, and every surface that reads those renders rows through
 * TopicCard, which reads `scoreCategory` and links to `/topics/<slug>`. A playbook in there
 * renders a broken card pointing at a 404. Playbook bookmarking needs its own store.
 *
 * No History tab either — playbooks ship approved-only and have no version list.
 */
export function PlaybookContent({ playbook, sources, linkEntries }: { playbook: Playbook; sources: SuppliedSource[]; linkEntries: LinkIndexEntry[] }) {
  const blocks = playbook.blocks.filter((block) => block.type !== "references");
  const collapse = useBlockCollapse(blocks);

  return (
    <>
      <div className="topic-actions-row">
        {collapse.collapsibleIds.length > 0 && <button className="expand-toggle" onClick={collapse.toggleAll}>{collapse.allOpen ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}{collapse.allOpen ? "Close all" : "Open all"}</button>}
      </div>
      <Tabs.Root defaultValue="notes" className="topic-tabs">
        <Tabs.List className="tabs-list" aria-label="Playbook views"><Tabs.Trigger value="notes">Notes</Tabs.Trigger><Tabs.Trigger value="sources">Sources <span>{sources.length}</span></Tabs.Trigger></Tabs.List>
        <Tabs.Content value="notes"><BlockList blocks={blocks} collapse={collapse} linkEntries={linkEntries} selfSlug={playbook.slug} /></Tabs.Content>
        <Tabs.Content value="sources"><div className="source-list">{sources.map((source, index) => <article key={source.id}><span>{index + 1}</span><div><h2>{source.title}</h2><p>{source.citation}</p>{source.details && <small>{source.details}</small>}</div></article>)}</div></Tabs.Content>
      </Tabs.Root>
    </>
  );
}
