import React from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FormAll from "../components/customer/FormAll";

const AddNewCustomer = ({ isEdit }) => {
  const nav = useNavigate();
  const [completed, setCompleted] = React.useState({});

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <div className="d-flex align-items-center ">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/customers")}
          />
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-3 mx-2`}
          >
            {isEdit ? "Edit Customer" : "Add New Customer"}
          </h4>
        </div>
      </div>
      <FormAll isEdit={isEdit} />
    </Layout>
  );
};

export default AddNewCustomer;
