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
import { useCallback, useEffect } from "react";

// ----------------------------------------------------------------------

export default function EditUser({ open, close, user_id }) {
  const editUserSchema = Yup.object().shape({
    id: Yup.string(),
    last_name: Yup.string().required().max(128),
    first_name: Yup.string().required().max(128),
    sex: Yup.string().required().max(2),
    email: Yup.string().max(255),
  });

  const defaultValues = {
    id: "",
    last_name: "",
    first_name: "",
    sex: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues,
  });
  const { reset, setValue, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.put("/user", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const fetchUser = useCallback(async () => {
    try {
      const response = await myAxios.get(`/user?id=${user_id}`);
      setValue("id", !!response.data?.id ? response.data?.id : "");
      setValue(
        "last_name",
        !!response.data?.last_name ? response.data?.last_name : ""
      );
      setValue(
        "first_name",
        !!response.data?.first_name ? response.data?.first_name : ""
      );
      setValue("sex", !!response.data?.sex ? response.data?.sex : "");
      setValue("email", !!response.data?.email ? response.data?.email : "");
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} sx={{overflow:"auto", maxHeight:"75vh"}}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>新規ユーザー</DialogTitle>
        <DialogContent dividers >
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <RHFTextField name="last_name" label="姓" />
                <RHFTextField name="first_name" label="名" />
              </Stack>
              <Box minWidth={100}>
                <RHFSelect name="sex" label="性別">
                  <MenuItem value={"男性"}>男性</MenuItem>
                  <MenuItem value={"女性"}>女性</MenuItem>
                </RHFSelect>
              </Box>
              <RHFTextField name="email" label="Eメール" />
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
