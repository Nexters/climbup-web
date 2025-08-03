import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/level/")({
  component: OnboardingLevelComponent,
});

function OnboardingLevelComponent() {
  return <div>Hello "/onboarding/level/"!</div>;
}
