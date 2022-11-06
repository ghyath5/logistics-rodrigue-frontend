import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./NotFound";

const AuthRoutes = ({ setToken }) => {
  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="login" element={<Login setToken={setToken} />} />
      <Route path="register" element={<Register setToken={setToken} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
