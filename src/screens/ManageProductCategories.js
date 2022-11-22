import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Model from "../components/layout/Model";
import Loader from "../components/layout/Loader";
import CategoryCard from "../components/layout/CategoryCard";
import axios from "../axios";

const ManageProductCategories = () => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await axios
      .get("/categories")
      .then((res) => {
        setLoading(false);
        setCategories(res.data);
      })
      .catch(console.error);
  };

  // const handleRemoveProduct = (id) => {
  //   setCategories((prev) => prev.filter((p) => p.id !== id));
  // };

  return isLoading ? (
    <Loader />
  ) : (
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
      <div className="row m-0">
        {categories.map((cat, i) => {
          return <CategoryCard key={i} name={cat.name} />;
        })}
      </div>
    </Layout>
  );
};

export default ManageProductCategories;
