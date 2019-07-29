import React from 'react'
import { Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

class RestaurantDetails extends React.Component {

  render() {

    if (this.props.loading) {
      return <Container>
          <Dimmer active inverted>
              <Loader inverted content='Loading' />
          </Dimmer>
      </Container>
    }

    return (
      <div>
        <h3>{this.props.restaurant.name}</h3>
        <p>{this.props.restaurant.address}</p>
      </div>
    )
  }
}

export default RestaurantDetails