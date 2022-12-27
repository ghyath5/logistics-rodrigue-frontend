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
                <h4 className="text-capitalize">{item?.customer}</h4>
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
              <Typography>products and shipping details</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Accordionn;
