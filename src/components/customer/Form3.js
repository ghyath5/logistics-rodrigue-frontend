import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import RadioGroupForm from "../layout/RadioGroupForm";
import InputOutlined from "../layout/InputOutlined";
import DDSearch from "../layout/DDSearch";
import axios from "../../axios";

const days = [
  // { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "sat" },
  { label: "Sunday", value: "sun" },
];

const Form3 = forwardRef(({ setData, occurs, data, isEdit }, ref) => {
  const [step3Data, setStep3Data] = useState({
    deliveryoccur: isEdit ? data.deliveryoccur : occurs[0].value,
    deliveryfee: isEdit ? data.deliveryfee : "",
    routeId: isEdit ? data.routeId : "",
    preferredday: isEdit ? data.preferredday : "",
  });
  const [step3Eerrors, setStep3Errors] = useState({
    deliveryoccur: false,
    deliveryfee: false,
    routeId: false,
    preferredday: false,
  });
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    await axios
      .get("routes")
      .then((res) => {
        res.data.routes.forEach((rt) => {
          setRoutes((prev) => [...prev, { label: rt.name, value: rt._id }]);
        });
      })
      .catch(console.error);
  };

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
    let valid = false;
    let errs = Object.values(step3Eerrors);

    if (step3Data.routeId === "") {
      hasError("routeId", true);
      valid = false;
    } else if (errs.includes(true)) {
      valid = false;
    } else {
      valid = true;
    }

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
    <div className={`headerss-${localStorage.getItem("monjay-theme")}`}>
      <RadioGroupForm
        name="deliveryoccur"
        lable="How often should deliveries occur?"
        options={occurs}
        val={step3Data?.deliveryoccur}
        handleChange={handleChange}
      />
      <div className="d-flex gap-2">
        <InputOutlined
          lable="Delivery Fees $"
          defaultValue="0"
          type="number"
          name="deliveryfee"
          classes=""
          value={step3Data?.deliveryfee}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={step3Eerrors?.deliveryfee}
          errorMessage="should be bigger than 0"
        />
        <DDSearch
          name="preferredday"
          lable="Preferred day"
          options={days}
          isDisabled={false}
          isMulti={false}
          val={step3Data?.preferredday}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={step3Eerrors?.preferredday}
          errorMessage="please select a preferred day"
        />
      </div>
      <DDSearch
        name="routeId"
        lable="Region"
        options={routes}
        isDisabled={false}
        isMulti={false}
        val={step3Data?.routeId}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={step3Eerrors?.routeId}
        errorMessage="please pick a region"
      />
    </div>
  );
});

export default Form3;
