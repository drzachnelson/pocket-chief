import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SavedLibrary } from "@/components/saved-library";
import { loadHistory, type History } from "@/lib/library-client";
import { setPlaybookSaved, setSavedEntry, setTopicSaved } from "@/lib/offline";
import type { Playbook, SavedEntry, Topic } from "@/lib/types";

// `useLoader` stays real: the page's loading, failed and retry behaviour is what these tests read. Only the read and the writes are stubbed.
vi.mock("@/lib/library-client", async (importOriginal) => ({ ...await importOriginal<typeof import("@/lib/library-client")>(), loadHistory: vi.fn() }));
vi.mock("@/lib/offline", () => ({ setTopicSaved: vi.fn(), setPlaybookSaved: vi.fn(), setSavedEntry: vi.fn() }));

const read = vi.mocked(loadHistory);
const writeTopic = vi.mocked(setTopicSaved);
const writePlaybook = vi.mocked(setPlaybookSaved);
const writeEntry = vi.mocked(setSavedEntry);

const topic = (id: string, slug: string, title: string): Topic => ({ id, slug, title, aliases: [], scoreNodeId: "n", scoreCategory: "SCORE · Biliary · Diseases & Conditions", tags: [], approvedVersion: null, versions: [], updatedAt: "2026-11-01T00:00:00.000Z" });
const playbook = (id: string, slug: string, title: string): Playbook => ({ id, slug, title, aliases: [], procedureId: slug.replace(/-/g, "_"), approach: "laparoscopic", specialty: "Hepatobiliary", tags: [], blocks: [], sourceIds: [], warnings: [], reviewedAt: "2026-11-01T00:00:00.000Z", updatedAt: "2026-11-01T00:00:00.000Z" });
const saved = (id: string, kind: SavedEntry["kind"], savedAt: string): SavedEntry => ({ id, kind, savedAt });

const chole = topic("t-chole", "choledocholithiasis", "Choledocholithiasis");
const lapChole = playbook("p-chole", "laparoscopic-cholecystectomy", "Laparoscopic Cholecystectomy");
const history = (entries: SavedEntry[], extra: Partial<History> = {}): History => ({ topics: [chole], taxonomy: [], playbooks: [lapChole], saved: entries, recent: [], ...extra });

beforeEach(() => { writeTopic.mockResolvedValue(undefined); writePlaybook.mockResolvedValue(undefined); writeEntry.mockResolvedValue(undefined); });
afterEach(() => vi.clearAllMocks());

