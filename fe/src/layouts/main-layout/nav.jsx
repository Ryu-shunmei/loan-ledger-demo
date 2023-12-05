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
// hooks
import { useAuthContext } from "@/hooks/use-auth-context";

// ----------------------------------------------------------------------

export default function Nav() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  return (
    <Box
      component="nav"
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        height: 1,
        position: "fixed",
        bgcolor: "#fff",
        width: 100,
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
          {user?.permissions?.menu_home && (
            <StyledItem
              disableGutters
              active={location.pathname === "/cases"}
              onClick={() => navigate("/cases")}
            >
              <Iconify icon="carbon:db2-database" width={30} height={30} />
              <Box width="100%" mt="8px" px="6px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">案</Typography>
                  <Typography variant="caption">件</Typography>
                  <Typography variant="caption">管</Typography>
                  <Typography variant="caption">理</Typography>
                </Stack>
              </Box>
            </StyledItem>
          )}
          {user?.permissions?.menu_users && (
            <StyledItem
              disableGutters
              active={location.pathname === "/users"}
              onClick={() => navigate("/users")}
            >
              <Iconify icon="carbon:user-multiple" width={30} height={30} />
              <Box width="100%" mt="8px" px="6px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">ユ</Typography>
                  <Typography variant="caption">ー</Typography>
                  <Typography variant="caption">ザ</Typography>
                  <Typography variant="caption">ー</Typography>
                  <Typography variant="caption">管</Typography>
                  <Typography variant="caption">理</Typography>
                </Stack>
              </Box>
            </StyledItem>
          )}
          {user?.permissions?.menu_branchs && (
            <StyledItem
              disableGutters
              active={location.pathname === "/branchs"}
              onClick={() => navigate("/branchs")}
            >
              <Iconify icon="carbon:branch" width={30} height={30} />
              <Box width="100%" mt="8px" px="6px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">支</Typography>
                  <Typography variant="caption">店</Typography>
                  <Typography variant="caption">管</Typography>
                  <Typography variant="caption">理</Typography>
                </Stack>
              </Box>
            </StyledItem>
          )}
          {user?.permissions?.menu_banks && (
            <StyledItem
              disableGutters
              active={location.pathname === "/banks"}
              onClick={() => navigate("/banks")}
            >
              <Iconify icon="mdi:bank-outline" width={30} height={30} />
              <Box width="100%" mt="8px" px="6px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">銀</Typography>
                  <Typography variant="caption">行</Typography>
                  <Typography variant="caption">管</Typography>
                  <Typography variant="caption">理</Typography>
                </Stack>
              </Box>
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
