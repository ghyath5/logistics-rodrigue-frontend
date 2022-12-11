import React, { useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DDSearch = ({
  name,
  lable,
  options,
  isDisabled,
  isMulti,
  val,
  handleChange,
  handleBlur,
  error,
  errorMessage,
}) => {
  const [selectedItem, setSelectedItem] = useState(val);

  const handleChangee = (event) => {
    handleChange(event);
    handleBlur(event);

    const {
      target: { value },
    } = event;
    setSelectedItem(typeof value === "string" ? value.split(",") : value);
  };

  const handleBlurr = (event) => {
    handleBlur(event);
  };

  return (
    <div className="mt-2 input-outline d-flex flex-column ddSelect">
      <FormControl>
        {lable && (
          <label htmlFor={`dd-${name}`} className="formsLable mb-2">
            {lable}
          </label>
        )}
        <div className="formsInputCont p-0">
          <Select
            labelId={`dd-${name}`}
            multiple={isMulti}
            name={name}
            defaultValue={options[0]}
            value={selectedItem}
            onChange={handleChangee}
            onBlur={handleBlurr}
            input={<FilledInput name={name} />}
            className={error ? "w-100 errorInputO" : "w-100 formsInput"}
            disabled={isDisabled}
            MenuProps={MenuProps}
            displayEmpty={val ? false : true}
          >
            <MenuItem value="" disabled>
              <span className="textGray">Select...</span>
            </MenuItem>
            {options.map((opt, i) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
      {error && (
        <div className="position-relative">
          <div className="errorMessagenormal">{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default DDSearch;
