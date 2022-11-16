import React from "react";

export const StatsCardVehclie = ({ icon, last, title, value }) => {
  return (
    <div className="statsCardVehicleCon">
      <div className="me-2 me-sm-3 mb-3 mb-sm-1 w-100">
        <div className="statsCardVehicle d-flex justify-content-center flex-column text-center gap-2 my-2">
          {icon && <img src={icon} alt="icon" className="mb-3" />}
          <h2>{value}</h2>
          <h5 className="m-0 title-vehicles">{title}</h5>
        </div>
      </div>
    </div>
  );
};
