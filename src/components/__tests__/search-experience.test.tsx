import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchExperience } from "@/components/search-experience";
import { loadLibrary } from "@/lib/library-client";
import { getRecentTopics, getSavedTopics, setTopicSaved } from "@/lib/offline";
import type { Library } from "@/lib/library-client";
import type { Topic } from "@/lib/types";

let searchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({ useSearchParams: () => searchParams }));
vi.mock("@/lib/library-client", () => ({ loadLibrary: vi.fn() }));
vi.mock("@/lib/offline", () => ({ getRecentTopics: vi.fn(), getSavedTopics: vi.fn(), setTopicSaved: vi.fn() }));

const readLibrary = vi.mocked(loadLibrary);
const readRecent = vi.mocked(getRecentTopics);
const readSaved = vi.mocked(getSavedTopics);
const writeSaved = vi.mocked(setTopicSaved);

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

const choledocholithiasis = topic("choledocholithiasis", "Choledocholithiasis", "biliary");
const appendicitis = topic("appendicitis", "Appendicitis", "acute-care");

beforeEach(() => {
  searchParams = new URLSearchParams();
  readLibrary.mockResolvedValue({ topics: [], taxonomy: [] });
  readRecent.mockResolvedValue([]);
  readSaved.mockResolvedValue([]);
  writeSaved.mockResolvedValue(undefined);
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
    expect(await screen.findByText("No topic matches yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse the curriculum/i })).toHaveAttribute("href", "/topics");
  });
});
