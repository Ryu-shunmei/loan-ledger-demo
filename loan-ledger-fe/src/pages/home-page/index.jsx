import { Card, Table, TableBody, TableContainer } from "@mui/material";

//
import TableToolbar from "./table-toolbar";
import TableRow from "./table-row";
import { useState, useCallback, useEffect } from "react";
import {
  useTable,
  getComparator,
  TableHeadCustom,
  TablePaginationCustom,
} from "@/components/table";

//
import { useBoolean } from "@/hooks/use-boolean";
import myAxios from "@/utils/myAxios";
import AddCase from "./add-case";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    fontSize: "9px",
    id: "execute_confirm",
    label: "管理担当用実行確定",
    minWidth: "130px",
  },
  {
    fontSize: "9px",
    id: "shbs_report",
    label: "SHBS財務G報告用",
    minWidth: "130px",
  },
  {
    fontSize: "9px",
    id: "branch_office_name",
    label: "支店名",
    minWidth: "60px",
  },
  { fontSize: "9px", id: "bank_name", label: "銀行名", minWidth: "130px" },
  { fontSize: "9px", id: "user_name", label: "管理担当者", minWidth: "100px" },
  { fontSize: "9px", id: "type", label: "提携種別", minWidth: "75px" },
  { fontSize: "9px", id: "loan_target", label: "ローン対象", minWidth: "80px" },
  {
    fontSize: "9px",
    id: "ap_loan_applicable",
    label: "APローン該当",
    minWidth: "95px",
  },
  { fontSize: "9px", id: "excute_date", label: "実行日", minWidth: "75px" },
  { fontSize: "9px", id: "house_code", label: "邸コード", minWidth: "75px" },
  { fontSize: "9px", id: "house_name", label: "邸名", minWidth: "75px" },
  { fontSize: "9px", id: "loan_amount", label: "借入金額", minWidth: "75px" },
  {
    fontSize: "9px",
    id: "deduction_amount",
    label: "実行時差引諸費用",
    minWidth: "105px",
  },
  {
    fontSize: "9px",
    id: "deposit_amount",
    label: "着金金額",
    minWidth: "75px",
  },
  {
    fontSize: "9px",
    id: "heim_note",
    label: "ハイム備考欄",
    minWidth: "100px",
  },
  {
    fontSize: "9px",
    id: "shbs_note",
    label: "ＳＨＢＳ備考欄",
    minWidth: "95px",
  },
  {
    fontSize: "9px",
    id: "shbs_confirm",
    label: "SHBS確認欄",
    minWidth: "90px",
  },
  {
    fontSize: "9px",
    id: "collection_date",
    label: "権利証（回収日）",
    minWidth: "125px",
  },
  {
    fontSize: "9px",
    id: "receive_date",
    label: "抵当権（書類受理日）",
    minWidth: "125px",
  },
  {
    fontSize: "9px",
    id: "registrate_date",
    label: "抵当権（登記依頼日）",
    minWidth: "125px",
  },
  {
    fontSize: "9px",
    id: "schedule_date",
    label: "抵当権（完了予定日）",
    minWidth: "125px",
  },
  {
    fontSize: "9px",
    id: "establish_date",
    label: "抵当権（設定日）",
    minWidth: "110px",
  },
  {
    fontSize: "9px",
    id: "doc_send_date",
    label: "抵当権（設定書類送付日）",
    minWidth: "140px",
  },
  {
    fontSize: "9px",
    id: "confirm_date",
    label: "責任者確認日",
    minWidth: "100px",
  },
  { fontSize: "9px", id: "", label: "操作", minWidth: "50px" },
];

const LOAN_TARGET_OPTIONS = [
  { value: "土地", label: "土地" },
  { value: "建物中間", label: "建物中間" },
  { value: "建物最終", label: "建物最終" },
];
const defaultFilters = {
  name: "",
  bank: [],
  loan_target: [],
};
// ----------------------------------------------------------------------
export default function Home() {
  const table = useTable();
  const [tableData, setTableData] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const add = useBoolean(false);
  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  useEffect(() => {
    const fn = async () => {
      const [status, data] = await myAxios.get(`/cases`);
      console.log(status, data);
      if (status === 200) {
        setTableData(data);
      }
    };
    fn();
  }, [setTableData]);

  useEffect(() => {
    myAxios.get("/banks").then(([status, data]) => {
      console.log([status, data]);
      if (status === 200) {
        setBankOptions(data);
      }
    });
  }, []);
  return (
    <Card>
      <TableToolbar
        filters={filters}
        onFilters={handleFilters}
        //
        bankOptions={bankOptions}
        loanTargetOptions={LOAN_TARGET_OPTIONS}
        //
        openAdd={add.onTrue}
      />

      <TableContainer
        sx={{
          position: "relative",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "1283px",
        }}
      >
        <Table stickyHeader size="small">
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            rowCount={tableData.length}
            onSort={table.onSort}
          />
          <TableBody>
            {dataFiltered
              .slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
      {add.value && <AddCase open={add.value} close={add.onFalse} />}
    </Card>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, bank, loan_target } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((item) => item.house_name.includes(name));
  }

  if (bank.length) {
    inputData = inputData.filter((item) => bank.includes(item.bank_name));
  }

  if (loan_target.length) {
    inputData = inputData.filter((item) =>
      loan_target.includes(item.loan_target)
    );
  }

  return inputData;
}
