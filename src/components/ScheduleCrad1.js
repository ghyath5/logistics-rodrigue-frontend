import React from 'react'
import useDeviceType from "../hooks/useDeviceType";


const ScheduleCrad1 = ({last,icon3,title3,value3}) => {
    const { deviceType } = useDeviceType();

  return (
    <div
    className={`${
      last && deviceType === "tablet"
        ? "col-12 p-2"
        : "p-2 col-12 col-sm-6 col-md-4"
    } `}
  >
    <div className=" text-center ">
      <img src={icon3} ></img>
       <h3 className="m-0">{value3}</h3>
      <h5 className='fs-6 my-2'>{title3}</h5>
    </div>
  </div>   )
}

export default ScheduleCrad1