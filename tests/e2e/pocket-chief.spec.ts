import { expect, test, type Locator, type Page } from "@playwright/test";

test("search, read, and save a topic", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Search Pocket Chief").fill("choledochoithiasis");
  await page.getByRole("button", { name: "Search" }).click();
  const result = page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("heading", { name: "Transcystic decision flow" })).toBeVisible();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved", exact: true })).toBeVisible();

  await page.goto("./saved/");
  await expect(page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ })).toBeVisible();
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
  await expect(header.getByRole("search").getByRole("textbox")).toBeVisible();
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
  for (const path of ["./", "./topics/", "./playbooks/", "./saved/", "./settings/", "./topics/choledocholithiasis/", "./playbooks/temporal-artery-biopsy/"]) {
    await page.goto(path);
    await expect(page.getByRole("main"), path).toHaveCount(1);
    // Home still draws its own large field next to the header one until the Home slice removes it.
    await expect(page.getByRole("search"), path).toHaveCount(path === "./" ? 2 : 1);
    for (const role of ["banner", "contentinfo", "complementary"] as const) await expect(page.getByRole(role), `${path} ${role}`).toHaveCount(0);
    await expect(page.getByText(/Educational reference only|No patient information/), path).toHaveCount(0);
  }
});

test("browses to a playbook and reads its steps", async ({ page }) => {
  await page.goto("./playbooks/");
  await expect(page.getByRole("heading", { name: "Playbooks", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /Temporal Artery Biopsy/ }).click();
  await expect(page.getByRole("heading", { name: "Temporal Artery Biopsy", level: 1 })).toBeVisible();
  await expect(page.getByText("Vascular · Open")).toBeVisible();
  // Sections ship collapsed, so the step titles are only reachable once the reader opens them.
  await page.getByRole("button", { name: "Expand all" }).click();
  await expect(page.getByText("Ligate and excise")).toBeVisible();
  // A playbook has no version list and nothing to bookmark yet.
  await expect(page.getByRole("tab", { name: /History/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Save" })).toHaveCount(0);
});

test("topics index searches the grouped curriculum and offers an alphabetical view", async ({ page }) => {
  await page.goto("./topics/");
  await expect(page.getByRole("heading", { name: "Topics" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Find a topic" })).toBeVisible();

  const search = page.getByRole("searchbox", { name: "Search topics" });
  // "choledocho" alone now also matches Choledochal Cyst and Choledochoenteric Anastomosis.
  await search.fill("choledocholith");
  await expect(page.getByRole("link", { name: "Choledocholithiasis", exact: true })).toBeVisible();
  await expect(page.getByText("1 topic", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "All topics" }).click();
  await expect(page.getByRole("heading", { name: "All topics" })).toBeVisible();
  await search.fill("");
  await expect(page.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveCount(1);
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

  const metrics = await flow.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);

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
  const rightBypass = await flow.locator('path[data-from="obtunded"][data-to="icp"]').getAttribute("d");
  const leftBypass = await flow.locator('path[data-from="clinicalpos"][data-to="fasciotomy"]').getAttribute("d");
  expect(rightBypass).not.toContain("H 5 ");
  expect(leftBypass).toContain("H 5 ");
  const flowBox = await flow.boundingBox();
  const bypassLabel = await flow.getByText("clinical diagnosis alone is enough", { exact: true }).boundingBox();
  expect(flowBox).not.toBeNull();
  expect(bypassLabel).not.toBeNull();
  expect(bypassLabel!.x).toBeGreaterThanOrEqual(flowBox!.x);
  await expect(flow.getByText("awake and examinable", { exact: true })).toBeVisible();
  await expect(flow.getByText("cannot be reliably examined", { exact: true })).toBeVisible();
});

test("topics resumes a visited guide", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await expect(page.getByRole("heading", { name: "Choledocholithiasis", exact: true })).toBeVisible();
  // Not waitForFunction: it treats an async predicate's Promise as truthy and returns at once, so
  // the goto below raced the guide's recent write and lost it to the navigation.
  await expect.poll(() => page.evaluate(async () => {
    if (!(await indexedDB.databases()).some((database) => database.name === "pocket-chief-private")) return false;
    return new Promise<boolean>((resolve, reject) => {
      const request = indexedDB.open("pocket-chief-private");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("recent")) { database.close(); resolve(false); return; }
        const recent = database.transaction("recent").objectStore("recent").get("00000000-0000-4000-8000-000000000101");
        recent.onerror = () => { database.close(); reject(recent.error); };
        recent.onsuccess = () => { database.close(); resolve(recent.result?.slug === "choledocholithiasis"); };
      };
    });
  })).toBe(true);
  await page.goto("./topics/");
  await expect(page.getByRole("link", { name: "Resume topic" })).toHaveAttribute("href", "/pocket-chief/topics/choledocholithiasis/");
  await expect(page.getByText("Reviewed", { exact: true })).toHaveCount(0);
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

test("Back is never dead: it goes to the index on a cold launch and back through history after an in-app visit", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/$/);

  await page.goto("./playbooks/temporal-artery-biopsy/");
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/playbooks\/#vascular$/);

  await page.goto("./topics/");
  await page.getByRole("link", { name: /Choledocholithiasis/ }).first().click();
  await expect(page).toHaveURL(/choledocholithiasis\/$/);
  await tools(page).getByRole("button", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/pocket-chief\/topics\/$/);
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
