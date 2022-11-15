import React, { useState } from "react";
import bigLogo from "../../assets/logo_big.svg";
import AuthInput from "../../components/layout/AuthInput";
import BtnOutlined from "../../components/layout/BtnOutlined";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = () => {
    localStorage.setItem("monjayToken", "token");
    window.location.reload();
  };

  return (
    <div className="registrationContainer d-flex justify-content-center align-items-center">
      <div className="align-self-center">
        <form className="registrationForm pt-5 pb-4 px-4">
          <h2 className="text-center mb-4 headerTitle">
            Register to My Monjay Account
          </h2>
          <AuthInput
            label="Full Name"
            placeHolder="Full Name"
            type="text"
            value={fullName}
            setValue={setFullName}
          />
          <AuthInput
            label="User Name"
            defaultValue="User Name"
            type="text"
            value={userName}
            setValue={setUserName}
          />
          <AuthInput
            label="Email"
            defaultValue="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <AuthInput
            label="Phone Number"
            defaultValue="Phone Number"
            type="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
            autoComplete="new-tel"
          />
          <AuthInput
            label="Password"
            defaultValue="Password"
            type="password"
            value={password}
            setValue={setPassword}
            autoComplete="new-password"
          />
          <div className="text-center mt-4">
            <BtnOutlined
              title="Create"
              handleClick={() => {
                handleRegisterUser();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
