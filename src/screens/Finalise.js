import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { runsStatuses } from "../data/configs";
import emptyBox from "../assets/noData.svg";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";

const Runs = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRuns, setRuns] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "driver",
      label: "Driver",
      minWidth: 100,
    },
    {
      id: "vehicle",
      label: "Vehicle",
      minWidth: 100,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
    },
    { id: "route", label: "Route", minWidth: 100 },
    { id: "ordersCount", label: "Orders", minWidth: 50 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
    },
    {
      id: "viewOrders",
      label: "actions",
      minWidth: 100,
      class: ["viewRoute"],
      action: (id) => nav("/editrun", { state: { id: id } }),
    },
  ];

  useEffect(() => {
    fetchRuns();
  }, []);

  function createData(
    id,
    driver,
    vehicle,
    route,
    ordersCount,
    status,
    date,
    viewOrders
  ) {
    return {
      id,
      driver,
      vehicle,
      route,
      ordersCount,
      status,
      date,
      viewOrders,
    };
  }

  const fetchRuns = async () => {
    setLoading(true);
    await axios
      .get("runs")
      .then((res) => {
        setRuns(res.data.runs);
        res.data.runs.forEach((f) => {
          setRows((prev) => [
            ...prev,
            createData(
              f._id,
              f?.driver?.name,
              f?.vehicle?.plate,
              f.route?.name,
              f.orders.length,
              runsStatuses[f.status].label,
              new Date(f.date.split("T")[0]).toDateString(),
              "View / Edit"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
        Runs
      </h3>
      <div className="finaliseTableContainer">
        {allRuns.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="Runs" />
        )}
      </div>
    </Layout>
  );
};

export default Runs;
