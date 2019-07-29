import React from 'react';
// import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import RestaurantContainer from './containers/RestaurantContainer';
import OrderContainer from './containers/OrderContainer'
import OrderForm from './components/OrderForm'
import {Route} from 'react-router-dom';
import API from './adapters/API';
import RestaurantDetails from './components/RestaurantDetails'
import {withRouter} from 'react-router-dom'


class App extends React.Component {

  state = {
    user: undefined,
    restaurants: [],
    orders: [],
    selectedRestaurant: ""
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

  render() {
    return (
        <div>

          <Route exact path="/" component={() => 
            <div className="login">
            <h1 className="logo">Pizzaroo!</h1>
            <Navbar className="App" user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} />
            </div>
          } />
          
          <Route exact path='/home' render={(props)=>
            <RestaurantContainer {...props} restaurants={this.state.restaurants} setSelected={this.setSelected} />
          } />

          <Route path={"/restaurants/:id"} component={(props) =>
            <RestaurantDetails {...props} restaurant={this.findRestaurant(props.match.params.id)} 
            loading={!this.findRestaurant(props.match.params.id)}
            />
        } />

        </div>
    );
  }
}


export default withRouter(App);