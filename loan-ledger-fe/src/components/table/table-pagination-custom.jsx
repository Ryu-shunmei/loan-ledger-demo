// @mui
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TablePagination from "@mui/material/TablePagination";

// ----------------------------------------------------------------------

export default function TablePaginationCustom({
  sx,
  row_length,
  ...other
}) {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <TablePagination
        labelRowsPerPage="表示件数:"
        rowsPerPageOptions={[
          { label: '25件', value: 25 },
          { label: '50件', value: 50 },
          { label: '全て', value: other.count }
          ]}
        component="div"
        {...other}
        sx={{
          borderTopColor: "transparent",
        }}
      />
    </Box>
  );
}
