import React from 'react'
// import useDeviceType from "../hooks/useDeviceType";


const ScheduleCrad1 = ({last,icon3,title3,value3,km}) => {
    // const { deviceType } = useDeviceType();

  return (
    <div className='scheduleCard'
    // className={`${
    //   last && deviceType === "tablet"
    //     ? "col-12 p-2"
    //     : "p-2 col-12 col-sm-6 col-md-4"
    // } `}
  >
    <div className=" text-center my-2  ">
      <img src={icon3} className="mb-3" alt='icon' />
       <h4 className="m-0 deliveriesValue">{value3}</h4>
      <h5 className='fs-7 my-2 deliveriesTitle'>{title3}</h5>
    </div>
  </div>   )
}

export default ScheduleCrad1