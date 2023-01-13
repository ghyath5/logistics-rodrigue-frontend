import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import TextAreaOutlined from "../components/layout/TextAreaOutlined";
import { DateTimePickerr } from "../components/layout/DatePickers";
import { List } from "@mui/material";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useEffect } from "react";
import DDSearch from "../components/layout/DDSearch";
import RadioGroupForm from "../components/layout/RadioGroupForm";
import { targets } from "../data/configs";
import moment from "moment/moment";
import ProductListItem from "../components/promotions/ProductListItem";
import ProdRowDetails from "../components/ProdRowDetails";

export const AddPromotion = ({ isEdit }) => {
  const nav = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [promotionTarget, setPromotionTarget] = useState(targets[0].value);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [catdis, setCatDis] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [productsToAdd, setProductsToAdd] = useState([]);
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    from: false,
    to: false,
    products: false,
    category: false,
  });

  const handleChangeTarget = (e) => {
    setPromotionTarget(e.target.value);
  };

  useEffect(() => {
    fetchProductsAndCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    isEdit && fetchPromotionById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    await axios
      .get(`/products`)
      .then((res) => {
        res.data.products.forEach((prod) => {
          setProducts((prev) => [
            ...prev,
            {
              label: prod.name,
              value: prod._id,
              price: prod.price,
              newprice: prod.price,
              assignedCode: prod.assignedCode,
              upb: prod.unitesperbox,
            },
          ]);
        });
      })
      .then(fetchCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchCategories = () => {
    axios
      .get(`/categories`)
      .then((res) => {
        res.data.categories.forEach((cat) => {
          setCategories((prev) => [
            ...prev,
            { label: cat.name, value: cat._id },
          ]);
        });
      })
      .catch(console.error);
  };

  const fetchPromotionById = (id) => {
    setLoading(true);
    axios
      .get(`/promotion/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setFrom(res.data.from);
        setTo(res.data.to);
        res.data.productspromotion.length > 0
          ? res.data.productspromotion.forEach((prod) => {
              setProductsToAdd((prev) => [
                ...prev,
                {
                  productId: prod._id,
                  oldprice: prod.productId.price,
                  newprice: prod.newprice,
                  name: prod.productId.name,
                  assignedCode: prod.productId.assignedCode,
                  upb: prod.productId.unitesperbox,
                },
              ]);
            })
          : setCategoryToAdd({
              categoryId: res.data.categorypromotion.categoryId._id,
              discountpercentage: res.data.categorypromotion.discountpercentage,
              name: res.data.categorypromotion.categoryId.name,
            });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setCatDis(true);
      let selectedCategory = categories.filter((cat) => cat.value === value)[0];
      setProductsToAdd([]);
      setCategoryToAdd({
        categoryId: value,
        discountpercentage: 0,
        name: selectedCategory.label,
      });
    } else if (name === "products") {
      setCategoryToAdd("");
      if (value !== "") {
        let newProd = products.filter((prod) => prod.value === value)[0];
        setProductsToAdd((prev) => [
          ...prev,
          {
            productId: newProd.value,
            oldprice: newProd.price,
            newprice: newProd.price,
            name: newProd.label,
            assignedCode: newProd.assignedCode,
            upb: newProd.upb,
          },
        ]);
        setProducts((prev) => [...prev.filter((p) => p.value !== value)]);
      }
    }
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
      // case "description":
      //   value &&
      //     (value.length < 10 ? hasError(name, true) : hasError(name, false));
      //   break;
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
          name: name,
          description: description,
          from: from,
          to: to,
          categorypromotion: categoryToAdd,
          productspromotion: productsToAdd,
        })
        .then((res) => {
          console.log(res);
          nav("/promotions");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleUpdatePromotion = () => {
    if (allVAlid()) {
      setLoading(true);
      axios
        .put(`/promotion/${location.state?.id}`, {
          name: name,
          description: description,
          from: from,
          to: to,
          categorypromotion: categoryToAdd,
          productspromotion: productsToAdd,
        })
        .then((res) => {
          nav("/promotions");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleProdPriceChange = (id, newPrice) => {
    let prod = productsToAdd.filter((p) => p.productId === id)[0];
    prod.newprice = newPrice;
    setProductsToAdd((prev) => [
      ...prev.filter((p) => p.productId !== id),
      prod,
    ]);
  };

  const handleRemoveProd = (id) => {
    let prod = productsToAdd.filter((p) => p.productId === id)[0];
    setProductsToAdd((prev) => [...prev.filter((p) => p.productId !== id)]);
    setProducts((prev) => [
      {
        label: prod.name,
        value: prod.productId,
        price: prod.oldprice,
        newprice: prod.newprice,
        assignedCode: prod.assignedCode,
        upb: prod.upb,
      },
      ...prev,
    ]);
  };

  const handleDiscountChange = (newDiscount) => {
    let selectedCat = categoryToAdd;
    selectedCat.discountpercentage = newDiscount;
    console.log(selectedCat);
    setCategoryToAdd(selectedCat);
    setCatDis(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/promotions")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? "Edit Promotion" : "Add New Promotion"}
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Promotion Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <InputOutlined
            id="Name"
            lable="Name"
            defaultValue="Name"
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
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
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
              handleBlur={handleBlur}
              // error={errors?.description}
              // errorMessage="should be at least 10 letters"
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <DateTimePickerr
                lable="from"
                id="dateFrom"
                name="from"
                minDate={moment().clone()}
                value={from}
                handleChange={(e) => setFrom(e.target.value)}
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
                minDate={moment(from).clone().add(1, "days")}
                value={to}
                handleChange={(e) => setTo(e.target.value)}
                handleBlur={handleBlur}
                error={errors?.to}
                errorMessage="you must select an end date"
              />
            </div>
          </div>
          <div className={`headerss-${localStorage.getItem("monjay-theme")}`}>
            <RadioGroupForm
              name="promTarget"
              lable="Promotion Target"
              options={targets}
              val={promotionTarget}
              handleChange={handleChangeTarget}
            />
          </div>
          {promotionTarget === "category" ? (
            <div className="mt-3">
              <DDSearch
                name="category"
                lable="Add category to promotion"
                options={categories}
                isMulti={false}
                isDisabled={catdis}
                val={categoryToAdd}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.category}
                errorMessage="please select 1 category"
              />
            </div>
          ) : (
            <div>
              <DDSearch
                name="products"
                lable="Add product to promotion"
                options={products}
                isMulti={false}
                val=""
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors?.products}
                errorMessage="please select at least 1 product"
              />
            </div>
          )}

          <List className="w-100">
            {productsToAdd.length > 0 ? (
              productsToAdd.map((p, i) => {
                return (
                  <ProdRowDetails
                    key={i}
                    item={p}
                    handleChange={handleProdPriceChange}
                    handleRemove={handleRemoveProd}
                  />
                );
              })
            ) : categoryToAdd !== "" ? (
              <ProductListItem
                item={categoryToAdd}
                handleChange={handleDiscountChange}
                handleRemove={() => setCategoryToAdd("")}
              />
            ) : null}
          </List>
        </div>
        <div className="my-4 text-center">
          <BtnContained
            title={isEdit ? "UPDATE PROMOTION" : "CREATE PROMOTION"}
            handleClick={() => {
              isEdit ? handleUpdatePromotion() : handleAddNewPromotion();
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
