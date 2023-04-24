import React, { useState } from "react";
import Layout from "../components/partials/Layout";
// import Blocks from "../components/draggable/Blocks";
import { useEffect } from "react";
import axios from "../axios";
import NewDnd from "../components/NewDnd";
import { useRef } from "react";
import Loader from "../components/layout/Loader";
import { useLocation } from "react-router-dom";

const EditCustomersOrder = () => {
  // const [totalBlocks, setTotalBlocks] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [rowSize, setRowSize] = useState(5);
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

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setRowSize(Math.floor(wrapperRef.current.clientWidth / 200));
  //   });
  //   !loading && setRowSize(Math.floor(wrapperRef.current.clientWidth / 200));
  // }, [rowSize]);

  return (
    <Layout>
      {/* <Blocks
        key={`${rowSize}-${totalBlocks}`}
        rowSize={rowSize}
        setRowSize={setRowSize}
        totalBlocks={totalBlocks}
        blocksData={blocksData}
      /> */}

      {loading ? (
        <Loader />
      ) : (
        <NewDnd data={blocksData} wrapperRef={wrapperRef} />
      )}
    </Layout>
  );
};

export default EditCustomersOrder;
