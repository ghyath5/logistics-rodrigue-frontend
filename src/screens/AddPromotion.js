import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import TextAreaOutlined from "../components/layout/TextAreaOutlined";
import { DateTimePickerr } from "../components/layout/DatePickers";
import { List } from "@mui/material";
import ProductListItem from "../components/promotions/ProductListItem";
import Loader from "../components/layout/Loader";
import dayjs from "dayjs";
import axios from "../axios";
import { useEffect } from "react";
import DDSearch from "../components/layout/DDSearch";
import RadioGroupForm from "../components/layout/RadioGroupForm";
import { targets } from "../data/configs";

// const categoriesOps = [
//   { label: "Search", value: "", isDisabled: true },
//   { label: "Finger Foods", value: "1" },
//   { label: "Deserts", value: "2" },
//   { label: "Dips", value: "3" },
//   { label: "All", value: "4" },
// ];

// const options = [
//   { label: "Search", value: "", isDisabled: true },
//   { label: "First Product", value: "1", price: "10" },
//   { label: "Second Product", value: "2", price: "10" },
//   { label: "Third Product", value: "3", price: "10" },
//   { label: "Fourth Product", value: "4", price: "10" },
// ];

export const AddPromotion = ({ isEdit }) => {
  const nav = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [promotionTarget, setPromotionTarget] = useState(targets[0].value);
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    from: !isEdit ? dayjs(new Date()) : "",
    to: "",
    products: [],
    // categories: [],
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    from: false,
    to: false,
    products: false,
  });

  useEffect(() => {
    console.log({ data });
  }, [data]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    isEdit && fetchUserById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`/products`)
      .then((res) => {
        res.data.products.forEach((prod) => {
          setProducts((prev) => [
            ...prev,
            { label: prod.name, value: prod._id, price: prod.price },
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchUserById = (id) => {
    setLoading(true);
    axios
      .get(`/promotion/${id}`)
      .then((res) => {
        setData({
          name: res.data.name,
          description: res.data.description,
          from: res.data.from,
          to: res.data.to,
          products: [],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]:
          name === "products"
            ? [...prev.products, { productId: value }]
            : value,
      };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const allVAlid = () => {
    let valid;
    let errs = Object.values(errors);
    errs.includes(true) ? (valid = false) : (valid = true);
    return valid;
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "description":
        value &&
          (value.length < 30 ? hasError(name, true) : hasError(name, false));
        break;
      case "to":
      case "from":
      case "products":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  const handleAddNewPromotion = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .post(`/promotion`, {
          name: data.name,
          description: data.description,
          from: data.from,
          to: data.to,
          products: data?.products,
        })
        .then((res) => {
          console.log(res);
          nav("/promotions");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleUpdateStaffMember = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/promotion/${location.state?.id}`, {
          name: data.name,
          description: data.description,
          from: data.from,
          to: data.to,
          products: data?.products,
        })
        .then((res) => {
          console.log(res);
          nav("/promotions");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/vehicles")}
        />
        <h4 className="headerTitle my-3 mx-2">
          {isEdit ? "Edit Promotion" : "Add New Promotion"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Promotion Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <InputOutlined
            id="Name"
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
          <div className="d-flex flex-column">
            <TextAreaOutlined
              id="desc"
              lable="Description"
              defaultValue="Description"
              type="text"
              name="description"
              value={data?.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors?.description}
              errorMessage="should be at least 30 letters"
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <DateTimePickerr
                lable="from"
                id="dateFrom"
                name="from"
                minDate={dayjs(new Date())}
                value={data?.from}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.from}
                errorMessage="you must select a start date"
              />
            </div>
            <div className="w-100">
              <DateTimePickerr
                lable="to"
                id="dateTo"
                name="to"
                minDate={data?.from ? data.from : dayjs(new Date())}
                value={data?.to}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.to}
                errorMessage="you must select an end date"
              />
            </div>
          </div>
          <div>
            <RadioGroupForm
              name="promTarget"
              lable="Promotion Target"
              options={targets}
              val={promotionTarget}
              handleChange={setPromotionTarget}
            />
          </div>
          {/* <div className="mt-3">
            <DDSearch
              name="categories"
              lable="Add category to promotion"
              options={categoriesOps}
              isDisabled={promotionTarget !== "category" && true}
              isMulti={true}
              val={data?.products.length === 0 ? "" : data?.products[0]?.label}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors?.products}
              errorMessage="please select at least 1 product"
            />
          </div>
          <div className="mt-3">
            <DDSearch
              lable="Add product to promotion"
              options={options}
              isDisabled={promotionTarget === "category" && true}
              isMulti={false}
              values={products}
              setValues={setProducts}
            />
          </div> */}
          <div>
            <DDSearch
              name="products"
              lable="Add product to promotion"
              options={products}
              isDisabled={false}
              isMulti={false}
              val={data?.products.length === 0 ? "" : data?.products[0]?.label}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors?.products}
              errorMessage="please select at least 1 product"
            />
          </div>

          <List className="w-100">
            {data?.products.length > 0 &&
              data?.products.map((p, i) => {
                return (
                  <ProductListItem
                    product={
                      products?.filter((prod) => p.value === prod.productId)[0]
                    }
                    key={i}
                    setData={setData}
                    data={data}
                  />
                );
              })}
          </List>
        </div>
        <div className="my-4 text-center">
          <BtnContained
            title={isEdit ? "UPDATE PROMOTION" : "CREATE PROMOTION"}
            handleClick={() => {
              isEdit ? handleUpdateStaffMember() : handleAddNewPromotion();
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
