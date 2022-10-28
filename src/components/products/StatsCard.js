import React from "react";
import useDeviceType from "../../hooks/useDeviceType";

const StatsCard = ({ icon, last, title, value }) => {
  const { deviceType } = useDeviceType();

  return (
    <div
      className={`${
        last && deviceType === "tablet"
          ? "col-12 p-0"
          : "p-0 col-12 col-sm-6 col-md-4"
      } `}
    >
      <div className="me-2 me-sm-3 mb-3 mb-sm-1">
        <div className="statsCard text-center py-5">
          {icon && <img src={icon} alt="icon" className="mb-3" />}
          <h3 className="m-0">{title}</h3>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
