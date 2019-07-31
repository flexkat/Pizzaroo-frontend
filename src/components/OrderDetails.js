import React from 'react'
import { Container, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'
import API from '../adapters/API';
import PopUp from '../components/PopUp'

class OrderDetails extends React.Component {

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
}

  checkDishCount = (dish) => {
    const dishesArray = [...this.props.order.dishes]
    const dishNames = dishesArray.map(dish => dish.name)
    const dishCount = dishNames.filter(d => d === dish)
    const dishQuantity = dishCount.length

    return dishQuantity
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

    console.log(props)

    return (
      <div>
        {this.state.showPopup ? <PopUp/> : null}
        <h3>To: {restaurant}</h3>
        <p>Address: {address}</p>
        <p>Ordered on: {time}</p>
        <form onSubmit={this.props.handleSubmit}>
          {
            Object.keys(this.props.dishQuantities).map(function(key) {
              const dish = props.dishQuantities[key];
              return (
                <div>
                  <label>{dish.name}</label>
                  <input 
                    key={dish.id}
                    type="number" 
                    value={dish.quantity} 
                    name={dish.id} 
                    onChange={(e) => props.onDishQuantityChangeHandler(e.target.name, e.target.value)}
                  />
                </div>
              )
            })
          }
      
          <button onClick={this.deleteOrder} >Delete order</button>

          <input className="submit-button" type="submit" value="Update Order"/>
        </form>

      </div>
    )
  }
}

export default OrderDetails