import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const RadiosGroup = ({ lable, options, value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl className="mt-3">
      <label htmlFor="DropDownSearch" className="formsLable">
        {lable}
      </label>
      <RadioGroup
        id="DropDownSearch"
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, i) => {
          return (
            <FormControlLabel
              key={i}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadiosGroup;
