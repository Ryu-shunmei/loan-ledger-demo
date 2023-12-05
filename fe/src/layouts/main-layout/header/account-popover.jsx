// @mui
import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  IconButton,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import CustomPopover, { usePopover } from "@/components/custom-popover";
// hooks
import { useAuthContext } from "@/hooks/use-auth-context";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const theme = useTheme();
  const popover = usePopover();
  const { user, logout, switch_role } = useAuthContext();

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
        sx={{ width: 200, p: 0, mt: 1 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.last_name}
            {user?.first_name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Box sx={{ px: 2, pt: 1 }}>
          <Typography variant="subtitle2" noWrap>
            ロール
          </Typography>
        </Box>

        {user?.roles.map((item) => (
          <MenuItem
            key={item.id}
            onClick={
              item.id === user?.curr_role_id
                ? () => {}
                : async () => {
                  await switch_role(user?.id, item.id)
                  popover.onClose()
                }
            }
          >
            <ListItemText>{item.name}</ListItemText>
            <ListItemIcon>
              <Iconify
                icon={
                  item.id === user?.curr_role_id
                    ? "carbon:checkmark"
                    : "carbon:arrows-horizontal"
                }
              />
            </ListItemIcon>
          </MenuItem>
        ))}
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          sx={{ my: 1, fontWeight: 700, color: theme.palette.primary.dark }}
          onClick={logout}
        >
          ログアウト
        </MenuItem>
      </CustomPopover>
    </>
  );
}
