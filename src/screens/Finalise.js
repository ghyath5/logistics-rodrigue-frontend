import React from "react";
import FinaliseCard from "../components/FinaliseCard";
import seacrIcon from "../assets/search.svg";
import FinaliseTable from "../components/FinaliseTable";

const Finalise = () => {
  return (
    <div className="px-2 py-2 px-sm-4 py-sm-2">
      <div className="container mt-5">
        <h3 className="headerTitle my-2">Finalise Deliveries</h3>
      </div>
      <div className="d-flex flex-wrap">
        <FinaliseCard title="Esitmated" value="$" title1={3000.1} />
        <FinaliseCard
          title="Number of Deliveries "
          title1="Deliveries"
          value={25}
        />
        <FinaliseCard title="Esitmated Distance " value="Km" title1={222.5} />
      </div>
      <div className="container my-5   finaliseTitl">
        <h3 className="headerTitle my-2">Previous Delivery Routes</h3>
        <div className="searchInputContainer d-flex px-2 py-1">
          <input placeholder="search" className="border-0" />
          <img src={seacrIcon} alt="searchIcon" />
        </div>
      </div>
      <div>
        <FinaliseTable />
      </div>
    </div>
  );
};

export default Finalise;
