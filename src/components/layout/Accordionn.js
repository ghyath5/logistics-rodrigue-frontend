import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordionn = ({ data }) => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="myAccordion">
      {data.map((item, i) => {
        return (
          <Accordion
            key={`panel-${i}`}
            expanded={expanded === i}
            onChange={handleChange(i)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="w-100 d-flex justify-content-between align-items-center">
                <h4 className="text-capitalize">
                  {item?.customer !== null
                    ? item.customer.customername
                    : "customer"}
                </h4>
                <div className="d-flex flex-column justify-content-center">
                  <span className="d-flex align-items-end">
                    status:
                    <h5 className="mb-0 ms-2 me-3 textGreen">Confirmed</h5>
                  </span>
                  <span className="d-flex align-items-end">
                    order total:
                    <h4 className="mb-0 ms-2 me-3">{200 + "$"}</h4>
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="d-flex gap-5">
                <div>
                  <p className="m-0 fw-bold">Products:</p>
                  <div className="row text-promotion">
                    {item?.products.map((item, i) => {
                      return (
                        <span key={i} className="fs-6">
                          {item.product.name} - ${item.product.price}
                          <span className="fromDolar"> x{item.quantity}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="m-0 fw-bold">Delivery details:</p>
                  <div className="row text-promotion">
                    <span key={i} className="fs-6">
                      {item?.customer !== null
                        ? item.customer.address[0] +
                          ", " +
                          item.customer.suburb +
                          ", " +
                          item.customer.state
                        : "customer address"}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Accordionn;
