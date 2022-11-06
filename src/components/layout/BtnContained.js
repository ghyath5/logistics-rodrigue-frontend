import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title, handelClick, classes }) => {
  return (
    <Button
      className={`capitalize btnContained ${classes}`}
      variant="contained"
      onClick={handelClick}
    >
      {title}
    </Button>
  );
};

export default BtnContained;
