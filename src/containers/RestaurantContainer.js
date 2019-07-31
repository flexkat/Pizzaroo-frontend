import React from 'react'
import RestaurantCard from '../components/RestaurantCard'
import {Card} from 'semantic-ui-react'

const RestaurantContainer = ({restaurants, setSelected,}) => {
  return (
    <Card.Group itemsPerRow={4}>
      <div className="restaurant-container container">
        {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} 
        // setSelected={setSelected}
        />)}
      </div>
      </Card.Group>
  )

}

export default RestaurantContainer