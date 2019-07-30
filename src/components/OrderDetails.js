import React from 'react'
import { Container, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'
import API from '../adapters/API';
import PopUp from '../components/PopUp'

class RestaurantDetails extends React.Component {

  state = {
      showPopup: false,
      orderDishes: []
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/order_dishes/')
    .then(res => res.json())
    .then(order_dishes => {
      this.setState({
        orderDishes: order_dishes
      })
    })
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  deleteOrder= () => {
      fetch('http://localhost:3000/api/v1/orders/' + this.props.order.id, {
        method: 'delete'
      }).then(res => res.json())
        .then(json => this.togglePopup())
        .then(setTimeout(() => this.props.redirectToHome(), 2000))
    }

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

    return (
      <div>
        {this.state.showPopup ? <PopUp/> : null}
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
        <button onClick={this.deleteOrder} >Delete order</button>
      </div>
    )
  }
}

export default RestaurantDetails