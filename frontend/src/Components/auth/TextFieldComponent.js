import React from "react";
import { TextField } from "@mui/material";

export default function TextFieldComponent({ label, value, onChange, error }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      fullWidth
      required
      sx={{
        input: { color: "rgb(18,18,18)" },
        label: { color: "rgb(18,18,18)" },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": { borderColor: "rgba(18,18,18,0.7)" },
          "&.Mui-focused fieldset": { borderColor: "rgba(18,18,18,0.7)" },
        },
      }}
    />
  );
}
