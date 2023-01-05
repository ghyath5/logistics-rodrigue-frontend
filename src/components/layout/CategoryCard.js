import React from "react";
import useDeviceType from "../../hooks/useDeviceType";
import Model from "./Model";

const CategoryCard = ({ id, name, handleAction, isUpdate }) => {
  const { deviceType } = useDeviceType();

  return (
    <>
      <div
        className={`${
          deviceType === "tablet"
            ? "col-12 p-0"
            : "p-0 col-12 col-sm-6 col-md-3"
        } `}
      >
        <div className="me-2 me-sm-3 mb-3 mb-sm-1">
          <div className="categoryCard d-flex justify-content-center flex-column text-center position-relative">
            <h4 className="text-capitalize">{name}</h4>
            <h5>10 products</h5>
            <div className="mt-2">
              <Model
                id={id}
                handleAction={handleAction}
                btn="Edit"
                title="Update Category"
                defaultValue={name}
                isUpdate={isUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
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
