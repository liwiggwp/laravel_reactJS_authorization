import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadingButtonComponent({
  loading,
  onClick,
  type = "button",
  variant = "contained",
  children,
  sx = {},
  ...props
}) {
  return (
    <LoadingButton
      loading={loading}
      type={type}
      variant={variant}
      onClick={onClick}
      sx={{
        background: "black",
        color: "white",
        "&:hover": { backgroundColor: "#fff", color: "black" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}
