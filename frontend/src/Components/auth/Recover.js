import React, { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginImage from "../../Assets/LoginImage.jpg";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function Recover() {
  const navigate = useNavigate();
  const { http } = AuthServices();
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const [flagUsername, setFlagUsername] = useState(false);

  const [questionUser, setQuestionUser] = useState("");
  const [answerUser, setAnswerUser] = useState("");

  const [answer, setAnswer] = useState("");

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const data = {
      username,
    };
    // console.log(data);

    http
      .post("/existsUser", data)
      .then((response) => {
        if (response.data.status === 401) {
          setErrors(response.data);
          // console.log(response.data);
        } else if (response.data.status === 200) {
          // console.log(response.data);
          setQuestionUser(response.data.question.text);
          setAnswerUser(response.data.answer);
          setFlagUsername(true);
        } else {
          setErrors(response.data.validate_err);
          // console.log(response.data.validate_err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function showUsername() {
    return (
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
          Введите ваш логин
        </Typography>
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
            error={errors.message ? true : false}
            helperText={errors.message ? errors.message : ""}
          />
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
    );
  }
  const handleSubmitQuestion = (event) => {
    event.preventDefault();

    if (answer === answerUser) {
      // console.log("good");
      navigate("/recover/passwordChange", { state: { username } });
    } else {
      setErrors({ answer: "Неправильный ответ" });
    }
  };

  function showQuestionAndAnswer() {
    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitQuestion}
        sx={{ mt: 1 }}
      >
        <Typography
          component="h4"
          variant="body2"
          align="center"
          sx={{ mb: 1 }}
        >
          Напиши ответ на вопрос
        </Typography>
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
              id="outlined-read-only-input"
              label="Ваш вопрос"
              value={questionUser}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{
                input: { color: "rgb(18,18,18)" },
                label: { color: errors && errors.answer ? "red" : "rgb(18,18,18)", },
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
              helperText={errors && errors.answer ? errors.answer : ""}
            />
          </Grid>
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
            color: "white",
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
    );
  }

  function rec(flagUsername) {
    if (flagUsername === false) {
      return showUsername();
    } else {
      return showQuestionAndAnswer();
    }
  }

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
              {rec(flagUsername)}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
