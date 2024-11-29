import React, { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginImage from "../../Assets/LoginImage.jpg";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "./TextFieldComponent";

export default function Recover() {
  const navigate = useNavigate();
  const { http } = AuthServices();

  const [formData, setFormData] = useState({ username: "" });
  const [errors, setErrors] = useState({});

  const [flagUsername, setFlagUsername] = useState(false);

  const [questionUser, setQuestionUser] = useState("");
  const [answerUser, setAnswerUser] = useState("");

  const [answer, setAnswer] = useState("");

  const handleSubmitUsername = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const response = await http.post("/existsUser", formData);

      if (response.data.status === 401) {
        setErrors(response.data);
      } else if (response.data.status === 200) {
        setQuestionUser(response.data.question.text);
        setAnswerUser(response.data.answer);
        setFlagUsername(true);
      } else {
        setErrors(response.data.validate_err);
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  function showUsername() {
    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitUsername}
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
          <TextFieldComponent
            label="Логин"
            value={formData.username}
            onChange={handleInputChange("username")}
            error={errors.message}
            helperText={errors.message}
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
      navigate("/recover/passwordChange", {
        state: { username: formData.username },
      });
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
            <TextFieldComponent label="Ваш вопрос" value={questionUser} />
          </Grid>
          <Grid item xs={12}>
          <TextFieldComponent
              label="Ответ на вопрос"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              error={errors.answer}
              helperText={errors.answer}
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
