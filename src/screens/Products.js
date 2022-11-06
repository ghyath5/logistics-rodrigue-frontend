import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import seacrIcon from "../assets/search.svg";
import StatsCard from "../components/layout/StatsCard";
import PRODUCTS from "../data/products";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productsActive, setTotalActive] = useState(0);
  const [productsHidden, setProductsHidden] = useState(0);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    { id: "code", label: "Code", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 150 },
    {
      id: "category",
      label: "Category",
      minWidth: 150,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 50,
    },
    {
      id: "units",
      label: "Units per box",
      minWidth: 50,
    },
    {
      id: "priority",
      label: "Priority",
      minWidth: 50,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      class: "statusCellVisible/statusCellHidden",
    },
    {
      id: "remove",
      label: "Remove ",
      minWidth: 100,
      class: "tableDeleteBtn",
      action: (value) => handleRemoveProduct(value),
    },
    {
      id: "edit",
      label: "Edit ",
      minWidth: 100,
      class: "tableEditBtn",
    },
  ];

  const handleRemoveProduct = (id) => {
    setAllProducts((prev) => prev.filter((p) => p.id !== id));
    setRows((prev) => prev.filter((p) => p.id !== id));
  };

  function createData(
    id,
    code,
    name,
    category,
    price,
    units,
    priority,
    status,
    remove,
    edit
  ) {
    // const density = population / size;
    // return { name, code, population, size, density };
    return {
      id,
      code,
      name,
      category,
      price,
      units,
      priority,
      status,
      remove,
      edit,
    };
  }

  useEffect(() => {
    setProductsTotal(PRODUCTS.length);
    PRODUCTS.forEach((p) => {
      p.active === true && setTotalActive((prev) => prev + 1);
      p.orderListStatus === "hidden" && setProductsHidden((prev) => prev + 1);

      setRows((prev) => [
        ...prev,
        createData(
          p.id,
          p.code,
          p.name,
          p.category,
          p.price,
          p.unitsPerBox,
          p.priorityNbr,
          p.orderListStatus,
          "Delete",
          "Edit"
        ),
      ]);
    });
  }, []);

  useEffect(() => {
    setTotalActive(0);
    setProductsHidden(0);
    setProductsTotal(allProducts.length);
    allProducts.forEach((p) => {
      p.active === true && setTotalActive((prev) => prev + 1);
      p.orderListStatus === "hidden" && setProductsHidden((prev) => prev + 1);
    });
  }, [allProducts]);

  return (
    <Layout>
      <div className="pageHeader d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="headerTitle">Manage Products</h3>
        <div className="d-flex gap-2">
          <BtnContained title="Add Products" onClick={()=>nav("/addproducts")} />
          <BtnOutlined title="Manage categories" onClick={()=>nav("/managecategories")} />
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
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Products;
