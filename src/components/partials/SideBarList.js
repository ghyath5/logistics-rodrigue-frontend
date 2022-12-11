import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const SideBarList = ({ toggleDrawer, selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();

  const myList = [
    { text: "Dashboard", goTo: "/" },
    { text: "Orders", goTo: "/orders" },
    { text: "Customers", goTo: "/customers" },
    { text: "Products", goTo: "/products" },
    { text: "Promotions", goTo: "/promotions" },
    { text: "Staff Members", goTo: "/staffmembers" },
    { text: "Vehicles", goTo: "/vehicles" },
    { text: "Finalise Deliveries", goTo: "/finalise" },
  ];

  const handleItemSelected = (goTo, i) => {
    setSelectedItem(i);
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
            className={`${selectedItem === index ? "selected" : ""}`}
            onClick={() => handleItemSelected(item?.goTo && item.goTo, index)}
          >
            <ListItemButton className="list-btn position-relative">
              {index === 4 && (
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
              <ListItemText primary={item.text} className="fw-bold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBarList;
