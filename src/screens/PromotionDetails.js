import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BtnContained from "../components/layout/BtnContained";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios";

const PromotionDetails = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    setPromotion(location.state?.promotion);
  }, [location.state?.promotion]);

  const handleDeletePromotion = async (id) => {
    await axios
      .delete(`/promotion/${id}`)
      .then(() => {
        nav("/promotions");
      })
      .catch(console.error);
  };

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
            <BtnContained
              title="Edit Promotion"
              handleClick={() => {
                nav("/editpromotion", {
                  state: { id: promotion._id },
                });
              }}
            />
          </div>
          <div className="delete-promotion-btn">
            <BtnContained
              title="Delete Promotion"
              handleClick={() => {
                handleDeletePromotion(promotion._id);
              }}
            />
          </div>
        </div>
      </div>
      <div className="promotion-container px-4 py-3 mt-2">
        <div>
          <h4 className="text-capitalize">{promotion?.name}</h4>
          <h6>{promotion?.description}</h6>
          <span className="range-date">
            ends in: {new Date(promotion?.to).toString().split("GMT")[0]}
          </span>
        </div>
        <hr style={{ color: "#495767" }}></hr>
        <div>
          <h6>Promotion Details //hardcoded</h6>
        </div>
        <div className="row text-promotion">
          <span className="col-md-12 col-sm-12">
            Traditinal Falfel Poushes 225g - $50.00
            <span className="fromDolar"> (From $2.5)</span>
          </span>
          <span className="col-md-12 col-sm-12">
            Coles Med del Traditional Falfel 225g - $50.00
            <span className="fromDolar"> (From $2.5)</span>
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap my-3 ">
        <h4 className="headerTitle my-3 mx-2">
          Customers With this Promotion //hardcoded
        </h4>
        <div>
          <BtnContained
            title="add customers to promotion"
            handleClick={() => {
              console.log("add");
            }}
          />
        </div>
      </div>
      <div className="customer-promotion pb-2">
        <div className="text-end pe-2 mt-1">
          <HighlightOffIcon
            color="error"
            fontSize="small"
            className="circle-delete-icon"
          />
        </div>

        <div className="row mx-1 my-1">
          <div className="col-md-3 container-promotion text-left pt-2 pb-1">
            <h5 className="text-start promotion-customer">
              Woolworths Gregory Hills SM-1331
            </h5>
            <div className="d-flex ">
              <span className="title-promotion text-left fs-6 me-1">
                Phone:{" "}
              </span>
              <span className="title-promotion-with text-left ">1234546</span>
            </div>
          </div>
          <div className="col-md-3 container-promotion pt-2 pb-1">
            <p className="title-promotion">Address</p>
            <p className="title-promotion-with">
              33 village Circuit Gregory Hills New South Wales 2778
            </p>
          </div>
          <div className="col-md-2 container-promotion pt-2 pb-1">
            <p className="title-promotion">Assigned On </p>
            <p className="title-promotion-with">24 October 2022</p>
          </div>
          <div className="col-md-2 container-promotion pt-2 pb-1">
            <p className="title-promotion">Assigned By </p>
            <p className="title-promotion-with">Rodrigue Abdallah </p>
          </div>
          <div className="col-md-2 pt-2 pb-1 text-center">
            <p className="title-promotion">Amount Owing </p>
            <p className="title-promotion-with">_</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PromotionDetails;
