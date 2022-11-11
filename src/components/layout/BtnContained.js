import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title, handleClick, classes }) => {
  return (
    <Button
      className={`capitalize btnContained ${classes}`}
      variant="contained"
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default BtnContained;
