import React from "react";
import BtnContained from "../components/BtnContained"
import seacrIcon from "../assets/search.svg";
import OrderCard from "../components/OrderCard";


const Orders = () => {
  return (
    <div className="px-2 py-2 px-sm-4 py-sm-2">
      <div className="container mt-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h3 className="headerTitle my-2">Orders For...</h3>
        <div className="flex-wrap mainBtn">
            <BtnContained title="ORDER PLANING"/>
            <BtnContained title="ADD NEW ORDER"/>
            <BtnContained title="ADD COMPLETED ORDER"/>
        </div>
        </div>
        <div className="d-flex justify-content-between mt-2 flex-wrap">
         <div className="searchInputContainer headerSearch d-flex px-2 py-1">
          <input placeholder="search" className="border-0" />
          <img src={seacrIcon} alt="searchIcon" />
        </div>
        </div>
        <div>
          <OrderCard/>
        </div>
      </div>

    </div>
  );
};

export default Orders;
