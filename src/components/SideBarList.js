import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import BtnOutlined from "./BtnOutlined";

const SideBarList = ({ toggleDrawer }) => {
  const myList = [
    { text: "Dashboard" },
    { text: "Orders"  },
    { text: "Customers" },
    { text: "Products" },
    { text: "Promotions" },
    { text: "Staff Members" },
    { text: "Vehciles" },
    { text: "Finalise Deliveries" },
  ];
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer()}
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        {myList.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            {/* onClick={() => toggleDrawer()} */}
            <ListItemButton className="list-btn ">
               <ListItemText primary={item.text} className="fw-bolde"/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="my-2">

      <BtnOutlined title="Log out" />
      </div>
    </Box>
  );
};

export default SideBarList;
