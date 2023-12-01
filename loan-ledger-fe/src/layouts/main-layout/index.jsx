// @mui
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material";

// .
import Header from "./header";
import Nav from "./nav";

import { useLocalStorage, getStorage } from "@/hooks/use-local-storage";
// ----------------------------------------------------------------------
export default function MainLayout({ children }) {
  const theme = useTheme();
  const { state } = useLocalStorage("user");

  return (
    <>
      <Header />
      {state.category !== "03" && <Nav />}
      <Box
        component="main"
        sx={{
          height: "100vh",
          pt: "80px",
          pl: state.category !== "03" ? "88px" : "opx",
          bgcolor: theme.palette.background.neutral,
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            maxWidth: 1,
            maxHeight: 1,
            p: 2,
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
