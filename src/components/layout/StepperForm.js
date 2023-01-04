import React, { useState, useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Button, StepButton } from "@mui/material";
import useDeviceType from "../../hooks/useDeviceType";
import Loader from "./Loader";
import BtnContained from "./BtnContained";
import Form1 from "../customer/Form1";
import Form2 from "../customer/Form2";
import Form3 from "../customer/Form3";
import Form4 from "../customer/Form4";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StepperForm = ({ steps, completed, setCompleted }) => {
  const { deviceType } = useDeviceType();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [allDone, setAllDone] = useState(false);
  const [data, setData] = useState({ isconsolidatedbiller: true });
  const form1Ref = useRef();
  const form2Ref = useRef();
  const form3Ref = useRef();
  const form4Ref = useRef();
  const [occurs, setOccurs] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => console.log(data), [data]);

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
    console.log({ activeStep });
    console.log({ newActiveStep });

    switch (activeStep) {
      case 0:
        if (form1Ref.current.allVAlid()) {
          setActiveStep(newActiveStep);
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
        }
        break;
      case 1:
        if (form2Ref.current.allVAlid()) {
          setActiveStep(newActiveStep);
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
        }
        break;
      case 2:
        if (form3Ref.current.allVAlid()) {
          setActiveStep(newActiveStep);
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
        }
        break;
      case 3:
        if (form4Ref.current.allVAlid()) {
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep(newActiveStep);
        }
        break;
      default:
        console.log(activeStep);
        break;
    }
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

  const handleAddCustomer = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}customers`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/customers");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchOccursAndPayments();
  }, []);

  const fetchOccursAndPayments = async () => {
    setLoading(true);
    await axios
      .get(`/deliveryoccur`)
      .then((res) => {
        res.data.deliveryOccur.forEach((element) => {
          setOccurs((prev) => [
            ...prev,
            { lable: element.name, value: element._id },
          ]);
        });
      })
      .then(() => fetchPayments())
      .finally(() => setLoading(false))
      .catch(console.error);
  };
  const fetchPayments = async () => {
    await axios
      .get(`/paymentmethod`)
      .then((res) => {
        res.data.paymentMethods.forEach((element) => {
          setPayments((prev) => [
            ...prev,
            { lable: element.name, value: element._id },
          ]);
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    console.log(allStepsCompleted());
    console.log(data.length);
    allStepsCompleted() && Object.keys(data).length >= 13 && setAllDone(true);
  }, [allStepsCompleted, data]);

  useEffect(() => {
    allDone && handleAddCustomer();
  }, [allDone]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-100">
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
      {!allStepsCompleted() && (
        <div className="w-100">
          <div className="formsContainer mx-1 mx-sm-2 mt-sm-4 px-0 px-sm-3 w-100">
            <div className="mb-2 mt-4 mx-3 mx-sm-4">
              {activeStep === 0 ? (
                <Form1 ref={form1Ref} setData={setData} />
              ) : activeStep === 1 ? (
                <Form2 ref={form2Ref} setData={setData} />
              ) : activeStep === 2 ? (
                <Form3 ref={form3Ref} setData={setData} occurs={occurs} />
              ) : (
                activeStep === 3 && (
                  <Form4 ref={form4Ref} setData={setData} payments={payments} />
                )
              )}
            </div>

            <div className="d-flex justify-content-between my-3 mx-4">
              <BtnContained
                disabled={activeStep === 0}
                handleClick={handleBack}
                title="Back"
              />
              <BtnContained
                title="Next"
                handleClick={
                  completedSteps() === totalSteps() - 1
                    ? handleComplete
                    : handleNext
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepperForm;
