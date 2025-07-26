import { Container, Flex } from "@radix-ui/themes";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Header from "./mission/-components/MissionHeader";

export const Route = createRootRoute({
  component: RootComponent,
});

const ROUTES_WITHOUT_HEADER = ["/", "/difficulty", "/gym"];

function RootComponent() {
  const routerState = useRouterState();
  const hasHeader = !ROUTES_WITHOUT_HEADER.includes(
    routerState.location.pathname
  );

  return (
    <Flex
      direction="column"
      className="bg-neutral-200 min-h-screen max-w-[600px] mx-auto outline outline-1 outline-gray-200 -outline-offset-1"
    >
      {hasHeader && <Header />}
      <Container py="4" px="4">
        <Outlet />
      </Container>
    </Flex>
  );
}
