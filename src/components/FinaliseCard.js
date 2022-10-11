import React from 'react'
import useDeviceType from "../hooks/useDeviceType";

const FinaliseCard = ({last,title,value,title1}) => {
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
       <h4 className="m-0 finaliseTitle">{title}</h4>
      <h5 className='fs-6 finaliseTitle1'>{title1} {value}</h5>
    </div>
  </div>  )
}

export default FinaliseCard