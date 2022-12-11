import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const PromotionItem = ({ prom }) => {
  const nav = useNavigate();
  const [dates, setDates] = useState({ from: "", to: "" });

  useEffect(() => {
    setDates({
      from: new Date(prom.from).toString().split("GMT")[0],
      to: new Date(prom.to).toString().split("GMT")[0],
    });
  }, [prom]);

  return (
    <div className="promotion-container ps-4 pe-2 py-3 mb-2">
      <div className="d-flex justify-content-end gap-1 me-1">
        <div onClick={() => nav("/promotionDetails")}>
          <SettingsIcon className="settingIcon" />
        </div>
        <DeleteIcon className="deleteIcon" />
      </div>
      <div>
        <h4>{prom.name}</h4>
        {/* <h6>Test</h6> */}
        <span className="range-date">
          {/* 02:12 am,24 October 2022 - 06:30am,28 October 2022 */}
          {dates.from} - {dates.to}
        </span>
      </div>
      <hr style={{ color: "#495767" }} className="me-4"></hr>
      <div>
        <h6>Products Details</h6>
      </div>
      <div className="row text-promotion">
        {prom.listprice.map((item, i) => {
          return (
            <span className="col-12" key={i}>
              Traditinal Falfel Poushes 225g -&gt; ${item.newprice}
              <span className="fromDolar"> (From $2.5)</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionItem;
