import React from 'react'
import OrderForm from '../components/OrderForm'

class RestaurantDetails extends React.Component {

  render() {
    console.log(this.props.restaurant)

    const {name, address, dishes} = this.props.restaurant
    return (
      <div>
        <h1>{name}</h1>
        <h3>{address}</h3>
        <ul>
          {
            dishes.map(dish => <li>{dish.name} - £{dish.price} <p>{dish.description}</p></li>)
          }
        </ul>
        <OrderForm restaurant={this.props.restaurant} handleSubmit={this.props.newOrder}/>
      </div>
    )
  }

}

export default RestaurantDetails