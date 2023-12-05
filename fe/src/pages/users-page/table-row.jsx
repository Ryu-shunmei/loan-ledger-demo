// @mui
import { Box, Button, TableRow as MuiTableRow, Stack } from "@mui/material";
import TableCell from "@mui/material/TableCell";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { useAuthContext } from "@/hooks/use-auth-context";

//
import EditUser from "./edit-user";
import AddRole from "./add-role";
import EditRole from "./edit-role";
import SwitchRole from "./switch-role";

// ----------------------------------------------------------------------

export default function TableRow({ row }) {
  const edit = useBoolean(false);
  const addRole = useBoolean(false);
  const editRole = useBoolean(false);
  const switchRole = useBoolean(false);
  const { user } = useAuthContext();
  return (
    <>
      <MuiTableRow hover>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.last_name}
          {row.first_name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {row.sex}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          {!!row.email ? row.email : "ーー"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "12px" }}>
          <Stack direction="row" justifyContent="center" spacing={1}>
            {row?.roles.map((item) => (
              <Box key={item.id} >
                <Button size="small" onClick={editRole.onTrue}>
                  {item.name}
                </Button>
                {editRole.value && (
                  <EditRole
                    open={editRole.value}
                    close={editRole.onFalse}
                    role_id={item.id}
                  />
                )}
              </Box>
            ))}
            <Button size="small" onClick={addRole.onTrue}>
              新規ロール
            </Button>
          </Stack>
        </TableCell>
        <TableCell align="center">
          {!!user?.permissions?.action_update_user ? (
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Button onClick={edit.onTrue}>編集</Button>
              {row?.roles.length > 0 && (
                <Button onClick={switchRole.onTrue}>仕事引継</Button>
              )}
            </Stack>
          ) : (
            "ーー"
          )}
        </TableCell>
      </MuiTableRow>
      {edit.value && (
        <EditUser open={edit.value} close={edit.onFalse} user_id={row.id} />
      )}
      {switchRole.value && (
        <SwitchRole open={switchRole.value} close={switchRole.onFalse} user_id={row.id} user_name={row.last_name + row.first_name} roles={row.roles}/>
      )}
      {addRole.value && (
        <AddRole
          open={addRole.value}
          close={addRole.onFalse}
          user_id={row.id}
        />
      )}
    </>
  );
}
