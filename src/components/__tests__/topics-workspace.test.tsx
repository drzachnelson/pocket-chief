import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/app-shell";
import { TopicsWorkspace } from "@/components/topics-workspace";
import type { TopicNavigationCategory } from "@/lib/topic-navigation";

let currentPathname = "/topics";
vi.mock("next/navigation", () => ({ usePathname: () => currentPathname }));

const stored = new Map<string, string>();
Object.defineProperty(window, "localStorage", { configurable: true, value: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) } });

const navigation: TopicNavigationCategory[] = [{
  id: "trauma", slug: "trauma", label: "Trauma", topics: [{ id: "neck", slug: "neck-trauma", label: "Neck trauma", updatedAt: "2026-08-20", taxonomyNodeId: "trauma", sections: [{ id: "assessment", label: "Assessment", level: 2 }] }], children: [],
}];

const branchedNavigation: TopicNavigationCategory[] = [{
  id: "abdominal", slug: "abdominal", label: "Abdominal", topics: [], children: [
    { id: "upper", slug: "upper", label: "Upper GI", topics: [{ id: "alpha", slug: "alpha-topic", label: "Alpha topic", updatedAt: "2026-08-20", taxonomyNodeId: "upper", sections: [] }], children: [] },
    { id: "lower", slug: "lower", label: "Lower GI", topics: [{ id: "beta", slug: "beta-topic", label: "Beta topic", updatedAt: "2026-08-20", taxonomyNodeId: "lower", sections: [] }], children: [] },
  ],
}];

function renderWorkspace() {
  return render(<AppShell><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
}

afterEach(() => { currentPathname = "/topics"; });

describe("TopicsWorkspace", () => {
  // `trailingSlash: true` makes the real usePathname() report "/topics/alpha-topic/". This suite
  // previously mocked only the unslashed form, which is why it stayed green while the live
  // curriculum tree silently stopped expanding on every topic page.
  it.each([["without a trailing slash", "/topics/alpha-topic"], ["with a trailing slash", "/topics/alpha-topic/"]])(
    "resolves the active topic %s", (_label, pathname) => {
      currentPathname = pathname;
      render(<AppShell><TopicsWorkspace navigation={branchedNavigation}><p>Topic content</p></TopicsWorkspace></AppShell>);

      expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
    },
  );

  it("keeps inactive child branches hidden until selected and restores the current topic path", () => {
    currentPathname = "/topics/alpha-topic";
    const view = render(<AppShell><TopicsWorkspace navigation={branchedNavigation}><p>Topic content</p></TopicsWorkspace></AppShell>);

    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Lower GI" }));
    expect(screen.getByRole("link", { name: "Beta topic" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();

    currentPathname = "/topics/alpha-topic";
    view.unmount();
    render(<AppShell><TopicsWorkspace navigation={branchedNavigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
  });

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

  it("clears drawer open state when the workspace unmounts", () => {
    const view = renderWorkspace();
    fireEvent.click(screen.getByRole("button", { name: "Topics" }));
    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();

    view.rerender(<AppShell><p>Other route content</p></AppShell>);

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Topics" })).toHaveAttribute("aria-expanded", "false");
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
