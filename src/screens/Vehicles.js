import React, { useState, useEffect } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Vehciles from "../data/vehicle";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/layout/StatsCard";

export const Vehicles = () => {
  const [allVehciles, setAllVehclies] = useState(Vehciles);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "NameModel",
      label: "Name and Model",
      minWidth: 120,
      class: ["nameModel"],
    },
    {
      id: "Statu",
      label: "Status",
      minWidth: 180,
      class: [
        "statusCellHidden",
        "statuCellOnRoad",
        "statuCellOutOfService",
        "statusCellVisible",
      ],
    },
    {
      id: "RegistrationDue",
      label: "Registration Due",
      minWidth: 150,
    },
    {
      id: "AssignedDriver",
      label: "Assigned Driver",
      minWidth: 50,
    },
    {
      id: "LastUsedOn",
      label: "Last Used On",
      minWidth: 50,
    },
    {
      id: "setting",
      label: "Setting",
      minWidth: 50,
      class: ["tableEditBtn"],
    },

    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: ["tableDeleteBtn"],
    },
  ];

  function createData(
    id,
    NameModel,
    Statu,
    RegistrationDue,
    AssignedDriver,
    LastUsedOn,
    setting,
    remove
  ) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return {
      id,
      NameModel,
      Statu,
      RegistrationDue,
      AssignedDriver,
      LastUsedOn,
      setting,
      remove,
    };
  }
  useEffect(() => {
    allVehciles.forEach((p) => {
      setRows((prev) => [
        ...prev,
        createData(
          p.id,
          p.NameModel,
          p.Statu,
          p.RegistrationDue,
          p.AssignedDriver,
          p.LastUsedOn,
          "Setting",
          "Delete"
        ),
      ]);
    });
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h3 className="headerTitle my-2">Vehicles</h3>
        </div>
        <div>
          <BtnContained
            title="Add Vehicles"
            handleClick={() => nav("/addnewvehicle")}
          />
        </div>
      </div>
      <div className="row m-0 w-100">
        <StatsCard
          title="Total Vehicles"
          value={4}
          classes="bgLightBlue"
          col={3}
        />
        <StatsCard title="On Road" value={2} classes="bgGreen" col={3} />
        <StatsCard title="Out of Service" value={1} classes="bgRed" col={3} />
        <StatsCard
          title="Registration Due"
          value={2}
          classes="bgYellow"
          col={3}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="headerTitle my-2">All Vehicles</h3>
        </div>
        <div></div>
      </div>
      <div></div>
      <Table columns={columns} rows={rows} />
    </Layout>
  );
};
