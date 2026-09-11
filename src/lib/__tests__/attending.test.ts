import { describe, expect, it } from "vitest";
import {
  ATTENDING_SECTIONS,
  buildAttendingBackup,
  mergeAttendingBackup,
  notesBySection,
  notesForAnchor,
  parseAttendingBackup,
  unlinkedNotes,
  type Attending,
  type AttendingNote,
} from "@/lib/attending";
import type { TopicBlock } from "@/lib/types";

const attending: Attending = { id: "a1", name: "Alvarez", hospital: "Test General", specialty: "Vascular", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" };
const note = (over: Partial<AttendingNote> = {}): AttendingNote => ({ id: "n1", attendingId: "a1", procedureId: "femoropopliteal_bypass", section: "key_steps", text: "Prefers a 6-0 prolene.", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z", ...over });

const blocks: TopicBlock[] = [
  { id: "b1", type: "prose", heading: "Anatomy", text: "x", claims: [] },
  { id: "b2", type: "sequence", heading: "Steps", steps: [{ title: "Tunnel", detail: "y" }, { title: "Close", detail: "z" }], claims: [] },
];

describe("attending schema", () => {
  it("keeps the eight canonical sections in the vault's order", () => {
    // Ported verbatim from the OR Playbook vault so its existing cards import without reshaping.
    expect(ATTENDING_SECTIONS.map((section) => section.id)).toEqual([
      "preference_snapshot", "setup_positioning", "incision_access", "dissection_style",
      "key_steps", "equipment_preferences", "pitfalls", "my_notes",
    ]);
  });

  it("groups notes into every section, including the empty ones", () => {
    // The card view renders empty sections as prompts to fill — that is what teaches the schema.
    const grouped = notesBySection([note()]);
    expect(grouped.size).toBe(ATTENDING_SECTIONS.length);
    expect(grouped.get("key_steps")).toHaveLength(1);
    expect(grouped.get("pitfalls")).toEqual([]);
  });
});

describe("anchoring", () => {
  it("matches a note to its block and to a specific step", () => {
    const onBlock = note({ id: "n1", anchor: { blockId: "b2" } });
    const onStep = note({ id: "n2", anchor: { blockId: "b2", stepTitle: "Tunnel" } });

    expect(notesForAnchor([onBlock, onStep], "b2").map((n) => n.id)).toEqual(["n1"]);
    expect(notesForAnchor([onBlock, onStep], "b2", "Tunnel").map((n) => n.id)).toEqual(["n2"]);
    expect(notesForAnchor([onBlock, onStep], "b2", "Close")).toEqual([]);
  });

  it("surfaces a note whose anchor no longer resolves rather than dropping it", () => {
    // A renamed step or a deleted block must never make a hand-written note disappear.
    const stale = note({ id: "n3", anchor: { blockId: "b2", stepTitle: "Renamed since" } });
    const gone = note({ id: "n4", anchor: { blockId: "deleted-block" } });
    const fine = note({ id: "n5", anchor: { blockId: "b1" } });
    const unanchored = note({ id: "n6" });

    expect(unlinkedNotes([stale, gone, fine, unanchored], blocks).map((n) => n.id)).toEqual(["n3", "n4", "n6"]);
  });
});

describe("backup", () => {
  const backup = buildAttendingBackup([attending], [note()]);

  it("round-trips through parse", () => {
    expect(parseAttendingBackup(JSON.parse(JSON.stringify(backup))).notes).toHaveLength(1);
  });

  it("refuses anything that is not a backup of the right shape and version", () => {
    expect(() => parseAttendingBackup(null)).toThrow(/not a Pocket Chief attending backup/);
    expect(() => parseAttendingBackup({ format: "something-else" })).toThrow(/not a Pocket Chief attending backup/);
    expect(() => parseAttendingBackup({ ...backup, version: 99 })).toThrow(/version 99/);
    expect(() => parseAttendingBackup({ ...backup, notes: [{ ...note(), section: "invented_section" }] })).toThrow(/unknown section/);
    expect(() => parseAttendingBackup({ ...backup, attendings: [{ ...attending, updatedAt: "not a date" }] })).toThrow(/unreadable date/);
  });

  it("refuses a backup whose notes point at an attending it does not contain", () => {
    expect(() => parseAttendingBackup({ ...backup, attendings: [] })).toThrow(/belong to an attending it does not contain/);
  });

  it("merges last-write-wins without deleting anything local", () => {
    const local = { attendings: [attending], notes: [note({ text: "Newer local edit.", updatedAt: "2026-09-20T00:00:00.000Z" })] };
    const incoming = buildAttendingBackup([attending], [note({ text: "Older backup text." })]);

    const merged = mergeAttendingBackup(local, incoming);

    expect(merged.notes[0].text).toBe("Newer local edit.");
  });

  it("adds notes the device has never seen", () => {
    const local = { attendings: [attending], notes: [] as AttendingNote[] };
    const merged = mergeAttendingBackup(local, buildAttendingBackup([attending], [note({ id: "n9" })]));
    expect(merged.notes.map((n) => n.id)).toEqual(["n9"]);
  });

  it("is idempotent — importing the same backup twice changes nothing", () => {
    const once = mergeAttendingBackup({ attendings: [], notes: [] }, backup);
    const twice = mergeAttendingBackup(once, backup);
    expect(twice).toEqual(once);
  });
});
