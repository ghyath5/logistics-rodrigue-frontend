import React, { useState, useEffect } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/layout/StatsCard";
import axios from "../axios";
import { vehiclesStatuses } from "../data/configs";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import DeleteModal from "../components/DeleteModal";

export const Vehicles = () => {
  const [loading, setLoading] = useState(true);
  const [allVehciles, setAllVehclies] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    await axios
      .get(`/vehicles`)
      .then((res) => {
        setAllVehclies(res.data.vehicles);
        setRows([]);
        res.data.vehicles.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.model + "/" + p.plate,
              p.make,
              vehiclesStatuses[p.status]?.label,
              new Date(p.expiresIn).toDateString(),
              new Date(p.updatedAt).toDateString(),
              "Edit",
              "Delete"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeleteVehicle = async (id) => {
    await axios
      .delete(`/vehicles/${id}`)
      .then((res) => {
        setAllVehclies((prev) => prev.filter((S) => S._id !== id));
        setRows((prev) => prev.filter((S) => S.id !== id));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setCantDeleteModalVisible(true);
        }
      });
  };

  const columns = [
    {
      id: "NameModel",
      label: "Name and Model",
      minWidth: 120,
      class: ["nameModel"],
    },
    {
      id: "manufacturingYear",
      label: "Make Year",
      minWidth: 50,
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
      id: "LastUsedOn",
      label: "Last Use",
      minWidth: 150,
    },
    {
      id: "setting",
      label: "Edit",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => nav("/editvehicle", { state: { id: id } }),
    },

    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      action: (id) => handleDeleteVehicle(id),
    },
  ];

  function createData(
    id,
    NameModel,
    manufacturingYear,
    Statu,
    RegistrationDue,
    LastUsedOn,
    setting,
    remove
  ) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return {
      id,
      NameModel,
      manufacturingYear,
      Statu,
      RegistrationDue,
      LastUsedOn,
      setting,
      remove,
    };
  }

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h3
            className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}
          >
            Vehicles
          </h3>
        </div>
        <div>
          <BtnContained
            title="Add Vehicles"
            handleClick={() => nav("/addnewvehicle")}
          />
        </div>
      </div>
      {/* <div className="row m-0 w-100">
        <StatsCard
          title="Available"
          value={allVehciles?.length}
          classes="bgLightBlue"
          col={3}
        />
        <StatsCard
          title="On Road"
          value={allVehciles?.filter((x) => x.status === 1).length}
          classes="bgGreen"
          col={3}
        />
        <StatsCard
          title="Out of Service"
          value={allVehciles?.filter((x) => x.status === 2).length}
          classes="bgRed"
          col={3}
        />
        <StatsCard
          title="Registration Due"
          value={allVehciles?.filter((x) => x.status === 0).length}
          classes="bgYellow"
          col={3}
        />
      </div> */}
      {/* <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
        <div>
          <h3
            className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}
          >
            All Vehicles
          </h3>
        </div>
      </div> */}
      {rows.length > 0 ? (
        <Table columns={columns} rows={rows} />
      ) : (
        <NoDataPlaceHolder current="Vehicles" />
      )}
    </Layout>
  );
};
