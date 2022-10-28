import React from "react";
import BtnContained from "../components/layout/BtnContained";
import TomorrowsCard from "../components/dashboard/TomorrowsCard";
import Routs from "../assets/routs.svg";
import StatsCard from "../components/layout/StatsCard";
import Bus from "../assets/bus.svg";
import Person from "../assets/personIcon.svg";
import Dollar from "../assets/dollarIcon.svg";
import KiloMetre from "../assets/kilometre.svg";
import Layout from "../components/partials/Layout";

const Dashboard = () => {
  return (
    <>
      <div className="dashboardBg position-relative">
        <div className="dashboardBgCover"></div>
        <div className="dashboardTitleContainer text-white">
          <h6>Welcome back</h6>
          <h3>Sonia Stewart</h3>
          <BtnContained title="MANAGE MY INVENTORY" />
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
            title="Delivries"
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
            <TomorrowsCard
              title="Deliveries for "
              classes={"no-border"}
              icon={Routs}
              value="-"
            />
          </div>
          <hr className="mx-5 line"></hr>
          <div className="row my-4 justify-content-between py-2">
            <TomorrowsCard
              title="Vehicles"
              classes={"no-border"}
              icon={Bus}
              value="12"
            />
            <TomorrowsCard
              title="Sale"
              classes={"no-border"}
              icon={Dollar}
              value="50"
            />
            <TomorrowsCard
              title="Drivers"
              classes={"no-border"}
              icon={Person}
              value="7"
            />
            <TomorrowsCard
              title="Distance"
              classes={"no-border"}
              icon={KiloMetre}
              value="420"
            />
            <TomorrowsCard
              title="Deliveries"
              classes={"no-border"}
              icon={KiloMetre}
              value="43"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
