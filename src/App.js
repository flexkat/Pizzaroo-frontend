import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import RestaurantContainer from './containers/RestaurantContainer';
import OrderContainer from './containers/OrderContainer'
import OrderForm from './components/OrderForm'

import API from './adapters/API';

class App extends React.Component {

  state = {
    user: undefined,
    restaurants: [],
    orders: [],
    selectedRestaurant: ""
  }

  componentDidMount() {
    // API.validateUser()
    
    API.getData('restaurants').then(restaurants => {
        this.setState({
          restaurants
        })
    })

    API.getData('orders').then(orders => {
      const usersOrders = orders.filter(order => order.user.id === 1)
      this.setState({
        orders: usersOrders
      })
    })
  }

  setSelected = (key, item) => {
    this.setState({
      [key]: item
    })
  }

  getOrderDishes = () => {
    const dishes = this.state.orders.map(order => order.dishes)
    console.log(dishes)
  }

  // signUp = user => {
  //   API.signUp(user)
  //     .then(user => this.setState({ user }))
  // }

  // logIn = user => {
  //   API.logIn(user)
  //     .then(user => this.setState({ user }))
  // }

  // logOut = () => {
  //   API.clearToken()
  //   this.setState({ user: undefined })
  // }

  render() {
    
    return (
      <div className="App">
        {/* <Navbar user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} /> */}
        <RestaurantContainer restaurants={this.state.restaurants} setSelected={this.setSelected} />
        {/* now we need to have a routes path to open the selected restaurant in a new component */}
        <OrderContainer orders={this.state.orders}/>
        <OrderForm />
      </div>
    );
  }
}


export default App;