import React, { useState, forwardRef, useImperativeHandle } from "react";
import DDSearch from "../layout/DDSearch";
import InputOutlined from "../layout/InputOutlined";
import TextAreaOutlined from "../layout/TextAreaOutlined";
import { states } from "../../data/configs";

const Form1 = forwardRef(({ setData, isEdit, data }, ref) => {
  const [step1Data, setStep1Data] = useState({
    businessname: isEdit ? data.businessname : "",
    abn: isEdit ? data.abn : "",
    address: isEdit ? data.address : "",
    suburb: isEdit ? data.suburb : "",
    state: isEdit ? data.state : "",
    postcode: isEdit ? data.postcode : "",
    notes: isEdit ? data.notes : "",
  });
  const [step1Eerrors, setStep1Errors] = useState({
    businessname: false,
    abn: false,
    address: false,
    suburb: false,
    state: false,
    postcode: false,
    notes: false,
  });

  useImperativeHandle(ref, () => ({
    allVAlid() {
      return allVAlid();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep1Data((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const hasError = (name, bool) => {
    setStep1Errors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const allVAlid = () => {
    let valid;
    let errs = Object.values(step1Eerrors);
    errs.includes(true) ? (valid = false) : (valid = true);

    for (const [key, value] of Object.entries(step1Data)) {
      if (key !== "notes" && value === "") {
        valid = false;
      }
    }

    if (valid) {
      for (const [key, value] of Object.entries(step1Data)) {
        value !== "" &&
          setData((prev) => {
            return { ...prev, [key]: value };
          });
      }
    } else {
      Object.entries(step1Data).forEach(([key, val]) => {
        key !== "notes" &&
          val === "" &&
          setStep1Errors((prev) => {
            return { ...prev, [key]: true };
          });
      });
    }
    return valid;
  };

  const validate = (name, value) => {
    switch (name) {
      case "businessname":
      case "abn":
      case "suburb":
      case "address":
      case "postcode":
        value === "" || value.length < 4
          ? hasError(name, true)
          : hasError(name, false);
        break;
      case "state":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  return (
    <div>
      <InputOutlined
        lable="Business Name"
        defaultValue="Business Name"
        type="text"
        name="businessname"
        value={step1Data?.businessname}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step1Eerrors?.businessname}
        errorMessage="should be at least 3 letters"
      />
      <InputOutlined
        lable="ABN"
        defaultValue="ABN"
        type="text"
        name="abn"
        value={step1Data?.abn}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step1Eerrors?.abn}
        errorMessage="should be at least 3 letters"
      />
      <InputOutlined
        lable="Delivery Address"
        defaultValue="Being Typing to search for a location"
        type="text"
        name="address"
        value={step1Data?.address}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step1Eerrors?.address}
        errorMessage="should be at least 3 letters"
      />
      <div className="addressColl d-sm-flex flex-wrap gap-2 align-items-center justify-content-between mt-2">
        <InputOutlined
          lable="Suburb"
          defaultValue="Suburb"
          type="text"
          name="suburb"
          value={step1Data?.suburb}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={step1Eerrors?.suburb}
          errorMessage="should be at least 3 letters"
        />
        <DDSearch
          name="state"
          lable="State"
          options={states}
          isDisabled={false}
          isMulti={false}
          val={step1Data?.state}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={step1Eerrors?.state}
          errorMessage="please pick a state"
        />
        <InputOutlined
          lable="Postcode"
          defaultValue="Postcode"
          type="number"
          name="postcode"
          value={step1Data?.postcode}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={step1Eerrors?.postcode}
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
          value={step1Data?.notes}
          handleChange={handleChange}
          handleBlur={handleBlur}
          // error={step1Eerrors?.notes}
          // errorMessage="should be at least 10 letters"
        />
      </div>
    </div>
  );
});

export default Form1;
