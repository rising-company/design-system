import { defineConfig } from "vitest/config";

// Component behaviour needs a DOM, so this package runs on jsdom — the one
// deliberate departure from ADR-0006's `node` default, recorded in ADR-0016.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
  },
});
