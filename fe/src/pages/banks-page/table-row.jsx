// @mui
import { Button, TableRow as MuiTableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { useAuthContext } from "@/hooks/use-auth-context";
//
import EditBank from "./edit-bank";

// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const {user} = useAuthContext();
  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.bank_name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.type}
        </TableCell>

        <TableCell align="center">
          {!!user?.permissions?.action_update_bank ? (
            <Button onClick={edit.onTrue}>編集</Button>
          ):"ーー"}
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditBank open={edit.value} close={edit.onFalse} bank_id={row.id} />
      )}
    </>
  );
}
