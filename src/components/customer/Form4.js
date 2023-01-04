import React, { forwardRef, useImperativeHandle, useState } from "react";
import RadioGroupForm from "../layout/RadioGroupForm";

const Form4 = forwardRef(({ setData, payments }, ref) => {
  const [step4Data, setStep4Data] = useState({
    paymentmethod: payments[0].value,
    // ispricingdefault: "false",
  });
  const [step4Eerrors, setStep4Errors] = useState({
    paymentmethod: false,
    // ispricingdefault: false,
  });

  useImperativeHandle(ref, () => ({
    allVAlid() {
      return allVAlid();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep4Data((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = () => {
    // const { name, value } = e.target;
    // // validate(name, value);
  };

  const allVAlid = () => {
    let valid;
    let datas = Object.values(step4Data);
    let errs = Object.values(step4Eerrors);
    errs.includes(true) || datas.includes("")
      ? (valid = false)
      : (valid = true);
    if (valid) {
      setData((prev) => {
        return { ...prev, ...step4Data };
      });
    } else {
      Object.entries(step4Data).forEach(([key, val]) => {
        val === "" &&
          setStep4Errors((prev) => {
            return { ...prev, [key]: true };
          });
      });
    }
    return valid;
  };

  return (
    <div>
      <RadioGroupForm
        name="paymentmethod"
        lable="Default Payment Method: "
        options={payments}
        val={step4Data?.paymentmethod}
        handleChange={handleChange}
      />
      {/* <RadioGroupForm
        name="ispricingdefault"
        lable="Should any other special pricing be used for any items ordered by this customer?"
        options={[
          { lable: "No, use default pricing", value: "false" },
          { lable: "Yes, use custom pricing", value: "true" },
        ]}
        val={step4Data?.ispricingdefault}
        handleChange={handleChange}
      /> */}
    </div>
  );
});

export default Form4;
