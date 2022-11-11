import React from "react";
import useDeviceType from "../../hooks/useDeviceType";

export const StatsCardVehclie = ({ icon, last, title, value }) => {
  const { deviceType } = useDeviceType();

  return (
    <div
      // className={`${
      //   last && deviceType === "tablet"
      //     ? "col-12 p-0"
      //     : "p-0 col-12 col-sm-6 col-md-2"
      // } `}
      className="statsCardVehicleCon"
    >
      <div className="me-2 me-sm-3 mb-3 mb-sm-1  w-100">
        <div className="statsCardVehicle d-flex justify-content-center flex-column text-center   gap-2 my-2">
          {icon && <img src={icon} alt="icon" className="mb-3" />}
          <h2>{value}</h2>
          <h5 className="m-0 title-vehicles">{title}</h5>
        </div>
      </div>
    </div>
  );
};
