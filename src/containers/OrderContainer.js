import React, {useState} from 'react'
import OrderCard from '../components/OrderCard'

const OrderContainer = ({orders, setSelected, redirectToOrderEdit}) => {
  
  const [sortByPrice, setSortByPrice] = useState(false)
  // setSortByPrice(false)
  // setSortByPrice(true)
  
  const orderTotal = (dishes) => {
    return dishes.reduce((acc, dish) => acc + dish.price, 0)
   }

  const sortOrders = () => {
    if (!sortByPrice) return orders;

    return [...orders].sort((a,b) => {
      return orderTotal(b.dishes) - orderTotal(a.dishes)
    })
  }
  

  return (
    <div>
      <div>Previous orders</div>
      <input type="radio" name="default" onChange={() => setSortByPrice(false)} checked={!sortByPrice} />Default
      <input type="radio" name="price" onChange={() => setSortByPrice(true)} checked={sortByPrice} />Price

      <div className="order-container container">
        {sortOrders().map(order => <OrderCard order={order} key={order.id} 
        setSelected={setSelected} 
        redirectToOrderEdit={redirectToOrderEdit}
        />)}
      </div>
    </div>
  )
}

export default OrderContainer