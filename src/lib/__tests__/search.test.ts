import { describe, expect, it } from "vitest";
import { buildSearchIndex, hitHref, hitLine, searchIndex, searchTopics } from "@/lib/search";
import { libraryPlaybooks, libraryTopics } from "@/content";
import type { Topic, TopicBlock } from "@/lib/types";

// Synthetic topics, so each ordering rule is tested on its own instead of against whatever the
// library happens to contain this month. Titles are chosen so that alphabetical order is the
// WRONG answer for every ordering assertion below.
const prose = (text: string): TopicBlock => ({ id: "block", type: "prose", text, claims: [] });
const fixture = (id: string, title: string, { text = "", ...over }: Partial<Topic> & { text?: string } = {}): Topic => ({
  id, slug: id, title, aliases: [], scoreNodeId: "score", scoreCategory: "SCORE · Fixtures · Group", tags: [],
  approvedVersion: { id: `${id}-v1`, topicId: id, versionNumber: 1, status: "approved", blocks: [prose(text)], sourceIds: [], scoreNodeId: "score", tags: [], warnings: [], createdAt: "2026-01-01T00:00:00.000Z" },
  versions: [], updatedAt: "2026-01-01T00:00:00.000Z", ...over,
});
const order = (query: string, topics: Topic[]) => searchTopics(query, topics).map((topic) => topic.id);

describe("topic search", () => {
  it("matches aliases with typo tolerance", () => {
    expect(searchTopics("choledochoithiasis", libraryTopics)[0]?.slug).toBe("choledocholithiasis");
  });

  it("matches multi-word searches when one token is mistyped", () => {
    expect(searchTopics("comon bile duct stones", libraryTopics)[0]?.slug).toBe("choledocholithiasis");
  });

  // The probe has to be words no topic contains: the guard under test is the
  // `word.length >= 3` condition on prefix matching, so each token here begins
  // with a short body word ("a", "to") that would otherwise carry it. Remove the
  // guard and this query matches every topic in the library. The previous probe,
  // "acute wound", stopped isolating the guard once the trauma section landed --
  // fasciotomy contains both words outright, and matched them legitimately.
  it("does not let one- or two-letter words in body text carry a token match", () => {
    expect(searchTopics("asparagus toboggan", libraryTopics)).toEqual([]);
  });

  // Every vascular access topic carries the "vascular-access" tag, which normalizes to the same string as
  // the Vascular Access title; on a tie the alphabetical tiebreak put Arteriovenous Graft and Fistula first.
  it("ranks an exact title match above a tag or alias that spells the same words", () => {
    expect(searchTopics("Vascular Access", libraryTopics)[0]?.slug).toBe("vascular-access");
  });

  it("still ranks the right topic when a body word is a genuine prefix", () => {
    expect(searchTopics("phyllodes", libraryTopics)[0]?.slug).toBe("fibroadenoma-vs-phyllodes-tumor");
  });

  it("never includes draft-only topics", () => {
    const draftOnly = { ...libraryTopics[0], id: "draft", slug: "secret", title: "Secret Draft", approvedVersion: null };
    // Asserts the draft is absent rather than that nothing matched: seeded
    // content legitimately contains words this query prefixes ("secretase").
    expect(searchTopics("secret", [...libraryTopics, draftOnly]).map((topic) => topic.slug)).not.toContain("secret");
  });

  it("ranks titled Hernia topics, and playbooks, before Abdominal Wall Reconstruction", () => {
    const hits = searchIndex(buildSearchIndex(libraryTopics, libraryPlaybooks), "hernia");
    const position = (slug: string) => hits.findIndex((hit) => hit.item.slug === slug);
    const titled = hits.filter((hit) => /\bhernia/i.test(hit.item.title));
    expect(titled.length).toBeGreaterThan(8);
    expect(position("abdominal-wall-reconstruction")).toBeGreaterThan(-1);
    for (const hit of titled) expect(position(hit.item.slug), hit.item.title).toBeLessThan(position("abdominal-wall-reconstruction"));
    // Names carry the topic through a tag alone; body-only mentions come after every name match.
    const firstBodyOnly = hits.findIndex((hit) => hit.snippet);
    expect(firstBodyOnly).toBeGreaterThan(position("abdominal-wall-reconstruction"));
  });

  it("serves topics and playbooks from one ranked list", () => {
    const hits = searchIndex(buildSearchIndex(libraryTopics, libraryPlaybooks), "robotic hernia");
    expect(hits.slice(0, 2).map((hit) => hit.item.kind)).toEqual(["playbook", "playbook"]);
    expect(hits.some((hit) => hit.item.kind === "topic")).toBe(true);
  });
});

