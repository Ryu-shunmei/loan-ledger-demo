// @mui
import {
  Box,
  Collapse,
  IconButton,
  TableRow as MuiTableRow,
  Table,
  TableBody,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";

// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { useAuthContext } from "@/hooks/use-auth-context";

import EditCase from "./edit-case";
import Iconify from "@/components/iconify";
// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const detail = useBoolean(false);
  const { user } = useAuthContext();
  return (
    <>
      <MuiTableRow hover = {!detail.value}>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          <IconButton onClick={detail.onToggle}>
            <Iconify
              icon={detail.value ? "carbon:chevron-up" : "carbon:chevron-down"}
            />
          </IconButton>
        </TableCell>
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
          {row.last_name + row.first_name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.loan_target ? row.loan_target : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "10px" }}>
          {row.ap_loan_applicable ? row.ap_loan_applicable : "ーー"}
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

        <TableCell align="right">
          {!!user?.permissions?.action_update_case ? (
            <Button size="small" onClick={edit.onTrue}>
              編集
            </Button>
          ) : (
            "ーー"
          )}
        </TableCell>
      </MuiTableRow>
      <MuiTableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={17}>
          <Collapse in={detail.value} timeout="auto" unmountOnExit>
            <Box sx={{ marginY: 1 }}>
              <Table
                size="small"
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                    margin: 0,
                    padding: "2px",
                  },
                }}
              >
                <TableBody>
                  <MuiTableRow>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      権利証（回収日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      抵当権（書類受理日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      抵当権（登記依頼日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      抵当権（完了予定日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      抵当権（設定日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      抵当権（設定書類送付日）
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      責任者確認日
                    </TableCell>
                  </MuiTableRow>
                  <MuiTableRow>
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
                  </MuiTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditCase open={edit.value} close={edit.onFalse} case_id={row.id} />
      )}
    </>
  );
}
