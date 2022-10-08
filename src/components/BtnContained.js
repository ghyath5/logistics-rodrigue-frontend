import React from "react";
import { Button } from "@mui/material";

const BtnContained = ({ title }) => {
  return (
    <Button className="capitalize btnContained" variant="contained">
      {title}
    </Button>
  );
};

export default BtnContained;
