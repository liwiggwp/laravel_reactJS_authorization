import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
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
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const genderOptions = [
  { value: "0", label: "Мужской" },
  { value: "1", label: "Женский" },
];

export default function Register() {
  const navigate = useNavigate();
  const { http } = AuthServices();

  const [gender, setGender] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState("");

  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getQuestions = async () => {
      const res = await http.get("/questions");
      setQuestions(res.data);
    };
    getQuestions();
  }, []);

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
        .post("/register", {
          username: data.get("username"),
          gender: data.get("gender"),
          question_id: data.get("question_id"),
          answer: data.get("answer"),
          password: data.get("password"),
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.status === 200) {
            navigate("/login");
          } else {
            setErrors(response.data.validate_err);
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
            onSubmit={handleSubmit}
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
                  error={errors && errors.username ? true : false}
                  helperText={errors && errors.username ? errors.username : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  sx={{
                    label: {
                      color: errors && errors.gender ? "red" : "rgb(18,18,18)",
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
                  <InputLabel>Пол</InputLabel>
                  <Select
                    label="Пол"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    error={errors && errors.gender ? true : false}
                  >
                    {genderOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors && errors.gender && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.gender}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  sx={{
                    label: {
                      color:
                        errors && errors.questionId ? "red" : "rgb(18,18,18)",
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
                  <InputLabel>Вопрос</InputLabel>
                  <Select
                    label="Вопрос"
                    name="question_id"
                    value={questionId}
                    onChange={(e) => setQuestionId(e.target.value)}
                    error={errors && errors.question_id ? true : false}
                  >
                    {questions.map((option, i) => (
                      <MenuItem key={i} value={option.id}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors && errors.question_id && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.question_id}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
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
                  name="answer"
                  required
                  fullWidth
                  id="answer"
                  label="Ответ на вопрос"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  error={errors && errors.answer ? true : false}
                  helperText={errors && errors.answer ? errors.answer[0] : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
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
                    error={errors && errors.password ? true : false}
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
