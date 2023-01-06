import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import seacrIcon from "../assets/search.svg";
import StatsCard from "../components/layout/StatsCard";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
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
      class: ["statusCellVisible", "statusCellHidden"],
    },
    {
      id: "remove",
      label: "Remove ",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      action: (id) => handleRemoveProduct(id),
    },
    {
      id: "edit",
      label: "Edit ",
      minWidth: 100,
      class: ["tableEditBtn"],
      action: (id) => nav("/editproducts", { state: { id: id } }),
    },
  ];

  const handleRemoveProduct = async (id) => {
    setProductsTotal((prev) => prev - 1);

    let deletedProducts = allProducts.filter((p) => p._id === id)[0];
    deletedProducts.visibility === true
      ? setTotalActive((prev) => prev - 1)
      : setProductsHidden((prev) => prev - 1);

    await axios
      .delete(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get("/products?page=1&limit=100")
      .then((res) => {
        setRows([]);
        setProductsTotal(res.data.productsCount);
        setTotalActive(res.data.visibleProducts);
        setProductsHidden(res.data.hiddenProducts);
        setAllProducts(res.data.products);

        res.data.products.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.generatedCode,
              p.name,
              p.categoryId?.name,
              p.price,
              p.unitesperbox,
              p.prioritynumber,
              p.visibility === false ? "Hidden" : "Visible",
              "Delete",
              "Edit"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="pageHeader d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="headerTitle">Manage Products</h3>
        <div className="d-flex gap-2">
          <BtnContained
            title="Add Products"
            handleClick={() => nav("/addproducts")}
          />
          <BtnOutlined
            title="Manage categories"
            handleClick={() => nav("/managecategories")}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap ">
        <StatsCard
          title="Total Products"
          value={productsTotal}
          classes="bgGreen"
          col={4}
        />
        <StatsCard
          title="Active Products"
          value={productsActive}
          classes="bgLightBlue"
          col={4}
        />
        <StatsCard
          title="Hidden Products"
          value={productsHidden}
          last={true}
          classes="bgYellow"
          col={4}
        />
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
