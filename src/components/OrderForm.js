import React from 'react'

class OrderForm extends React.Component {

  state = {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log(e.target.value)
  } 
  
  render() {
    const { restaurant, handleSubmit } = this.props
    return (
      <div>
        <h2>New Order</h2>
        <form onSubmit={(e) => handleSubmit(e.target.name, e.target.value)}>
          {restaurant.dishes.map(dish => <p><label>{dish.name}</label><input type="number" name={dish.name} onChange={this.handleChange}/></p>)}
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default OrderForm;