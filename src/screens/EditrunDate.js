import axios from "../axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment/moment";
import BtnContained from "../components/layout/BtnContained";

const EditrunDate = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [oldDate, setOldDate] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRunById(location.state?.id);
  }, [location.state?.id]);

  const fetchRunById = async (id) => {
    await axios
      .get(`/runs/${id}`)
      .then((res) => {
        setOldDate(res.data.date.split("T")[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // function disableMondays(date) {
  //   return date["$d"].toString().split(" ")[0] === "Mon";
  // }

  const handleChangeDate = async (e) => {
    setDate(moment(e.target.value).add(0, "days").format("L"));
  };

  const handleUpdateRunDate = async () => {
    setLoading(true);
    if (date !== "") {
      await axios
        .put(`/runs/${location.state?.id}`, {
          date: date,
        })
        .then((res) => {
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
      <div className="formsContainer px-4  ">
        <div className="text-center">
          <h4
            className={`headerss-${localStorage.getItem(
              "monjay-theme"
            )} my-4 mx-2`}
          >
            Edit Run Date
          </h4>
        </div>
        <hr className={`line mx-5`}></hr>
        <div>
          <div>
            Old date: <p>{moment(oldDate).format("DD/MM/YYYY")}</p>
          </div>
          <DatePickerr
            inputFormat="DD-MM-YYYY"
            views={["year", "month", "day"]}
            lable="New Date:"
            id="orderDate"
            name="orderDate"
            minDate={moment(new Date()).format("L")}
            value={date}
            handleChange={handleChangeDate}
            // shouldDisableDate={disableMondays}
          />
        </div>
        <div className="my-5 text-center">
          <BtnContained
            title="UPDATE RUN DATE"
            handleClick={handleUpdateRunDate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditrunDate;
