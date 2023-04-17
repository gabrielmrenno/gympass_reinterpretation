import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// in this way, vitest will understand the tsconfig paths, like "@/*"
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
