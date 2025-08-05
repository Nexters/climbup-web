import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { getToken } from "@/utils/cookie";

export const Route = createFileRoute("/_authenticated")({
  component: () => {
    if (!getToken()) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  },
});
