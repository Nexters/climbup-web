import { defineConfig } from "orval";

export default defineConfig({
  "holdy-api": {
    input: {
      target: "https://dev-api.holdy.kr/api-docs",
    },
    output: {
      client: "axios-functions",
      mode: "tags-split",
      override: {
        mutator: {
          path: "./src/utils/http.ts",
          name: "http",
        },
        title: (title) => `${title}-api`,
      },
      schemas: "src/generated/model",
      target: "src/generated",
    },
    hooks: {
      afterAllFilesWrite: "pnpm run format",
    },
  },
});
