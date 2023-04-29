/* eslint-disable default-case */
import React from "react";
import Form1 from "./Form1";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Form4 from "./Form4";
import Form3 from "./Form3";
import Form2 from "./Form2";
import { useEffect } from "react";
import axios from "../../axios";
import Loader from "../layout/Loader";
import BtnContained from "../layout/BtnContained";
import validator from "validator";

const FormAll = ({ isEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [occurs, setOccurs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reqError, setReqError] = useState("");
  const [data, setData] = useState({
    businessname: "",
    abn: "",
    address: "",
    city: "",
    region: "",
    postcode: "",
    notes: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    mobilenumber: "",
    directdialnumber: "",
    deliveryoccur: "",
    deliveryfee: "",
    routeId: "",
    preferredday: "",
    paymentmethod: "",
    isconsolidatedbiller: true,
  });
  const [errors, setErrors] = useState({
    businessname: false,
    abn: false,
    address: false,
    city: false,
    region: false,
    postcode: false,
    notes: false,
    firstname: false,
    lastname: false,
    email: false,
    phonenumber: false,
    mobilenumber: false,
    directdialnumber: false,
    deliveryoccur: false,
    deliveryfee: false,
    routeId: false,
    preferredday: false,
    paymentmethod: false,
    isconsolidatedbiller: false,
  });

  useEffect(() => {
    fetchOccursAndPayments();
  }, []);

  useEffect(() => {
    isEdit && fetchCustomerById(location.state?.id);
  }, [isEdit, location.state?.id]);

  const fetchCustomerById = async (id) => {
    setLoading(true);
    await axios
      .get(`/customers/${id}`)
      .then((res) => {
        setData({
          businessname: res.data.businessname,
          abn: res.data.abn,
          address: res.data.address,
          region: res.data.region,
          city: res.data.city,
          postcode: res.data.postcode,
          notes: res.data?.notes || "",
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          routeId: res.data.routeId,
          phonenumber: res.data?.phonenumber,
          mobilenumber: res.data?.mobilenumber,
          directdialnumber: res.data?.directdialnumber,
          deliveryoccur: res.data?.deliveryoccur,
          deliveryfee: res.data?.deliveryfee,
          preferredday: res.data?.preferredday,
          paymentmethod: res.data?.paymentmethod,
          isconsolidatedbiller: res.data?.organization ? false : true,
          organization: res.data?.organization,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    value !== "" && hasError(name, false);
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const validate = () => {
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case "firstname":
        case "lastname":
        case "businessname":
        case "city":
        case "region":
        case "address":
        case "preferredday":
        case "routeId":
        case "postcode":
        case "abn":
        case "deliveryoccur":
        case "email":
          value === "" ? hasError(key, true) : hasError(key, false);
          break;
        case "phonenumber":
          value === "" || value.length < 8
            ? hasError(key, true)
            : hasError(key, false);
          break;
      }
    }
    let errs = Object.values(errors);

    if (errs.includes(true)) {
      setReqError("Please fill in all required fields");
    } else {
      let d = {};
      for (const [key, value] of Object.entries(data)) {
        value !== "" && (d[key] = value);
      }
      isEdit ? handleUpdateCustomer(d) : handleAddCustomer(d);
    }
  };

  const handleAddCustomer = (d) => {
    setLoading(true);
    axios
      .post(`customers`, d)
      .then(() => {
        setLoading(false);
        navigate("/customers");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        err.response.status === 400 && setReqError(err.response.data.message);
      });
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
      .catch(
        (err) =>
          err.response.status === 400 && setReqError(err.response.data.message)
      );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Form1
        data={data}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Form2
        errors={errors}
        data={data}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Form3
        errors={errors}
        data={data}
        handleChange={handleChange}
        handleBlur={handleBlur}
        occurs={occurs}
      />
      <Form4 data={data} handleChange={handleChange} payments={payments} />

      <div className="mt-2 mb-1 w-100 d-flex justify-content-center">
        <p className="errorText"> {reqError !== "" && reqError}</p>
      </div>
      <div className="mt-2 mb-3 w-100 d-flex justify-content-center">
        <BtnContained
          title={isEdit ? "UPDATE" : "CREATE"}
          handleClick={validate}
        />
      </div>
    </div>
  );
};

export default FormAll;
