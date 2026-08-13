import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";

vi.mock("next/navigation", () => ({ usePathname: () => "/topics" }));

describe("AppShell", () => {
  it("renders the four primary mobile destinations and owner tools", () => {
    render(<AppShell><p>Content</p></AppShell>);
    expect(screen.getAllByRole("link", { name: /search/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /topics/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /saved/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /add/i }).length).toBeGreaterThan(0);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
