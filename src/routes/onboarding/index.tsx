import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["gyms"],
      queryFn: () => getAllGyms(),
    });
  },
});

function RouteComponent() {
  return <div>Hello "/onboarding/"!</div>;
}
