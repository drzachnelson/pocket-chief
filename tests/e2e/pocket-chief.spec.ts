import { expect, test, type Locator, type Page } from "@playwright/test";

test("search, read, and save a topic", async ({ page }) => {
  await page.goto("./");
  const field = page.getByRole("combobox", { name: "Search" });
  await field.fill("choledochoithiasis");
  await field.press("Enter");
  await expect(page).toHaveURL(/\/search\/\?q=choledochoithiasis$/);
  const result = page.getByRole("main").getByRole("link", { name: /^Choledocholithiasis/ }).first();
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();

  await page.goto("./saved/");
  await expect(page.locator(".list-rows").getByRole("link", { name: /Choledocholithiasis/ })).toBeVisible();
});

/** Writes records into the saved or recent store the way an earlier bundle, or a page that has since left the library, would have left them. */
async function seedStore(page: Page, store: "saved" | "recent", records: object[]) {
  await page.evaluate(([name, entries]) => new Promise<void>((resolve, reject) => {
    const open = indexedDB.open("pocket-chief-private");
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction(name as string, "readwrite");
      for (const record of entries as object[]) tx.objectStore(name as string).put(record);
      tx.oncomplete = () => { open.result.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    };
  }), [store, records] as const);
}

test("Saved: one mixed newest-first list rebuilt by id, with old snapshots, playbooks and a gone page", async ({ page, request }) => {
  const { topics } = await (await request.get("library.json")).json() as { topics: Array<{ id: string; slug: string; title: string }> };
  const { playbooks } = await (await request.get("playbooks.json")).json() as { playbooks: Array<{ id: string; slug: string; title: string; specialty: string }> };
  const [oldTopic] = topics;
  const [playbook] = playbooks;
  await page.goto("./saved/");
  await expect(page.getByText("Nothing saved yet.")).toBeVisible();
  await expect(page.getByText("Use Save on a topic or playbook.")).toBeVisible();
  // An old entry is a whole Topic snapshot with no kind; a stale title proves the row is rebuilt from the current library.
  await seedStore(page, "saved", [
    { ...oldTopic, title: "Stale snapshot title", savedAt: "2026-10-01T00:00:00.000Z" },
    { id: playbook.id, kind: "playbook", savedAt: "2026-10-03T00:00:00.000Z" },
    { id: "no-longer-in-the-library", kind: "topic", savedAt: "2026-10-02T00:00:00.000Z" },
  ]);
  await page.reload();

  await expect(page.getByRole("heading", { name: "Saved", level: 1 })).toBeVisible();
  const rows = page.locator("main .list-rows > li");
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText(playbook.title);
  await expect(rows.nth(0)).toContainText(playbook.specialty);
  await expect(rows.nth(0)).toContainText("Playbook");
  await expect(rows.nth(0).getByRole("link")).toHaveAttribute("href", new RegExp(`/playbooks/${playbook.slug}/?$`));
  await expect(rows.nth(1)).toHaveText("No longer available");
  await expect(rows.nth(1).getByRole("link")).toHaveCount(0);
  await expect(rows.nth(1).getByRole("button")).toHaveCount(1);
  await expect(rows.nth(2)).toContainText(oldTopic.title);
  await expect(rows.nth(2)).not.toContainText("Stale snapshot title");
  await expect(rows.nth(2).getByRole("link")).toHaveAttribute("href", new RegExp(`/topics/${oldTopic.slug}/?$`));

  // The toggle takes the page off Saved but leaves the row in place until the next visit; a second tap restores it.
  const toggle = rows.nth(2).getByRole("button", { name: `Save ${oldTopic.title}` });
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(rows).toHaveCount(3);
  await page.reload();
  await expect(rows).toHaveCount(2);
  await expect(page.getByText(oldTopic.title)).toHaveCount(0);
});

