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
import AddBranch from "./add-bank";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "bank_name", label: "銀行名称" },
  { id: "type", label: "提携種別" },
  { id: "", label: "操作", minWidth: "50px" },
];

const defaultFilters = {
  name: "",
};

// ----------------------------------------------------------------------

export default function Banks() {
  const add = useBoolean(false);
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

  const fetchData = useCallback(async ()=>{
    try {
        const response = await myAxios.get("/banks")
        setTableData(response.data)
    } catch (error) {
        console.error(error)
    }
    
  },[])

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <TableToolbar
        filters={filters}
        onFilters={handleFilters}
        openAdd={add.onTrue}
      />
      <TableContainer
        sx={{
          position: "relative",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "calc(100vh - 242px)",
          "::-webkit-scrollbar":{display: "none"}
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
                />
              ))}
          </TableBody>
        </Table>
        {tableData.length === 0 && <NoData />}
      </TableContainer>
      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />

      {add.value && <AddBranch open={add.value} close={add.onFalse} />}
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
    inputData = inputData.filter((item) => item.bank_name.includes(name));
  }

  return inputData;
}
