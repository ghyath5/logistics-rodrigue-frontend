import React, { forwardRef, useImperativeHandle, useState } from "react";
import RadioGroupForm from "../layout/RadioGroupForm";
import InputOutlined from "../layout/InputOutlined";

const Form3 = forwardRef(({ setData, occurs }, ref) => {
  const [step3Data, setStep3Data] = useState({
    deliveryoccur: occurs[0].value,
    deliveryfee: "",
  });
  const [step3Eerrors, setStep3Errors] = useState({
    deliveryoccur: false,
    deliveryfee: false,
  });

  useImperativeHandle(ref, () => ({
    allVAlid() {
      return allVAlid();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep3Data((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    value < 0 ? hasError(name, true) : hasError(name, false);
  };

  const hasError = (name, bool) => {
    setStep3Errors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const allVAlid = () => {
    let valid;
    let errs = Object.values(step3Eerrors);

    errs.includes(true) ? (valid = false) : (valid = true);

    if (valid) {
      step3Data.deliveryfee === ""
        ? setData((prev) => {
            return { ...prev, ...step3Data, deliveryfee: "0" };
          })
        : setData((prev) => {
            return { ...prev, ...step3Data };
          });
    }
    return valid;
  };

  return (
    <div>
      <RadioGroupForm
        name="deliveryoccur"
        lable="How often should deliveries occur?"
        options={occurs}
        val={step3Data?.deliveryoccur}
        handleChange={handleChange}
      />
      <InputOutlined
        lable="Delivery Fees $"
        defaultValue="0"
        type="number"
        name="deliveryfee"
        classes="w-50"
        value={step3Data?.deliveryfee}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step3Eerrors?.deliveryfee}
        errorMessage="should be bigger than 0"
      />
    </div>
  );
});

export default Form3;
