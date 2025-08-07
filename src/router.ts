import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { customQueryClient } from "./third-party/queryClient";

export const router = createRouter({
  routeTree,
  context: {
    queryClient: customQueryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
