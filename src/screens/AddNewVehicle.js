import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import axios from "../axios";
import Loader from "../components/layout/Loader";
import DDSearch from "../components/layout/DDSearch";
import { DatePickerr } from "../components/layout/DatePickers";
import { vehiclesStatuses } from "../data/configs";
import moment from "moment/moment";

const AddNewVehicle = ({ isEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    plate: "",
    model: "",
    make: "",
    color: "",
    expiresIn: moment("L"),
    status: "",
  });
  const [errors, setErrors] = useState({
    plate: false,
    model: false,
    make: false,
    color: false,
    expiresIn: false,
    status: false,
  });

  useEffect(() => {
    isEdit && fetchVehicleById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchVehicleById = async (id) => {
    setLoading(true);
    await axios
      .get(`/vehicles/${id}`)
      .then((res) => {
        setData({
          plate: res.data.plate,
          model: res.data.model,
          make: res.data.make,
          color: res.data.color,
          expiresIn: moment(new Date(res.data.expiresIn)).format("L"),
          status: vehiclesStatuses[res.data.status].value,
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

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const allVAlid = () => {
    let valid;
    let errs = Object.values(errors);
    errs.includes(true) ? (valid = false) : (valid = true);
    return valid;
  };

  const validate = (name, value) => {
    switch (name) {
      case "plate":
      case "make":
      case "model":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "color":
      case "expiresIn":
      case "status":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  const handleAddNewVehicle = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`/vehicles`, {
          plate: data.plate,
          model: data.model,
          make: data.make,
          color: data.color,
          expiresIn: data.expiresIn,
          status: data.status,
        })
        .then((res) => {
          setLoading(false);
          navigate("/vehicles");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleUpdateVehicle = () => {
    console.log("update");
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/vehicles/${location.state?.id}`, {
          plate: data.plate,
          model: data.model,
          make: data.make,
          color: data.color,
          expiresIn: data.expiresIn,
          status: data.status,
        })
        .then((res) => {
          setLoading(false);
          navigate("/vehicles");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
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
          onClick={() => navigate("/vehicles")}
        />
        <h4 className="headerTitle my-3 mx-2">
          {isEdit ? " Edit Vehicle" : " Add New Vehicle"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Vehicle Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="Model"
                lable="Model"
                defaultValue="Model"
                type="text"
                name="model"
                value={data?.model}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.model}
                errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="Make"
                lable="Make"
                defaultValue="Make"
                type="text"
                name="make"
                value={data?.make}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.make}
                errorMessage="should be at least 3 letters"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="Plate"
                lable="Licence Plate"
                defaultValue="Licence Plate"
                type="text"
                name="plate"
                value={data?.plate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.plate}
                errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="Color"
                lable="Color"
                defaultValue="Color"
                type="text"
                name="color"
                value={data?.color}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.color}
                errorMessage="you must select a color"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mx-sm-12">
              <DatePickerr
                id="regDue"
                lable="Registration Expiry Date"
                name="expiresIn"
                minDate={moment("L")}
                value={data?.expiresIn}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.expiresIn}
                errorMessage="you must select it's expiry date"
              />
            </div>
            <div className="col-md-6 mx-sm-12">
              <DDSearch
                name="status"
                lable="Status"
                options={vehiclesStatuses}
                isDisabled={false}
                isMulti={false}
                val={data?.status}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.status}
                errorMessage="you must select the status"
              />
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title={isEdit ? "UPDATE VEHICLE" : "CREATE VEHICLE"}
            handleClick={() =>
              isEdit ? handleUpdateVehicle() : handleAddNewVehicle()
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewVehicle;
