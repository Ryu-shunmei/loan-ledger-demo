import { useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import CustomPopover, { usePopover } from "@/components/custom-popover";
//
import {
  useLocalStorage,
  removeStorage,
} from "@/hooks/use-local-storage";
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const theme = useTheme();
  const popover = usePopover();
  const { state } = useLocalStorage("user");
  const logout = () => {
    removeStorage("access_token");
    removeStorage("user");
    navigate("/login");
  };
  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 44,
          height: 44,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.darker} 100%)`,
          }),
        }}
      >
        <Avatar
          src="https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
          sx={{
            width: 40,
            height: 40,
            border: (theme) => `solid 2px ${theme.palette.background.darker}`,
          }}
        ></Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0, mt:1}}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {state.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {state.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          sx={{ my: 1, fontWeight: 700, color: theme.palette.primary.darker }}
          onClick={logout}
        >
          ログアウト
        </MenuItem>
      </CustomPopover>
    </>
  );
}