test("Saved: the bookmark toggle is a target tall and the row is the shared list row, at every width", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.goto("./topics/choledocholithiasis/");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();
  for (const [width, target] of [[375, 44], [768, 44], [1280, 36]] as const) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("./saved/");
    const toggle = page.getByRole("button", { name: "Save Choledocholithiasis" });
    await expect(toggle).toBeVisible();
    const box = (await toggle.boundingBox())!;
    expect(box.width).toBe(target);
    expect(box.height).toBe(target);
    const column = (await page.locator("main .list-rows").boundingBox())!;
    // The icon sits where the chevron does: its right edge on the column's right edge.
    const icon = (await toggle.locator("svg").boundingBox())!;
    expect(Math.abs(icon.x + icon.width - (column.x + column.width))).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

const PRIMARY = ["Home", "Topics", "Playbooks", "Saved"];

test("phone shows the header row and a 68px tab bar with four destinations", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("./topics/");
  const tabs = page.getByRole("navigation", { name: "Primary" });
  await expect(tabs.getByRole("link")).toHaveText(PRIMARY);
  await expect(tabs.getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "page");
  await expect(tabs.getByRole("link", { name: "Add" })).toHaveCount(0);
  expect((await tabs.boundingBox())!.height).toBeCloseTo(68, 0);

  const header = page.locator(".mobile-header");
  expect((await header.boundingBox())!.height).toBeCloseTo(60, 0);
  await expect(header.getByRole("link", { name: "Pocket Chief" })).toHaveAttribute("href", "/pocket-chief/");
  await expect(header.getByRole("search").getByRole("combobox", { name: "Search" })).toBeVisible();
  await expect(header.getByRole("link", { name: "Settings" })).toBeVisible();
  // The rail and its foot are for wider screens, so the phone has exactly one Settings link.
  await expect(page.getByRole("link", { name: "Settings" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Pocket Chief home" })).toHaveCount(0);
});

test("the skip link is the first stop and lands on the one main", async ({ page }) => {
  await page.goto("./topics/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("every page has one main and the shell's search, and no aside, banner or footer", async ({ page }) => {
  for (const path of ["./", "./topics/", "./playbooks/", "./saved/", "./settings/", "./search/?q=hernia", "./topics/choledocholithiasis/", "./playbooks/temporal-artery-biopsy/"]) {
    await page.goto(path);
    await expect(page.getByRole("main"), path).toHaveCount(1);
    await expect(page.getByRole("search"), path).toHaveCount(1);
    for (const role of ["banner", "contentinfo", "complementary"] as const) await expect(page.getByRole(role), `${path} ${role}`).toHaveCount(0);
    // The disclaimer line belongs to the end of a reader page and nowhere else.
    await expect(page.getByText(/Educational reference only|No patient information/), path).toHaveCount(/topics\/choledo|playbooks\/temporal/.test(path) ? 1 : 0);
  }
});

test("browses to a playbook and reads its steps", async ({ page }) => {
  await page.goto("./playbooks/");
  await expect(page.getByRole("heading", { name: "Playbooks", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /Temporal Artery Biopsy/ }).click();
  await expect(page.getByRole("heading", { name: "Temporal Artery Biopsy", level: 1 })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("listitem")).toHaveText(["Vascular", "Open"]);
  // Sections ship collapsed, so the step titles are only reachable once the reader opens them.
  await page.getByRole("button", { name: "Expand all" }).click();
  await expect(page.getByText("Ligate and excise")).toBeVisible();
  // A playbook has no version list, but it can be saved, like a topic.
  await expect(page.getByRole("tab", { name: /History/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();
});

test("Saved lists what the reader pages save: a playbook and a topic, newest first, each toggle pressed", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();
  await page.goto("./playbooks/temporal-artery-biopsy/");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();

  await page.goto("./saved/");
  const rows = page.locator("main .list-rows > li");
  await expect(rows).toHaveCount(2);
  // The playbook was saved last, so it leads; the row is rebuilt from the library, with its specialty and the trailing "Playbook".
  await expect(rows.nth(0)).toContainText("Temporal Artery Biopsy");
  await expect(rows.nth(0)).toContainText("Vascular");
  await expect(rows.nth(0)).toContainText("Playbook");
  await expect(rows.nth(0).getByRole("link")).toHaveAttribute("href", /\/playbooks\/temporal-artery-biopsy\/?$/);
  await expect(rows.nth(0).getByRole("button", { name: "Save Temporal Artery Biopsy" })).toHaveAttribute("aria-pressed", "true");
  await expect(rows.nth(1)).toContainText("Choledocholithiasis");
  await expect(rows.nth(1)).not.toContainText("Playbook");
  await expect(rows.nth(1).getByRole("button", { name: "Save Choledocholithiasis" })).toHaveAttribute("aria-pressed", "true");

  // Un-saving from the reader page takes the row off Saved on the next visit.
  await page.goto("./playbooks/temporal-artery-biopsy/");
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await expect(page.getByRole("button", { name: "Save", exact: true })).toBeVisible();
  await page.goto("./saved/");
  await expect(rows).toHaveCount(1);
  await expect(rows.nth(0)).toContainText("Choledocholithiasis");
});

test("the reader header is a breadcrumb with Save, the title and the tabs, 146px on a phone with a two-line title", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./topics/focused-assessment-with-sonography-for-trauma/");
  await expect(page.getByRole("button", { name: "Save", exact: true })).toBeEnabled();
  const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(crumbs.getByRole("link")).toHaveText(["Trauma", "Operations & Procedures"]);
  await expect(page.getByText(/^SCORE/)).toHaveCount(0);
  // Last updated is not in the header.
  await expect(page.locator(".page-header").getByText(/Last updated/)).toHaveCount(0);

  // One read, so nothing can move between the rectangles.
  const box = await page.evaluate(() => {
    const rect = (selector: string) => { const { x, y, width, height } = document.querySelector(selector)!.getBoundingClientRect(); return { x, y, width, height }; };
    return { header: rect(".page-header"), lead: rect(".page-header-lead"), crumbs: rect(".page-header-lead nav"), save: rect(".page-header-lead .button"), title: rect(".page-header h1"), tabs: rect(".tabs-list"), overflow: document.documentElement.scrollWidth - window.innerWidth };
  });
  // Breadcrumb left, Save right, on one 44px row; the title has two lines; the tabs are 44px plus their hairline.
  expect(box.lead.height).toBeCloseTo(44, 0);
  expect(box.save.x).toBeGreaterThan(box.crumbs.x + box.crumbs.width - 1);
  expect(box.save.y).toBeGreaterThanOrEqual(box.lead.y - 0.5);
  expect(box.save.y + box.save.height).toBeLessThanOrEqual(box.lead.y + box.lead.height + 0.5);
  expect(box.title.height).toBeCloseTo(2 * 24 * 1.2, 0);
  expect(box.tabs.height).toBeCloseTo(45, 0);
  expect(box.header.height).toBeGreaterThanOrEqual(145);
  expect(box.header.height).toBeLessThanOrEqual(147.5);
  expect(box.overflow).toBeLessThanOrEqual(0);

  // Both links land on the category page, the second on its group's heading.
  await expect(crumbs.getByRole("link", { name: "Trauma" })).toHaveAttribute("href", "/pocket-chief/topics/category/trauma/");
  await expect(crumbs.getByRole("link", { name: "Operations & Procedures" })).toHaveAttribute("href", "/pocket-chief/topics/category/trauma/#trauma-operations-procedures");
  await crumbs.getByRole("link", { name: "Operations & Procedures" }).click();
  await expect(page.locator("#trauma-operations-procedures")).toBeVisible();
});

test("a playbook's header names its specialty as a link to its heading on the index and its approach as text", async ({ page }) => {
  await page.goto("./playbooks/temporal-artery-biopsy/");
  const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(crumbs.getByRole("listitem")).toHaveText(["Vascular", "Open"]);
  await expect(crumbs.getByRole("link")).toHaveCount(1);
  await crumbs.getByRole("link", { name: "Vascular" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/playbooks\/#vascular$/);
  await expect(page.getByRole("heading", { name: "Vascular", level: 2 })).toBeInViewport();
});

test("a playbook opened is recorded as recently viewed and listed under Recently viewed on Home", async ({ page }) => {
  await page.goto("./playbooks/temporal-artery-biopsy/");
  await expect(page.getByRole("heading", { name: "Temporal Artery Biopsy", level: 1 })).toBeVisible();
  // The app creates its own database; opening it before then would create an empty one, so wait for it by name.
  const kinds = async () => page.evaluate(async () => {
    if (!(await indexedDB.databases()).some(({ name }) => name === "pocket-chief-private")) return [];
    const open = indexedDB.open("pocket-chief-private");
    const db = await new Promise<IDBDatabase>((resolve, reject) => { open.onsuccess = () => resolve(open.result); open.onerror = () => reject(open.error); });
    try {
      if (!db.objectStoreNames.contains("recent")) return [];
      const read = db.transaction("recent").objectStore("recent").getAll();
      return await new Promise<Array<{ kind: string }>>((resolve) => { read.onsuccess = () => resolve(read.result); });
    } finally { db.close(); }
  });
  await expect.poll(async () => (await kinds()).map(({ kind }) => kind)).toEqual(["playbook"]);
  // Home lists it under Recently viewed as a playbook row (specialty, trailing "Playbook"), and no row is a resume link.
  await page.goto("./");
  const recent = page.locator("section", { has: page.getByRole("heading", { name: "Recently viewed", level: 2 }) });
  await expect(recent.getByRole("listitem")).toHaveCount(1);
  await expect(recent.getByRole("listitem").first()).toContainText("Temporal Artery Biopsy");
  await expect(recent.getByRole("listitem").first()).toContainText("Vascular");
  await expect(recent.getByRole("listitem").first()).toContainText("Playbook");
  await expect(recent.getByRole("link", { name: /Temporal Artery Biopsy/ })).toHaveAttribute("href", /\/playbooks\/temporal-artery-biopsy\/?$/);
  await expect(page.getByRole("link", { name: /^Resume/ })).toHaveCount(0);
});

const homeSection = (page: Page, name: string) => page.locator("section", { has: page.getByRole("heading", { name, level: 2 }) });

test("Home: the field, then Recently added under date labels; a fresh device has no Recently viewed or Saved", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Pocket Chief", level: 1 })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Recently added", level: 2 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(["Recently added"]);
  // Eight rows in all, newest day first, each day under a plain date label; the labels are UTC days ("Nov 9"), the year only for an earlier one.
  const rows = homeSection(page, "Recently added").getByRole("listitem");
  await expect(rows).toHaveCount(8);
  const labels = await homeSection(page, "Recently added").locator(".date-label").allTextContents();
  expect(labels.length).toBeGreaterThan(0);
  for (const label of labels) expect(label).toMatch(/^[A-Z][a-z]{2} \d{1,2}(, \d{4})?$/);
  await expect(page.getByRole("link", { name: /Browse|Library|Favorites|Resume/ })).toHaveCount(0);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await expect(page.getByRole("combobox", { name: "Search" })).toHaveCount(1);
});

test("Home: Recently viewed shows five and Saved shows five with All saved only when there are more", async ({ page, request }) => {
  const { topics } = await (await request.get("library.json")).json() as { topics: Array<{ id: string; slug: string; title: string }> };
  const { playbooks } = await (await request.get("playbooks.json")).json() as { playbooks: Array<{ id: string; slug: string; title: string }> };
  await page.goto("./saved/");
  await expect(page.getByText("Nothing saved yet.")).toBeVisible();
  const day = (n: number) => `2026-10-${String(n).padStart(2, "0")}T00:00:00.000Z`;
  await seedStore(page, "recent", [
    ...topics.slice(0, 6).map((topic, n) => ({ id: topic.id, kind: "topic", viewedAt: day(10 + n) })),
    { id: "no-longer-in-the-library", kind: "topic", viewedAt: day(20) },
  ]);
  await seedStore(page, "saved", [
    ...topics.slice(0, 5).map((topic, n) => ({ id: topic.id, kind: "topic", savedAt: day(10 + n) })),
  ]);
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(["Recently viewed", "Saved", "Recently added"]);
  // The gone id drops silently; the five newest of the rest show, newest first.
  const recent = homeSection(page, "Recently viewed").getByRole("listitem");
  await expect(recent).toHaveCount(5);
  await expect(recent.first()).toContainText(topics[5].title);
  await expect(page.getByText("No longer available")).toHaveCount(0);
  // Five saved is not more than five: no link, and no bookmark toggle on a Home row.
  await expect(homeSection(page, "Saved").getByRole("listitem")).toHaveCount(5);
  await expect(page.getByRole("link", { name: "All saved" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Save / })).toHaveCount(0);

  await seedStore(page, "saved", [{ id: playbooks[0].id, kind: "playbook", savedAt: day(25) }]);
  await page.reload();
  await expect(homeSection(page, "Saved").getByRole("listitem")).toHaveCount(5);
  await expect(homeSection(page, "Saved").getByRole("listitem").first()).toContainText(playbooks[0].title);
  const all = homeSection(page, "Saved").getByRole("link", { name: "All saved" });
  await expect(all).toHaveAttribute("href", /\/saved\/?$/);
  expect((await all.boundingBox())!.height).toBeGreaterThanOrEqual(36);
  await all.click();
  await expect(page.getByRole("heading", { name: "Saved", level: 1 })).toBeVisible();
  await expect(page.locator("main .list-rows > li")).toHaveCount(6);
});

test("Home: the static HTML holds the shell's field and the hidden heading alone, with no section, row or placeholder", async ({ request }) => {
  test.skip(process.env.E2E_EXPORT !== "1", "`next dev` streams the route's loading fallback into the HTML: this reads the export that ships");
  const html = await (await request.get("./")).text();
  expect(html.match(/<h1[ >]/g)).toHaveLength(1);
  expect(html).not.toMatch(/<h2[ >]/);
  expect(html).toContain('type="search"');
  // The page's own markup is the heading and an empty column. (The route's loading rows also appear in the page's script payload, so the body is read, not the whole file.)
  const main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html)![1].replace(/<!--[\s\S]*?-->/g, "");
  expect(main).toBe('<div class="list-page"><h1 class="visually-hidden">Pocket Chief</h1></div>');
});

for (const tab of ["Notes", "Sources", "History"]) {
  test(`${tab}: Studied and Next topic come first, then Last updated, then the disclaimer, all below the panel`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./topics/choledocholithiasis/");
    await page.getByRole("tab", { name: tab }).click();
    const box = async (locator: Locator) => (await locator.boundingBox())!;
    const panel = await box(page.getByRole("tabpanel"));
    const studied = await box(page.getByRole("button", { name: "Studied" }));
    const next = await box(page.getByRole("link", { name: /^Next topic:/ }));
    const updated = await box(page.getByText(/^Last updated /));
    const disclaimer = await box(page.getByText("Educational reference only. Not patient-specific guidance."));
    expect(studied.y).toBeGreaterThanOrEqual(panel.y + panel.height - 1);
    expect(next.y).toBeGreaterThanOrEqual(panel.y + panel.height - 1);
    expect(updated.y).toBeGreaterThan(Math.max(studied.y + studied.height, next.y + next.height) - 1);
    expect(disclaimer.y).toBeGreaterThan(updated.y + updated.height - 1);
    // Studied is `small` 600 at the 44px target.
    expect(studied.height).toBeGreaterThanOrEqual(44);
    await expect(page.getByRole("button", { name: "Studied" })).toHaveCSS("font-size", "13px");
    await expect(page.getByRole("button", { name: "Studied" })).toHaveCSS("font-weight", "600");
    await expect(page.getByText("Study progress")).toHaveCount(0);
    await expect(page.getByText("Continue studying")).toHaveCount(0);
  });
}

test("phone: the last line of a long page clears the fixed toolbar", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./topics/choledocholithiasis/");
  // Browsers cap safe-area insets at zero in this emulation, so a notch is simulated through CDP where the build supports it.
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34 } }).catch(() => undefined);
  await page.getByRole("button", { name: "Expand all" }).click();
  await page.getByText("Educational reference only. Not patient-specific guidance.").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const disclaimer = (await page.getByText("Educational reference only. Not patient-specific guidance.").boundingBox())!;
  const toolbar = (await page.locator(".page-toolbar").boundingBox())!;
  expect(toolbar.height).toBeGreaterThanOrEqual(68);
  expect(disclaimer.y + disclaimer.height).toBeLessThanOrEqual(toolbar.y);
});

test("the last topic of a category ends with a link to that category's page, and a topic with a next topic offers the next one", async ({ page }) => {
  // Trauma's topics follow title order; the last one has no next topic.
  await page.goto("./topics/category/trauma/");
  const titles = await page.locator("main .list-row .list-row-text").allTextContents();
  await page.getByRole("link", { name: titles.at(-1)!, exact: true }).click();
  const end = page.getByRole("link", { name: "End of category: back to Trauma" });
  await expect(end).toHaveAttribute("href", "/pocket-chief/topics/category/trauma/");
  await expect(page.getByRole("link", { name: /^Next topic:/ })).toHaveCount(0);
  await end.click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/category\/trauma\/$/);
});

