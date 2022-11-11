import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/partials/Layout";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";

const AddNewStaffMember = () => {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  console.log(firstName);
  const handleSubmit = (e) => {
    e.prevent.default();
  };

  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/stuffmember")}
        />
        <h4 className="headerTitle my-3 mx-2"> Add New Staff Member</h4>
      </div>
      <form className="formsContainer" onSubmit={handleSubmit}>
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Staff Member Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                lable="First Name"
                defaultValue="First Name"
                type="text"
                value={firstName}
                setValue={(e) => setFirstName(e.target.value)}
                name="firstNmae"
                id="firstName"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                lable="Last Name"
                defaultValue="Last Name"
                type="text"
                value={lasttName}
                setValue={(e) => setLastName(e.target.value)}
                name="lasttName"
                id="firslasttNametName"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                lable="Employee ID Number"
                defaultValue="Employee ID Number"
                type="text"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                lable="Account Type"
                defaultValue="Account Type"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mx-sm-12">
              <InputOutlined
                lable="Email Address"
                defaultValue="Email Address"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title="CREATE STAFF MEMBER"
            handleClick={() => {
              console.log("create");
            }}
          />
        </div>
      </form>
    </Layout>
  );
};

export default AddNewStaffMember;
