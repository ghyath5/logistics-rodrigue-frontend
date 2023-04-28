import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomerDetails = () => {
  const location = useLocation();
  const nav = useNavigate();
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

  const fetchCustomer = async (id) => {
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
        res.data.promotions.forEach((prom) => {
          setPromotions((prev) => [
            ...prev.filter((p) => p.value !== prom._id),
          ]);
        });
      })
      .catch(console.error);
  };

  const fetchCustomerAndPromotion = async (id) => {
    setLoading(true);

    setPromotions([]);
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
      .then(() => fetchCustomer(id))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const archiveCustomer = async (id) => {
    setLoading(true);
    const body = {
      isarchived: true,
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        // console.log("archived");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAddPromotionToCustomer = async (id, promId) => {
    setLoading(true);
    const body = {
      promotions: [...customer.promotions, promId],
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        setPromotionToAdd(promId);
        fetchCustomerAndPromotion(location.state?.id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleRemovePromotionToCustomer = async (id, promId) => {
    const body = {
      promotions: customer.promotions.filter((p) => p._id !== promId),
    };
    await axios
      .put(`/customers/${id}`, body)
      .then((res) => {
        setPromotionToAdd("");
        fetchCustomerAndPromotion(location.state?.id);
      })
      .catch(console.error);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 align-items-center">
          <ArrowBackIcon
            className="ArrowBackIcon"
            fontSize="medium"
            onClick={() => nav("/customers")}
          />
          <h3 className={`${themedFont.primary} my-2`}>Customer Details</h3>
        </div>
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
                {customer.firstname.charAt(0).toUpperCase() +
                  customer.lastname.charAt(0).toUpperCase()}
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
                  var mailto_link =
                    "mailto:" + customer.email + "?subject=Monjay";
                  window.open(mailto_link, "emailWindow");
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
                  {customer.city +
                    ", " +
                    customer.region +
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
                  {promotions.length > 0 ? (
                    <DDSearch
                      name="categoryId"
                      lable=""
                      options={promotions}
                      isDisabled={false}
                      isMulti={false}
                      val={promotionToAdd}
                      handleChange={(e) =>
                        handleAddPromotionToCustomer(
                          customer._id,
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    "No available promotions at this time"
                  )}
                </Modal>
              </div>
              <hr />
              <div className="scrollY">
                {customer.promotions.length > 0 ? (
                  customer.promotions.map((prom, i) => {
                    return (
                      <div
                        key={i}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <h6 className={`${themedFont.primary} m-0`}>
                          {i + 1}- {prom.name}
                        </h6>
                        <div
                          className="pointer"
                          onClick={() =>
                            handleRemovePromotionToCustomer(
                              customer._id,
                              prom._id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#c01616"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </div>
                      </div>
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
