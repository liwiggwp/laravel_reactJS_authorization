import React from "react";
import { Button, Typography, Grid } from "@mui/material";

export default function Home() {
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
        <Button variant="contained" href="/login">
          {"Войти"}
        </Button>
      </Grid>
    </Grid>
  );
}
