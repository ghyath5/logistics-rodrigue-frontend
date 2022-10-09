import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Products from "./Products";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <>
      <div className="position-relative px-2 py-2 px-sm-4 py-sm-2 mainContainer">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Main;
