// @mui
import {useTheme} from "@mui/material/styles"
import { Box, Stack, Typography } from "@mui/material";


export default function AuthLayout({ children }) {
    const theme = useTheme()
  return (
    <Box component="main" sx={{bgcolor:theme.palette.background.neutral}}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        {children}
      </Stack>
      <Box
        sx={{
          position: "absolute",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          bottom: 0,
          py: 0.5,
        }}
      >
        <Typography variant="caption">© 2023 MILIZE Inc.</Typography>
      </Box>
    </Box>
  );
}
