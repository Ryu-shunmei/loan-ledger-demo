// @mui
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// assets
import logoImage from "@/assets/logo.svg";
// 
import { bgBlur } from "@/theme/css";
//
import AccountPopover from "./account-popover";
// ----------------------------------------------------------------------
export default function Header() {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        height: "80px",
        zIndex: theme.zIndex.appBar + 2,
        ...bgBlur({
          color: theme.palette.background.default,
        })
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box component="img" src={logoImage} height="32px" />
          <Typography
            variant="h5"
            sx={{ fontWeight: 900, color: theme.palette.primary.darker }}
          >
            ローン台帳システム
          </Typography>
        </Stack>

        <AccountPopover />
      </Container>
    </AppBar>
  );
}
