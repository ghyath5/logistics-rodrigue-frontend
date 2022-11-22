import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "../components/layout/Table";
import Categories from "../data/categories";
import Model from "../components/layout/Model";
import CategoryCard from "../components/layout/CategoryCard";

const ManageProductCategories = ({ handleOpen }) => {
  const [allCategories, setAllCategories] = useState(Categories);
  const [categoriesTotal, setCategoriesTotal] = useState(0);
  const [categoriesActive, setTotalActive] = useState(0);
  const [categoriesHidden, setCategoriesHidden] = useState(0);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();

  const columns = [
    { id: "name", label: "Name ", minWidth: 150, class: ["nameModel"] },
    {
      id: "Deliveries",
      label: "Deliveries ",
      minWidth: 150,
    },
    {
      id: "standardPrice",
      label: "Standard Price",
      minWidth: 150,
    },

    {
      id: "status",
      label: "Order List Status ",
      minWidth: 150,
      class: ["statusCellVisible", "statusCellHidden"],
    },
    {
      id: "view",
      label: "View ",
      minWidth: 50,
      class: ["tableEditBtn"],
    },
    {
      id: "remove",
      label: "Remove ",
      minWidth: 50,
      class: ["tableDeleteBtn"],
      action: (value) => handleRemoveProduct(value),
    },
  ];
  const handleRemoveProduct = (id) => {
    setAllCategories((prev) => prev.filter((p) => p.id !== id));
    setRows((prev) => prev.filter((p) => p.id !== id));
  };

  function createData(
    id,
    name,
    Deliveries,
    standardPrice,
    status,
    view,
    remove
  ) {
    return {
      id,
      name,
      Deliveries,
      standardPrice,
      status,
      view,
      remove,
    };
  }

  useEffect(() => {
    setCategoriesTotal(Categories.length);
    Categories.forEach((p) => {
      p.active === true && setTotalActive((prev) => prev + 1);
      p.orderListStatus === "hidden" && setCategoriesHidden((prev) => prev + 1);

      setRows((prev) => [
        ...prev,
        createData(
          p.id,
          p.name,
          p.Deliveries,
          p.standardPrice,
          p.orderListStatus,
          "View",
          "Remove"
        ),
      ]);
    });
  }, []);

  useEffect(() => {
    setTotalActive(0);
    setCategoriesHidden(0);
    setCategoriesTotal(allCategories.length);
    allCategories.forEach((p) => {
      p.active === true && setTotalActive((prev) => prev + 1);
      p.orderListStatus === "hidden" && setCategoriesHidden((prev) => prev + 1);
    });
  }, [allCategories]);

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <div className="d-flex align-items-center ">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/products")}
          />
          <h4 className="headerTitle my-3 mx-2">Manage Product Categories</h4>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          <div className="gap-2">
            <Model />
          </div>
        </div>
      </div>
      <div className="d-flex  flex-wrap mt-2">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
      <div className="mt-4">
        <Table columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default ManageProductCategories;
