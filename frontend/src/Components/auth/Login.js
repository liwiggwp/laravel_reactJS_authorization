import React from "react";
import { Grid, Paper, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginImage from "../../Assets/LoginImage.jpg";

export default function Login() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <LoginForm />
      </Grid>
    </Grid>
  );
}
