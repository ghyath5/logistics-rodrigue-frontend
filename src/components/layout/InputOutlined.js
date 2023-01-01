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
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  const togglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div className={`flex-column ${classes && classes}`}>
      <div className="mt-2 input-outline d-flex flex-column">
        {lable && (
          <label htmlFor={id} className="formsLable mb-2">
            {lable}
          </label>
        )}
        <div
          className={
            error
              ? "position-relative formsInputCont d-flex w-100 errorInputO"
              : "position-relative formsInputCont d-flex w-100 formsInput"
          }
        >
          <input
            placeholder={defaultValue}
            id={id}
            className={"w-100 formsInput"}
            name={name}
            // errorInput
            type={type === "password" ? (!visible ? "password" : "text") : type}
            value={value}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur && handleBlur(e)}
            autoComplete={autoComplete}
            disabled={disabled && disabled}
          />
          {name === "password" &&
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
