import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import RestaurantContainer from './containers/RestaurantContainer';
import OrderContainer from './containers/OrderContainer'
import RestaurantDetails from './components/RestaurantDetails'
import {Route} from 'react-router-dom';
import API from './adapters/API';
import {withRouter} from 'react-router-dom'
import OrderDetails from './components/OrderDetails';



class App extends React.Component {

  state = {
    user: undefined,
    restaurants: [],
    orders: []
    // selectedRestaurant: "",
    // selectedOrder: ""
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

  // setSelected = (key, item) => {
  //   this.setState({
  //     [key]: item
  //   })
  // }

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
    this.loadOrders()
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

  findOrder = id => this.state.orders.find(res => res.id === parseInt(id))

  newOrder = (e, newOrder, id) => {
    e.preventDefault();
    const orderDishes = []
    console.log(newOrder)
    for (const key in newOrder) {
      const quant = parseInt(newOrder[key])
      for (let i = 0; i < quant; i++) {
        orderDishes.push(key)
      }
    }
    
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
      }
   )}; 

  redirectToOrderEdit = (id) => {
    this.props.history.push(`/orders/${id}`)
  }

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
              <RestaurantContainer {...props} restaurants={this.state.restaurants} 
              // setSelected={this.setSelected} 
              />
              <OrderContainer orders={this.state.orders} redirectToOrderEdit={this.redirectToOrderEdit}
              // setSelected={this.setSelected}
              />
            </div>
          } />

          <Route path={"/restaurants/:id"} component={(props) =>
            <RestaurantDetails {...props} restaurant={this.findRestaurant(props.match.params.id)} newOrder={this.newOrder}
            loading={!this.findRestaurant(props.match.params.id)}
            />
          } />

          <Route path={"/orders/:id"} component={(props) =>
            <OrderDetails {...props} order={this.findOrder(props.match.params.id)}
            loading={!this.findOrder(props.match.params.id)} redirectToHome={this.redirectToHome}
            />
          } />


        </div>
    );
  }
}


export default withRouter(App);