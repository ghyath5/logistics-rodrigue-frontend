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
        setCategories(res.data.categories);
      })
      .catch(console.error);
  };

  const addCategory = (name) => {
    setLoading(true);
    let data = { name: name };
    axios
      .post("categories", data)
      .then((res) => {
        setCategories((prev) => [
          ...prev,
          { _id: res.data._id, name: res.data.name, products: 0 },
        ]);
        setLoading(false);
      })
      .catch(console.error);
  };

  const updateCategory = (id, name) => {
    setLoading(true);
    axios
      .put(`/categories/${id}`, { name: name })
      .then(() => {
        setCategories((prev) =>
          prev.map((cat) => {
            if (cat._id === id) {
              return { ...cat, name: name };
            }
            return cat;
          })
        );
        setLoading(false);
      })
      .catch(console.error);
  };

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
        <Model
          handleAction={addCategory}
          btn="Add"
          title="Add New Category"
          defaultValue="category name"
        />
      </div>
      <div className="row m-0">
        {categories.map((cat, i) => {
          return (
            <CategoryCard
              key={i}
              id={cat._id}
              name={cat.name}
              handleAction={updateCategory}
              isUpdate={true}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default ManageProductCategories;
