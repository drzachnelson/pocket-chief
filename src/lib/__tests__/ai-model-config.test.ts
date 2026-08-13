import { afterEach, describe, expect, it, vi } from "vitest";
import { draftCloze, draftTopic } from "@/lib/ai";

function stubFetch(payload: unknown) {
  const fetchMock = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>(async () => new Response(JSON.stringify({ output_text: JSON.stringify(payload) }), { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("configurable model slugs", () => {
  it("uses POCKET_CHIEF_CLOZE_MODEL for cloze drafting when it is set", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubEnv("POCKET_CHIEF_TOPIC_MODEL", "topic-model-x");
    vi.stubEnv("POCKET_CHIEF_CLOZE_MODEL", "cloze-model-y");
    const fetchMock = stubFetch({ clozeText: "{{c1::CBD}} stones cause pain.", additionalContext: "note" });
    await draftCloze("CBD stones cause pain.", "topic-1", ["block-1"], "context.png", []);
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.model).toBe("cloze-model-y");
  });

  it("falls back to POCKET_CHIEF_TOPIC_MODEL for cloze drafting when no cloze model is configured", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubEnv("POCKET_CHIEF_TOPIC_MODEL", "topic-model-x");
    const fetchMock = stubFetch({ clozeText: "{{c1::CBD}} stones cause pain.", additionalContext: "note" });
    await draftCloze("CBD stones cause pain.", "topic-1", ["block-1"], "context.png", []);
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.model).toBe("topic-model-x");
  });

  it("keeps topic drafting on POCKET_CHIEF_TOPIC_MODEL regardless of the cloze model", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubEnv("POCKET_CHIEF_TOPIC_MODEL", "topic-model-x");
    vi.stubEnv("POCKET_CHIEF_CLOZE_MODEL", "cloze-model-y");
    const fetchMock = stubFetch({ blocks: [{ id: "b1", type: "summary", text: "Fact.", claims: [{ id: "c1", text: "Fact.", citationIds: [], status: "needs_support" }] }], warnings: [] });
    await draftTopic({ topicId: "topic-1", rawNotes: "Fact.", imageIds: [], sourceIds: ["source-1"], scoreNodeId: "biliary", tags: [] });
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.model).toBe("topic-model-x");
  });
});
