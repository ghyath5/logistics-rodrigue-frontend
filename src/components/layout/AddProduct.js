import React from "react";
import BtnContained from "./BtnContained";
import InputOutlined from "./InputOutlined";

export const AddProduct = (props) => {
  const { isDeleteable, index, onRemove } = props;
  return (
    <div className=" row gap-2">
      <div className="col-md-5">
        <InputOutlined
          lable="Select Product"
          defaultValue="Select Product"
          type="text"
         />
      </div>
      <div className="col-md-5 row">
        <div className="col-md-4">
          <InputOutlined
            lable="Unit Price"
            defaultValue="Unit Price"
            type="text"
          />
        </div>
        <div className="col-md-4">
          <InputOutlined lable="Quantity" defaultValue="1" type="text" />
        </div>
        <div className="col-md-4">
          <InputOutlined lable="Cost" defaultValue="$ Cost" type="text" />
        </div>
      </div>
      {isDeleteable && (
        <div className="col-md-2 text-center delete-promotion-btn  align-self-end">
          <BtnContained title="Remove"  onClick={() => onRemove(index)} />
        </div>
      )}
    </div>
  );
};
