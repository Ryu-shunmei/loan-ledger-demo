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
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";

// ----------------------------------------------------------------------

export default function AddCase({ open, close, case_id }) {
  const { user } = useAuthContext();
  const [banks, setBanks] = useState([]);
  const addCaseSchema = Yup.object().shape({
    id: Yup.string(),
    branch_office_id: Yup.string(),
    role_id: Yup.string(),
    execute_confirm: Yup.string().max(1),
    shbs_report: Yup.string().max(1),
    bank_id: Yup.string(),
    loan_target: Yup.string().max(20),
    ap_loan_applicable: Yup.string().max(1),
    excute_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    house_code: Yup.string(),
    house_name: Yup.string(),
    loan_amount: Yup.string(),
    deduction_amount: Yup.string(),
    deposit_amount: Yup.string(),
    heim_note: Yup.string().max(128),
    shbs_note: Yup.string().max(128),
    shbs_confirm: Yup.string().max(1),
    collection_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    receive_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    registrate_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    schedule_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    establish_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    doc_send_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
    confirm_date: Yup.string().matches(
      "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$|"
    ),
  });

  const defaultValues = {
    id: case_id,
    branch_office_id: "",
    role_id: "",
    execute_confirm: "",
    shbs_report: "",
    bank_id: "",
    loan_target: "",
    ap_loan_applicable: "",
    excute_date: "",
    house_code: "",
    house_name: "",
    loan_amount: "",
    deduction_amount: "",
    deposit_amount: "",
    heim_note: "",
    shbs_note: "",
    shbs_confirm: "",
    collection_date: "",
    receive_date: "",
    registrate_date: "",
    schedule_date: "",
    establish_date: "",
    doc_send_date: "",
    confirm_date: "",
  };

  const methods = useForm({
    resolver: yupResolver(addCaseSchema),
    defaultValues,
  });
  const { reset, setValue, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.put("/case", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const fetchCase = useCallback(async () => {
    try {
      const response = await myAxios.get(`/case?id=${case_id}`);
      setValue("id", !!response.data.id ? response.data.id : "");
      setValue(
        "branch_office_id",
        !!response.data.branch_office_id ? response.data.branch_office_id : ""
      );
      setValue("role_id", !!response.data.role_id ? response.data.role_id : "");
      setValue(
        "execute_confirm",
        !!response.data.execute_confirm ? response.data.execute_confirm : ""
      );
      setValue(
        "shbs_report",
        !!response.data.shbs_report ? response.data.shbs_report : ""
      );
      setValue("bank_id", !!response.data.bank_id ? response.data.bank_id : "");
      setValue(
        "loan_target",
        !!response.data.loan_target ? response.data.loan_target : ""
      );
      setValue(
        "ap_loan_applicable",
        !!response.data.ap_loan_applicable
          ? response.data.ap_loan_applicable
          : ""
      );
      setValue(
        "excute_date",
        !!response.data.excute_date ? response.data.excute_date : ""
      );
      setValue(
        "house_code",
        !!response.data.house_code ? response.data.house_code : ""
      );
      setValue(
        "house_name",
        !!response.data.house_name ? response.data.house_name : ""
      );
      setValue(
        "loan_amount",
        !!response.data.loan_amount ? response.data.loan_amount : ""
      );
      setValue(
        "deduction_amount",
        !!response.data.deduction_amount ? response.data.deduction_amount : ""
      );
      setValue(
        "deposit_amount",
        !!response.data.deposit_amount ? response.data.deposit_amount : ""
      );
      setValue(
        "heim_note",
        !!response.data.heim_note ? response.data.heim_note : ""
      );
      setValue(
        "shbs_note",
        !!response.data.shbs_note ? response.data.shbs_note : ""
      );
      setValue(
        "shbs_confirm",
        !!response.data.shbs_confirm ? response.data.shbs_confirm : ""
      );
      setValue(
        "collection_date",
        !!response.data.collection_date ? response.data.collection_date : ""
      );
      setValue(
        "receive_date",
        !!response.data.receive_date ? response.data.receive_date : ""
      );
      setValue(
        "registrate_date",
        !!response.data.registrate_date ? response.data.registrate_date : ""
      );
      setValue(
        "schedule_date",
        !!response.data.schedule_date ? response.data.schedule_date : ""
      );
      setValue(
        "establish_date",
        !!response.data.establish_date ? response.data.establish_date : ""
      );
      setValue(
        "doc_send_date",
        !!response.data.doc_send_date ? response.data.doc_send_date : ""
      );
      setValue(
        "confirm_date",
        !!response.data.confirm_date ? response.data.confirm_date : ""
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBanks = useCallback(async () => {
    try {
      const respones = await myAxios.get("/banks");
      console.log(respones.data);
      setBanks(respones.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchBanks();
    fetchCase();
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>案件編集</DialogTitle>
        <DialogContent dividers sx={{overflow:"auto", maxHeight:"75vh"}}>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFSelect name="execute_confirm" label="管理担当用実行確定">
                <MenuItem value={"未"}>未</MenuItem>
                <MenuItem value={"済"}>済</MenuItem>
              </RHFSelect>
              <RHFSelect name="shbs_report" label="SHBS財務G報告用">
                <MenuItem value={"未"}>未</MenuItem>
                <MenuItem value={"済"}>済</MenuItem>
              </RHFSelect>
              <RHFSelect name="bank_id" label="銀行名">
                {banks.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.bank_name}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect name="loan_target" label="ローン対象">
                <MenuItem value={"土地"}>土地</MenuItem>
                <MenuItem value={"建物中間"}>建物中間</MenuItem>
                <MenuItem value={"建物最終"}>建物最終</MenuItem>
              </RHFSelect>
              <RHFSelect name="ap_loan_applicable" label="APローン該当">
                <MenuItem value={"〇"}>〇</MenuItem>
                <MenuItem value={"Ｘ"}>Ｘ</MenuItem>
              </RHFSelect>

              <RHFTextField name="excute_date" label="実行日" />
              <RHFTextField name="house_code" label="邸コード" />
              <RHFTextField name="house_name" label="邸名" />
              <RHFTextField name="loan_amount" label="借入金額" />
              <RHFTextField name="deduction_amount" label="実行時差引諸費用" />
              <RHFTextField name="deposit_amount" label="着金金額" />
              <RHFTextField name="heim_note" label="ハイム備考欄" />
              <RHFTextField name="shbs_note" label="ＳＨＢＳ備考欄" />

              <RHFSelect name="shbs_confirm" label="SHBS確認欄">
                <MenuItem value={"未"}>未</MenuItem>
                <MenuItem value={"済"}>済</MenuItem>
              </RHFSelect>
              <RHFTextField name="collection_date" label="権利証（回収日）" />
              <RHFTextField name="receive_date" label="抵当権（書類受理日）" />
              <RHFTextField
                name="registrate_date"
                label="抵当権（登記依頼日）"
              />
              <RHFTextField name="schedule_date" label="抵当権（完了予定日）" />
              <RHFTextField name="establish_date" label="抵当権（設定日）" />
              <RHFTextField
                name="doc_send_date"
                label="抵当権（設定書類送付日）"
              />
              <RHFTextField name="confirm_date" label="責任者確認日" />
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
