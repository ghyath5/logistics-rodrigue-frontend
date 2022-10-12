import React, { useEffect, useState } from "react";
import FinaliseCard from "../components/FinaliseCard";
import seacrIcon from "../assets/search.svg";
import FinaliseTable from "../components/FinaliseTable";
import finalise from "../data/finalise";

const columns = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "estimatedRevenue", label: "Estimated Revenue", minWidth: 150 },
  {
    id: "numberOfDeliveries",
    label: "Number Of Deliveries",
    minWidth: 150,
  },
  {
    id: "driversScheduled",
    label: "Drivers Scheduled",
    minWidth: 50,
  },
  {
    id: "vehiclesUsed",
    label: "Vehicles Used",
    minWidth: 50,
  },
  {
    id: "estimatedDistance",
    label: "Estimated Distance",
    minWidth: 50,
  },

  {
    id: "viewRoutes",
    label: "View Routes ",
    minWidth: 100,
  },
];

const Finalise = () => {
  const [rows, setRows] = useState([]);
  const [allFinalise, setAllFinalise] = useState(finalise);

  useEffect(() => {
    allFinalise.forEach((f) => {
      setRows((prev) => [
        ...prev,
        createData(
          f.id,
          f.date,
          f.estimatedRevenue,
          f.numberOfDeliveries,
          f.driversScheduled,
          f.vehiclesUsed,
          f.estimatedDistance,
          "View Routes"
        ),
      ]);
    });
  }, []);

  function createData(
    id,
    date,
    estimatedRevenue,
    numberOfDeliveries,
    driversScheduled,
    vehiclesUsed,
    estimatedDistance,
    viewRoutes
  ) {
    return {
      id,
      date,
      estimatedRevenue,
      numberOfDeliveries,
      driversScheduled,
      vehiclesUsed,
      estimatedDistance,
      viewRoutes,
    };
  }

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
      <div className="container   finaliseTitl d-flex justify-content-between align-items-center my-4">
        <h3 className="headerTitle headerSearch my-2">Previous Delivery Routes</h3>
        <div className="searchInputContainer headerSearch d-flex px-2 py-1">
          <input placeholder="search" className="border-0" />
          <img src={seacrIcon} alt="searchIcon" />
        </div>
      </div>
      <div className="finaliseTableContainer">
        <FinaliseTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Finalise;
