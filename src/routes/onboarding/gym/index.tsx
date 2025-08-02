import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/gym/")({
  component: ClimbOnboardingComponent,
});

function ClimbOnboardingComponent() {
  return <div>Hello "/onboarding/climb/"!</div>;
}
