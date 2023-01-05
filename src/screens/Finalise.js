import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import axios from "../axios";

const columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  { id: "route", label: "Route", minWidth: 100 },
  { id: "ordersCount", label: "Orders Count", minWidth: 50 },
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
  },
];

const Runs = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRuns, setRuns] = useState([]);

  useEffect(() => {
    fetchRuns();
  }, []);

  function createData(id, route, ordersCount, status, date, viewOrders) {
    return {
      id,
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
              f.route,
              f.orders.length,
              f.status,
              f.date,
              "View details"
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
      <h3 className="headerTitle my-2">Runs</h3>
      <div className="finaliseTableContainer">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Runs;
