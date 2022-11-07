import React from "react";
import DropDown from "./DropDown";
import InputOutlined from "./layout/InputOutlined";
import Layout from "./partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AddNewCustomer = () => {
  const nav = useNavigate();
  return (
    <Layout>  
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <div className="d-flex align-items-center ">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/customers")}
          />
          <h4 className="headerTitle my-3 mx-2">Add New Customer</h4>
        </div>
      </div>
      <div className="formsContainer">
        <div className=" text-center mt-5 mb-4">
          <h5 className="formsTitles mx-3 mx-sm-4">Customer Details</h5>
        </div>
        <hr className="line mx-5"></hr>
        <div>
          <h5 className="formsTitles mx-3 mx-sm-4">Business Details</h5>
        </div>
        <div className=" mx-3 mx-sm-4">
          <InputOutlined
            lable="Business Name"
            defaultValue="Business Name"
            type="text"
          />
          <InputOutlined lable="ABN" defaultValue="ABN" type="text" />
          <InputOutlined
            lable="Delivery Address"
            defaultValue="Being Typing to search for a location"
            type="text"
          />
          <div className="d-flex flex-row gap-2">
            <InputOutlined
              lable="Delivery Address Line1"
              defaultValue="Delivery Address Line1"
              type="text"
            />
            <InputOutlined
              lable="Delivery Address Line2"
              defaultValue="Delivery Address Line1"
              type="text"
            />
          </div>
          <div className="row justify-content-between">
            <div className="col-md-6">
              <InputOutlined lable="Suburb" defaultValue="Suburb" />
            </div>
            <div className=" col-md-6 justify-content-between">
              <div className="row">
                <div className="col-md-6 align-self-end">
                  <DropDown lable="state" defaultValue="state" />
                </div>
                <div className="col-md-6">
                  <InputOutlined lable="Postcode" defaultValue="Postcode" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex flex-column">
            <lable className="formsLable mb-2">
              Customer Notes (Max of 250 Characters)*
            </lable>

            <textarea
              id="outlined-multiline-static"
              label="Custimer Notes (Max of 250 Characters)"
              multiline
              rows={4}
              placeholder="Default Value"
            />
          </div>
        </div>
        <div className="mt-5">
          <h5 className="formsTitles mx-3 mx-sm-4">Account Representative</h5>
        </div>
        <div className="mx-3 mx-sm-4">
          <div className="d-flex flex-row gap-2">
            <InputOutlined lable="First Name" defaultValue="First Name" />
            <InputOutlined lable="Last Name" defaultValue="Last Name" />
          </div>
          <div>
            <InputOutlined
              lable="Email Address"
              defaultValue="Email Address"
              email="email"
              value="value"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewCustomer;
