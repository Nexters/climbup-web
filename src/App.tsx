import { Theme } from "@radix-ui/themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { customQueryClient } from "./third-party/queryClient";

function App() {
  return (
    <Theme scaling="100%">
      <QueryClientProvider client={customQueryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
