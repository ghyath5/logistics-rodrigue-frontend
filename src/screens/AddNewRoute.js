import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import axios from "../axios";
import Loader from "../components/layout/Loader";

const AddNewRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    places: "",
    description: "",
    from: "",
    to: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    from: false,
    to: false,
  });

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
    for (const [key, value] of Object.entries(data)) {
      if (key !== "note" && key !== "places" && value === "") {
        hasError(key, true);
        valid = false;
      }
    }
    console.log(valid);
    return valid;
  };

  const validate = (name, value) => {
    if (name === "name" || name === "from" || name === "to") {
      value &&
        (value.length < 3 ? hasError(name, true) : hasError(name, false));
    }
  };

  const handleAddNewRoute = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`/routes`, {
          name: data.name,
          places: data.places,
          description: data.description,
          from: data.from,
          to: data.to,
        })
        .then((res) => {
          setLoading(false);
          navigate("/routes");
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
          onClick={() => navigate("/routes")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          Add New Route
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Route Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <InputOutlined
            id="name"
            lable="Name"
            defaultValue="Name"
            type="text"
            name="name"
            value={data?.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.name}
            errorMessage="should be at least 3 letters"
          />
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="from"
                lable="From"
                defaultValue="From"
                type="text"
                name="from"
                value={data?.from}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.from}
                errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="to"
                lable="To"
                defaultValue="To"
                type="text"
                name="to"
                value={data?.to}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.to}
                errorMessage="should be at least 3 letters"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="places"
                lable="Places"
                defaultValue="Places"
                type="text"
                name="places"
                value={data?.places}
                handleChange={handleChange}
                handleBlur={handleBlur}
                // error={errors?.places}
                // errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="description"
                lable="Description"
                defaultValue="Description"
                type="text"
                name="description"
                value={data?.description}
                handleChange={handleChange}
                handleBlur={handleBlur}
                // error={errors?.note}
                // errorMessage="you must select a color"
              />
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title="CREATE ROUTE"
            handleClick={() => handleAddNewRoute()}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewRoute;
