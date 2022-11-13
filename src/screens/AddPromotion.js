import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import DatePicker from "../components/layout/DatePicker";
import DropDownSearch from "../components/layout/DropDownSearch";
import RadiosGroup from "../components/layout/RadiosGroup";
import { List, ListItem, ListItemText } from "@mui/material";
import ProductListItem from "../components/promotions/ProductListItem";

const categoriesOps = [
  { label: "Search", value: "", isDisabled: true },
  { label: "Finger Foods", value: "1" },
  { label: "Deserts", value: "2" },
  { label: "Dips", value: "3" },
  { label: "All", value: "4" },
];

const options = [
  { label: "Search", value: "", isDisabled: true },
  { label: "First Product", value: "1", price: "10" },
  { label: "Second Product", value: "2", price: "10" },
  { label: "Third Product", value: "3", price: "10" },
  { label: "Fourth Product", value: "4", price: "10" },
];

const targets = [
  { label: "Category targeted", value: "category" },
  { label: "Product targeted", value: "product" },
];

export const AddPromotion = () => {
  const nav = useNavigate();
  const [promotionTarget, setPromotionTarget] = useState("category");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/vehicles")}
        />
        <h4 className="headerTitle my-3 mx-2"> Add New Promotion</h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Promotion Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <InputOutlined lable="Name" defaultValue="Name" type="text" />
          <div className="d-flex flex-column mt-3">
            <lable className="formsLable mb-2">Description</lable>
            <textarea
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Promotion description"
            />
          </div>
          <div className="d-flex gap-3 mt-3">
            <div className="w-100">
              <DatePicker lable="from" />
            </div>
            <div className="w-100">
              <DatePicker lable="to" />
            </div>
          </div>
          <div>
            <RadiosGroup
              lable="Promotion Target"
              options={targets}
              value={promotionTarget}
              setValue={setPromotionTarget}
            />
          </div>
          <div className="mt-3">
            <DropDownSearch
              lable="Add category to promotion"
              options={categoriesOps}
              isDisabled={promotionTarget !== "category" && true}
              isMulti={true}
              values={categories}
              setValues={setCategories}
            />
          </div>
          <div className="mt-3">
            <DropDownSearch
              lable="Add product to promotion"
              options={options}
              isDisabled={promotionTarget === "category" && true}
              isMulti={false}
              values={products}
              setValues={setProducts}
            />
          </div>
          <List className="w-100">
            {products.map((p, i) => {
              return <ProductListItem product={p} key={i} />;
            })}
          </List>
        </div>
        <div className="my-4 text-center">
          <BtnContained
            title="CREATE PROMOTION"
            handleClick={() => {
              console.log("create");
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
