import React, { forwardRef, useImperativeHandle, useState } from "react";
// import InputOutlined from "../layout/InputOutlined";
import RadioGroupForm from "../layout/RadioGroupForm";

const Form3 = forwardRef(({ setData, occurs }, ref) => {
  const [step3Data, setStep3Data] = useState({
    deliveryoccur: occurs[0].value,
    // deliveryFee: "0",
  });
  const [step3Eerrors, setStep3Errors] = useState({
    deliveryoccur: false,
    // deliveryFee: false,
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

  const handleBlur = () => {};

  const allVAlid = () => {
    let valid;
    let datas = Object.values(step3Data);
    let errs = Object.values(step3Eerrors);
    errs.includes(true) || datas.includes("")
      ? (valid = false)
      : (valid = true);
    if (valid) {
      setData((prev) => {
        return { ...prev, ...step3Data };
      });
    } else {
      Object.entries(step3Data).forEach(([key, val]) => {
        val === "" &&
          setStep3Errors((prev) => {
            return { ...prev, [key]: true };
          });
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
      {/* <InputOutlined
        lable="Delivery Fees"
        defaultValue="0"
        type="text"
        name="deliveryFee"
        value={step3Data?.deliveryFee}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step3Eerrors?.deliveryFee}
        errorMessage="please add delivery fees"
      /> */}
    </div>
  );
});

export default Form3;
