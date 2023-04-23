import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import InputOutlined from "../components/layout/InputOutlined";
import Loader from "../components/layout/Loader";
import DDSearch from "../components/layout/DDSearch";
import RadioGroupForm from "../components/layout/RadioGroupForm";
import axios from "../axios";
import { taxes } from "../data/configs";

const AddProducts = ({ isEdit }) => {
  const location = useLocation();
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    code: "",
    name: "",
    categoryId: "",
    price: "",
    unitesperbox: "",
    prioritynumber: "",
    taxType: "",
    visibility: true,
  });
  const [errors, setErrors] = useState({
    code: false,
    name: false,
    categoryId: false,
    price: false,
    unitesperbox: false,
    taxType: false,
    prioritynumber: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    isEdit && categories.length > 0 && fetchProductById(location.state?.id);
  }, [categories, location.state?.id]);

  const fetchProductById = async (id) => {
    setLoading(true);
    await axios
      .get(`/products/${id}`)
      .then((res) => {
        setData({
          code: res.data.assignedCode,
          name: res.data.name,
          categoryId:
            categories?.filter(
              (cat) => cat.value === res.data?.categoryId?._id
            )[0]?.value || "",
          price: res.data.price,
          unitesperbox: res.data.unitesperbox,
          prioritynumber: res.data.prioritynumber,
          taxType: res.data.taxType,
          visibility: res.data.visibility,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchCategories = async () => {
    await axios
      .get("/categories")
      .then((res) => {
        res.data.categories.forEach((cat) => {
          setCategories((prev) => [
            ...prev,
            { label: cat.name, value: cat._id },
          ]);
        });
      })
      .catch(console.error)
      .finally(() => !isEdit && setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const allVAlid = () => {
    let valid;
    let errs = Object.values(errors);
    errs.includes(true) ? (valid = false) : (valid = true);
    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        hasError(key, true);
        valid = false;
      }
    }
    return valid;
  };

  const validate = (name, value) => {
    switch (name) {
      case "code":
      case "name":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "categoryId":
      case "taxType":
      case "price":
      case "prioritynumber":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      case "unitesperbox":
        value > 0 ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  const handleAddNewProduct = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`/products`, {
          assignedCode: data.code,
          name: data.name,
          categoryId: data.categoryId,
          price: parseFloat(data.price),
          unitesperbox: parseInt(data.unitesperbox),
          prioritynumber: parseInt(data.prioritynumber),
          visibility: data.visibility,
        })
        .catch(console.error)
        .finally(() => {
          setData({
            code: "",
            name: "",
            categoryId: "",
            price: "",
            unitesperbox: "",
            prioritynumber: "",
            visibility: true,
          });
          setLoading(false);
          nav("/products");
        });
    }
  };

  const handleUpdateProduct = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/products/${location.state?.id}`, {
          assignedCode: data.code,
          name: data.name,
          categoryId: data.categoryId,
          price: data.price,
          unitesperbox: data.unitesperbox,
          prioritynumber: data.prioritynumber,
          visibility: data.visibility,
        })
        .catch(console.error)
        .finally(() => {
          setData({
            code: "",
            name: "",
            categoryId: "",
            price: "",
            unitesperbox: "",
            prioritynumber: "",
            visibility: true,
          });
          setLoading(false);
          nav("/products");
        });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/products")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? "Update Product" : "Add Product"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Product Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="code"
                lable="Code"
                defaultValue="Code"
                type="text"
                name="code"
                value={data?.code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.code}
                errorMessage="should be at least 3 letters"
              />
            </div>
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="name"
                lable="Name"
                defaultValue="Name"
                type="text"
                name="name"
                value={data?.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.name}
                errorMessage="should be at least 3 letters"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="price"
                lable="Price"
                defaultValue="Price"
                type="text"
                name="price"
                value={data?.price}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.price}
                errorMessage="please fill the price"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="unitesperbox"
                lable="Unites per box"
                defaultValue="Unites per box"
                type="text"
                name="unitesperbox"
                value={data?.unitesperbox}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.unitesperbox}
                errorMessage="please fill the unites per box"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <InputOutlined
                id="prioritynumber"
                lable="Priority Number"
                defaultValue="Priority Number"
                type="text"
                name="prioritynumber"
                value={data?.prioritynumber}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.prioritynumber}
                errorMessage="please fill the priority number"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <DDSearch
                name="categoryId"
                lable="Category"
                options={categories}
                isDisabled={false}
                isMulti={false}
                val={data?.categoryId}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.categoryId}
                errorMessage="you must select the category"
              />
            </div>
          </div>
          <div
            className={`headerss-${localStorage.getItem("monjay-theme")} row`}
          >
            <div className="col-sm-12 col-md-6">
              <DDSearch
                name="taxType"
                lable="Tax"
                options={taxes}
                isDisabled={false}
                isMulti={false}
                val={data?.taxType}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.taxType}
                errorMessage="you must select tax method"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <RadioGroupForm
                name="visibility"
                lable="Visibility in Order List?"
                options={[
                  { lable: "visible", value: true },
                  { lable: "hidden", value: false },
                ]}
                val={data?.visibility}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title={isEdit ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
            handleClick={() =>
              isEdit ? handleUpdateProduct() : handleAddNewProduct()
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
