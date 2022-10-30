import React from 'react'
import useDeviceType from "../../hooks/useDeviceType";


export const StatsCardVehclie = ({ icon, last, title, value }) => {
    const { deviceType } = useDeviceType();

  return (
    <div
    className={`${
      last && deviceType === "tablet"
        ? "col-12 p-0"
        : "p-0 col-12 col-sm-6 col-md-2"
    } `}
  >
    <div className="me-2 me-sm-3 mb-3 mb-sm-1">
      <div className="statsCardVehicle d-flex justify-content-center flex-column text-center">
        {icon && <img src={icon} alt="icon" className="mb-3" />}
        <h2>{value}</h2>
        <h4 className="m-0">{title}</h4>
      </div>
    </div>
  </div>
  )
}
