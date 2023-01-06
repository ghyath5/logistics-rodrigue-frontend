import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Finalise from "./Finalise";
import Customers from "./Customers";
import CustomerDetails from "./CustomerDetails";
import Orders from "./Orders";
import { Vehicles } from "./Vehicles";
import Promotions from "./Promotions";
import { StaffMembers } from "./StaffMembers";
import AddNewCustomer from "./AddNewCustomer";
import AddNewVehicle from "./AddNewVehicle";
import AddNewStaffMember from "./AddNewStaffMember";
import { AddPromotion } from "./AddPromotion";
import AddProducts from "./AddProducts";
import ManageProductCategories from "./ManageProductCategories";
import AddNewOrders from "./AddNewOrders";
// import NotFound from "./NotFound";
import Login from "./auth/Login";
// import Register from "./auth/Register";
import PrivateRoutes from "../utils/PrivateRoutes";
import Routess from "./Routess";
import AddNewRoute from "./AddNewRoute";
import EditRun from "./EditRun";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="products" element={<Products />} />
          <Route exact path="runs" element={<Finalise />} />
          <Route exact path="editrun" element={<EditRun />} />
          <Route
            exact
            path="customers"
            element={<Customers archived={false} />}
          />
          <Route exact path="routes" element={<Routess />} />
          <Route exact path="addnewroute" element={<AddNewRoute />} />
          <Route exact path="customerDetails" element={<CustomerDetails />} />
          <Route exact path="orders" element={<Orders />} />
          <Route exact path="vehicles" element={<Vehicles />} />
          <Route exact path="promotions" element={<Promotions />} />
          <Route exact path="staffmembers" element={<StaffMembers />} />
          <Route exact path="addnewcustomer" element={<AddNewCustomer />} />
          <Route
            exact
            path="archivedCustomers"
            element={<Customers archived={true} />}
          />
          <Route
            exact
            path="addnewvehicle"
            element={<AddNewVehicle isEdit={false} />}
          />
          <Route
            exact
            path="editvehicle"
            element={<AddNewVehicle isEdit={true} />}
          />
          <Route
            exact
            path="addpromotion"
            element={<AddPromotion isEdit={false} />}
          />
          <Route
            exact
            path="editpromotion"
            element={<AddPromotion isEdit={true} />}
          />
          <Route
            exact
            path="addproducts"
            element={<AddProducts isEdit={false} />}
          />
          <Route
            exact
            path="editproducts"
            element={<AddProducts isEdit={true} />}
          />
          <Route exact path="addneworder" element={<AddNewOrders />} />
          <Route
            exact
            path="managecategories"
            element={<ManageProductCategories />}
          />
          <Route
            exact
            path="AddNewStaffMember"
            element={<AddNewStaffMember isEdit={false} />}
          />
          <Route
            exact
            path="EditStaffMember"
            element={<AddNewStaffMember isEdit={true} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Main;
