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
import { useCallback, useEffect } from "react";

// ----------------------------------------------------------------------

export default function EditBank({ open, close, bank_id }) {
  const EditBankSchema = Yup.object().shape({
    id: Yup.number().required(),
    type: Yup.string().required().max(128, "max length is 128."),
    bank_name: Yup.string().max(128, "max length is 128."),
  });

  const defaultValues = {
    id: "",
    type: "",
    bank_name: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditBankSchema),
    defaultValues,
  });

  const { setValue, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.put("/bank", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  });

  const fetchBank = useCallback(async (bank_id) => {
    try {
      const response = await myAxios.get(`/bank/${bank_id}`);
      setValue("id", !!response.data.id ? response.data.id : "");
      setValue("type", !!response.data.type ? response.data.type : "");
      setValue(
        "bank_name",
        !!response.data.bank_name ? response.data.bank_name : ""
      );
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchBank(bank_id);
  }, [bank_id]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>銀行編集</DialogTitle>
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
            確認
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
