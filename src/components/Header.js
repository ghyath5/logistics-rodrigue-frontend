import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useDeviceType from "../hooks/useDeviceType";

const Header = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();

  return (
    <Box className="headerContainer h-100">
      <AppBar position="relative">
        <Toolbar className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!isOpen)}
              className={`${deviceType === "laptop" ? "d-none" : ""}`}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              News
            </Typography>
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
