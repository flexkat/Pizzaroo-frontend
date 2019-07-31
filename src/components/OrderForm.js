import React from 'react'

class OrderForm extends React.Component {

  state = {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  
  
  render() {
    const { restaurant, handleSubmit } = this.props
    return (
      <div className="order-form">
        <h2>Place an order</h2>
        <form onSubmit={(e) => handleSubmit(e, this.state, restaurant.id)}>
          {restaurant.dishes.map(dish => <p><label>{dish.name}</label><input type="number" id={dish.id} onChange={this.handleChange}/></p>)}
          <input className="submit-button" type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default OrderForm;