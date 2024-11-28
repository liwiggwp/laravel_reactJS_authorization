import React, { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export default function PasswordChange() {
  const navigate = useNavigate();
  const { http } = AuthServices();
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { username } = location.state;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    // console.log(data);
    http
      .post("/reset-password", data)
      .then((response) => {
        if (response.data.status === 200) {
        //   console.log(response.data);
          navigate("/login");
        } else {
          setErrors(response.data.validate_err);
        //   console.log(response.data.validate_err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid container>
          <CssBaseline />
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
                onSubmit={handleSubmitLogin}
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
                  <FormControl
                    variant="outlined"
                    fullWidth
                    required
                    sx={{
                      input: { color: "rgb(18,18,18)" },
                      label: {
                        color: errors.password ? "red" : "rgb(18,18,18)",
                      },
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
                    <InputLabel htmlFor="outlined-adornment-password">
                      Пароль
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      label="Пароль"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={errors.password ? true : false}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "black",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    color:"white",  
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "black",
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    },
                  }}
                >
                  Продолжить
                </Button>
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
