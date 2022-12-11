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
import DDSearch from "../components/layout/DDSearch";

const rolesOps = [
  { label: "Admin", value: "1" },
  { label: "User", value: "0" },
  { label: "Driver", value: "2" },
];

const AddNewStaffMember = () => {
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    theme: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    name: false,
    email: false,
    role: false,
    phone: false,
    password: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEdit(location.state?.edit);
  }, [location.state?.edit]);

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
          role: res.data?.role.toString(),
          theme: res.data?.theme,
          // password: res.password,
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
          (validator.isMobilePhone(value.toString(), ["en-AU"])
            ? hasError(name, false)
            : hasError(name, true));
        break;
      case "password":
        value &&
          (validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
            ? hasError(name, false)
            : hasError(name, true));
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
          role: data.role,
          // theme: "0",
        })
        .then((res) => {
          setLoading(false);
          navigate("/staffmembers");
        })
        .catch(console.error);
    }
  };

  const handleUpdateStaffMember = () => {
    if (allVAlid()) {
      setLoading(true);
      customAxios
        .put(`users/${location.state?.id}`, {
          name: data.name,
          username: data.username,
          email: data.email,
          phonenumber: data.phone,
          password: data.password,
          role: data.role,
          // theme: "0",
        })
        .then((res) => {
          setLoading(false);
          navigate("/staffmembers");
        })
        .catch(console.error);
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
        <h4 className="headerTitle my-3 mx-2">
          {isEdit ? "Edit Staff Member" : "Add New Staff Member"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Staff Member Details</h4>
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
                <DDSearch
                  name="role"
                  lable="Select a role"
                  options={rolesOps}
                  isDisabled={false}
                  isMulti={false}
                  val={data?.role}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors?.role}
                  errorMessage="please pick a role"
                />
              </div>
            </div>
            {!isEdit && (
              <div className="col-sm-12 col-md-6">
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
                  errorMessage="weak password"
                  autoComplete="new-password"
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-5 text-center">
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
