import * as React from "react";
const InputOutlined = ({ lable, defaultValue, id, type, value, setValue }) => {
  return (
    <div className="  input-outline d-flex flex-column">
      <label for={id} className="formsLable mb-2">
        {lable}
      </label>
      <input
        placeholder={defaultValue}
        id={id}
        className="formsInput"
        type={type}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default InputOutlined;
