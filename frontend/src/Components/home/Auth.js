import React, { useState, useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import AuthServices from "../../Services/AuthServices";

export default function Auth() {
  const { http, token, logout } = AuthServices();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const res = await http.get("/me");
      setUser(res.data);
    };
    getUser();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать, {user.username}!
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h1" gutterBottom>
          Home page
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={logoutUser}>
          {"Выйти"}
        </Button>
      </Grid>
    </Grid>
  );
}
