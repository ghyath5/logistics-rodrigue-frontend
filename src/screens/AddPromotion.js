import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import DatePicker from "../components/layout/DatePicker";
import DropDownSearch from "../components/layout/DropDownSearch";
import { List } from "@mui/material";
import ProductListItem from "../components/promotions/ProductListItem";
import validator from "validator";

const options = [
  { label: "First Product", value: "1", price: "10" },
  { label: "Second Product", value: "2", price: "10" },
  { label: "Third Product", value: "3", price: "10" },
  { label: "Fourth Product", value: "4", price: "10" },
];

export const AddPromotion = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    from: "",
    to: "",
    products: [],
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    from: false,
    to: false,
    products: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // console.log("handleBlur", name, value);
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
          (validator.isEmail(value)
            ? hasError(name, false)
            : hasError(name, true));
        break;
      case "from":
        value &&
          (validator.isMobilePhone(value.toString(), ["en-AU"])
            ? hasError(name, false)
            : hasError(name, true));
        break;
      case "to":
        value &&
          (validator.isMobilePhone(value.toString(), ["en-AU"])
            ? hasError(name, false)
            : hasError(name, true));
        break;
      case "products":
        value !== "" ? hasError(name, false) : hasError(name, true);
        break;
      default:
        console.log("");
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/vehicles")}
        />
        <h4 className="headerTitle my-3 mx-2">Add New Promotion</h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4 className="headerTitle my-4 mx-2">Promotion Details</h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <InputOutlined lable="Name" defaultValue="Name" type="text" />
          <div className="d-flex flex-column mt-3">
            <label className="formsLable mb-2">Description</label>
            <textarea
              id="outlined-multiline-static"
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
          {/* <div>
            <RadiosGroup
              lable="Promotion Target"
              options={targets}
              value={promotionTarget}
              setValue={setPromotionTarget}
            />
          </div> */}
          <div className="mt-3">
            <DropDownSearch
              name="products"
              lable="Add product to promotion"
              options={options}
              isDisabled={false}
              isMulti={true}
              values={data?.products}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
          <List className="w-100">
            {data?.products.map((p, i) => {
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
