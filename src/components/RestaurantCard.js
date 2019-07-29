import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'semantic-ui-react'

class RestaurantCard extends React.Component {
  render() {
    const { name, address, id} = this.props.restaurant
    return (
      
      <Card as={Link} to={`/restaurants/${id}`} >
        <div onClick={() => this.props.setSelected("selectedRestaurant", id)} className="restaurant-card card">
          <h3>{name}</h3>
          <p>{address}</p>
        </div>
      </Card>
    )
  }
}

export default RestaurantCard