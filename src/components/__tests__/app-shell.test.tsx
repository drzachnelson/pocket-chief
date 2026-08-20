import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";

vi.mock("next/navigation", () => ({ usePathname: () => "/topics" }));

describe("AppShell", () => {
  it("uses a button for the active mobile Topics destination", () => {
    render(<AppShell><p>Content</p></AppShell>);

    expect(screen.getByRole("button", { name: "Topics" })).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("link", { name: "Topics" })).not.toBeInTheDocument();
  });

  it("renders the four primary mobile destinations and owner tools", () => {
    render(<AppShell><p>Content</p></AppShell>);
    expect(screen.getAllByRole("link", { name: /search/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /topics/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /saved/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /add/i }).length).toBeGreaterThan(0);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
