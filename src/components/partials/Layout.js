import React, { useEffect } from "react";
import { useState } from "react";
import Footer from "./Footer";

const Layout = ({ children, dashboard }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    setTheme(t);
    document.documentElement.style.setProperty(
      "--bg-color",
      t === "light" ? "#fafafa" : "#353f4a"
    );
  }, []);

  return (
    <div className={`mainContainer pt-4 ${theme}-theme`}>
      <div
        className={`container  py-2 py-sm-2 ${
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
