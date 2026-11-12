import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchResults } from "@/components/search-results";
import { loadSearchIndex } from "@/lib/library-client";
import type { SearchIndex } from "@/lib/search";
import { library } from "./search-fixtures";

let params = new URLSearchParams();
vi.mock("next/navigation", () => ({ useSearchParams: () => params }));
vi.mock("@/lib/library-client", async (original) => ({ ...(await original<typeof import("@/lib/library-client")>()), loadSearchIndex: vi.fn() }));

const read = vi.mocked(loadSearchIndex);
const rows = () => screen.getAllByRole("listitem");

beforeEach(() => {
  params = new URLSearchParams("q=hernia");
  read.mockReset().mockResolvedValue(library());
});

describe("SearchResults", () => {
  it("lists every match under a count, with quiet lines and a trailing Playbook on playbook rows only", async () => {
    render(<SearchResults />);
    expect(await screen.findByRole("status")).toHaveTextContent("10 results");
    // Eight titled hernias, the playbook (a name match on its title) and the topic that only mentions the word: past the six quick rows.
    expect(rows()).toHaveLength(10);
    const inguinal = screen.getByRole("link", { name: /^Inguinal Hernia/ });
    expect(inguinal).toHaveAttribute("href", "/topics/inguinal-hernia");
    expect(inguinal).toHaveTextContent("Abdominal Wall · Diseases & Conditions");
    expect(inguinal).not.toHaveTextContent("Playbook");
    const mesh = screen.getByRole("link", { name: /^Hernia Mesh Repair/ });
    expect(mesh).toHaveAttribute("href", "/playbooks/hernia-mesh-repair");
    expect(mesh).toHaveTextContent("Vascular · Open");
    expect(mesh).toHaveTextContent("Playbook");
    // A body-only match shows the phrase around the word, not its category.
    expect(screen.getByRole("link", { name: /^Appendicitis/ })).toHaveTextContent("a hernia can mimic right lower quadrant");
    expect(screen.getAllByText("Playbook")).toHaveLength(1);
  });

  it("makes the count the only live region", async () => {
    render(<SearchResults />);
    await screen.findByText("10 results");
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(document.querySelector("[aria-live]")).toBeNull();
  });

  it("says nothing while loading: three static rows, no count and no zero", () => {
    read.mockReturnValue(new Promise<SearchIndex>(() => {}));
    const { container } = render(<SearchResults />);
    expect(container.querySelectorAll(".loading-rows li")).toHaveLength(3);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/\d|no matches/i);
  });

  it("reports a failed read instead of no matches, and Try again reads again in place", async () => {
    const user = userEvent.setup();
    read.mockRejectedValueOnce(new Error("offline"));
    render(<SearchResults />);
    expect(await screen.findByRole("status")).toHaveTextContent("Search isn't available.");
    expect(screen.queryByText(/no matches/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("10 results")).toBeInTheDocument();
    expect(screen.queryByText("Search isn't available.")).not.toBeInTheDocument();
  });

  it("keeps the message and disables Try again while the new attempt is running", async () => {
    const user = userEvent.setup();
    read.mockRejectedValueOnce(new Error("offline")).mockReturnValueOnce(new Promise<SearchIndex>(() => {}));
    render(<SearchResults />);
    await user.click(await screen.findByRole("button", { name: "Try again" }));
    expect(screen.getByText("Search isn't available.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeDisabled();
  });

  it("shows No matches with links to the indexes, only once the index has loaded", async () => {
    params = new URLSearchParams("q=zzzxqj");
    render(<SearchResults />);
    expect(screen.queryByText("No matches")).not.toBeInTheDocument();
    expect(await screen.findByRole("status")).toHaveTextContent("No matches");
    expect(screen.getByRole("link", { name: "Browse topics" })).toHaveAttribute("href", "/topics");
    expect(screen.getByRole("link", { name: "Browse playbooks" })).toHaveAttribute("href", "/playbooks");
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(2);
  });

  it("counts one result in the singular", async () => {
    params = new URLSearchParams("q=obturator");
    render(<SearchResults />);
    expect(await screen.findByRole("status")).toHaveTextContent("1 result");
  });

  it("renders nothing for an empty query, yet reads the index so the first keystroke finds it ready", async () => {
    params = new URLSearchParams();
    const { container } = render(<SearchResults />);
    expect(container).toBeEmptyDOMElement();
    expect(read).toHaveBeenCalledTimes(1);
  });
});
