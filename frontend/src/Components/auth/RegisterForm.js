import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import LoadingButton from "./LoadingButtonComponent";
import TextField from "./TextFieldComponent";
import PasswordField from "./PasswordFieldComponent";
import SelectField from "./SelectFieldComponent";

const genderOptions = [
  { id: "0", text: "Мужской" },
  { id: "1", text: "Женский" },
];
export default function RegisterForm() {
  const navigate = useNavigate();
  const { http } = AuthServices();

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    question_id: "",
    answer: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const res = await http.get("/questions");
      setQuestions(res.data);
    };
    getQuestions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await http.post("/register", formData);

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
              label="Логин"
              value={formData.username}
              onChange={handleInputChange("username")}
              error={errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              label="Пол"
              value={formData.gender}
              onChange={(e) => handleInputChange("gender")(e)}
              options={genderOptions}
              error={errors.gender}
              name="gender"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              label="Вопрос"
              value={formData.question_id}
              onChange={(e) => handleInputChange("question_id")(e)}
              options={questions.map((q) => ({
                id: q.id,
                text: q.text,
              }))}
              error={errors.question_id}
              name="question_id"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ответ на вопрос"
              value={formData.answer}
              onChange={handleInputChange("answer")}
              error={errors.answer}
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
          sx={{ mt: 3, mb: 2 }}
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
  );
}
