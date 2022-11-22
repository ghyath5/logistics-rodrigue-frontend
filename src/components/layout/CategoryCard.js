import React from "react";
import useDeviceType from "../../hooks/useDeviceType";
import BtnOutlined from "./BtnOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CategoryCard = ({ name }) => {
  const { deviceType } = useDeviceType();

  return (
    <div
      className={`${
        deviceType === "tablet" ? "col-12 p-0" : "p-0 col-12 col-sm-6 col-md-3"
      } `}
    >
      <div className="me-2 me-sm-3 mb-3 mb-sm-1">
        <div className="categoryCard d-flex justify-content-center flex-column text-center position-relative">
          {/* <div className="text-end pe-2 pt-1 position-absolute top-0 end-0 ">
            <HighlightOffIcon
              color="error"
              fontSize="small"
              className="circle-delete-icon"
            />
          </div> */}
          <h4 className="text-capitalize">{name}</h4>
          <h5>10 porducts</h5>
          <div className="mt-2">
            <BtnOutlined
              title="Edit"
              handleClick={() => {
                console.log("Edit");
              }}
            />
            {/* <BtnOutlined
              title="View"
              handleClick={() => {
                console.log("View");
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
{
  /* <div className="statsCard d-flex justify-content-center flex-column text-center">
  {icon && <img src={icon} alt="icon" className="mb-3" />}
  <h3 className="m-0">{title}</h3>
  <h2>{value}</h2>
</div> */
}
