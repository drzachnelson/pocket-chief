import { expect, test } from "@playwright/test";

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
  await page.getByRole("button", { name: "Open all" }).click();
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
  await page.getByRole("button", { name: "Open all" }).click();
  await expect(sections.first()).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Close all" }).click();
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
  await page.getByRole("button", { name: "Open all" }).click();
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

test("a topic page keeps the shell: Topics current, an empty Contents slot and the exact update date", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Laptop sidebar only");
  await page.goto("./topics/choledocholithiasis/");
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "true");
  // The Contents component arrives with the reader chrome; until then the slot is reserved and empty.
  await expect(page.locator("#shell-contents")).toBeEmpty();
  await expect(page.getByRole("navigation", { name: "Contents" })).toHaveCount(0);
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
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" })).toHaveAttribute("aria-current", "true");
  } finally {
    await page.context().setOffline(false);
  }
});
