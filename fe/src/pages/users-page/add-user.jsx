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

// ----------------------------------------------------------------------

export default function AddUser({ open, close }) {
  const addUserSchema = Yup.object().shape({
    last_name: Yup.string().required().max(128),
    first_name: Yup.string().required().max(128),
    sex: Yup.string().required().max(2),
    email: Yup.string().max(255),
  });

  const defaultValues = {
    last_name: "",
    first_name: "",
    sex: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.post("user", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>新規ユーザー</DialogTitle>
        <DialogContent dividers sx={{overflow:"auto", maxHeight:"75vh"}}>
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
            追加
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
