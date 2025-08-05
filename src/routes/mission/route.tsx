import { createFileRoute, Outlet } from "@tanstack/react-router";
import MissionHeader from "./-components/MissionHeader";

export const Route = createFileRoute("/mission")({
  component: MissionRoute,
});

function MissionRoute() {
  return (
    <div className="bg-neutral-500 min-h-dvh">
      <MissionHeader />
      <Outlet />
    </div>
  );
}
