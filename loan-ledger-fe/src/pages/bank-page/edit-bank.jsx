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
import { useEffect } from "react";

// ----------------------------------------------------------------------


export default function EditBank({ open, close, bank_id }) {
  const EditBankSchema = Yup.object().shape({
    id: Yup.number().required(),
    type: Yup.string().required().max(128, "max length is 128."),
    bank_name: Yup.string().max(128, "max length is 128."),
  });

  const defaultValues = {
    id:"",
    type: "",
    bank_name: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditBankSchema),
    defaultValues,
  });
  const { reset, setValue, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const [status, data] = await myAxios.put("/bank", {
      ...formData,
    });
    if (status === 200) {
      window.location.reload();
      close();
    } else {
      reset();
    }
  });

  useEffect(()=>{
    myAxios.get(`/bank/${bank_id}`).then(([status, data])=>{
      if (status === 200){
        setValue("id", !!data.id ? data.id : null)
        setValue("type", !!data.type ? data.type : "")
        setValue("bank_name", !!data.bank_name ? data.bank_name : "")

      }
    })
  },[bank_id])


  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>銀行編集</DialogTitle>
        <DialogContent>
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
