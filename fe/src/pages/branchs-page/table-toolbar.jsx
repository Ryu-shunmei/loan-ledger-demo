import { useCallback } from "react";
// @mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// components
import Iconify from "@/components/iconify";
import { Box, Button } from "@mui/material";
// hooks
import { useAuthContext } from "@/hooks/use-auth-context";

// ----------------------------------------------------------------------

export default function TableToolbar({ filters, onFilters, openAdd }) {
  const {user} = useAuthContext();
  const handleFilterName = useCallback(
    (event) => {
      onFilters("name", event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: "flex-end", md: "center" }}
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <TextField
        size="small"
        value={filters.name}
        onChange={handleFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
        sx={{ width: "300px" }}
      />
      <Box flexGrow={1} />

      {!!user?.permissions?.action_create_branch && (
        <Button
          variant="contained"
          startIcon={<Iconify icon="carbon:add" />}
          onClick={openAdd}
        >
          新規作成
        </Button>
      )}
    </Stack>
  );
}
