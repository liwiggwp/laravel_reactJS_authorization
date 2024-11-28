import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/HomePage";
import Login from "../Pages/auth/LoginPage";
import Register from "../Pages/auth/RegisterPage";
import Recover from "../Pages/auth/RecoverPage";
import PasswordChange from "../Components/auth/PasswordChange";
import Error404 from "../Pages/404";

function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path={Router.HOME} element={<Home />} />
      <Route path={Router.LOGIN} element={<Login />} />
      <Route path={Router.REGISTER} element={<Register />} />
      <Route path={Router.RECOVER} element={<Recover />} />
      <Route
        path={Router.RECOVER + Router.PASSWORD_CHANGE}
        element={<PasswordChange />}
      />
    </Routes>
  );
}

export default AppRouter;
