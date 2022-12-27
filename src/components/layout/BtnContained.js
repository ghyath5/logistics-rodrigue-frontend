import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title, handleClick, classes, disabled, type }) => {
  return (
    <Button
      className={`capitalize btnContained ${classes}`}
      variant="contained"
      onClick={handleClick}
      disabled={disabled}
      type={type && type}
    >
      {title}
    </Button>
  );
};

export default BtnContained;
