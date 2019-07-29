import React from 'react'
import RestaurantCard from '../components/RestaurantCard'

const RestaurantContainer = ({restaurants, setSelected}) => {
  return (
    // for each restaurant in all, render a card
    <div>
      {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} setSelected={setSelected}/>)}

    </div>
  )

}

export default RestaurantContainer