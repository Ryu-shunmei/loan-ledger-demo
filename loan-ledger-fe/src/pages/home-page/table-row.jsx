// @mui
import { TableRow as MuiTableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { getStorage } from "@/hooks/use-local-storage";

import EditCase from "./edit-case";
// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const user = getStorage("user");
  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.execute_confirm ? row.execute_confirm : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.shbs_report ? row.shbs_report : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.branch_office_name ? row.branch_office_name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.bank_name ? row.bank_name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.type ? row.type : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.user_name ? row.user_name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.loan_target ? row.loan_target : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.ap_loan_applicable ? row.ap_loan_applicable : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.excute_date ? row.excute_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.house_code ? row.house_code : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.house_name ? row.house_name : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.loan_amount ? row.loan_amount : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.deduction_amount ? row.deduction_amount : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.deposit_amount ? row.deposit_amount : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.heim_note ? row.heim_note : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.shbs_note ? row.shbs_note : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.shbs_confirm ? row.shbs_confirm : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.collection_date ? row.collection_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.receive_date ? row.receive_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.registrate_date ? row.registrate_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.schedule_date ? row.schedule_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.establish_date ? row.establish_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.doc_send_date ? row.doc_send_date : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.confirm_date ? row.confirm_date : "ーー"}
        </TableCell>

        <TableCell align="right">
          {!!user.action_update_case ? (
            <Button size="small" onClick={edit.onTrue}>
              編集
            </Button>
          ) : (
            "ーー"
          )}
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditCase open={edit.value} close={edit.onFalse} case_id={row.id} />
      )}
    </>
  );
}
