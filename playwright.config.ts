import { defineConfig, devices } from "@playwright/test";

// baseURL carries the basePath, so every goto in the suite is relative ("topics/fasciotomy", not
// "/topics/fasciotomy") — a leading slash resolves against the origin and skips the mount point.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000/pocket-chief/",
    trace: "on-first-retry",
  },
  projects: [
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "node node_modules/next/dist/bin/next dev --port 3000",
    url: "http://127.0.0.1:3000/pocket-chief/",
    reuseExistingServer: false,
    // Default 60s is too tight on this machine's pathological iCloud-synced I/O, where the first
    // Next.js compile alone can take 30s+; this only widens the boot window, it changes no assertion.
    timeout: 180_000,
    env: { NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS: "true" },
  },
});
