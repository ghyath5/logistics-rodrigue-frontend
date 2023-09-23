import React, { useState } from 'react';
import './Finalie2.css'
import DeleteModal from '../components/DeleteModal';
function Finalize2() {
  // Sample data for events
  const events = [
    { day: 1, week: 1, event: 'Event 1' },
    { day: 2, week: 1, event: 'Event 2' },
    { day: 3, week: 1, event: 'Event 3' },
    { day: 4, week: 1, event: 'Event 4' },
    { day: 5, week: 1, event: 'Event 5' },
    { day: 6, week: 1, event: 'Event 6' },
    { day: 7, week: 1, event: 'Event 7' },
    { day: 1, week: 2, event: 'Event 8' },
    { day: 2, week: 2, event: 'Event 9' },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCellClick = (day, week) => {
    const event = events.find((e) => e.day === day && e.week === week);
    setSelectedEvent(event);
    setShowModal(true);
  };

  const generateCalendarTable = () => {
    const numRows = 2; 
    const numDaysPerWeek = 7;

    let calendarTable = [];

    for (let week = 1; week <= numRows; week++) {
      let weekRow = [];

      for (let day = 1; day <= numDaysPerWeek; day++) {
        const event = events.find((e) => e.day === day && e.week === week);

        weekRow.push(
          <td 
            key={`week${week}-day${day}`}
            onClick={() => handleCellClick(day, week)}
            style={{width:'500px !important',height:'200px'}}
          >
            {`Day ${day} Week ${week}`}
          </td>
        );
      }
     
      calendarTable.push(<><span>{`week${week}`}</span><tr key={`week${week}`}>{weekRow}</tr></>);
    }

    return calendarTable;
  };

  return (
    <div className="container ml-10" style={{width:'800px',display:'flex',justifyContent:'center'}}>
      <table className="table table-bordered mt-10  ">
        <thead>
          <tr>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
          </tr>
        </thead>
        <tbody>{generateCalendarTable()}</tbody>
      </table>

      {/* Modal to display event details */}
    {
        showModal && (
            <DeleteModal handleClosePopup={()=>setShowModal(false)} title={` Event Details: Day ${selectedEvent?.day} Week ${selectedEvent?.week}`}/>
        )
    }
    </div>
  );
}

export default Finalize2;
