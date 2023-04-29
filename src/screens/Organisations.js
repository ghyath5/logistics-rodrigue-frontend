import React from "react";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import Table from "../components/layout/Table";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios";

const Organisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "id",
      label: "ID",
      noCell: true,
    },
    {
      id: "index",
      label: "",
      minWidth: 50,
    },
    {
      id: "name",
      label: "Organisation Name",
      minWidth: 150,
    },
    {
      id: "head",
      label: "Head",
      minWidth: 150,
    },
    {
      id: "totalCustomers",
      label: "Total Customers",
      minWidth: 50,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => nav("/editOrganisation", { state: { id: id } }),
    },
  ];

  useEffect(() => {
    fetchOrganisations();
  }, []);

  function createData(id, index, name, head, totalCustomers, edit) {
    return {
      id,
      index,
      name,
      head,
      totalCustomers,
      edit,
    };
  }

  const fetchOrganisations = async () => {
    setLoading(true);
    await axios
      .get(`/organization`)
      .then((res) => {
        setOrganisations(res.data);
        setRows([]);

        res.data.organizations.forEach((p, i) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              i + 1,
              p.name,
              p.head?.businessname,
              p.customers?.length || 0,
              "edit"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Organisations
        </h3>

        <div className="d-flex flex-wrap gap-2 mainBtn align-items-center">
          <div>
            <BtnContained
              title="ADD NEW ORGANISATION"
              handleClick={() => nav("/AddOrganisation")}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {rows.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="organisations" />
        )}
      </div>
    </Layout>
  );
};

export default Organisations;
