import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/partials/Layout";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import validator from "validator";
import axios from "axios";
import customAxios from "../axios";
import { useEffect } from "react";
import Loader from "../components/layout/Loader";

const AddNewStaffMember = ({ isEdit }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    theme: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    name: false,
    email: false,
    role: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [reqError, setReqError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isEdit && fetchUserById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchUserById = async (id) => {
    setLoading(true);
    await customAxios
      .get(`/users/${id}`)
      .then((res) => {
        setData({
          username: res.data?.username ? res.data?.username : res.data?.name,
          name: res.data?.name,
          email: res.data?.email,
          phone: res.data?.phonenumber,
          role: res.data?.role,
          theme: res.data?.theme,
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      })
      .catch(console.error);
  };

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

  const allVAlid = () => {
    let valid;
    let errs = Object.values(errors);
    errs.includes(true) ? (valid = false) : (valid = true);
    return valid;
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const validate = (name, value) => {
    switch (name) {
      case "username":
      case "name":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "email":
        value &&
          (validator.isEmail(value)
            ? hasError(name, false)
            : hasError(name, true));
        break;
      case "phone":
        value &&
          (value.length < 6 ? hasError(name, true) : hasError(name, false));
        break;
      case "password":
        value && value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value)
          ? hasError(name, false)
          : hasError(name, true);
        break;
      case "confirmPassword":
        value && value === data.password
          ? hasError(name, false)
          : hasError(name, true);
        break;
      case "role":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  const handleAddStaffMember = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}auth/register`, {
          name: data.name,
          username: data.username,
          email: data.email,
          phonenumber: data.phone,
          password: data.password,
          role: 1,
          // theme: "0",
        })
        .then((res) => {
          setLoading(false);
          navigate("/staffmembers");
        })
        .catch((err) => {
          err.response.status === 400 && setReqError(err.response.data.error);
        });
    }
  };

  const handleUpdateStaffMember = () => {
    let body =
      data?.password?.length > 0 && data?.password === data?.confirmPassword
        ? {
            name: data.name,
            username: data.username,
            email: data.email,
            phonenumber: data.phone,
            password: data.password,
            role: 1,
          }
        : {
            name: data.name,
            username: data.username,
            email: data.email,
            phonenumber: data.phone,
            role: 1,
          };
    if (allVAlid()) {
      setLoading(true);
      customAxios
        .put(`users/${location.state?.id}`, body)
        .then(() => {
          setLoading(false);
          navigate("/staffmembers");
        })
        .catch((err) => {
          err.response.status === 400 && setReqError(err.response.data.error);
        });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => navigate("/staffmembers")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? "Edit Staff Member" : "Add New Staff Member"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Staff Member Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="Username"
                lable="Username"
                defaultValue="username"
                type="text"
                name="username"
                value={data?.username}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.username}
                errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                name="name"
                id="name"
                lable="Name"
                defaultValue="name"
                type="text"
                value={data?.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.name}
                errorMessage="should be at least 3 letters"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                name="email"
                id="email"
                lable="Email Address"
                defaultValue="Email Address"
                type="email"
                value={data?.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.email}
                errorMessage="not a valid email"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                name="phone"
                id="phone"
                lable="Phone Number"
                defaultValue="phone number"
                type="text"
                value={data?.phone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.phone}
                errorMessage="not a valid phone number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="mt-2">
                <InputOutlined
                  name="password"
                  id="password"
                  lable="Password"
                  defaultValue="password"
                  type="password"
                  value={data?.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors?.password}
                  errorMessage="must be 8 chars long with 1 capital letter"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="mt-2">
                <InputOutlined
                  name="confirmPassword"
                  id="confirmPassword"
                  lable="Confirm password"
                  defaultValue="confirm password"
                  type="password"
                  value={data?.confirmPassword}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors?.confirmPassword}
                  errorMessage="passwords don't match"
                  autoComplete="new-confirmPassword"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-1 w-100 d-flex justify-content-center">
          <p className="errorText"> {reqError !== "" && reqError}</p>
        </div>
        <div className="my-2 text-center">
          <BtnContained
            title={isEdit ? "UPDATE" : "CREATE STAFF MEMBER"}
            handleClick={
              isEdit ? handleUpdateStaffMember : handleAddStaffMember
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewStaffMember;
