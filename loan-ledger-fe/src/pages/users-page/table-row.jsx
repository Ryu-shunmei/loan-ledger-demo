// @mui
import { Button, TableRow as MuiTableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { getStorage } from "@/hooks/use-local-storage";

//
import EditUser from "./edit-user";

// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const user = getStorage("user");
  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.name ? row.name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.category
            ? row.category === "01"
              ? "本社担当者"
              : row.category === "02"
              ? "支店権限者"
              : "営業担当者"
            : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.sex === "01" ? "男" : row.sex === "02" ? "女" : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.phone_num ? row.phone_num : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.email ? row.email : "ーー"}
        </TableCell>

        <TableCell align="center">
          {!!user.action_update_user ? (
            <Button onClick={edit.onTrue}>編集</Button>
          ) : (
            "ーー"
          )}
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditUser open={edit.value} close={edit.onFalse} user_id={row.id} />
      )}
    </>
  );
}