describe("SavedLibrary", () => {
  it("shows three static rows and no words while the read is pending", () => {
    read.mockReturnValue(new Promise(() => undefined));
    const { container } = render(<SavedLibrary />);
    expect(container.querySelectorAll(".loading-rows > div")).toHaveLength(3);
    expect(container).toHaveTextContent("");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("lists topics and playbooks together, newest saved first, each from the current library", async () => {
    // The playbook was saved last, so it leads. The topic is reached by its current slug and title, whatever was stored.
    read.mockResolvedValue(history([saved("p-chole", "playbook", "2026-11-03T00:00:00.000Z"), saved("t-chole", "topic", "2026-11-01T00:00:00.000Z")]));
    render(<SavedLibrary />);
    const rows = await screen.findAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent(/^Laparoscopic CholecystectomyHepatobiliaryPlaybook$/);
    expect(screen.getByRole("link", { name: /Laparoscopic Cholecystectomy/ })).toHaveAttribute("href", "/playbooks/laparoscopic-cholecystectomy");
    expect(rows[1]).toHaveTextContent(/^CholedocholithiasisBiliary · Diseases & Conditions$/);
    expect(screen.getByRole("link", { name: /Choledocholithiasis/ })).toHaveAttribute("href", "/topics/choledocholithiasis");
  });

  it("puts a bookmark toggle where the chevron was, outside the link, named for the page", async () => {
    read.mockResolvedValue(history([saved("t-chole", "topic", "2026-11-01T00:00:00.000Z")]));
    const { container } = render(<SavedLibrary />);
    const toggle = await screen.findByRole("button", { name: "Save Choledocholithiasis" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: /Choledocholithiasis/ })).not.toContainElement(toggle);
    expect(container.querySelector("a svg")).toBeNull();
  });

  it("flips the icon and the write on a tap, leaves the row in place, and a second tap restores it", async () => {
    read.mockResolvedValue(history([saved("t-chole", "topic", "2026-11-01T00:00:00.000Z"), saved("p-chole", "playbook", "2026-10-01T00:00:00.000Z")]));
    render(<SavedLibrary />);
    const topicToggle = await screen.findByRole("button", { name: "Save Choledocholithiasis" });
    fireEvent.click(topicToggle);
    expect(topicToggle).toHaveAttribute("aria-pressed", "false");
    expect(writeTopic).toHaveBeenLastCalledWith(chole, false);
    expect(screen.getByRole("link", { name: /Choledocholithiasis/ })).toBeInTheDocument();
    fireEvent.click(topicToggle);
    expect(topicToggle).toHaveAttribute("aria-pressed", "true");
    expect(writeTopic).toHaveBeenLastCalledWith(chole, true);

    const playbookToggle = screen.getByRole("button", { name: "Save Laparoscopic Cholecystectomy" });
    fireEvent.click(playbookToggle);
    expect(writePlaybook).toHaveBeenCalledWith(lapChole, false);
    expect(playbookToggle).toHaveAttribute("aria-pressed", "false");
  });

  it("puts the icon back when the device blocks the write", async () => {
    writeTopic.mockRejectedValue(new Error("blocked"));
    read.mockResolvedValue(history([saved("t-chole", "topic", "2026-11-01T00:00:00.000Z")]));
    render(<SavedLibrary />);
    const toggle = await screen.findByRole("button", { name: "Save Choledocholithiasis" });
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toHaveAttribute("aria-pressed", "true"));
  });

  it("shows a missing id as a muted row with the toggle only, and the toggle takes it off and puts it back by its entry", async () => {
    const gone = saved("t-gone", "topic", "2026-11-02T00:00:00.000Z");
    read.mockResolvedValue(history([gone]));
    render(<SavedLibrary />);
    const row = (await screen.findByText("No longer available")).closest("li")!;
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(row).toHaveTextContent(/^No longer available$/);
    const toggle = screen.getByRole("button", { name: "Save, no longer available" });
    fireEvent.click(toggle);
    expect(writeEntry).toHaveBeenLastCalledWith(gone, false);
    fireEvent.click(toggle);
    expect(writeEntry).toHaveBeenLastCalledWith(gone, true);
    expect(writeTopic).not.toHaveBeenCalled();
  });

  it("a playbook id is not read against the topics, so an id that exists only as the other kind is missing", async () => {
    read.mockResolvedValue(history([saved("t-chole", "playbook", "2026-11-01T00:00:00.000Z")]));
    render(<SavedLibrary />);
    expect(await screen.findByText("No longer available")).toBeInTheDocument();
  });

  it("says nothing is saved in two plain muted lines, with no icon, button or link", async () => {
    read.mockResolvedValue(history([]));
    const { container } = render(<SavedLibrary />);
    await screen.findByText("Nothing saved yet.");
    expect(container.querySelector(".list-state")).toHaveTextContent(/^Nothing saved yet\.Use Save on a topic or playbook\.$/);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("reports a failed read with Try again, and never claims the list is empty or the pages gone", async () => {
    read.mockRejectedValue(new Error("offline"));
    render(<SavedLibrary />);
    expect(await screen.findByRole("status")).toHaveTextContent("Couldn't load Saved.");
    expect(screen.getByRole("button", { name: "Try again" })).toBeEnabled();
    expect(screen.queryByText("Nothing saved yet.")).not.toBeInTheDocument();
    expect(screen.queryByText("No longer available")).not.toBeInTheDocument();
  });

  it("retries in place: the message stays with the button off until the read settles, then the rows replace it", async () => {
    let settle!: (value: History) => void;
    read.mockRejectedValueOnce(new Error("offline")).mockReturnValueOnce(new Promise((resolve) => { settle = resolve; }));
    render(<SavedLibrary />);
    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(screen.getByRole("status")).toHaveTextContent("Couldn't load Saved.");
    expect(screen.getByRole("button", { name: "Try again" })).toBeDisabled();
    settle(history([saved("t-chole", "topic", "2026-11-01T00:00:00.000Z")]));
    expect(await screen.findByRole("link", { name: /Choledocholithiasis/ })).toBeInTheDocument();
    expect(screen.queryByText("Couldn't load Saved.")).not.toBeInTheDocument();
  });
});
