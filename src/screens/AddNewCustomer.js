import React from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import StepperForm from "../components/layout/StepperForm";

const steps = [
  "Business Details",
  "Account Representitive",
  "Deliveries Details",
  "Billing and Pricing",
];

const AddNewCustomer = () => {
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
          <h4 className="headerTitle my-3 mx-2">Add New Customer</h4>
        </div>
      </div>
      <StepperForm
        steps={steps}
        completed={completed}
        setCompleted={setCompleted}
      />
    </Layout>
  );
};

export default AddNewCustomer;
