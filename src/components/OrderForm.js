import React from 'react'

class OrderForm extends React.Component {

  state = {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(e.target.id)
    console.log(e.target.value)
  } 
  
  render() {
    const { restaurant, handleSubmit } = this.props
    return (
      <div>
        <h2>Place an order</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          {restaurant.dishes.map(dish => <p><label>{dish.name}</label><input type="number" id={dish.id} onChange={this.handleChange}/></p>)}
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default OrderForm;