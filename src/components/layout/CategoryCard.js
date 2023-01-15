import React from "react";
import useDeviceType from "../../hooks/useDeviceType";
import Model from "./Model";

const CategoryCard = ({ id, name, productCount, handleAction, isUpdate }) => {
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
            <h4
              className={`headerss-${localStorage.getItem(
                "monjay-theme"
              )} text-capitalize`}
            >
              {name}
            </h4>
            <h5 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
              {productCount} products
            </h5>
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
