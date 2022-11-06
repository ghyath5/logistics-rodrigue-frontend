import React from "react";
import TextField from "@mui/material/TextField";

const AuthInput = ({
  label,
  placeHolder,
  value,
  setValue,
  type,
  autoComplete,
}) => {
  return (
    <div className="input-outline mb-3">
      <TextField
        className="w-100"
        id={label}
        label={label}
        variant="standard"
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default AuthInput;
