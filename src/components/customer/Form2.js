import React from "react";
import InputOutlined from "../layout/InputOutlined";

const Form2 = ({ errors, data, handleChange, handleBlur }) => {
  return (
    <div className="mx-1 mx-sm-2 mt-sm-4">
      <h5 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
        Account Representitive
      </h5>
      <div className="formsContainer px-0 px-sm-3 py-3 w-100">
        <div className="d-md-flex gap-3">
          <InputOutlined
            lable="First Name"
            defaultValue="First Name"
            type="text"
            name="firstname"
            value={data?.firstname}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.firstname}
            errorMessage="should be at least 3 letters"
          />
          <InputOutlined
            lable="Last Name"
            defaultValue="Last Name"
            type="text"
            name="lastname"
            value={data?.lastname}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.lastname}
            errorMessage="should be at least 3 letters"
          />
        </div>
        <div>
          <InputOutlined
            lable="Email Address"
            defaultValue="Email Address"
            type="email"
            name="email"
            value={data?.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.email}
            errorMessage="not a valid email"
          />
        </div>
        <div className="d-md-flex gap-3">
          <InputOutlined
            classes="w-100"
            name="phonenumber"
            id="phonenumber"
            lable="Phone"
            defaultValue="phonenumber"
            type="text"
            value={data?.phonenumber}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.phonenumber}
            errorMessage="not a valid phone number"
          />
          <InputOutlined
            classes="w-100"
            name="mobilenumber"
            id="mobilenumber"
            lable="Mobile"
            defaultValue="mobilenumber"
            type="text"
            value={data?.mobilenumber}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.mobilenumber}
            errorMessage="not a valid Mobile number"
          />
          <InputOutlined
            classes="w-100"
            name="directdialnumber"
            id="directdialnumber"
            lable="Direct Dial Number"
            defaultValue="directdialnumber"
            type="text"
            value={data?.directdialnumber}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.directdialnumber}
            errorMessage="not a valid Direct Dial number"
          />
        </div>
      </div>
    </div>
  );
};

export default Form2;
