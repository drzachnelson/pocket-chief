import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BlockCollapse } from "@/components/block-list";
import { PageToolbar, ReaderTools } from "@/components/page-toolbar";
import { markNavigated } from "@/lib/app-history";
import type { ContentsData } from "@/lib/reader-contents";

const push = vi.fn();
vi.mock("next/navigation", () => ({ usePathname: () => "/topics/alpha-topic", useRouter: () => ({ push }) }));

const contents: ContentsData = { corpus: "topics", sections: [{ id: "assessment", label: "Assessment", level: 2 }], branches: [{ id: "trauma", label: "Trauma", links: [{ slug: "alpha-topic", label: "Alpha topic" }], groups: [] }] };
const collapse = (overrides: Partial<BlockCollapse> = {}): BlockCollapse => ({ rootRef: { current: null }, collapsed: new Set(["a"]), collapsibleIds: ["a"], allOpen: false, toggleAll: vi.fn(), setBlockOpen: vi.fn(), ...overrides });

const find = { finding: false, findRef: null, onFind: () => undefined };

beforeEach(() => { push.mockReset(); });
afterEach(() => { vi.restoreAllMocks(); });

function renderTools(props: Partial<Parameters<typeof ReaderTools>[0]> = {}) {
  return render(<><div id="shell-toolbar" /><ReaderTools corpus="topics" contents={contents} collapse={collapse()} tab="notes" {...props} /></>);
}

describe("ReaderTools", () => {
  it("puts the toolbar in the shell's slot as one group named Page tools", () => {
    renderTools();
    const slot = document.getElementById("shell-toolbar")!;
    const group = within(slot).getByRole("group", { name: "Page tools" });
    expect(within(group).getAllByRole("button").map((button) => button.textContent)).toEqual(["Back", "Contents", "Find text", "Expand all"]);
    expect(within(group).getByRole("link", { name: "Topics" })).toHaveAttribute("href", "/topics");
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("renders nothing until the shell's slot exists", () => {
    render(<ReaderTools corpus="topics" contents={contents} collapse={collapse()} tab="notes" />);
    expect(screen.queryByRole("group", { name: "Page tools" })).not.toBeInTheDocument();
  });

  it("names the index link for the corpus", () => {
    renderTools({ corpus: "playbooks" });
    expect(screen.getByRole("link", { name: "Playbooks" })).toHaveAttribute("href", "/playbooks");
  });

  it("opens the Contents dialog from its button and returns focus to the button when it closes", () => {
    renderTools();
    const button = screen.getByRole("button", { name: "Contents" });
    expect(button).toHaveAttribute("aria-haspopup", "dialog");
    button.focus();
    fireEvent.click(button);

    expect(screen.getByRole("dialog", { name: "Contents" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close contents" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });
});

describe("PageToolbar", () => {
  it("flips Expand all to Collapse all without a pressed state", () => {
    const toggleAll = vi.fn();
    const view = render(<PageToolbar corpus="topics" backFallback="/topics" collapse={collapse({ toggleAll })} notesShown contentsRef={null} onOpenContents={() => undefined} {...find} />);
    const expand = screen.getByRole("button", { name: "Expand all" });
    expect(expand).not.toHaveAttribute("aria-pressed");
    fireEvent.click(expand);
    expect(toggleAll).toHaveBeenCalledTimes(1);

    view.rerender(<PageToolbar corpus="topics" backFallback="/topics" collapse={collapse({ allOpen: true })} notesShown contentsRef={null} onOpenContents={() => undefined} {...find} />);
    expect(screen.getByRole("button", { name: "Collapse all" })).not.toHaveAttribute("aria-pressed");
  });

  it("leaves Expand all out of a page with nothing to expand and disables it away from Notes", () => {
    const view = render(<PageToolbar corpus="topics" backFallback="/topics" collapse={collapse({ collapsibleIds: [] })} notesShown contentsRef={null} onOpenContents={() => undefined} {...find} />);
    expect(screen.queryByRole("button", { name: /expand all/i })).not.toBeInTheDocument();

    view.rerender(<PageToolbar corpus="topics" backFallback="/topics" collapse={collapse()} notesShown={false} contentsRef={null} onOpenContents={() => undefined} {...find} />);
    expect(screen.getByRole("button", { name: "Expand all" })).toBeDisabled();
  });

  // The module remembers an in-app navigation for the rest of the page load, so the cold-launch case has to run first.
  it("is never dead: with nothing in-app behind the page Back goes to the fallback, and afterwards back through history", () => {
    const back = vi.spyOn(window.history, "back").mockImplementation(() => undefined);
    render(<PageToolbar corpus="playbooks" backFallback="/playbooks#vascular" collapse={collapse()} notesShown contentsRef={null} onOpenContents={() => undefined} {...find} />);

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(push).toHaveBeenCalledWith("/playbooks#vascular");
    expect(back).not.toHaveBeenCalled();

    markNavigated();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(back).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledTimes(1);
  });
});
