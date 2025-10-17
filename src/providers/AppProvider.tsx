import { Provider } from "react-redux";
import { store } from "@/store";
import { TanStackRouterProvider } from "./TanStackRouterProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <TanStackRouterProvider />
      {children}
    </Provider>
  );
};
