import * as React from "react";
const InputOutlined = ({
  lable,
  defaultValue,
  id,
  type,
  value,
  setValue,
  autoComplete,
}) => {
  return (
    <div className="mt-2 input-outline d-flex flex-column">
      <label htmlFor={id} className="formsLable mb-2">
        {lable}
      </label>
      <input
        placeholder={defaultValue}
        id={id}
        className="formsInput"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputOutlined;
