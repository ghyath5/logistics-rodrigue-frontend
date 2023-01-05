import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import BtnContained from "../components/layout/BtnContained";

const Routess = () => {
  const [loading, setLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchRoutes();
  }, []);

  function createData(id, name, description, from, to, remove) {
    return {
      id,
      name,
      description,
      from,
      to,
      remove,
    };
  }

  const fetchRoutes = async () => {
    setLoading(true);
    await axios
      .get(`/routes`)
      .then((res) => {
        setAllRoutes(res.data.routes);
        setRows([]);
        res.data.routes.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(p._id, p.name, p.description, p.from, p.to, "Delete"),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeleteRoute = async (id) => {
    setAllRoutes((prev) => prev.filter((S) => S._id !== id));
    setRows((prev) => prev.filter((S) => S.id !== id));

    await axios
      .delete(`/routes/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error);
  };

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 120,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 150,
    },
    {
      id: "from",
      label: "From",
      minWidth: 180,
    },
    {
      id: "to",
      label: "To",
      minWidth: 150,
    },
    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      action: (id) => handleDeleteRoute(id),
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h3 className="headerTitle my-2">Routes</h3>
        </div>
        <div>
          <BtnContained
            title="Add Route"
            handleClick={() => nav("/addnewroute")}
          />
        </div>
      </div>
      <Table columns={columns} rows={rows} />
    </Layout>
  );
};

export default Routess;
