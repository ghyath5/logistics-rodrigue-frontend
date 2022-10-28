import React from "react";

const Layout = ({ children, dashboard }) => {
  return (
    <div
      className={`container py-2 py-sm-2 ${
        dashboard ? "mt-2" : "mt-4 mt-sm-5"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
