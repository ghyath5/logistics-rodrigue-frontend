/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import axios from "../axios";
import Loader from "../components/layout/Loader";
import { useEffect } from "react";

const AddNewRoute = ({ isEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    places: [],
    description: "",
    from: "",
    to: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    from: false,
    to: false,
  });
  const [placesString, setPlacesString] = useState("");

  useEffect(() => {
    isEdit && fetchRouteById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchRouteById = async (id) => {
    setLoading(true);
    await axios
      .get(`/routes/${id}`)
      .then((res) => {
        let pl = "";
        res.data.places.forEach((place) => {
          pl = pl + place + "-";
        });
        setPlacesString(pl);
        setData({
          name: res.data.name,
          places: pl,
          description: res.data.description,
          from: res.data.from,
          to: res.data.to,
        });
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "places" ? setPlacesString(value) : null;

    setData((prev) => {
      return { ...prev, [name]: name === "places" ? value.split("-") : value };
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
    return valid;
  };

  const validate = (name, value) => {
    if (name === "name" || name === "from" || name === "to") {
      value &&
        (value.length < 3 ? hasError(name, true) : hasError(name, false));
    }
  };

  const handleAddNewRoute = () => {
    console.log(data);
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

  const handleUpdateRoute = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/routes/${location.state?.id}`, {
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
          {isEdit ? " Edit Route" : " Add New Route"}
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
                lable="Places (separate by -)"
                defaultValue="Places"
                type="text"
                name="places"
                value={placesString}
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
            title={isEdit ? "EDIT ROUTE" : "CREATE ROUTE"}
            handleClick={() =>
              isEdit ? handleUpdateRoute() : handleAddNewRoute()
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewRoute;
