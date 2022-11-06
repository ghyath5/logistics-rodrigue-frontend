import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BtnContained from "../components/layout/BtnContained";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const AddPromotion = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <div className="d-flex align-items-center ">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/promotions")}
          />
          <h4 className="headerTitle my-3 mx-2"> View Promotion</h4>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          <div className="">
            <BtnContained title="Edit Promotion" />
          </div>
          <div className="delete-promotion-btn">
            <BtnContained title="Delete Promotion" />
          </div>
        </div>
      </div>
      <div className="promotion-container ps-4 pe-2 py-3 mt-2">
        <div>
          <h4>Test</h4>
          <h6>Test</h6>
          <span className="range-date">
            02:12 am,24 October 2022 -06:30am,28 October 2022
          </span>
        </div>
        <hr style={{ color: "#495767" }} className="me-4"></hr>
        <div>
          <h6>Promotion Details</h6>
        </div>
        <div className="row">
          <span className="col-md-4 text-promotion col-sm-12  ">
            Traditinal Falfel Poushes 225g-$ 50.00
            <span className="formDolar"> (From $2.5)</span>
          </span>
          <span className="col-md-8 text-promotion col-sm-12">
            Coles Med del Traditional Falfel 225g-$ 50.00
            <span className="formDolar"> (From $2.5)</span>
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap my-3 ">
        <h4 className="headerTitle my-3 mx-2">Customers With this Promotion</h4>
        <div>
          <BtnContained title="add customers to promotion" />
        </div>
      </div>
      <div className="customer-promotion pb-2">
        <div className="text-end pe-2 mt-2">

        <HighlightOffIcon color="error" fontSize="small" className="circel-delete-icon"/>
        </div>

      <div className=" row   mx-1 my-1 ">
        <div className="col-md-3 container-promotion text-left">
          <h5 style={{color:"#63894A"}} className="text-left title-promotion-">Woolworths Gregory Hills SM-1331</h5>
          <div className="d-flex ">
            <span className="title-promotion text-left fs-6 me-1">Phone: </span>
            <span className="title-promotion-with text-left ">1234546</span>
          </div>
        </div>
        <div className="col-md-3   container-promotion">
          <p className="title-promotion">Address</p>
          <p className="title-promotion-with">
            33 village Circuit Gregory Hills New South Wales 2778
          </p>
        </div>
        <div className="col-md-2   container-promotion">
          <p className="title-promotion">Assigned On </p>
          <p className="title-promotion-with">24 October 2022</p>
        </div>
        <div className="col-md-2   container-promotion">
          <p className="title-promotion">Assigned By </p>
          <p className="title-promotion-with">Sonia Stewart </p>
        </div>
        <div className="col-md-2   ">
          <p className="title-promotion">Amount Owing </p>
        </div>
      </div>
      </div>
    </Layout>
  );
};
