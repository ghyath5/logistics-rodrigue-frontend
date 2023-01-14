/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import Layout from "../components/partials/Layout";
import SearchInput from "../components/layout/SearchInput";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import Accordionn from "../components/layout/Accordionn";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import debounce from "lodash.debounce";
import { DatePickerr } from "../components/layout/DatePickers";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setAllOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [fromLink, setFromLink] = useState("");
  const [toLink, setToLink] = useState("");
  const [M1, setM1] = useState(new Date());
  const [M2, setM2] = useState(new Date());

  const nav = useNavigate();

  const handleChangeM1 = (d) => {
    let selectedD = new Date(d);
    setM1(selectedD);
    let from = {
      day: String(selectedD.getDate()).padStart(2, "0"),
      month: String(selectedD.getMonth() + 1).padStart(2, "0"),
      year: selectedD.getFullYear(),
    };
    setFromLink(`${from.year}-${from.month}-${from.day}`);
  };

  const handleChangeM2 = (d) => {
    let selectedD = new Date(d);
    setM2(selectedD);
    let to = {
      day: String(selectedD.getDate()).padStart(2, "0"),
      month: String(selectedD.getMonth() + 1).padStart(2, "0"),
      year: selectedD.getFullYear(),
    };
    setToLink(`${to.year}-${to.month}-${to.day}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const del = async () => {
  //   await axios
  //     .delete(`/orders/63c083ede43f2bf05be90c50`)
  //     .then((res) => {})
  //     .catch(console.error);
  // };

  const searchForOrders = async (q) => {
    await axios
      .post(`/orders/findbytext?name=${q}`)
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch(console.error);
  };

  const debouncedFilter = useCallback(
    debounce((q) => searchForOrders(q), 400),
    []
  );

  const handleSearchInputChange = (q) => {
    setSearchQuery(q);
    debouncedFilter(q);
  };

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

  const exportReport = async () => {
    window.open(
      `https://logistics-rodrigue-backend.onrender.com/api/orders/export?from=${fromLink}&to=${toLink}`
    );
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
        <SearchInput value={searchQuery} setValue={handleSearchInputChange} />
        <div className="d-flex align-items-center gap-3">
          <DatePickerr
            inputFormat="YYYY-MM-DD"
            views={["year", "month", "day"]}
            lable=""
            id="orderDate"
            name="orderDate"
            value={M1}
            handleChange={(e) => handleChangeM1(e.target.value)}
            nol
          />
          <DatePickerr
            inputFormat="YYYY-MM-DD"
            views={["year", "month", "day"]}
            lable=""
            id="orderDate"
            name="orderDate"
            value={M2}
            handleChange={(e) => handleChangeM2(e.target.value)}
            nol
          />
          <BtnContained title="EXPORT REPORT" handleClick={exportReport} />
        </div>
      </div>
      {orders.length > 0 ? (
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
      ) : (
        <NoDataPlaceHolder current="Orders" />
      )}
    </Layout>
  );
};

export default Orders;
