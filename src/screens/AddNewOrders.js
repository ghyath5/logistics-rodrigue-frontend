/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import DDSearch from "../components/layout/DDSearch";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useEffect } from "react";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment/moment";
import ProdRowDetails from "../components/ProdRowDetails";

const AddNewOrders = () => {
  const [isLoading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const nav = useNavigate();
  const [products, setProducts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [date, setDate] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [errorr, setError] = useState(false);
  const [errorrMessage, setErrorMessage] = useState("Invalid Data");

  useEffect(() => {
    errorr &&
      setTimeout(() => {
        setError(false);
      }, 3000);
  }, [errorr]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    selectedCustomer.deliveryfee > 0 &&
      setOrderTotal((prev) => prev + parseInt(selectedCustomer.deliveryfee));
  }, [selectedCustomer]);

  const fetchCustomers = async () => {
    await axios
      .get(`/customers?page=1&limit=10&isarchived=false`)
      .then((res) => {
        res.data.customers.forEach((cust) => {
          setCustomers((prev) => [
            ...prev,
            {
              label: cust.businessname,
              value: cust._id,
              deliveryfee: cust.deliveryfee,
            },
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSendCustomerId = async (e) => {
    setLoading(true);
    setSelectedCustomer(
      customers.filter((cust) => cust.value === e.target.value)[0]
    );

    await axios
      .post(
        `orders/sendcustomeridfororder/${e.target.value}?page=1&limit=30&isarchived=false`
      )
      .then((res) => {
        res.data.data.forEach((prod) => {
          setProducts((prev) => [
            ...prev,
            {
              label: prod.name,
              value: prod._id,
              price: prod.price,
              newprice: prod.promotionPrice ? prod.promotionPrice : null,
              assignedCode: prod.assignedCode,
              upb: prod.unitesperbox,
            },
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const allValid = () => {
    let valid = false;
    if (selectedCustomer.length === 0) {
      setErrorMessage("Please select a customer");
      valid = false;
    } else if (!date || date === "") {
      setErrorMessage("Please enter a date");
      valid = false;
    } else if (selectedProducts.length === 0) {
      setErrorMessage("Please add some products");
      valid = false;
    } else if (orderTotal < 0) {
      setErrorMessage("order total shouldn't be negative");
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  };

  const handleSubmitOrder = async () => {
    let filteredProducts = [];
    selectedProducts.forEach((p) => {
      filteredProducts = [
        ...filteredProducts,
        {
          product: p.productId,
          pricePerUnit: p.newprice,
          quantity: p.quantity,
        },
      ];
    });

    let dataToSend = {
      customer: selectedCustomer.value,
      products: filteredProducts,
      date: date,
      totalamount: parseFloat(orderTotal),
      status: 0,
    };

    if (allValid()) {
      setLoading(true);
      await axios
        .post(`orders`, dataToSend)
        .then(() => {
          nav("/orders");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setError(true);
    }
  };

  const handleSelectProduct = (e) => {
    let prod = products.filter((pro) => pro.value === e.target.value)[0];
    setSelectedProducts((prev) => [
      ...prev,
      {
        productId: prod.value,
        oldprice: prod.price,
        newprice: prod.newprice ? prod.newprice : prod.price,
        name: prod.label,
        assignedCode: prod.assignedCode,
        upb: prod.upb,
      },
    ]);
  };

  const handleConfirmProduct = (id, total, quantity) => {
    let prod = selectedProducts.filter((pro) => pro.productId === id)[0];
    prod.newprice = total / quantity;
    prod.quantity = quantity;

    setOrderTotal((prev) => (parseFloat(prev) + parseFloat(total)).toFixed(2));
    setSelectedProducts((prev) => [
      ...prev.filter((pro) => pro.productId !== id),
      prod,
    ]);
  };

  const handleRemoveProduct = (id) => {
    let prod = selectedProducts.filter((pro) => pro.productId === id)[0];

    setOrderTotal((prev) =>
      (parseFloat(prev) - parseFloat(prod.newprice) * prod.quantity).toFixed(2)
    );
    setSelectedProducts((prev) => [
      ...prev.filter((pro) => pro.productId !== id),
    ]);
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
            val={selectedCustomer.value ? selectedCustomer.value : ""}
            handleChange={handleSendCustomerId}
          />
          <DatePickerr
            lable="Delivery date"
            id="orderDate"
            name="orderDate"
            minDate={moment(new Date()).format("L")}
            value={date}
            handleChange={(e) => setDate(e.target.value)}
            shouldDisableDate={disableMondays}
          />
          <div className="m-0">
            <DDSearch
              name="products"
              lable="Products"
              options={products}
              isDisabled={false}
              isMulti={false}
              val={selectedProducts}
              handleChange={handleSelectProduct}
              // handleBlur={handleBlur}
              // error={step1Eerrors?.state}
              // errorMessage="please pick a state"
            />
            <div className="p-0 mt-3">
              {selectedProducts.map((item, i) => {
                return (
                  <ProdRowDetails
                    key={i}
                    item={item}
                    handleChange={handleConfirmProduct}
                    handleRemove={handleRemoveProduct}
                    type="order"
                  />
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="col-12 col-sm-4 mt-3 p-4 orderTotalsbox">
              <div className="d-flex mb-3 align-items-center">
                <h6 className="m-0 me-2 formsLable">Delivery Fee:</h6>
                <div>
                  {selectedCustomer.deliveryfee > 0
                    ? "$ " + selectedCustomer.deliveryfee.toFixed(2)
                    : "$ " + (0).toFixed(2)}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <h6 className="m-0 me-2 formsLable">Total Cost:</h6>
                <div>$ {parseFloat(orderTotal).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3 mb-4">
            <BtnContained
              title="save & confirm"
              handleClick={() => {
                handleSubmitOrder();
              }}
            />
            {errorr && <p className="text-danger">{errorrMessage}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewOrders;
