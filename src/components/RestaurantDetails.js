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
      <div>
        <h3>{name}</h3>
        <p>{address}</p>
        <ul>
          {
            dishes.map(dish => <li>{dish.name} - £{dish.price} <p>{dish.description}</p></li>)
          }
        </ul>
        <OrderForm restaurant={this.props.restaurant} handleSubmit={this.props.newOrder}/>
      </div>
    )
  }
}

export default RestaurantDetails