import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title ,color,onClick}) => {
  return (
    <Button className="capitalize btnOutlined logout " variant="outlined" color={color} onClick={onClick}>
      {title}
    </Button>
  );
};

export default BtnOutlined;
