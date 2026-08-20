import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";
import { TopicsWorkspace } from "@/components/topics-workspace";
import type { TopicNavigationCategory } from "@/lib/topic-navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/topics" }));

const stored = new Map<string, string>();
Object.defineProperty(window, "localStorage", { configurable: true, value: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) } });

const navigation: TopicNavigationCategory[] = [{
  id: "trauma", slug: "trauma", label: "Trauma", topics: [{ id: "neck", slug: "neck-trauma", label: "Neck trauma", updatedAt: "2026-08-20", taxonomyNodeId: "trauma", sections: [{ id: "assessment", label: "Assessment", level: 2 }] }], children: [],
}];

function renderWorkspace() {
  return render(<AppShell><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
}

describe("TopicsWorkspace", () => {
  it("opens the shared Topics drawer and restores focus after Escape", () => {
    renderWorkspace();
    const trigger = screen.getByRole("button", { name: "Topics" });
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close topics navigation" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes the drawer after topic selection and remembers the desktop rail state", () => {
    stored.clear();
    renderWorkspace();
    fireEvent.click(screen.getByRole("button", { name: "Topics" }));
    const drawer = screen.getByRole("dialog", { name: "Topics" });
    fireEvent.click(within(drawer).getByRole("button", { name: "Trauma" }));
    const topicLink = within(drawer).getByRole("link", { name: "Neck trauma" });
    topicLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(topicLink);

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Collapse Topics sidebar" }));
    expect(window.localStorage.getItem("pocket-chief-topics-sidebar-collapsed")).toBe("true");
  });
});
