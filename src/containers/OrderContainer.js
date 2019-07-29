import React from 'react'
import OrderCard from '../components/OrderCard'

const OrderContainer = ({orders}) => {
  console.log(orders)
  return (
    <div>
      {orders.map(order => <OrderCard order={order} key={order.id}/>)}
    </div>
  )
}

export default OrderContainer