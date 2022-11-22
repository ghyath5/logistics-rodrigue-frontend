import React, { useState } from "react";
import AuthInput from "../../components/layout/AuthInput";
import BtnOutlined from "../../components/layout/BtnOutlined";
import BtnContained from "../../components/layout/BtnContained";
import Loader from "../../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Login = () => {
  const [isLoading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = () => {
    setError(false);
    setSending(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
        username: data?.username,
        password: data?.password,
      })
      .then((res) => {
        setSending(false);
        Cookies.set("monjayToken", res.data.accessToken, { expires: 3 });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setSending(false);
        setError(true);
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
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
          {sending && (
            <div className="position-relative">
              <Loader small />
            </div>
          )}
          <div className="text-center mt-5">
            <BtnContained
              title="Login"
              classes="w-100"
              handleClick={() => handleLogin()}
            />
            <h6 className="mt-2">I've forgotten my password</h6>
          </div>
          <div className="text-center mt-3">
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
