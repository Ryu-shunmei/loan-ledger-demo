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

export default function AddBranch({ open, close, branch_id }) {
  const [headUsers, setHeadUsers] = useState([]);
  const [branchUsers, setBranchUsers] = useState([]);
  const addBranchSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required().max(128, "max length is 128."),
    role_id: Yup.string(),
    belong_role_id: Yup.string().required(),
  });

  const defaultValues = {
    id: "",
    name: "",
    role_id: "",
    belong_role_id: "",
  };

  const methods = useForm({
    resolver: yupResolver(addBranchSchema),
    defaultValues,
  });
  const { reset, setValue, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await myAxios.put("/branch", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const fetchManagers = useCallback(async () => {
    try {
      const response = await myAxios.get("/user/category");
      console.log(response.data);
      setHeadUsers(response.data.for_head);
      setBranchUsers(response.data.for_branch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBranch = useCallback(async () => {
    try {
      const response = await myAxios.get(`/branch?id=${branch_id}`);
      setValue("id", !!response.data?.id ? response.data?.id : "");
      setValue("name", !!response.data?.name ? response.data?.name : "");
      setValue(
        "role_id",
        !!response.data?.role_id ? response.data?.role_id : ""
      );
      setValue(
        "belong_role_id",
        !!response.data?.belong_role_id ? response.data?.belong_role_id : ""
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchManagers();
    fetchBranch();
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>支店編集</DialogTitle>
        <DialogContent dividers sx={{ overflow: "auto", maxHeight: "75vh" }}>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="支店名称" />

              {/* <RHFSelect name="role_id" label="支店担当" type="number">
                {branchUsers.map((item) => (
                  <MenuItem value={item.role_id} key={item.id}>
                    {item.last_name}
                    {item.first_name}
                  </MenuItem>
                ))}
              </RHFSelect> */}

              <RHFSelect name="belong_role_id" label="本社管理者" type="number">
                {headUsers.map((item) => (
                  <MenuItem value={item.role_id} key={item.id}>
                    {item.last_name}
                    {item.first_name}
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
