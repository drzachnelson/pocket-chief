import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearPrivateOfflineData } from "@/lib/offline";
import { SettingsForm } from "@/components/settings-form";

vi.mock("@/lib/offline", () => ({ clearPrivateOfflineData: vi.fn() }));

const clear = vi.mocked(clearPrivateOfflineData);

afterEach(() => vi.clearAllMocks());

describe("SettingsForm", () => {
  it("confirms the clear once offline storage is gone", async () => {
    clear.mockResolvedValue(undefined);
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole("button", { name: /clear offline data/i }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Cleared. Reload to restore the atlas from the app bundle."));
  });

  it("reports failure without pretending the data is gone", async () => {
    clear.mockRejectedValue(new Error("blocked"));
    render(<SettingsForm />);
    fireEvent.click(screen.getByRole("button", { name: /clear offline data/i }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not clear offline storage. Close other Pocket Chief tabs and try again."));
  });
});
