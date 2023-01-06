import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import axios from "../axios";
import { roles } from "../data/configs";

export const StaffMembers = () => {
  const [isLoading, setLoading] = useState(true);
  const [allStaff, setAllStaff] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      class: ["nameModel"],
    },
    {
      id: "accountType",
      label: "Account Type",
      minWidth: 150,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 50,
    },
    {
      id: "emailAddress",
      label: "Email Address",
      minWidth: 50,
    },
    {
      id: "lastLogin",
      label: "Last Login",
      minWidth: 50,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id) => {
        nav("/EditStaffMember", { state: { id: id } });
      },
    },

    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      action: (id) => handleDeleteMember(id),
    },
  ];

  function createData(
    id,
    name,
    accountType,
    phoneNumber,
    emailAddress,
    lastLogin,
    edit,
    remove
  ) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return {
      id,
      name,
      accountType,
      phoneNumber,
      emailAddress,
      lastLogin,
      edit,
      remove,
    };
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get("people/users?page=1&limit=100")
      .then((res) => {
        setAllStaff(res.data.users);
        res.data.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.name,
              roles[p.role]?.label,
              p.phonenumber,
              p.email,
              p.lastlogin ? p.lastlogin : "_",
              "Edit",
              "Delete"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeleteMember = async (id) => {
    setAllStaff((prev) => prev.filter((S) => S._id !== id));
    setRows((prev) => prev.filter((S) => S.id !== id));

    await axios
      .delete(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div>
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Staff Members
        </h3>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <SearchInput />
        </div>
        <div>
          <BtnContained
            title="add new staff member"
            handleClick={() => nav("/AddNewStaffMember")}
          />
        </div>
      </div>
      <div className="mt-4">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};
