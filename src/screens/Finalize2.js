import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import "./Finalie2.css";
import { useFormik } from "formik";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router";
import EditModal from "../components/EditModal";

function Finalize2() {
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchRoutes = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("routes");
      const data = await response.data.routes;
      return data;
    },
  });

  const formik = useFormik({
    initialValues: {
      routeName: "",
    },
    onSubmit: (values) => {
      console.log("submitted", values);
    },
  });
  const handleCellClick = (day, week) => {
    const route = fetchRoutes.data.find((route) =>
      route.scheduledDays.some((sDay) => sDay.day === day)
    );

    if (route) {
      const routeName = route.name;
      formik.setFieldValue("routeName", routeName);
    }
  };
  const handleEditClick = (route, day) => {
    const url = `/manageCalls?routeId=${route._id}&day=${day.day}`;
    window.open(url, "_self");
  };

  const generateCalendarTable = () => {
    const numRows = 2;
    const numDaysPerWeek = 7;

    let calendarTable = [];

    if (fetchRoutes.isLoading) {
      return (
        <tr>
          <td colSpan={numDaysPerWeek * numRows}>Loading...</td>
        </tr>
      );
    }

    for (let week = 1; week <= numRows; week++) {
      let weekRow = [];

      for (let day = 1; day <= numDaysPerWeek; day++) {
        const actualDay = (week - 1) * numDaysPerWeek + day;
        const route = fetchRoutes.data.find((route) =>
          route.scheduledDays.some((sDay) => sDay.day === actualDay)
        );
        const routes = fetchRoutes.data.filter((route) =>
          route.scheduledDays.some((sDay) => sDay.day === actualDay)
        );
        // console.log(route)
        weekRow.push(
          <td
            key={`week${week}-day${day}`}
            onClick={() => handleCellClick(actualDay, week)}
            style={{ width: "500px !important", height: "200px" }}
          >
            {routes.map((route) => {
              console.log(route);
              return (
                <div key={route._id}>
                  <span> {route.name}</span>
                </div>
              );
            })}
          </td>
        );
      }
      calendarTable.push(
        <tr key={`week${week}`}>
          <th colSpan={numDaysPerWeek}>{`Week ${week}`}</th>
        </tr>
      );
      calendarTable.push(<tr key={`week${week}-row`}>{weekRow}</tr>);
    }

    return calendarTable;
  };

  const tableHeaders = Array.from({ length: 7 }, (_, index) => (
    <th key={`Day${index + 1}`}>Day {index + 1}</th>
  ));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10rem",
      }}
    >
      <div
        className="container "
        style={{ width: "40rem", display: "flex", justifyContent: "center" }}
      >
        <table className="table table-bordered mt-10  ">
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{generateCalendarTable()}</tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "3rem",
        }}
      >
        {fetchRoutes.isLoading ? (
          <Loader />
        ) : (
          <div className="wrapper">
            <ul
              className="mat_list card scrollable"
              style={{ listStyleType: "none", padding: 0 }}
            >
              <span style={{textAlign:'center'}}>Available Routes</span>
              {fetchRoutes.data.map((route) => (
                <li
                  key={route._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                >
                  <a
                    onClick={() =>
                      handleEditClick(route, route.scheduledDays[0])
                    }
                    style={{
                      textDecoration: "none",
                      cursor:'pointer',
                      color: "#333",
                      fontSize:'13px',
                      fontWeight:'500',
                      textTransform:'capitalize'
                    }}
                  >
                    {route.name} <b>- day {route.scheduledDays[0].day}</b>
                  </a>
                  <button
                    onClick={() => setShowEditModal(true)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {showEditModal && <EditModal handleClosePopup={()=>setShowEditModal(false)} />}
    </div>
  );
}

export default Finalize2;
