import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import { useEffect } from "react";
import axios from "../axios";
import NewDnd from "../components/NewDnd";
import { useRef } from "react";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditCustomersOrder = () => {
  const [loading, setLoading] = useState(true);
  const [blocksData, setBlocksData] = useState([]);
  const wrapperRef = useRef();
  const location = useLocation();
  const nav = useNavigate();

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
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <div className="d-flex align-items-center ">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/regions")}
          />
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-3 mx-2`}
          >
            Edit Customers Order
          </h4>
        </div>
      </div>
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
