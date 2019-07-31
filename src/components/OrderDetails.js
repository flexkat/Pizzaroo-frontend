import React from 'react'
import { Container, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'
import API from '../adapters/API';
import PopUp from '../components/PopUp'

class OrderDetails extends React.Component {

  state = {
      showPopup: false,
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
    // const dishes = this.props.order.dishes
    // const order = this.props.order

    // const dishesArray = this.props.order.dishes
    // const dishNames = dishesArray.map(dish => dish.name)
    // const distinctDishNames = [...new Set(dishNames)]
    const props = this.props;
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
          <input className="submit-button" type="submit" value="Update Order"/>
        </form>

        <button onClick={this.deleteOrderDish} >Delete order</button>
      </div>
    )
  }
}

export default OrderDetails