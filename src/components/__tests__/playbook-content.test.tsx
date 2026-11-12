import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlaybookContent } from "@/components/playbook-content";
import type { ContentsData } from "@/lib/reader-contents";
import type { Playbook, TopicBlock } from "@/lib/types";

const offline = vi.hoisted(() => ({ recordRecentView: vi.fn(), setTopicSaved: vi.fn(), isTopicSaved: vi.fn(), isTopicReviewed: vi.fn(), setTopicReviewed: vi.fn() }));
vi.mock("@/lib/offline", () => offline);
vi.mock("next/navigation", () => ({ usePathname: () => "/playbooks/femoropopliteal-bypass", useRouter: () => ({ push: vi.fn() }) }));

const contents: ContentsData = { corpus: "playbooks", sections: [], branches: [] };

Element.prototype.scrollIntoView = vi.fn();

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Anatomy", text: "Landmarks.", claims: [] },
  { id: "b2", type: "sequence", heading: "Steps", steps: [{ title: "Tunnel", detail: "Pass it." }, { title: "Close", detail: "Layers." }], claims: [] },
];

const playbook: Playbook = { id: "p1", slug: "femoropopliteal-bypass", title: "Femoropopliteal Bypass", aliases: [], procedureId: "femoropopliteal_bypass", approach: "open", specialty: "Vascular", tags: [], blocks, sourceIds: [], warnings: [], reviewedAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" };

describe("PlaybookContent", () => {
  it("shares the topic page's toolbar, Back falling back to its specialty on the Playbooks index", () => {
    render(<><div id="shell-toolbar" /><PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} contents={contents} /></>);
    expect(screen.getByRole("group", { name: "Page tools" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Playbooks" })).toHaveAttribute("href", "/playbooks");
    expect(screen.getByRole("button", { name: "Expand all" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contents" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("shows the guide with Notes and Sources tabs and nothing else", () => {
    render(<><div id="shell-toolbar" /><PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} contents={contents} /></>);
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Notes", "Sources 0"]);
    expect(screen.getByRole("heading", { name: "Anatomy" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/preferences/i)).not.toBeInTheDocument();
  });
});
