import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-neutral-200 min-h-screen max-w-[600px] mx-auto outline outline-1 outline-gray-200 -outline-offset-1">
      <Outlet />
    </div>
  );
}
