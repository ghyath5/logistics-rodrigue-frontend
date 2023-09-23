import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import "./Finalie2.css";
import EditModal from "../components/EditModal";
import { useFormik } from "formik";
function Finalize2() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const events = [
    { day: 1, week: 1, event: "Event 1" },
    { day: 2, week: 1, event: "Event 2" },
    { day: 3, week: 1, event: "Event 3" },
    { day: 4, week: 1, event: "Event 4" },
    { day: 5, week: 1, event: "Event 5" },
    { day: 6, week: 1, event: "Event 6" },
    { day: 7, week: 1, event: "Event 7" },
    { day: 8, week: 2, event: "Event 8" },
    { day: 9, week: 2, event: "Event 9" },
  ];


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
      console.log('submitted',values);
    },
  });
  const handleCellClick = (day, week) => {
    const event = events.find((e) => e.day === day && e.week === week);
    setSelectedEvent(event);
    setShowModal(true);
    
    // Find the route for the clicked day
    const route = fetchRoutes.data.find((route) =>
      route.scheduledDays.some((sDay) => sDay.day === day)
    );
    
    // Check if a route is found and update the routeName accordingly
    if (route) {
      // Construct the routeName based on the route's name and the clicked day
      const routeName = route.name;
      
      // Set the routeName in Formik
      formik.setFieldValue('routeName', routeName);
    }
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
  
        const event = events.find((e) => e.day === actualDay);
        const route = fetchRoutes.data.find((route) =>
          route.scheduledDays.some((sDay) => sDay.day === actualDay)
        );
  
        weekRow.push(
          <td
            key={`week${week}-day${day}`}
            onClick={() => handleCellClick(actualDay, week)}
            style={{ width: '500px !important', height: '200px' }}
          >
            {route && <div>{route.name}</div>}
            
          </td>
        );
      }
      calendarTable.push(
        <tr key={`week${week}`}>
          <th colSpan={numDaysPerWeek}>
            {`Week ${week}`}
          </th>
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
      className="container ml-10"
      style={{ width: "800px", display: "flex", justifyContent: "center" }}
    >
      <table className="table table-bordered mt-10  ">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{generateCalendarTable()}</tbody>
      </table>   
   {showModal && (
    <EditModal handleClosePopup={()=>setShowModal(false)} value={formik.values.routeName} handleClick={()=>console.log('clicked')} handleChange={formik.handleChange} handleBlur={formik.handleBlur} id={'routeName'} handleEdit={()=>console.log('edited')} />
   )}
    </div>
  );
}

export default Finalize2;
