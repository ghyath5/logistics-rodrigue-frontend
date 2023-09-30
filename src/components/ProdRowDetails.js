import React, { useEffect, useState } from "react";
import BtnContained from "./layout/BtnContained";
import InputOutlined from "./layout/InputOutlined";

const ProdRowDetails = ({ item, handleChange, handleRemove, type, isEdit }) => {
  const [newPrice, setNewPrice] = useState(item.newprice ?? 1 );
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [total, setTotal] = useState(0);
  const [doneEditing, setDoneEditing] = useState(
    item?.quantity && isEdit ? true : false
  );

  useEffect(() => {
    setNewPrice(item.newprice);
  }, [item]);

  useEffect(() => {
    // console.log(newPrice)
    setTotal(quantity * newPrice);
    // console.log(total)
  }, [quantity, newPrice]);

  const submitProduct = () => {
    if (type && type === "order") {
      setDoneEditing(true);
      handleChange(item._id, total, quantity);
    } else {
      if (newPrice < item.oldprice) {
        setDoneEditing(true);
        handleChange(item._id, newPrice);
      }
    }
  };

  const removeProd = () => {
    handleRemove(item._id);
    setDoneEditing(false);
    // setNewPrice(item.oldprice);
  };

  return (
    <div className="prodRowEditBox w-100 p-2 mb-3">
      <div className="d-flex gap-3 align-items-center">
        <InputOutlined
          lable="name of the product"
          defaultValue="Select Product"
          type="text"
          value={item.name}
          disabled={true}
          id="prodName"
          name="prodName"
          classes="w-100"
        />
        <InputOutlined
          lable="price"
          defaultValue={item.oldprice}
          type="number"
          value={item.oldprice}
          disabled={true}
          id="prodPrice"
          name="prodPrice"
          classes="w-50"
        />
        <InputOutlined
          lable="new price *"
          defaultValue={item.newprice}
          type="number"
          value={newPrice}
          disabled={doneEditing ? true : false}
          id="prodNewPrice"
          name="prodNewPrice"
          border={item.special ? "borderViolet" : ""}
          classes="w-50"
          handleChange={(e) => setNewPrice(e.target.value)}
        />
        {type && type === "order" && (
          <>
            <InputOutlined
              lable="quantity *"
              defaultValue={1}
              type="number"
              value={quantity}
              disabled={doneEditing ? true : false}
              id="prodquantity"
              name="prodquantity"
              classes="w-50"
              handleChange={(e) => setQuantity(e.target.value)}
            />
            <InputOutlined
              lable="total"
              defaultValue={1}
              type="number"
              value={total}
              disabled={true}
              id="total"
              name="total"
              classes="w-50"
              // handleChange={(e) => log(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="d-flex justify-content-end align-items-center gap-3 mt-2">
        <BtnContained
          title="Cancel"
          handleClick={removeProd}
          classes="delete-promotion-btn"
        />
        {!doneEditing && (
          <BtnContained
            title="Add"
            handleClick={() => {
              submitProduct();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProdRowDetails;
