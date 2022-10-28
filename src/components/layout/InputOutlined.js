import * as React from "react";
const InputOutlined = ({ lable, defaultValue, id, type, value }) => {
  return (
    <div className="mt-4 input-outline d-flex flex-column">
      <lable for={id} className="formsLable mb-2">
        {lable}*
      </lable>
      <input
        placeholder={defaultValue}
        id={id}
        className="formsInput"
        type={type}
        value={value}
      />
    </div>
  );
};

export default InputOutlined;