test("the Topics index lists every category in outline order, and a category page lists its groups over title-only rows", async ({ page }) => {
  await page.goto("./topics/");
  await expect(page.getByRole("heading", { name: "Topics", level: 1 })).toBeVisible();
  const names = await page.locator("main .list-row .list-row-text").allTextContents();
  expect(names[0]).toBe("General Abdomen");
  expect(names.at(-1)).toBe("Preoperative Evaluation and Perioperative Care");
  expect(new Set(names).size).toBe(names.length);
  // One browse model: no search box, view toggle or resume on the index.
  await expect(page.getByRole("searchbox", { name: "Search topics" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "All topics" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Resume topic" })).toHaveCount(0);

  await page.getByRole("link", { name: "Biliary", exact: true }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/category\/biliary\/$/);
  await expect(page.getByRole("heading", { name: "Biliary", level: 1 })).toBeVisible();
  const conditions = page.getByRole("heading", { name: "Diseases & Conditions", level: 2 });
  await expect(conditions).toBeVisible();
  await expect(page.getByRole("heading", { name: "Operations & Procedures", level: 2 })).toBeVisible();
  await expect(page.locator("section", { has: conditions }).getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("href", "/pocket-chief/topics/choledocholithiasis/");
  // Rows are title only: no quiet line, no trailing text.
  await expect(page.locator("main .list-row small, main .list-row .list-row-trailing")).toHaveCount(0);
  // Topics stays current on the index and on a page inside it.
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "true");
});

test("every list row is 44px with a title only, and a category page's groups and the specialty anchors clear the sticky top row", async ({ page }) => {
  await page.goto("./topics/");
  for (const row of await page.locator("main .list-row").all()) expect((await row.boundingBox())!.height).toBeCloseTo(44, 0);
  await page.goto("./topics/category/trauma/");
  for (const row of await page.locator("main .list-row").all()) expect((await row.boundingBox())!.height).toBeGreaterThanOrEqual(44);

  // A middle specialty: the last one sits too near the page end to scroll up under the top row, which is what the margin is for.
  await page.goto("./playbooks/");
  const middle = page.getByRole("heading", { level: 2 }).nth(2);
  const id = await middle.getAttribute("id");
  await page.goto(`./playbooks/#${id}`);
  const topRow = await page.locator(".mobile-header").boundingBox();
  // The jump may still be animating when the page loads, so wait for the heading to settle just under the sticky row.
  await expect(async () => {
    const heading = await page.locator(`h2[id="${id}"]`).boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(topRow!.y + topRow!.height);
    expect(heading!.y).toBeLessThan(topRow!.y + topRow!.height + 40);
  }).toPass();
});

test("the Playbooks index is an h1 over title-only rows under one heading per specialty", async ({ page }) => {
  await page.goto("./playbooks/");
  const headings = page.getByRole("heading", { level: 2 });
  const specialties = await headings.evaluateAll((nodes) => nodes.map((node) => node.firstElementChild!.textContent));
  expect(specialties).toEqual([...specialties].sort((a, b) => a!.localeCompare(b!)));
  expect(specialties.length).toBeGreaterThan(1);
  await expect(page.getByRole("button")).toHaveCount(0);
  // Approach is a search term and a header line, not a way to browse.
  await expect(page.locator("main").getByText(/^(Open|Laparoscopic|Robotic|Endovascular)$/)).toHaveCount(0);
});

test("tablet width shows a labelled rail and a top row with the search field", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Half-width desktop layout only");
  await page.setViewportSize({ width: 860, height: 900 });
  await page.goto("./topics/choledocholithiasis/");

  const rail = page.getByRole("navigation", { name: "Primary" });
  await expect(rail.getByRole("link")).toHaveText(PRIMARY);
  // Labels are visible under the icons, not hidden behind them.
  for (const label of PRIMARY) await expect(rail.getByText(label, { exact: true })).toBeVisible();
  await expect(rail.getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "true");
  const sidebar = page.locator(".sidebar");
  expect((await sidebar.boundingBox())!.width).toBe(76);
  await expect(sidebar.getByRole("link", { name: "Pocket Chief home" })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Settings" })).toBeVisible();
  await expect(sidebar.getByText("Settings", { exact: true })).toBeVisible();
  // One Settings link: the header gear and the phone tab bar belong to phones.
  await expect(page.getByRole("link", { name: "Settings" })).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Browse topics" })).toHaveCount(0);

  await expect(page.locator(".top-row").getByRole("search")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 600));
  expect((await page.locator(".mobile-header").boundingBox())!.y).toBe(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("laptop has one 286px sidebar and the page edge does not move between routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop layout only");
  await page.setViewportSize({ width: 1440, height: 900 });
  const edges = new Set<number>();
  for (const path of ["./", "./topics/", "./playbooks/", "./saved/", "./settings/", "./topics/choledocholithiasis/", "./playbooks/temporal-artery-biopsy/"]) {
    await page.goto(path);
    expect((await page.locator(".sidebar").boundingBox())!.width, path).toBe(286);
    edges.add((await page.locator(".page-column").boundingBox())!.x);
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link"), path).toHaveText(PRIMARY);
    await expect(page.getByRole("link", { name: "Settings" }), path).toHaveCount(1);
  }
  expect([...edges]).toEqual([286]);

  // The foot is pinned to the bottom of the sidebar, and the top row is a sticky 760px bar over the content column.
  await page.goto("./topics/choledocholithiasis/");
  const settings = (await page.locator(".side-foot").boundingBox())!;
  expect(settings.y + settings.height).toBeGreaterThan(900 - 24 - 1);
  const topRow = (await page.locator(".top-row").boundingBox())!;
  expect(topRow.width).toBe(760);
  const main = (await page.locator("#main-content").boundingBox())!;
  expect(topRow.x + topRow.width / 2).toBeCloseTo(main.x + main.width / 2, 0);
  await page.evaluate(() => window.scrollTo(0, 800));
  expect((await page.locator(".mobile-header").boundingBox())!.y).toBe(0);
  await expect(page.getByRole("link", { name: "Settings" })).toBeInViewport();
});

test("topic sections start collapsed, toggle together, and reviewed state persists", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  const sections = page.locator("details.section-block");
  await expect(sections.first()).not.toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Expand all" }).click();
  await expect(sections.first()).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Collapse all" }).click();
  await expect(sections.first()).not.toHaveAttribute("open", "");

  await page.getByRole("button", { name: "Studied" }).click();
  await expect(page.getByRole("button", { name: "Studied" })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.getByRole("button", { name: "Studied" })).toHaveAttribute("aria-pressed", "true");
  // Choledocholithiasis is not alone in Biliary; the next topic in its section follows it.
  await expect(page.getByRole("link", { name: "Next topic: Iatrogenic Bile Duct Injury — Biliary" })).toHaveAttribute("href", "/pocket-chief/topics/iatrogenic-bile-duct-injury/");
});

test("a guide followed by another topic in its category links straight to it", async ({ page }) => {
  await page.goto("./topics/escharotomy/");
  await expect(page.getByRole("link", { name: "Next topic: Fasciotomy — Trauma" })).toHaveAttribute("href", "/pocket-chief/topics/fasciotomy/");
});

test("decision flows keep labeled branches connected and readable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("./topics/fasciotomy/");
  await page.getByRole("button", { name: "Expand all" }).click();
  const flow = page.getByRole("group", { name: "The diagnostic decision flowchart" });
  await expect(flow).toBeVisible();

  // No scroller: a diagram is two columns at most, so it fits the phone.
  const metrics = await flow.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    overflowX: getComputedStyle(element).overflowX,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.pageOverflow).toBeLessThanOrEqual(1);
  expect(metrics.overflowX).toBe("visible");

  const awake = await flow.locator('[data-node-id="awake"]').boundingBox();
  const obtunded = await flow.locator('[data-node-id="obtunded"]').boundingBox();
  expect(awake).not.toBeNull();
  expect(obtunded).not.toBeNull();
  expect(Math.abs(awake!.y - obtunded!.y)).toBeLessThanOrEqual(2);
  expect(awake!.x).toBeLessThan(obtunded!.x);
  expect(awake!.width).toBeGreaterThanOrEqual(150);
  expect(obtunded!.width).toBeGreaterThanOrEqual(150);

  const edges = flow.locator("path.flow-edge");
  await expect(edges).toHaveCount(13);
  for (let index = 0; index < await edges.count(); index += 1) {
    await expect(edges.nth(index)).not.toHaveAttribute("d", "");
  }
  // A long edge still drops down an outer gutter, on whichever side its source sits.
  const rightBypass = await flow.locator('path[data-from="obtunded"][data-to="icp"]').getAttribute("d");
  const leftBypass = await flow.locator('path[data-from="clinicalpos"][data-to="fasciotomy"]').getAttribute("d");
  expect(rightBypass).not.toContain("H 5 ");
  expect(leftBypass).toContain("H 5 ");

  // A condition is the text just above the box it leads to, inside that box's column, and not on the connector.
  const fasciotomy = await flow.locator('[data-node-id="fasciotomy"]').boundingBox();
  const bypass = await flow.locator(".flow-conditions", { hasText: "clinical diagnosis alone is enough" }).boundingBox();
  expect(fasciotomy).not.toBeNull();
  expect(bypass).not.toBeNull();
  expect(bypass!.y + bypass!.height).toBeLessThanOrEqual(fasciotomy!.y + 1);
  expect(fasciotomy!.y - (bypass!.y + bypass!.height)).toBeLessThanOrEqual(8);
  expect(bypass!.x).toBeGreaterThanOrEqual(fasciotomy!.x - 1);
  expect(bypass!.x + bypass!.width).toBeLessThanOrEqual(fasciotomy!.x + fasciotomy!.width + 1);
  await expect(flow.getByText("awake and examinable", { exact: true })).toBeVisible();
  await expect(flow.getByText("cannot be reliably examined", { exact: true })).toBeVisible();
  await expect(flow.locator("[data-node-kind], .flow-node small")).toHaveCount(0);
  // The reset makes an svg a block; the tone glyph has to stay on its label's line.
  await expect(flow.locator(".flow-canvas svg.flow-glyph").first()).toHaveCSS("display", "inline-block");
});

