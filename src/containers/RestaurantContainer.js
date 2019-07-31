import React from 'react'
import RestaurantCard from '../components/RestaurantCard'

const RestaurantContainer = ({restaurants, setSelected,}) => {
  return (
      <div className="restaurant-container container">
        {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} 
        // setSelected={setSelected}
        />)}
      </div>
  )

}

export default RestaurantContainer