import React, { useState, useEffect } from "react";
import BtnContained from "../layout/BtnContained";
import InputOutlined from "../layout/InputOutlined";

const ProductListItem = ({ item, index, handleChange, type }) => {
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState("");
  const [newPriceError, setNewPriceError] = useState(false);
  const [addHidden, setAddHidden] = useState(false);

  return (
    <div className="row gap-2 mt-2" key={index}>
      <div className="col-md-5">
        <InputOutlined
          lable=""
          defaultValue="Select Product"
          type="text"
          value={item.name}
          disabled={true}
          id="prodName"
          name="prodName"
        />
      </div>
      <div className="col-md-7 row">
        {type !== "category" && (
          <>
            <div className="d-flex col-md-6">
              <p className="align-self-center m-0 me-3">Old price:</p>
              <InputOutlined
                lable=""
                defaultValue="$  "
                type="text"
                value={`$  ${item.oldprice}`}
                disabled={true}
                id="prodPrice"
                name="prodPrice"
              />
            </div>

            <div className="d-flex col-md-6">
              <p className="align-self-center m-0 me-3">New price:</p>
              <InputOutlined
                lable=""
                defaultValue={item.newprice}
                type="number"
                id="prodNewPrice"
                name="prodNewPrice"
                disabled={addHidden && true}
                handleChange={(e) => setNewPrice(e.target.value)}
              />
              {addHidden && (
                <p
                  onClick={() => setAddHidden(false)}
                  className="my-0 ms-2 text-primary text-end align-self-center pointer"
                >
                  Edit
                </p>
              )}
            </div>
          </>
        )}
        {type === "category" && (
          <div className="d-flex col-md-6">
            <p className="align-self-center m-0 me-3">Discount:</p>
            <InputOutlined
              lable=""
              defaultValue={item.discountpercentage}
              type="number"
              id="catDiscount"
              name="catDiscount"
              disabled={addHidden && true}
              handleChange={(e) => setDiscount(e.target.value)}
            />
            {addHidden && (
              <p
                onClick={() => setAddHidden(false)}
                className="my-0 ms-2 text-primary text-end align-self-center pointer"
              >
                Edit
              </p>
            )}
          </div>
        )}
      </div>
      {!addHidden && (
        <div className="text-start mb-2 d-flex justify-content-end align-items-center">
          {newPriceError && (
            <p className="my-0 me-3 text-danger text-center">
              please add a new price
            </p>
          )}
          <BtnContained
            title="Add"
            handleClick={() => {
              if (discount > 0) {
                handleChange(discount);
              } else {
                if (newPrice !== "") {
                  handleChange(item.productId, newPrice);
                  setAddHidden(true);
                } else {
                  setNewPriceError(true);
                }
              }
            }}
            classes="me-3"
          />
        </div>
      )}
    </div>
  );
};

export default ProductListItem;
