import React from "react";
import Orders from "../../data/orders";
import BtnOutlined from "../layout/BtnOutlined";

const OrderCard = () => {
  return (
    <>
      {Orders &&
        Orders.map((order, index) => {
          return (
            <div
              key={index}
              className="row justify-content-between orderConainer align-items-center my-4 mx-0"
            >
              <div className="col-lg-4 col-md-4 col-sm-6 p-0">
                <h5 className="order-title">{order.title}</h5>
                <div className="d-flex justify-content-start align-itmes-center text-left">
                  <span className="order-card-lable fw-bold me-2">Phone:</span>
                  <span className="order-card-lable fw-semibold">
                    {order.primaryPhone}
                  </span>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 Address-orders order-title-border">
                <div>
                  <span className="order-card-lable fw-bold">Address</span>
                </div>
                <span className="order-card-lable fw-semibold ">
                  {order.address}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 text-center left-orders p-0">
                <BtnOutlined
                  title="Confirmed"
                  handleClick={() => {
                    console.log("Confirmed");
                  }}
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default OrderCard;
