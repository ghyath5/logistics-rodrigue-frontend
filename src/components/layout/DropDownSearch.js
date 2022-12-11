import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import { useEffect } from "react";
import { roles } from "../../data/configs";

const DropDownSearch = ({
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
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    val
      ? setSelectedItem({ label: roles[val], value: val })
      : setSelectedItem(null);
  }, [val]);

  const handleChangee = (e) => {
    // handleBlur({ target: { name: e.label, value: e.value } });
    handleChange({ target: { name: name, value: e } });
    setSelectedItem(e[0].value);
  };

  const handleBlurr = (e) => {
    handleBlur(e);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl
          sx={{ minWidth: 120 }}
          className="DropDownSearchContainer w-100"
        >
          <label className="formsLable">{lable}</label>
          <Select
            id="asasasas"
            name={name}
            options={options}
            className={
              error
                ? `mt-2 ${isMulti && "basic-multi-select"} errorDD`
                : `mt-2 ${isMulti && "basic-multi-select"}`
            }
            defaultValue={selectedItem && selectedItem}
            isClearable={false}
            isDisabled={isDisabled}
            isMulti={isMulti}
            onChange={handleChangee}
            onBlur={handleBlurr}
          />
        </FormControl>
      </Box>
      {error && (
        <div className="position-relative">
          <div className="errorMessagenormal">{errorMessage}</div>
        </div>
      )}
    </>
  );
};

export default DropDownSearch;
