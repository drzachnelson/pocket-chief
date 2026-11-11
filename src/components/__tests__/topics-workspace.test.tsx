import { fireEvent, render, screen, within } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell, useTopicsDrawer } from "@/components/app-shell";
import { TopicTree, TopicsWorkspace } from "@/components/topics-workspace";
import type { TopicNavigationCategory } from "@/lib/topic-navigation";

let currentPathname = "/topics";
vi.mock("next/navigation", () => ({ usePathname: () => currentPathname }));

const navigation: TopicNavigationCategory[] = [{
  id: "trauma", slug: "trauma", label: "Trauma", topics: [{ id: "neck", slug: "neck-trauma", label: "Neck trauma", updatedAt: "2026-08-20", taxonomyNodeId: "trauma", sections: [{ id: "assessment", label: "Assessment", level: 2 }] }], children: [],
}];

const branchedNavigation: TopicNavigationCategory[] = [{
  id: "abdominal", slug: "abdominal", label: "Abdominal", topics: [], children: [
    { id: "upper", slug: "upper", label: "Upper GI", topics: [{ id: "alpha", slug: "alpha-topic", label: "Alpha topic", updatedAt: "2026-08-20", taxonomyNodeId: "upper", sections: [] }], children: [] },
    { id: "lower", slug: "lower", label: "Lower GI", topics: [{ id: "beta", slug: "beta-topic", label: "Beta topic", updatedAt: "2026-08-20", taxonomyNodeId: "lower", sections: [] }], children: [] },
  ],
}];

// Nothing in the shell opens the drawer any more; the reader-chrome slice replaces it with the Contents dialog. This stands in
// for the old trigger so the drawer keeps its coverage until it is deleted.
function Opener() {
  const { open, isOpen } = useTopicsDrawer();
  return <button type="button" aria-expanded={isOpen} onClick={(event) => open(event.currentTarget)}>Open topics</button>;
}

function renderWorkspace() {
  currentPathname = "/topics/neck-trauma";
  return render(<AppShell><Opener /><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
}

afterEach(() => { currentPathname = "/topics"; });

describe("TopicTree", () => {
  // `trailingSlash: true` makes the real usePathname() report "/topics/alpha-topic/". This suite
  // previously mocked only the unslashed form, which is why it stayed green while the live
  // curriculum tree silently stopped expanding on every topic page.
  it.each([["without a trailing slash", "/topics/alpha-topic"], ["with a trailing slash", "/topics/alpha-topic/"]])(
    "resolves the active topic %s", (_label, pathname) => {
      currentPathname = pathname;
      render(<TopicTree navigation={branchedNavigation} />);

      expect(screen.getByRole("link", { name: "Alpha topic" })).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
    },
  );

  it("keeps inactive child branches hidden until selected and restores the current topic path", () => {
    currentPathname = "/topics/alpha-topic/";
    const view = render(<TopicTree navigation={branchedNavigation} />);

    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Lower GI" }));
    expect(screen.getByRole("link", { name: "Beta topic" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();

    view.unmount();
    render(<TopicTree navigation={branchedNavigation} />);
    expect(screen.getByRole("link", { name: "Alpha topic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Beta topic" })).not.toBeInTheDocument();
  });
});

describe("TopicsWorkspace", () => {
  it("renders only its children: the sidebar tree, the Browse button and the collapse went with the second shell", () => {
    const { container } = renderWorkspace();

    expect(screen.getByText("Topic content")).toBeInTheDocument();
    expect(container.querySelector("aside")).toBeNull();
    expect(screen.queryByRole("navigation", { name: "Topics curriculum" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /browse topics|sidebar/i })).not.toBeInTheDocument();
  });

  it("opens the shared Topics drawer and restores focus after Escape", () => {
    renderWorkspace();
    const trigger = screen.getByRole("button", { name: "Open topics" });
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close topics navigation" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  // A tap can land after the trigger is live but before the segment layout that supplies the drawer
  // has registered it. StrictMode's effect remount is what made that tap fatal rather than merely
  // late: its cleanup used to reset the pending open before the drawer could ever render.
  it("honours a tap that lands before the workspace registers the drawer", () => {
    currentPathname = "/topics/neck-trauma";
    const view = render(<AppShell><Opener /></AppShell>, { wrapper: StrictMode });
    const trigger = screen.getByRole("button", { name: "Open topics" });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();

    view.rerender(<AppShell><Opener /><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);

    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close topics navigation" })).toHaveFocus();
  });

  // Leaving the Topics route is the real reason the workspace goes away, so the route change is what
  // has to clear the open state — and it has to stay cleared, or the drawer springs back open by
  // itself the moment the reader returns to a topic.
  it("clears drawer open state when the reader leaves the Topics route", () => {
    const view = renderWorkspace();
    fireEvent.click(screen.getByRole("button", { name: "Open topics" }));
    expect(screen.getByRole("dialog", { name: "Topics" })).toBeInTheDocument();

    currentPathname = "/saved/";
    view.rerender(<AppShell><Opener /><p>Other route content</p></AppShell>);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();

    currentPathname = "/topics/neck-trauma/";
    view.rerender(<AppShell><Opener /><TopicsWorkspace navigation={navigation}><p>Topic content</p></TopicsWorkspace></AppShell>);
    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open topics" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the drawer after topic selection", () => {
    renderWorkspace();
    fireEvent.click(screen.getByRole("button", { name: "Open topics" }));
    const drawer = screen.getByRole("dialog", { name: "Topics" });
    fireEvent.click(within(drawer).getByRole("button", { name: "Trauma" }));
    const topicLink = within(drawer).getByRole("link", { name: "Neck trauma" });
    topicLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(topicLink);

    expect(screen.queryByRole("dialog", { name: "Topics" })).not.toBeInTheDocument();
  });
});
