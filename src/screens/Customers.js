import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loader from "../components/layout/Loader";

const Customers = ({ archived }) => {
  const [isLoading, setLoading] = useState(true);
  const [archiveTriggered, setrchiveTriggered] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);

  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    {
      id: "id",
      label: "ID",
      noCell: true,
    },
    {
      id: "archived",
      label: "archived",
      noCell: true,
    },
    {
      id: "codeid",
      label: "codeId",
      minWidth: 70,
    },
    {
      id: "businessName",
      label: "Business Name",
      minWidth: 100,
      class: ["tableEditBtn"],
      action: (id) => {
        nav("/customerDetails", { state: { id: id } });
      },
    },
    {
      id: "address",
      label: "Address",
      minWidth: 100,
    },
    // {
    //   id: "geocodingStatus",
    //   label: "Geocoding Status",
    //   minWidth: 50,
    //   class: "tableEditBtn",
    // },
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
    // {
    //   id: "pendingOreds",
    //   label: "Pending Orders",
    //   minWidth: 100,
    // },
    {
      id: "archive",
      label: archived ? "Unarchive" : "Archive",
      minWidth: 50,
      class: ["tableEditBtn"],
      action: (id, is) => toggleArchiveCustomer(id, is),
    },
  ];

  function createData(
    id,
    archived,
    codeid,
    businessName,
    address,
    // geocodingStatus,
    paymetMethod,
    sepicalPricing,
    // pendingOreds,
    archive
  ) {
    return {
      id,
      archived,
      codeid,
      businessName,
      address,
      // geocodingStatus,
      paymetMethod,
      sepicalPricing,
      // pendingOreds,
      archive,
    };
  }

  useEffect(() => {
    fetchUsers();
  }, [archived, archiveTriggered]);

  const fetchUsers = async () => {
    setLoading(true);
    await axios
      .get(
        `/customers?page=1&limit=10&isarchived=${archived ? archived : false}`
      )
      .then((res) => {
        setAllCustomers(res.data);
        setRows([]);
        res.data.customers.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.isarchived,
              p.codeid,
              p.businessname,
              p.address[0],
              // p.geocodingStatus,
              p.paymentmethod?.name,
              p.ispricingdefault ? "default" : "else",
              // p.pendingorders?.length,
              archived ? "Unarchive Now" : "Archive Now"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const toggleArchiveCustomer = async (id, is) => {
    setLoading(true);
    const body = {
      isarchived: !is,
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        console.log("archive");
      })
      .catch(console.error)
      .finally(() => {
        setrchiveTriggered(!archiveTriggered);
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className="headerTitle my-2">
          {archived ? "Archived customers" : "Customers"}
        </h3>
        <div className="d-flex flex-wrap gap-2 mainBtn align-items-center">
          <div>
            <SearchInput />
          </div>
          {!archived && (
            <>
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
                    nav("/archivedCustomers");
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Customers;
