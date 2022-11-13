import { ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";

const ProductListItem = ({ product }) => {
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
    setNewPrice((product.price * (100 - e.target.value)) / 100);
  };

  return (
    <ListItem className="listItem mt-1 py-3">
      <ListItemText primary={product.label} className="listItemTitle" />
      <ListItemText
        className="text-center"
        primary={"old price: " + product.price + "$"}
      />
      <ListItemText className="text-end me-2" primary="discount: " />
      <input
        type="text"
        className="bg-transparent"
        placeholder="0"
        onChange={handleDiscount}
      />
      <span className="ms-1">%</span>
      <ListItemText className="text-end me-2" primary="new Price: " />
      <input
        type="text"
        className="bg-transparent"
        placeholder="0.00"
        value={discount && newPrice}
      />
      <span className="ms-1">$</span>
    </ListItem>
  );
};

export default ProductListItem;
