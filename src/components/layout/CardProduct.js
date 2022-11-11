import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputOutlined from "./InputOutlined";
import BtnOutlined from "./BtnOutlined";

const CardProduct = ({ rows, id, setNumbersOfProducts, numberOfProducts }) => {
  // setState(prev => [...prev, {
  //   name: prodName,
  //   category, myCategory
  // }])
  const [prodName, setProdName] = useState("");
  const handleClick = () => {
    console.log(rows);
    rows.filter((row, i) => i !== id);
  };
  return (
    <div className="customer-promotion p-2 mb-4 position-relative">
      <div
        className="pe-2 pt-1 position-absolute top-0 end-0 "
        onClick={() => handleClick()}
      >
        <HighlightOffIcon
          color="error"
          fontSize="small"
          className="circle-delete-icon"
        />
      </div>
      <div className="row  pb-2  mx-1">
        <div className="col-md-4 col-sm-6">
          <InputOutlined
            lable="Product Name"
            defaultValue="Product Name"
            type="text"
          />
          <InputOutlined lable="Category" defaultValue="Category" type="text" />
        </div>
        <div className="col-md-3 col-sm-6">
          <InputOutlined
            lable="Standrad Price"
            defaultValue="Standrad Price"
            type="text"
          />
          <InputOutlined lable="GST" defaultValue="GST" type="text" />
        </div>
        <div className="col-md-3 col-sm-6">
          <InputOutlined
            lable="Unit Per Box"
            defaultValue="Unit Per Box"
            type="text"
          />
          <InputOutlined
            lable="Priority No."
            defaultValue="Priority No."
            type="text"
          />
        </div>
        <div className="col-md-2 col-sm-6 row gap-2">
          <span className="formsLable align-self-center mb-2">
            Hide from order
          </span>
          <div className="gap-2 product-hide-show">
            <div className="mb-2 show  ">
              <BtnOutlined
                title="Show"
                handleClick={() => {
                  console.log("Show");
                }}
              />
            </div>
            <div className="hide">
              <BtnOutlined
                title="Hide"
                handleClick={() => {
                  console.log("hide");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
