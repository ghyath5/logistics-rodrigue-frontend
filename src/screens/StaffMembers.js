import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import STAFF from "../data/StaffMembers";

export const StaffMembers = () => {
  const [allStaff, setAllStaff] = useState(STAFF);
  const nav = useNavigate();
  const [rows, setRows] = useState([]);
  const columns = [
    {
      id: "staffId",
      label: "Staff ID",
      minWidth: 70,
      class: "nameModel",
    },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
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
      class: "tableEditBtn",
    },

    {
      id: "remove",
      label: "Delete",
      minWidth: 100,
      class: "tableDeleteBtn",
    },
  ];

  function createData(
    id,
    staffId,
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
      staffId,
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
    allStaff.forEach((p) => {
      setRows((prev) => [
        ...prev,
        createData(
          p.id,
          p.staffId,
          p.name,
          p.accountType,
          p.phoneNumber,
          p.emailAddress,
          p.lastLogin,
          "Edit",
          "Delete"
        ),
      ]);
    });
  }, []);

  return (
    <Layout>
      <div>
        <h3 className="headerTitle my-2">Stuff Members</h3>
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
