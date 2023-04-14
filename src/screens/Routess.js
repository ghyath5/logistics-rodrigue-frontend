import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import BtnContained from "../components/layout/BtnContained";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import DeleteModal from "../components/DeleteModal";
import SureToDelete from "../components/SureToDelete";

const Routess = () => {
  const [loading, setLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);
  const [sureToDeleteVisible, setSureToDeleteVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  useEffect(() => {
    fetchRoutes();
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
            createData(
              p._id,
              p.name,
              p.description,
              p.from,
              p.to,
              "Edit customers",
              "Edit",
              "Delete"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeleteRoute = async (id) => {
    await axios
      .delete(`/routes/${id}`)
      .then(() => {
        setAllRoutes((prev) => prev.filter((S) => S._id !== id));
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
      action: (id) => prepareDelete(id),
    },
  ];
  const prepareDelete = async (id) => {
    setItemToDelete(id);
    setSureToDeleteVisible(true);
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      {sureToDeleteVisible && (
        <SureToDelete
          setOpen={setSureToDeleteVisible}
          handleDelete={handleDeleteRoute}
          id={itemToDelete}
        />
      )}
      {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h3
            className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}
          >
            Regions
          </h3>
        </div>
        <div>
          <BtnContained
            title="Add Region"
            handleClick={() => nav("/addnewregion")}
          />
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

export default Routess;
