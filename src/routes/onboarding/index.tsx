import { createFileRoute } from "@tanstack/react-router";
import { DriverExample } from "./-components/DriverExample";

export const Route = createFileRoute("/onboarding/")({
  component: OnBoardingPage,
});

function OnBoardingPage() {
  return <DriverExample />;
}
