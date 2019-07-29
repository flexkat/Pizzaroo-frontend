import React from 'react'

class OrderCard extends React.Component {
  render() {
    const dishesArray = this.props.order.dishes
    const dishNames = dishesArray.map(dish => dish.name)
    let dishNameAndCounts = {};
    for (let i = 0; i < dishNames.length; i++) {
        dishNameAndCounts[dishNames[i]] = 1 + (dishNameAndCounts[dishNames[i]] || 0);
    }

    // need to change object to array or find a new way to get name and count of name to render a short hand of the order form

    const name = this.props.order.restaurant.name
    return (
      <div>
        <h3>{name}</h3>
        {/* {dishNameAndCounts.map(dish => <p>{dish}</p>)} */}
      </div>
    )
  }
}

export default OrderCard