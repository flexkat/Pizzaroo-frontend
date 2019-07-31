import React from 'react'
// import PopUp from '../components/PopUp'

class OrderCard extends React.Component {

  checkDishCount = (dish, id) => {
    const dishesArray = [...this.props.order.dishes]
    const dishNames = dishesArray.map(dish => dish.name)
    const dishCount = dishNames.filter(d => d === dish)
    const dishQuantity = dishCount.length

    return dishQuantity
  }

  orderTotal = (dishes) => {
   return dishes.reduce((acc, dish) => acc + dish.price, 0)
  }
  
  render() {
    const dishesArray = this.props.order.dishes
    const dishNames = dishesArray.map(dish => dish.name)
    const distinctDishNames = [...new Set(dishNames)]
    const name = this.props.order.restaurant.name
    return (

        <div className="order-card card">
          <h3>{name}</h3>
          {distinctDishNames.map(dish => <p>{dish} x {this.checkDishCount(dish)}</p>)}
          <p>£{this.orderTotal(dishesArray)}</p>
          <button 
            onClick={() => this.props.redirectToOrderEdit(this.props.order.id)}
            // onClick={() => this.props.setSelected("selectedOrder", this.props.order.id)}
          >Edit</button>
        </div>

    )
  }
}

export default OrderCard