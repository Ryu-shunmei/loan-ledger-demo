import { useFormContext, Controller } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, otherChange = null, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          inputProps={{style: {fontSize: 16}}}
          InputLabelProps={{style: {fontSize: 14}}}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
            if (otherChange){
              otherChange()
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
