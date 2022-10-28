import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title }) => {
  return (
    <Button className="capitalize btnOutlined logout " variant="outlined">
      {title}
    </Button>
  );
};

export default BtnOutlined;
