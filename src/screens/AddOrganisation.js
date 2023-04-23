import axios from "../axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnContained from "../components/layout/BtnContained";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputOutlined from "../components/layout/InputOutlined";
import DDSearch from "../components/layout/DDSearch";
import { useEffect } from "react";

const AddOrganisation = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [headName, setHeadName] = useState("");
  const [data, setData] = useState({ name: "", head: "", customers: [] });
  const [errors, setErrors] = useState({
    name: false,
    head: false,
    customers: false,
  });
  const [allCustomers, setAllCustomers] = useState([]);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    clearErrors();

    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDdChange = (e) => {
    clearErrors();
    setSelectedStudent(e.target.value);
    let scus = allCustomers?.filter((cuss) => cuss.value === e.target.value)[0];
    setData((prev) => {
      return {
        ...prev,
        customers: [
          ...prev.customers,
          { name: scus.label, id: e.target.value },
        ],
      };
    });
  };

  const hasError = (name, bool) => {
    setErrors((prev) => {
      return { ...prev, [name]: bool };
    });
  };
  const clearErrors = () => {
    setErrors({ name: false, head: false, customers: false });
  };

  const handleAddOrganisation = async () => {
    let customersId = [];
    data.customers.map((x) => customersId.push(x.id));
    if (customersId.length < 2) {
      hasError("customers", true);
    } else if (data.head === "") {
      hasError("head", true);
    } else if (data.name === "") {
      hasError("name", true);
    } else {
      let body = {
        name: data.name,
        head: data.head,
        customers: customersId,
      };

      setLoading(true);
      await axios
        .post(`/organization`, body)
        .then((res) => {
          navigate("/organisations");
          setLoading(false);
        })
        .catch(console.error);
    }
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
          Add Organisation
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
                defaultValue="Organisation name"
                type="text"
                name="name"
                value={data?.name}
                handleChange={handleChange}
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
                value={headName}
                handleChange={handleChange}
                error={errors.head}
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
                val={selectedStudent}
                handleChange={handleDdChange}
                error={errors.customers}
                errorMessage="Select at least 2 customers"
              />
            </div>
          </div>

          {data.customers.length > 0 && (
            <div className="mt-3">
              <h5>
                Click on one of the customers below to select it as a head.
              </h5>
              <div className="mt-3">
                {data?.customers?.length > 0 ? (
                  data?.customers?.map((cust, i) => {
                    return (
                      <p
                        key={i}
                        className="pointer"
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          setHeadName(cust.name);
                          handleChange({
                            target: { name: "head", value: cust.id },
                          });
                        }}
                      >
                        {i + 1 + "-    " + cust.name}
                      </p>
                    );
                  })
                ) : (
                  <p>no customers in this organisation</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="my-5 text-center">
          <BtnContained title={"CREATE"} handleClick={handleAddOrganisation} />
        </div>
      </div>
    </Layout>
  );
};

export default AddOrganisation;
