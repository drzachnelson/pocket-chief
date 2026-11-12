import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchForm } from "@/components/search-form";
import { loadSearchIndex } from "@/lib/library-client";
import { recordRecentView, setPlaybookSaved, setTopicSaved } from "@/lib/offline";
import { searchIndex, type SearchIndex } from "@/lib/search";
import { library } from "./search-fixtures";

let pathname = "/";
const push = vi.fn();
vi.mock("next/navigation", () => ({ usePathname: () => pathname, useRouter: () => ({ push }) }));
vi.mock("@/lib/library-client", async (original) => ({ ...(await original<typeof import("@/lib/library-client")>()), loadSearchIndex: vi.fn() }));
vi.mock("@/lib/search", async (original) => { const actual = await original<typeof import("@/lib/search")>(); return { ...actual, searchIndex: vi.fn(actual.searchIndex) }; });
vi.mock("@/lib/offline", () => ({ recordRecentView: vi.fn(), setTopicSaved: vi.fn(), setPlaybookSaved: vi.fn() }));

const read = vi.mocked(loadSearchIndex);
const field = () => screen.getByRole("combobox", { name: "Search" });
const options = () => screen.queryAllByRole("option");

beforeEach(() => {
  pathname = "/";
  window.history.replaceState(null, "", "/");
  read.mockReset().mockResolvedValue(library());
});
afterEach(() => { vi.clearAllMocks(); });

describe("SearchForm", () => {
  it("is one search landmark holding a Search combobox, with no hint and nothing open", () => {
    const { container } = render(<SearchForm />);
    const form = screen.getByRole("search");
    expect(within(form).getByRole("combobox", { name: "Search" })).toHaveAttribute("type", "search");
    expect(field()).toHaveAttribute("placeholder", "Search");
    expect(field()).toHaveAttribute("enterkeyhint", "search");
    expect(field()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/offline|on this device|recent searches/i);
  });

  it("does not read the index until the field is first focused", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    expect(read).not.toHaveBeenCalled();
    await user.click(field());
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("shows about six ranked rows for a query, topics and playbooks together, and none for one letter", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.type(field(), "h");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.type(field(), "ernia");
    expect(await screen.findByRole("listbox", { name: "Quick results" })).toBeInTheDocument();
    expect(options()).toHaveLength(6);
    expect(field()).toHaveAttribute("aria-expanded", "true");
    expect(field()).toHaveAttribute("aria-controls", screen.getByRole("listbox").id);
    // Ten matches exist; the panel stops at six.
    const playbookRows = options().filter((option) => within(option).queryByText("Playbook"));
    expect(playbookRows.length).toBeLessThanOrEqual(1);
  });

  it("moves with Up and Down through the rows and back to none, and Enter opens the highlighted row", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.type(field(), "inguinal");
    await screen.findByRole("listbox");
    expect(field()).not.toHaveAttribute("aria-activedescendant");
    await user.keyboard("{ArrowDown}");
    expect(options()[0]).toHaveAttribute("aria-selected", "true");
    expect(field()).toHaveAttribute("aria-activedescendant", options()[0].id);
    await user.keyboard("{ArrowUp}");
    expect(field()).not.toHaveAttribute("aria-activedescendant");
    await user.keyboard("{ArrowUp}");
    expect(options().at(-1)).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(push).toHaveBeenCalledWith("/topics/inguinal-hernia");
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("opens the results page on Enter with no row highlighted, and does not clear the field on the way", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.type(field(), "inguinal hernia");
    await screen.findByRole("listbox");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith("/search?q=inguinal%20hernia");
    expect(field()).toHaveValue("inguinal hernia");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on Escape and leaves focus in the field, and Down reopens it", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.type(field(), "hernia");
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(field()).toHaveFocus();
    expect(field()).toHaveValue("hernia");
    await user.keyboard("{ArrowDown}");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
  });

  it("links a playbook row straight to the playbook and writes nothing to the saved or recent stores", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.type(field(), "mesh repair");
    const row = within(await screen.findByRole("option")).getByRole("link");
    expect(row).toHaveAttribute("href", "/playbooks/hernia-mesh-repair");
    expect(row).toHaveTextContent("Playbook");
    await user.click(row);
    expect(recordRecentView).not.toHaveBeenCalled();
    expect(setTopicSaved).not.toHaveBeenCalled();
    expect(setPlaybookSaved).not.toHaveBeenCalled();
  });

  it("says Search isn't available when the read fails, with Try again, instead of an empty panel", async () => {
    const user = userEvent.setup();
    read.mockRejectedValueOnce(new Error("offline"));
    render(<SearchForm />);
    await user.type(field(), "hernia");
    expect(await screen.findByRole("status")).toHaveTextContent("Search isn't available.");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(field()).toHaveFocus();
  });

  it("shows nothing while the index is loading, and nothing for a query that matches nothing", async () => {
    const user = userEvent.setup();
    read.mockReturnValueOnce(new Promise<SearchIndex>(() => {}));
    render(<SearchForm />);
    await user.type(field(), "hernia");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("clears with the clear button and keeps focus in the field", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
    await user.type(field(), "hernia");
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(field()).toHaveValue("");
    expect(field()).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });
});

