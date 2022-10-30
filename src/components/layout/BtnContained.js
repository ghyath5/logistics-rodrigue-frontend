import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title,handelClick }) => {
  return (
    <Button className="capitalize btnContained " variant="contained" onClick={handelClick}>
      {title}
    </Button>
  );
};

export default BtnContained;
