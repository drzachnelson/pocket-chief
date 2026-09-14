import { fireEvent, render, screen, within } from "@testing-library/react";
import { StrictMode } from "react";
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
  currentPathname = "/topics/neck-trauma";
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
    const trigger = screen.getAllByRole("button", { name: "Browse topics" })[0];
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close topics navigation" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  // The mobile trigger lives in the root layout; the workspace that supplies the drawer's content
  // lives in the /topics segment layout. React commits those separately, so a tap can land after the
  // trigger is live but before the drawer exists. StrictMode's effect remount is what made that tap
  // fatal rather than merely late: its cleanup used to reset the pending open before the drawer
  // could ever render.
  it("honours a tap that lands before the workspace registers the drawer", () => {
    currentPathname = "/topics/neck-trauma";
    const view = render(<AppShell><p>Topic content</p></AppShell>, { wrapper: StrictMode });
    const trigger = screen.getAllByRole("button", { name: "Browse topics" })[0];
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();

    view.rerender(<AppShell><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);

    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close topics navigation" })).toHaveFocus();
  });

  // Leaving the Topics route is the real reason the workspace goes away, so the route change is what
  // has to clear the open state — and it has to stay cleared, or the drawer springs back open by
  // itself the moment the reader returns to a topic.
  it("clears drawer open state when the reader leaves the Topics route", () => {
    const view = renderWorkspace();
    fireEvent.click(screen.getAllByRole("button", { name: "Browse topics" })[0]);
    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();

    currentPathname = "/saved";
    view.rerender(<AppShell><p>Other route content</p></AppShell>);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();

    currentPathname = "/topics/neck-trauma";
    view.rerender(<AppShell><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Browse topics" })[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the drawer after topic selection and remembers the desktop rail state", () => {
    stored.clear();
    renderWorkspace();
    fireEvent.click(screen.getAllByRole("button", { name: "Browse topics" })[0]);
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
