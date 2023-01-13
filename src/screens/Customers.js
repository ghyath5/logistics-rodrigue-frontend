/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import SearchInput from "../components/layout/SearchInput";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import debounce from "lodash.debounce";

const Customers = ({ archived }) => {
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [archiveTriggered, setrchiveTriggered] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [organisations, setOrganisations] = useState([]);

  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  var ORGS;

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
    {
      id: "organization",
      label: "Organization",
      minWidth: 80,
      class: "tableEditBtn",
    },
    {
      id: "paymetMethod",
      label: "Payment Method",
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
    organization,
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
      organization,
      paymetMethod,
      sepicalPricing,
      // pendingOreds,
      archive,
    };
  }

  useEffect(() => {
    console.log(ORGS);
  }, [ORGS]);
  useEffect(() => {
    fetchOrganisations();
  }, [archived, archiveTriggered]);

  const fetchCustomers = async (O) => {
    setLoading(true);
    await axios
      .get(
        `/customers?page=1&limit=100&isarchived=${archived ? archived : false}`
      )
      .then((res) => {
        setAllCustomers(res.data);
        setRows([]);
        res.data.customers.forEach((p) => {
          let orgg = O?.filter((org) => org._id === p?.organization)[0]?.name;

          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.isarchived,
              p.codeid,
              p.businessname,
              p.address[0],
              p.organization ? orgg : "Consolidate biller",
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

  const fetchOrganisations = async () => {
    await axios
      .get("organization")
      .then((res) => {
        ORGS = res.data.organizations;
        setOrganisations(res.data.organizations);
        fetchCustomers(res.data.organizations);
      })
      .catch(console.error);
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

  const searchForCustomer = async (q) => {
    await axios
      .post(`/customers/find?find=${q}`)
      .then((res) => {
        setAllCustomers(res.data);
        setRows([]);
        res.data.forEach((p) => {
          let orgg = ORGS?.filter((org) => org._id === p?.organization)[0]
            ?.name;
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.isarchived,
              p.codeid,
              p.businessname,
              p.address[0],
              p.organization ? orgg : "Consolidate biller",
              p.paymentmethod?.name,
              p.ispricingdefault ? "default" : "else",
              archived ? "Unarchive Now" : "Archive Now"
            ),
          ]);
        });
      })
      .catch(console.error);
  };

  const debouncedFilter = useCallback(
    debounce((q) => searchForCustomer(q), 400),
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
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        {archived ? (
          <div className="d-flex justify-content-start align-items-center">
            <ArrowBackIcon
              className="ArrowBackIcon me-3"
              fontSize="medium"
              onClick={() => nav("/customers")}
            />
            <h3
              className={`headerss-${localStorage.getItem(
                "monjay-theme"
              )} my-2`}
            >
              Archived customers
            </h3>
          </div>
        ) : (
          <h3
            className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}
          >
            Customers
          </h3>
        )}
        <div className="d-flex flex-wrap gap-2 mainBtn align-items-center">
          <div>
            <SearchInput
              value={searchQuery}
              setValue={handleSearchInputChange}
            />
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
        {rows.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="customers" />
        )}
      </div>
    </Layout>
  );
};

export default Customers;
