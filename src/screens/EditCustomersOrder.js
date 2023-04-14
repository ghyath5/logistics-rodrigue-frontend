import React, { useState } from "react";
import Layout from "../components/partials/Layout";
// import Blocks from "../components/draggable/Blocks";
import { useEffect } from "react";
import axios from "../axios";
import NewDnd from "../components/NewDnd";
import { useRef } from "react";
import Loader from "../components/layout/Loader";

const EditCustomersOrder = () => {
  // const [totalBlocks, setTotalBlocks] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [rowSize, setRowSize] = useState(5);
  const [blocksData, setBlocksData] = useState([]);
  const wrapperRef = useRef();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    await axios
      .get("/routes/63c44db373e2ce3fd9b379b2")
      .then((res) => {
        // setTotalBlocks(res.data.customers.length);
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
