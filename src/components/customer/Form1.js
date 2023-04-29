import React from "react";
import InputOutlined from "../layout/InputOutlined";
import TextAreaOutlined from "../layout/TextAreaOutlined";

const Form1 = ({ errors, data, handleChange, handleBlur }) => {
  return (
    <div className="mx-1 mx-sm-2 mt-sm-4">
      <h5 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
        Business Details
      </h5>
      <div className="formsContainer px-0 px-sm-3 py-3 w-100">
        <InputOutlined
          lable="Business Name"
          defaultValue="Business Name"
          type="text"
          name="businessname"
          value={data?.businessname}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors?.businessname}
          errorMessage="should be at least 3 letters"
        />
        <InputOutlined
          lable="ABN"
          defaultValue="ABN"
          type="text"
          name="abn"
          value={data?.abn}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors?.abn}
          errorMessage="should be at least 3 letters"
        />
        <InputOutlined
          lable="Delivery Address"
          defaultValue="Delivery Address"
          type="text"
          name="address"
          value={data?.address}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors?.address}
          errorMessage="should be at least 3 letters"
        />
        <div className="addressColl d-sm-flex flex-wrap gap-2 align-items-center justify-content-between mt-2">
          <InputOutlined
            lable="City"
            defaultValue="City"
            type="text"
            name="city"
            value={data?.city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.city}
            errorMessage="should be at least 3 letters"
          />
          <InputOutlined
            lable="Area"
            defaultValue="Area"
            type="text"
            name="region"
            value={data?.region}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.region}
            errorMessage="should be at least 3 letters"
          />
          {/* <DDSearch
      name="state"
      lable="State"
      options={states}
      isDisabled={false}
      isMulti={false}
      val={data?.state}
      handleChange={handleChange}
      handleBlur={handleBlur}
      error={errors?.state}
      errorMessage="please pick a state"
    /> */}
          <InputOutlined
            lable="Postcode"
            defaultValue="Postcode"
            type="text"
            name="postcode"
            value={data?.postcode}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors?.postcode}
            errorMessage="should be at least 3 letters"
          />
        </div>
        <div className="mt-2 d-flex flex-column">
          <TextAreaOutlined
            id="Customer-Notes"
            lable="Customer Notes (Max of 250 Characters)*"
            defaultValue="Notes"
            type="text"
            name="notes"
            value={data?.notes}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default Form1;
