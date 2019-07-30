import React from 'react'
import { Container, Segment, Dimmer, Loader } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'

class RestaurantDetails extends React.Component {

  render() {

    if (this.props.loading) {
      return <Container>
          <Dimmer active inverted>
              <Loader inverted content='Loading' />
          </Dimmer>
      </Container>
    }

    const restaurant = this.props.order.restaurant.name
    const address = this.props.order.restaurant.address
    const time = this.props.order.restaurant.created_at
    const dishes = this.props.order.dishes
console.log(this.props.order)
    return (
      <div>
        <h3>To: {restaurant}</h3>
        <p>Address: {address}</p>
        <p>Ordered on: {time}</p>
        <ul>
          {
            dishes.map(dish => <li>{dish.name} - £{dish.price} <p>{dish.description}</p></li>)
          }
        </ul>
        {/* <OrderForm restaurant={this.props.order.restaurant} 
        handleSubmit={this.props.newOrder}
        /> */}
      </div>
    )
  }
}

export default RestaurantDetails