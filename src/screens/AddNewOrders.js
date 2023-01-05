import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import InputOutlined from "../components/layout/InputOutlined";
import BtnContained from "../components/layout/BtnContained";
import AddProduct from "../components/layout/AddProduct";
import RadioGroupForm from "../components/layout/RadioGroupForm";
import DDSearch from "../components/layout/DDSearch";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useEffect } from "react";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment/moment";

const AddNewOrders = () => {
  const [isLoading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [deliveryOccurs, setDeliveryOccurs] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(""); //customer
  const [selectedProducts, setSelectedProducts] = useState([]); //products"[{product,quantity,pricePerUnit"}]
  const [date, setDate] = useState(""); //date, status:0
  const [deliveriesoccur, setDeliveriesoccur] = useState(""); //deliveriesoccur

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    await axios
      .get(`/customers?page=1&limit=10&isarchived=false`)
      .then((res) => {
        res.data.customers.forEach((cust) => {
          setCustomers((prev) => [
            ...prev,
            { label: cust.businessname, value: cust._id },
          ]);
        });
      })
      .then(() => fetchOccurs())
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchOccurs = async () => {
    await axios.get(`/deliveryoccur`).then((res) => {
      res.data.deliveryOccur.forEach((del) => {
        setDeliveryOccurs((prev) => [
          ...prev,
          { lable: del.name, value: del._id },
        ]);
      });
    });
  };

  const handleSendCustomerId = async (e) => {
    setLoading(true);
    setSelectedCustomer(e.target.value);
    await axios
      .post(
        `orders/sendcustomeridfororder/${e.target.value}?page=1&limit=1&isarchived=false`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSelectProduct = (e) => {
    setSelectedProducts((prev) => [
      ...prev,
      { product: e.target.value, quantity: 1, pricePerUnit: 10 },
    ]);
  };

  const addProduct = () => {
    // setProduct([...product,  1]);
  };

  const removeComp = () => {
    // let res = product;
    // res = res.filter((x) => x !== i);
    // console.log(res);
    // setProduct(res);
  };

  function disableMondays(date) {
    return date["$d"].toString().split(" ")[0] === "Mon";
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav("/orders")}
        />
        <h4 className="headerTitle my-3 mx-2">Add New Order</h4>
      </div>
      <div className="formsContainer px-4 ">
        <div className="text-center mt-5 mb-4">
          <h5 className="formsTitles mx-3 mx-sm-4">New Order Details</h5>
        </div>

        <hr className="line"></hr>

        <div>
          <DDSearch
            name="customers"
            lable="customers"
            options={customers}
            isDisabled={false}
            isMulti={false}
            val={selectedCustomer}
            handleChange={handleSendCustomerId}
            // handleBlur={handleBlur}
            // error={step1Eerrors?.state}
            // errorMessage="please pick a state"
          />
          {/* <div className="mt-4 d-flex flex-column">
            <label className="formsLable mb-2">Order Notes:</label>
            <textarea
              id="outlined-multiline-static"
              rows={4}
              placeholder="Order Notes"
            />
          </div> */}
          <DatePickerr
            lable="Delivery date"
            id="orderDate"
            name="orderDate"
            minDate={moment("L")}
            value={date}
            handleChange={(e) => setDate(e.target.value)}
            shouldDisableDate={disableMondays}
            // handleBlur={handleBlur}
            // error={errors?.from}
            // errorMessage="you must select a start date"
          />
          <div className="mt-4">
            <h5 className="formsTitles">Products</h5>
          </div>
          <div className=" m-0">
            <DDSearch
              name="products"
              lable=""
              options={products}
              isDisabled={false}
              isMulti={false}
              val={selectedProducts}
              handleChange={handleSelectProduct}
              // handleBlur={handleBlur}
              // error={step1Eerrors?.state}
              // errorMessage="please pick a state"
            />
            <div className="p-0">
              {products.map((item, i) => {
                return (
                  <AddProduct
                    isDeleteable={products.length > 1}
                    index={item}
                    onRemove={() => removeComp(item)}
                  />
                );
              })}
              <div className="my-3">
                <BtnContained title="Add Product" handleClick={addProduct} />
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-12 col-sm-8 ">
              <RadioGroupForm
                name="deliveriesoccur"
                lable="How often should deliveries occur?"
                options={deliveryOccurs}
                val={deliveriesoccur}
                handleChange={(e) => setDeliveriesoccur(e.target.value)}
              />
              {/* <div className="my-3">
                <span className="formsLable">
                  Purchase order number (Leave blank if none)
                </span>
                <div className="row col-md-3">
                  <InputOutlined defaultValue="Purchase" type="text" />
                </div>
              </div> */}
            </div>
            <div className="col-12 col-sm-4 mt-3 p-4 orderTotalsbox">
              <div className="d-flex mb-3 align-items-center">
                <h6 className="m-0 me-2 formsLable">Delivery Fee:</h6>
                <div>$ 0.00</div>
              </div>
              <div className="d-flex align-items-center">
                <h6 className="m-0 me-2 formsLable">Total Cost:</h6>
                <div>$ 0.00</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 mb-4">
            <BtnContained
              title="save & confirm"
              handleClick={() => {
                console.log("save");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewOrders;