test("assistive tech reads a diagram as its outline and the drawn diagram is skipped", async ({ page }) => {
  await page.goto("./topics/fasciotomy/");
  await page.getByRole("button", { name: "Expand all" }).click();
  const flow = page.getByRole("group", { name: "The diagnostic decision flowchart" });
  await expect(flow).toBeVisible();

  const tree = await flow.ariaSnapshot();
  // Each step is spoken once, from the outline, and the branch condition leads the step it reaches.
  // "Proceed to fasciotomy" follows a positive exam directly and the low delta P step, and the pressure-measurement
  // step before that is itself reached from two branches, so the step is written out three times.
  expect(tree.match(/Proceed to fasciotomy/g)).toHaveLength(3);
  expect(tree).toContain("clinical diagnosis alone is enough");
  expect(tree.match(/Awake, reliable, and can be serially examined/g)).toHaveLength(1);
  expect(tree).toContain("listitem");
  await expect(flow.locator(".flow-canvas")).toHaveAttribute("aria-hidden", "true");
});

test("a flow wider than two columns is only an outline, with the shared step written out under each branch", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./topics/carotid-artery-disease/");
  await page.getByRole("button", { name: "Expand all" }).click();
  const flow = page.getByRole("group", { name: "Who gets revascularized flowchart" });
  await expect(flow).toBeVisible();

  await expect(flow.locator(".flow-canvas, svg.flow-connectors, .flow-node")).toHaveCount(0);
  await expect(flow.locator("ul.flow-outline")).toBeVisible();
  await expect(flow.locator(".flow-step", { hasText: "Occluded or near-occluded" })).toHaveCount(2);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(await flow.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
});

