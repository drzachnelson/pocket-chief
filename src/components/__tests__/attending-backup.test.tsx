import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AttendingBackup } from "@/components/attending-backup";
import { buildAttendingBackup, type Attending, type AttendingNote } from "@/lib/attending";

const store = vi.hoisted(() => ({
  listAttendings: vi.fn(),
  listAllNotes: vi.fn(),
  exportAttendingData: vi.fn(),
  replaceAttendingData: vi.fn(),
  clearAttendingData: vi.fn(),
}));
vi.mock("@/lib/attending-db", () => store);

const alvarez: Attending = { id: "a1", name: "Alvarez", hospital: "Test General", specialty: "Vascular", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" };
const note: AttendingNote = { id: "n1", attendingId: "a1", procedureId: "femoropopliteal_bypass", section: "key_steps", text: "Subsartorial tunnel, always.", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" };

beforeEach(() => {
  store.listAttendings.mockReset().mockResolvedValue([alvarez]);
  store.listAllNotes.mockReset().mockResolvedValue([note]);
  store.exportAttendingData.mockReset().mockResolvedValue(buildAttendingBackup([alvarez], [note]));
  store.replaceAttendingData.mockReset().mockResolvedValue(undefined);
  store.clearAttendingData.mockReset().mockResolvedValue(undefined);
  // jsdom implements neither; the export path uses both.
  URL.createObjectURL = vi.fn(() => "blob:mock");
  URL.revokeObjectURL = vi.fn();
  HTMLAnchorElement.prototype.click = vi.fn();
});

const deleteButton = () => screen.getByRole("button", { name: /Delete all attending preferences/ });

// Two jsdom gaps, neither of which affects a real browser:
// - Blob.text() is unimplemented, though every browser this app targets has had it for years.
// - userEvent refuses a `hidden` input, and fireEvent cannot build a real FileList, so the file
//   is attached directly.
if (typeof Blob.prototype.text !== "function") {
  Blob.prototype.text = function text(this: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(this);
    });
  };
}

function upload(file: File) {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')!;
  Object.defineProperty(input, "files", { value: [file], configurable: true });
  fireEvent.change(input);
}

describe("AttendingBackup", () => {
  it("says plainly that the export is the only backup that exists", async () => {
    render(<AttendingBackup />);
    expect(await screen.findByText(/1 attending and 1 preference on this device/)).toBeInTheDocument();
    expect(screen.getByText(/only backup that exists/)).toBeInTheDocument();
  });

  it("keeps delete disabled until an export has actually happened", async () => {
    // The gate is an export, not a confirmation dialog. A dialog asks whether you meant it,
    // which is not the same as making sure you can undo it.
    render(<AttendingBackup />);
    await screen.findByText(/1 attending and 1 preference/);

    expect(deleteButton()).toBeDisabled();
    expect(screen.getByLabelText(/Type DELETE to enable/)).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Export JSON/ }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Exported 1 attending and 1 preference."));

    // Exported, but still gated on typing the word.
    expect(deleteButton()).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/Type DELETE to enable/), { target: { value: "delete" } });
    expect(deleteButton()).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/Type DELETE to enable/), { target: { value: "DELETE" } });
    expect(deleteButton()).toBeEnabled();

    fireEvent.click(deleteButton());
    await waitFor(() => expect(store.clearAttendingData).toHaveBeenCalled());
  });

  it("merges an imported backup instead of replacing what is on the device", async () => {
    render(<AttendingBackup />);
    await screen.findByText(/1 attending and 1 preference/);
    const incoming = buildAttendingBackup([alvarez], [{ ...note, id: "n2", text: "From another device." }]);
    const file = new File([JSON.stringify(incoming)], "backup.json", { type: "application/json" });

    upload(file);

    await waitFor(() => expect(store.replaceAttendingData).toHaveBeenCalled());
    const [, notes] = store.replaceAttendingData.mock.calls[0];
    // Both the local note and the imported one — a backup is a snapshot of one moment and
    // cannot know what was deliberately deleted since.
    expect((notes as AttendingNote[]).map((row) => row.id).sort()).toEqual(["n1", "n2"]);
    expect(await screen.findByRole("status")).toHaveTextContent(/Nothing already on this device was removed/);
  });

  it("refuses a file that is not a backup, and says why", async () => {
    render(<AttendingBackup />);
    await screen.findByText(/1 attending and 1 preference/);
    const file = new File([JSON.stringify({ format: "something-else" })], "notes.json", { type: "application/json" });

    upload(file);

    expect(await screen.findByRole("alert")).toHaveTextContent(/not a Pocket Chief attending backup/);
    expect(store.replaceAttendingData).not.toHaveBeenCalled();
  });

  it("offers no destructive control when there is nothing to lose", async () => {
    store.listAttendings.mockResolvedValue([]);
    store.listAllNotes.mockResolvedValue([]);
    render(<AttendingBackup />);

    expect(await screen.findByText(/Nothing recorded yet/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Delete all attending preferences/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export JSON/ })).toBeDisabled();
  });
});
