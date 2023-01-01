import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
// import Register from "./auth/Register";
import NotFound from "./NotFound";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="register" element={<Register />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
