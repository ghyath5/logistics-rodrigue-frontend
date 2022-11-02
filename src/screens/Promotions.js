import React from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Promotions = () => {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="headerTitle my-2">Promotions</h3>
        </div>
        <div>
          <BtnContained
            title="Add Promotion"
            handelClick={() => nav("/addpromotion")}
          />
        </div>
      </div>
      <div className="promotion-container ps-4 pe-2 py-3">
        <div className="d-flex justify-content-end gap-1 me-1">
          <SettingsIcon className="settingIcon" />
          <DeleteIcon className="deleteIcon" />
        </div>
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
    </Layout>
  );
};

export default Promotions;
