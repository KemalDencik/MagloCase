import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./providers/AppProvider";
import { TanStackQueryProvider } from "./providers/TanStackQueryProvider";

function App() {
  return (
    <TanStackQueryProvider>
      <AppProvider>
        <Toaster />
      </AppProvider>
    </TanStackQueryProvider>
  );
}

export default App;
