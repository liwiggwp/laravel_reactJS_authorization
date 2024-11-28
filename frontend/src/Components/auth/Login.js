import React, { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginImage from "../../Assets/LoginImage.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
  const navigate = useNavigate();
  const { http, setToken } = AuthServices();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(event.currentTarget);
      http
        .post("/login", {
          username: data.get("username"),
          password: data.get("password"),
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.status === 40) {
            setErrors(response.data.validate_err);
            setLoading(false);
          } else if (response.data.status === 401) {
            setErrors(response.data);
            setLoading(false);
          } else {
            setToken(response.data.access_token);
            setLoading(false);
          }
        });
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };
  return (
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
              Авторизоваться
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      input: { color: "rgb(18,18,18)" },
                      label: { color: "rgb(18,18,18)" },
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
                    autoComplete="given-name"
                    id="username"
                    name="username"
                    label="Логин"
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors && errors.username ? true : false}
                    helperText={
                      errors && errors.username ? errors.username : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    error={errors && errors.password ? true : false}
                    fullWidth
                    required
                    sx={{
                      input: { color: "rgb(18,18,18)" },
                      label: {
                        color:
                          errors && errors.password ? "red" : "rgb(18,18,18)",
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
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors && errors.password && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
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
                  borderColor: "black",
                  borderStyle: "solid",
                  color: "white",
                  borderWidth: "1px",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "black",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "1px",
                  },
                }}
              >
                Войти
              </LoadingButton>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs>
                  <Link
                    href="/recover"
                    variant="body2"
                    style={{ color: "black", textDecorationColor: "black" }}
                  >
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    style={{ color: "black", textDecorationColor: "black" }}
                  >
                    {"У вас нет аккаунта? Зарегистрироваться"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
