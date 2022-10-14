import React from "react";
import DropDown from "./DropDown";
import InputOutlined from "./InputOutlined";

import ReactPhonNumber from "./ReactPhonNumber";

const AddNewCustomer = () => {
  return (
    <section>
      <div className="">
        <h4 className="headerTitle my-3">Add New Customer</h4>
      </div>
      <div className="customerDetailsContainer  ">
        <div className=" text-center mt-5 mb-4">
          <h5 className="titleCustomerDetail">Customer Details</h5>
        </div>
        <hr className="lineCustomer mx-5"></hr>
        <div>
          <h5 className="titleCustomerDetail mx-5">Business Details</h5>
        </div>
        <div className="mx-5">
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
          <div className="d-flex flex-row justify-content-between  input-delviry-address  ">
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
          <div className="row justify-content-between    ">
            <div className="col-md-6">
              <InputOutlined lable="Suburb" defaultValue="Suburb" />
            </div>
            <div className=" col-md-6  justify-content-between input-delviry-address  ">
              <div className="row">
                <div className="col-md-6 align-self-end">
                  {/* <InputOutlined/> */}
                  <DropDown lable="state" defaultValue="state" />
                </div>
                <div className="col-md-6">
                  <InputOutlined lable="Postcode" defaultValue="Postcode" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex   flex-column">
            <lable className="lable-customer mb-2">
              Custimer Notes (Max of 250 Characters)*
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
        <div className="mt-5 ">
          <h5 className="titleCustomerDetail mx-5">Account Representative</h5>
        </div>
        <div className="mx-5">
          <div className="d-flex flex-row justify-content-between  input-delviry-address  ">
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
        <ReactPhonNumber />
      </div>
    </section>
  );
};

export default AddNewCustomer;
