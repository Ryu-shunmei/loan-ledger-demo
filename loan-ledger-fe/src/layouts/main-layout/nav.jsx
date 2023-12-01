// @mui
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Stack,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "@/components/iconify/iconify";
//
import { getStorage } from "@/hooks/use-local-storage";
// ----------------------------------------------------------------------

export default function Nav() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStorage("user");

  return (
    <Box
      component="nav"
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        height: 1,
        position: "fixed",
        bgcolor: "#fff",
        width: 88,
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: 1,
          width: 1,
          pt: "88px",
          px: "8px",
        }}
      >
        <Stack direction="column" spacing={2}>
          {user?.menu_home && (
            <StyledItem
              disableGutters
              active={location.pathname === "/home"}
              onClick={() => navigate("/home")}
            >
              <Iconify icon="carbon:db2-database" width={24} height={24} />

              <Typography variant="caption">ホーム</Typography>
            </StyledItem>
          )}
          {user?.menu_users && (
            <StyledItem
              disableGutters
              active={location.pathname === "/users"}
              onClick={() => navigate("/users")}
            >
              <Iconify icon="carbon:user-multiple" width={24} height={24} />

              <Typography variant="caption">ユーザー</Typography>
            </StyledItem>
          )}
          {user?.menu_branchs && (
            <StyledItem
              disableGutters
              active={location.pathname === "/branchs"}
              onClick={() => navigate("/branchs")}
            >
              <Iconify icon="carbon:branch" width={24} height={24} />

              <Typography variant="caption">支店管理</Typography>
            </StyledItem>
          )}
          {user?.menu_banks && (
            <StyledItem
              disableGutters
              active={location.pathname === "/banks"}
              onClick={() => navigate("/banks")}
            >
              <Iconify icon="mdi:bank-outline" width={24} height={24} />

              <Typography variant="caption">銀行管理</Typography>
            </StyledItem>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => {
  return {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,

    color: theme.palette.text.secondary,
    ...(active && {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    }),
  };
});
