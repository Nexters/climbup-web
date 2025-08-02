import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/level/")({
  component: LevelOnboardingComponent,
});

function LevelOnboardingComponent() {
  return <div>Hello "/onboarding/level/"!</div>;
}
