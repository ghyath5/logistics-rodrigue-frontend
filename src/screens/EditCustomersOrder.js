import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import { useEffect } from "react";
import axios from "../axios";
import NewDnd from "../components/NewDnd";
import { useRef } from "react";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import { useLocation } from "react-router-dom";

const EditCustomersOrder = () => {
  const [loading, setLoading] = useState(true);
  const [blocksData, setBlocksData] = useState([]);
  const wrapperRef = useRef();
  const location = useLocation();

  useEffect(() => {
    fetchCustomers(location.state?.id);
  }, [location.state?.id]);

  const fetchCustomers = async (id) => {
    await axios
      .get(`/routes/${id}`)
      .then((res) => {
        setBlocksData(res.data.customers);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : blocksData.length > 0 ? (
        <NewDnd data={blocksData} wrapperRef={wrapperRef} />
      ) : (
        <NoDataPlaceHolder current="Customers" />
      )}
    </Layout>
  );
};

export default EditCustomersOrder;
