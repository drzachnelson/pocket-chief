import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";

let pathname = "/topics";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("AppShell", () => {
  it("keeps Topics as a conventional link on the browse page", () => {
    render(<AppShell><p>Content</p></AppShell>);

    expect(screen.getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("button", { name: "Browse topics" })).not.toBeInTheDocument();
  });

  it("uses a distinct Browse topics drawer control inside a topic", () => {
    pathname = "/topics/neck-trauma";
    render(<AppShell><p>Content</p></AppShell>);

    expect(screen.getByRole("button", { name: "Browse topics" })).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("link", { name: "Topics" })).not.toBeInTheDocument();
  });

  it("renders three reader destinations without Add", () => {
    pathname = "/topics";
    render(<AppShell><p>Content</p></AppShell>);
    expect(screen.getAllByRole("link", { name: /search/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /saved/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /add/i })).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
