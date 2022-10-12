import React from 'react'
import useDeviceType from "../hooks/useDeviceType";


const ScheduleCrad = ({last,value1,title1,title2,icon}) => {
    const { deviceType } = useDeviceType();

  return (
    <div
      className={`${
        last && deviceType === "tablet"
          ? "col-12 p-2"
          : "p-2 col-12 col-sm-6 col-md-4"
      } `}
    >
      <div className="statsCard text-center py-5">
        <img src={icon} ></img>
         <h3 className="m-0">{value1} {title1}</h3>
        <h5 className='fs-6'>{title2}</h5>
      </div>
    </div>  )
}

export default ScheduleCrad