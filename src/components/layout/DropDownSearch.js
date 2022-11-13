import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";

const DropDownSearch = ({
  lable,
  options,
  isDisabled,
  isMulti,
  values,
  setValues,
}) => {
  const handleChange = (newVal) => {
    setValues([...values, newVal]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        sx={{ minWidth: 120 }}
        className="DropDownSearchContainer w-100"
      >
        <lable for="DropDownSearch" className="formsLable">
          {lable}
        </lable>
        {/* Async */}
        <Select
          options={options}
          className={`mt-2 ${isMulti && "basic-multi-select"}`}
          isClearable={true}
          isDisabled={isDisabled}
          isMulti={isMulti}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};

export default DropDownSearch;
