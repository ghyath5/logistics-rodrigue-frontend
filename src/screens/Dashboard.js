import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import Routs from "../assets/routs.svg";
import StatsCard from "../components/layout/StatsCard";
import Loader from "../components/layout/Loader";
import Bus from "../assets/bus.svg";
import Person from "../assets/personIcon.svg";
import Dollar from "../assets/dollarIcon.svg";
import KiloMetre from "../assets/kilometre.svg";
import Layout from "../components/partials/Layout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(Cookies.get("monjayUser"));
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="mainDashboardContainer dashboardBg position-relative">
        <div className="dashboardBgCover"></div>
        <div className="dashboardTitleContainer text-white">
          <h6>Welcome back</h6>
          <h3 className="text-capitalize">{user}</h3>
          <BtnContained
            title="MANAGE MY INVENTORY"
            handleClick={() => {
              navigate("/products");
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
            classes="bgYellow"
            col={4}
          />
          <StatsCard
            title="Deliveries"
            value={5}
            desc="Scheduled for tomorrow"
            classes="bgGreen"
            col={4}
          />
          <StatsCard
            title="Drivers"
            value={4}
            desc="Scheduled for tomorrow"
            classes="bgRed"
            last={true}
            col={4}
          />
        </div>
        <h3 className="headerTitle my-3">Deliveries for Tomorrow</h3>
        <div className="dashboard-tomorrow pt-2 bgLightGray">
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
