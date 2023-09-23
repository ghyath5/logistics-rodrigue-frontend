import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import axios from "../axios";
import DeleteModal from "../components/DeleteModal";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import SureToDelete from "../components/SureToDelete";

export const Drivers = () => {
  const [isLoading, setLoading] = useState(true);
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [itemToDelete, setItemToDelete] = useState("");
  const [sureToDeleteVisible, setSureToDeleteVisible] = useState(false);

  const columns = [
    {
      id: "code",
      label: "Code",
      minWidth: 50,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      class: ["nameModel"],
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 100,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => {
        nav("/editDriver", { state: { id: id } });
      },
    },
    {
      id: "remove",
      label: "Delete",
      minWidth: 50,
      class: ["tableDeleteBtn"],
      action: (id) => prepareDelete(id),
    },
  ];
  const prepareDelete = async (id) => {
    setItemToDelete(id);
    setSureToDeleteVisible(true);
  };

  function createData(id, code, name, phoneNumber, edit, remove) {
    return {
      id,
      code,
      name,
      phoneNumber,
      edit,
      remove,
    };
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    await axios
      .get("/drivers")
      .then((res) => {
        let all = res.data.drivers;
        
        setAllDrivers(all);
        all.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(p?._id, p?.code, p?.name, p?.phone, "Edit", "Delete"),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeleteDriver = async (id) => {
    await axios
      .delete(`/drivers/${id}`)
      .then(() => {
        setAllDrivers((prev) => prev.filter((S) => S._id !== id));
        setRows((prev) => prev.filter((S) => S.id !== id));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setCantDeleteModalVisible(true);
        }
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      {sureToDeleteVisible && (
        <SureToDelete
          setOpen={setSureToDeleteVisible}
          handleDelete={handleDeleteDriver}
          id={itemToDelete}
        />
      )}
      {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Drivers
        </h3>

        <BtnContained
          title="add driver"
          handleClick={() => nav("/addNewDriver")}
        />
      </div>

      <div className="mt-4">
        {rows.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="Drivers" />
        )}
      </div>
    </Layout>
  );
};
