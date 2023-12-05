// @mui
import { TableRow as MuiTableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { useAuthContext } from "@/hooks/use-auth-context";

//
import EditBranch from "./edit-branch";

// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const {user} = useAuthContext()

  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.role_id ? row.last_name + row.first_name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
        {!!row.belong_role_id ? row.belong_last_name + row.belong_first_name : "ーー"}
        </TableCell>
       
        <TableCell align="center">
          {!!user?.permissions?.action_update_branch ? (
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
