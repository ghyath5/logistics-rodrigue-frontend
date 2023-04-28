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
import { Drivers } from "./Drivers";
import AddNewDriver from "./AddNewDriver";
import EditCustomersOrder from "./EditCustomersOrder";
import Pdf from "../components/pdf";
import EditrunDate from "./EditrunDate";
import Organisations from "./Organisations";
import { UserContextProvider } from "../context/userContext";
import EditAccount from "./EditAccount";
import EditOrganisation from "./EditOrganisation";
import AddOrganisation from "./AddOrganisation";
import ManageCalls from "./ManageCalls";
import Cookies from "js-cookie";

const Main = () => {
  let monA = Cookies.get("ismonA");
  return (
    <UserContextProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route element={<PrivateRoutes />}>
          <Route path="editCustomersOrder" element={<EditCustomersOrder />} />
          <Route path="editrunDate" element={<EditrunDate />} />
          <Route path="pdf" element={<Pdf />} />
          <Route path="organisations" element={<Organisations />} />
          <Route path="editAccount" element={<EditAccount />} />
          <Route path="editOrganisation" element={<EditOrganisation />} />
          <Route path="AddOrganisation" element={<AddOrganisation />} />
          <Route path="manageCalls" element={<ManageCalls />} />

          {monA === "true" && <Route path="/" element={<Dashboard />} />}
          {monA === "true" && (
            <Route exact path="staffmembers" element={<StaffMembers />} />
          )}
          {monA === "true" && (
            <Route
              exact
              path="AddNewStaffMember"
              element={<AddNewStaffMember isEdit={false} />}
            />
          )}
          {monA === "true" && (
            <Route
              exact
              path="editStaffMember"
              element={<AddNewStaffMember isEdit={true} />}
            />
          )}
          <Route exact path="products" element={<Products />} />
          <Route exact path="runs" element={<Finalise />} />
          <Route exact path="editrun" element={<EditRun />} />
          <Route
            exact
            path="customers"
            element={<Customers archived={false} />}
          />
          <Route exact path="regions" element={<Routess />} />
          <Route exact path="addnewregion" element={<AddNewRoute />} />

          <Route
            exact
            path="editRegion"
            element={<AddNewRoute isEdit={true} />}
          />
          <Route exact path="customerDetails" element={<CustomerDetails />} />
          <Route exact path="orders" element={<Orders />} />
          <Route exact path="vehicles" element={<Vehicles />} />
          <Route exact path="promotions" element={<Promotions />} />
          <Route exact path="drivers" element={<Drivers />} />

          <Route
            exact
            path="addnewcustomer"
            element={<AddNewCustomer isEdit={false} />}
          />
          <Route
            exact
            path="editcustomer"
            element={<AddNewCustomer isEdit={true} />}
          />
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
            path="addNewDriver"
            element={<AddNewDriver isEdit={false} />}
          />
          <Route
            exact
            path="editDriver"
            element={<AddNewDriver isEdit={true} />}
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
          <Route
            exact
            path="addneworder"
            element={<AddNewOrders isEdit={false} />}
          />
          <Route
            exact
            path="editOrder"
            element={<AddNewOrders isEdit={true} />}
          />
          <Route
            exact
            path="managecategories"
            element={<ManageProductCategories />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default Main;
