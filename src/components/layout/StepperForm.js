import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Box, Button, StepButton, Typography } from "@mui/material";
import InputOutlined from "./InputOutlined";
import DropDown from "../DropDown";
import useDeviceType from "../../hooks/useDeviceType";
import { useEffect } from "react";
import PhoneNumberInput from "./PhoneNumberInput";
import RadioGroupForm from "./RadioGroupForm";

const StepperForm = ({ steps, completed, setCompleted }) => {
  const { deviceType } = useDeviceType();
  const [activeStep, setActiveStep] = useState(0);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log(deviceType);
  }, [deviceType]);

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
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {deviceType !== "mobile" && (
        <Stepper
          nonLinear
          activeStep={activeStep}
          className="mx-1 mx-sm-5 mt-3"
        >
          {steps.map((label, index) => {
            return (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      )}
      <div className="w-100">
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
          <div className="formsContainer mx-1 mx-sm-2 mt-sm-4 px-0 px-sm-3 w-100">
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
                  <div className="d-sm-flex gap-2 mt-2">
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
                  <div className="addressColl d-sm-flex flex-wrap gap-2 align-items-center justify-content-between mt-2">
                    <InputOutlined lable="Suburb" defaultValue="Suburb" />
                    <DropDown lable="state" defaultValue="state" />
                    <InputOutlined lable="Postcode" defaultValue="Postcode" />
                  </div>
                  <div className="mt-3 d-flex flex-column">
                    <label className="formsLable mb-2">
                      Customer Notes (Max of 250 Characters)*
                    </label>

                    <textarea
                      id="outlined-multiline-static"
                      label="Custimer Notes (Max of 250 Characters)"
                      // multiline
                      rows={4}
                      placeholder="Default Value"
                    />
                  </div>
                </div>
              </div>
            ) : activeStep === 1 ? (
              <div className="mb-2 mt-4">
                <div className="mx-3 mx-sm-4">
                  <div className="d-sm-flex flex-row gap-2">
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
                  <div className="mt-3 d-md-flex flex-wrap gap-3">
                    <PhoneNumberInput
                      value={phone}
                      setValue={setPhone}
                      lable="Phone"
                    />
                    <PhoneNumberInput
                      value={phone}
                      setValue={setPhone}
                      lable="Mobile"
                    />
                    <PhoneNumberInput
                      value={phone}
                      setValue={setPhone}
                      lable="Direct Dial Number"
                    />
                  </div>
                </div>
              </div>
            ) : activeStep === 2 ? (
              <RadioGroupForm
                lable="How often should deliveries occur?"
                options={[
                  { lable: "No Reoccuring Orders", value: "No" },
                  { lable: "Once per Week", value: "once" },
                  { lable: "Once per Fortnight", value: "night" },
                ]}
              />
            ) : (
              <>
                <RadioGroupForm
                  lable="Default Payment Method: "
                  options={[
                    { lable: "Cash on Delivery", value: "cash" },
                    { lable: "Account", value: "account" },
                    { lable: "In / Out", value: "inout" },
                  ]}
                />
                <RadioGroupForm
                  lable="Should any other special pricing be used for any items ordered by this customer?"
                  options={[
                    { lable: "No, use default pricing", value: "no" },
                    { lable: "Yes, use custom pricing", value: "yes" },
                  ]}
                />
              </>
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
