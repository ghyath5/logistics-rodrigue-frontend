import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useDeviceType from "../hooks/useDeviceType";

const SideBar = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();

  useEffect(() => {
    deviceType !== "laptop" ? setOpen(false) : setOpen(true);
  }, [deviceType]);

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={() => toggleDrawer()}
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            {/* onClick={() => toggleDrawer()} */}
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
        {list()}
      </SwipeableDrawer>
    </>
  );
};

export default SideBar;
