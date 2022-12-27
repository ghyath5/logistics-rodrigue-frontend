import React from "react";

const TextAreaOutlined = ({
  lable,
  defaultValue,
  id,
  name,
  value,
  handleChange,
  handleBlur,
  autoComplete,
  error,
  errorMessage,
}) => {
  return (
    <>
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
          <textarea
            id={id}
            rows={4}
            placeholder={defaultValue}
            className={"w-100 formsInput"}
            name={name}
            value={value}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur && handleBlur(e)}
            autoComplete={autoComplete}
          />
        </div>
      </div>
      {error && (
        <div className="position-relative">
          <div className="errorMessagenormal">{errorMessage}</div>
        </div>
      )}
    </>
  );
};

export default TextAreaOutlined;
