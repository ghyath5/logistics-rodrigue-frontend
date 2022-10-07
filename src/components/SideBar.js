import React, { useEffect, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import useDeviceType from "../hooks/useDeviceType";
import SideBarList from "../components/SideBarList"

const SideBar = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();

  useEffect(() => {
    deviceType !== "laptop" ? setOpen(false) : setOpen(true);
  }, [deviceType]);

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <SwipeableDrawer
        sx={{
          flexShrink: 0,
        }}
        className="sidebarContainer w-100"
        anchor={"left"}
        open={isOpen}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        hideBackdrop={deviceType !== "laptop" ? false : true}
        variant={deviceType !== "laptop" ? "temporary" : "persistent"}
      >
        <SideBarList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </>
  );
};

export default SideBar;
