import React, { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginImage from "../../Assets/LoginImage.jpg";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PasswordField from "./PasswordFieldComponent";
import LoadingButton from "./LoadingButtonComponent";

export default function PasswordChange() {
  const navigate = useNavigate();
  const { http } = AuthServices();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: location.state.username,
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await http.post("/reset-password", formData);

      if (response.data.status === 200) {
        navigate("/login");
      } else {
        setErrors(response.data.validate_err);
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid container>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            style={{ backgroundImage: `url(${LoginImage})` }}
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ background: "#EAEAEA", color: "rgba(0, 0, 0, 0.87)" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>{" "}
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
                Восстановление пароля
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Typography
                  component="h4"
                  variant="body2"
                  align="center"
                  sx={{ mb: 1 }}
                >
                  Введите новый пароль
                </Typography>
                <Grid item xs={12}>
                  <PasswordField
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    error={errors.password}
                  />
                </Grid>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Продолжить
                </LoadingButton>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Link
                      href="/login"
                      variant="body2"
                      style={{ color: "black", textDecorationColor: "black" }}
                    >
                      У вас уже есть аккаунт? Войти
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
