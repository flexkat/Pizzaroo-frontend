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

  orderDishes = (order) => {
    const orderDishes = []
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
    .then(order => this.postRequest(order, orderDishes))
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
    const editingOrder = this.findOrder(id);
    const dishQuantities = editingOrder.dishes.reduce((acc, item) => {
      if(acc[item.id]) {
        return {
          ...acc,
          [item.id]: {
            id: acc[item.id].id,
            name: acc[item.id].name,
            quantity: acc[item.id].quantity + 1
          }
        }
      }


      return {
        ...acc,
        [item.id]: {
          id: item.id,
          name: item.name,
          quantity: 1
        }
      }
    }, {})


    this.setState({
      editingOrder,
      dishQuantities,
    })
    this.props.history.push(`/orders/${id}`) 
  }

  onDishQuantityChangeHandler = (key, value) => {
    this.setState({
      dishQuantities: {
        ...this.state.dishQuantities,
        [key]: {
          ...this.state.dishQuantities[key],
          quantity: value
        }
      }
    })
  }
    
 
  updateEditingOrder = (e) => {
    e.preventDefault();

    return API.getData("order_dishes")
    .then(orderDishes => {
      const dishes = orderDishes.filter(oD => oD.order.id === this.state.editingOrder.id)
      const deleteDishesPromise = dishes.map(dish => fetch(`${API.orderDishUrl}/${dish.id}`, {
        method: "DELETE"
      }))
      Promise.all(deleteDishesPromise)
        .then(() => {
          const orderDishes = Object.keys(this.state.dishQuantities)

          for (const key of orderDishes) {
            const dish = this.state.dishQuantities[key];
            const frequency = parseInt(dish.quantity)
            const data = {
              order_id: parseInt(this.state.editingOrder.id),
              dish_id: parseInt(key),
              quantity: 1
            }
            for (let i=0; i < frequency; i ++) {
              fetch(API.orderDishUrl, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)})
                .then(res => res.json())
                .then(this.loadOrders())
                .then(setTimeout(() => this.redirectToHome(), 1000))
              }
            }
          }
        )
      }
    )
  }

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
            <div className="homepage">
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

          <Route path={"/orders/:id"} render={(props) =>
            <OrderDetails 
              {...props} 
              order={this.state.editingOrder} 
              dishQuantities={this.state.dishQuantities} 
              handleSubmit={this.updateEditingOrder}
              onDishQuantityChangeHandler={this.onDishQuantityChangeHandler}
              loading={!this.findOrder(props.match.params.id)} 
              redirectToHome={this.redirectToHome}
            />
          } />


        </div>
    );
  }
}


export default withRouter(App);