import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlaybookContent } from "@/components/playbook-content";
import type { Attending, AttendingNote } from "@/lib/attending";
import type { Playbook, TopicBlock } from "@/lib/types";

const store = vi.hoisted(() => ({
  listAttendings: vi.fn(),
  listNotes: vi.fn(),
  saveAttending: vi.fn(),
  saveNote: vi.fn(),
  deleteNote: vi.fn(),
}));
vi.mock("@/lib/attending-db", () => store);
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

const alvarez: Attending = { id: "a1", name: "Alvarez", hospital: "Test General", specialty: "Vascular", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" };
const note = (over: Partial<AttendingNote> = {}): AttendingNote => ({ id: "n1", attendingId: "a1", procedureId: "femoropopliteal_bypass", section: "key_steps", text: "Runs the tunnel subsartorially, always.", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z", ...over });

const renderPlaybook = () => render(<PlaybookContent playbook={playbook} sources={[]} linkEntries={[]} />);

// Radix tabs select on pointer-down, which fireEvent.click does not produce.
const openTab = (name: RegExp) => userEvent.click(screen.getByRole("tab", { name }));

beforeEach(() => {
  store.listAttendings.mockReset().mockResolvedValue([alvarez]);
  store.listNotes.mockReset().mockResolvedValue([]);
  store.saveAttending.mockReset().mockResolvedValue(undefined);
  store.saveNote.mockReset().mockResolvedValue(undefined);
  store.deleteNote.mockReset().mockResolvedValue(undefined);
  try { window.localStorage.clear(); } catch { /* jsdom always allows this */ }
});

describe("PlaybookContent", () => {
  it("never writes a playbook into the topic saved or recent stores", async () => {
    renderPlaybook();
    await waitFor(() => expect(store.listAttendings).toHaveBeenCalled());
    expect(offline.recordRecentView).not.toHaveBeenCalled();
    expect(offline.setTopicSaved).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  });

  it("shows standard technique until an attending is chosen", async () => {
    store.listNotes.mockResolvedValue([note({ anchor: { blockId: "b1" } })]);
    renderPlaybook();
    await waitFor(() => expect(screen.getByLabelText("Whose preferences?")).toBeInTheDocument());
    expect(document.querySelectorAll(".attending-delta")).toHaveLength(0);
    expect(screen.queryByRole("tab", { name: /Attending/ })).not.toBeInTheDocument();
  });

  it("renders a delta inside the section it is anchored to", async () => {
    store.listNotes.mockResolvedValue([note({ anchor: { blockId: "b1" } })]);
    renderPlaybook();
    fireEvent.change(await screen.findByLabelText("Whose preferences?"), { target: { value: "a1" } });

    const delta = await screen.findByLabelText("Alvarez's preference");
    expect(delta).toHaveTextContent("Runs the tunnel subsartorially, always.");
    // Inside the disclosure, not after it: a sibling would stay visible when the reader collapses
    // the section, leaving the note floating with nothing to modify.
    expect(delta.closest("details[data-block-id='b1']")).not.toBeNull();
    expect(within(delta).getByText("Alvarez")).toBeInTheDocument();
  });

  it("anchors a delta to one step of a sequence, not the whole block", async () => {
    store.listNotes.mockResolvedValue([note({ anchor: { blockId: "b2", stepTitle: "Close" } })]);
    renderPlaybook();
    fireEvent.change(await screen.findByLabelText("Whose preferences?"), { target: { value: "a1" } });

    const delta = await screen.findByLabelText("Alvarez's preference");
    const step = delta.closest("li");
    expect(step).not.toBeNull();
    expect(step).toHaveTextContent("Close");
    expect(step).not.toHaveTextContent("Tunnel");
  });

  it("keeps an unresolvable anchor visible on the card instead of dropping the note", async () => {
    store.listNotes.mockResolvedValue([note({ anchor: { blockId: "b2", stepTitle: "Renamed since" } })]);
    renderPlaybook();
    fireEvent.change(await screen.findByLabelText("Whose preferences?"), { target: { value: "a1" } });

    // It cannot render inline, because nothing matches the anchor any more.
    await waitFor(() => expect(screen.getByRole("tab", { name: /Attending/ })).toBeInTheDocument());
    expect(screen.queryByLabelText("Alvarez's preference")).not.toBeInTheDocument();

    await openTab(/Attending/);
    expect(await screen.findByText("1 unlinked preference")).toBeInTheDocument();
  });

  it("reports a refused note instead of pretending it saved", async () => {
    store.listNotes.mockResolvedValue([]);
    store.saveNote.mockRejectedValue(new Error("This note looks like it contains patient information (medical record number)."));
    renderPlaybook();
    fireEvent.change(await screen.findByLabelText("Whose preferences?"), { target: { value: "a1" } });
    await waitFor(() => expect(screen.getByRole("tab", { name: /Attending/ })).toBeInTheDocument());
    await openTab(/Attending/);
    await userEvent.click(await screen.findByRole("button", { name: /Add a preference/ }));

    fireEvent.change(screen.getByLabelText("Preference"), { target: { value: "MRN 4482910 bled." } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/patient information/);
    // Still open, with the text intact, so the author can rewrite it.
    expect(screen.getByLabelText("Preference")).toHaveValue("MRN 4482910 bled.");
  });

  it("offers all eight sections as prompts when an attending has no notes yet", async () => {
    store.listNotes.mockResolvedValue([]);
    renderPlaybook();
    fireEvent.change(await screen.findByLabelText("Whose preferences?"), { target: { value: "a1" } });
    await waitFor(() => expect(screen.getByRole("tab", { name: /Attending/ })).toBeInTheDocument());
    await openTab(/Attending/);

    // Hiding empty sections would leave a blank page and no idea what a useful note looks like.
    expect(await screen.findByRole("heading", { name: "Preference snapshot", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My notes from prior cases", level: 3 })).toBeInTheDocument();
    expect(screen.getAllByText("Nothing recorded yet.")).toHaveLength(8);
  });

  it("survives storage being blocked without losing the guide", async () => {
    store.listAttendings.mockRejectedValue(new Error("blocked"));
    renderPlaybook();
    expect(await screen.findByRole("alert")).toHaveTextContent(/blocked private storage/);
    expect(screen.getByRole("heading", { name: "Anatomy" })).toBeInTheDocument();
  });
});
