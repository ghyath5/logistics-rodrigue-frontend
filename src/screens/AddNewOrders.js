/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useEffect } from "react";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment/moment";
import ProdRowDetails from "../components/ProdRowDetails";
import NewSearchDD from "../components/layout/NewSearchDD";

const AddNewOrders = ({ isEdit }) => {
  const [isLoading, setLoading] = useState(true);
  const [prodConfirmed, setConfirmed] = useState(true);
  const [customers, setCustomers] = useState([]);
  const nav = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [reqError, setReqError] = useState("");

  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [date, setDate] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [nonEditedProducts, setNonEditedProducts] = useState([]);
  const [errorr, setError] = useState(false);
  const [errorrMessage, setErrorMessage] = useState("Invalid Data");
  const [searchPlaceHolder, setSearchPlaceholder] = useState(
    "Search a customer by name or code"
  );

  useEffect(() => {
    errorr &&
      setTimeout(() => {
        setError(false);
      }, 3000);
  }, [errorr]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    await axios
      .get(`/customers?page=1&limit=30&isarchived=false`)
      .then((res) => {
        res.data.customers.forEach((cust) => {
          setCustomers((prev) => [
            ...prev,
            {
              label: cust.businessname,
              value: cust._id,
              deliveryfee: cust?.deliveryfee,
            },
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    selectedCustomer?.deliveryfee > 0 &&
      setOrderTotal((prev) => prev + parseInt(selectedCustomer.deliveryfee));
  }, [selectedCustomer]);

  const handleSearchCustomers = async (q) => {
    await axios
      .post(`/customers/find?find=${q}&page=1&limit=100000&isarchived=false`)
      .then((res) => {
        setCustomers([]);
        res.data.forEach((cust) => {
          setCustomers((prev) => [
            ...prev,
            {
              label: cust.businessname,
              value: cust._id,
              deliveryfee: cust?.deliveryfee,
            },
          ]);
        });
      })
      .catch(console.error);
  };

  const handleSearchProduct = async (q) => {
    await axios
      .post(
        `/orders/sendcustomeridfororder/${selectedCustomerId}?find=${q}&page=1&limit=100000`
      )
      .then((res) => {
        setProducts([]);
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
      .catch(console.error);
  };

  useEffect(() => {
    isEdit && customers.length > 0 && fetchOrderById(location.state?.id);
  }, [isEdit, customers]);

  // useEffect(() => {
  //   console.log(selectedCustomerId);
  //   isEdit && fetchCustomerById(selectedCustomerId);
  // }, [isEdit, selectedCustomerId]);

  const fetchOrderById = async (id) => {
    await axios
      .get(`/orders/${id}`)
      .then((res) => {
        fetchCustomerById(res.data.customer);
        setSelectedCustomerId(res.data.customer);
        setDate(res.data.date);

        setOrderTotal(res.data.totalamount);

        let prods = res.data.products;
        prods.forEach((prod) => {
          setSelectedProducts((prev) => [
            ...prev,
            {
              productId: prod.product._id,
              oldprice: prod.product.price,
              newprice: prod.product.newprice
                ? prod.product.newprice
                : prod.product.price,
              name: prod.product.name,
              assignedCode: prod.product.assignedCode,
              upb: prod.product.unitesperbox,
              quantity: prod.quantity,
            },
          ]);
        });
      })
      .catch(console.error);
  };

  const fetchCustomerById = async (id) => {
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        setSelectedCustomer(res.data);
        setSearchPlaceholder(res.data?.businessname);
        handleSendCustomerId(res.data?._id, res.data?.businessname);
      })
      .catch(console.error);
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
    setConfirmed(true);
  };

  const handleSendCustomerId = async (custId, lbl) => {
    setSelectedCustomerId(custId);
    await axios
      .post(
        `orders/sendcustomeridfororder/${custId}?page=1&limit=30&isarchived=false`
      )
      .then((res) => {
        setSearchPlaceholder(lbl);
        setNonEditedProducts(res.data.data);
        res.data.data.forEach((prod) => {
          setProducts((prev) => [
            ...prev,
            {
              label: prod.name,
              value: prod._id,
              price: prod.price,
              newprice: prod.promotionPrice ? prod.promotionPrice : null,
              special: prod.promotionPrice ? true : false,
              assignedCode: prod.assignedCode,
              upb: prod.unitesperbox,
            },
          ]);
        });
      })
      .catch(console.error);
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
      customer: selectedCustomerId,
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
        .catch((err) => {
          err.response.status === 400 && setReqError(err.response.data.error);
        })
        .finally(() => setLoading(false));
    } else {
      setError(true);
    }
  };

  const handleUpdateOrder = async () => {
    let filteredProducts = [];
    selectedProducts.forEach((p) => {
      filteredProducts = [
        ...filteredProducts,
        {
          product: nonEditedProducts.filter((pr) => pr._id === p.productId)[0],
          pricePerUnit: p.newprice,
          quantity: p.quantity,
        },
      ];
    });

    let dataToSend = {
      _id: 2,
      customer: selectedCustomerId,
      products: filteredProducts,
      date: date,
      totalamount: parseFloat(orderTotal),
    };

    if (allValid()) {
      setLoading(true);
      await axios
        .put(`orders/${location.state?.id}`, dataToSend)
        .then(() => {
          nav("/orders");
        })
        .catch((err) => {
          err.response.status === 400 &&
            setReqError(err.response.data?.message);
        })
        .finally(() => setLoading(false));
    } else {
      setError(true);
    }
  };

  const handleSelectProduct = (e) => {
    setConfirmed(false);
    let prod = products.filter((pro) => pro.value === e)[0];
    setSelectedProducts((prev) => [
      ...prev,
      {
        productId: prod.value,
        oldprice: prod.price,
        newprice: prod.newprice ? prod.newprice : prod.price,
        special: prod.special,
        name: prod?.label,
        assignedCode: prod.assignedCode,
        upb: prod.upb,
      },
    ]);
  };

  const handleRemoveProduct = (id) => {
    let prod = selectedProducts.filter((pro) => pro.productId === id)[0];

    orderTotal > 0 &&
      setOrderTotal((prev) =>
        (parseFloat(prev) - parseFloat(prod.newprice) * prod.quantity).toFixed(
          2
        )
      );
    setSelectedProducts((prev) => [
      ...prev.filter((pro) => pro.productId !== id),
    ]);
    setConfirmed(true);
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
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          {isEdit ? "Edit Order" : "Add New Order"}
        </h4>
      </div>
      <div className="formsContainer px-4 ">
        <div className="text-center mt-5 mb-4">
          <h5
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )}  mx-3 mx-sm-4`}
          >
            Order Details
          </h5>
        </div>

        <hr className="line"></hr>

        <div>
          {!isEdit && (
            <>
              <span className="mb-3 formsLable">Customer</span>
              <NewSearchDD
                data={customers}
                handleSearch={handleSearchCustomers}
                handleSelect={handleSendCustomerId}
                placeHolder={searchPlaceHolder}
              />
            </>
          )}
          <DatePickerr
            inputFormat="DD-MM-YYYY"
            views={["year", "month", "day"]}
            lable="Delivery date"
            id="orderDate"
            name="orderDate"
            minDate={moment(new Date()).format("L")}
            value={date}
            handleChange={(e) => setDate(e.target.value)}
            shouldDisableDate={disableMondays}
          />
          <div className="mt-2">
            <span className="mb-3 formsLable">Products</span>
            <NewSearchDD
              data={products}
              handleSearch={handleSearchProduct}
              handleSelect={handleSelectProduct}
              placeHolder={"Products"}
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
                    isEdit={isEdit}
                  />
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="col-12 col-sm-4 mt-3 p-4 orderTotalsbox">
              <div className="d-flex mb-3 align-items-center">
                <h6 className="m-0 me-2 formsLable">Delivery Fee:</h6>
                <div className="textLightBlue">
                  {selectedCustomer?.deliveryfee > 0
                    ? "$ " + selectedCustomer.deliveryfee.toFixed(2)
                    : "$ " + (0).toFixed(2)}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <h6 className="m-0 me-2 formsLable">Total Cost:</h6>
                <div className="textLightBlue">
                  $ {parseFloat(orderTotal).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 mb-1 w-100 d-flex justify-content-center">
            <p className="errorText"> {reqError !== "" && reqError}</p>
          </div>
          <div className="text-center mt-3 mb-4">
            <BtnContained
              title={isEdit ? "UPDATE ORDER" : "SUBMIT ORDER"}
              handleClick={() => {
                isEdit ? handleUpdateOrder() : handleSubmitOrder();
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
