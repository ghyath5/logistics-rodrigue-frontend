import axios from "axios";
import React, { useState } from "react";
import AuthInput from "../../components/layout/AuthInput";
import Cookies from "js-cookie";
import BtnContained from "../../components/layout/BtnContained";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  // const [fullName, setFullName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState("");
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({
    username: false,
    name: false,
    email: false,
    phone: false,
    password: false,
    repass: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const validate = (name, value) => {
    switch (name) {
      case "username":
      case "name":
        value.length < 3
          ? setErrors((prev) => {
              return { ...prev, [name]: true };
            })
          : setErrors((prev) => {
              return { ...prev, [name]: false };
            });
        break;
      case "email":
        // code block
        break;
      case "phone":
        // code block
        break;
      case "password":
        value.length < 8
          ? setErrors((prev) => {
              return { ...prev, [name]: true };
            })
          : setErrors((prev) => {
              return { ...prev, [name]: false };
            });
        break;
      default:
        console.log("");
    }

    // handleRegisterUser();
  };

  const handleRegisterUser = () => {
    clearErrors();
    // axios
    //   .post(`${process.env.REACT_APP_BASE_URL}auth/register`, {
    //     name: data.name,
    //     username: data.username,
    //     email: data.email,
    //     phonenumber: data.phone,
    //     password: data.password,
    //     role: 1,
    //   })
    //   .then((res) => {
    //     Cookies.set("monjayToken", res.data.accessToken, { expires: 3 });
    //     navigate("/");
    //   })
    //   .catch(console.error);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="registrationContainer d-flex justify-content-center align-items-center">
      <div className="align-self-center">
        <form className="registrationForm py-4 px-4">
          <h2 className="text-center mb-2 headerTitle">
            Register to My Monjay Account
          </h2>
          <AuthInput
            label="Full Name"
            placeHolder="Full Name"
            type="text"
            name="name"
            value={data.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.name}
            errorMessage="should be at least 3 letters"
          />
          <AuthInput
            label="User Name"
            defaultValue="User Name"
            type="text"
            name="username"
            value={data.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.username}
            errorMessage="should be at least 3 letters"
          />
          <AuthInput
            label="Email"
            defaultValue="Email"
            type="email"
            name="email"
            value={data.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.email}
            errorMessage="not a valid email"
          />
          <AuthInput
            label="Phone Number"
            defaultValue="Phone Number"
            type="text"
            name="phone"
            value={data.phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            autoComplete="new-tel"
            error={errors?.phone}
            errorMessage="not a valid phone number"
          />
          <AuthInput
            label="Password"
            defaultValue="Password"
            type="password"
            name="password"
            value={data.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            autoComplete="new-password"
            error={errors?.password}
            errorMessage="weak password"
          />
          <AuthInput
            label="Re-enter Password"
            defaultValue="Password"
            type="password"
            name="repass"
            value={data.repass}
            handleChange={handleChange}
            handleBlur={handleBlur}
            autoComplete="new-password"
            error={errors?.repass}
            errorMessage="doesn't match"
          />
          <div className="text-center mt-4">
            <BtnContained
              title="Create"
              classes="w-100"
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
