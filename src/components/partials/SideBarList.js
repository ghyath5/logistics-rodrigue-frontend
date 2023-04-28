import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SideBarList = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem(window.location.pathname);
  }, [location]);

  const myList = [
    { text: "Dashboard", goTo: "/" },
    { text: "Orders", goTo: "/orders" },
    { text: "Customers", goTo: "/customers" },
    { text: "Organisations", goTo: "/organisations" },
    { text: "Products", goTo: "/products" },
    { text: "Promotions", goTo: "/promotions" },
    { text: "Regions", goTo: "/regions" },
    { text: "Runs", goTo: "/runs" },
    { text: "Staff Members", goTo: "/staffmembers" },
    { text: "Drivers", goTo: "/drivers" },
    { text: "Vehicles", goTo: "/vehicles" },
  ];

  const handleItemSelected = (goTo) => {
    setSelectedItem(goTo);
    toggleDrawer();
    navigate(goTo && goTo);
  };

  let onlyUpperAdmin = ["Staff Members", "Dashboard"];

  return (
    <Box role="presentation">
      <List>
        {myList.map((item, index) => {
          let monA = Cookies.get("ismonA");
          return monA !== "true" &&
            onlyUpperAdmin.includes(item.text) ? null : (
            <ListItem
              key={index}
              disablePadding
              className={`${selectedItem === item.goTo ? "selected" : ""}`}
              onClick={() => handleItemSelected(item?.goTo && item.goTo)}
            >
              <ListItemButton className="list-btn position-relative">
                {index === 5 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="giftIcon bi bi-gift"
                    fill="#8219d8"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
                  </svg>
                )}
                <ListItemText
                  primary={item.text}
                  className={`sideLinks-${localStorage.getItem(
                    "monjay-theme"
                  )} fw-bold`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBarList;
