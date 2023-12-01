// hooks
import { getStorage } from "@/hooks/use-local-storage";
//
import myAxios from "@/utils/myAxios";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
//
import {
  useTable,
  getComparator,
  TableHeadCustom,
  TablePaginationCustom,
} from "@/components/table";
import Iconify from "@/components/iconify/iconify";
// .
import TableToolbar from "./table-toolbar";
import TableRow from "./table-row";
import AddUser from "./add-user";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "name", label: "名称" },
  { id: "category", label: "種別" },
  { id: "sex", label: "性別" },
  { id: "phone_num", label: "電話番号" },
  { id: "email", label: "Eメール" },
  { id: "", label: "操作", minWidth: "50px"},
];

const defaultFilters = {
  name: "",
};

export default function Users() {
  const user = getStorage("user");
  const add = useBoolean(false)
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const table = useTable();

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
      const [status, data] = await myAxios.get(`/users`);
      console.log(status, data);
      if (status === 200) {
        setTableData(data);
      }
    };
    fn();
  }, [setTableData]);
  return (
    <Card>
      <TableToolbar filters={filters} onFilters={handleFilters} openAdd={add.onTrue}/>
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
                <TableRow
                  key={row.id}
                  row={row}
                  // onEditRow={() => handleEditRow(row.id)}
                />
              ))}
          </TableBody>
        </Table>
        {tableData.length===0&&<NoData />}
      </TableContainer>
      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
      {add.value&&<AddUser open={add.value} close={add.onFalse}  />}
    </Card>
  );
}

// ----------------------------------------------------------------------

function NoData() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "16px",
      }}
    >
      <Box
        sx={{
          border: `dashed 1px ${theme.palette.divider}`,
          height: "120px",
          width: "100%",
          pt: 3,
        }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Iconify icon="iconoir:file-not-found" height={48} width={48} />
          <Typography variant="h6">No Data</Typography>
        </Stack>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((item) => item.name.includes(name));
  }

  return inputData;
}
