import * as React from "react";
 const InputOutlined = ({lable,defaultValue,id,type,value}) => {
  return (
    <div className="mt-4 input-outline d-flex flex-column">
        
     <lable for={id} className="lable-customer mb-2">{lable}*</lable>
     <input placeholder={defaultValue} id={id} className="input-customer" type={type} value={value} />
      
    </div>
  );
};

export default InputOutlined;
 