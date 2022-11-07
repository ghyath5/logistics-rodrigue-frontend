import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import { AddProduct } from "../components/layout/AddProduct";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AddNewOrders = () => {
  const [product, setProduct] = useState([1]);
  const nav = useNavigate();
  const addProduct = () => {
    const index = product.length - 1;
    const value = product[index];
    setProduct([...product, value + 1]);
  };
  const removeComp = (i) => {
    let res = product;
    res = res.filter((x) => x !== i);
    console.log(res);
    setProduct(res);
  };
  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/orders")}
        />
        <h4 className="headerTitle my-3 mx-2"> Add New Order</h4>
      </div>
      <div className="formsContainer">
        <div className=" text-center mt-5 mb-4">
          <h5 className="formsTitles mx-3 mx-sm-4">New Order Details</h5>
        </div>
        <hr className="line mx-5"></hr>

        <div className=" mx-3 mx-sm-4">
          <InputOutlined
            lable="Select Customer"
            defaultValue="Business Name"
            type="text"
          />

          <div className="mt-4 d-flex flex-column">
            <lable className="formsLable mb-2">Order Notes:</lable>

            <textarea
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Order Notes"
            />
          </div>
          <div className="mt-3">
            <h5 className="formsTitles">New Order </h5>
          </div>
          {product.map((item, i) => {
            return (
              <AddProduct
                isDeleteable={product.length > 1}
                index={item}
                onRemove={() => removeComp(item)}
              />
            );
          })}
          <div className="my-3">
            <BtnContained title="Add Product" onClick={addProduct} />
          </div>
          <div className="d-flex align-items-center gap-2">
            <h6 className="m-0 formsLable">Delivery Fee:</h6>
            <div>
              <InputOutlined defaultValue="$" type="number" />
            </div>
          </div>
          <div className="align-items-center gap-2 my-3">
            <h6 className="m-0 formsLable">Total Cost: -</h6>
          </div>
          <div className="align-items-center gap-2 my-3">
            <h6 className="m-0">Next Available Delivery Date: -</h6>
          </div>
          <div className="d-flex flex-column my-3">
            <span className="formsLable">
              Use the above delivery time for this order?
            </span>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No,deliver this on:"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="d-flex flex-column my-3">
            <span className="formsLable">
              How often should deliveries occur?
            </span>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No Reoccuring Orders"
                />
                <FormControlLabel
                  value="once"
                  control={<Radio />}
                  label="Once per Week"
                />
                <FormControlLabel
                  value="night"
                  control={<Radio />}
                  label="Once per Fortnight"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="my-3">
            <span className="formsLable">
              Purchase order number (Leave blank if none)
            </span>
            <div className="row col-md-3">
              <InputOutlined defaultValue="Purchase" type="text" />
            </div>
          </div>
          <div className="text-center mt-5 mb-4">
            <BtnContained title="save & confirm" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewOrders;
