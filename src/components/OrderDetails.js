import React from 'react'
import { Container, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'
import API from '../adapters/API';
import PopUp from '../components/PopUp'

class RestaurantDetails extends React.Component {

    state = {
        showPopup: false 
    }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  deleteOrderDish= () => {

    fetch(API.orderDishUrl + '/' + this.props.order.id, {
      method: 'delete'
    }).then(res => res.json()
      .then(json => this.togglePopup())
      .then(setTimeout(() => this.props.redirectToHome(), 2000))
    );
  }

  deleteOrder= () => {
      fetch(API.ordersUrl + '/' + this.props.order.id, {
        method: 'delete'
      }).then(res => res.json()
        .then(json => this.togglePopup())
        .then(setTimeout(() => this.props.redirectToHome(), 2000))
      );
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
console.log(this.props.order)
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
        <button onClick={this.deleteOrderDish} >Delete order</button>
      </div>
    )
  }
}

export default RestaurantDetails