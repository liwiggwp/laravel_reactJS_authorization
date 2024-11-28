import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthServices() {
  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem("jwt_token");
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem("jwt_token", token);
    setToken(token);
    navigate("/");
  };

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const logout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  return {
    setToken: saveToken,
    token,
    getToken,
    http,
    logout,
  };
}
