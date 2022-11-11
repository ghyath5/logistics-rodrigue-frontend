import React, { useEffect, useState } from "react";
import CardProduct from "../components/layout/CardProduct";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BtnOutlined from "../components/layout/BtnOutlined";
import BtnContained from "../components/layout/BtnContained";

const AddProducts = () => {
  const nav = useNavigate();
  const [state, setState] = useState([]);
  const [numberOfProducts, setNumbersOfProducts] = useState(1);
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   setRows([
  //     <CardProduct
  //       id={0}
  //       rows={rows}
  //       setNumbersOfProducts={setNumbersOfProducts}
  //       numberOfProducts={numberOfProducts}
  //     />,
  //   ]);
  // }, []);
  // const handleNewProduct = () => {
  //   setRows([
  //     ...rows,
  //     <CardProduct
  //       id={numberOfProducts}
  //       rows={rows}
  //       setNumbersOfProducts={setNumbersOfProducts}
  //       numberOfProducts={numberOfProducts}
  //     />,
  //   ]);
  //   setNumbersOfProducts(numberOfProducts + 1);
  // };

  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/products")}
        />
        <h4 className="headerTitle my-3 mx-2">Add Products</h4>
      </div>
      <div>
        <CardProduct
          id={0}
          // rows={rows}
          // setNumbersOfProducts={setNumbersOfProducts}
          // numberOfProducts={numberOfProducts}
        />
      </div>
      <div className="d-flex justify-content-between flex-wrap my-4 gap-2">
        <div className="  ">
          <BtnOutlined
            title="Add New"
            handleClick={() => {
              console.log("add");
            }}
          />
        </div>
        <div className="gap-2  d-flex justify-content-between flex-wrap">
          <div className="">
            <BtnOutlined
              title="Cancel"
              handleClick={() => {
                console.log("cancel");
              }}
            />
          </div>
          <div>
            <BtnContained
              title="Confirm Products"
              handleClick={() => {
                console.log("confirm");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
