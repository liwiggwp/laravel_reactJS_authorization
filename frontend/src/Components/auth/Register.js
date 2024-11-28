import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RegisterImage from "../../Assets/RegisterImage.jpg";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";

const genderOptions = [
  { value: "0", label: "Мужской" },
  { value: "1", label: "Женский" },
];

export default function Register() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState("");

  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    navigate("/");
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{ backgroundImage: `url(${RegisterImage})` }}
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
        style={{ background: "#EAEAEA", color: "rgba(0, 0, 0, 0.87)" }}
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
          style={{ marginTop: "20%" }}
        >
          <Typography component="h1" variant="h5">
            Зарегистрироваться
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                
                >
                  <InputLabel>Пол</InputLabel>
                  <Select
                    label="Пол"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {genderOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
       
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                
                >
                  <InputLabel>Вопрос</InputLabel>
                  <Select
                    label="Вопрос"
                    name="question_id"
                    value={questionId}
                    onChange={(e) => setQuestionId(e.target.value)}
                  >
                    {questions.map((option, i) => (
                      <MenuItem key={i} value={option.id}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
            
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: { color: "rgb(18,18,18)" },
                    label: { color: "rgb(18,18,18)" },
                    // "& .MuiOutlinedInput-root": {
                    //   "&:hover fieldset": {
                    //     borderColor: "rgba(18,18,18,0.7)",
                    //   },
                    // },
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
                  name="answer"
                  required
                  fullWidth
                  id="answer"
                  label="Ответ на вопрос"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                 
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    label="Пароль"
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
                  />
                
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
                color: "white",
                borderStyle: "solid",
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
              Зарегистрироваться
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
  );
}
