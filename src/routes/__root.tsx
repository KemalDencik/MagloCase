import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

interface RouterContext {
  auth: unknown;
}

function RootComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/auth/login" });
    }
  }, [navigate]);

  return <Outlet />;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
