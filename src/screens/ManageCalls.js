import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallsList from "../components/CallsList";
import NewSearchDD from "../components/layout/NewSearchDD";
import ProdRowDetails from "../components/ProdRowDetails";
import moment from "moment";
import BtnContained from "../components/layout/BtnContained";
import { Snackbar } from "@mui/material";

const ManageCalls = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [selectedCustomer, setSelectedCustomerId] = useState({
    id: "",
    name: "",
  });

  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCalls(location.state?.id);
  }, [location.state?.id]);

  const clearOrder = () => {
    setSelectedCustomerId({ id: "", name: "" });
    setOrderTotal(0);
    setSelectedProducts([]);
    setProducts([]);
  };

  const fetchCalls = async (id) => {
    setLoading(true);
    await axios
      .get(`/customers/calls?routeId=${id}`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSendCustomerId = async (custId) => {
    setSelectedCustomerId({ id: custId.id, name: custId.name });
    await axios
      .post(
        `orders/sendcustomeridfororder/${custId.id}?page=1&limit=30&isarchived=false`
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
              special: prod.promotionPrice ? true : false,
              assignedCode: prod.assignedCode,
              upb: prod.unitesperbox,
            },
          ]);
        });
      })
      .catch(console.error);
  };

  const handleSearchProduct = async (q) => {
    await axios
      .post(
        `/orders/sendcustomeridfororder/${selectedCustomer?.id}?find=${q}&page=1&limit=100000`
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

  const handleSelectProduct = (e) => {
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

    orderTotal > 0 &&
      setOrderTotal((prev) =>
        (parseFloat(prev) - parseFloat(prod.newprice) * prod.quantity).toFixed(
          2
        )
      );
    setSelectedProducts((prev) => [
      ...prev.filter((pro) => pro.productId !== id),
    ]);
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
      customer: selectedCustomer.id,
      products: filteredProducts,
      date: new Date(),
      totalamount: parseFloat(orderTotal),
      status: 0,
    };

    // if (allValid()) {
    await axios
      .post(`orders`, dataToSend)
      .then(() => {
        setFeedback(true);
        clearOrder();
      })
      .catch(console.error);
    // } else {
    //   setError(true);
    // }
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <Snackbar
        open={feedback}
        onClose={() => setFeedback(false)}
        autoHideDuration={3000}
        message={"order created"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        ContentProps={{
          sx: { backgroundColor: "#2196f3" },
        }}
      />
      <div className="d-flex align-items-center my-4">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => nav(-1)}
        />
        <h3
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          Calls
        </h3>
      </div>
      {customers.length > 0 ? (
        <div className="d-flex gap-2">
          <CallsList
            customers={customers}
            setCustomers={setCustomers}
            selectedCustomer={selectedCustomer}
            handleSendCustomerId={handleSendCustomerId}
          />
          <div className="formsContainer p-4 w-100" style={{ flex: 2 }}>
            <div className="text-center mb-4">
              <h5
                className={`headerss-${localStorage.getItem(
                  "monjay-theme"
                )}  mx-3 mx-sm-4`}
              >
                New Order
              </h5>
            </div>
            <button className="dropbtn w-100 mb-2">
              {selectedCustomer?.name || "customer name"}
            </button>
            <button className="dropbtn w-100 mb-2">
              {moment(customers[0].sheduledCall.date)
                .add(1, "days")
                .format("L")}
            </button>
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
                      isEdit={false}
                    />
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <BtnContained
                title={"SUBMIT ORDER"}
                handleClick={() => {
                  handleSubmitOrder();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <NoDataPlaceHolder current="Scheduled Calls" />
      )}
    </Layout>
  );
};

export default ManageCalls;
