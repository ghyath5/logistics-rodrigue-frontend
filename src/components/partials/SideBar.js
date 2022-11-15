import React, { useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useDeviceType from "../../hooks/useDeviceType";
import SideBarList from "./SideBarList";

const SideBar = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();

  useEffect(() => {
    deviceType !== "laptop" ? setOpen(false) : setOpen(true);
  }, [deviceType]);

  const toggleDrawer = () => {
    deviceType !== "laptop" && setOpen(!isOpen);
  };

  return (
    <>
      <SwipeableDrawer
        sx={{
          flexShrink: 0,
        }}
        className={`sidebarContainer w-100 position-fixed ${
          deviceType === "laptop" ? "mt-5" : ""
        }`}
        anchor={"left"}
        open={isOpen}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        hideBackdrop={deviceType !== "laptop" ? false : true}
        variant={deviceType !== "laptop" ? "temporary" : "persistent"}
      >
        <div className="initial-container mb-3 mt-5">
          <h2 className="initials-circle p-3">RA</h2>
          <h5 className="my-1">Rodrigue Abdallah</h5>
        </div>
        <div className="sideBarList">
          <SideBarList toggleDrawer={toggleDrawer} />
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default SideBar;
