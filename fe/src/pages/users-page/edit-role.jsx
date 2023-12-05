import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import myAxios from "@/utils/myAxios";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getStorage } from "@/hooks/use-local-storage";
import { useBoolean } from "@/hooks/use-boolean";
import Iconify from "@/components/iconify/iconify";

// ----------------------------------------------------------------------

export default function EditRole({ open, close, role_id }) {
  const [branchs, setBranchs] = useState([]);

  const editRoleSchema = Yup.object().shape({
    id: Yup.string(),
    permission_id: Yup.string(),
    name: Yup.string().required().max(128),
    category: Yup.string().required().max(255),
    branch_office_id: Yup.string().max(255),

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
    permission_id: "",
    name: "",
    category: "",
    branch_office_id: "",

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
    resolver: yupResolver(editRoleSchema),
    defaultValues,
  });
  const { reset, watch, setValue, getValues, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await myAxios.put("/role", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const fetchBranchs = useCallback(async () => {
    const response = await myAxios.get("/branchs");
    setBranchs(response.data);
  }, []);

  const fetchRole = useCallback(async () => {
    const response = await myAxios.get(`/role?role_id=${role_id}`);
    setValue("id", !!response.data?.id ? response.data.id : "");
    setValue(
      "permission_id",
      !!response.data?.permission_id ? response.data.permission_id : ""
    );

    setValue("name", !!response.data?.name ? response.data.name : "");
    setValue(
      "category",
      !!response.data?.category ? response.data.category : ""
    );
    setValue(
      "branch_office_id",
      !!response.data?.branch_office_id ? response.data.branch_office_id : ""
    );

    setValue("menu_home", !!response.data?.menu_home ? true : false);
    setValue("menu_users", !!response.data?.menu_users ? true : false);
    setValue("menu_branchs", !!response.data?.menu_branchs ? true : false);
    setValue("menu_banks", !!response.data?.menu_banks ? true : false);
    setValue(
      "action_create_bank",
      !!response.data?.action_create_bank ? true : false
    );
    setValue(
      "action_update_bank",
      !!response.data?.action_update_bank ? true : false
    );
    setValue(
      "action_create_branch",
      !!response.data?.action_create_branch ? true : false
    );
    setValue(
      "action_update_branch",
      !!response.data?.action_update_branch ? true : false
    );
    setValue(
      "action_create_user",
      !!response.data?.action_create_user ? true : false
    );
    setValue(
      "action_update_user",
      !!response.data?.action_update_user ? true : false
    );
    setValue(
      "action_create_case",
      !!response.data?.action_create_case ? true : false
    );
    setValue(
      "action_update_case",
      !!response.data?.action_update_case ? true : false
    );
    setValue(
      "action_import_case",
      !!response.data?.action_import_case ? true : false
    );
    setValue(
      "action_export_case",
      !!response.data?.action_export_case ? true : false
    );
  }, []);

  useEffect(() => {
    fetchBranchs();
    fetchRole();
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
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>新規ロール</DialogTitle>
        <DialogContent dividers sx={{ overflow: "auto", maxHeight: "75vh" }}>
          <DialogTitle variant="subtitle2">ロール情報</DialogTitle>
          <DialogContent >
            <Box pt={1}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="名称" />
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

          <DialogTitle variant="subtitle2">ロール権限</DialogTitle>
          <DialogContent>
            <Box>
              <Stack spacing={2}>
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
