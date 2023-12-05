import { useCallback } from "react";
// @mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
// components
import Iconify from "@/components/iconify";
import { Box, Button } from "@mui/material";
import { useAuthContext } from "@/hooks/use-auth-context";

// ----------------------------------------------------------------------

export default function TableToolbar({
  filters,
  onFilters,
  //
  bankOptions,
  loanTargetOptions,
  openAdd,
}) {
  const {user} = useAuthContext()
  const handleFilterName = useCallback(
    (event) => {
      onFilters("name", event.target.value);
    },
    [onFilters]
  );

  const handleFilterBank = useCallback(
    (event) => {
      onFilters(
        "bank",
        typeof event.target.value === "string"
          ? event.target.value.split(",")
          : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterLoanTarget = useCallback(
    (event) => {
      onFilters(
        "loan_target",
        typeof event.target.value === "string"
          ? event.target.value.split(",")
          : event.target.value
      );
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
      <FormControl
        size="small"
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 240 },
        }}
      >
        <InputLabel>銀行名</InputLabel>

        <Select
          multiple
          value={filters.bank}
          onChange={handleFilterBank}
          input={<OutlinedInput label="銀行名" />}
          renderValue={(selected) => selected.map((value) => value).join(", ")}
          sx={{ textTransform: "capitalize" }}
        >
          {bankOptions.map((option) => (
            <MenuItem key={option.id} value={option.bank_name}>
              <Checkbox
                disableRipple
                size="small"
                checked={filters.bank.includes(option.bank_name)}
              />
              {option.bank_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 240 },
        }}
      >
        <InputLabel>ローン対象</InputLabel>

        <Select
          multiple
          value={filters.loan_target}
          onChange={handleFilterLoanTarget}
          input={<OutlinedInput label="ローン対象" />}
          renderValue={(selected) => selected.map((value) => value).join(", ")}
          sx={{ textTransform: "capitalize" }}
        >
          {loanTargetOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox
                disableRipple
                size="small"
                checked={filters.loan_target.includes(option.value)}
              />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
      {!!user?.permissions?.action_import_case && (
        <Button
          variant="outlined"
          startIcon={<Iconify icon="carbon:document-import" />}
        >
          インポート
        </Button>
      )}
      {!!user?.permissions?.action_export_case && (
        <Button
          variant="outlined"
          startIcon={<Iconify icon="carbon:document-export" />}
        >
          エクスポート
        </Button>
      )}
      {!!user?.permissions?.action_create_case && (
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
