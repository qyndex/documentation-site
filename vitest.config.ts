import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Astro components cannot be unit-tested in a Node environment without
    // the Astro container API (which requires a running Astro server).
    // Unit tests here cover pure utility functions and content validation.
    environment: "node",
    include: ["tests/**/*.test.ts"],
    exclude: ["e2e/**"],
    globals: true,
  },
});
