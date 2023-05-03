import React, { useState, useEffect } from "react";
import RadioGroupForm from "../layout/RadioGroupForm";
import InputOutlined from "../layout/InputOutlined";
import DDSearch from "../layout/DDSearch";
import axios from "../../axios";

const days = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const Form3 = ({ errors, occurs, data, handleChange, handleBlur }) => {
  const [routes, setRoutes] = useState([]);
  console.log("data", data);
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    await axios
      .get("routes")
      .then((res) => {
        res.data.routes.forEach((rt) => {
          setRoutes((prev) => [...prev, { label: rt.name, value: rt._id }]);
        });
      })
      .catch(console.error);
  };

  return (
    <div className="mx-1 mx-sm-2 mt-sm-4">
      <h5 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
        Deliveries Details
      </h5>
      <div className="formsContainer px-0 px-sm-3 py-3 w-100">
        <RadioGroupForm
          name="deliveryoccur"
          lable="How often should deliveries occur?"
          options={occurs}
          val={data?.deliveryoccur || occurs[0]?.value}
          handleChange={handleChange}
        />
        <div className="d-flex gap-2">
          <InputOutlined
            lable="Delivery Fees $"
            defaultValue="0"
            type="number"
            name="deliveryfee"
            classes=""
            value={data?.deliveryfee}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.deliveryfee}
            errorMessage="should be bigger than 0"
          />
          <DDSearch
            name="preferredday"
            lable="Preferred day"
            options={days}
            isDisabled={false}
            isMulti={false}
            val={data?.preferredday}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.preferredday}
            errorMessage="please select a preferred day"
          />
        </div>
        <DDSearch
          name="routeId"
          lable="Region"
          options={routes}
          isDisabled={false}
          isMulti={false}
          val={data?.routeId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors?.routeId}
          errorMessage="please pick a region"
        />
      </div>
    </div>
  );
};

export default Form3;
