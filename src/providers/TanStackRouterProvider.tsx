import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { useAppSelector } from "@/store/hooks";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const TanStackRouterProvider = () => {
  const auth = useAppSelector((state) => state.auth);

  return <RouterProvider router={router} context={{ auth }} />;
};
