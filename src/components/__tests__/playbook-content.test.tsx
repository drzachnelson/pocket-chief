import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlaybookContent } from "@/components/playbook-content";
import type { ContentsData } from "@/lib/reader-contents";
import type { Playbook, TopicBlock } from "@/lib/types";

// Saved and recent entries carry a kind, so a playbook is stored as an id and read back by kind.
const offline = vi.hoisted(() => ({ recordRecentView: vi.fn(async () => undefined), setTopicSaved: vi.fn(), setPlaybookSaved: vi.fn(async () => undefined), isTopicSaved: vi.fn(async () => false), isTopicReviewed: vi.fn(), setTopicReviewed: vi.fn() }));
vi.mock("@/lib/offline", () => offline);
vi.mock("next/navigation", () => ({ usePathname: () => "/playbooks/femoropopliteal-bypass", useRouter: () => ({ push: vi.fn() }) }));

const contents: ContentsData = { corpus: "playbooks", sections: [], branches: [] };

Element.prototype.scrollIntoView = vi.fn();

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Anatomy", text: "Landmarks.", claims: [] },
  { id: "b2", type: "sequence", heading: "Steps", steps: [{ title: "Tunnel", detail: "Pass it." }, { title: "Close", detail: "Layers." }], claims: [] },
];

const playbook: Playbook = { id: "p1", slug: "femoropopliteal-bypass", title: "Femoropopliteal Bypass", aliases: [], procedureId: "femoropopliteal_bypass", approach: "open", specialty: "Vascular", tags: [], blocks, sourceIds: [], warnings: [], reviewedAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" };

const renderPlaybook = () => render(<><div id="shell-toolbar" /><PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} contents={contents} breadcrumb={<nav aria-label="Breadcrumb" />} /></>);

describe("PlaybookContent", () => {
  beforeEach(() => { offline.recordRecentView.mockClear(); offline.setPlaybookSaved.mockClear(); offline.setTopicSaved.mockClear(); });

  it("records a recent view of the playbook and never writes it through the topic path", async () => {
    renderPlaybook();
    await waitFor(() => expect(offline.recordRecentView).toHaveBeenCalledWith(playbook));
    expect(offline.setTopicSaved).not.toHaveBeenCalled();
  });

  it("offers Save in the header row, and saving writes a playbook entry", async () => {
    renderPlaybook();
    const save = screen.getByRole("button", { name: "Save" });
    expect(screen.getByRole("navigation", { name: "Breadcrumb" }).parentElement).toContainElement(save);
    await waitFor(() => expect(save).not.toBeDisabled());
    await userEvent.click(save);
    expect(offline.setPlaybookSaved).toHaveBeenCalledWith(playbook, true);
    expect(offline.setTopicSaved).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Saved" }));
    expect(offline.setPlaybookSaved).toHaveBeenLastCalledWith(playbook, false);
  });

  it("shows no Studied mark or next link: a playbook has no curriculum order", () => {
    renderPlaybook();
    expect(screen.queryByRole("button", { name: "Studied" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /next topic|end of category/i })).not.toBeInTheDocument();
  });

  it("shares the topic page's toolbar, Back falling back to its specialty on the Playbooks index", () => {
    renderPlaybook();
    expect(screen.getByRole("group", { name: "Page tools" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Playbooks" })).toHaveAttribute("href", "/playbooks");
    expect(screen.getByRole("button", { name: "Expand all" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contents" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("shows the guide with Notes and Sources tabs and nothing else", () => {
    renderPlaybook();
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Notes", "Sources 0"]);
    expect(screen.getByRole("heading", { name: "Anatomy" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/preferences/i)).not.toBeInTheDocument();
  });
});
