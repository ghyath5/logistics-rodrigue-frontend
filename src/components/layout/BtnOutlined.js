import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title, classes, handleClick }) => {
  return (
    <Button
      className={`capitalize btnOutlined ${classes}`}
      variant="outlined"
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default BtnOutlined;
