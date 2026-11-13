import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { dayLabel, HomeLists } from "@/components/home-lists";
import { loadHistory, type History } from "@/lib/library-client";
import { playbookItem, topicItem, type RecentlyAddedDay } from "@/lib/library-items";
import type { Playbook, RecentEntry, SavedEntry, Topic } from "@/lib/types";

// `useLoader` stays real: the loading, failed and retry behaviour is what these tests read. Only the read is stubbed.
vi.mock("@/lib/library-client", async (importOriginal) => ({ ...await importOriginal<typeof import("@/lib/library-client")>(), loadHistory: vi.fn() }));

const read = vi.mocked(loadHistory);
afterEach(() => vi.clearAllMocks());

const topic = (n: number): Topic => ({ id: `t${n}`, slug: `topic-${n}`, title: `Topic ${n}`, aliases: [], scoreNodeId: "n", scoreCategory: "SCORE · Biliary · Diseases & Conditions", tags: [], approvedVersion: null, versions: [], updatedAt: "2026-11-01T00:00:00.000Z" });
const playbook: Playbook = { id: "p1", slug: "lap-chole", title: "Laparoscopic Cholecystectomy", aliases: [], procedureId: "lap_chole", approach: "laparoscopic", specialty: "Hepatobiliary", tags: [], blocks: [], sourceIds: [], warnings: [], reviewedAt: "2026-11-01T00:00:00.000Z", updatedAt: "2026-11-01T00:00:00.000Z" };
const topics = [1, 2, 3, 4, 5, 6, 7].map(topic);
const viewed = (id: string, kind: RecentEntry["kind"], n: number): RecentEntry => ({ id, kind, viewedAt: `2026-11-0${n}T00:00:00.000Z` });
const saved = (id: string, kind: SavedEntry["kind"], n: number): SavedEntry => ({ id, kind, savedAt: `2026-11-0${n}T00:00:00.000Z` });
const history = (extra: Partial<History> = {}): History => ({ topics, taxonomy: [], playbooks: [playbook], saved: [], recent: [], ...extra });
const added: RecentlyAddedDay[] = [
  { day: "2026-11-09", items: [topicItem(topics[0]), playbookItem(playbook)] },
  { day: "2025-12-30", items: [topicItem(topics[1])] },
];
const headings = () => screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);

