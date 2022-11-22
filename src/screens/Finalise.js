import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import StatsCard from "../components/layout/StatsCard";
import SearchInput from "../components/layout/SearchInput";
import finalise from "../data/finalise";
import Table from "../components/layout/Table";

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
    class: ["viewRoute"],
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
    <Layout>
      <h3 className="headerTitle my-2">Finalise Deliveries</h3>
      <div className="row m-0">
        <StatsCard title="Esitmated" value={3000.1 + "$"} />
        <StatsCard title="Number of Deliveries" value={25} />
        <StatsCard
          title="Esitmated Distance"
          value={222.5 + "km"}
          last={true}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h3 className="headerTitle">Previous Delivery Routes</h3>
        <SearchInput />
      </div>
      <div className="finaliseTableContainer">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Finalise;
