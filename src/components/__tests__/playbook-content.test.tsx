import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlaybookContent } from "@/components/playbook-content";
import type { Playbook, TopicBlock } from "@/lib/types";

// The topic stores must stay untouched: a playbook written into `saved` or `recent` renders as a
// TopicCard pointing at /topics/<playbook slug>, which is a 404.
const offline = vi.hoisted(() => ({ recordRecentView: vi.fn(), setTopicSaved: vi.fn(), isTopicSaved: vi.fn(), isTopicReviewed: vi.fn(), setTopicReviewed: vi.fn() }));
vi.mock("@/lib/offline", () => offline);

Element.prototype.scrollIntoView = vi.fn();

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Anatomy", text: "Landmarks.", claims: [] },
  { id: "b2", type: "sequence", heading: "Steps", steps: [{ title: "Tunnel", detail: "Pass it." }, { title: "Close", detail: "Layers." }], claims: [] },
];

const playbook: Playbook = { id: "p1", slug: "femoropopliteal-bypass", title: "Femoropopliteal Bypass", aliases: [], procedureId: "femoropopliteal_bypass", approach: "open", specialty: "Vascular", tags: [], blocks, sourceIds: [], warnings: [], reviewedAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" };

describe("PlaybookContent", () => {
  it("never writes a playbook into the topic saved or recent stores", () => {
    render(<PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} />);
    expect(offline.recordRecentView).not.toHaveBeenCalled();
    expect(offline.setTopicSaved).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  });

  it("shows the guide with Notes and Sources tabs and nothing else", () => {
    render(<PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} />);
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Notes", "Sources 0"]);
    expect(screen.getByRole("heading", { name: "Anatomy" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/preferences/i)).not.toBeInTheDocument();
  });
});
