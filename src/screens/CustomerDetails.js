import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
import OrderCard from "../components/orders/OrderCard";
import phoneIcon from "../assets/phone.svg";
import mapIcon from "../assets/map.svg";
import boardIcon from "../assets/board.svg";
import { states } from "../data/configs";

const CustomerDetails = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomer(location.state?.id);
  }, [location.state?.id]);

  const fetchCustomer = async (id) => {
    setLoading(true);
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
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
        console.log("archived");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h3 className="headerTitle my-2">Customer Details</h3>
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
          <div className="detailsCard px-3 py-4 text-center">
            <div>
              <h1 className="initials-circle initials-circle-bg p-5 mx-auto">
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
              <h5 className="text-capitalize">{customer.customername}</h5>
              <h6 className="textGray">{customer.email}</h6>
              <h6>{customer.phonenumber}</h6>
            </div>
            <hr />
            <div className="d-flex justify-content-center gap-2">
              <BtnContained
                title="Send Email"
                handleClick={() => {
                  console.log("Email");
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-3 mb-sm-0">
          <div className="detailsCard h-100 px-3 py-4 ">
            <h5>Geographics</h5>
            <hr />
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgRed">
                <img src={phoneIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5 className="mb-0">Contact</h5>
                <h6 className="mb-0 textGray">{customer.phonenumber}</h6>
              </div>
            </div>
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgYellow ">
                <img src={boardIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5 className="mb-0">ABN</h5>
                <h6 className="mb-0 textGray">{customer.abn}</h6>
              </div>
            </div>
            <div className="geoItem mb-3 d-flex align-items-center p-2 gap-3">
              <div className="rounded-50 bgRed">
                <img src={mapIcon} alt="phoneIcon" className="p-3" />
              </div>
              <div>
                <h5 className="mb-0">Address</h5>
                <h6 className="mb-0 textGray">
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
        <div className="col-12 col-sm-12 col-md-4 mb-3 mb-sm-0 ">
          <div className="h-100 d-flex flex-md-column gap-4 mt-sm-3 mt-md-0">
            <div className="detailsCard h-100 w-100  px-3 py-4 ">
              <h5>Orders</h5>
              <hr />
              <h1 className="text-center mb-0 mt-4 pt-2">
                50<span className="subText">(total)</span>
              </h1>
            </div>
            <div className="detailsCard h-100 w-100  px-3 py-4 ">
              <h5>Orders Cost</h5>
              <hr />
              <h1 className="text-center mb-0 mt-4 pt-2">
                2500<span className="subText">(USD)</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="my-4">
        <h3 className="headerTitle">All Orders</h3>
      </div>
      <div>
        <OrderCard />
      </div> */}
    </Layout>
  );
};

export default CustomerDetails;
