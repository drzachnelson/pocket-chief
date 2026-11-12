import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearPrivateOfflineData } from "@/lib/offline";
import { SettingsForm } from "@/components/settings-form";

vi.mock("@/lib/offline", () => ({ clearPrivateOfflineData: vi.fn() }));

const clear = vi.mocked(clearPrivateOfflineData);

afterEach(() => vi.clearAllMocks());

const confirmClear = () => {
  fireEvent.click(screen.getByRole("button", { name: /clear offline data/i }));
  fireEvent.click(screen.getByRole("button", { name: "Clear Saved topics, playbooks and history" }));
};

describe("SettingsForm", () => {
  it("names Saved topics and playbooks in the storage copy", () => {
    render(<SettingsForm />);
    expect(screen.getByText(/keeps topics and playbooks, your Saved topics and playbooks and your reading history/)).toBeInTheDocument();
  });

  it("holds the one theme control: System, Light, Dark", () => {
    render(<SettingsForm />);
    expect(screen.getAllByRole("radiogroup")).toHaveLength(1);
    expect(screen.getByRole("radiogroup", { name: "Theme" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio").map((item) => item.closest("label")?.textContent)).toEqual(["System", "Light", "Dark"]);
  });

  it("asks before clearing, naming what is lost, and clears nothing on the first tap", () => {
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole("button", { name: /clear offline data/i }));
    expect(clear).not.toHaveBeenCalled();
    expect(screen.getByRole("group", { name: "Confirm clearing offline data" })).toHaveTextContent("Saved topics and playbooks");
    expect(screen.getByRole("group", { name: "Confirm clearing offline data" })).toHaveTextContent("no server copy");
    expect(screen.queryByRole("button", { name: /clear offline data/i })).not.toBeInTheDocument();
  });

  it("cancels back to the first button, with focus on it", () => {
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole("button", { name: /clear offline data/i }));
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(clear).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /clear offline data/i })).toHaveFocus();
  });

  it("confirms the clear once offline storage is gone", async () => {
    clear.mockResolvedValue(undefined);
    render(<SettingsForm />);
    confirmClear();
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Cleared. Reload to restore topics and playbooks."));
    expect(screen.queryByRole("group", { name: "Confirm clearing offline data" })).not.toBeInTheDocument();
  });

  it("reports failure without pretending the data is gone", async () => {
    clear.mockRejectedValue(new Error("blocked"));
    render(<SettingsForm />);
    confirmClear();
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not clear offline storage. Close other Pocket Chief tabs and try again."));
  });

  it("uses one vocabulary and no developer copy", () => {
    render(<SettingsForm />);
    expect(document.body.textContent).not.toMatch(/atlas|bookmark|library|src\/content/i);
  });
});
