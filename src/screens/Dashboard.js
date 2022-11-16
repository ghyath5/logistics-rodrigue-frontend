import React from "react";
import BtnContained from "../components/layout/BtnContained";
import Routs from "../assets/routs.svg";
import StatsCard from "../components/layout/StatsCard";
import Loader from "../components/layout/Loader";
import Bus from "../assets/bus.svg";
import Person from "../assets/personIcon.svg";
import Dollar from "../assets/dollarIcon.svg";
import KiloMetre from "../assets/kilometre.svg";
import Layout from "../components/partials/Layout";
import { useState } from "react";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="dashboardBg position-relative">
        <div className="dashboardBgCover"></div>
        <div className="dashboardTitleContainer text-white">
          <h6>Welcome back</h6>
          <h3>Rodrigue Abdallah</h3>
          <BtnContained
            title="MANAGE MY INVENTORY"
            handleClick={() => {
              console.log("MANAGE");
            }}
          />
        </div>
      </div>
      <Layout dashboard>
        <h3 className="headerTitle mb-2 mt-0">Schedule Overview</h3>
        <div className="row m-0">
          <StatsCard
            title="Orders"
            value={1}
            desc="Need confirming for tomorrow"
          />
          <StatsCard
            title="Deliveries"
            value={5}
            desc="Scheduled for tomorrow"
          />
          <StatsCard
            title="Drivers"
            value={4}
            desc="Scheduled for tomorrow"
            last={true}
          />
        </div>
        <h3 className="headerTitle my-3">Deliveries for Tomorrow</h3>
        <div className="dashboard-tomorrow pt-2">
          <div className="dashboard-inner my-4">
            <div className="scheduleCard no-border">
              <div className="text-center my-2 d-flex flex-column align-items-center mx-auto">
                <img src={Routs} className="mb-2" alt="icon" />
                <h5 className="m-0 textLightBlue">-</h5>
                <span className="deliveriesTitle textLightBlue">
                  Deliveries for
                </span>
              </div>
            </div>
          </div>
          <hr className="mx-5 line"></hr>
          <div className="d-flex my-4 mx-auto justify-content-between py-2 TomorrowsCardContainer">
            <div className="scheduleCard no-border">
              <div className="text-center my-2 d-flex flex-column align-items-center mx-auto">
                <img src={Bus} className="mb-2" alt="icon" />
                <h5 className="m-0 textYellow">12</h5>
                <span className="deliveriesTitle textYellow">Vehicles</span>
              </div>
            </div>
            <div className="scheduleCard no-border">
              <div className="text-center my-2 d-flex flex-column align-items-center mx-auto">
                <img src={Dollar} className="mb-2" alt="icon" />
                <h5 className="m-0 textGreen">50</h5>
                <span className="deliveriesTitle textGreen">Sales</span>
              </div>
            </div>
            <div className="scheduleCard no-border">
              <div className="text-center my-2 d-flex flex-column align-items-center mx-auto">
                <img src={KiloMetre} className="mb-2" alt="icon" />
                <h5 className="m-0 textRed">43</h5>
                <span className="deliveriesTitle textRed">Deliveries</span>
              </div>
            </div>
            <div className="scheduleCard no-border">
              <div className="text-center my-2 d-flex flex-column align-items-center mx-auto">
                <img src={Person} className="mb-2" alt="icon" />
                <h5 className="m-0 textGray">7</h5>
                <span className="deliveriesTitle textGray">Drivers</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