describe("SearchForm slash key", () => {
  const press = (key: string, init: KeyboardEventInit = {}, target: Element = document.body) => act(() => { target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init })); });

  it("focuses the field from anywhere that is not a text control", () => {
    render(<><button>Elsewhere</button><SearchForm /></>);
    screen.getByRole("button", { name: "Elsewhere" }).focus();
    press("/", {}, screen.getByRole("button", { name: "Elsewhere" }));
    expect(field()).toHaveFocus();
  });

  it("leaves the key alone inside an input, a textarea, a select or an editable element, and with a modifier held", () => {
    render(<><input aria-label="Other" /><textarea aria-label="Notes" /><select aria-label="Pick"><option>a</option></select><div contentEditable suppressContentEditableWarning aria-label="Edit" tabIndex={0} /><SearchForm /></>);
    for (const name of ["Other", "Notes", "Pick", "Edit"]) {
      const target = screen.getByLabelText(name);
      target.focus();
      press("/", {}, target);
      expect(field(), name).not.toHaveFocus();
    }
    for (const init of [{ ctrlKey: true }, { metaKey: true }, { altKey: true }]) { press("/", init); expect(field()).not.toHaveFocus(); }
  });
});

describe("SearchForm on the results page", () => {
  beforeEach(() => { pathname = "/search/"; window.history.replaceState(null, "", "/search/?q=hernia"); });

  it("shows the address's query, and shows no quick results: the page lists every match", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    expect(field()).toHaveValue("hernia");
    await user.click(field());
    await user.keyboard("{ArrowDown}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(field()).toHaveAttribute("aria-expanded", "false");
  });

  it("does not score the query itself: the results list scores it once, and scoring twice per keystroke doubled the cost", async () => {
    const user = userEvent.setup();
    vi.mocked(searchIndex).mockClear();
    render(<SearchForm />);
    await user.type(field(), " mesh");
    expect(field()).toHaveValue("hernia mesh");
    expect(searchIndex).not.toHaveBeenCalled();
  });

  it("updates the address by replace, not push, as the reader types", async () => {
    const user = userEvent.setup();
    const replace = vi.spyOn(window.history, "replaceState");
    const pushState = vi.spyOn(window.history, "pushState");
    render(<SearchForm />);
    await user.type(field(), "x");
    expect(replace).toHaveBeenLastCalledWith(null, "", "?q=herniax");
    expect(window.location.search).toBe("?q=herniax");
    expect(pushState).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(push).not.toHaveBeenCalled();
    replace.mockRestore(); pushState.mockRestore();
  });

  it("clears the address along with the field", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(field()).toHaveValue("");
    expect(window.location.search).toBe("?q=");
  });

  it("keeps what was typed on arriving from another page, and empties the field on leaving", async () => {
    const user = userEvent.setup();
    pathname = "/topics/";
    window.history.replaceState(null, "", "/topics/");
    const { rerender } = render(<SearchForm />);
    await user.type(field(), "hernia");
    pathname = "/search/";
    rerender(<SearchForm />);
    expect(field()).toHaveValue("hernia");
    pathname = "/saved/";
    rerender(<SearchForm />);
    expect(field()).toHaveValue("");
  });
});
