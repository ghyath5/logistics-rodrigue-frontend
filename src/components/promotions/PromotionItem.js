import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PromotionItem = ({ prom, deletePromotion }) => {
  const nav = useNavigate();
  const [dates, setDates] = useState({ from: "", to: "" });
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    setDates({
      from: new Date(prom.from).toString().split("GMT")[0],
      to: new Date(prom.to).toString().split("GMT")[0],
    });
  }, [prom]);

  return (
    <div className="py-2 mb-2">
      <Accordion
        key={`panel-${prom._id}`}
        expanded={expanded === prom._id}
        onChange={handleChange(prom._id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <h4 className="text-capitalize m-0">{prom.name}</h4>
              <div
                onClick={() =>
                  nav("/editpromotion", {
                    state: { id: prom._id },
                  })
                }
              >
                <SettingsIcon className="settingIcon" />
              </div>
              <div onClick={() => deletePromotion(prom._id)}>
                <DeleteIcon className="deleteIcon" />
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center range-date">
              <span className="d-flex align-items-end">
                <span className="me-2">From:</span>
                <h5 className="mb-0 ms-auto me-2">{dates.from}</h5>
              </span>
              <span className="d-flex align-items-end">
                <span className="me-2">To:</span>
                <h5 className="mb-0 ms-auto me-2">{dates.to}</h5>
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <hr style={{ color: "#495767" }} className="mt-0"></hr>
          <p>{prom.description}</p>
          <h6>{prom.categorypromotion ? "Category: " : "Products Details"}</h6>
          <div className="row text-promotion">
            {prom.categorypromotion ? (
              <span className="col-12">
                {prom.categorypromotion?.categoryId?.name}{" "}
                {prom.categorypromotion?.discountpercentage}% discount
              </span>
            ) : (
              prom.productspromotion?.map((prod, ii) => {
                return (
                  <span key={ii} className="col-12">
                    {prod.productId.name} -&gt; {prod.newprice}$
                    <span className="fromDolar">
                      {" "}
                      (From {prod.productId.price}$)
                    </span>
                  </span>
                );
              })
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PromotionItem;
