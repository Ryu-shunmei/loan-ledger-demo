// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// .
import { palette } from "@/theme/palette";
import { typography } from "@/theme/typography";
import { createShadows } from "@/theme/shadows"
import { createComponents } from "@/theme/overrides"
// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const themeConfig = {
    palette,
    typography,
    shape: { borderRadius: 4 },
  };

  const theme = createTheme(themeConfig);

  theme.shadows = createShadows(palette)
  theme.components = createComponents(palette)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
