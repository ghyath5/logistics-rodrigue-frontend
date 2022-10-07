import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const SideBarList = ({ toggleDrawer }) => {
  const myList = [
    { text: "Inbox", icon: <InboxIcon /> },
    { text: "Starred", icon: <MailIcon /> },
    { text: "Send email", icon: <InboxIcon /> },
    { text: "Drafts", icon: <MailIcon /> },
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
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBarList;
