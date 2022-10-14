import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Products from "./Products";
import Footer from "../components/Footer";
import Finalise from "./Finalise";
import Customers from "./Customers";

const Main = () => {
  return (
    <>
      <div className="position-relative mainContainer pt-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="products" element={<Products />} />
          <Route exact path="finalise" element={<Finalise />} />
          <Route exact path="customers" element={<Customers />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Main;
