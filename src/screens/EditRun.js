import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BtnContained from "../components/layout/BtnContained";
import Loader from "../components/layout/Loader";
import TextAreaOutlined from "../components/layout/TextAreaOutlined";
import DDSearch from "../components/layout/DDSearch";
import { runsStatuses } from "../data/configs";
import Accordionn from "../components/layout/Accordionn";

const EditRun = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [oldData, setOldData] = useState({
    driver: "",
    vehicle: "",
    status: "",
    note: "",
  });
  const [data, setData] = useState({
    driver: "",
    vehicle: "",
    status: "",
    note: "",
  });
  const [expanded, setExpanded] = useState(null);
  const [orders, setAllOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchRunById(location.state?.id);
  }, [location.state?.id]);

  const fetchRunById = async (id) => {
    setLoading(true);
    await axios
      .get(`/runs/${id}`)
      .then((res) => {
        setData({
          driver: res.data.driver._id,
          vehicle: res.data.vehicle._id,
          status: runsStatuses[res.data.status].value,
          note: res.data.note ? res.data.note : "Note",
        });
        setOldData({
          driver: res.data.driver._id,
          vehicle: res.data.vehicle._id,
          status: runsStatuses[res.data.status].value,
          note: res.data.note ? res.data.note : "Note",
        });
        setAllOrders(res.data.orders ? res.data.orders : []);
      })
      .then(fetchVehicles)
      .then(fetchDrivers)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchDrivers = async () => {
    await axios
      .get("/drivers")
      .then((res) => {
        res.data.drivers.forEach((dr) => {
          setDrivers((prev) => [...prev, { label: dr.name, value: dr._id }]);
        });
      })
      .catch(console.error);
  };

  const fetchVehicles = async () => {
    await axios
      .get(`/vehicles`)
      .then((res) => {
        res.data.vehicles.forEach((veh) => {
          setVehicles((prev) => [
            ...prev,
            { label: veh.plate, value: veh._id },
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
    // const { name, value } = e.target;
  };

  const allVAlid = () => {
    let valid = true;

    // if (data.status !== oldData.status || data.note !== oldData.note) {
    //   valid = true;
    // } else {
    //   valid = false;
    // }
    return valid;
  };

  const handleUpdateRun = async () => {
    setLoading(true);
    if (allVAlid()) {
      await axios
        .put(`/runs/${location.state?.id}`, {
          driver: data.driver,
          vehicle: data.vehicle,
          status: data.status,
          note: data.note,
        })
        .then((res) => {
          // console.log(res.data);
          navigate("/runs");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate("/runs");
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
          onClick={() => navigate("/runs")}
        />
        <h4
          className={`headerss-${localStorage.getItem(
            "monjay-theme"
          )} my-3 mx-2`}
        >
          Back to Runs
        </h4>
      </div>
      <div className="formsContainer">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Edit Run
          </h4>
        </div>
        <hr className={`line mx-5`}></hr>
        <div className="mx-4">
          <DDSearch
            name="driver"
            lable="Driver"
            options={drivers}
            isDisabled={false}
            isMulti={false}
            // defaultValue={drivers[0]}
            val={data?.driver}
            handleChange={handleChange}
            handleBlur={handleBlur}
            // error={errors?.status}
            // errorMessage="you must select the status"
          />
          <DDSearch
            name="vehicle"
            lable="Vehicle"
            options={vehicles}
            isDisabled={false}
            isMulti={false}
            // defaultValue={vehicles[0]}
            val={data?.vehicle}
            handleChange={handleChange}
            handleBlur={handleBlur}
            // error={errors?.status}
            // errorMessage="you must select the status"
          />
          <DDSearch
            name="status"
            lable="Status"
            options={runsStatuses}
            isDisabled={false}
            isMulti={false}
            val={data?.status}
            handleChange={handleChange}
            handleBlur={handleBlur}
            // error={errors?.status}
            // errorMessage="you must select the status"
          />

          <TextAreaOutlined
            id="notes"
            lable="Runs Notes"
            defaultValue="Notes"
            type="text"
            name="note"
            value={data?.note}
            handleChange={handleChange}
            handleBlur={handleBlur}
            // error={step1Eerrors?.notes}
            // errorMessage="should be at least 10 letters"
          />
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title="UPDATE RUN"
            handleClick={() => handleUpdateRun()}
          />
        </div>
        {orders.length > 0 && (
          <div className="myAccordion mx-4">
            <p
              className={`headerss-${localStorage.getItem(
                "monjay-theme"
              )} fw-700`}
            >
              Orders List:
            </p>
            {orders.map((item, i) => {
              return (
                <Accordionn
                  item={item}
                  key={i}
                  id={i}
                  allOrders={orders}
                  setAllOrders={setAllOrders}
                  setExpanded={setExpanded}
                  expanded={expanded}
                />
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditRun;
