import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title,onClick }) => {
  return (
    <Button className="capitalize btnContained " variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};

export default BtnContained;
