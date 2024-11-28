import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import AuthServices from "../Services/AuthServices";
import Guest from "../Components/home/Guest";
import Auth from "../Components/home/Auth";

export default function Home() {
  const {getToken} = AuthServices();
  if(!getToken()){
    return <Guest />
  }
  return (
      <Auth />
  );

}