test("flow connectors keep at least 3:1 contrast against the page in light and dark", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("./topics/fasciotomy/");
    await page.getByRole("button", { name: "Expand all" }).click();
    const edge = page.locator("path.flow-edge").first();
    await expect(edge).toBeVisible();
    const { stroke, width, background } = await edge.evaluate((element) => {
      const luminance = (color: string) => {
        const [r, g, b] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map((channel) => { const value = Number(channel) / 255; return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      let behind: Element | null = element.parentElement;
      while (behind && /rgba?\(.*, 0\)$|transparent/.test(getComputedStyle(behind).backgroundColor)) behind = behind.parentElement;
      const [a, b] = [luminance(getComputedStyle(element).stroke), luminance(getComputedStyle(behind ?? document.body).backgroundColor)].sort((x, y) => y - x);
      return { stroke: (a + 0.05) / (b + 0.05), width: getComputedStyle(element).strokeWidth, background: getComputedStyle(behind ?? document.body).backgroundColor };
    });
    expect(stroke, `${scheme} stroke on ${background}`).toBeGreaterThanOrEqual(3);
    expect(width).toBe("1.5px");
  }
});

test("a topic page keeps the shell: Topics current, Contents in the sidebar and the exact update date", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop sidebar only");
  await page.goto("./topics/choledocholithiasis/");
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "true");
  await expect(page.locator(".sidebar").getByRole("navigation", { name: "Contents" })).toBeVisible();
  await expect(page.getByText("Last updated Oct 23, 2026", { exact: true })).toBeVisible();
});

test("a previously visited Topics guide remains readable offline in the shell", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  // Reload under worker control so the dynamic guide and its shell are cached.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Choledocholithiasis", exact: true })).toBeVisible();

  await page.context().setOffline(true);
  try {
    await page.goto("./topics/choledocholithiasis/#block-comparison", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Choledocholithiasis", exact: true })).toBeVisible();
    // On a phone the page toolbar replaces the tab bar, so the check reads the navigation whether or not the width shows it.
    await expect(page.getByRole("navigation", { name: "Primary", includeHidden: true }).getByRole("link", { name: "Topics", includeHidden: true }).first()).toHaveAttribute("aria-current", "true");
  } finally {
    await page.context().setOffline(false);
  }
});


test("a category page is precached, so one never visited opens offline", async ({ page }) => {
  await page.goto("./");
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  // The worker names its caches by version; v8 follows the icon change; v7 added the search page and index to the precache.
  expect(await page.evaluate(() => caches.keys())).toEqual(expect.arrayContaining(["pocket-chief-shell-v8"]));
  const slugs: string[] = await page.evaluate(async () => (await fetch("categories.json")).json());
  expect(slugs.length).toBeGreaterThan(10);

  await page.context().setOffline(true);
  try {
    await page.goto("./topics/category/trauma/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Trauma", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Diseases & Conditions", level: 2 })).toBeVisible();
  } finally {
    await page.context().setOffline(false);
  }
});

// The reader chrome: the page toolbar and Contents (one component for topics and playbooks), inline in the laptop sidebar and a native dialog below 1080px.
const tools = (page: Page) => page.getByRole("group", { name: "Page tools" });
const sidebarContents = (page: Page) => page.locator(".sidebar").getByRole("navigation", { name: "Contents" });
const dialog = (page: Page) => page.getByRole("dialog", { name: "Contents" });
// The dialog slides in over 220ms; geometry is read once it has settled.
const settled = async (target: Locator) => { let previous = ""; await expect.poll(async () => { const now = JSON.stringify(await target.boundingBox()); const same = now === previous; previous = now; return same; }).toBe(true); return (await target.boundingBox())!; };
const currentSections = (nav: Locator) => nav.locator('a[aria-current="location"]');

test("phone: the page toolbar takes the tab bar's place on a reader page and only there", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./topics/choledocholithiasis/");
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Contents", "Find text", "Expand all"]);
  await expect(tools(page).getByRole("link")).toHaveText(["Topics"]);
  await expect(page.getByRole("navigation", { name: "Primary" }).first()).toBeHidden();
  const bar = (await tools(page).boundingBox())!;
  expect(bar.y + bar.height).toBe(812);
  expect(bar.height).toBe(68);
  // Four slots share the bar, and none is narrower than the 44px target.
  for (const slot of await tools(page).locator("> *").all()) expect((await slot.boundingBox())!.width).toBeGreaterThanOrEqual(44);

  await page.goto("./saved/");
  await expect(tools(page)).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Primary" }).last()).toBeVisible();
});

test("tablet: the toolbar sits at the right of the top row without the index link, and Contents opens beside the rail", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("./playbooks/temporal-artery-biopsy/");
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Contents", "Find text", "Expand all"]);
  await expect(tools(page).getByRole("link")).toBeHidden();
  const row = (await page.locator(".top-row").boundingBox())!;
  const group = (await tools(page).boundingBox())!;
  const field = (await page.getByRole("search").boundingBox())!;
  expect(group.y).toBeGreaterThanOrEqual(row.y);
  expect(group.x + group.width).toBeLessThanOrEqual(row.x + row.width + 1);
  expect(field.x + field.width).toBeLessThanOrEqual(group.x);
  expect(field.width).toBeGreaterThan(150);

  await tools(page).getByRole("button", { name: "Contents" }).click();
  const panel = await settled(dialog(page));
  expect(panel.x).toBe(76);
  expect(panel.height).toBe(1024);
});

