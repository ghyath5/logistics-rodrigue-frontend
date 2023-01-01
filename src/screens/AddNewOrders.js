import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import AddProduct from "../components/layout/AddProduct";
import RadioGroupForm from "../components/layout/RadioGroupForm";

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
        <h4 className="headerTitle my-3 mx-2">Add New Order</h4>
      </div>
      <div className="formsContainer">
        <div className="text-center mt-5 mb-4">
          <h5 className="formsTitles mx-3 mx-sm-4">New Order Details</h5>
        </div>

        <hr className="line mx-5"></hr>

        <div className="mx-3 mx-sm-4">
          <InputOutlined
            lable="Select Customer"
            defaultValue="Business Name"
            type="text"
          />
          <div className="mt-4 d-flex flex-column">
            <label className="formsLable mb-2">Order Notes:</label>
            <textarea
              id="outlined-multiline-static"
              rows={4}
              placeholder="Order Notes"
            />
          </div>
          <div className="mt-4">
            <h5 className="formsTitles">New Order</h5>
          </div>
          <div className="row m-0">
            <div className="col-8 p-0">
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
                <BtnContained title="Add Product" handleClick={addProduct} />
              </div>
            </div>
            <div className="col-4 p-4 orderTotalsbox">
              <div className="d-flex mb-3 align-items-center">
                <h6 className="m-0 me-2 formsLable">Delivery Fee:</h6>
                <div>$ 0.00</div>
              </div>
              <div className="d-flex align-items-center">
                <h6 className="m-0 me-2 formsLable">Total Cost:</h6>
                <div>$ 0.00</div>
              </div>
            </div>
          </div>
          <RadioGroupForm
            lable="Use the above delivery time for this order?"
            options={[
              { lable: "Yes", value: "yes" },
              { lable: "No,deliver this on:", value: "no" },
            ]}
          />
          <RadioGroupForm
            lable="How often should deliveries occur?"
            options={[
              { lable: "No Reoccuring Orders", value: "No" },
              { lable: "Once per Week", value: "once" },
              { lable: "Once per Fortnight", value: "night" },
            ]}
          />
          <div className="my-3">
            <span className="formsLable">
              Purchase order number (Leave blank if none)
            </span>
            <div className="row col-md-3">
              <InputOutlined defaultValue="Purchase" type="text" />
            </div>
          </div>
          <div className="text-center mt-5 mb-4">
            <BtnContained
              title="save & confirm"
              handleClick={() => {
                console.log("save");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewOrders;
