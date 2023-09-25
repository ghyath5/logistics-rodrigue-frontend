/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import axios from "../axios";
import Loader from "../components/layout/Loader";
import DDSearch from "../components/layout/DDSearch";
import { useQuery } from "@tanstack/react-query";
import { regionDays } from "../data/regionDays";
const AddNewRoute = ({ isEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [scheduledDays, setScheduledDays] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    from: false,
    to: false,
  });
  const [placesString, setPlacesString] = useState("");
  const [reqError, setReqError] = useState("");
  // const [calledCustomers, setCalledCustomers] = useState([]);
  const [scheduledDaysError, setScheduledDaysError] = useState(false);


    const fetchRoutes = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const response = await axios.get(`/routes/${location.state?.id}`); 
       const data = response.data;
      return data;
    },
    enabled:isEdit
  })


  
  const [data, setData] = useState({
    name: "",
    places: [],
    description: "",
    from: "",
    to: "",
    scheduledDays:[]
  });

  useEffect(() => {
    if (isEdit && !fetchRoutes.isLoading && fetchRoutes.data) {
      setData({
        name: fetchRoutes.data.name ?? "",
        places: fetchRoutes.data.places ?? [],
        description: fetchRoutes.data.description ?? "",
        from: fetchRoutes.data.from ?? "",
        to: fetchRoutes.data.to ?? "",
       scheduledDays:fetchRoutes.data.scheduledDays.map(item => item.day) ?? []
      });
    }
  }, [isEdit, fetchRoutes.isLoading, fetchRoutes.data]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "places" ? setPlacesString(value) : null;

    setData((prev) => {
      return { ...prev, [name]: name === "places" ? value.split("-") : value };
    });
  };

  const handleChangeScheduledDays = (e) => {
    let values = e.target.value.map((item) => parseInt(item));
    let resultArray = values.map((item) => ({ [item]: {} }));
    resultArray.sort((a, b) => Object.keys(b)[0] - Object.keys(a)[0]);
    setScheduledDays(values);
    setScheduledDaysError(false);
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
      if (key !== "description" && key !== "places" && value === "") {
        hasError(key, true);
        valid = false;
      }
    }

    if (scheduledDays.length === 0) {
      valid = false;
      setScheduledDaysError(true);
    }
    return valid;
  };

  const validate = (name, value) => {
    if (name === "scheduledDays") {
      value.length === 0
        ? setScheduledDaysError(true)
        : setScheduledDaysError(false);
    }
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
          scheduledDays: activeDays.map((day) => ({
            day: day.day,
            calledCustomers: [],
          })),
        })
        .then(() => {
          navigate("/regions");
        })
        .catch((err) => {
          err.response.status === 400 && setReqError(err.response.data.error);
        })
        .finally(() => setLoading(false));
    }
  };

  let activeDays = scheduledDays.map((day) => ({ day }));
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
          scheduledDays: activeDays.map((day) => ({
            day: day.day,
            calledCustomers: [],
          })),
        })
        .then(() => {
          navigate("/regions");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return isLoading? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => navigate("/regions")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? " Edit Region" : " Add New Region"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Region Details
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
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <DDSearch
                name="scheduledDays"
                lable="Scheduled days"
                options={regionDays}
                isDisabled={false}
                isMulti={true}
                oldValue={ data.scheduledDays }
                handleChange={handleChangeScheduledDays}
                handleBlur={handleBlur}
                error={scheduledDaysError}
                errorMessage="please select scheduled days"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 mb-1 w-100 d-flex justify-content-center">
          <p className="errorText"> {reqError !== "" && reqError}</p>
        </div>
        <div className="my-2 text-center">
          <BtnContained
            title={isEdit ? "EDIT Region" : "CREATE Region"}
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
