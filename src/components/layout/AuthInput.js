import React from "react";
import TextField from "@mui/material/TextField";

const AuthInput = ({
  label,
  placeHolder,
  value,
  name,
  type,
  autoComplete,
  error,
  handleChange,
  handleBlur,
  errorMessage,
}) => {
  return (
    <>
      <div className="input-outline mb-3">
        <TextField
          className={error ? "w-100 errorInput" : "w-100"}
          id={label}
          name={name}
          label={label}
          variant="standard"
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <div className="position-relative">
          <div className="errorMessageReg text-end">{errorMessage}</div>
        </div>
      )}
    </>
  );
};

export default AuthInput;
