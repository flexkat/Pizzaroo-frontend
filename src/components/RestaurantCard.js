import React from 'react'

class RestaurantCard extends React.Component {
  render() {
    const { name, address, id} = this.props.restaurant
    return (
      // ?semantic card or regular card, with picture and restaurant name, and onclick to take you to their page
      <div onClick={() => this.props.setSelected("selectedRestaurant", id)}>
        <h3>{name}</h3>
        <p>{address}</p>
      </div>
    )
  }
}

export default RestaurantCard