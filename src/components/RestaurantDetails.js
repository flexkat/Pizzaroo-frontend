import React from 'react'
import { Container, Segment, Dimmer, Loader } from 'semantic-ui-react'
import OrderForm from '../components/OrderForm'

class RestaurantDetails extends React.Component {

  render() {

    if (this.props.loading) {
      return <Container>
          <Dimmer active inverted>
              <Loader inverted content='Loading' />
          </Dimmer>
      </Container>
    }

    const {name, address, dishes} = this.props.restaurant

    return (
      <div className="restaurant-details">
        <h3 className="restaurant-title">{name}</h3>
        <p className="restaurant-title">{address}</p>
      <div className="restaurant-details-2">

        <ul>
          {
            dishes.map(dish => <li>{dish.name} - £{dish.price} <p>{dish.description}</p></li>)
          }
        </ul>
        <OrderForm restaurant={this.props.restaurant} handleSubmit={this.props.newOrder}/>
      </div>
      </div>
    )
  }
}

export default RestaurantDetails