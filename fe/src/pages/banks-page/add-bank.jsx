import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider, { RHFTextField } from "@/components/hook-form";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import myAxios from "@/utils/myAxios";

// ----------------------------------------------------------------------


export default function AddBank({ open, close }) {
  const addBankSchema = Yup.object().shape({
    type: Yup.string().required().max(128, "max length is 128."),
    bank_name: Yup.string().max(128, "max length is 128."),
  });

  const defaultValues = {
    type: "",
    bank_name: "",
  };

  const methods = useForm({
    resolver: yupResolver(addBankSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.post("/bank", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  });


  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>新規銀行</DialogTitle>
        <DialogContent dividers sx={{ overflow: "auto", maxHeight: "75vh" }}>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFTextField name="bank_name" label="銀行名称" />
              <RHFTextField name="type" label="提携種別" />
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
