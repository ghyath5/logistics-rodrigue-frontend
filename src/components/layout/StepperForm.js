import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Box, Button, StepButton, Typography } from "@mui/material";
import InputOutlined from "./InputOutlined";
import DropDown from "../DropDown";

const StepperForm = ({ steps, completed, setCompleted }) => {
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newCompleted = completed;
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }} className="mt-3">
      <Stepper nonLinear activeStep={activeStep} className="mx-5">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </div>
        ) : (
          <div className="formsContainer mx-2 mt-4 px-3">
            {activeStep === 0 ? (
              <div className="mb-2 mt-4">
                <div className=" mx-3 mx-sm-4">
                  <InputOutlined
                    lable="Business Name"
                    defaultValue="Business Name"
                    type="text"
                  />
                  <InputOutlined lable="ABN" defaultValue="ABN" type="text" />
                  <InputOutlined
                    lable="Delivery Address"
                    defaultValue="Being Typing to search for a location"
                    type="text"
                  />
                  <div className="d-flex flex-row gap-2 mt-2">
                    <InputOutlined
                      lable="Delivery Address Line1"
                      defaultValue="Delivery Address Line1"
                      type="text"
                    />
                    <InputOutlined
                      lable="Delivery Address Line2"
                      defaultValue="Delivery Address Line1"
                      type="text"
                    />
                  </div>
                  <div className="row justify-content-between mt-2">
                    <div className="col-md-6">
                      <InputOutlined lable="Suburb" defaultValue="Suburb" />
                    </div>
                    <div className=" col-md-6 justify-content-between">
                      <div className="row">
                        <div className="col-md-6 align-self-end">
                          <DropDown lable="state" defaultValue="state" />
                        </div>
                        <div className="col-md-6">
                          <InputOutlined
                            lable="Postcode"
                            defaultValue="Postcode"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 d-flex flex-column">
                    <lable className="formsLable mb-2">
                      Customer Notes (Max of 250 Characters)*
                    </lable>

                    <textarea
                      id="outlined-multiline-static"
                      label="Custimer Notes (Max of 250 Characters)"
                      multiline
                      rows={4}
                      placeholder="Default Value"
                    />
                  </div>
                </div>
              </div>
            ) : activeStep === 1 ? (
              <div className="mb-2 mt-4">
                <div className=" mx-3 mx-sm-4">
                  <div className="d-flex flex-row gap-2">
                    <InputOutlined
                      lable="First Name"
                      defaultValue="First Name"
                    />
                    <InputOutlined lable="Last Name" defaultValue="Last Name" />
                  </div>
                  <div>
                    <InputOutlined
                      lable="Email Address"
                      defaultValue="Email Address"
                      email="email"
                      value="value"
                    />
                  </div>
                </div>
              </div>
            ) : activeStep === 2 ? (
              <div>3</div>
            ) : (
              <div>4</div>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={
                  completedSteps() === totalSteps() - 1
                    ? handleComplete
                    : handleNext
                }
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
};

export default StepperForm;
