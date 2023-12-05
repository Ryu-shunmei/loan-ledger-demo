import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider, { RHFTextField, RHFSelect } from "@/components/hook-form";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";

import myAxios from "@/utils/myAxios";
import { useCallback, useEffect, useState } from "react";

// ----------------------------------------------------------------------

export default function SwitchRole({ open, close, user_id, user_name, roles }) {
  const [targetUsers, setTargetUsers] = useState([]);
  const addUserSchema = Yup.object().shape({
    role_id: Yup.string().required(),
    user_id: Yup.string().required(),
  });

  const defaultValues = {
    role_id: roles[0].id,
    user_id: "",
  };

  const methods = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.put(`/target_role?user_id=${data.user_id}&role_id=${data.role_id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const fetchUsers = useCallback(async () => {
    try {
      const response = await myAxios.get(`/target_users?id=${user_id}`);
      setTargetUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{user_name}-仕事引継</DialogTitle>
        <DialogContent dividers sx={{overflow:"auto", maxHeight:"75vh"}}>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFSelect name="role_id" label="ロール名">
                {roles.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect name="user_id" label="対象ユーザー">
              {targetUsers.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.last_name}{item.first_name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={close}>
            戻る
          </Button>
          <Button variant="contained" type="submit">
            確認
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
