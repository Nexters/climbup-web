import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "@/router";

export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          router.navigate({ to: "/" });
        }
        if (error.response?.status === 302) {
          router.navigate({ to: "/" });
        }
        if (!error.response?.data) {
          router.navigate({ to: "/" });
        }
      }
    },
  }),
});
