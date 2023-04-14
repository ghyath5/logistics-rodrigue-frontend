import React, { useState } from "react";
import AuthInput from "../../components/layout/AuthInput";
// import BtnOutlined from "../../components/layout/BtnOutlined";
import BtnContained from "../../components/layout/BtnContained";
import Loader from "../../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // const handleSignUp = () => {
  //   navigate("/register");
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = () => {
    setLoading(true);
    setError(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
        username: data?.username,
        password: data?.password,
      })
      .then((res) => {
         Cookies.set("monjayToken", res.data.accessToken, { expires: 3 });
        Cookies.set("monjayUser", res.data.name, { expires: 3 });
        res.data.role === 1 && Cookies.set("zzzz", 1, { expires: 3 });
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="registrationContainer d-flex justify-content-center align-items-center">
      <div className="align-self-center mx-auto">
        <form className="registrationForm py-4 px-4" onSubmit={onSubmit}>
          <h2 className="text-center mb-4 headerTitle">
            Login to My Monjay Account
          </h2>
          <AuthInput
            label="User Name"
            defaultValue="User Name"
            type="text"
            name="username"
            value={data?.username}
            handleChange={handleChange}
            autoComplete="Off"
          />
          <AuthInput
            label="Password"
            defaultValue="Password"
            type="password"
            name="password"
            value={data?.password}
            handleChange={handleChange}
            autoComplete="Off"
          />
          {error && (
            <div className="position-relative">
              <div className="errorMessageContainer text-center">
                Wrong username or password
              </div>
            </div>
          )}
          {isLoading && (
            <div className="position-relative">
              <Loader small />
            </div>
          )}
          <div className="text-center mt-5">
            <BtnContained
              type="submit"
              title="Login"
              classes="w-100"
              handleClick={() => handleLogin()}
            />
            {/* <h6 className="mt-2">I've forgotten my password</h6> */}
          </div>
          {/* <div className="text-center mt-3">
            <BtnOutlined
              title="SIGN UP NOW"
              classes="w-100 mt-3"
              handleClick={handleSignUp}
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
