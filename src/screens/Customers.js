import React from "react";
import AddNewCustomer from "../components/AddNewCustomer";

const Customers = () => {
  return (
    <div className="px-2 py-2 px-sm-4 py-sm-2 ">
      <div className="container mt-5">
        <AddNewCustomer />
      </div>
    </div>
  );
};

export default Customers;
