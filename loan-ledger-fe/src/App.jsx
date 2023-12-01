// theme
import ThemeProvider from "@/theme";
// routers
import Router from "./routers";
// ----------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
