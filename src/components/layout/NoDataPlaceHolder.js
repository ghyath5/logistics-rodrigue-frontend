import React from "react";
import emptyIcon from "../../assets/noData.svg";

const NoDataPlaceHolder = ({ current }) => {
  return (
    <div className="text-center mt-10">
      <img src={emptyIcon} alt="no data" />
      <p className="mt-2 fw-700">No {current} to show</p>
    </div>
  );
};

export default NoDataPlaceHolder;
