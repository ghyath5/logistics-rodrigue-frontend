import React from "react";
import ScheduleCrad from "../components/ScheduleCrad";
import Seam from "../assets/seam.svg";
import BoxFill from "../assets/Box-fil.svg";
import TruckFill from "../assets/truck-fill.svg";
import ScheduleCrad1 from "../components/ScheduleCrad1";
import Ev from "../assets/ev.svg";

import BtnContained from "../components/BtnContained"
const Dashboard = () => {
  return (
    <>
    <div className="container">
      <h6 className="">Welcome back</h6>
      <h3>Sonia Stewart</h3>
      <BtnContained title="MANAGE MY INVENTORY"/>
    </div>
      <div className="container">
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
        <div className="dashboard-inner">
          <ScheduleCrad1 title3="Deliveries for " icon3={Ev} />
        </div>
        <div className="  d-flex flex-wrap">
          <ScheduleCrad1 title3="Deliveries for " icon3={Ev} value3={12}/>
         
        </div>
      </div>
    </>
  );
};

export default Dashboard;
