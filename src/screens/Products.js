import React, { useEffect, useState } from "react";
import BtnContained from "../components/BtnContained";
import BtnOutlined from "../components/BtnOutlined";
import seacrIcon from "../assets/search.svg";
import StatsCard from "../components/StatsCard";
import PRODUCTS from "../data/products";
import StickyHeadTable from "../components/StickyHeadTable";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const Products = () => {
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productsActive, setTotalActive] = useState(0);
  const [productsHidden, setProductsHidden] = useState(0);
  const [rows, setRows] = useState([]);

  function createData(name, code, population, size) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return { name, code, population, size };
  }

  useEffect(() => {
    setProductsTotal(allProducts.length);
    allProducts.forEach((p) => {
      p.active === true && setTotalActive((prev) => prev + 1);
      p.orderListStatus === "hidden" && setProductsHidden((prev) => prev + 1);

      setRows((prev) => [
        ...prev,
        createData(p.name, p.category, p.price, p.orderListStatus),
      ]);
    });
  }, [allProducts]);

  return (
    <div className="container">
      <div className="pageHeader d-sm-flex justify-content-between align-items-center my-4">
        <h3 className="headerTitle">Manage Products</h3>
        <div className="d-flex gap-2">
          <BtnContained title="Add Products" />
          <BtnOutlined title="Manage categories" />
        </div>
      </div>
      <div className="d-flex flex-wrap ">
        <StatsCard title="Total No. of Products" value={productsTotal} />
        <StatsCard title="Active Products" value={productsActive} />
        <StatsCard title="Hidden Products" value={productsHidden} last={true} />
      </div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h3 className="headerTitle">All Products</h3>
        <div className="searchInputContainer d-flex px-2 py-1">
          <input placeholder="search" className="border-0" />
          <img src={seacrIcon} alt="searchIcon" />
        </div>
      </div>
      <div>
        <StickyHeadTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Products;
