import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useDeviceType from "../../hooks/useDeviceType";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("monjayToken");
    navigate("/login");
  };

  return (
    <Box className="headerContainer">
      <AppBar position="fixed">
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
            <Link to="/" className="logoLink">
              <h3 className="text-white m-0">
                <span className="text-black">Monjay</span> admin
              </h3>
            </Link>
          </div>
          <Button color="inherit" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
