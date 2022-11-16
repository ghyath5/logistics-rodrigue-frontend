import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioGroupForm = ({ lable, options }) => {
  return (
    <div className="d-flex flex-column my-3">
      <span className="formsLable">{lable}</span>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {options.map((option, i) => {
            return (
              <FormControlLabel
                key={i}
                value={option.value}
                control={<Radio />}
                label={option.lable}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioGroupForm;
