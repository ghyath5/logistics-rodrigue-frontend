import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumberInput = ({ lable, value, setValue }) => {
  return (
    <div className="mt-3 mt-md-0 PhoneInput">
      <div className="flex-column w-100">
        <label htmlFor={lable} className="formsLable mb-2">
          {lable}
        </label>
        <PhoneInput
          id={lable}
          placeholder="Enter phone number"
          defaultCountry="AU"
          country="AU"
          countries={["AU"]}
          addInternationalOption={false}
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
