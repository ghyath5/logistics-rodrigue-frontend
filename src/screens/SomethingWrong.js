import React, { useEffect, useState } from "react";
import ErrorGif from "../assets/error.gif";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";

const SomethingWrong = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    setErrorCode(location?.search?.split("?")[1]);
  }, [location]);

  return (
    <div>
      <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
        <img
          className="w-100 mt-5"
          style={{ maxWidth: "100%", objectFit: "contain" }}
          src={ErrorGif}
          alt="error gif placeholder"
        />
        <h3
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} mb-4 text-uppercase`}
        >
          {errorCode === "ERR_NETWORK"
            ? "Network Error"
            : errorCode === "403"
            ? "Access Forbidden"
            : errorCode === "404"
            ? "Not Found"
            : errorCode === "500"
            ? "server error"
            : errorCode === "399"
            ? "Bad Request"
            : errorCode === "400"
            ? "Bad Request"
            : "Something Went Wrong"}
        </h3>
        <BtnContained title="Go back" handleClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default SomethingWrong;
