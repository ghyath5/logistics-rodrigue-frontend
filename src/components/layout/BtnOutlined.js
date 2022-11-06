import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title, classes, handleClicked }) => {
  return (
    <Button
      className={`capitalize btnOutlined logout ${classes}`}
      variant="outlined"
      onClick={handleClicked}
    >
      {title}
    </Button>
  );
};

export default BtnOutlined;
