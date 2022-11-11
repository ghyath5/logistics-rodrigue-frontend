import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import CUSTOMERS from "../data/customers";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState(CUSTOMERS);

  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "code",
      label: "ID",
      minWidth: 70,
    },
    {
      id: "customerName",
      label: "Customer Name",
      minWidth: 100,
      class: "tableEditBtn",
    },
    {
      id: "address",
      label: "Address",
      minWidth: 100,
    },
    {
      id: "geocodingStatus",
      label: "Geocoding Status",
      minWidth: 50,
      class: "tableEditBtn",
    },
    {
      id: "paymetMethod",
      label: "Paymet Method",
      minWidth: 50,
    },
    {
      id: "sepicalPricing",
      label: "Sepical Pricing",
      minWidth: 50,
    },
    {
      id: "pendingOreds",
      label: "Pending Oreds",
      minWidth: 100,
    },
    {
      id: "archive",
      label: "Archive",
      minWidth: 50,
      class: "tableEditBtn",
    },
  ];

  function createData(
    id,
    code,
    customerName,
    address,
    geocodingStatus,
    paymetMethod,
    sepicalPricing,
    pendingOreds,
    archive
  ) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return {
      id,
      code,
      customerName,
      address,
      geocodingStatus,
      paymetMethod,
      sepicalPricing,
      pendingOreds,
      archive,
    };
  }
  useEffect(() => {
    allCustomers.forEach((p) => {
      setRows((prev) => [
        ...prev,
        createData(
          p.id,
          p.code,
          p.customerName,
          p.address,
          p.geocodingStatus,
          p.paymetMethod,
          p.sepicalPricing,
          p.pendingOreds,
          "Archive"
        ),
      ]);
    });
  }, []);
  return (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className="headerTitle my-2">Customers</h3>
        <div className="d-flex flex-wrap gap-2 mainBtn align-items-center">
          <div>
            <SearchInput />
          </div>
          <div>
            <BtnContained
              title="ADD NEW CUSTOMER"
              handleClick={() => nav("/addnewcustomer")}
            />
          </div>
          <div>
            <BtnOutlined
              title="VIEW ARCHIVED CUSTOMERS"
              handleClick={() => {
                console.log("view archived");
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Customers;
