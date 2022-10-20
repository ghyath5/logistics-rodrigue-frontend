import React from 'react'
import Orders from '../data/orders'

const OrderCard = () => {
  return (
    <>
    { Orders && Orders.map((order,index)=>{
        return(

    <div key={index} className='d-flex row justify-content-between orderConainer flex-wrap align-items-center my-4'>
        <div className='col-3'>
            <h5 className='order-title '>{order.title}</h5>
        </div>
        <div className='col-2 primary-line'>
            <div >
                <span className='order-title'>Primary phone</span>
            </div>
            <div>
                <span className='order-title'>{order.primaryPhone}</span>
            </div>
        </div>
        <div className='col-4'>
            <div>
                <span className='order-title'>Adress</span>
            </div>
            <div>
                <span className='order-title'> {order.address}</span>
            </div>
        </div>
        <div className='col'>
            <h6 className='order-title  '>Comfirmed For Delivery</h6>
        </div>
    </div>
        )
    })}
    </>
  )
}

export default OrderCard