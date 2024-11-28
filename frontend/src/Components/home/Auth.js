import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import AuthServices from "../../Services/AuthServices";

export default function Auth() {
  const { token, logout } = AuthServices();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
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
