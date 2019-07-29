import React from 'react'

class OrderCard extends React.Component {

  checkDishCount = (dish) => {
    const dishesArray = this.props.order.dishes
    const dishNames = dishesArray.map(dish => dish.name)
    const dishCount = dishNames.filter(d => d === dish)
    const dishQuantity = dishCount.length
    console.log(dishNames)
    return dishQuantity
  }
  
  render() {
    const dishesArray = this.props.order.dishes
    const dishNames = dishesArray.map(dish => dish.name)
    const distinctDishNames = [...new Set(dishNames)]
  
    const name = this.props.order.restaurant.name


    return (
      <div className="order-card card" onClick={console.log}>
        <h3>{name}</h3>
        {distinctDishNames.map(dish => <p>{dish} x {this.checkDishCount(dish)}</p>)}
      </div>
    )
  }
}

export default OrderCard