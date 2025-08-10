import { createRootRoute, Outlet } from "@tanstack/react-router";
import { OverlayProvider } from "overlay-kit";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <OverlayProvider>
      <div className="bg-neutral-200 min-h-dvh max-w-[600px] mx-auto outline outline-1 outline-gray-200 -outline-offset-1">
        <Outlet />
      </div>
    </OverlayProvider>
  );
}
