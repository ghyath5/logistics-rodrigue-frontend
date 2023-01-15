import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import axios from "../axios";
import { roles } from "../data/configs";
import DeleteModal from "../components/DeleteModal";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import debounce from "lodash.debounce";

export const StaffMembers = () => {
  const [isLoading, setLoading] = useState(true);
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
      .get("people/staffmembers?page=1&limit=100")
      .then((res) => {
        let all = res.data.data.users;
        setAllStaff(all);
        all.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p?._id,
              p?.name,
              roles[p?.role]?.label,
              p?.phonenumber,
              p?.email,
              p?.lastlogin ? p?.lastlogin : "_",
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
    await axios
      .delete(`/users/${id}`)
      .then(() => {
        setAllStaff((prev) => prev.filter((S) => S._id !== id));
        setRows((prev) => prev.filter((S) => S.id !== id));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setCantDeleteModalVisible(true);
        }
      });
  };

  const searchForUsers = async (q) => {
    await axios
      .post(`/users/find?find=${q}`)
      .then((res) => {
        setRows([]);
        setAllStaff(res.data);
        res.data.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p?._id,
              p?.name,
              roles[p?.role]?.label ? roles[p.role].label : "Driver",
              p?.phonenumber,
              p?.email,
              p?.lastlogin ? p?.lastlogin : "_",
              "Edit",
              "Delete"
            ),
          ]);
        });
      })
      .catch(console.error);
  };

  const debouncedFilter = useCallback(
    debounce((q) => searchForUsers(q), 400),
    []
  );

  const handleSearchInputChange = (q) => {
    setSearchQuery(q);
    debouncedFilter(q);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
      <div>
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Staff Members
        </h3>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <SearchInput value={searchQuery} setValue={handleSearchInputChange} />
        </div>
        <div className="d-flex gap-3">
          <BtnContained
            title="add staff member"
            handleClick={() => nav("/AddNewStaffMember")}
          />
        </div>
      </div>

      <div className="mt-4">
        {rows.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="Staff Members" />
        )}
      </div>
    </Layout>
  );
};
