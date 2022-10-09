import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import BtnOutlined from "./BtnOutlined";
import { useNavigate } from "react-router-dom";

const SideBarList = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  const myList = [
    { text: "Dashboard", goTo: "/" },
    { text: "Orders" },
    { text: "Customers" },
    { text: "Products", goTo: "/products" },
    { text: "Promotions" },
    { text: "Staff Members" },
    { text: "Vehciles" },
    { text: "Finalise Deliveries" },
  ];

  const handleItemSelected = (goTo) => {
    toggleDrawer();
    navigate(goTo && goTo);
  };

  return (
    <Box role="presentation">
      <List>
        {myList.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => handleItemSelected(item?.goTo && item.goTo)}
          >
            <ListItemButton className="list-btn ">
              <ListItemText primary={item.text} className="fw-bold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <div className="mt-5">
        <BtnOutlined title="Log out" />
      </div> */}
    </Box>
  );
};

export default SideBarList;
