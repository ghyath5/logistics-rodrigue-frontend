import React from "react";
import { Button } from "@mui/material";

const BtnOutlined = ({ title }) => {
  return (
    <Button className="capitalize btnOutlined " variant="outlined">
      {title}
    </Button>
  );
};

export default BtnOutlined;
