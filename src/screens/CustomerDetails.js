import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import DDSearch from "../components/layout/DDSearch";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
// import OrderCard from "../components/orders/OrderCard";
import phoneIcon from "../assets/phone.svg";
import mapIcon from "../assets/map.svg";
import boardIcon from "../assets/board.svg";
import { states } from "../data/configs";
import Modal from "../components/layout/Modal";

const CustomerDetails = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);

  const [promotions, setPromotions] = useState([]);
  const [promotionToAdd, setPromotionToAdd] = useState("");
  const [themedFont, setThemedFont] = useState({
    primary: "headerss-light",
    secondary: "textLightBlue",
  });

  useEffect(() => {
    setThemedFont({
      primary: `headerss-${localStorage.getItem("monjay-theme")}`,
      secondary: `textLightBlue`,
    });
  }, []);

  useEffect(() => {
    fetchCustomerAndPromotion(location.state?.id);
  }, [location.state?.id]);

  const fetchCustomerAndPromotion = async (id) => {
    setLoading(true);
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
      })
      .then(() => fetchPromotions())
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchPromotions = async () => {
    await axios
      .get(`/promotion`)
      .then((res) => {
        res.data.promotions.forEach((prom) => {
          setPromotions((prev) => [
            ...prev,
            { label: prom.name, value: prom._id },
          ]);
        });
      })
      .catch(console.error);
  };

  const archiveCustomer = async (id) => {
    setLoading(true);
    const body = {
      isarchived: true,
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        console.log("archived");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAddPromotionToCustomer = async (id, promId) => {
    setPromotionToAdd(promId);
    setLoading(true);
    const body = {
      promotions: [...customer.promotions, promId],
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className={`${themedFont.primary} my-2`}>Customer Details</h3>
        <div className=" mainBtn align-items-center">
          <div>
            <BtnContained
              title="ARCHIVE CUSTOMER"
              handleClick={() => {
                archiveCustomer(customer._id);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 row">
        <div className="col-12 col-sm-6 col-md-4 mb-3 mb-sm-0">
          <div className="detailsCard px-3 py-4 text-center h-100">
            <div className="initials-circle initials-circle-bg mx-auto">
              <h1>
                {customer.customername.split(" ").length > 1
                  ? customer.customername
                      .split(" ")[0]
                      .charAt(0)
                      .toUpperCase() +
                    customer.customername.split(" ")[1].charAt(0).toUpperCase()
                  : customer.customername.split(" ")[0].charAt(0).toUpperCase()}
              </h1>
            </div>
            <div className="mt-5 mb-4">
              <h5
                className={`headerss-${localStorage.getItem(
                  "monjay-theme"
                )} text-capitalize`}
              >
                {customer.customername}
              </h5>
              <h6 className={themedFont.secondary}>{customer.email}</h6>
              <h6 className={themedFont.primary}>{customer.phonenumber}</h6>
            </div>
            <hr />
            <div className="d-flex justify-content-center gap-2">
              <BtnContained
                title="Send Email"
                handleClick={() => {
                  // var mailto_link = "mailto:" + customer.email;
                  // window.open(mailto_link, "emailWindow");
                  console.log("email");
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-3 mb-sm-0">
          <div className="detailsCard h-100 px-3 py-4 ">
            <h5 className={themedFont.primary}>Geographics</h5>
            <hr />
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgRed">
                <img src={phoneIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5
                  className={`headerss-${localStorage.getItem(
                    "monjay-theme"
                  )} mb-0`}
                >
                  Contact
                </h5>
                <h6 className={`mb-0 ${themedFont.secondary}`}>
                  {customer.phonenumber}
                </h6>
              </div>
            </div>
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgYellow ">
                <img src={boardIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5
                  className={`headerss-${localStorage.getItem(
                    "monjay-theme"
                  )} mb-0`}
                >
                  ABN
                </h5>
                <h6 className={`mb-0 ${themedFont.secondary}`}>
                  {customer.abn}
                </h6>
              </div>
            </div>
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgRed">
                <img src={mapIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5
                  className={`headerss-${localStorage.getItem(
                    "monjay-theme"
                  )} mb-0`}
                >
                  Address
                </h5>
                <h6 className={`mb-0 ${themedFont.secondary}`}>
                  {states[customer.state]?.label +
                    ", " +
                    customer.suburb +
                    ", " +
                    customer.address}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 mb-3 mb-sm-0 ">
          <div className="h-100 d-flex flex-column gap-4 mt-sm-3 mt-md-0">
            <div className="detailsCard h-100 w-100 px-3 py-4 ">
              <h5 className={themedFont.primary}>Orders</h5>
              <hr />
              <h6 className={`${themedFont.primary} mb-0 pt-2`}>
                Total:{" "}
                <span className={themedFont.secondary}>
                  {customer.totalOrders > 0
                    ? customer.totalOrders + " order"
                    : "no previous orders"}
                </span>
              </h6>
              <h6 className={`${themedFont.primary} mb-0 pt-2`}>
                Total USD:{" "}
                <span className={themedFont.secondary}>
                  {customer.totalOrders > 0 ? "2500 $" : "0 $"}
                </span>
              </h6>
            </div>
            <div className="detailsCard h-100 w-100 px-3 py-4 ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className={themedFont.primary}>Promotions</h5>
                <Modal btnTitle="Add" title="Select a Promotion">
                  <DDSearch
                    name="categoryId"
                    lable=""
                    options={promotions}
                    isDisabled={false}
                    isMulti={false}
                    val={promotionToAdd}
                    handleChange={(e) =>
                      handleAddPromotionToCustomer(customer._id, e.target.value)
                    }
                  />
                </Modal>
              </div>
              <hr />
              <div className="scrollY">
                {customer.promotions.length > 0 ? (
                  customer.promotions.map((prom, i) => {
                    return (
                      <h6 className={themedFont.primary}>
                        {i + 1}- {prom.name}
                      </h6>
                    );
                  })
                ) : (
                  <h6 className="text-center">None</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetails;
