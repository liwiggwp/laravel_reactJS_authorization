import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/HomePage";
import Login from "../Pages/auth/LoginPage";
import Register from "../Pages/auth/RegisterPage";

function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Home />} />
      <Route path={Router.LOGIN} element={<Login />} />
      <Route path={Router.REGISTER} element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
