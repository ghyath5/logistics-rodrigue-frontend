import React from "react";

const TomorrowsCard = ({ icon, title, value, classes }) => {
  return (
    <div className="scheduleCard col-6 col-sm-2 p-0">
      <div
        className={
          classes +
          " text-center my-2 d-flex flex-column align-items-center mx-auto"
        }
      >
        <img src={icon} className="mb-2" alt="icon" />
        {value && (
          <h5 className="m-0 deliveriesValue">
            {title === "Distance" ? value + " km" : value}
          </h5>
        )}
        <span className="deliveriesTitle">{title}</span>
      </div>
    </div>
  );
};

export default TomorrowsCard;