test("laptop: Contents is inline in the sidebar, which no longer carries a Contents button, and sections follow the page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop sidebar only");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  const nav = sidebarContents(page);
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Find text", "Expand all"]);
  await expect(tools(page).getByRole("link")).toBeHidden();
  await expect(nav.getByRole("group", { name: "On this page" }).getByRole("link").first()).toBeVisible();
  await expect(nav.getByRole("group", { name: "Topics" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await nav.evaluate((element) => getComputedStyle(element.parentElement!).overflowY)).toBe("auto");

  // Tapping a section opens it and marks it current; Sources and History mark nothing.
  const comparison = nav.getByRole("link", { name: "Choose the route", exact: true });
  await comparison.click();
  await expect(page.locator("#block-comparison")).toHaveAttribute("open", "");
  await expect(currentSections(nav)).toHaveCount(1);
  await page.getByRole("tab", { name: /Sources/ }).click();
  await expect(currentSections(nav)).toHaveCount(0);
  await page.getByRole("tab", { name: /History/ }).click();
  await expect(currentSections(nav)).toHaveCount(0);
  await page.getByRole("tab", { name: "Notes" }).click();
  await expect(currentSections(nav)).toHaveCount(1);

  // A section link from another tab switches to Notes first, then scrolls.
  await page.getByRole("tab", { name: /Sources/ }).click();
  await nav.getByRole("link", { name: "Choose the route", exact: true }).click();
  await expect(page.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#block-comparison")).toBeInViewport();
  await expect(page.locator("#block-comparison")).toHaveAttribute("open", "");
});

test("laptop: the sidebar's Contents follows soft navigations between topics, an index and a playbook", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop sidebar only");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  const nav = sidebarContents(page);
  const firstSection = nav.getByRole("group", { name: "On this page" }).getByRole("link").first();
  const before = await firstSection.textContent();

  await nav.locator(".contents-branch a:not([aria-current])").first().click();
  await expect(page).not.toHaveURL(/choledocholithiasis/);
  await expect(firstSection).not.toHaveText(before!);
  await expect(nav.locator('.contents-branch a[aria-current="page"]')).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Choledocholithiasis");

  // An index page has no Contents, even though the route slot still remembers the last topic.
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Playbooks" }).click();
  await expect(page.getByRole("heading", { name: "Playbooks", level: 1 })).toBeVisible();
  await expect(page.locator(".sidebar").getByRole("navigation", { name: "Contents" })).toHaveCount(0);
  await page.getByRole("link", { name: /Temporal Artery Biopsy/ }).click();
  await expect(nav.getByRole("group", { name: "Playbooks" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Temporal Artery Biopsy", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(nav.getByRole("group", { name: "Topics" })).toHaveCount(0);
});

test("laptop: a category page carries no Contents, even soft-navigated from a topic that did", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop sidebar only");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  await expect(sidebarContents(page)).toBeVisible();

  // The route slot still remembers the topic here; only the shell's reader-path guard keeps its Contents off the category page.
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" }).click();
  await page.getByRole("link", { name: "Biliary", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Biliary", level: 1 })).toBeVisible();
  await expect(page.locator(".sidebar").getByRole("navigation", { name: "Contents" })).toHaveCount(0);
  await page.getByRole("link", { name: "Choledocholithiasis", exact: true }).click();
  await expect(sidebarContents(page)).toBeVisible();
  await page.getByRole("link", { name: "Playbooks" }).first().click();
  await expect(page.getByRole("heading", { name: "Playbooks", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /Temporal Artery Biopsy/ }).click();
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page.getByRole("heading", { name: "Playbooks", level: 1 })).toBeVisible();
});

test("a #block link followed while Sources shows switches to Notes first", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await page.getByRole("tab", { name: /Sources/ }).click();
  await expect(page.locator("#block-comparison")).toHaveCount(0);
  await page.evaluate(() => { window.location.hash = "#block-comparison"; });
  await expect(page.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#block-comparison")).toBeInViewport();
});

for (const [name, size, panelLeft] of [["phone sheet", { width: 375, height: 812 }, 0], ["tablet side panel", { width: 768, height: 1024 }, 76]] as const) {
  test(`${name}: Contents is a modal dialog that traps focus, locks the page, and returns focus when it closes`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
    await page.setViewportSize(size);
    await page.goto("./topics/choledocholithiasis/");
    const open = tools(page).getByRole("button", { name: "Contents" });
    await expect(open).toHaveAttribute("aria-haspopup", "dialog");
    await open.click();

    const sheet = dialog(page);
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("heading", { level: 2, name: "Contents" })).toBeVisible();
    expect(await sheet.evaluate((element) => element.matches(":modal"))).toBe(true);
    await expect(sheet.getByRole("button", { name: "Close contents" })).toBeFocused();
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
    const box = await settled(sheet);
    expect(box.x).toBe(panelLeft);
    if (panelLeft === 0) { expect(box.width).toBe(375); expect(box.y + box.height).toBe(812); } else expect(box.height).toBe(1024);

    // Background inert: a point over the scrim hits the dialog's backdrop, and Tab never leaves the dialog in either direction.
    expect(await page.evaluate(() => document.elementFromPoint(window.innerWidth - 4, 4)?.tagName)).toBe("DIALOG");
    for (const key of ["Tab", "Shift+Tab"]) {
      for (let press = 0; press < 14; press++) {
        await page.keyboard.press(key);
        expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog"))), `${key} ${press}`).toBe(true);
      }
    }

    // 44px rows in the dialog.
    for (const row of await sheet.locator(".contents-tree button, .contents-branch a, .contents-sections a").all()) expect((await row.boundingBox())!.height).toBeGreaterThanOrEqual(44);

    // A group button lays out like a category button: caret, label, silent count, left to right on one row.
    const group = sheet.locator(".contents-group > button").first();
    const [caret, label, count] = await Promise.all([group.locator("svg"), group.locator("span"), group.locator("small")].map(async (part) => (await part.boundingBox())!));
    expect(caret.x).toBeLessThan(label.x);
    expect(label.x).toBeLessThan(count.x);
    expect(Math.abs(label.y + label.height / 2 - (count.y + count.height / 2))).toBeLessThanOrEqual(2);

    await page.keyboard.press("Escape");
    await expect(sheet).toHaveCount(0);
    await expect(open).toBeFocused();
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
  });

  test(`${name}: the close button, the scrim and a tapped section each close Contents, and a tapped topic navigates`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
    await page.setViewportSize(size);
    await page.goto("./topics/choledocholithiasis/");
    const open = tools(page).getByRole("button", { name: "Contents" });

    await open.click();
    await dialog(page).getByRole("button", { name: "Close contents" }).click();
    await expect(dialog(page)).toHaveCount(0);
    await expect(open).toBeFocused();

    await open.click();
    await page.mouse.click(size.width - 4, 4);
    await expect(dialog(page)).toHaveCount(0);

    await open.click();
    await dialog(page).getByRole("link", { name: "Choose the route", exact: true }).click();
    await expect(dialog(page)).toHaveCount(0);
    await expect(page.locator("#block-comparison")).toBeInViewport();
    await expect(page.locator("#block-comparison")).toHaveAttribute("open", "");

    await open.click();
    const other = dialog(page).locator(".contents-branch a:not([aria-current])").first();
    const href = await other.getAttribute("href");
    await other.click();
    await expect(page).toHaveURL(new RegExp(`${href!.replace(/\/$/, "")}/?$`));
    await expect(dialog(page)).toHaveCount(0);
  });
}

test("phone: a downward swipe on the sheet's header closes Contents", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Touch emulation");
  await page.goto("./topics/choledocholithiasis/");
  await tools(page).getByRole("button", { name: "Contents" }).click();
  const header = (await dialog(page).locator("header").boundingBox())!;
  const x = header.x + 40;
  const cdp = await page.context().newCDPSession(page);
  const touch = (type: "touchStart" | "touchMove" | "touchEnd", y: number) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
  await touch("touchStart", header.y + 20);
  await touch("touchMove", header.y + 60);
  await touch("touchMove", header.y + 140);
  await touch("touchEnd", header.y + 140);
  await expect(dialog(page)).toHaveCount(0);
});

test("a playbook's Contents lists its sections and the playbooks by specialty, in the dialog and inline", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./playbooks/temporal-artery-biopsy/");
  const inline = sidebarContents(page);
  await expect(inline.getByRole("group", { name: "Playbooks" })).toBeVisible();
  await expect(inline.getByRole("button", { name: "Vascular" })).toHaveAttribute("aria-expanded", "true");
  await expect(inline.getByRole("link", { name: "Temporal Artery Biopsy", exact: true })).toHaveAttribute("aria-current", "page");

  await page.setViewportSize({ width: 375, height: 812 });
  await tools(page).getByRole("button", { name: "Contents" }).click();
  await expect(dialog(page).getByRole("group", { name: "On this page" }).getByRole("link").first()).toBeVisible();
  await expect(dialog(page).getByRole("button", { name: "Vascular" })).toHaveAttribute("aria-expanded", "true");
  // One category open at a time: opening another closes Vascular.
  const others = dialog(page).locator(".contents-category > button[aria-expanded=false]");
  await others.first().click();
  await expect(dialog(page).getByRole("button", { name: "Vascular" })).toHaveAttribute("aria-expanded", "false");
});

test("Back is never dead: a cold launch goes to the page's category or specialty, and an in-app visit goes back through history", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/category\/biliary\/$/);

  await page.goto("./playbooks/temporal-artery-biopsy/");
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/playbooks\/#vascular$/);

  await page.goto("./topics/");
  await page.getByRole("link", { name: "Trauma", exact: true }).click();
  await page.getByRole("link", { name: "Escharotomy", exact: true }).click();
  await expect(page).toHaveURL(/escharotomy\/$/);
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/category\/trauma\/$/);
});

// Find text. The toolbar is hidden while the bar is open, so its button is reached with includeHidden and the bar through its own group.
const findButton = (page: Page) => page.locator(".page-toolbar").getByRole("button", { name: "Find text", includeHidden: true });
const findBar = (page: Page) => page.getByRole("group", { name: "Find in page" });
const findField = (page: Page) => findBar(page).getByRole("searchbox", { name: "Find in page" });
const findStatus = (page: Page) => findBar(page).getByRole("status");
const highlightSize = (page: Page, name: "find-match" | "find-current") => page.evaluate((key) => CSS.highlights.get(key)?.size ?? 0, name);
/** The current match as painted: what it sits in, whether its section is open, and where it landed on screen. */
const currentMatch = (page: Page) => page.evaluate(() => {
  const range = [...CSS.highlights.get("find-current")!][0] as Range;
  const element = range.startContainer.parentElement!;
  const box = range.getBoundingClientRect();
  return { text: range.toString(), cell: Boolean(element.closest("td, th")), flow: Boolean(element.closest(".flow-node, .flow-edge-label")), open: element.closest("details")?.open ?? true, top: box.top, bottom: box.bottom };
});
const total = async (page: Page) => Number(/of (\d+)/.exec((await findStatus(page).textContent()) ?? "")?.[1]);

