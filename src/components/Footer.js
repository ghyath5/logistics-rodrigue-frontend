import React from "react";
import footerLogo from "../assets/footerLogo.svg";

const Footer = () => {
  return (
    <div className="d-flex align-items-center justify-content-end me-4">
      <p className="m-0 textGray">powered by</p>
      <img src={footerLogo} alt="footerLogo" />
    </div>
  );
};

export default Footer;
