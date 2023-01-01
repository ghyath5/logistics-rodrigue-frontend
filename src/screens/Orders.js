import React, { useState, useEffect } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import SearchInput from "../components/layout/SearchInput";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import Accordionn from "../components/layout/Accordionn";
import { Pagination } from "@mui/material";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setAllOrders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    await axios
      .get(`/orders`)
      .then((res) => {
        setAllOrders(res.data.orders);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className="headerTitle my-2">Orders</h3>
        <div className="d-flex flex-wrap gap-2 mainBtn">
          <BtnContained
            title="ADD NEW ORDER"
            handleClick={() => nav("/addneworders")}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SearchInput value={searchQuery} setValue={setSearchQuery} />
        <Pagination count={page} color="primary" />
      </div>
      <div>
        <Accordionn data={orders} />
      </div>
    </Layout>
  );
};

export default Orders;