describe("HomeLists", () => {
  it("shows nothing at all until the history read settles", () => {
    read.mockReturnValue(new Promise(() => undefined));
    const { container } = render(<HomeLists added={added} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("on a fresh device shows Recently added only, under date labels, with no Recently viewed or Saved", async () => {
    read.mockResolvedValue(history());
    render(<HomeLists added={added} />);
    await screen.findByRole("heading", { name: "Recently added" });
    expect(headings()).toEqual(["Recently added"]);
    const nov = screen.getByRole("list", { name: "Nov 9" });
    expect(within(nov).getAllByRole("listitem")).toHaveLength(2);
    expect(within(nov).getByRole("link", { name: /Laparoscopic Cholecystectomy/ })).toHaveAttribute("href", "/playbooks/lap-chole");
    // An earlier year carries its year, and the label is the UTC day whatever the viewer's zone.
    expect(within(screen.getByRole("list", { name: "Dec 30, 2025" })).getByRole("link", { name: /Topic 2/ })).toHaveAttribute("href", "/topics/topic-2");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("lists Recently viewed newest first, topics and playbooks together, at most five, rebuilt from the library and dropping a gone id silently", async () => {
    read.mockResolvedValue(history({ recent: [viewed("p1", "playbook", 7), viewed("gone", "topic", 6), viewed("t1", "topic", 5), viewed("t2", "topic", 4), viewed("t3", "topic", 3), viewed("t4", "topic", 2), viewed("t5", "topic", 1)] }));
    render(<HomeLists added={added} />);
    const section = (await screen.findByRole("heading", { name: "Recently viewed" })).closest("section")!;
    const rows = within(section).getAllByRole("listitem");
    expect(rows.map((row) => row.querySelector(".list-row-text > span")?.textContent)).toEqual(["Laparoscopic Cholecystectomy", "Topic 1", "Topic 2", "Topic 3", "Topic 4"]);
    expect(rows[0]).toHaveTextContent(/^Laparoscopic CholecystectomyHepatobiliaryPlaybook$/);
    expect(rows[1]).toHaveTextContent(/^Topic 1Biliary · Diseases & Conditions$/);
    expect(within(section).queryByText("No longer available")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "All saved" })).not.toBeInTheDocument();
  });

  it("lists the five newest Saved without the toggle, and offers All saved only when there are more", async () => {
    // `getSavedEntries` hands them over newest first, and Home keeps that order.
    const five = [5, 4, 3, 2, 1].map((n) => saved(`t${n}`, "topic", n));
    read.mockResolvedValue(history({ saved: five }));
    const { unmount } = render(<HomeLists added={[]} />);
    const section = (await screen.findByRole("heading", { name: "Saved" })).closest("section")!;
    expect(within(section).getAllByRole("listitem")).toHaveLength(5);
    expect(screen.queryByRole("link", { name: "All saved" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    unmount();

    read.mockResolvedValue(history({ saved: [saved("t6", "topic", 7), saved("p1", "playbook", 6), ...five] }));
    render(<HomeLists added={[]} />);
    const more = (await screen.findByRole("heading", { name: "Saved" })).closest("section")!;
    expect(within(more).getAllByRole("listitem").map((row) => row.querySelector(".list-row-text > span")?.textContent)).toEqual(["Topic 6", "Laparoscopic Cholecystectomy", "Topic 5", "Topic 4", "Topic 3"]);
    expect(within(more).getByRole("link", { name: "All saved" })).toHaveAttribute("href", "/saved");
  });

  it("orders the sections Recently viewed, Saved, Recently added, and a page can be in two of them", async () => {
    read.mockResolvedValue(history({ recent: [viewed("t1", "topic", 2)], saved: [saved("t1", "topic", 1)] }));
    render(<HomeLists added={added} />);
    await screen.findByRole("heading", { name: "Recently added" });
    expect(headings()).toEqual(["Recently viewed", "Saved", "Recently added"]);
    expect(screen.getAllByRole("link", { name: /Topic 1/ })).toHaveLength(3);
  });

  it("says once that Saved did not load, still shows Recently added, and claims nothing about empty or gone", async () => {
    read.mockRejectedValue(new Error("offline"));
    render(<HomeLists added={added} />);
    expect(await screen.findByRole("status")).toHaveTextContent("Couldn't load Saved.");
    expect(screen.getAllByText("Couldn't load Saved.")).toHaveLength(1);
    expect(headings()).toEqual(["Recently added"]);
    expect(screen.getByRole("button", { name: "Try again" })).toBeEnabled();
    expect(screen.queryByText("No longer available")).not.toBeInTheDocument();
  });

  it("retries in place and the rows replace the sentence when the read settles", async () => {
    let settle!: (value: History) => void;
    read.mockRejectedValueOnce(new Error("offline")).mockReturnValueOnce(new Promise((resolve) => { settle = resolve; }));
    render(<HomeLists added={[]} />);
    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(screen.getByRole("button", { name: "Try again" })).toBeDisabled();
    settle(history({ recent: [viewed("t1", "topic", 1)] }));
    expect(await screen.findByRole("heading", { name: "Recently viewed" })).toBeInTheDocument();
    expect(screen.queryByText("Couldn't load Saved.")).not.toBeInTheDocument();
  });
});

describe("dayLabel", () => {
  const now = new Date("2026-11-12T03:00:00Z");
  it("is the month and day, with the year only for an earlier year", () => {
    expect(dayLabel("2026-11-09", now)).toBe("Nov 9");
    expect(dayLabel("2025-12-30", now)).toBe("Dec 30, 2025");
  });
  it("reads the UTC day, so a zone behind UTC cannot shift it", () => {
    const zone = process.env.TZ;
    process.env.TZ = "Pacific/Honolulu";
    try { expect(dayLabel("2026-11-01", now)).toBe("Nov 1"); } finally { if (zone === undefined) delete process.env.TZ; else process.env.TZ = zone; }
  });
});
