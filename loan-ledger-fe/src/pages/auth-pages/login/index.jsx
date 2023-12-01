import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// components
import FormProvider, { RHFTextField } from "@/components/hook-form";
import Iconify from "@/components/iconify/iconify";
// assets
import logoImage from "@/assets/logo.svg";
// hooks
import { useBoolean } from "@/hooks/use-boolean";
import { setObjectStorage, setStringStorage } from "@/hooks/use-local-storage";
//
import myAxios from "@/utils/myAxios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("");
  const password = useBoolean();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (formData) => {
    const [status, data] = await myAxios.post("/token", {
      email: formData.email,
      password: formData.password,
    });
    if (status === 200) {
      setStringStorage("access_token", data.access_token);
      setObjectStorage("user", jwtDecode(data.access_token))
      navigate(`/home`)
    } else {
      reset();
      setErrorMsg(data.message);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ width: 370, p: 2 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mb: 5 }}
        >
          <Box component="img" src={logoImage} width={40} />
          <Typography variant="h4">LOGIN</Typography>
          <Typography variant="h4">{""}</Typography>
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Iconify icon="vscode-icons:file-type-azure" />}
          >
            Azureでサインインする
          </Button>
          <Divider>
            <Typography variant="caption">OR</Typography>
          </Divider>

          <RHFTextField name="email" label="Eメール" />

          <RHFTextField
            name="password"
            label="パスワード"
            type={password.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify
                      icon={
                        password.value
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            variant="body2"
            color="inherit"
            underline="always"
            sx={{ alignSelf: "flex-end" }}
          >
            {""}
          </Link>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
