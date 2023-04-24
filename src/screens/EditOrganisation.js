import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import validator from "validator";
import DeleteIcon from "@mui/icons-material/Delete";
import DDSearch from "../components/layout/DDSearch";

const EditOrganisation = () => {
  const [isLoading, setLoading] = useState(false);
  const [head, setHead] = useState("");
  const [data, setData] = useState({ name: "", customers: [] });
  const [errors, setErrors] = useState({
    name: false,
  });
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchOrgById(location.state?.id);
  }, [location.state?.id]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    await axios
      .post(`/customers/getnonorgacustomers?page=1&limit=10000`)
      .then((res) => {
        let cuses = [];
        res.data.map((cus) => {
          cuses.push({ label: cus.businessname, value: cus._id });
        });
        setAllCustomers(cuses);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchOrgById = async (id) => {
    setLoading(true);
    await axios
      .get(`/organization/${id}`)
      .then((res) => {
        setHead(res.data?.head._id || "");
        setData({
          name: res.data.name,
          customers: res.data.customers,
        });
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleDdChange = (e) => {
    // clearErrors();
    setSelectedCustomer(e.target.value);
    let scus = allCustomers?.filter((cuss) => cuss.value === e.target.value)[0];
    setData((prev) => {
      return {
        ...prev,
        customers: [
          ...prev.customers,
          { businessname: scus.label, _id: e.target.value },
        ],
      };
    });
  };

  const handleRemoveCustomer = (id) => {
    if (id === head) {
      setHead("");
    }
    setData((prev) => {
      return { ...prev, customers: prev.customers.filter((c) => c._id !== id) };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        value &&
          (value.length < 3 ? hasError(name, true) : hasError(name, false));
        break;
      case "customers":
        value &&
          (value.length > 1 ? hasError(name, false) : hasError(name, true));
        break;
      default:
        console.log("");
    }
  };

  const handleUpdateOrganisation = async () => {
    let cus = [];
    data.customers.map((c) => cus.push(c._id));
    let body = {
      name: data.name,
      head: head,
      customers: cus,
    };
    setLoading(true);
    await axios
      .put(`/organization/${location.state?.id}`, body)
      .then(() => {
        navigate("/organisations");
        setLoading(false);
      })
      .catch(console.error);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex align-items-center ">
        <ArrowBackIcon
          className="ArrowBackIcon"
          fontSize="medium"
          onClick={() => navigate("/organisations")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          Edit Organisation
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Organisation Details
          </h4>
        </div>
        <hr className="line mx-5"></hr>
        <div className="mx-4">
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="org"
                lable="Organisation: "
                defaultValue=""
                type="text"
                name="name"
                value={data?.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.name}
                errorMessage="Enter organisation name"
              />
            </div>
            <div className="col-sm-12 col-md-6 ">
              <InputOutlined
                id="head"
                lable="Head: "
                defaultValue="select a head for this organisation"
                type="text"
                name="head"
                value={
                  data.customers?.filter((c) => c._id === head)[0]
                    ?.businessname || ""
                }
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={head === ""}
                errorMessage="select one head for this organisation"
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
              <DDSearch
                name="selecteAStudent"
                lable="Select your customers:"
                options={allCustomers}
                isDisabled={false}
                isMulti={false}
                val={selectedCustomer}
                handleChange={handleDdChange}
                error={errors.customers}
                errorMessage="Select at least 2 customers"
              />
            </div>
          </div>
          <div className="mt-3">
            <h5>Click on one of the customers below to select it as a head.</h5>
            <div className="mt-3">
              {data?.customers?.length > 0 ? (
                data?.customers?.map((cust, i) => {
                  return (
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <span
                        key={i}
                        className="pointer"
                        style={{ userSelect: "none" }}
                        onClick={() => setHead(cust._id)}
                      >
                        {i + 1 + "-    " + cust.businessname}
                      </span>
                      <div onClick={() => handleRemoveCustomer(cust._id)}>
                        <DeleteIcon className="deleteIcon" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>no customers in this organisation</p>
              )}
            </div>
          </div>
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title={"UPDATE"}
            handleClick={handleUpdateOrganisation}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditOrganisation;
