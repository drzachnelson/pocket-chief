import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getSavedTopics, setTopicSaved } from "@/lib/offline";
import { FavoriteTopics } from "@/components/favorite-topics";
import type { Topic } from "@/lib/types";

vi.mock("@/lib/offline", () => ({ getSavedTopics: vi.fn(), setTopicSaved: vi.fn() }));

const readSaved = vi.mocked(getSavedTopics);
const writeSaved = vi.mocked(setTopicSaved);

function topic(id: string, title: string): Topic {
  return {
    id,
    title,
    slug: id,
    aliases: [],
    scoreCategory: "Biliary Tract",
    scoreNodeId: "biliary",
    tags: ["biliary"],
    updatedAt: "2026-08-12T00:00:00.000Z",
    approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", reviewedBy: "test@example.com", reviewedAt: "2026-08-12T00:00:00.000Z", sourceIds: ["src-1"], scoreNodeId: "biliary", tags: ["biliary"], warnings: [], blocks: [], createdAt: "2026-08-12T00:00:00.000Z" },
    versions: [],
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  return { promise: new Promise<T>((settle) => { resolve = settle; }), resolve };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const serverTopic = topic("topic-1", "Choledocholithiasis");
const staleTopic = topic("topic-2", "Acute Liver Failure");

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  readSaved.mockResolvedValue([]);
  writeSaved.mockResolvedValue(undefined);
});

afterEach(() => {
  Reflect.deleteProperty(window.navigator, "onLine");
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("FavoriteTopics", () => {
  it("renders the server-provided favorites without a network round-trip", async () => {
    render(<FavoriteTopics fallback={[serverTopic]} />);
    await waitFor(() => expect(writeSaved).toHaveBeenCalledWith(serverTopic, true));
    expect(screen.getByText("Choledocholithiasis")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps the server favorites when a stale local cache resolves later", async () => {
    const local = deferred<Topic[]>();
    readSaved.mockReturnValue(local.promise);
    render(<FavoriteTopics fallback={[serverTopic]} />);
    local.resolve([staleTopic]);
    await waitFor(() => expect(writeSaved).toHaveBeenCalledWith(serverTopic, true));
    expect(screen.getByText("Choledocholithiasis")).toBeInTheDocument();
    expect(screen.queryByText("Acute Liver Failure")).not.toBeInTheDocument();
  });

  it("retires local topics that are no longer bookmarked on the server", async () => {
    readSaved.mockResolvedValue([serverTopic, staleTopic]);
    render(<FavoriteTopics fallback={[serverTopic]} />);
    await waitFor(() => expect(writeSaved).toHaveBeenCalledWith(staleTopic, false));
    expect(writeSaved).toHaveBeenCalledWith(serverTopic, true);
  });

  it("falls back to the locally cached favorites when the device is offline", async () => {
    Object.defineProperty(window.navigator, "onLine", { value: false, configurable: true });
    readSaved.mockResolvedValue([staleTopic]);
    render(<FavoriteTopics fallback={[]} />);
    expect(await screen.findByText("Acute Liver Failure")).toBeInTheDocument();
    expect(writeSaved).not.toHaveBeenCalled();
  });

  it("ignores a local read that resolves after unmount", async () => {
    const local = deferred<Topic[]>();
    readSaved.mockReturnValue(local.promise);
    const { unmount } = render(<FavoriteTopics fallback={[serverTopic]} />);
    unmount();
    local.resolve([staleTopic]);
    await flush();
    expect(writeSaved).not.toHaveBeenCalled();
  });

  it("renders the empty state when no favorites exist", async () => {
    render(<FavoriteTopics fallback={[]} />);
    await waitFor(() => expect(readSaved).toHaveBeenCalled());
    expect(screen.getByText(/No favorites saved yet/i)).toBeInTheDocument();
  });
});
