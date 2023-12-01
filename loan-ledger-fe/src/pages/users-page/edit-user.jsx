import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFSwitch,
  RHFCheckbox,
} from "@/components/hook-form";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
} from "@mui/material";

import myAxios from "@/utils/myAxios";
import { useEffect, useState } from "react";
import { getStorage, removeStorage } from "@/hooks/use-local-storage";

// ----------------------------------------------------------------------

export default function EditUser({ open, close, user_id }) {
  const user = getStorage("user");
  const navigate = useNavigate();
  const [branchs, setBranchs] = useState([]);
  const addUserSchema = Yup.object().shape({
    id: Yup.string(),
    role_id: Yup.string(),
    permission_id: Yup.string(),
    name: Yup.string().required().max(128),
    sex: Yup.string().required().max(2),
    email: Yup.string().max(255),
    category: Yup.string().required().max(255),
    phone_num: Yup.string().max(255),
    head_office_id: Yup.string().required().max(255),
    branch_office_id: Yup.string().max(255),
    alias: Yup.string().max(255),

    menu_home: Yup.bool(),
    menu_users: Yup.bool(),
    menu_branchs: Yup.bool(),
    menu_banks: Yup.bool(),
    action_create_bank: Yup.bool(),
    action_update_bank: Yup.bool(),
    action_create_branch: Yup.bool(),
    action_update_branch: Yup.bool(),
    action_create_user: Yup.bool(),
    action_update_user: Yup.bool(),
    action_create_case: Yup.bool(),
    action_update_case: Yup.bool(),
    action_import_case: Yup.bool(),
    action_export_case: Yup.bool(),
  });

  const defaultValues = {
    id: "",
    role_id: "",
    permission_id: "",
    name: "",
    category: "",
    sex: "",
    email: "",
    phone_num: "",
    head_office_id: "",
    branch_office_id: "",
    alias: "",

    menu_home: false,
    menu_users: false,
    menu_branchs: false,
    menu_banks: false,
    action_create_bank: false,
    action_update_bank: false,
    action_create_branch: false,
    action_update_branch: false,
    action_create_user: false,
    action_update_user: false,
    action_create_case: false,
    action_update_case: false,
    action_import_case: false,
    action_export_case: false,
  };

  const methods = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues,
  });
  const { reset, watch, setValue, getValues, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const [status, data] = await myAxios.put("/user", {
      ...formData,
    });
    if (status === 200) {
      if (user.id == data.id){
        removeStorage("access_token");
        removeStorage("user");
        navigate("/login");
      }
      window.location.reload();
      close();
    } else {
      reset();
    }
  });

  useEffect(() => {
    myAxios.get("/branchs").then(([status, data]) => {
      console.log([status, data]);
      if (status === 200) {
        setBranchs(data);
        setValue("head_office_id", user.head_office_id);
        setValue(
          "branch_office_id",
          !!user?.branch_office_id ? user.branch_office_id : ""
        );
      }
    });

    myAxios.get(`/user/${user_id}`).then(([status, data]) => {
      console.log(data);
      if (status === 200) {
        setValue("id", !!data?.id ? data.id : "");
        setValue("role_id", !!data?.role_id ? data.role_id : "");
        setValue(
          "permission_id",
          !!data?.permission_id ? data.permission_id : ""
        );

        setValue("name", !!data?.name ? data.name : "");
        setValue("sex", !!data?.sex ? data.sex : "");
        setValue("email", !!data?.email ? data.email : "");
        setValue("phone_num", !!data?.phone_num ? data.phone_num : "");
        setValue("category", !!data?.category ? data.category : "");
        setValue(
          "head_office_id",
          !!data?.head_office_id ? data.head_office_id : ""
        );
        setValue(
          "branch_office_id",
          !!data?.branch_office_id ? data.branch_office_id : ""
        );
        setValue("alias", !!data?.alias ? data.alias : "");
        setValue("menu_home", !!data?.menu_home ? true : false);
        setValue("menu_users", !!data?.menu_users ? true : false);
        setValue("menu_branchs", !!data?.menu_branchs ? true : false);
        setValue("menu_banks", !!data?.menu_banks ? true : false);
        setValue(
          "action_create_bank",
          !!data?.action_create_bank ? true : false
        );
        setValue(
          "action_update_bank",
          !!data?.action_update_bank ? true : false
        );
        setValue(
          "action_create_branch",
          !!data?.action_create_branch ? true : false
        );
        setValue(
          "action_update_branch",
          !!data?.action_update_branch ? true : false
        );
        setValue(
          "action_create_user",
          !!data?.action_create_user ? true : false
        );
        setValue(
          "action_update_user",
          !!data?.action_update_user ? true : false
        );
        setValue(
          "action_create_case",
          !!data?.action_create_case ? true : false
        );
        setValue(
          "action_update_case",
          !!data?.action_update_case ? true : false
        );
        setValue(
          "action_import_case",
          !!data?.action_import_case ? true : false
        );
        setValue(
          "action_export_case",
          !!data?.action_export_case ? true : false
        );
      }
    });
  }, []);

  const watcher = watch();
  useEffect(() => {
    if (getValues("menu_home") === false) {
      setValue("action_create_case", false);
      setValue("action_update_case", false);
      setValue("action_import_case", false);
      setValue("action_export_case", false);
    }
  }, [watcher.menu_home]);
  useEffect(() => {
    if (getValues("menu_users") === false) {
      setValue("action_create_user", false);
      setValue("action_update_user", false);
    }
  }, [watcher.menu_users]);
  useEffect(() => {
    if (getValues("menu_branchs") === false) {
      setValue("action_create_branch", false);
      setValue("action_update_branch", false);
    }
  }, [watcher.menu_branchs]);
  useEffect(() => {
    if (getValues("menu_banks") === false) {
      setValue("action_create_bank", false);
      setValue("action_update_bank", false);
    }
  }, [watcher.menu_banks]);

  useEffect(() => {
    if (getValues("category") === "01") {
      setValue("branch_office_id", "");
    } else {
      setValue("menu_branchs", false);
      setValue("menu_banks", false);
      setValue("action_create_bank", false);
      setValue("action_update_bank", false);
      setValue("action_create_branch", false);
      setValue("action_update_branch", false);
    }
  }, [watcher.category]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>ユーザー编辑</DialogTitle>
        <DialogTitle variant="subtitle2">ユーザー情報</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="名称" />
              <RHFSelect name="sex" label="性別">
                <MenuItem value={"01"}>男</MenuItem>
                <MenuItem value={"02"}>女</MenuItem>
              </RHFSelect>
              <RHFTextField name="phone_num" label="電話番号" />
              <RHFTextField name="email" label="Eメール" />

              <RHFSelect name="category" label="種別">
                <MenuItem value={"01"}>本社担当者</MenuItem>
                <MenuItem value={"02"}>支店権限者</MenuItem>
                <MenuItem value={"03"}>営業担当者</MenuItem>
              </RHFSelect>

              <RHFSelect
                disabled={getValues("category") === "01"}
                name="branch_office_id"
                label="所属支店"
              >
                <MenuItem value={""}>ない</MenuItem>
                {branchs.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Box>
        </DialogContent>

        <DialogTitle variant="subtitle2">ユーザー権限</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFTextField name="alias" label="権限ロール別名" />
              <Box>
                <RHFSwitch
                  name="menu_home"
                  label="案件管理"
                  labelPlacement="start"
                />
                <Divider light />
              </Box>
              <Box sx={{ pl: 2 }}>
                <RHFCheckbox
                  disabled={!getValues("menu_home")}
                  name="action_create_case"
                  label="案件新規"
                  labelPlacement="end"
                />
                <RHFCheckbox
                  disabled={!getValues("menu_home")}
                  name="action_update_case"
                  label="案件编辑"
                  labelPlacement="end"
                />
                <RHFCheckbox
                  disabled={!getValues("menu_home")}
                  name="action_import_case"
                  label="案件インポート"
                  labelPlacement="end"
                />
                <RHFCheckbox
                  disabled={!getValues("menu_home")}
                  name="action_export_case"
                  label="案件エクスポート"
                  labelPlacement="end"
                />
              </Box>

              <Box>
                <RHFSwitch
                  name="menu_users"
                  label="ユーザー管理"
                  labelPlacement="start"
                />
                <Divider light />
              </Box>
              <Box sx={{ pl: 2 }}>
                <RHFCheckbox
                  disabled={!getValues("menu_users")}
                  name="action_create_user"
                  label="ユーザー新規"
                  labelPlacement="end"
                />
                <RHFCheckbox
                  disabled={!getValues("menu_users")}
                  name="action_update_user"
                  label="ユーザー编辑"
                  labelPlacement="end"
                />
              </Box>

              {getValues("category") === "01" && (
                <Box>
                  <RHFSwitch
                    name="menu_branchs"
                    label="支店管理"
                    labelPlacement="start"
                  />
                  <Divider light />
                </Box>
              )}
              {getValues("category") === "01" && (
                <Box sx={{ pl: 2 }}>
                  <RHFCheckbox
                    disabled={!getValues("menu_branchs")}
                    name="action_create_branch"
                    label="支店新規"
                    labelPlacement="end"
                  />
                  <RHFCheckbox
                    disabled={!getValues("menu_branchs")}
                    name="action_update_branch"
                    label="支店编辑"
                    labelPlacement="end"
                  />
                </Box>
              )}

              {getValues("category") === "01" && (
                <Box>
                  <RHFSwitch
                    name="menu_banks"
                    label="支店管理"
                    labelPlacement="start"
                  />
                  <Divider light />
                </Box>
              )}
              {getValues("category") === "01" && (
                <Box sx={{ pl: 2 }}>
                  <RHFCheckbox
                    disabled={!getValues("menu_banks")}
                    name="action_create_bank"
                    label="銀行新規"
                    labelPlacement="end"
                  />
                  <RHFCheckbox
                    disabled={!getValues("menu_banks")}
                    name="action_update_bank"
                    label="銀行编辑"
                    labelPlacement="end"
                  />
                </Box>
              )}
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
