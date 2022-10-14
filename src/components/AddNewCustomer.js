import React from "react";
import { TextField } from "@mui/material";
import InputOutlined from "./InputOutlined";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const AddNewCustomer = () => {
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      <div className="">
        <h4 className="headerTitle my-3">Add New Customer</h4>
      </div>
      <div className="customerDetailsContainer  ">
        <div className=" text-center mt-3">
          <h5 className="titleCustomerDetail">Customer Details</h5>
        </div>
        <hr className="lineCustomer mx-5"></hr>
        <div>
          <h5 className="titleCustomerDetail mx-5">Business Details</h5>
        </div>
        <div className="mx-5">
          <InputOutlined lable="Business Name" defaultValue="Business Name" />
          <InputOutlined lable="ABN" defaultValue="ABN" />
          <InputOutlined
            lable="Delivery Address"
            defaultValue="Being Typing to search for a location"
          />
          <div className="d-flex flex-row justify-content-between  input-delviry-address  ">
            <InputOutlined
              lable="Delivery Address Line1"
              defaultValue="Delivery Address Line1"
            />
            <InputOutlined
              lable="Delivery Address Line2"
              defaultValue="Delivery Address Line1"
            />
          </div>
          <div className="row justify-content-between    ">
            <div className="col-md-6">
              <InputOutlined lable="Suburb" defaultValue="Suburb" />
            </div>
            <div className=" col-md-6  justify-content-between input-delviry-address  ">
              <div className="row">
                <div className="col-md-6 mt-4">
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    size="small"
                    label="Native select"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className="col-md-6">
                  <InputOutlined lable="Postcode" defaultValue="Postcode" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <TextField
              id="outlined-multiline-static"
              label="Custimer Notes (Max of 250 Characters)"
              multiline
              rows={4}
              defaultValue="Default Value"
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
            <InputOutlined lable="Email Address" defaultValue="Email Address" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewCustomer;
