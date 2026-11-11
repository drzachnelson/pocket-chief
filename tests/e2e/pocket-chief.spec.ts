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
  // The worker names its caches by version; v6 is the first to hold the category pages.
  expect(await page.evaluate(() => caches.keys())).toEqual(expect.arrayContaining(["pocket-chief-shell-v6"]));
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
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Contents", "Expand all"]);
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
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Contents", "Expand all"]);
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
  await expect(tools(page).getByRole("button")).toHaveText(["Back", "Expand all"]);
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
