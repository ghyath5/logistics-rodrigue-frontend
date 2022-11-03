import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Footer from "../components/partials/Footer";
import Finalise from "./Finalise";
import Customers from "./Customers";
import Orders from "./Orders";
import { Vehicles } from "./Vehicles";
import Promotions from "./Promotions";
import { StaffMembers } from "./StaffMembers";
import AddNewCustomer from "../components/AddNewCustomer";
import AddNewVehicle from "./AddNewVehicle";
import AddNewStaffMember from "./AddNewStaffMember";
import { AddPromotion } from "./AddPromotion";

const Main = () => {
  return (
    <>
      <div className="position-relative mainContainer pt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="products" element={<Products />} />
          <Route exact path="finalise" element={<Finalise />} />
          <Route exact path="customers" element={<Customers />} />
          <Route exact path="orders" element={<Orders />} />
          <Route exact path="vehicles" element={<Vehicles />} />
          <Route exact path="promotions" element={<Promotions />} />
          <Route exact path="stuffmember" element={<StaffMembers />} />
          <Route exact path="addnewcustomer" element={<AddNewCustomer />} />
          <Route exact path="addnewvehicle" element={<AddNewVehicle />} />
          <Route exact path="addpromotion" element={<AddPromotion />} />

          <Route
            exact
            path="AddNewStaffMember"
            element={<AddNewStaffMember />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Main;
