import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RegisterImage from "../../Assets/RegisterImage.jpg";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RegisterForm from "./RegisterForm";

export default function Register() {
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
        </Box>
       <RegisterForm/>
      </Grid>
    </Grid>
  );
}
