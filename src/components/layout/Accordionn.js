import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DDSearch from "../layout/DDSearch";
import { orderStatues } from "../../data/configs";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const Accordionn = ({
  item,
  id,
  allOrders,
  setAllOrders,
  expanded,
  setExpanded,
}) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [statuss, setStatus] = useState(item.status.toString());

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleChangeOrderStatus = (e) => {
    setStatus(e.target.value);
    setOpen(true);
  };

  const handleChangeOrderRequest = async () => {
    setOpen(false);
    await axios
      .put(`/orders/${item._id}`, { status: statuss })
      .then(() => {
        setStatus(statuss);
        let oldOrders = allOrders;
        let ind;
        oldOrders.forEach((p, i) => (p._id === item._id ? (ind = i) : null));

        let changing = oldOrders[ind];
        changing.status = statuss;
        oldOrders[ind] = changing;
        setAllOrders(oldOrders);
      })
      .then(() => setExpanded(""))
      .catch(console.error);
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="modalMinWidth">
          {statuss === "3"
            ? "If you canceled the order you can't un-cancel it, are you sure?"
            : "Are you sure you want to change the status?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button className="text-danger" onClick={handleChangeOrderRequest}>
            {statuss === "3" ? "Yes, Cancel now" : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
      <Accordion
        key={`panel-${id}`}
        expanded={expanded === id}
        onChange={handleChange(id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <h4 className="text-capitalize mb-0">
                {item.customer.businessname}
              </h4>
              <span className="text-capitalize">
                {item?.date?.split("T")[0]}
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <span className="d-flex">
                <div className="d-flex flex-column">
                  <span>status:</span>
                  <span>total:</span>
                </div>
                <div className="text-center" style={{ width: 120 }}>
                  <h5
                    className={`mb-0 ms-2 me-3 ${
                      orderStatues[item.status].class
                    }`}
                  >
                    {orderStatues[item.status].label}
                  </h5>
                  <h4 className="mb-0 ms-2 me-3">
                    {item.totalamount.toFixed(2) + "$"}
                  </h4>
                </div>
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex gap-5 mt-3">
            <div>
              <p className="m-0 fw-bold">Products:</p>
              <div className="row text-promotion maxw">
                {item?.products.map((item, i) => {
                  return (
                    <span
                      key={i}
                      className={`fs-6  ${
                        i % 2 === 0 ? "textGray2" : "textGray"
                      }`}
                    >
                      {item.product.name} - ${item.pricePerUnit}
                    </span>
                  );
                })}
                {item.customer.deliveryfee > 0 && (
                  <span className="fs-6 textGray">
                    Delivery Fees - ${item.customer.deliveryfee}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="m-0 fw-bold">Quantity:</p>
              <div className="row text-promotion">
                {item?.products.map((item, i) => {
                  return (
                    <span
                      key={i}
                      className={`fs-6 ${
                        i % 2 === 0 ? "textGray2" : "textGray"
                      }`}
                    >
                      {item.quantity}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="m-0 fw-bold">Delivery details:</p>
              <div className="row text-promotion">
                <span className="fs-6">
                  {item.customer?.address &&
                    item.customer?.address[0] +
                      ", " +
                      item.customer?.suburb +
                      ", " +
                      item.customer?.state}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <p className="m-0 me-2 fw-bold">Change Status:</p>
              <div className="row text-promotion w-100">
                <DDSearch
                  name="status"
                  options={orderStatues}
                  isDisabled={false}
                  isMulti={false}
                  val={statuss}
                  handleChange={handleChangeOrderStatus}
                />
              </div>
              <p
                onClick={() => nav("/editOrder", { state: { id: item._id } })}
                className="ms-3 fw-bold textBlue w-100 align-self-center pointer"
              >
                Edit Order
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Accordionn;