test("find text, phone: the bar takes the toolbar's row, paints every match, lands the current one in view and gives focus back", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./topics/choledocholithiasis/");
  await expect(findButton(page)).toHaveAttribute("aria-expanded", "false");
  await expect(findBar(page)).toBeHidden();
  await tools(page).getByRole("button", { name: "Find text" }).click();

  await expect(findButton(page)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".page-toolbar")).toBeHidden();
  const bar = (await findBar(page).boundingBox())!;
  expect(bar.y + bar.height).toBe(812);
  expect(bar.height).toBe(68);
  await expect(findField(page)).toBeFocused();
  expect((await findField(page).boundingBox())!.width).toBeGreaterThan(140);
  for (const name of ["Previous match", "Next match", "Close find"]) expect((await findBar(page).getByRole("button", { name }).boundingBox())!.width).toBeGreaterThanOrEqual(44);

  await page.keyboard.type("cholangitis");
  await expect(findStatus(page)).toHaveText(/^1 of \d+$/);
  const count = await total(page);
  expect(count).toBeGreaterThan(3);
  expect(await highlightSize(page, "find-match")).toBe(count);
  expect(await highlightSize(page, "find-current")).toBe(1);
  const match = await currentMatch(page);
  expect(match.open).toBe(true);
  // Between the 60px header and the 68px bar.
  expect(match.top).toBeGreaterThan(60);
  expect(match.bottom).toBeLessThan(812 - 68);

  await page.keyboard.press("Escape");
  await expect(findBar(page)).toBeHidden();
  await expect(findButton(page)).toBeFocused();
  await expect(findButton(page)).toHaveAttribute("aria-expanded", "false");
  expect(await highlightSize(page, "find-match")).toBe(0);
  await expect(tools(page).getByRole("button", { name: "Find text" })).toBeVisible();
});

test("find text, tablet at 760px: the bar replaces the toolbar in the top row, one row, with a field of at least 160px", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 760, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  const row = page.locator(".mobile-header");
  const rowBefore = (await row.boundingBox())!;
  const group = (await tools(page).boundingBox())!;
  const search = (await page.getByRole("search").boundingBox())!;
  await tools(page).getByRole("button", { name: "Find text" }).click();

  const bar = (await findBar(page).boundingBox())!;
  expect(bar.x).toBeGreaterThanOrEqual(group.x - 1);
  expect(bar.x + bar.width).toBeLessThanOrEqual(group.x + group.width + 1);
  expect((await findField(page).boundingBox())!.width).toBeGreaterThanOrEqual(160);
  // The row did not grow or wrap, nothing overflows sideways, and the search field did not move.
  expect(await row.boundingBox()).toEqual(rowBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  expect(await page.getByRole("search").boundingBox()).toEqual(search);
  await expect(findField(page)).toBeFocused();
});

