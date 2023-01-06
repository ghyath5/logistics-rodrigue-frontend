import React, { useState, useEffect } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import Layout from "../components/partials/Layout";
import SearchInput from "../components/layout/SearchInput";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import Accordionn from "../components/layout/Accordionn";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setAllOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    await axios
      .get(`/orders?page=1&limit=30&done=all`)
      .then((res) => {
        setAllOrders(res.data.orders);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const generateFutureOrders = async () => {
    setLoading(true);
    await axios
      .post(`/orders/deliveryoccur`)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Orders
        </h3>
        <div className="d-flex flex-wrap gap-2 mainBtn">
          <BtnContained
            title="GENERATE FUTURE ORDERS"
            handleClick={() => generateFutureOrders()}
          />
          <BtnOutlined
            title="ADD NEW ORDER"
            handleClick={() => nav("/addneworder")}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SearchInput value={searchQuery} setValue={setSearchQuery} />
      </div>
      <div className="myAccordion">
        {orders.map((item, i) => {
          return (
            <Accordionn
              item={item}
              key={i}
              id={i}
              allOrders={orders}
              setAllOrders={setAllOrders}
              setExpanded={setExpanded}
              expanded={expanded}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Orders;
