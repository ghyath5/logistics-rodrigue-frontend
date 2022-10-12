import React from "react";
import useDeviceType from "../hooks/useDeviceType";

const StatsCard = ({icon, last, title, value }) => {
  const { deviceType } = useDeviceType();

  return (
    <div
      className={`${
        last && deviceType === "tablet"
          ? "col-12 p-2"
          : "p-2 col-12 col-sm-6 col-md-4"
      } `}
    >
      <div className="statsCard text-center py-5">
        {icon && <img src={icon} alt="icon" className="mb-3"/>}
        <h5 className="m-0">{title}</h5>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
