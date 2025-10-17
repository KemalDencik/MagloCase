import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

interface TanStackQueryProviderProps {
  children: ReactNode;
}

export const TanStackQueryProvider = ({ children }: TanStackQueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
