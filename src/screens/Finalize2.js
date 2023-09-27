import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import "./Finalie2.css";
import { useFormik } from "formik";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Loader from "../components/layout/Loader";

function Finalize2() {
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
      const route = fetchRoutes.data.find((route) =>
      route.scheduledDays.some((sDay) => sDay.day === day)
    );
    
    if (route) {
      const routeName = route.name;
        formik.setFieldValue('routeName', routeName);
    }
  };
  

  const handleDragEnd = (result) => {
    // Handle the drag end event here
    if (!result.destination) {
      return; // The item was dropped outside of a valid drop target
    }
  
    // Update your data based on the drag-and-drop result
    // You may need to reorder your `weekRow` array
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
        // data should be dnd here 
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
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'10rem'}}>
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
    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
    {
  fetchRoutes.isLoading ? (
    <Loader />
  ) : (
    fetchRoutes.data.map((route) => (
      <span key={route._id}>{route.name}</span>
    ))
  )
}

    </div>
    </div>
  );
}

export default Finalize2;