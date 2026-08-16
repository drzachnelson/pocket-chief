import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    // `.claude/worktrees/**` holds full checkouts of other branches, which duplicate every unit
    // test and surface Playwright specs that vitest cannot run. The e2e glob is anchored so it
    // matches those copies too, not just the one at the repo root.
    exclude: ["**/tests/e2e/**", "**/node_modules/**", "**/.claude/**"],
  },
});
