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
  Typography,
} from "@mui/material";

import myAxios from "@/utils/myAxios";
import axios from "axios";
import { useEffect, useState } from "react";
import { getStorage } from "@/hooks/use-local-storage";

// ----------------------------------------------------------------------

export default function EditBranch({ open, close, branch_id }) {
  const user = getStorage("user");
  const [headUsers, setHeadUsers] = useState([]);
  const addBranchSchema = Yup.object().shape({
    name: Yup.string().required().max(128, "max length is 128."),
    office_phone_number: Yup.string().matches(
      "^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}|$",
      "office_phone_number is not invalid."
    ),
    postal_code: Yup.string().matches(
      "^[0-9]{3}-[0-9]{4}|$",
      "postal_code is not invalid."
    ),
    prefecture: Yup.string().max(128, "max length is 128."),
    city: Yup.string().max(128, "max length is 128."),
    district: Yup.string().max(128, "max length is 128."),
    other_address: Yup.string().max(128, "max length is 128."),
    belong_user_id: Yup.string().required(),
  });

  const defaultValues = {
    id: "",
    name: "",
    office_phone_number: "",
    postal_code: "",
    prefecture: "",
    city: "",
    district: "",
    other_address: "",
    belong_user_id: "",
  };

  const methods = useForm({
    resolver: yupResolver(addBranchSchema),
    defaultValues,
  });
  const { reset, setValue, getValues, handleSubmit } = methods;
  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const [status, data] = await myAxios.put("/branch", {
      ...formData,
    });
    if (status === 200) {
      window.location.reload();
      close();
    } else {
      reset();
    }
  });

  const onChangePastalCode = () => {
    axios
      .get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${getValues(
          "postal_code"
        )}`
      )
      .then((res) => {
        if (res.status === 200) {
          setValue("prefecture", res.data.results[0].address1);
          setValue("city", res.data.results[0].address2);
          setValue("district", res.data.results[0].address3);
        }
      });
  };

  useEffect(() => {
    myAxios.get("/users/01").then(([status, data]) => {
      console.log([status, data]);
      if (status === 200) {
        setHeadUsers(data);
        const selfUser = data.find((item) => item.id == user.id);
        console.log(selfUser.id);
        setValue("belong_user_id", selfUser.id);
      }
    });

    myAxios.get(`/branch/${branch_id}`).then(([status, data]) => {
      if (status === 200) {
        setValue("id", data.id);
        setValue("name", !!data.name ? data.name : "");
        setValue(
          "office_phone_number",
          !!data.office_phone_number ? data.office_phone_number : ""
        );
        setValue("postal_code", !!data.postal_code ? data.postal_code : "");
        setValue("prefecture", !!data.prefecture ? data.prefecture : "");
        setValue("city", !!data.city ? data.city : "");
        setValue("district", !!data.district ? data.district : "");
        setValue(
          "other_address",
          !!data.other_address ? data.other_address : ""
        );
        setValue(
          "belong_user_id",
          !!data.belong_user_id ? data.belong_user_id : ""
        );
      }
    });
  }, [branch_id]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>支店編集</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="支店名称" />
              <RHFTextField name="office_phone_number" label="電話番号" />
              <Box>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <RHFTextField
                    name="postal_code"
                    label="郵便番号"
                    otherChange={onChangePastalCode}
                  />
                  <Typography variant="body2" sx={{ minWidth: "70%" }}>
                    ※入力すると自動的に住所が表示されます。
                  </Typography>
                </Stack>
              </Box>
              <RHFTextField name="prefecture" label="都道府県" />
              <RHFTextField name="city" label="市区郡" />
              <RHFTextField name="district" label="町村字丁目" />
              <RHFTextField name="other_address" label="補足住所" />
              <RHFSelect name="belong_user_id" label="本社管理者" type="number">
                {headUsers.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
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
