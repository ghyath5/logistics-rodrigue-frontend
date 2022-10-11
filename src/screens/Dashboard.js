import React from "react";
import ScheduleCrad from "../components/ScheduleCrad";
import BtnContained from "../components/BtnContained";
import Seam from "../assets/seam.svg";
import BoxFill from "../assets/Box-fil.svg";
import TruckFill from "../assets/truck-fill.svg";
import ScheduleCrad1 from "../components/ScheduleCrad1";
import Bus from "../assets/bus.svg";
import Routs from "../assets/routs.svg";
import Person from "../assets/personIcon.svg";
import Dollar from "../assets/dollarIcon.svg";
import KiloMetre from "../assets/kilometre.svg";
// import BoxDelevries from "../assets/box-deliveris.svg"

const Dashboard = () => {
  return (
    <div>
        <div className="dashboardBg">
      <div className="dashboardBgCover"></div>

        </div>
     
      <div className="mx-5 dashboardTitleContainer">
        <h6 className="dashboardTitle">Welcome back</h6>
        <h3 className="dashboardTitle">Sonia Stewart</h3>
        <BtnContained title="MANAGE MY INVENTORY" />
      </div>
      <div className="px-2 py-2 px-sm-4 py-sm-2">
        <div className="container mt-5">
          <h3 className="headerTitle my-2">Schedule Overview</h3>
        </div>
        <div className="d-flex flex-wrap">
          <ScheduleCrad
            title1="Orders"
            value1={1}
            title2="Need confirming for tomorrow"
            icon={Seam}
          />
          <ScheduleCrad
            title1="Delivries"
            value1={5}
            title2="Scheduled for tomorrow"
            icon={BoxFill}
          />
          <ScheduleCrad
            title1="Drivers"
            value1={4}
            title2="Scheduled for tomorrow"
            icon={TruckFill}
          />
        </div>
        <div className="container">
          <h3 className="headerTitle my-3">Deliveries for Tomorrow</h3>
        </div>
        <div className="container-tomorrow">
          <div className="dashboard-inner my-4 py-2">
            <ScheduleCrad1 title3="Deliveries for " icon3={Routs} />
          </div>
          <hr className="mx-5 line"></hr>
          <div className="  d-flex  flex-wrap my-4 list-deliveries py-2">
            <ScheduleCrad1 title3="Vehicle Used " icon3={Bus} value3={50} />
            <ScheduleCrad1
              title3="Deliveries for "
              icon3={Dollar}
              value3={12}
            />
            <ScheduleCrad1
              title3="Drivers Assigned  "
              icon3={Person}
              value3={6}
            />
            <ScheduleCrad1
              title3="Estimated Distance "
              icon3={KiloMetre}
              value3={330.5}
              km="Km"
            />
            <ScheduleCrad1
              title3="Deliveries for "
              icon3={KiloMetre}
              value3={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