test("find text, laptop: keyboard stepping reaches table cells and flow labels, opens their sections, and Escape returns focus", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  const group = (await tools(page).boundingBox())!;
  await tools(page).getByRole("button", { name: "Find text" }).click();
  const bar = (await findBar(page).boundingBox())!;
  // The bar ends where the toolbar did; it may start a little earlier, to keep a 160px field.
  expect(Math.abs(bar.x + bar.width - (group.x + group.width))).toBeLessThanOrEqual(1);
  expect(bar.height).toBe(36);
  expect((await findField(page).boundingBox())!.width).toBeGreaterThanOrEqual(160);

  await page.keyboard.type("ercp");
  await expect(findStatus(page)).toHaveText(/^1 of \d+$/);
  const count = await total(page);
  const seen = [await currentMatch(page)];
  for (let step = 1; step < count; step++) { await page.keyboard.press("Enter"); await expect(findStatus(page)).toHaveText(`${step + 1} of ${count}`); seen.push(await currentMatch(page)); }
  expect(seen.some((match) => match.cell)).toBe(true);
  expect(seen.some((match) => match.flow)).toBe(true);
  expect(seen.every((match) => match.open && match.text.toLowerCase() === "ercp")).toBe(true);
  await page.keyboard.press("Enter");
  await expect(findStatus(page)).toHaveText(`1 of ${count}`);
  await page.keyboard.press("Shift+Enter");
  await expect(findStatus(page)).toHaveText(`${count} of ${count}`);

  // Tab order inside the bar: field, Previous, Next, Close.
  await page.keyboard.press("Tab");
  await expect(findBar(page).getByRole("button", { name: "Previous match" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(findBar(page).getByRole("button", { name: "Next match" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(findStatus(page)).toHaveText(`1 of ${count}`);
  await page.keyboard.press("Tab");
  await expect(findBar(page).getByRole("button", { name: "Close find" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(findButton(page)).toBeFocused();
  await expect(tools(page).getByRole("button", { name: "Find text" })).toBeVisible();
});

test("find text searches the tab being read and follows a tab change", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  await tools(page).getByRole("button", { name: "Find text" }).click();
  // "Sabiston" is named once in the sources and nowhere in the notes.
  await page.keyboard.type("sabiston");
  await expect(findStatus(page)).toHaveText("No matches");
  await page.getByRole("tab", { name: /Sources/ }).click();
  await expect(findStatus(page)).toHaveText("1 of 1");
  expect(await highlightSize(page, "find-match")).toBe(1);
  await page.getByRole("tab", { name: /^Notes$/ }).click();
  await expect(findStatus(page)).toHaveText("No matches");
  expect(await highlightSize(page, "find-match")).toBe(0);
});

test("find text without the Highlight API counts and scrolls while typing, and selects the current match only from the buttons", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
  await page.addInitScript(() => Object.defineProperty(CSS, "highlights", { value: undefined, configurable: true }));
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("./topics/choledocholithiasis/");
  await tools(page).getByRole("button", { name: "Find text" }).click();
  // Typing must keep working after the first match: a selection outside the field would swallow the next keystroke.
  await page.keyboard.type("bile", { delay: 120 });
  await expect(findField(page)).toHaveValue("bile");
  await expect(findStatus(page)).toHaveText(/^1 of \d+$/);
  await page.keyboard.type("x", { delay: 120 });
  await expect(findStatus(page)).toHaveText("No matches");
  await page.keyboard.press("Backspace");
  await expect(findStatus(page)).toHaveText(/^1 of \d+$/);
  // The caret is in the field, so nothing on the page is selected.
  expect(await page.evaluate(() => getSelection()!.toString())).toBe("");

  await findBar(page).getByRole("button", { name: "Next match" }).click();
  await expect(findStatus(page)).toHaveText(/^2 of \d+$/);
  expect(await page.evaluate(() => getSelection()!.toString().toLowerCase())).toBe("bile");
  await page.keyboard.press("Escape");
  await expect(findButton(page)).toBeFocused();
  expect(await page.evaluate(() => getSelection()!.rangeCount)).toBe(0);
});

// Search: the one shared field, quick results as a combobox, the results page, and the offline path.
const searchField = (page: Page) => page.getByRole("combobox", { name: "Search" });
const quickRows = (page: Page) => page.getByRole("listbox", { name: "Quick results" }).getByRole("option");
const resultCount = async (page: Page) => Number((await page.getByRole("main").getByRole("status").textContent())!.split(" ")[0]);

test("quick results: six rows, Up and Down move, Escape closes and keeps focus, Enter opens the highlighted row", async ({ page }) => {
  await page.goto("./");
  await searchField(page).fill("hernia");
  await expect(quickRows(page)).toHaveCount(6);
  await expect(searchField(page)).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("ArrowDown");
  await expect(quickRows(page).first()).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Escape");
  await expect(quickRows(page)).toHaveCount(0);
  await expect(searchField(page)).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  const second = quickRows(page).nth(1);
  await expect(second).toHaveAttribute("aria-selected", "true");
  await expect(searchField(page)).toHaveAttribute("aria-activedescendant", (await second.getAttribute("id"))!);
  const href = (await second.locator("a").getAttribute("href"))!;
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Leaving the page empties the field.
  await expect(searchField(page)).toHaveValue("");
});

test("Enter with no row highlighted opens the results page, and a slash from anywhere focuses the field", async ({ page }) => {
  await page.goto("./topics/");
  await page.locator("body").press("/");
  await expect(searchField(page)).toBeFocused();
  await page.keyboard.type("inguinal hernia");
  await expect(quickRows(page).first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/search\/\?q=inguinal%20hernia$/);
  await expect(searchField(page)).toHaveValue("inguinal hernia");
  await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results?$/);
  // The slash is only a shortcut: inside the field it types a slash.
  await searchField(page).press("/");
  await expect(searchField(page)).toHaveValue("inguinal hernia/");
});

test("results page: every match under a count, the address replaced as you type, and No matches with links to the indexes", async ({ page }) => {
  await page.goto("./search/?q=hernia");
  await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results$/);
  const count = await resultCount(page);
  // Past the six quick rows: this page lists every match.
  expect(count).toBeGreaterThan(10);
  await expect(page.getByRole("main").getByRole("listitem")).toHaveCount(count);
  // The count is the only live region on the page body.
  await expect(page.getByRole("main").locator("[role=status], [role=alert], [aria-live]")).toHaveCount(1);
  await expect(searchField(page)).toHaveValue("hernia");
  // Playbook rows say so; topic rows do not.
  await expect(page.getByRole("main").getByText("Playbook", { exact: true }).first()).toBeVisible();

  const history = await page.evaluate(() => window.history.length);
  await searchField(page).fill("hernia inguinal");
  await expect(page).toHaveURL(/\/search\/\?q=hernia%20inguinal$/);
  await expect.poll(() => resultCount(page)).toBeLessThan(count);
  expect(await page.evaluate(() => window.history.length), "typing replaces the address and adds no history entry").toBe(history);
  await expect(page.getByRole("listbox")).toHaveCount(0);

  await searchField(page).fill("zzzxqj");
  await expect(page.getByRole("main").getByRole("status")).toHaveText("No matches");
  await expect(page.getByRole("main").getByRole("link", { name: "Browse topics" })).toHaveAttribute("href", "/pocket-chief/topics/");
  await expect(page.getByRole("main").getByRole("link", { name: "Browse playbooks" })).toHaveAttribute("href", "/pocket-chief/playbooks/");
});

test("results page says Search isn't available when the index cannot be read, and Try again recovers", async ({ page }) => {
  let blocked = true;
  await page.route("**/search-index.json", (route) => blocked ? route.abort() : route.continue());
  await page.goto("./search/?q=hernia");
  await expect(page.getByRole("main").getByRole("status")).toHaveText(/Search isn't available\./);
  await expect(page.getByText("No matches")).toHaveCount(0);
  blocked = false;
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results$/);
});

const workerReady = async (page: Page) => {
  await page.goto("./");
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  await page.reload();
};

test("a search submitted offline lands on the results page, not Home, with /search/ and its index in the precache", async ({ page }) => {
  await workerReady(page);
  const cached = await page.evaluate(async () => (await (await caches.open("pocket-chief-shell-v8")).keys()).map((request) => new URL(request.url).pathname));
  expect(cached).toEqual(expect.arrayContaining(["/pocket-chief/search/", "/pocket-chief/search-index.json"]));

  await page.context().setOffline(true);
  try {
    await searchField(page).fill("inguinal hernia");
    await searchField(page).press("Enter");
    // The router cannot fetch the page's payload offline, so it falls back to a browser navigation to the results address. The worker must answer that with /search/, never with Home.
    await expect(page).toHaveURL(/\/search\/\?q=inguinal%20hernia$/);
    await expect(page.getByRole("heading", { name: "Search results", level: 1 })).toBeVisible();
  } finally {
    await page.context().setOffline(false);
  }
});

test("offline, the results page lists its matches from the precached index, on a reload and on a query never searched", async ({ page }) => {
  test.skip(process.env.E2E_EXPORT !== "1", "`next dev` names its script chunks afresh on every compile, so only the export's precache can serve them offline: run `next build`, then `E2E_EXPORT=1` with this spec");
  await workerReady(page);
  await page.context().setOffline(true);
  try {
    await searchField(page).fill("inguinal hernia");
    await searchField(page).press("Enter");
    await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results?$/);
    await expect(page.getByRole("main").getByRole("link", { name: /Inguinal/ }).first()).toBeVisible();
    await expect(searchField(page)).toHaveValue("inguinal hernia");
    // A reload asks for the document with its query, which the precache answers with /search/.
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results?$/);
    await page.goto("./search/?q=achalasia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("main").getByRole("status")).toHaveText(/^\d+ results?$/);
  } finally {
    await page.context().setOffline(false);
  }
});

for (const scheme of ["light", "dark"] as const) {
  test(`quick results, phone at 375px in ${scheme}: full width under the header row, six rows at list-row height, the float shadow and a hairline`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
    await page.emulateMedia({ colorScheme: scheme });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./");
    await searchField(page).fill("hernia");
    await expect(quickRows(page)).toHaveCount(6);
    const panel = page.locator(".quick-results");
    const box = (await panel.boundingBox())!;
    const header = (await page.locator(".mobile-header").boundingBox())!;
    expect(box.x).toBe(0);
    expect(box.width).toBe(375);
    expect(Math.abs(box.y - (header.y + header.height))).toBeLessThanOrEqual(1);
    for (const height of await quickRows(page).evaluateAll((rows) => rows.map((row) => row.getBoundingClientRect().height))) expect(height).toBeGreaterThanOrEqual(44);
    const style = await panel.evaluate((element) => { const css = getComputedStyle(element); return { shadow: css.boxShadow, edge: css.borderBottomWidth + " " + css.borderBottomStyle, edgeColor: css.borderBottomColor, surface: css.backgroundColor }; });
    expect(style.shadow).toBe(scheme === "light" ? "rgba(16, 24, 40, 0.12) 0px 8px 24px 0px, rgba(16, 24, 40, 0.08) 0px 2px 6px 0px" : "rgba(0, 0, 0, 0.5) 0px 8px 24px 0px");
    expect(style.edge).toBe("1px solid");
    expect(style.edgeColor).toBe(scheme === "light" ? "rgb(223, 228, 236)" : "rgb(38, 50, 74)");
    expect(style.surface).toBe(scheme === "light" ? "rgb(255, 255, 255)" : "rgb(17, 24, 42)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    // The field is the 44px row's field, and the panel did not move it.
    expect((await searchField(page).boundingBox())!.height).toBeCloseTo(44, 0);
  });

  test(`quick results, tablet at 768px and laptop at 1280px in ${scheme}: the panel is the field's width, under it, and covers no toolbar`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Sized explicitly");
    await page.emulateMedia({ colorScheme: scheme });
    for (const width of [768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./topics/choledocholithiasis/");
      // The toolbar mounts after hydration and narrows the field; measure once it is in.
      await expect(tools(page).getByRole("button", { name: "Find text" })).toBeVisible();
      const form = (await page.getByRole("search").boundingBox())!;
      await searchField(page).fill("hernia");
      await expect(quickRows(page)).toHaveCount(6);
      const panel = (await page.locator(".quick-results").boundingBox())!;
      expect(Math.abs(panel.x - form.x), `${width}px left edge`).toBeLessThanOrEqual(1);
      expect(Math.abs(panel.width - form.width), `${width}px width`).toBeLessThanOrEqual(1);
      expect(panel.y, `${width}px under the field`).toBeGreaterThanOrEqual(form.y + form.height);
      expect(await page.getByRole("search").boundingBox(), `${width}px the field did not move`).toEqual(form);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await page.keyboard.press("Escape");
      await expect(quickRows(page)).toHaveCount(0);
    }
  });
}
