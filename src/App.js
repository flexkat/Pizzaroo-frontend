import React from 'react';
// import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import RestaurantContainer from './containers/RestaurantContainer';
import OrderContainer from './containers/OrderContainer'
import RestaurantDetails from './components/RestaurantDetails'
import {Route} from 'react-router-dom';
import API from './adapters/API';
import {withRouter} from 'react-router-dom'


class App extends React.Component {

  state = {
    user: undefined,
    restaurants: [],
    orders: [],
    // selectedRestaurant: ""
  }

  componentDidMount() {
    API.validateUser()
    
    API.getData('restaurants').then(restaurants => {
        this.setState({
          restaurants
        })
    })
  }

  loadOrders = () => {
    API.getData('orders').then(orders => {
      const usersOrders = orders.filter(order => order.user.id === this.state.user.user.id)
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

  // getOrderDishes = () => {
  //   const dishes = this.state.orders.map(order => order.dishes)
  //   // console.log(dishes)
  // }

  signUp = (user) => {
    API.signUp(user)
      .then(user => this.setState({ user }))
    if (user !== undefined){this.redirectToHome()}
  }

  redirectToHome = () => {
    this.props.history.push(`/home`)
  }

  redirectToLogin = () => {
    this.props.history.push(`/`)
  }

  logIn = (user) => {
    API.logIn(user)
      .then(user => this.setState({ user }))
    this.loadOrders()
    if (user !== undefined){this.redirectToHome()} 
  }

  logOut = (user) => {
    API.clearToken()
    this.setState({ user: undefined })
    if (user === undefined){this.redirectToLogin()} 
  }

  findRestaurant = id => this.state.restaurants.find(rest => rest.id === parseInt(id))

  // editOrder = (e, editedOrder, orderId) => {
  //  const orderDishes = this.orderDishes(editedOrder)
  //   API.patchData(orderDishes, orderId)
  //   .then(console.log)
  //   // setselectedorder,
  //   // edit pre-populated order form
  //   // submit -> editorder (e, editedOrder, order.id)
  //   // get new orderDishes
  //   // patch request to that order id
  //   // fetch()

  // } 

  orderDishes = (order) => {
    const orderDishes = []
    console.log(order)
    for (const key in order) {
      const quant = parseInt(order[key])
      for (let i = 0; i < quant; i++) {
        orderDishes.push(key)
      }
    }
    return orderDishes;
  }
  newOrder = (e, newOrder, id) => {
    e.preventDefault();
    const orderDishes = this.orderDishes(newOrder)
    
    return fetch(API.ordersUrl, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        restaurant_id: id,
        user_id: this.state.user.user.id,
      })
    })
    .then(res => res.json())
    .then( order => this.postRequest(order, orderDishes))
    .then(() => this.redirectToHome())
    .then(() => this.loadOrders())
  }

  postRequest = (order, orderDishes) => {
   return orderDishes.forEach(el => {
      const data = {
        order_id: parseInt(order.order.id),
        dish_id: parseInt(el),
        quantity: 1
      }

      fetch(API.orderDishUrl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)})
      .then(res => res.json())
      // .then(console.log)
      }
   )}; 


  

  render() {
      // let userId = this.state.user.user.id
      // console.log(this.state.user.id)
//     const selectedRestaurant = this.state.restaurants.find(restaurant => restaurant.id === this.state.selectedRestaurant)
    
    return (
        <div>

          <Route exact path="/" component={() => 
            <div className="login">
            <h1 className="logo">Pizzaroo!</h1>
            <Navbar className="App" user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} />
            </div>
          } />
          
          <Route exact path='/home' render={(props)=>
            <div>
              <RestaurantContainer {...props} restaurants={this.state.restaurants} setSelected={this.setSelected} />
              <OrderContainer orders={this.state.orders}/>
            </div>
          } />

          <Route path={"/restaurants/:id"} component={(props) =>
            <RestaurantDetails {...props} restaurant={this.findRestaurant(props.match.params.id)} newOrder={this.newOrder}
            loading={!this.findRestaurant(props.match.params.id)}
            />
          } />

          {/* <Route path={"/orders/:id"} component={(props) =>
            <RestaurantDetails {...props} restaurant={this.findRestaurant(props.match.params.id)} newOrder={this.newOrder}
            loading={!this.findRestaurant(props.match.params.id)}
            />
          } /> */}


        </div>
    );
  }
}


export default withRouter(App);