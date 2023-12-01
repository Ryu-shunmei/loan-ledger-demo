// @mui
import { TableRow as MuiTableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { getStorage } from "@/hooks/use-local-storage";

//
import EditBranch from "./edit-branch";

// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const user = getStorage("user");

  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.office_phone_number ? row.office_phone_number : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.postal_code}
          {row.postal_code ? row.postal_code : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.prefecture ? row.prefecture : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.city ? row.city : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.district ? row.district : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.other_address ? row.other_address : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.belong_user_name}
        </TableCell>

        <TableCell align="center">
          {!!user.action_update_branch ? (
            <Button onClick={edit.onTrue}>編集</Button>
          ) : (
            "ーー"
          )}
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditBranch open={edit.value} close={edit.onFalse} branch_id={row.id} />
      )}
    </>
  );
}
