import * as React from "react";
 import TextField from "@mui/material/TextField";
const InputOutlined = ({lable,defaultValue}) => {
  return (
    <div className="mt-4 input-outline">
      <TextField
        required
        id="outlined-required"
        label={lable}
        defaultValue={defaultValue}
        size="small"

      />
      
    </div>
  );
};

export default InputOutlined;
