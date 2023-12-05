// @mui
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material";
// .
import Header from "./header";
import Nav from "./nav";

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Nav />
      <Box
        component="main"
        sx={{
          height: "100vh",
          pt: "80px",
          pl: "100px",
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
