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
    // console.log(dishes)
  }

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
  }

  redirectToHome = () => {
    this.props.history.push(`/home`)
  }

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user }))
    if (user !== undefined){this.redirectToHome()} 
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined })
  }
  findRestaurant = id => this.state.restaurants.find(rest => rest.id === parseInt(id))

  newOrder = (event) => {
    event.preventDefault();
    // console.log(event)
  }

  render() {

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