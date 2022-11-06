import React from "react";
import CardProduct from "../components/layout/CardProduct";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BtnOutlined from "../components/layout/BtnOutlined";
import BtnContained from "../components/layout/BtnContained";

const AddProducts = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/products")}
        />
        <h4 className="headerTitle my-3 mx-2">Add Products</h4>
      </div>
      <div>
        <CardProduct />
       </div>
      <div className="d-flex justify-content-between flex-wrap my-4 gap-2">
        <div className="  ">
          <BtnOutlined title="Add New" />
        </div>
        <div className="gap-2  d-flex justify-content-between flex-wrap">
          <div className="">
            <BtnOutlined title="Cancel" />
          </div>
          <div>
            <BtnContained title="Confirm Products" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
