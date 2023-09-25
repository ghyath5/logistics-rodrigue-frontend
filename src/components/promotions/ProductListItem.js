import React, { useState } from "react";
import BtnContained from "../layout/BtnContained";
import InputOutlined from "../layout/InputOutlined";

const ProductListItem = ({ item, handleChange, handleRemove }) => {
  const [discount, setDiscount] = useState(0);
  const [doneEditing, setDoneEditing] = useState(false);

  const submitCategory = () => {
    if (discount > 0) {
      setDoneEditing(true);
      handleChange(discount);
      setDiscount(discount);
    }
  };

  return (
    <div className="prodRowEditBox w-100 p-2 mb-3">
      <div className="d-flex gap-3 align-items-center">
        <InputOutlined
          lable=""
          defaultValue="Select Product"
          type="text"
          value={item.name}
          disabled={true}
          id="prodName"
          name="prodName"
          classes="w-100"
        />
        <InputOutlined
          lable=""
          // defaultValue={item.discountpercentage + "%"}
          value={item?.discountpercentage || discount}
          type="number"
          id="catDiscount"
          name="catDiscount"
          disabled={doneEditing && true}
          classes="w-50 "
          handleChange={(e) => setDiscount(e.target.value)}
          prefix={true}
        />
      </div>
      <div className="d-flex justify-content-end align-items-center gap-3 mt-2">
        <BtnContained
          title="Remove"
          handleClick={() => {
            handleRemove();
          }}
          classes="delete-promotion-btn"
        />
        {!doneEditing && (
          <BtnContained
            title="Add"
            handleClick={() => {
              submitCategory();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListItem;
