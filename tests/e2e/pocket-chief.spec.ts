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
  await expect(page.getByRole("button", { name: "Saved offline" })).toBeVisible();

  await page.goto("./saved/");
  await expect(page.locator(".topic-grid").getByRole("link", { name: /Choledocholithiasis/ })).toBeVisible();
});

test("mobile navigation exposes three primary destinations", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("./");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Topics" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Saved" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Add" })).toHaveCount(0);
});

test("topics index searches the grouped curriculum and offers an alphabetical view", async ({ page }) => {
  await page.goto("./topics/");
  await expect(page.getByRole("heading", { name: "Topics" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Find a topic" })).toBeVisible();

  const search = page.getByRole("searchbox", { name: "Search topics" });
  await search.fill("choledocho");
  await expect(page.getByRole("link", { name: "Choledocholithiasis", exact: true })).toBeVisible();
  await expect(page.getByText("1 topic", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "All topics" }).click();
  await expect(page.getByRole("heading", { name: "All topics" })).toBeVisible();
  await search.fill("");
  await expect(page.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveCount(1);
});

test("half-width desktop uses a compact rail and a usable topics drawer", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Half-width desktop layout only");
  await page.setViewportSize({ width: 860, height: 900 });
  await page.goto("./topics/choledocholithiasis/");

  await expect(page.getByLabel("Topics workspace")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
  const browse = page.getByRole("button", { name: "Browse topics" });
  await expect(browse).toBeVisible();
  await browse.click();
  await expect(page.getByRole("dialog", { name: "Topics" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("topic sections start collapsed, toggle together, and reviewed state persists", async ({ page }) => {
  await page.goto("./topics/choledocholithiasis/");
  const sections = page.locator("details.section-block");
  await expect(sections.first()).not.toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Open all" }).click();
  await expect(sections.first()).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Close all" }).click();
  await expect(sections.first()).not.toHaveAttribute("open", "");

  await page.getByRole("button", { name: "Mark reviewed" }).click();
  await expect(page.getByText("Reviewed on this device")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Mark not reviewed" })).toBeVisible();
  // Choledocholithiasis is the only topic in Alimentary Tract, so its category ends here
  // rather than wrapping into the next one.
  await expect(page.getByRole("link", { name: "End of category: back to all topics" })).toHaveAttribute("href", "/pocket-chief/topics/");
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
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  await page.waitForFunction(async () => {
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
  });
  await page.goto("./topics/");
  await expect(page.getByRole("link", { name: "Resume topic" })).toHaveAttribute("href", "/pocket-chief/topics/choledocholithiasis/");
  await expect(page.getByText("Reviewed", { exact: true })).toHaveCount(0);
});

test("canonical topic navigation keeps the workspace, active path, anchors, and exact update date", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Desktop workspace navigation only");
  await page.goto("./topics/");
  // The topics index renders the searchable browser alongside the workspace tree, so this
  // walk has to stay inside the tree to keep naming its own links.
  const tree = page.getByRole("navigation", { name: "Topics curriculum" });
  await tree.getByRole("button", { name: "Alimentary Tract" }).click();
  await tree.getByRole("button", { name: "Biliary Tract" }).click();
  await tree.getByRole("link", { name: "Choledocholithiasis", exact: true }).click();

  await expect(page).toHaveURL(/\/topics\/choledocholithiasis\/$/);
  await expect(page.getByLabel("Topics workspace")).toBeVisible();
  const curriculum = page.getByRole("navigation", { name: "Topics curriculum" });
  await expect(curriculum.getByRole("button", { name: "Alimentary Tract" })).toHaveAttribute("aria-expanded", "true");
  await expect(curriculum.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText("Last updated Aug 12, 2026", { exact: true })).toBeVisible();

  await curriculum.getByRole("link", { name: "Choose the route" }).click();
  await expect(page).toHaveURL(/#block-comparison$/);
  await expect(page.locator("#block-comparison")).toBeInViewport();
  await expect(curriculum.getByRole("link", { name: "Choose the route" })).toHaveAttribute("aria-current", "location");
});

test("desktop rail collapse persists after reload and captures both desktop states", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chrome", "Desktop rail only");
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("./topics/choledocholithiasis/");
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  const rail = page.getByLabel("Topics workspace");
  await expect(rail).not.toHaveClass(/is-collapsed/);
  await page.screenshot({ path: "output/playwright/topics-desktop-expanded.png", fullPage: true });

  await page.getByRole("button", { name: "Collapse Topics sidebar" }).click();
  await expect(rail).toHaveClass(/is-collapsed/);
  await page.screenshot({ path: "output/playwright/topics-desktop-slim-rail.png", fullPage: true });
  await page.reload();
  await expect(page.getByLabel("Topics workspace")).toHaveClass(/is-collapsed/);
});

test("mobile Topics drawer traps focus, restores it, and closes after topic or section selection", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome", "Mobile drawer only");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("./topics/choledocholithiasis/");
  const trigger = page.getByRole("button", { name: "Browse topics" });
  const drawer = page.getByRole("dialog", { name: "Topics" });
  const close = drawer.getByRole("button", { name: "Close topics navigation" });
  // Click exactly once, and only after hydration. The Topics button is server-rendered and tappable
  // before React attaches its handler, and the drawer's content is registered by a TopicsWorkspace
  // mount effect, so an early tap is silently dropped — milliseconds in production, but far longer
  // on a cold dev-server compile.
  //
  // Retrying the tap is NOT a valid workaround: `open()` sets state rather than toggling, so a
  // second click leaves the drawer open while moving focus to the trigger, and the drawer never
  // remounts to re-run its `closeRef.focus()` effect. Nor is waiting on the library.json response —
  // the service worker precaches that same URL from its install handler, so it can land before React
  // has run anything. Waiting for the worker to control the page is the honest gate: registration
  // happens in ServiceWorkerRegistration's mount effect, a sibling of the one that registers the
  // drawer, so a controlling worker proves the whole commit's effects have run.
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  await trigger.click();
  await expect(close).toBeFocused();
  await page.screenshot({ path: "output/playwright/topics-phone-drawer.png", fullPage: true });

  const focusable = drawer.locator("a[href], button:not([disabled])");
  await page.keyboard.press("Shift+Tab");
  await expect(focusable.last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByLabel("Dismiss topics navigation").click({ position: { x: 2, y: 2 } });
  await expect(drawer).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await drawer.getByRole("link", { name: "Choose the route" }).click();
  await expect(page).toHaveURL(/#block-comparison$/);
  await expect(drawer).toHaveCount(0);

  await trigger.click();
  await drawer.getByRole("link", { name: "Choledocholithiasis", exact: true }).click();
  await expect(page).toHaveURL(/\/topics\/choledocholithiasis\/$/);
  await expect(drawer).toHaveCount(0);
});

test("a previously visited Topics guide remains readable offline in its workspace", async ({ page }, testInfo) => {
  await page.goto("./topics/choledocholithiasis/");
  await page.waitForFunction(async () => {
    await navigator.serviceWorker.ready;
    return Boolean(navigator.serviceWorker.controller);
  });
  // Reload under worker control so the dynamic guide and its persistent workspace are cached.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
  if (testInfo.project.name === "mobile-chrome") {
    await page.getByRole("button", { name: "Browse topics" }).click();
    await page.getByRole("dialog", { name: "Topics" }).getByRole("link", { name: "Choose the route" }).click();
  } else {
    await page.getByLabel("Topics workspace").getByRole("link", { name: "Choose the route" }).click();
  }
  await expect(page).toHaveURL(/#block-comparison$/);

  await page.context().setOffline(true);
  try {
    await page.goto("./topics/choledocholithiasis/#block-comparison", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Choledocholithiasis" })).toBeVisible();
    if (testInfo.project.name === "mobile-chrome") {
      await page.getByRole("button", { name: "Browse topics" }).click();
      const drawer = page.getByRole("dialog", { name: "Topics" });
      await expect(drawer.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("aria-current", "page");
      await expect(drawer.getByRole("link", { name: "Choose the route" })).toHaveAttribute("aria-current", "location");
    } else {
      const rail = page.getByLabel("Topics workspace");
      await expect(rail).toBeVisible();
      await expect(rail.getByRole("link", { name: "Choledocholithiasis", exact: true })).toHaveAttribute("aria-current", "page");
      await expect(rail.getByRole("link", { name: "Choose the route" })).toHaveAttribute("aria-current", "location");
    }
  } finally {
    await page.context().setOffline(false);
  }
});
