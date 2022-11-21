import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/partials/Header";
import SideBar from "../components/partials/SideBar";

const PrivateRoutes = () => {
  const [isOpen, setOpen] = useState(true);

  let token = Cookies.get("monjayToken");
  return token ? (
    <>
      <Header isOpen={isOpen} setOpen={setOpen} />
      <SideBar isOpen={isOpen} setOpen={setOpen} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
