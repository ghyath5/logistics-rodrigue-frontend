import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/partials/Layout";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import axios from "../axios";
import { useEffect } from "react";
import Loader from "../components/layout/Loader";

const AddNewDriver = ({ isEdit }) => {
  const [isLoading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [data, setData] = useState({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isEdit && fetchDriverById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchDriverById = async (id) => {
    setLoading(true);
    await axios
      .get(`/drivers/${id}`)
      .then((res) => {
        setData({
          name: res.data?.name,
          phone: res.data?.phone,
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
      case "name":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "phone":
        value &&
          (value.length < 6 ? hasError(name, true) : hasError(name, false));
        break;
      default:
    }
  };

  const handleAddDriver = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`/drivers`, {
          name: data.name,
          phone: data.phone,
        })
        .then((res) => {
          setLoading(false);
          navigate("/drivers");
        })
        .catch(
          (err) =>
            err.response.status === 400 &&
            setReqError(err.response.data.message)
        );
    }
  };

  const handleUpdateDriver = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/drivers/${location.state?.id}`, {
          name: data.name,
          phone: data.phone,
        })
        .then(() => {
          setLoading(false);
          navigate("/drivers");
        })
        .catch(
          (err) =>
            err.response.status === 400 &&
            setReqError(err.response.data.message)
        );
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
          onClick={() => navigate("/drivers")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? "Edit Driver" : "Add New Driver"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Driver Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-12">
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
            <div className="col-12">
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
        </div>
        <div className="mt-3 mb-1 w-100 d-flex justify-content-center">
          <p className="errorText"> {reqError !== "" && reqError}</p>
        </div>
        <div className="my-2 text-center">
          <BtnContained
            title={isEdit ? "UPDATE DRIVER" : "CREATE DRIVER"}
            handleClick={isEdit ? handleUpdateDriver : handleAddDriver}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewDriver;
