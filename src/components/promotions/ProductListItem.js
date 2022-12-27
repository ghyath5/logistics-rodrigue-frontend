import { ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const ProductListItem = ({ data, product, setData }) => {
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    console.log({ product });
  }, [product]);

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
    setNewPrice((product?.price * (100 - e.target.value)) / 100);
  };

  const handleNewPrice = (e) => {
    setNewPrice(e.target.value);
    setDiscount(100 - (e.target.value * 100) / product?.price);
    // let current = data.filter((p) => p.productId === product.value)[0];
    // setData((prev) => {
    //   return { ...prev, productId:current.productId, newprice: e.target.value, discount:100 - (e.target.value * 100) / product?.price};
    // });
  };

  return (
    <ListItem className="listItem mt-1 py-3">
      <ListItemText primary={product?.label} className="listItemTitle" />
      <ListItemText
        className="text-center"
        primary={"old price: " + product?.price + "$"}
      />
      <ListItemText className="text-end me-2" primary="discount: " />
      <input
        type="text"
        className="bg-transparent"
        placeholder="0"
        onChange={handleDiscount}
        value={newPrice && discount}
      />
      <span className="ms-1">%</span>
      <ListItemText className="text-end me-2" primary="new Price: " />
      <input
        type="text"
        className="bg-transparent"
        placeholder="0.00"
        value={discount && newPrice}
        onChange={handleNewPrice}
      />
      <span className="ms-1">$</span>
    </ListItem>
  );
};

export default ProductListItem;
