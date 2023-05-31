import React, { useEffect } from "react";
import ErrorGif from "../assets/error.gif";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";

const SomethingWrong = () => {
  let navigate = useNavigate();
  let location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);
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
          {location?.search?.split("?")[1] === "ERR_NETWORK"
            ? "Network Error"
            : "Something Went Wrong"}
        </h3>
        <BtnContained title="Go back" handleClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default SomethingWrong;
