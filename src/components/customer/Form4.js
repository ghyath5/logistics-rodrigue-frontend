import React from "react";
import RadioGroupForm from "../layout/RadioGroupForm";

const Form4 = ({ payments, data, handleChange }) => {
  return (
    <div className="mx-1 mx-sm-2 mt-sm-4">
      <h5 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
        Billing and Pricing
      </h5>
      <div className="formsContainer px-0 px-sm-3 py-3 w-100">
        <RadioGroupForm
          name="paymentmethod"
          lable="Default Payment Method: "
          options={payments}
          val={data?.paymentmethod || payments[0]?.value}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Form4;
