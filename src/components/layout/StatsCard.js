import React from "react";

const StatsCard = ({ icon, last, title, value, classes, col }) => {
  return (
    <div
      className={`${
        last
          ? `col-sm-12 col-md-${col} p-0`
          : `p-0 col-12 col-sm-6 col-md-${col} `
      } `}
    >
      <div className={`me-2 me-sm-3 mb-3 mb-sm-1`}>
        <div
          className={`statsCard d-flex justify-content-center flex-column text-center ${classes}`}
        >
          {icon && <img src={icon} alt="icon" className={`mb-3`} />}
          <h3 className="m-0">{title}</h3>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
