import { Checkbox, FormControlLabel } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
// import { useEffect } from "react";
import RadioGroupForm from "../layout/RadioGroupForm";
// import DDSearch from "../layout/DDSearch";
// import axios from "../../axios";
// import InputOutlined from "../layout/InputOutlined";
// import Modal from "../layout/Modal";

const Form4 = forwardRef(({ setData, payments, isEdit, data }, ref) => {
  const [step4Data, setStep4Data] = useState({
    paymentmethod: isEdit ? data.paymentmethod : payments[0].value,
    isconsolidatedbiller: isEdit ? data.isconsolidatedbiller : true,
    // organization: isEdit ? data.organisation : "",
  });
  const [step4Eerrors, setStep4Errors] = useState({
    paymentmethod: false,
    isconsolidatedbiller: false,
    // organization: false,
  });
  // const [organisations, setOrganisations] = useState([]);
  // const [addedOrg, setAddedOrg] = useState("");

  // useEffect(() => {
  //   fetchOrganisations();
  // }, []);

  // const fetchOrganisations = async () => {
  //   await axios
  //     .get("organization")
  //     .then((res) => {
  //       res.data.organizations.forEach((org) => {
  //         setOrganisations((prev) => [
  //           ...prev,
  //           { label: org.name, value: org._id },
  //         ]);
  //       });
  //     })
  //     .catch(console.error);
  // };

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

  const allVAlid = () => {
    let valid;
    let datas = Object.values(step4Data);
    let errs = Object.values(step4Eerrors);
    errs.includes(true) || datas.includes("")
      ? (valid = false)
      : (valid = true);
    if (valid) {
      console.log("valid");
      //add only payment if isconsolidatedbiller else add payment and organisation
      setData((prev) => {
        return { ...prev, ...step4Data };
      });
    } else {
      console.log("not valid");

      Object.entries(step4Data).forEach(([key, val]) => {
        val === "" &&
          setStep4Errors((prev) => {
            return { ...prev, [key]: true };
          });
      });
    }
    return valid;
  };

  const handleToggleConsolidate = () => {
    setStep4Data((prev) => {
      return { ...prev, isconsolidatedbiller: !prev.isconsolidatedbiller };
    });
  };

  // const handleAddOrganisation = async () => {
  //   await axios
  //     .post(`organization`, { name: addedOrg })
  //     .then((res) => {
  //       setOrganisations((prev) => [
  //         { label: res.data.name, value: res.data._id },
  //         ...prev,
  //       ]);
  //     })
  //     .catch(console.error);
  // };

  return (
    <div className={`headerss-${localStorage.getItem("monjay-theme")}`}>
      <RadioGroupForm
        name="paymentmethod"
        lable="Default Payment Method: "
        options={payments}
        val={step4Data?.paymentmethod}
        handleChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox defaultChecked onChange={() => handleToggleConsolidate()} />
        }
        label="Is Consolidate Biller"
        labelPlacement="start"
        className="m-0"
      />
      {/* {!step4Data.isconsolidatedbiller &&
        (organisations.length > 0 ? (
          <>
            <DDSearch
              name="organisation"
              lable="Organisations"
              options={organisations}
              isDisabled={false}
              isMulti={false}
              val={step4Data?.organization}
              handleChange={handleChange}
              // handleBlur={handleBlur}
              error={step4Eerrors?.organization}
              errorMessage="please pick an organisation"
            />
            <div className="mt-3">
              <Modal
                btnTitle="Add Organisation"
                title="Add Organisation"
                handleAddOrganisation={handleAddOrganisation}
              >
                <InputOutlined
                  lable=""
                  defaultValue="Organisation"
                  type="text"
                  name="Organisation"
                  value={addedOrg}
                  handleChange={(e) => setAddedOrg(e.target.value)}
                />
              </Modal>
            </div>
          </>
        ) : (
          <Modal
            btnTitle="Add Organisation"
            title="Add Organisation"
            handleAddOrganisation={handleAddOrganisation}
          >
            <InputOutlined
              lable=""
              defaultValue="Organisation"
              type="text"
              name="Organisation"
              value={addedOrg}
              handleChange={(e) => setAddedOrg(e.target.value)}
            />
          </Modal>
        ))} */}
    </div>
  );
});

export default Form4;
