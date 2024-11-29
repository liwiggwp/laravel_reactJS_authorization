import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

export default function SelectFieldComponent({ label, value, onChange, options, error, name }) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      required
      error={!!error}
      sx={{
        label: {
          color: error ? "red" : "rgb(18,18,18)",
        },
        "& .MuiInputBase-root": { color: "rgb(18,18,18)" },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "rgba(18,18,18,0.7)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(18,18,18,0.7)",
          },
        },
        "& label.Mui-focused": {
          color: "rgba(18,18,18,0.7)",
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        required
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option.id}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
    </FormControl>
  );
}
