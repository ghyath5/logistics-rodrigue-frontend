/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepButton } from "@mui/material";
import useDeviceType from "../../hooks/useDeviceType";
import Loader from "./Loader";
import BtnContained from "./BtnContained";
import Form1 from "../customer/Form1";
import Form2 from "../customer/Form2";
import Form3 from "../customer/Form3";
import Form4 from "../customer/Form4";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";

const StepperForm = ({ steps, completed, setCompleted, isEdit }) => {
  const { deviceType } = useDeviceType();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [allDone, setAllDone] = useState(false);
  const [data, setData] = useState({});
  const form1Ref = useRef();
  const form2Ref = useRef();
  const form3Ref = useRef();
  const form4Ref = useRef();
  const [occurs, setOccurs] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchOccursAndPayments();
  }, []);

  useEffect(() => {
    allDone && (isEdit ? handleUpdateCustomer() : handleAddCustomer());
  }, [allDone]);

  useEffect(() => {
    isEdit && fetchCustomerById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchCustomerById = async (id) => {
    setLoading(true);
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        console.log(res.data);
        setData({
          businessname: res.data.businessname,
          abn: res.data.abn,
          address: res.data.address[0],
          suburb: res.data.suburb,
          state: res.data.state,
          postcode: res.data.postcode,
          notes: res.data?.notes || "",
          customername: res.data.customername,
          email: res.data.email,
          routeId: res.data.routeId,
          phonenumber: res.data?.phonenumber || "",
          mobilenumber: res.data?.mobilenumber || "",
          directdialnumber: res.data?.directdialnumber || "",
          deliveryoccur: res.data?.deliveryoccur,
          deliveryfee: res.data?.deliveryfee,
          paymentmethod: res.data?.paymentmethod,
          isconsolidatedbiller: res.data?.organization ? false : true,
          organization: res.data?.organization || "",
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

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
    // console.log("isLastStep", isLastStep());
    const newCompleted = completed;
    const newActiveStep =
      (isLastStep() && !allStepsCompleted()) || activeStep + 1 in completed
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : isLastStep() && allStepsCompleted()
        ? setAllDone(true)
        : activeStep + 1;

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

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

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
      .post(`customers`, data)
      .then(() => {
        setLoading(false);
        navigate("/customers");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleUpdateCustomer = () => {
    setLoading(true);
    axios
      .put(`customers/${location.state?.id}`, data)
      .then((res) => {
        setLoading(false);
        navigate("/customers");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  };

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
                <StepButton
                  onClick={handleStep(index)}
                  className={`headerss-${localStorage.getItem("monjay-theme")}`}
                >
                  <span
                    className={`headerss-${localStorage.getItem(
                      "monjay-theme"
                    )}`}
                  >
                    {label}
                  </span>
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
                <Form1
                  ref={form1Ref}
                  setData={setData}
                  data={data}
                  isEdit={isEdit}
                />
              ) : activeStep === 1 ? (
                <Form2
                  ref={form2Ref}
                  setData={setData}
                  data={data}
                  isEdit={isEdit}
                />
              ) : activeStep === 2 ? (
                <Form3
                  ref={form3Ref}
                  setData={setData}
                  occurs={occurs.reverse()}
                  data={data}
                  isEdit={isEdit}
                />
              ) : (
                activeStep === 3 && (
                  <Form4
                    ref={form4Ref}
                    setData={setData}
                    payments={payments}
                    setLoading={setLoading}
                    data={data}
                    isEdit={isEdit}
                  />
                )
              )}
            </div>

            <div className="d-flex justify-content-end my-3 mx-4">
              {/* <BtnContained
                disabled={activeStep === 0}
                handleClick={handleBack}
                title="Back"
              /> */}
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
