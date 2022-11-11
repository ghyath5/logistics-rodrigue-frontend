import React from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";

const AddNewVehicle = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/vehicles")}
        />
        <h4 className="headerTitle my-3 mx-2"> Add New Vehicle</h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Vehicle Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined lable="Make" defaultValue="Make" type="text" />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined lable="Model" defaultValue="Model" type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                lable="Licence Plate Number"
                defaultValue="Licence Plate Number"
                type="text"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                lable="Registration Expiry Date"
                defaultValue="Registration Expiry Date"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mx-sm-12">
              <InputOutlined lable="Color" defaultValue="Color" type="text" />
            </div>
            <div className="col-md-4 mx-sm-12">
              <InputOutlined
                lable="Manufacture Year"
                defaultValue="Manufacture Year"
                type="text"
              />
            </div>
            <div className="col-md-4 mx-sm-12">
              <InputOutlined lable="Status" defaultValue="Status" type="text" />
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title="CREATE VEHICLE"
            handleClick={() => {
              console.log("create");
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNewVehicle;
