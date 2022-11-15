import React, { useState } from "react";
import bigLogo from "../../assets/logo_big.svg";
import AuthInput from "../../components/layout/AuthInput";
import BtnOutlined from "../../components/layout/BtnOutlined";
import BtnContained from "../../components/layout/BtnContained";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignUp = () => {
    nav("/register");
  };

  const handleLogin = () => {
    localStorage.setItem("monjayToken", "token");
    window.location.reload();
  };

  return (
    <div className="registrationContainer d-flex justify-content-center align-items-center">
      <div className="align-self-center mx-auto">
        <form className="registrationForm py-4 px-4">
          <h2 className="text-center mb-4 headerTitle">
            Login to My Monjay Account
          </h2>
          <AuthInput
            label="User Name"
            defaultValue="User Name"
            type="text"
            value={userName}
            setValue={setUserName}
            autoComplete="Off"
          />
          <AuthInput
            label="Password"
            defaultValue="Password"
            type="password"
            value={password}
            setValue={setPassword}
            autoComplete="off"
          />
          <div className="text-center mt-5">
            <BtnContained
              title="Login"
              classes="w-100"
              handleClick={() => handleLogin()}
            />
            <h6 className="mt-2">I've forgotten my password</h6>
          </div>
          <div className="text-center mt-3">
            {/* <p className="mt-2 mb-0">Don't have an account?</p> */}
            <BtnOutlined
              title="SIGN UP NOW"
              classes="w-100 mt-3"
              handleClick={handleSignUp}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