describe("matcher rules", () => {
  it("ranks a name match above a body-only match, whatever the alphabet says", () => {
    const topics = [fixture("a", "Aardvark", { text: "The quokka is described here." }), fixture("z", "Zebra", { tags: ["quokka"] })];
    expect(order("quokka", topics)).toEqual(["z", "a"]);
  });

  it("ranks title above alias above label, even when the weaker field matches exactly", () => {
    const topics = [fixture("t", "Tag Holder", { tags: ["quokka"] }), fixture("a", "Alias Holder", { aliases: ["quokka"] }), fixture("title", "Quokkas")];
    expect(order("quokka", topics)).toEqual(["title", "a", "t"]);
  });

  it("puts a name match on every word above any entry that needed its body", () => {
    const topics = [
      fixture("body", "Aardvark", { text: "alpha beta alpha beta alpha beta" }),
      fixture("mixed", "Badger", { tags: ["alpha"], text: "beta" }),
      fixture("names", "Zebra", { tags: ["alpha", "beta"] }),
    ];
    expect(order("alpha beta", topics)).toEqual(["names", "mixed", "body"]);
  });

  it("requires every query word to match somewhere", () => {
    const topics = [fixture("half", "Quokka", { text: "nothing else" }), fixture("both", "Zebra", { text: "a quokka and a wombat" })];
    expect(order("quokka wombat", topics)).toEqual(["both"]);
  });

  it("does not fall back to alphabetical on a tie", () => {
    const topics = [fixture("z", "Zulu Quokka"), fixture("a", "Alpha Quokka")];
    expect(order("quokka", topics)).toEqual(["z", "a"]);
  });

  it("ranks body-only matches by how often the word appears, not by title", () => {
    const topics = [fixture("once", "Aardvark", { text: "One wombat." }), fixture("often", "Zebra Crossing Review", { text: "wombat wombat wombat. The wombat again." })];
    expect(order("wombat", topics)).toEqual(["often", "once"]);
  });

  it("prefers the shorter title when matches are otherwise equal", () => {
    const topics = [fixture("long", "Quokka Repair With Mesh"), fixture("short", "Quokka Repair")];
    expect(order("quokka", topics)).toEqual(["short", "long"]);
  });

  it("finds a plural query in body text, but never tolerates a typo there", () => {
    const topics = [fixture("body", "Aardvark", { text: "Remove the stone with a basket." })];
    expect(order("stones", topics)).toEqual(["body"]);
    expect(order("stoen", topics)).toEqual([]);
  });

  it("tolerates a typo in a name", () => {
    expect(order("quokkas", [fixture("n", "Quokka")])).toEqual(["n"]);
    expect(order("qoukka", [fixture("n", "Quokka")])).toEqual(["n"]);
  });

  it("gives a body-only hit the words around the match, and a name hit none", () => {
    const topics = [fixture("body", "Aardvark", { text: "First look, then the wombat appears behind the long fence near the road." }), fixture("name", "Wombat")];
    const [named, bodyOnly] = searchIndex(buildSearchIndex(topics), "wombat");
    expect(named.snippet).toBeUndefined();
    const snippet = bodyOnly.snippet!;
    expect(snippet).toContain("wombat");
    expect(snippet.length).toBeLessThanOrEqual(80);
    expect(" first look then the wombat appears behind the long fence near the road ").toContain(` ${snippet} `); // whole words only, no cut-off fragment
  });

  it("returns every entry for an empty query", () => {
    expect(order("  ", [fixture("a", "A"), fixture("b", "B")])).toEqual(["a", "b"]);
  });
});

describe("search index", () => {
  it("survives the JSON round trip the export puts it through", () => {
    const built = buildSearchIndex(libraryTopics, libraryPlaybooks);
    const shipped = JSON.parse(JSON.stringify(built));
    for (const query of ["hernia", "comon bile duct stones", "robotic tapp", "asparagus toboggan", ""]) expect(searchIndex(shipped, query)).toEqual(searchIndex(built, query));
  });

  it("holds an entry per approved topic and playbook, and nothing beyond the row fields and normalised text", () => {
    const index = buildSearchIndex(libraryTopics, libraryPlaybooks);
    expect(index.entries).toHaveLength(libraryTopics.filter((topic) => topic.approvedVersion).length + libraryPlaybooks.length);
    for (const entry of index.entries) expect(Object.keys(entry).sort()).toEqual(["aliases", "body", "item", "labels", "title"]);
  });

  it("carries no text from a draft or an unapproved topic", () => {
    const draft = fixture("draft", "Quokka Draft Marker", { approvedVersion: null, aliases: ["quokka alias marker"], versions: [fixture("v", "x", { text: "quokka draft body marker" }).approvedVersion!] });
    const shipped = JSON.stringify(buildSearchIndex([draft, fixture("live", "Live Topic")]));
    expect(shipped).not.toMatch(/marker/i);
    expect(shipped).toContain("live topic");
  });
});


describe("result rows", () => {
  const hits = searchIndex(buildSearchIndex(libraryTopics, libraryPlaybooks), "robotic hernia");

  it("links a topic to its page and a playbook to its page", () => {
    const playbook = hits.find((hit) => hit.item.kind === "playbook")!;
    const topic = hits.find((hit) => hit.item.kind === "topic")!;
    expect(hitHref(playbook)).toBe(`/playbooks/${playbook.item.slug}`);
    expect(hitHref(topic)).toBe(`/topics/${topic.item.slug}`);
  });

  it("gives a name match its category and group (topic) or specialty and approach (playbook), and a body-only match its phrase", () => {
    const playbook = hits.find((hit) => hit.item.kind === "playbook")!;
    expect(playbook.item.kind === "playbook" && hitLine(playbook)).toMatch(/^.+ · (Open|Laparoscopic|Robotic|Endovascular)$/);
    const topics = [fixture("a", "Aardvark", { text: "The quokka is described here." }), fixture("z", "Zebra", { tags: ["quokka"] })];
    const [named, bodyOnly] = searchIndex(buildSearchIndex(topics), "quokka").sort((a, b) => Number(Boolean(a.snippet)) - Number(Boolean(b.snippet)));
    expect(hitLine(named)).toBe("Fixtures · Group");
    expect(hitLine(bodyOnly)).toBe("the quokka is described here");
  });
});
