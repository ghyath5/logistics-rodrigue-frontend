import React, { useState } from "react";
import eye from "../../assets/eye.svg";
import eyeSlashed from "../../assets/eyeSlashed.svg";

const InputOutlined = ({
  lable,
  defaultValue,
  id,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  autoComplete,
  error,
  errorMessage,
  classes,
  border,
  disabled,
  prefix,
}) => {
  const [visible, setVisible] = useState(false);

  const togglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div className={`flex-column ${classes && classes}`}>
      <div
        className={`input-outline d-flex flex-column ${
          lable !== "" ? "mt-2" : ""
        }`}
      >
        {lable && (
          <label htmlFor={id} className="formsLable mb-2">
            {lable}
          </label>
        )}
        <div
          className={`position-relative formsInputCont d-flex w-100 ${
            border ? "borderViolet" : error ? "errorInputO" : "formsInput"
          }`}
        >
          <input
            placeholder={defaultValue}
            id={id}
            className={"w-100 formsInput"}
            name={name}
            type={type === "password" ? (!visible ? "password" : "text") : type}
            value={value}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur && handleBlur(e)}
            autoComplete={autoComplete}
            disabled={disabled && disabled}
          />
          {prefix && <span className="inputPrefix">%</span>}
          {(name === "password" || name === "confirmPassword") &&
            (!visible ? (
              <img
                className="passController mb-0 ms-auto me-2 align-self-center"
                src={eye}
                alt="eye"
                onClick={togglePassword}
              />
            ) : (
              <img
                className="passController mb-0 ms-auto me-2 align-self-center"
                src={eyeSlashed}
                alt="eyeSlashed"
                onClick={togglePassword}
              />
            ))}
        </div>
      </div>
      {error && (
        <div className="position-relative">
          <div className="errorMessagenormal">{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default InputOutlined;
