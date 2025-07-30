import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { match, P } from "ts-pattern";
import { z } from "zod";
import type { UserStatusResponse } from "@/generated/model";
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
    const userInfo = await getCurrentUserStatus({
      headers: getHeaderToken(),
    });
    return userInfo;
  },
});

function Oauth2RedirectComponent() {
  const data = Route.useLoaderData() as UserStatusResponse;
  const navigate = useNavigate();

  useEffect(() => {
    const url = match(data)
      .with({ gym: P.nullish }, () => "/onboarding") // 암장 미선택
      .with({ gym: P.nonNullable, gymLevel: P.nullish }, () => "/onboarding") // 레벨 미선택
      .with({ gym: P.nonNullable, gymLevel: P.nonNullable }, () => "/") // 암장, 레벨 선택
      .otherwise(() => "/login");
    navigate({ to: url });
  }, [navigate, data]);

  return null;
}
