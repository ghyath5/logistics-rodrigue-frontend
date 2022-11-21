import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
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
import PromotionDetails from "./PromotionDetails";
import AddProducts from "./AddProducts";
import ManageProductCategories from "./ManageProductCategories";
import AddNewOrders from "./AddNewOrders";
import NotFound from "./NotFound";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoutes from "../utils/PrivateRoutes";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
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
          <Route exact path="promotionDetails" element={<PromotionDetails />} />
          <Route exact path="addproducts" element={<AddProducts />} />
          <Route exact path="addneworders" element={<AddNewOrders />} />
          <Route
            exact
            path="managecategories"
            element={<ManageProductCategories />}
          />
          <Route
            exact
            path="AddNewStaffMember"
            element={<AddNewStaffMember />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Main;
