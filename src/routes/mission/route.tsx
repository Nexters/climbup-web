import { createFileRoute, Outlet } from "@tanstack/react-router";
import MissionHeader from "./_components/MissionHeader";

export const Route = createFileRoute("/mission")({
  component: MissionRoute,
});

function MissionRoute() {
  return (
    <>
      <MissionHeader />
      <Outlet />
    </>
  );
}
