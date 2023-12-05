// theme
import ThemeProvider from "@/theme";
// routers
import Router from "@/router";
import { AuthProvider } from "./auth-store";
// ----------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
