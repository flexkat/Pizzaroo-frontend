import React from 'react'
import OrderCard from '../components/OrderCard'

const OrderContainer = ({orders, setSelected, redirectToOrderEdit}) => {
  // console.log(orders)
  return (
    <div>
      <div>Previous orders</div>
      <div className="order-container container">
        {orders.map(order => <OrderCard order={order} key={order.id} 
        setSelected={setSelected} 
        redirectToOrderEdit={redirectToOrderEdit}
        />)}
      </div>
    </div>
  )
}

export default OrderContainer