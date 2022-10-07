import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Products from "./Products";

const Main = () => {
  return (
    <div className="position-relative mainContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
