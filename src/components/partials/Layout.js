import React from "react";
import Footer from "./Footer";

const Layout = ({ children, dashboard }) => {
  return (
    <div className="mainContainer pt-4">
      <div
        className={`container py-2 py-sm-2 ${
          dashboard ? "mt-2" : "mt-4 mt-sm-5"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
