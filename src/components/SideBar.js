import React, { useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useDeviceType from "../hooks/useDeviceType";
import SideBarList from "../components/SideBarList";

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
        <div className="profile-container mb-3 mt-5">
          <h2 className="profile p-3">SS</h2>
          <h5 className="my-1">Sonia Stewart </h5>
        </div>
        <SideBarList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </>
  );
};

export default SideBar;
