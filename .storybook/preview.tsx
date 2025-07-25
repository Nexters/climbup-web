import type { Decorator, Preview } from "@storybook/react-vite";
import "../src/index.css";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> });
  const routeTree = rootRoute;
  const router = createRouter({ routeTree });
  return <RouterProvider router={router} />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    viewport: { value: "iphone6" },
  },
  decorators: [RouterDecorator],
};

export default preview;
