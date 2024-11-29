import React, { useState } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import LoadingButton from "@mui/lab/LoadingButton";
import TextFieldComponent from "./TextFieldComponent";
import PasswordField from "./PasswordFieldComponent";

export default function LoginForm() {
  const navigate = useNavigate();
  const { http, setToken } = AuthServices();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await http.post("/login", formData);

      if (response.data.status === 40 || response.data.status === 401) {
        setErrors(response.data.validate_err || response.data);
      } else {
        setToken(response.data.access_token);
        navigate("/"); 
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setErrors(error.response?.data?.errors || {});
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={{ marginTop: "30%" }}
    >
      <Typography component="h1" variant="h5">
        Авторизоваться
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldComponent
              label="Логин"
              value={formData.username}
              onChange={handleInputChange("username")}
              error={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
          <PasswordField
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            background: "black",
            color: "white",
            "&:hover": { backgroundColor: "#fff", color: "black" },
          }}
        >
          Войти
        </LoadingButton>
        <Grid container direction="column" alignItems="center">
          <Link href="/recover" variant="body2" style={{ color: "black" }}>
            Забыли пароль?
          </Link>
          <Link href="/register" variant="body2" style={{ color: "black" }}>
            У вас нет аккаунта? Зарегистрироваться
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}
