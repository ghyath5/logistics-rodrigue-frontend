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

import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const Header = ({ isOpen, setOpen }) => {
  const { deviceType } = useDeviceType();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("monjayToken");
    navigate("/login");
  };

  const handleToggleTheme = () => {
    let theme = localStorage.getItem("monjay-theme");
    if (theme === "light") {
      localStorage.setItem("monjay-theme", "dark");
    } else {
      localStorage.setItem("monjay-theme", "light");
    }
    window.location.reload();
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
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button
                  variant="text"
                  className="text-white fw-700"
                  {...bindTrigger(popupState)}
                >
                  SETTINGS
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <div className="d-flex flex-column align-items-start p-2">
                    <Button
                      className="w-100  justify-content-start"
                      color="inherit"
                      onClick={handleToggleTheme}
                    >
                      TOGGLE THEME
                    </Button>
                    <Button
                      className="w-100  justify-content-start"
                      color="inherit"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </Button>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
          {/* <Button className="text-white" onClick={"bottom-end"}>
            SETTINGS
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
