import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // The demo repository is one process-global store, so serial execution keeps unrelated flows
  // from racing each other's recent-topic and taxonomy mutations.
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // The test-only client flag registers the real worker in demo mode. Production still registers
    // unconditionally and production mode continues to reject the demo repository.
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    env: { POCKET_CHIEF_DEMO: "true", NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS: "true" },
  },
});
