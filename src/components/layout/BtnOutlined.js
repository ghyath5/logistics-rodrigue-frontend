import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title, classes, handleClick, disabled }) => {
  return (
    <Button
      className={`capitalize btnOutlined ${classes}`}
      variant="outlined"
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default BtnOutlined;
