import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchExperience } from "@/components/search-experience";
import { loadLibrary, loadPlaybooks } from "@/lib/library-client";
import { getRecentTopics, getSavedTopics } from "@/lib/offline";
import type { Library } from "@/lib/library-client";
import type { Playbook, Topic } from "@/lib/types";

let searchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({ useSearchParams: () => searchParams }));
vi.mock("@/lib/library-client", () => ({ loadLibrary: vi.fn(), loadPlaybooks: vi.fn() }));
vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn(), getSavedTopics: vi.fn() }));

const readLibrary = vi.mocked(loadLibrary);
const readPlaybooks = vi.mocked(loadPlaybooks);
const readRecent = vi.mocked(getRecentTopics);
const readSaved = vi.mocked(getSavedTopics);

function topic(id: string, title: string, scoreNodeId: string): Topic {
  return {
    id,
    slug: id,
    title,
    aliases: [],
    scoreCategory: `${scoreNodeId} category`,
    scoreNodeId,
    tags: [],
    updatedAt: "2026-08-19T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", blocks: [], sourceIds: [], scoreNodeId, tags: [], warnings: [], createdAt: "2026-08-19T00:00:00.000Z" },
    versions: [],
  };
}

function playbook(id: string, title: string): Playbook {
  return { id, slug: id, title, aliases: [], procedureId: id.replace(/-/g, "_"), approach: "open", specialty: "Vascular", tags: [], blocks: [], sourceIds: [], warnings: [], reviewedAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" };
}

const femPop = playbook("femoropopliteal-bypass", "Femoropopliteal Bypass");
const choledocholithiasis = topic("choledocholithiasis", "Choledocholithiasis", "biliary");
const appendicitis = topic("appendicitis", "Appendicitis", "acute-care");

beforeEach(() => {
  searchParams = new URLSearchParams();
  readLibrary.mockResolvedValue({ topics: [], taxonomy: [] });
  readPlaybooks.mockResolvedValue({ playbooks: [] });
  readRecent.mockResolvedValue([]);
  readSaved.mockResolvedValue([]);
});

afterEach(() => { vi.clearAllMocks(); });

describe("SearchExperience", () => {
  it("replaces the removed /add flow with a Library section pointing at /topics and /saved", async () => {
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis, appendicitis], taxonomy: [] });
    render(<SearchExperience />);
    expect(await screen.findByText("2 topics")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Library" })).toBeInTheDocument();
    expect(screen.getByText("2 SCORE sections covered")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse the score curriculum/i })).toHaveAttribute("href", "/topics");
    expect(screen.getByRole("link", { name: /return to saved topics/i })).toHaveAttribute("href", "/saved");
    expect(screen.queryByRole("link", { name: /add the next topic packet/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Continue building" })).not.toBeInTheDocument();
  });

  it("renders a zero-topic library before loadLibrary resolves", () => {
    readLibrary.mockReturnValue(new Promise<Library>(() => {}));
    render(<SearchExperience />);
    expect(screen.getByText("0 topics")).toBeInTheDocument();
    expect(screen.getByText("0 SCORE sections covered")).toBeInTheDocument();
  });

  it("filters to matching topics for a query and reports the result count", async () => {
    searchParams = new URLSearchParams("q=choledocholithiasis");
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis, appendicitis], taxonomy: [] });
    render(<SearchExperience />);
    const heading = await screen.findByRole("heading", { level: 2, name: /result/i });
    expect(heading).toHaveTextContent("1 result for");
    expect(heading).toHaveTextContent("choledocholithiasis");
    // Scoped to the results section: the search field's own quick-results dropdown
    // (SearchForm, driven by the same loadLibrary() mock) also renders a matching
    // topic, so an unscoped query would see it twice.
    const resultsSection = heading.closest("section")!;
    expect(within(resultsSection).getByText("Choledocholithiasis")).toBeInTheDocument();
    expect(within(resultsSection).queryByText("Appendicitis")).not.toBeInTheDocument();
  });

  it("shows the no-matches empty state with a link back to the curriculum", async () => {
    searchParams = new URLSearchParams("q=zzznotintitle");
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis], taxonomy: [] });
    render(<SearchExperience />);
    // "No topic matches" would be a lie now that playbooks are searched too.
    expect(await screen.findByText("No matches yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse the curriculum/i })).toHaveAttribute("href", "/topics");
  });

  it("groups playbook hits separately from topic hits", async () => {
    searchParams = new URLSearchParams("q=femoropopliteal");
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis], taxonomy: [] });
    readPlaybooks.mockResolvedValue({ playbooks: [femPop] });
    render(<SearchExperience />);

    // Scoped to the results list: SearchForm renders quick results from the same mocks, so an
    // unscoped query sees every hit twice.
    const results = (await screen.findByText(/results for/)).closest("section")!;
    expect(within(results).getByRole("link", { name: /Femoropopliteal Bypass/ })).toHaveAttribute("href", "/playbooks/femoropopliteal-bypass");
    expect(within(results).getByRole("heading", { name: "Playbooks", level: 2 })).toBeInTheDocument();
    expect(within(results).queryByRole("heading", { name: "Topics", level: 2 })).not.toBeInTheDocument();
  });

  it("still shows playbook hits when the topic library fails to load", async () => {
    // Two independent assets. One failing must degrade that half only, not blank the page.
    searchParams = new URLSearchParams("q=femoropopliteal");
    readLibrary.mockRejectedValue(new Error("library unavailable"));
    readPlaybooks.mockResolvedValue({ playbooks: [femPop] });
    render(<SearchExperience />);

    const results = (await screen.findByText(/results for/)).closest("section")!;
    expect(within(results).getByRole("link", { name: /Femoropopliteal Bypass/ })).toBeInTheDocument();
    expect(screen.queryByText("No matches yet")).not.toBeInTheDocument();
  });

  it("does not announce no matches while one corpus is still loading", async () => {
    // The playbook load never settles. Announcing an empty result now would be wrong, and the
    // reader would act on it before the guide they searched for had a chance to arrive.
    searchParams = new URLSearchParams("q=zzznotintitle");
    readLibrary.mockResolvedValue({ topics: [choledocholithiasis], taxonomy: [] });
    readPlaybooks.mockReturnValue(new Promise(() => {}));
    render(<SearchExperience />);

    expect(await screen.findByText(/results for/)).toBeInTheDocument();
    expect(screen.queryByText("No matches yet")).not.toBeInTheDocument();
  });
});
