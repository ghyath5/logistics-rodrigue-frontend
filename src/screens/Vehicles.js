import React, { useState, useEffect } from "react";
import BtnContained from "../components/layout/BtnContained";
import { StatsCardVehclie } from "../components/layout/StatsCardVehclie";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Vehciles from "../data/vehicle";
import { useNavigate } from "react-router-dom";

export const Vehicles = ({ classes }) => {
  const [allVehciles, setAllVehclies] = useState(Vehciles);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "NameModel",
      label: "Name && Model",
      minWidth: 100,
      class: "nameModel",
    },
    {
      id: "Statu",
      label: "Status",
      minWidth: 200,
      class:
        "statusCellHidden/statuCellOnRoad/statuCellOutOfService/statusCellVisible",
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
      class: "tableEditBtn",
    },

    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: "tableDeleteBtn",
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
      <div className="d-sm-flex gap-2 justify-content-between flex-wrap w-100">
        <StatsCardVehclie title="Total No of Vehicles" value={4} />
        <StatsCardVehclie title="On Road Vehicles" value={2} />
        <StatsCardVehclie title="Out of Service Vehicles" value={0} />
        <StatsCardVehclie title="Registration Due" value={2} />
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
