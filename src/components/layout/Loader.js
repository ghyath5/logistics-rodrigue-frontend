import React from "react";

const Loader = ({ small }) => {
  return (
    <div className="loaderContainer">
      <span className={`loader ${small ? "smallLoader" : "bigLoader"}`}></span>
    </div>
  );
};

export default Loader;
