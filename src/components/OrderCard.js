import React from "react";
import Orders from "../data/orders";
import BtnOutlined from "./BtnOutlined";

const OrderCard = () => {
  return (
    <>
      {Orders &&
        Orders.map((order, index) => {
          return (
            <div
              key={index}
              className=" row justify-content-between orderConainer   align-items-center my-4"
            >
              <div className="col-lg-4 col-md-4 col-sm-6 order-title-border">
                <h5 className="order-title">{order.title}</h5>
                <div className="d-flex justify-content-start align-itmes-center text-left hhhh  ">
                  <div>
                    <span className="order-primary fw-bold me-2 ">Phone:</span>
                  </div>
                  <div>
                    <span className="order-primary-number fw-semibold">
                      {order.primaryPhone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-6 text-center Address-orders   order-title-border ">
                <div>
                  <span className="order-primary fw-bold">Address</span>
                </div>
                <div>
                  <span className="order-primary-number fw-semibold ">
                    {order.address}
                  </span>
                </div>
              </div>
              <div className="col-lg-4   col-md-4 col-sm-6 text-center left-orders ">
                <BtnOutlined title="Confirmed" />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default OrderCard;
