import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { getCurrentUserStatus } from "@/generated/user/user";
import { getHeaderToken, setToken } from "@/utils/cookie";

const Oauth2RedirectSearchScheme = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

type Oauth2RedirectSearch = z.infer<typeof Oauth2RedirectSearchScheme>;

export const Route = createFileRoute("/oauth2/redirect/")({
  component: Oauth2RedirectComponent,
  validateSearch: (search: Record<string, unknown>): Oauth2RedirectSearch => {
    return Oauth2RedirectSearchScheme.parse(search);
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    setToken(search.accessToken);
    const { data } = await getCurrentUserStatus({
      headers: getHeaderToken(),
    });

    return data;
  },
});

function Oauth2RedirectComponent() {
  const data = Route.useLoaderData();
  const navigate = useNavigate({ from: "/oauth2/redirect" });

  useEffect(() => {
    const url = match(data)
      .with(
        { gym: P.optional(P.nullish), gymLevel: P.optional(P.nullish) },
        () => "/onboarding/gym"
      ) // 암장 미선택
      .with(
        { gym: P.nonNullable, gymLevel: P.optional(P.nullish) },
        () => "/onboarding/level"
      ) // 레벨 미선택
      .with({ gym: P.nonNullable, gymLevel: P.nonNullable }, () => "/mission") // 암장, 레벨 선택
      .otherwise(() => "/");
    navigate({ to: url, replace: true });
  }, [data, navigate]);

  return null;
}
