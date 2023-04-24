import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import DeleteModal from "../components/DeleteModal";

const ManageCalls = () => {
  const [loading, setLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchCalls();
  }, []);

  function createData(id, name, description, from, to, cOrder, edit, remove) {
    return {
      id,
      name,
      description,
      from,
      to,
      cOrder,
      edit,
      remove,
    };
  }

  const fetchCalls = async () => {
    setLoading(true);
    await axios
      .get(`/customers/calls?routeId=644559458a75880526a2e541`)
      .then((res) => {
        console.log(res.data);
        // setAllRoutes(res.data.routes);
        // setRows([]);
        // res.data.routes.forEach((p) => {
        //   setRows((prev) => [
        //     ...prev,
        //     createData(
        //       p._id,
        //       p.name,
        //       p.description,
        //       p.from,
        //       p.to,
        //       "Edit customers",
        //       "Edit",
        //       "Delete"
        //     ),
        //   ]);
        // });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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
      id: "cOrder",
      label: "Customers Order",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => nav("/editCustomersOrder", { state: { id: id } }),
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => nav("/editRegion", { state: { id: id } }),
    },
    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      // action: (id) => handleDeleteRoute(id),
    },
  ];

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
            Calls
          </h3>
        </div>
      </div>
      {rows.length > 0 ? (
        <Table columns={columns} rows={rows} />
      ) : (
        <NoDataPlaceHolder current="Regions" />
      )}
    </Layout>
  );
};

export default ManageCalls;
